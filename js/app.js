//Angular items
import angular     from 'angular';
import firebase    from 'firebase';
import angularFire from 'angularfire';
import ngRoute     from 'angular-route';

//Controllers
import App from './app/app';


//Services
import auth from './app/'

angular.module('app', ['ngRoute', 'firebase']);


angular.module('app')

       .controller('App', App)
       
       .service('auth', auth);
       