const { User } = require('../User');

let auth = (req, res, next)=>{

    console.log('cookie:'+req.cookies.x_auth)
    let token = req.cookies.x_auth;
    User.findByToken(token, (err,user)=>{
        if(err) throw err;
        if(!user) return res.json({
            isAuth:false,
            error:true
        })        
        req.token = token;
        req.user = user;
        next();
    })

}

module.exports = {auth};