var s = g.settings;

module.exports = class Login {
  constructor(express) {
    this.app = express;
    this.settings = s.Login;
    this.DB = new g.classes.DB(); // DB connection & models
    this.model = this.DB.getModel('employee');

    this.router();
  }

  // setup standard CRUD for route
  router() {
    var me = this;
    this.app.all(this.settings.route, function(req, res) {
      // do we have a 404?
      if (!me[req.method]) {
        res.sendStatus(404);
        res.end();
        return;
      }

      // and call the appropriate method
      me[req.method](req, res);
    });
  }

  // Create login!
  POST(req, res) {
    // combine any data sent in the request body with
    // any data sent in the request URL
    var params = req.body || {};

    // we really should be encrypting params.pass!

    // make sure this is a valid request!
    if (!params.email || !params.pass) {
      // Bad request
      res.sendStatus(400);
      res.end();
      return;
    }

    // find one user matching the recieved parameters
    this.model.findOne(params, function(err, result) {
      if (result) {
        // create a session variable, if we found a result
        req.session.loggedIn = result._id;
        req.session.xUsername = result.fName;
      }
      res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername);
     // just answer something, without giving anything away
      res.json(true);
    });
  }

  // check if logged in
  GET(req, res) {
    // we don't need the database here!
    // we have a session variable
    res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername);
    res.json(!!req.session.loggedIn);
  }


  // logout
  DELETE(req, res) {
    // we don't need the database here!
    // we have a session variable
    delete req.session.loggedIn;
    res.json(true);
  }
}