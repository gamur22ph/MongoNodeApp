const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGenerator = (id) => {
    const payload = {
        user_id: id
    }

    const jwtToken = jwt.sign(payload, process.env.JWTSECRET, {expiresIn: "1h"});

    return jwtToken;
}

module.exports = jwtGenerator;