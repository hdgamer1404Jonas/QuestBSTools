const { getLogger, getAdb } = require('../utils/globalVars.js')


async function checkDevices() {
    let devices = getAdb().devices();
    console.log(devices);
}

module.exports = checkDevices;