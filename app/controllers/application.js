import Ember from 'ember';

export default Ember.Controller.extend({
	menuItems: [{
			text: 'Profile',
			link: 'profile'
		}, {
			text: 'Graphs',
			link: 'graphs'
		}, {
			text: 'Enter Data',
			link: 'enter-data'
	}],
	actions: {
		changeState: function(link){
			this.transitionToRoute(link);
		}
	}
});