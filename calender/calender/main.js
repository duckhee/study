const electron = require('electron') ;

//const server = require('./webserver.js') ;

const app = electron.app ;

const BrowserWindow = electron.BrowserWindow ;

const powerSaveBlocker = electron.powerSaveBlocker ;
powerSaveBlocker.start('prevent-display-sleep') ;

const DevelopmentMode = process.argv[2] === "dev" ;

let mainWindow ;

function createWindow() { 
	
	var atomScreen = electron.screen ;
	var displays = atomScreen.getAllDisplays() ;
	var externalDisplay = null ;
	for(var i in displays) {
		if(displays[i].bounds.x > 0 || displays[i].bounds.y > 0) {
			externalDisplay = displays[i] ;
			break ;
		}
	}

	var browserWindowOptions = {width: 800, height: 600, kiosk: !DevelopmentMode, autoHideMenuBar: true, darkTheme:true }

	if(externalDisplay) {
	
		browserWindowOptions.x = externalDisplay.bounds.x + 50 ;
		browserWindowOptions.y = externalDisplay.bounds.y + 50 ;
	}

	mainWindow = new BrowserWindow(browserWindowOptions) ;

	mainWindow.loadURL('file://' + __dirname + '/show.html') ;

	if(DevelopmentMode) {
		mainWindow.webContents.openDevTools() ;
	}

	mainWindow.on('closed', function() {
	
		mainWindow = null ;
	}) ;
}

/*

if(config.remote && config.remote.enabled || firstRun) {
	remote.start() ;
	
	const interfaces = require('os').networkInterfaces() ;
	let addresses = [] ;
	for (let k in interfaces) {
		for(let k2 in interfaces[k]){
			let address = interfaces[k][k2] ;
			if(address.family === 'IPv4' && !address.internal) {
				addresses.push(address.address) ;
			}
		}
	}
	console.log('insert calender schedule on http://%s:%d', addresses[0], config.remote.port) ;

	remote.on('command', function(command) {
		mainWindow.webContents.send('final-result', command) ;
	}) ;
	remote.on('connected', function() {
		mainWindow.webContents.send('connected') ;
	}) ;
	remote.on('disconnected', function() {
		mainWindow.webContents.send('disconnected') ;
	}) ;
	remote.on('devtools', function(open) {
		if(open) {
			mainWindow.webContents.openDevTools() ;
		} else {
			mainWindow.webContents.closeDevTools() ;
		}
	}) ;
	remote.on('kiosk', function() {
		if(mainWindow.iskiosk()) {
			mainWindow.setKiosk(false) ;
		} else {
			mainWindow.setKiosk(true) ;
		}
	}) ;
	remote.on('reload', function() {
		mainWindow.reload() ;
	}) ;
	remote.on('wakeUp', function() {
		mainWindow.webContents.send('remoteWakeUp', true) ;
	}) ;
	remote.on('relaunch', function() {
		console.log('Relaunching....') ;
		app.relaunch() ;
		app.quit() ;
	}) ;
} ;

*/


app.on('ready', createWindow) ;

app.on('window-all-closed', function() {
	app.quit() ;
}) ;

app.on('will-quit', function() {
	if(kwsProcess) {
		kwsProcess.kill() ;
	}

	if(mtnProcess) { 
		mtnProcess.kill() ;
	}
	

}) ; 	
