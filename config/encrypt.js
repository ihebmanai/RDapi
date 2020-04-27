const crypto = require('crypto');

const clientOptions = {
    cypher: 'AES-256-CBC',
    key: 'bwMPtQs5Txykpu5WEuzMGr3IWzExAmTA',
};

const encrypt = (value) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(clientOptions.cypher, clientOptions.key, iv);

    let crypted = cipher.update(JSON.stringify(value), 'utf8', 'base64');
    crypted += cipher.final('base64');

    const data = {
        iv: iv.toString('base64'),
        value: crypted,
    };

    let jsonstr = JSON.stringify(data);
    let encoded = new Buffer(jsonstr).toString('base64');
    return encoded;
};

module.exports = encrypt;
