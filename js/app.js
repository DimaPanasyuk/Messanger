//Angular items
import angular             from 'angular';
import firebase            from 'firebase';
import angularFire         from 'angularfire';
import ngRoute             from 'angular-route';

//Configs
import appConfig           from './app/app.config';
import authConfig          from './auth/auth.route';
import resetConfig         from './resetPassword/resetPassword.route';
import registrationConfig  from './registration/registration.route';
import dashboardConfig     from './dashboard/dashboard.route'; 

//Controllers
import App                 from './app/app.js';
import Auth                from './auth/auth.js';
import ResetPassword       from './resetPassword/resetPassword.js';
import Registration        from './registration/registration.js';
import Dashboard           from './dashboard/dashboard.js';

//Services
import auth  from './services/auth.service';


//Run
import run   from './app/app.run';

angular.module('app', ['ngRoute', 'firebase']);

angular.module('app')
       
       .constant('urls', {templates: './js/'})
       .config(appConfig)
       .config(authConfig)
       .config(resetConfig)
       .config(registrationConfig)
       .config(dashboardConfig)
       
       .service('auth', auth)
        
       .controller('App', App)
       .controller('Auth', Auth)
       .controller('ResetPassword', ResetPassword)
       .controller('Registration', Registration)
       .controller('Dashboard', Dashboard)
       .run(run);
       