const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null

    if(cookies) {
        try {
            token = cookies[process.env.COOKIE_NAME]; // req.signedCookies[cookies-name]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded;

            // pass user info to response locals
            if(res.locals.html) {
                res.locals.loggedInUser = decoded;
            }
            next();
        } catch (error) {
            if(res.locals.html) {
                res.redirect('/');
            } else {
                res.status(500).json({
                    errors: {
                        common: {
                            msg: 'Authentication failure!'
                        }
                    }
                })
            }
        }
    } else {
        if(res.locals.html) {       // this will be provided to html request
            res.redirect('/')
        } else {      // this will be provided to ajax request
            res.status(401).json({
                error: 'Authentication failure!'
            })
        }
    }
}

const isLogout = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if(!cookies) {
        next();
    } else{
        res.redirect('/inbox')
    }
}

module.exports = {
    isLoggedIn,
    isLogout
}