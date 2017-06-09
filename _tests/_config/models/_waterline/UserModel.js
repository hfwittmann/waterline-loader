'use strict';

module.exports = {

        connection: 'thismemory',
        tableName: 'user',
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
            created: 'datetime',

            blacklisted: 'boolean'

        }
};
