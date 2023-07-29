const mysql = require('mysql');

const info = {
    host: "localhost",
    user: "root",
    password: "cucucu",
    database: "nodejs"
};

function connectToDB() {
    var conn = mysql.createConnection(info);
    
    conn.connect( (err) => {
        if (!err) {
            console.log("Database Connected!!");
        }
    });
    return conn;
}

 
function createTable() {
    
    var conn = connectToDB();
    if (conn) {
        var sql = "CREATE TABLE IF NOT EXISTS members (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
        conn.query(sql, (err, result) => {
            if (!err) {
                console.log("TABLE created successfully!");
                conn.end();
            } else {
                console.log("Cannot create table!");
            }
        });
    } else {
        console.log("Cannot connect to database!");
    }
}

function viewMembers() {
    var conn = connectToDB();
    if (conn) {
        var sql = "SELECT * FROM members";
        conn.query(sql, (err, result) => {
            if (!err) {
                console.log(result);
                return result;   
            }
        })
    }
}

function insertMember(username) {
    var conn = connectToDB();
    if (conn) {
        var member = [username, 'Can Tho'];

        var sql = "INSERT INTO members(name, address) VALUES (?, ?)";
        conn.query(sql, member, (err, result) => {
            console.log("Inserted!");
            conn.end();
        });
    }

    

}

module.exports =  {createTable, insertMember, viewMembers};