import os from 'os';
const getIPAddress = () => {
    let IPv4 = '127.0.0.1',
        // hostName,
        en;
    // hostName = os.hostname();
    en = os.networkInterfaces().eth0 || os.networkInterfaces().en0;
    for (let i = 0; i < en.length; i++) {
        if (en[i].family == 'IPv4') {
            IPv4 = en[i].address;
        }
    }
    return IPv4;
};
export default getIPAddress;
