const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const func = async () => {
	const response = await window.versions.ping();
	console.log(response); // prints out 'pong'
	return response;
};

const pingBtn = document.getElementById("ping");
pingBtn.addEventListener("click", () => {
	const pongBox = document.getElementById("pongBox");
	func().then((response) => {
		//add a p tag with response which fades out in 1s and then removes it from DOM
		const p = document.createElement("p");
		p.innerText = response;
		p.style.opacity = 1;
		p.style.transition = "opacity 1s";
		pongBox.appendChild(p);
		setTimeout(() => {
			p.style.opacity = 0;
			setTimeout(() => {
				pongBox.removeChild(p);
			}, 1000);
		}, 1000);
	});
});
