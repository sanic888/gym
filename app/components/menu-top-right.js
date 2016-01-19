import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	menuClassNames: 'menu-top-right',
	expanded: false,
	actions: {
		logout() {
			this.get('session').invalidate();
		},
		toggleMenu(){
			this.toggleProperty('expanded');

			if(this.expanded){
				this.set('menuClassNames', 'menu-top-right expanded');
			}else {
				this.set('menuClassNames', 'menu-top-right');
			}
		}
	}
});
