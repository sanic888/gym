import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('profile');
  this.route('graphs');
  this.route('enter-data');
  
  this.route('login');
  this.route('logout');
});

export default Router;
