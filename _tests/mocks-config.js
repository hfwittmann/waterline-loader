'use strict';
// const Randtoken = require('rand-token');

module.exports = {


    generateUser: function (myId) {

        return {

            email: 'a' + myId + '@company.com',
            username: 'b' + myId,
            password: 'c' + myId,
            sitename : process.env.sitename
        };
    }




};
