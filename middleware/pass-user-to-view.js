const passUserToView = (req,res,next)=>{
    console.log(req.session)
    res.locals.user = req.session.user ? req.session.user : null;
    console.log(res.locals)

    next();
}

module.exports = passUserToView