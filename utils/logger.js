const Logger = require('./logging.js')

let logger;

async function init(mainwindow) {
    logger = new Logger(mainwindow);
    logger.info('Logger Initialised');
}

function getLogger() {
    return logger;
}

module.exports = {
    init,
    getLogger
}