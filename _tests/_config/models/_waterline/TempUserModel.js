'use strict';
const Moment = require('moment');

module.exports = {

    connection: 'thismemory',
    tableName: 'tempuser',
    attributes: {
        // id:{
        //     type: 'integer',
        //     primaryKey: true,
        //     autoincrement: true
        // },
        username: {
            type: 'string',
            index: true,
            unique: false,
            required: true
        },
        email: {
            type: 'string',
            unique: true,
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        created: {
            type: 'datetime',
            index: true
        },
        expiry: {
            type: 'datetime',
            index: true,
            defaultsTo: function () {

                return new Date(Moment().add(1, 'day'));
            }
        },
        GENERATED_OWNERSHIP_ID: 'string'
    }
};
