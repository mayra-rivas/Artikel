var s = g.settings;

module.exports = class REST {
  constructor(express) {
    this.settings = s.REST;
    this.DB = new g.classes.DB(); // DB connection & models  
    this.app = express;
    this.files = this.DB.getModel('subkategori');
    this.harModel = this.DB.getModel('har');
    this.medlemModel = this.DB.getModel('medlem');
    this.artikelModel = this.DB.getModel('artikel');
    this.kommentarModel = this.DB.getModel('kommentar');
    this.skrivModel = this.DB.getModel('skriv');
    this.bildModel = this.DB.getModel('bild');

    this.router();

  }

  // setup standard CRUD for route
  router() {
    var me = this;

    this.app.get('/rest/artikel/subkategori/:id', (req, res) => {
      //console.log(req.params.id);
      this.files.findById(req.params.id, (err, result) => {
        if (err) console.log(err);
        res.send(result);
      })
    });

    this.app.get('/rest/artikel/subkategori', (req, res) => {
      this.files.find({}, (err, result) => {
        //console.log(result);
        res.send(result);
      })
    });

    this.app.get('/rest/artikel/har', (req, res) => {
      this.harModel.find({}, (err, result) => {
        //console.log(result);
        res.send(result);
      })
    });

    //Artikel byId
    this.app.get('/rest/artikel/:id', (req, res) => {
      //console.log(req.params.id);
      this.artikelModel.findById(req.params.id, (err, result) => {
        if (err) console.log(err);
        res.send(result);
      })
    });



    this.app.get('/rest/artikel/har/:id', (req, res) => {
      // console.log('rest har/id: ', req.params.id);
      this.harModel.findById(req.params.id, (err, result) => {
        if (err) console.log(err);
        res.send(result);
      })
    });

    // Get all kommentar by id_artikel
    this.app.get('/rest/artikel/kommentar/:id', (req, res) => {

      //Get the Id_Artikel from req.params.id
      var myId = "";
      // console.log("rest kommentar/id: ",req.params.Id_Artikel);
      this.harModel.findById(req.params.id, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          //console.log("ac: ",result);
          myId = result.artikel.Id_Artikel;
        }
      });

      this.kommentarModel.find({}, (err, result) => {
        var items = result;
        var newResult = [];
          
        if (err) {
          console.log(err);
        }
        else {
          if (items.length) {
            items.forEach(function(x) {
              var myObj = {};
              if (x.artikel.Id_Artikel == myId) {
                myObj = x;
                newResult.push(myObj);
                //console.log("Agregado: " + x.artikel._id + " " + req.params.id);
              }
            });
          }
        }
        //console.log(items.length + " " + newResult.length);
        res.send(newResult);
      })
    });

    //Get alla skriventer
    this.app.get('/rest/artikel/skriv/:id', (req, res) => {

      //Get the Id_Artikel from req.params.id
      var mySkriventId = req.params.id;
      this.skrivModel.find({"artikel" : {"$eq" : mySkriventId}}, (err, result) => {
        var newResult = result;
        // console.log("find: ",newResult);  
        if (err) {
          console.log(err);
          res.send(null);
        }
        else
        {
          res.send(result);
        }
      })

       
    }); // end this.app.get

  
    this.app.all(this.settings.route, function(req, res) {

      var model = me.DB.getModel(req.params.model);
      // do we have a 404?
      if (!me[req.method] || !model) {
        res.sendStatus(404);
        res.end();
        return;
      }

      // how to check if not logged in
      if (!req.session.loggedIn) { /*...*/ }

      // combine any data sent in the request body with
      // any data sent in the request URL
      var params = req.body || {};
      params.model = req.params.model;
      if (req.params.modelID) {
        params.modelID = req.params.modelID;
      }
      res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername);
      // and call the appropriate method
      me[req.method](model, params, req, res);
    });
  }

  // CREATE
  POST(model, params, req, res) {
      var me = this,
        toSave = new model(params); // new model instance with data
      // write data to DB
      toSave.save(function(err, result) {
        if (err) {
          me.error(err, res);
          return;
        }
        res.json(result); // respond with result
      });
    }
    
  // READ
  GET(model, params, req, res) {

    if (req.params.model == 'artikel' && params.modelID != "subkategori") { // Show all artikel or an specific
      var me = this,
        func = params.modelID ? 'findById' : 'find',
        q = params.modelID ? params.modelID : {};
      model[func](q, function(err, result) {
        if (err) {
          me.error(err, res);
          return;
        }
        var items = result;
        var newResult = [];
        if (items.length) {
          items.forEach(function(x) {
            var myObj = {};
            myObj._id = x._id;
            myObj.Id_Artikel = x.Id_Artikel;
            myObj.Rubrik = x.Rubrik;
            myObj.Ingress = x.Ingress;
            myObj.DatumPublicerad = x.DatumPublicerad;
            newResult.push(myObj);
          });
        } else {
          var myObj = {};
          myObj._id = items._id;
          myObj.Id_Artikel = items.Id_Artikel;
          myObj.Rubrik = items.Rubrik;
          myObj.Ingress = items.Ingress;
          myObj.DatumPublicerad = items.DatumPublicerad;
          newResult.push(myObj);
        }
        res.json(newResult);
      });
    } else if (req.params.model == 'artikel/subkategori/:id') {

      console.log(req.params.id, "hejhej")
      res.json(req.params.id) //&& params.modelID == "subkategori") { 
    }

    else if (req.params.model == 'employee' && params.modelID == "vacation") { 
      var me = this;
      model['find']({
        vacation: {
          $size: 2
        }
      }, function(err, result) {
        if (err) {
          me.error(err, res);
          return;
        }
        res.json(result); // respond with result
      });
    } else {
      // pick a mongoose query function and parameters for it
      var me = this,
        func = params.modelID ? 'findById' : 'find',
        q = params.modelID ? params.modelID : {};

      // call the query function (find || findById)
      model[func](q, function(err, result) {
        if (err) {
          me.error(err, res);
          return;
        }
        res.json(result); // respond with result
      });
    }

  }

  // UPDATE
  PUT(model, params, req, res) {

    if (!params.modelID) {
      this.error({
        error: 'Missing ID!'
      }, res);
      return;
    }
    var me = this;
    model.findByIdAndUpdate(params.modelID, params, {
      new: true
    }, function(err, result) {
      if (err) {
        me.error(err, res);
        return;
      }
      res.json(result); // respond with result
    });

  }

  // DELETE
  DELETE(model, params, req, res) {
    //Mayra adding this if
    if (!params.modelID) {
      this.error({
        error: 'Missing ID!'
      }, res);
      return;
    }
    var me = this;
    model.findByIdAndRemove(params.modelID, function(err, result) {
      if (err) {
        me.error(err, res);
        return;
      }
      res.json(true); // respond with result
    });

  }

  error(err, res) {
    res.status(400);
    res.json(err);
  }
};
