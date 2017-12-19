module.exports = function (req, res, next) {
  if(req.body.adminpass) {
    res.cookie('x-either-adminpass', req.body.adminpass);
    req.cookies['x-either-adminpass'] = req.body.adminpass;
  }
  dal.Admin.findOne({},function (err, doc) {
    if(doc.password != req.cookies['x-either-adminpass']) {
      res.redirect('/admin');
    } else {
      next();
    }
  });
}
