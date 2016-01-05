'use strict';
const electron = require('electron');
const crypto = require('crypto');
const app = electron.app; // Module to control application life.
const BrowserWindow = electron.BrowserWindow; // Module to create native browser window.
const ipcMain = require('electron').ipcMain;
const Promise = require('bluebird');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'rds335ci91et4bh3g5w3.mysql.rds.aliyuncs.com',
    port: '3306',
    user: 'changshenniubi',
    password: 'changshendiao',
    database: 'hospital'
});

var sha1sum = function(input) {
    return crypto.createHash('sha512').update(JSON.stringify(input)).digest('HEX');
}
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
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
        console.dir(booking, {depth:null});
        connection.queryAsync('INSERT INTO testBook (patientId, department, doctorName, date, clock, place, statue) values (?,?,?,?,?,?,?)', [booking.patinentId, booking.department, booking.doctorName, booking.date, booking.clock, booking.place, 4])
        .then(function(ans) {
            event.sender.send('addBook-reply', ans);
        },function(err) {
            console.log(err);
        })
    });

    ipcMain.on('fetchBook', function(event, id) {
        console.log(id);
        console.log('fetchBook'); // prints "ping"
        connection.queryAsync('SELECT * FROM testBook WHERE patientId=\'' + id + '\'')
        .then(function(ans) {
            event.sender.send('fetchBook-reply', ans);
        },function(err) {
            console.log(err);
        });
    });

    ipcMain.on('patientLogin', function(event, user) {
        console.log('patientLogin');
        console.log(sha1sum(user.password));
        connection.queryAsync('SELECT * FROM testPatientUser WHERE username=\'' + user.username + '\'')
        .then(function(ans) {
            console.log(ans[0]);
            if (ans[0] && (ans[0].password == sha1sum(user.password))) {
                event.sender.send('patientLogin-reply',ans[0]);
            } else {
                event.sender.send('patientLogin-reply');
            }
        },function(err) {
            console.log(err);
        });
    });

    ipcMain.on('doctorLogin', function(event, user) {
        console.log('doctorLogin');
        console.log(sha1sum(user.password));
        connection.queryAsync('SELECT * FROM testDoctorUser WHERE username=\'' + user.username + '\'')
        .then(function(ans) {
            console.log(ans[0]);
            if (ans[0] && (ans[0].password == sha1sum(user.password))) {
                event.sender.send('doctorLogin-reply',ans[0]);
            } else {
                event.sender.send('doctorLogin-reply');
            }
        },function(err) {
            console.log(err);
        });
    });

    ipcMain.on('patientRegister', function(event, user) {
        console.log('patientRegister');
        connection.queryAsync('INSERT INTO testPatientUser (username, password, patientName, identification, phone, birthday) values (?,?,?,?,?,?)', [user.username, sha1sum(user.password), user.patientName, user.identification, user.phone, user.birthday])
        .then(function(ans) {
            event.sender.send('patientRegister-reply', true);
        }, function(err) {
            console.log(err);
            event.sender.send('patientRegister-reply', false);
        })
    })
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