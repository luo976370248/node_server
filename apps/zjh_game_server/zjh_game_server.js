require("../../init.js");
var game_config = require("../game_config.js");
var proto_man = require("../../netbus/proto_man.js");
var netbus = require("../../netbus/netbus.js");
var service_manager = require("../../netbus/service_manager.js");
var Stype = require("../Stype.js");

const zjh_game = require('./zjh_game_service.js');

service_manager.register_service(Stype.ZJH_GAME, auth_service);