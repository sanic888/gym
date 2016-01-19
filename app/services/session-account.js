import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
	session: service('session'),
	store: service(),

	loadCurrentUser() {
		return new RSVP.Promise((resolve, reject) => {
			var self = this;

			const accountId = self.get('session.data.authenticated.account_id');
			if (!Ember.isEmpty(accountId)) {
				return self.get('store').find('account', accountId).then((account) => {
					self.set('account', account);
					resolve();
				}, reject);
			}else {
				resolve();
			}
		});
	}
});
