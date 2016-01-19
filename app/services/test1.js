import Ember from 'ember';

export default Ember.Service.extend({
	init() {
		this._super.apply(this, arguments);

		this.set('eventemitter', new Emitter());
	},
	nameT: ',kf,kf',
	test() {
		console.log('fe');
	}
});
