import Ember from 'ember';

export default Ember.Controller.extend({
	init(){
		console.log('asd');
		this.set('currentRoute', this.get('target').router.activeTransition.targetName)
		this._super.apply(this, arguments);		
	},
	session: Ember.inject.service('session'),
	actions: {
		logout: function(){
			this.get('session').invalidate();
		},
		changeState: function(link){
			this.transitionToRoute(link);
		}
	}
});