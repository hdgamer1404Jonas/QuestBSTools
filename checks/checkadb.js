const { getLogger, init } = require('../utils/logger.js')

function isWindows() {
    return process.platform === 'win32';
}

function isMac() {
    return process.platform === 'darwin';
}

function isLinux() {
    return process.platform === 'linux';
}

function downloadAdbWIN() {

}

function downloadAdbMAC() {
    
}

function downloadAdbLIN() {
    
}

async function checkAdb() {
    getLogger().info('Checking ADB...');

    if(isWindows) {
        getLogger().info('Windows detected, checking ADB...');
        
        // check if adb is on path, if not, download it
        const { exec } = require('child_process');

        exec('adb --version', (error, stdout, stderr) => {
            if(error) {
                getLogger().error('ADB not found on path, downloading...');
                downloadAdbWIN();
            } else {
                getLogger().info('ADB found on path, continuing...');
            }
        });

        return;
    }

    if(isMac) {
        getLogger().info('Mac detected, checking ADB...');

        // check if adb is on path, if not, download it
        const { exec } = require('child_process');

        exec('adb --version', (error, stdout, stderr) => {
            if(error) {
                getLogger().error('ADB not found on path, downloading...');
                downloadAdbMAC();
            } else {
                getLogger().info('ADB found on path, continuing...');
            }
        });

        return;
    }

    if(isLinux) {
        getLogger().info('Linux detected, checking ADB...');

        // check if adb is on path, if not, download it
        const { exec } = require('child_process');

        exec('adb --version', (error, stdout, stderr) => {
            if(error) {
                getLogger().error('ADB not found on path, downloading...');
                downloadAdbLIN();
            } else {
                getLogger().info('ADB found on path, continuing...');
            }
        });

        return;
    }
}

module.exports = checkAdb;