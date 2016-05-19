//Angular items
import angular             from 'angular';
import firebase            from 'firebase';
import angularFire         from 'angularfire';
// import uiRouter            from 'angular-ui-router';
import ngResource          from 'angular-resource';

//Configs
import appConfig           from './app/app.config';
import authConfig          from './auth/auth.route';
import resetConfig         from './resetPassword/resetPassword.route';
import registrationConfig  from './registration/registration.route';
import dashboardConfig     from './dashboard/dashboard.route'; 
import friendsConfig       from './dashboard.friends/dashboard.friends.route';
import newsConfig          from './dashboard.news/dashboard.news.route';
import profileConfig       from './dashboard.profile/dashboard.profile.route'; 
import dialogsConfig       from './dashboard.dialogs/dashboard.dialogs.route';

//Controllers
import App                 from './app/app.js';
import Auth                from './auth/auth.js';
import ResetPassword       from './resetPassword/resetPassword.js';
import Registration        from './registration/registration.js';
import Dashboard           from './dashboard/dashboard.js';
import Friends             from './dashboard.friends/dashboard.friends.js';
import News                from './dashboard.news/dashboard.news.js';
import Profile             from './dashboard.profile/dashboard.profile.js';
import Dialogs             from './dashboard.dialogs/dashboard.dialogs.js';

//Services
import auth  from './services/auth.service';

//Filters 
import cut   from './filters/cutTo.filter';


//Run
import run   from './app/app.run';

angular.module('app', [
  
  'ui.router', 
  'firebase', 
  'ngResource'
]);


//TODO: Split this 1 module into several smaller
angular.module('app')
       
       .constant('urls', {templates: './js/'})
       .config(appConfig)
       .config(authConfig)
       .config(resetConfig)
       .config(registrationConfig)
       .config(dashboardConfig)
       .config(friendsConfig)
       .config(newsConfig)
       .config(profileConfig)
       .config(dialogsConfig)
       
       .service('auth', auth)
       .filter('cut', cut)
        
       .controller('App', App)
       .controller('Auth', Auth)
       .controller('ResetPassword', ResetPassword)
       .controller('Registration', Registration)
       .controller('Dashboard', Dashboard)
       .controller('Friends', Friends)
       .controller('News', News)
       .controller('Profile', Profile)
       .controller('Dialogs', Dialogs)
       .run(run);
       