const isSignedIn = (req,res,next)=>{
    if(req.session.user){
        return next()
    }
    else{
        // console.log('User is not signed in. Redirecting to /auth/sign-in')
        res.redirect('/auth/sign-in')
    }
}

module.exports = isSignedIn;