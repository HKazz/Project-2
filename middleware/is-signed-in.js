const isSignedIn = (req,res,next)=>{
    // console.log(req)
    if(req.session.user){
        return next()
    }
    else{
        // console.log(res)
        // console.log('User is not signed in. Redirecting to /auth/sign-in')
        res.redirect('/auth/sign-in')
    }
}

module.exports = isSignedIn;