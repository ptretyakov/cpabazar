'use strict';
var megalead = require('./modules/connections').megalead;

 module.exports = megalead.Model.extend({
  tableName: 'qu_pap_campaigns',
  idAttribute: 'campaignid',
});
