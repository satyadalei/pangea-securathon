require('dotenv').config({ path: require('find-config')('.env') });
const jwt = require('jsonwebtoken');
// this middleware helps to verify user and get userid from it
const authentiCateUser = (req, res, next) => {
    const authToken = req.headers.authtoken;
    // token not found
    if (!authToken) {
        res.status(401).json({
            "msg": "unauthorised access",
            "detailMsg": "unauthorised access! Access denied",
            "success": false
        })
    } else {
        //token found -> check token
        const tokenData = jwt.verify(authToken, process.env.JWT_SECRET, function (err, decoded) {
            return err ? "not verified" : decoded;
        });
        if (tokenData === "not verified") {
            res.status(401).json({
                "msg": "unauthorised access",
                "detailMsg": "unauthorised access! Access denied",
                "success": false
            })
        }else{
            // user verified and userId added to request
            req.user = tokenData;
            next()
        }
    }
}


module.exports = authentiCateUser;