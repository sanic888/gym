import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		signup() {
			self.get('store').find('profile', accountId).then((account) => {
				self.set('account', account);
				resolve();
			}, reject);
		}
	}
});
