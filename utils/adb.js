const { getAdbPath } = require('./adbPath');

class adb {
    adbpath = '';
    constructor() {
        this.adbpath = getAdbPath();
    }

    async exec(command) {
        return new Promise((resolve, reject) => {
            const { exec } = require('child_process');
            exec(this.adbpath + ' ' + command, (error, stdout, stderr) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        });
    }

    async devices() {
        return await this.exec('devices');
    }

    async copy(file, dest, todevice) {
        if (todevice) {
            return await this.exec('push ' + file + ' ' + dest);
        } else {
            return await this.exec('pull ' + file + ' ' + dest);
        }
    }

    async modDataExists() {
        // check if /sdcard/ModData exsists on the device
        let modDataExists = false;
        let stdout = await this.exec('shell ls /sdcard');
        let files = stdout.split('\n');
        files.forEach(file => {
            if (file == 'ModData') {
                modDataExists = true;
            }
        });
        return modDataExists;
    }
}

module.exports = adb;