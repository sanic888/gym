import Ember from 'ember';

export default Ember.Component.extend({
	expanded: false,
	actions: {
		toggleMenu(){
			this.toggleProperty('expanded');
		}
	}
});
