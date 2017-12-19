var uuid = require('uuid/v4');

module.exports = function (req, res, next) {
  if(!req.cookies || !req.cookies['x-either-userid']) {
    var newUid = uuid();
    res.cookie('x-either-userid', newUid);
    res.cookie('x-either-firsttime', 1);
    req.user = newUid;
  } else {
    req.user = req.cookies['x-either-userid'];
  }
  next();
}
