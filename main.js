'use strict';
const electron = require('electron');
const app = electron.app; // Module to control application life.
const BrowserWindow = electron.BrowserWindow; // Module to create native browser window.
const ipcMain = require('electron').ipcMain;
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'rds335ci91et4bh3g5w3.mysql.rds.aliyuncs.com',
    port: '3306',
    user: 'changshenniubi',
    password: 'changshendiao',
    database: 'hospital'
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

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
    mainWindow = new BrowserWindow({
        'width': 1024,
        'height': 600,
        'resizable': false,
        'accept-first-mouse': true,
        'title': 'database',
        'show': false
    });

    ipcMain.on('addBook', function(event, booking) {
        console.log('addbook'); // prints "ping"
        connection.query('INSERT INTO testBook (patientId, department, doctorName, date, clock, place, statue) values (?,?,?,?,?,?,?)', [1, booking.department, booking.doctorName, booking.date, booking.clock, booking.place, 4], function(err, rows) {
            if (err) {
                return connection.rollback(function() {
                    throw err;
                });
            }
            event.sender.send('addBook-reply', rows);
        });
    });

    ipcMain.on('fetchBook', function(event) {
        console.log('fetchbook'); // prints "ping"
        connection.query('SELECT * FROM testBook', function(err, results, fields) {
            if (err) {
                return connection.rollback(function() {
                    throw err;
                });
            }
            console.log(results);
            event.sender.send('fetchBook-reply', results);
        });
    });
    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    mainWindow.setMenu(null);

    connection.connect();

    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.show();
    });
    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        connection.end();
        mainWindow = null;
    });
});