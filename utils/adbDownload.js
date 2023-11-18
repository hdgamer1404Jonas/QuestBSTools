const { getLogger, getAdbPath, setOnPath } = require('./globalVars.js');
const fs = require('fs').promises; // Use the promises version of fs for async/await
const path = require('path');
const axios = require('axios');
const AdmZip = require('adm-zip');

async function downloadAdbWIN() {
    const adbZipUrl = 'https://dl.google.com/android/repository/platform-tools-latest-windows.zip';
    const adbZipPath = path.join(getAdbPath(), 'platform-tools-windows.zip');

    getLogger().info(getAdbPath());

    // check if the zip file exists, if yes, delete it and all files in the adb folder
    try {
        await fs.access(adbZipPath);
        getLogger().info('ADB zip file found, deleting...');
        await fs.unlink(adbZipPath);
    } catch {
        getLogger().info('ADB zip file not found, continuing...');
    }

    // download the zip file, wait for it to finish, log the progress every megabyte
    getLogger().info('Downloading ADB...');
    const response = await axios({
        url: adbZipUrl,
        method: 'GET',
        responseType: 'stream',
    });

    const writer = await fs.createWriteStream(adbZipPath, { flags: 'w' });


    response.data.pipe(writer);

    let downloaded = 0;

    response.data.on('data', (chunk) => {
        downloaded += chunk.length;
        getLogger().info('Downloaded ' + downloaded / 1000000 + ' MB');
    });

    await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });

    getLogger().info('Download finished');

    // extract the contents of the zip file directly to the adb folder
    getLogger().info('Extracting ADB...');
    const zip = new AdmZip(adbZipPath);
    zip.extractAllTo(getAdbPath(), true);
    getLogger().info('Extraction finished');
}

async function downloadAdbMAC() {
    const adbPath = path.join(getAdbPath(), 'adb');
    const adbZipUrl = 'https://dl.google.com/android/repository/platform-tools-latest-darwin.zip';
    const adbZipPath = path.join(getAdbPath(), 'platform-tools-mac.zip');

    getLogger().info(getAdbPath());

    // check if the zip file exists, if yes, delete it and all files in the adb folder
    try {
        await fs.access(adbZipPath);
        getLogger().info('ADB zip file found, deleting...');
        await fs.unlink(adbZipPath);
    } catch {
        getLogger().info('ADB zip file not found, continuing...');
    }

    // download the zip file, wait for it to finish, log the progress every megabyte
    getLogger().info('Downloading ADB...');
    const response = await axios({
        url: adbZipUrl,
        method: 'GET',
        responseType: 'stream',
    });

    const writer = fs.createWriteStream(adbZipPath);

    response.data.pipe(writer);

    let downloaded = 0;

    response.data.on('data', (chunk) => {
        downloaded += chunk.length;
        getLogger().info('Downloaded ' + downloaded / 1000000 + ' MB');
    });

    await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });

    getLogger().info('Download finished');

    // extract the contents of the zip file directly to the adb folder
    getLogger().info('Extracting ADB...');
    const zip = new AdmZip(adbZipPath);
    zip.extractAllTo(getAdbPath(), true);
    getLogger().info('Extraction finished');
}

function downloadAdbLIN() {
    // run the apt install command
    const { exec } = require('child_process');
    exec('sudo apt install adb', (error, stdout, stderr) => {
        if (error) {
            getLogger().error('Failed to install ADB');
            getLogger().error(error);
            return;
        }

        getLogger().info('ADB installed');
    });
}

module.exports = {
    downloadAdbWIN,
    downloadAdbMAC,
    downloadAdbLIN,
};
