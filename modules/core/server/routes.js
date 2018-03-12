var path = require('path');

module.exports = function(app){
         //define routes
        app.get('/', function(req,res){
          res.send('App works !');
        });

};
