const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

app.disableHardwareAcceleration();

//Create a window that will display our web app
const createWindow = () => {
	const win = new BrowserWindow({
		title: "My Electron App",
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});
	ipcMain.handle("ping", () => "pong");

	win.loadFile("index.html");
};

app.whenReady().then(() => {
	createWindow();

	//Listen for macOS specific events (windows are closed but the app is still running) and re-create the window
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

//Quit the app when all windows are closed (except on macOS)
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
