var Respones = require("../Respones.js");
var mysql_center = require("../../database/mysql_center.js");
var utils = require("../../utils/utils.js");
var log = require("../../utils/log.js");

function guest_login_success(guest_key, data, ret_func) {
	var ret = {};
	// 登陆成功了
	ret.status = Respones.OK;
	ret.uId = data.uid;
	ret.unick = data.unick;
	ret.usex = data.usex;
	ret.uface = data.uface;
	ret.uvip = data.uvip;
	ret.ukey = guest_key;
	ret.ugold = data.ugold,
	ret.uroomCard = data.uroomCard;
	ret.udiamond = data.udiamond;
	ret_func(ret);
}

function write_err(status, ret_func) {
	var ret = {};
	ret.status = status;
	ret_func(ret);
}

function guest_login(ukey, ret_func) {

	var unick = "游客" + utils.random_int_str(4); // 游客9527
	var usex = utils.random_int(0, 1); // 性别
	var uface = 0; // 系统只有一个默认的uface,要么就是自定义face;

	// 查询数据库有无用户, 数据库
	mysql_center.get_guest_uinfo_by_ukey(ukey, function(status, data) {
		if (status != Respones.OK) {
			write_err(status, ret_func);
			return;
		}
		if (data.length <= 0) { // 没有这样的key, 注册一个
			mysql_center.insert_guest_user(unick, uface, usex, ukey, function(status) {
				if (status != Respones.OK) {
					write_err(status, ret_func);
					return;
				}

				guest_login(ukey, ret_func);
			});
		}
		else {
			var sql_uinfo = data[0];
			
			if (sql_uinfo.status != 0) { // 游客账号被封
				write_err(Respones.ILLEGAL_ACCOUNT, ret_func);
				return;
			}

			if (!sql_uinfo.is_guest) { // 不是游客不能用游客登陆;
				write_err(Respones.INVALIDI_OPT, ret_func);
				return;
			}

			guest_login_success(ukey, sql_uinfo, ret_func);
		}
		
	});
	// end 
}

function edit_profile(uid, unick, usex, ret_fun) {
	mysql_center.edit_profile(uid, unick, usex, function(status) {
		if (status != Respones.OK) {
			write_err(status, ret_func);
			return;
		}

		// 修改资料成功
		var body = {
			status: status,
			unick: unick,
			usex: usex,
		}

		ret_fun(body);

	});
}

module.exports = {
	guest_login: guest_login,
	edit_profile: edit_profile,
};