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
function init(pluginInterface) {
    pi = pluginInterface;
    log = pi.log;
    localStorage = pi.localStorage;
}

/**
 * onCall handler of plugin
 * @param {string} method Caller method, accept GET only.
 * @param {string} path Plugin URL path
 * @param {object} args parameters of this call
 * @return {object} Returns a Promise object or object containing the result
 */
function onProcCall(method, path, args) {
    let re;
    switch (method) {
    case 'GET':
        if (path === '') { // Request for members
            return listKeys(args);
        }
        re = localStorage.getItem(path);
        return (re == null ? {errors: [{error: 'No such path:'+path}]} : re);
    case 'POST':
    case 'PUT':
        try {
            localStorage.setItem(path, args);
            pi.server.publish(path, args); // PubSub
            return {success: true};
        } catch (e) {
            return {errors: [{error: 'Data should be in JSON format.'}]};
        }
    case 'DELETE':
        if (path == '') localStorage.clear();
        else localStorage.removeItem(path);
        pi.server.publish(path, {}); // PubSub
        return {success: true};
    default:
        return {errors: [{error: `The specified method ${method} is not implemented in admin plugin.`}]}; // eslint-disable-line max-len
    }
}


// eslint-disable-next-line require-jsdoc
function listKeys(args) {
    return new Promise((rslv) => {
        const bInfo = (args && args.info === 'true');
        const re = {};
        if (bInfo) re._info={leaf: false};
        for (let i=0; i<localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key == 'MACtoIP') continue;
            re[key] = {};
            if (bInfo) {
                const size = localStorage.getItem(key).length;
                re[key]._info = {
                    doc: {
                        short: size + ' byte',
                        // ,long : 'Optional long message'
                    },
                    leaf: true,
                };
            }
        }
        rslv(re);
    });
}
