const router=require('express').Router()
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy;
const userModel=require('../model/user.model')

passport.use(
  new LocalStrategy((username, password, done) => {
    userModel.findOne({ email: username,password:password}, (err, data) => {
      if (data) {
        return done(null, data);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser (function (user, done) {
  done(null, user);

});

router.post('/login', (req, res,next) =>

passport.authenticate('local',{ failureRedirect: '/',successRedirect:"/api/auth/success" })(req,res,next)
);

router.get('/success',isAuthenticated,(req,res)=>{
    res.render('dashboard',{'user':req.user})

})
function isAuthenticated(req,res,done){
  if(req.user){
    return done(null,true)
  }
  res.redirect('/')
}


router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
      }
      req.session=null
      res.redirect('/');
  });
});


  module.exports=router;