import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	keyForAttribute: function(attr) {
		return attr;
	},
	modelNameFromPayloadKey: function(payloadKey) {
		if (payloadKey === 'blog/post') {
			return this._super(payloadKey.replace('blog/', ''));
		} else {
			return this._super(payloadKey);
		}
	}
});
