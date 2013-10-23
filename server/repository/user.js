/**
 * Created by javarouka on 13. 10. 24.
 */
var datasource = require("./../datasource.js").init();
var db = datasource.getTable("USER");

var findById = function(id, cb) {
    db.serialize(function() {
        db.get("SELECT * FROM USER WHERE nickname = ?", {
            1: id
        }, function(err, row) {
            if(cb) {
                cb(err, row);
            }
        });
    });
};

exports.clear = function() {
    db.serialize(function() {
        db.run("DELETE FROM USER;");
    });
};

exports.addUser = function(user, cb) {
    exports.findById(user.nickname, function(err, exists) {
        if(exists) {
            return cb(new Error("exists same nick name > " + user.nickname), exists);
        }
        db.serialize(function() {
            var stmt = db.prepare(
                "INSERT INTO USER " +
                "(nickname, gender, cdt, score, clear) " +
                "VALUES (?,?,?,?,?)"
            );
            stmt.run(
                user.nickname,
                user.gender,
                user.cdt,
                user.score,
                user.clear,
                cb
            );
            stmt.finalize();
        });
    });
};
exports.list = function(cb) {
    db.serialize(function() {
        db.all("SELECT * FROM USER", function(err, row) {
            if(cb) {
                cb(err, row);
            }
        });
    });
};
exports.findById = findById;

exports.list(function(err, registedUsers){
   if(!err && Array.isArray(registedUsers)) {
       console.log("registed users list >");
       registedUsers.forEach(function(user) {
           console.log(user);
       });
   }
});