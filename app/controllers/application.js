import Ember from 'ember';

export default Ember.Controller.extend({
	init() {
		this.set('currentRoute', this.get('target').router.activeTransition.targetName);
		this._super.apply(this, arguments);		
	},
	menuClasses: 'menu',
	actions: {
		changeState(link) {
			this.transitionToRoute(link);
		},
		showMenu() {
			this.set('menuClasses', 'menu');
		},
		hideMenu() {
			this.set('menuClasses', 'menu menu-hide');			
		}
	}
});