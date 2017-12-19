var uuid = require('uuid/v4');

module.exports = function (req, res, next) {
  if(!req.cookies || !req.cookies['x-either-userid']) {
    res.cookie('x-either-userid', uuid());
  }
  req.user = req.cookies['x-either-userid'];
  next();
}
