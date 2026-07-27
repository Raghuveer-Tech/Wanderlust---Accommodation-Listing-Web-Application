const User = require("../models/user");

//signup form 
module.exports.renderSignupForm = (req, res) => {
    res.render("./user/signup.ejs");
};

//signup
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });
    } catch (er) {
        req.flash("error", er.message);
        res.redirect("/signup");
    }
};

//login form 
module.exports.renderLoginForm = (req, res) => {
    res.render("user/login.ejs");
};

//login 
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};