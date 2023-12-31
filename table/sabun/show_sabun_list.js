
// adapted from PMSDifficulty
// https://pmsdifficulty.xxxxxxxx.jp/column_table.html
$(document).ready(function(){
	$.getJSON($("meta[name=bmstable]").attr("content"), function(table_header){
		$.getJSON(table_header.data_url, function(table_data){
			insertTable(table_header, table_data);
		});
	});
});

function insertTable(header, table_data) {
	let tablediv = document.getElementById("tablediv");
	let tablediv_hidden = document.getElementById("tablediv_hidden");

	for (chart_data of table_data) {
		if (!chart_data.is_skipped && !chart_data.is_hidden) {
			addChart(tablediv, chart_data)
		}
		if (!chart_data.is_skipped && chart_data.is_hidden) {
			addChart(tablediv_hidden, chart_data)
		}
	}
}

function addChart(parent, chart_data) {
	let new_indicator = "";
	if (chart_data.is_new) {
		new_indicator = '<span class="new">NEW!!</span> ';
	}

	let favourite_open = "";
	let favourite_close = "";
	if (chart_data.is_favourite) {
		favourite_open = '<span class="favourite_sabun">'
		favourite_close = '</span>'
	}

	let video = "";
	if (chart_data.video != "") {
		video = '<a target="_blank" href="' + chart_data.video + '">YouTube</a>';
	}

	let template = `
${favourite_open}
<a target="_blank" class="dl" href=${chart_data.url_diff}>DL</a>
<b>${chart_data.level_disp} ${chart_data.title}</b> ${new_indicator}<br>
COMMENT: ${chart_data.comment} <br>
<a target="_blank" href="${chart_data.url}">Song</a>
<a target="_blank" href="http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${chart_data.md5}">LR2IR</a>
<a target="_blank" href="http://www.ribbit.xyz/bms/score/view?md5=${chart_data.md5}">Score Viewer</a>
${video}
${favourite_close}

<br><br>`;

	parent.innerHTML += template;
}
