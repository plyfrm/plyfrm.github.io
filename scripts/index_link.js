let not_in_frame = window === window.parent;

if (not_in_frame) {
	let index_link = document.getElementById("index_link");
	let a = document.createElement("a");
	a.setAttribute("href", "./index.html");
	a.innerHTML = "&lt;&lt; Back to INDEX";
	index_link.append(a);
	index_link.append(document.createElement("br"));
	index_link.append(document.createElement("br"));
}