import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	menuItems: [{
			text: 'Profile',
			link: 'profile'
		}, {
			text: 'Graphs',
			link: 'graphs'
		}],
	actions: {
		logout: function(){
			this.get('session').invalidate();
		},
		changeState: function(link){
			this.transitionToRoute(link);
		}
	}
});