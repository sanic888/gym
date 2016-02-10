import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		signup() {
			let { login, email, firstName, lastName } = this.getProperties('login', 'email', 'firstName', 'lastName');
			 
			this.sendAction('createUser', {
				login: login,
				email: email,
				firstName: firstName,
				lastName: lastName
			});
		}
	}
});
