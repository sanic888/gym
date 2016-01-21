import Ember from 'ember';

// const { service } = Ember.inject;

export default Ember.Component.extend({
	eventEmitter: Ember.inject.service('event-emitter'),
	init() {
		this._initMenu();
		this._registerEvents();
		this._super.apply(this, arguments);
	},
	_registerEvents() {
		var self = this;

		this.get('eventEmitter').on('menu-left:goto', function(link){
			self._goTo(link);
		});
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
	_goTo(link){
		this.sendAction('goTo', link);

		var menuItems = this.get('menuItems');

		menuItems.forEach(function(menuItem){
			if(menuItem.link === link){
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
		goTo: function(link){
			this._goTo(link);
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
