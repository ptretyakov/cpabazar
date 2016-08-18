'use strict';
const express = require('express')
const router = express.Router()
const CommissionProffers = require('../../CommissionProffers')
const RequestPromise = require('request-promise');

const fetchInterestingUrl = 'http://megalead.ru/api/campaigns/get-interesting'

function addslashes( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
}

/* GET home page. */
router.post('/', (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    skype: req.body.skype,
    message: req.body.message,
    campaign: req.body.campaign,
    proffercommission: req.body.proffercommission,
  }

  for (var prop in data) {
    addslashes(data[prop])
  }

  new CommissionProffers(data)
    .save()
    .then(model => {
      RequestPromise(fetchInterestingUrl).then(result => {
        console.log('Result', result);
        const interesting = JSON.parse(result)
        res.json({interesting, model})
      })
    })
})

module.exports = router
