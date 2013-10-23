/**
 * Created by javarouka on 13. 10. 24.
 *
 * @Deprecated
 */
var datasource = require("./../datasource.js").init();
var db = datasource.getTable("score");

db.serialize(function() {
    var stmt = db.prepare("INSERT INTO SCORE VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM SCORE", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
});

db.close();