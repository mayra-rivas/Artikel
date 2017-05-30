'use strict';

module.exports = class Server {
  constructor() {
    // save our settings to this
    this.settings = g.settings.Server;

    // add express to this
    this.app = m.express();

    // run the setup method
    this.setup();
  }

  setup() {
    // compress all files using gzip
    this.app.use(m.compression());
    
    // tell express to use middleware to parse JSON
    this.app.use(m.bodyparser.json());
    // declare a webroot
    this.app.use(
      m.express.static(
        m.path.join(g.settings.appRoot, this.settings.webroot)
      )
    );

    // use session middleware
    this.app.use(m.expresssession({
      secret: 'artikeldb',
      resave: false,
      saveUninitialized: true
    }));

    // compress all files using gzip
    this.app.use(m.compression({threshold: 0}));

    // parse all request cookies
    this.app.use(m.cookieparser());

    // parse all urlencoded request body data
    // for example from "standard" HTML forms
    this.app.use(m.bodyparser.urlencoded({extended: false}));

    new g.classes.REST(this.app);   

    // create an endpoint ("*")
    var me = this;
    this.app.get(this.settings.endpoint, function(req, res) {
      // send my index.html file
      res.sendFile(me.settings.indexFile, {root: me.settings.webroot});
    });

    // listen on port 3000
    this.app.listen(this.settings.port,  function() {
      console.log("Server listening on port "+me.settings.port);
    });
  }
}