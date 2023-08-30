// メニュー開閉
function menu(tName) {
	var tMenu = document.getElementById(tName).style;
	if (tMenu.display == 'none') {
		tMenu.display = "block";
	} else {
		tMenu.display = "none";
	}
}

$(document).ready(function () {
	$.getJSON($("meta[name=bmstable]").attr("content"), function (header) {
		$.getJSON(header.data_url, function (information) {
			// headerのsort有無で分岐
			if (header["level_order"]) {
				makeBMSTable(information, header.symbol, header["level_order"]);
			} else {
				makeBMSTable(information, header.symbol);
			}
		});
	});
});

// ソートのための引数追加
function makeBMSTable(info, mark, order) {
	// orderが未指定の場合はnull
	if (typeof order === 'undefined') {
		order = null;
	}

	var x = "";
	var fox = "";
	var ev = "";
	var count = 0;
	var obj = $("#table_int");

	// ソート
	if (order != "" && order != null) {
		// herder.jsonにsortが存在する場合は指定順->タイトル順にソート

		var orderAry = [];
		for (var l = 0; l < order.length; l++) {
			orderAry.push(order[l].toString());
		}

		for (var j = 0; j < info.length; j++) {
			var index = orderAry.indexOf(info[j]["level"]);
			info[j]["_index"] = index;
		}

		info.sort(function (a, b) {
			if (a["_index"] < b["_index"]) {
				return -1;
			} else if (a["_index"] > b["_index"]) {
				return 1;
			} else if (a["title"].toLowerCase() < b["title"].toLowerCase()) {
				return -1;
			} else if (a["title"].toLowerCase() > b["title"].toLowerCase()) {
				return 1;
			} else {
				return 0;
			}
		});
		for (var k = 0; k < info.length; k++) {
			delete info[k]["_index"];
		}
	} else {
		// そうでない場合はレベル順->タイトル順にソート
		info.sort(
			function (a, b) {
				var aLv = a["level"].toString();
				var bLv = b["level"].toString();
				if (isNaN(a["level"]) == false && isNaN(b["level"]) == false) {
					return a["level"] - b["level"];
				} else if (aLv < bLv) {
					return -1;
				} else if (aLv > bLv) {
					return 1;
				} else if (a["title"].toLowerCase() < b["title"].toLowerCase()) {
					return -1;
				} else if (a["title"].toLowerCase() > b["title"].toLowerCase()) {
					return 1;
				} else {
					return 0;
				}
			}
		);
	}

	// 表のクリア
	obj.html("");
	$("<tr height='20' style='color:white;background-color:#666666'><td align='center'>Level</td><td align='center'>Title</td><td align='center'>Artist</td><td align='center'>Chart</td><td align='center'>Comment</td></tr>").appendTo(obj);
	var obj_sep = null;
	for (var i = 0; i < info.length; i++) {
		// 難度ごとの区切り
		if (x != info[i].level) {
			// 前の区切りに譜面数、平均密度を追加
			if (obj_sep != null) {
				if (x.slice(0, 1) == '＝' || x.slice(0, 1) == '：' || x.slice(0, 1) == '；') {
					fox = "<span class='omemeup'>" + x.slice(0, 1) + "</span>" + x.slice(1)
				} else if (x.slice(0, 1) == '￤' || x.slice(0, 1) == '冫') {
					fox = "<span class='omemedown'>" + x.slice(0, 1) + "</span>" + x.slice(1)
				} else {
					fox = x
				}
				obj_sep.html("<td colspan='7' align='center'>" + "<b>" + mark + fox + " (" + count + "譜面)</b></td>");
			}
			obj_sep = $("<tr class='tr_separate' id='" + mark + info[i].level + "'></tr>");
			obj_sep.appendTo(obj);
			count = 0;
			x = info[i].level;
		}
		// 本文
		var str = $("<tr class='tr_normal'></tr>");

		if (info[i].state == 1) {
			str = $("<tr class='state1'></tr>");
		}
		if (info[i].state == 2) {
			str = $("<tr class='state2'></tr>");
		}
		if (info[i].state == 3) {
			str = $("<tr class='state3'></tr>");
		}
		if (info[i].state == 4) {
			str = $("<tr class='state4'></tr>");
		}
		if (info[i].state == 5) {
			str = $("<tr class='state5'></tr>");
		}
		if (info[i].state == 6) {
			str = $("<tr class='state6'></tr>");

		}

		// Level
		if (x.slice(0, 1) == '＝' || x.slice(0, 1) == '：' || x.slice(0, 1) == '；') {
			level = "<span class='omemeup'>" + x.slice(0, 1) + "</span>" + x.slice(1)
		} else {
			level = x
		}
		$("<td width='7%' valign='middle' style='padding: 0 8px 0 8px; text-align: center;'>" + mark + level + "</td>").appendTo(str);

		// Title
		$("<td width='30%' valign='middle'>" + "<a href='http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=" + info[i].md5 + "' target='_blank'>" + info[i].title + "</a></td>").appendTo(str);
		// Artist
		var astr = "";
		if (info[i].url != "" && info[i].url != null) {
			if (info[i].artist != "" && info[i].artist != null) {
				astr = "<a href='" + info[i].url + "'>" + info[i].artist + "</a>";
			} else {
				astr = "<a href='" + info[i].url + "'>" + info[i].url + "</a>";
			}
		} else {
			if (info[i].artist != "" && info[i].artist != null) {
				astr = info[i].artist;
			}
		}
		if (info[i].url_pack != "" && info[i].url_pack != null) {
			if (info[i].name_pack != "" && info[i].name_pack != null) {
				astr += "<br />(<a href='" + info[i].url_pack + "'>" + info[i].name_pack + "</a>)";
			} else {
				astr += "<br />(<a href='" + info[i].url_pack + "'>" + info[i].url_pack + "</a>)";
			}
		} else {
			if (info[i].name_pack != "" && info[i].name_pack != null) {
				astr += "<br />(" + info[i].name_pack + ")";
			}
		}
		$("<td width='30%' valign='middle'>" + astr + "</td>").appendTo(str);
		// sabun
		if (info[i].url_diff != "" && info[i].url_diff != null) {
			$("<td width='8%' align='center' valign='middle'><a href='" + info[i].url_diff + "'>差分</a></td>").appendTo(str);
		} else {
			$("<td width='8%' align='center' valign='middle'>同梱譜面</td>").appendTo(str);
		}
		// Comment
		$("<td width='30%' valign='middle' style='padding: 0 8px 0 8px; text-align: justify;'>" + info[i].comment + "</div></td>").appendTo(str);
		str.appendTo(obj);
		count++;
	}


	// 最後の区切り処理
	// マークが抜け落ちてたので追加
	if (obj_sep != null) {
		obj_sep.html("<td colspan='7' align='center'>" + "<b>" + mark + x + " (" + count + "譜面)</b></td>");
	}
}
