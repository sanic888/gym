import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  login: DS.attr('string'),
  email: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string')
});