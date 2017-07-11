require("../../init.js");
var game_config = require("../game_config.js");
var proto_man = require("../../netbus/proto_man.js");
var netbus = require("../../netbus/netbus.js");
var service_manager = require("../../netbus/service_manager.js");
var Stype = require("../Stype.js");

var room_serve = require("./room_serve.js");

var hall = game_config.hall_server;
netbus.start_tcp_server(hall.host, hall.port, false);

service_manager.register_service(Stype.ROOM, room_serve);


// 连接中心数据库
var room_mysql_config = game_config.room_database;
var mysql_room = require("../../database/mysql_room.js");
mysql_room.connect(room_mysql_config.host, room_mysql_config.port,
	                 room_mysql_config.db_name, room_mysql_config.uname, room_mysql_config.upwd);
// end 