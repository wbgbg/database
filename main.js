'use strict';
const electron = require('electron');
const crypto = require('crypto');
const app = electron.app; // Module to control application life.
const BrowserWindow = electron.BrowserWindow; // Module to create native browser window.
const ipcMain = require('electron').ipcMain;
const Promise = require('bluebird');
const mysql = require('mysql');
const _ = require('lodash');
const connection = mysql.createConnection({
    host: 'rds335ci91et4bh3g5w3.mysql.rds.aliyuncs.com',
    port: '3306',
    user: 'changshenniubi',
    password: 'changshendiao',
    dateStrings: true,
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
console.log(process.versions['chrome']);
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
        connection.queryAsync('INSERT INTO Book (patientId, doctorId, date, statue) values (?,?,?,?)', [booking.patientId, booking.doctorId, booking.date, 4])
        .then(function(ans) {
            event.sender.send('addBook-reply', ans);
        },function(err) {
            console.log(err);
        })
    });

    ipcMain.on('fetchBook', function(event, id) {
        console.log(id);
        console.log('fetchBook'); // prints "ping"
        connection.queryAsync('SELECT * FROM `[fetch Book]` WHERE patientId=' + id)
        .then(function(ans) {
            event.sender.send('fetchBook-reply', ans);
        },function(err) {
            console.log(err);
        });
    });

    ipcMain.on('patientLogin', function(event, user) {
        console.log('patientLogin');
        console.log(sha1sum(user.password));
        connection.queryAsync('SELECT * FROM patientUser WHERE username=\'' + user.username + '\'')
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
        connection.queryAsync('SELECT * FROM doctorUser WHERE username=\'' + user.username + '\'')
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
        connection.queryAsync('INSERT INTO patientUser (username, password, patientName, identification, phone, birthday) values (?,?,?,?,?,?)', [user.username, sha1sum(user.password), user.patientName, user.identification, user.phone, user.birthday])
        .then(function(ans) {
            event.sender.send('patientRegister-reply', true);
        }, function(err) {
            console.log(err);
            event.sender.send('patientRegister-reply', false);
        })
    })

    ipcMain.on('getDoctorbyDepartment', function(event, department) {
        console.log('getDoctorbyDepartment');
        connection.queryAsync('SELECT doctorName,doctorId FROM doctorUser WHERE department=\'' + department + '\'')
        .then(function(ans) {
            console.log(ans);
            if (ans) {
                event.sender.send('getDoctorbyDepartment-reply',ans);
            } else {
                event.sender.send('getDoctorbyDepartment-reply');
            }
        })
    })

    ipcMain.on('getPatientList', function(event, doctorId) {
        console.log('getPatientList');
        connection.queryAsync('SELECT * FROM `[doctor panel patient]` WHERE statue<=4 AND doctorId=' + doctorId)
        .then(function(ans) {
            console.log(ans);
            if (ans) {
                event.sender.send('getPatientList-reply',ans);
            } else {
                event.sender.send('getPatientList-reply');
            }
        })
    })

    ipcMain.on('addTreatment', function(event, treatment) {
        console.log('addTreatment:', treatment);
        connection.beginTransaction(function(err) {
            if (err) { event.sender.send('addTreatment-reply', false);}
            connection.query('INSERT INTO `treatment` (patientId, doctorId, description, bookId) VALUES (?,?,?,?)',[treatment.patientId, treatment.doctorId, treatment.description, treatment.bookId], function (err, result) {
                if (err) {
                    return connection.rollback(function() {
                        event.sender.send('addTreatment-reply', false);
                    });
                }
                connection.query('SELECT treatmentId from `treatment` WHERE bookId=' + treatment.bookId, function(err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            event.sender.send('addTreatment-reply', false);
                        });
                    }
                    console.log(result[0]);
                    var treatmentId = result[0].treatmentId;
                    var values = '';
                    _.forEach(treatment.drugs, function(n,index) {
                        console.log(n, ':', values);
                        if (index != 0 ) {
                            values = values + ',';
                        }
                        values += '(\'' + n.name + '\',' + n.quantity + ',' + treatmentId + ')'
                    });
                    console.log(values);
                    connection.query('INSERT INTO `treatmentmedicine` (drugName, drugQuantity, treatmentId) VALUES ' + values, function(err, results) {
                        if (err) {
                            return connection.rollback(function() {
                                event.sender.send('addTreatment-reply', false);
                            });
                        }
                        connection.query('UPDATE `book` SET statue=5 WHERE bookId=' + treatment.bookId, function(err, results) {
                            if (err) {
                                return connection.rollback(function() {
                                    event.sender.send('addTreatment-reply', false);
                                });
                            }
                            connection.commit(function(err) {
                                if (err) {
                                    return connection.rollback(function() {
                                        event.sender.send('addTreatment-reply', false);
                                    });
                                }
                                console.log('Transaction success');
                                event.sender.send('addTreatment-reply', true);
                            })
                        })
                    })
                })
            })
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