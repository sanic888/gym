import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._initMenu();
		this._super.apply(this, arguments);
	},
	_initMenu(){
		var menuItems = this.get('menuItems');
		var currentRoute = this.currentRoute;

		menuItems.forEach(function(menuItem){
			if(menuItem.link === currentRoute){
				Ember.set(menuItem, 'classNames', 'menu-item selected');
			}else {
				Ember.set(menuItem, 'classNames', 'menu-item');
			}
		});
	},
	menuItems: [{
			text: 'Profile',
			link: 'profile',
			classNames: 'menu-item',
			icon: 'glyphicon glyphicon-user'
		}, {
			text: 'Graphs',
			link: 'graphs',
			classNames: 'menu-item',
			icon: 'glyphicon glyphicon-stats'
		}
	],
	expanded: true,
	actions: {
		goTo: function(item){
			this.sendAction('goTo', item.link);

			var menuItems = this.get('menuItems');

			menuItems.forEach(function(menuItem){
				if(menuItem.link === item.link){
					Ember.set(menuItem, 'classNames', 'menu-item selected');
				}else {
					Ember.set(menuItem, 'classNames', 'menu-item');
				}
			});
		},
		toggleMenu(){
			this.toggleProperty('expanded');

			if(this.expanded){
				this.sendAction('showMenu');
			}else {
				this.sendAction('hideMenu');
			}
		}
	}
});
