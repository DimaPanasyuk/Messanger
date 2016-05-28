//Angular items
import angular             from 'angular';
import firebase            from 'firebase';
import angularFire         from 'angularfire';
// import uiRouter            from 'angular-ui-router';

//Configs
import appConfig            from './app/app.config';
import authConfig           from './auth/auth.route';
import resetConfig          from './resetPassword/resetPassword.route';
import registrationConfig   from './registration/registration.route';
import dashboardConfig      from './dashboard/dashboard.route'; 
import friendsConfig        from './dashboard.friends/dashboard.friends.route';
// import newsConfig          from './dashboard.news/dashboard.news.route';
import profileConfig        from './dashboard.profile/dashboard.profile.route'; 
import dialogsConfig        from './dashboard.dialogs/dashboard.dialogs.route';
import messagesConfig       from './dashboard.messages/dashboard.messages.route';
import usersConfig          from './dashboard.users/dashboard.users.route';
import usersInfoConfig      from './dashboard.usersinfo/dashboard.usersinfo.route';
import dialogSettingsConfig from './dashboard.dialog.settings/dashboard.dialog.settings.route';
import dialogNewConfig      from './dashboard.dialog.new/dashboard.dialog.new.route';

//Controllers
import App                 from './app/app.js';
import Auth                from './auth/auth.js';
import ResetPassword       from './resetPassword/resetPassword.js';
import Registration        from './registration/registration.js';
import Dashboard           from './dashboard/dashboard.js';
import Friends             from './dashboard.friends/dashboard.friends.js';
// import News                from './dashboard.news/dashboard.news.js';
import Profile             from './dashboard.profile/dashboard.profile.js';
import Dialogs             from './dashboard.dialogs/dashboard.dialogs.js';
import Messages            from './dashboard.messages/dashboard.messages.js';
import Users               from './dashboard.users/dashboard.users.js';
import UsersInfo           from './dashboard.usersinfo/dashboard.usersinfo.js';
import DialogSettings      from './dashboard.dialog.settings/dashboard.dialog.settings.js';
import DialogNew           from './dashboard.dialog.new/dashboard.dialog.new.js';

//Services
import auth    from './services/auth.service';

//Filters 
import cut     from './filters/cutTo.filter';
import fromNow from './filters/fromNow.filter';


//Run
import run     from './app/app.run';

angular.module('app', [
  
  'ui.router', 
  'firebase'
]);


//TODO: Split this 1 module into several smaller
angular.module('app')
       
       .constant('urls', {templates: './js/'})
       .constant('fire', 'https://dima-messanger.firebaseio.com')
       .config(appConfig)
       .config(authConfig)
       .config(resetConfig)
       .config(registrationConfig)
       .config(dashboardConfig)
       .config(friendsConfig)
       //.config(newsConfig)
       .config(profileConfig)
       .config(dialogsConfig)
       .config(messagesConfig)
       .config(usersConfig)
       .config(usersInfoConfig)
       .config(dialogSettingsConfig)
       .config(dialogNewConfig)
       
       .service('auth', auth)
       .filter('cut', cut)
       .filter('fromNow', fromNow)
        
       .controller('App', App)
       .controller('Auth', Auth)
       .controller('ResetPassword', ResetPassword)
       .controller('Registration', Registration)
       .controller('Dashboard', Dashboard)
       .controller('Friends', Friends)
       //.controller('News', News)
       .controller('Profile', Profile)
       .controller('Dialogs', Dialogs)
       .controller('Messages', Messages)
       .controller('Users', Users)
       .controller('UsersInfo', UsersInfo)
       .controller('DialogSettings', DialogSettings)
       .controller('DialogNew', DialogNew)
       .run(run);
       