const db = require('../../database/db.js');
const Respones = require("../../apps/Respones.js");
const utils = require("../../utils/utils.js");
const log = require("../../utils/log.js");
const wx_info = require('../../config/wx.js');

function guest_login_success(guest_key, data, ret_func) {
	var ret = {};
	// 登陆成功了
	ret.status = Respones.OK;
	ret.uid = data.uid;
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


function guest_login(ukey, ret_fun) {
    // 查询数据库，这个账号是否存在
    db.get_guest_uinfo_by_ukey(ukey, function(state, data) {
        if (state === Respones.SYSTEM_ERR) {
			log.info('111111');
            ret_fun(state, null);
            return;
        }

        // 如果不存在，就插入一条记录到数据库
        if (data.length <= 0) {
			var wx = wx_info[utils.random_int(0, 5)];
			var unick = wx.nick;
			var usex = utils.random_int(0, 1); // 性别
            var uface = "http://localhost:3000/" + wx.head; // 系统只有一个默认的uface,要么就是自定义face;
			log.info(uface);
            db.insert_guest_user(unick, uface, usex, ukey, function(state) {
                if (state === Respones.SYSTEM_ERR) {
                    write_err(state, ret_fun);
					log.info('111111');
                    return;
                }

                guest_login(ukey, ret_fun);
            });
        } else {
            // 查询到这个游客账号存在

            var sql_uinfo = data[0];
			
			if (sql_uinfo.status != 0) { // 游客账号被封
				write_err(Respones.ILLEGAL_ACCOUNT, ret_fun);
				return;
			}

			if (!sql_uinfo.is_guest) { // 不是游客不能用游客登陆;
				write_err(Respones.INVALIDI_OPT, ret_fun);
				return;
			}

			guest_login_success(ukey, sql_uinfo, ret_fun);
        }

    });
}

module.exports = {
	guest_login: guest_login,
}