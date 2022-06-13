const sudo = require('sudo');
const omron2jciebu = require('@e53e04ac/node-omron-2jcie-bu');

let pi;
let log = console.log; // eslint-disable-line no-unused-vars
let localStorage;

module.exports = {
    init: init,
    onCall: onProcCall,
};


/**
 * Initialize plugin
 * @param {object} pluginInterface The interface of picogw plugin
 */
async function init(pluginInterface) {
    pi = pluginInterface;
    log = pi.log;
    localStorage = pi.localStorage;

    await prepareSensor();
}

/**
 * onCall handler of plugin
 * @param {string} method Caller method, accept GET only.
 * @param {string} path Plugin URL path
 * @param {object} args parameters of this call
 * @return {object} Returns a Promise object or object containing the result
 */
async function onProcCall(method, path, args) {
    let re;
    switch (method) {
    case 'GET':
        if (path === '') { // Request for members
	        const controller = omron2jciebu({ path: '/dev/ttyUSB0' });
	        await controller.open();
	        const latestData = await controller.latestDataLong.read({});
	        await controller.close();
	        return latestData;
        }
        //re = localStorage.getItem(path);
	break;
    default:
        return {errors: [{error: `The specified method ${method} is not implemented in admin plugin.`}]}; // eslint-disable-line max-len
    }
}

const sudoOpts = {
    cachePassword: true,
    prompt: 'Need password for sudo to enable Omron sensor ',
    spawnOptions: { /* other options for spawn */ }
};

function sudoAsync(argsArray,opts){ return new Promise((ac,rj)=>{
        const child = sudo(argsArray,opts);
        let outStr='';
        child.stdout.on('data', function (data) {
                outStr += data.toString();
        });
        child.stdout.on('close', function (code) { ac(outStr); });
        child.stdout.on('error', function (err) { rj(err); });
});}

async function prepareSensor(){
	await sudoAsync(['modprobe','ftdi_sio'],sudoOpts);
	await sudoAsync(['chmod', '777', '/sys/bus/usb-serial/drivers/ftdi_sio/new_id'],sudoOpts);
	await sudoAsync(['echo', '0590', '00d4', '>', '/sys/bus/usb-serial/drivers/ftdi_sio/new_id'],sudoOpts);
}
