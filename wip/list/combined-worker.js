onmessage = (event) => {
	let html = "";
	for (entry of event.data) {
		html = html + `<tr> <td><a href="${entry.url}">${entry.title}</a></td> <td><a href="${entry.url}">${entry.artist}</a></td> <td><a href="${entry.url}">${entry.comment}</a></td> </tr>`;
	}
	postMessage(html);
}