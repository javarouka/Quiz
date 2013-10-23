/**
 * Created by javarouka on 13. 10. 24.
 */
var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");

var DATASOURCE_DIR = "./datasource";

var DS = {};

exports.init = function() {
    if(!fs.existsSync(DATASOURCE_DIR)) {
        fs.mkdirSync(DATASOURCE_DIR);
    }

    DS.USER = new sqlite3.Database('./datasource/user.db');
    DS.USER.serialize(function() {
        DS.USER.run("CREATE TABLE IF NOT EXISTS USER (" +
            " email TEXT" +
            " ,gender INTEGER" +
            " ,cdt INTEGER" +
            " ,score INTEGER" +
            " ,clear INTEGER )");
    });
    return this;
};

exports.getTable = function(name) {
   return DS[name];
};

