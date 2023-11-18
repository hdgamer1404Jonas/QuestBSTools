const Logger = require('./logging.js')
const fs = require('fs').promises;
const path = require('node:path');
const adb = require('./adb.js');
const { getAdbPath, setAdbPath } = require('./adbPath.js');

let logger;
let adbInstance;

let platform = null;
let appdataPath = null;
let logPath = null;
let adbPath = null;
let adbExePath = null;

let isOnPath = false;

async function init(mainwindow) {
    logger = new Logger(mainwindow);
    logger.info('Logger Initialised');

    platform = process.platform;

    // set appdata path
    switch(platform) {
        case 'win32':
            appdataPath = process.env.APPDATA;
            adbExePath = path.join(appdataPath, 'questbstools', 'adb', 'platform-tools', 'adb.exe');
            getLogger().info('Appdata path set to ' + appdataPath);
            break;
        case 'darwin':
            appdataPath = path.join(process.env.HOME, 'Library', 'Application Support');
            adbExePath = path.join(appdataPath, 'questbstools', 'adb', 'platform-tools', 'adb');
            getLogger().info('Appdata path set to ' + appdataPath);
            break;
        case 'linux':
            appdataPath = path.join(process.env.HOME, '.config');
            isAdbOnPath = true;
            getLogger().info('Appdata path set to ' + appdataPath);
            break;
        default:
            logger.error('Unknown platform: ' + platform);
            break;
    }

    // set log path
    logPath = path.join(appdataPath, 'questbstools', 'logs');
    getLogger().info('Log path set to ' + logPath);

    // check if the log folder exists, if not, create it
    try {
        await fs.access(logPath);
    } catch {
        getLogger().info('Log folder not found, creating...');
        await fs.mkdir(logPath);
    }

    // set adb path
    adbPath = path.join(appdataPath, 'questbstools', 'adb');
    getLogger().info('ADB path set to ' + adbPath);

    // check if the adb folder exists, if not, create it
    try {
        await fs.access(adbPath);
    } catch {
        getLogger().info('ADB folder not found, creating...');
        await fs.mkdir(adbPath);
    }

    if (isOnPath) {
        setAdbPath('adb');
    } else {
        setAdbPath(adbExePath);
    }

    adbInstance = new adb();
}

function getLogger() {
    return logger;
}

function getPlatform() {
    return platform;
}

function getAppdataPath() {
    return appdataPath;
}

function getLogPath() {
    return logPath;
}

function isAdbOnPath() {
    return isOnPath;
}

function setOnPath(value) {
    isOnPath = value;
}

function getAdbExePath() {
    return adbExePath;
}

function getAdb() {
    return adbInstance;

}

module.exports = {
    init,
    getLogger,
    getPlatform,
    getAppdataPath,
    getLogPath,
    getAdbPath,
    isAdbOnPath,
    setOnPath,
    getAdbExePath,
    getAdb
}