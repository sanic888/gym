import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
	session: service('session'),
	keyPress(event) {
		if (event.which === 13 || event.keyCode === 13) {
			this._authenticateWithOAuth2();
		}
	},
	_authenticateWithOAuth2() {
		let { identification, password } = this.getProperties('identification', 'password');
		this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
			this.set('errorMessage', reason.error);
		});
	},
	actions: {
		authenticateWithOAuth2() {
			this._authenticateWithOAuth2();
		},
		authenticateWithFacebook() {
			this.get('session').authenticate('authenticator:torii', 'facebook');
		}
	}
});
