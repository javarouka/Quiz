/**
 * Created by javarouka on 13. 10. 24.
 */
"use strict";
var datasource = require("./../datasource.js").init();
var db = datasource.getTable("USER");

exports.groupGender = function(cb) {
  db.serialize(function() {
    db.all("SELECT (CASE GENDER WHEN 1 THEN 'man' ELSE 'woman' END) as type, COUNT(GENDER) as CT FROM USER GROUP BY GENDER", function(err, row) {
      if(cb) {
        cb(err, row, db);
      }
    });
  });
};

exports.rankTopN  = function(topn, cb) {
  db.serialize(function() {
    db.all("SELECT * FROM USER ORDER BY SCORE DESC, CLEAR ASC, CDT ASC LIMIT " + (topn || 10), function(err, row) {
      if(cb) {
        cb(err, row, db);
      }
    });
  });
};

exports.rankByGender  = function(gender, topn, cb) {
  db.serialize(function() {
    db.all("SELECT * FROM USER WHERE GENDER = ? ORDER BY SCORE DESC, CLEAR ASC, CDT ASC LIMIT " + (topn || 10), {
        1: gender
    },function(err, row) {
      if(cb) {
        cb(err, row, db);
      }
    });
  });
};
