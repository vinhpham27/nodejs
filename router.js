const express = require('express');
const mysql = require('mysql2');

var router = express.Router();

const info = {
    host: "localhost",
    user: "root",
    password: "cucucu",
    database: "nodejs"
};

var conn = mysql.createConnection(info);
conn.connect( (err) => {
    if (err) {
        console.error("Lỗi kết nối đến cơ sở dữ liệu", err);
        return;
    }
    console.log("Kết nối cơ sở dữ liệu thành công");
});

router.get('/', homePage);
router.get('/viewuser', viewUsers);
router.post('/create', createTable);
router.post('/adduser', addUser);
router.post('/edituser', editUser);
router.delete('/deleteuser/:id', deleteUser);

function homePage(req, res) {
    conn.connect( (err) => {
        if (err) {
            res.send("Lỗi kết nối đến cơ sở dữ liệu...", err);
            return;
        }
        res.send("Kết nối cơ sở dữ liệu thành công...");
    });
    

}

function editUser(req, res) {
    const userid = req.body.userid;
    const username = req.body.username;
    const sql = "UPDATE members SET name = ? WHERE ID = ?";
    conn.query(sql, [username, userid], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(req.body);
        console.log(req.body.userid);
        res.status(200).send(`Chỉnh sửa user id = ${userid} thành công!`);
    });
}

function deleteUser(req, res) {
    const userid = req.params.id;

    // Thực hiện truy vấn DELETE để xóa record với ID tương ứng trong bảng "members"
    const sql = "DELETE FROM members WHERE id = ?";
    conn.query(sql, userid, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(result);
        console.log(`Đã xoá user, id = ${userid}`);
    });
    
}

function viewUsers(req, res) {
    if (conn) {
        var sql = "SELECT * FROM members";
        conn.query(sql, (err, result) => {
            if (!err) {
                res.status(200).send(result);   
            }
        })
    }
}

function createTable(req, res) {
    res.send("Create Table!!!");
    if (conn) {
        var sql = "CREATE TABLE IF NOT EXISTS members (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
        conn.query(sql, (err, result) => {
            if (!err) {
                console.log("TABLE created successfully!");
            } else {
                console.log("Cannot create table!");
            }
        });
    } else {
        console.log("Cannot connect to database!");
    }
}

function addUser(req, res) {
    if (conn) {
        const member = [req.body.name, req.body.address];
        //var member = [username, 'Can Tho'];
        

        var sql = "INSERT INTO members(name, address) VALUES (?, ?)";
        conn.query(sql, member, (err, result) => {
            if (err) throw err;
            console.log("Thêm dữ liệu vào bảng members " + result.affectedRows);
            res.status(200).send("Thêm user thành công!");
        });
    }
}

module.exports = router;