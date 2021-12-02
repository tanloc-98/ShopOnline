const UsersModel 	= require(__path_models + 'users');
const notify  		= require(__path_configs + 'notify');
var md5 = require('md5');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.use(new LocalStrategy(
        function(username, password, done) {
            UsersModel.getItemByUsername(username, null).then( ( users) => {
                let user = users[0];
                if (user === undefined || user.length == 0) {
                    return done(null, false, { message: notify.ERROR_LOGIN });
                }else {
                    if(password !== user.password) {
                        console.log('mat khau khong dung')
                        return done(null, { message: notify.ERROR_LOGIN_SHOP});
                    }else {
                        console.log('dang nhap thanh cong')
                        return done(null, user);
                    }
                }
            });
        }
    ));
    
    passport.serializeUser(function(user, done) {
        done(null, user._id);     
    });
    
    passport.deserializeUser(function(id, done) {
        UsersModel.getItem(id, null).then( (user) => {
            done(null, user);
        });
    });
}
