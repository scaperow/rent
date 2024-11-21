var express = require('express');
var router = express.Router();


router.get('/:template', function (req, res, next) {
  const { user } = req.query
  const { template } = req.params
  if (!template) {
    return res.send('not responsed')
  }

  return res.render(`result/${template}`, {
    user: user,
  })
});

module.exports = router;
