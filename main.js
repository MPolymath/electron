var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');
// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  
  // Printer options
  mainWindow.webContents.on('did-finish-load', function() {
    console.log('finish loading');
   // mainWindow.webContents.print({silent: true});

  //uncomment to show window
  /*  setTimeout(function(){
      mainWindow.show();}, 3000);*/
  }, function(err, data) {
    console.log(data);
  });
  
  ipc.on('print', function(){
    mainWindow.webContents.print({silent: true});
    //mainWindow.hide(); 
  }); 
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
