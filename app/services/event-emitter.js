import Ember from 'ember';

export default Ember.Service.extend({
	_listeners: {},
	on(event, fn) {
		if (!this._listeners) {
			this._listeners = {};
		}

		var events = this._listeners;
		if (!events[event]) {
			events[event] = [];
		}

		events[event].push(fn);
	},
	once(event, fn) {
		var self = this;
		var cb = function () {
			fn.apply(this, arguments);
			self.off(event, cb);
		};

		this.on(event, cb);
	},
	off(event, fn) {
		if (!this._listeners || !this._listeners[event]) {
			return;
		}

		var events = this._listeners;

		if (!fn) {
			delete events[event];
		} else {
			var listeners = events[event];
			var index = listeners.indexOf(fn);

			if (index > -1) {
				listeners.splice(index, 1);
			}

			if (!listeners.length){
				delete events[event];				
			}
		}
	},
	emit(event) {
		if (!this._listeners || !this._listeners[event]) {
			return;
		}

		var listeners = this._listeners[event].slice(0);
		var params = [].slice.call(arguments, 1);

		for (var i = 0; i < listeners.length; i++) {
			listeners[i].apply(null, params);
		}
	}
});
