var mysql =  require('mysql');

function connect_to_center(host, port, db_name, uname, upwd) {
    mysql.createPool({
        host: host,
        port: port,
        database: db_name,
        user: uname,
        password: upwd,
    })
}

module.exports = {
    connect: connect_to_center,
}