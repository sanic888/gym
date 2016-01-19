import Ember from 'ember';

export default Ember.Controller.extend({
	login: {
		text: 'Log In',
		classNames: 'tab-enter selected',
		type: 'login',
		selected: true
	},
	signup: {
		text: 'Sign Up',
		classNames: 'tab-enter',
		type: 'signup',
		selected: false
	},
	showLogin: true,
	actions: {
		selectTab(type) {
			var login = this.get('login');
			var signup = this.get('signup');

			if(type === 'login' && !login.selected){
				Ember.setProperties(login, {
					selected: true,
					classNames: 'tab-enter selected'
				});
				Ember.setProperties(signup, {
					selected: false,
					classNames: 'tab-enter'
				});
			} else if(type === 'signup' && !signup.selected) {
				Ember.setProperties(signup, {
					selected: true,
					classNames: 'tab-enter selected'
				});
				Ember.setProperties(login, {
					selected: false,
					classNames: 'tab-enter'
				});
			}
		}
	}
});