import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	keyForAttribute: function(attr) {
		return attr;
	},
	modelNameFromPayloadKey: function(payloadKey) {
		return payloadKey;
		//return this._super(...arguments);
	}
});
