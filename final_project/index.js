const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
const PORT = 5000;
app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken']; 
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user; 
                next(); 
            } else {
                return res.status(403).json({ message: "User not authenticated" }); // Return error if token verification fails
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.post("/login", (req, res) => {
    const user = req.body.user;
    if (!user) {
        return res.status(404).json({ message: "Body Empty" });
    }
    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

app.listen(PORT, () => console.log("Server is running at port " + PORT));