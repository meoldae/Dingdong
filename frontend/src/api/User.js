const { HttpJson } = require("./Http");

const createUser = async (param, success, fail) => {
    await HttpJson.post(`user/signup`, JSON.stringify(param))
        .then(success)
        .catch(fail);
};

module.exports = {
    createUser
};
