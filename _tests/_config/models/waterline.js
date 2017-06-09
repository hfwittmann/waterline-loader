'use strict';
const Path = require('path');
// require('dotenv').config();
// const host = require('../../util/environments/docker').host;


// set config
const options = {

    modelPath : Path.join(__dirname, '_waterline'),

    adapters: {
        'mysails-memory': require('sails-memory')
        // 'mysails-mysql' : require('sails-mysql'),
        // 'mysails-redis' : require('sails-redis'),
        // 'mysails-rethink': require('sails-rethinkdb')
    },

    connections: {
        thismemory: {
            adapter: 'mysails-memory'
        }

        // thismysql: {
        //     adapter: 'mysails-mysql',
        //     host: host('mymysql'), // 0.0.0.0 or name used in dockerfile
        //     database: 'test',
        //     user: 'test',
        //     password: 'test'
        // },
        // thisredis: {
        //     adapter: 'mysails-redis',
        //     // host: host('myredis'), // 0.0.0.0 or name used in dockerfile
        //     // port: 6379,
        //     // database: 'test'
        //     url: 'redis://' + host('myredis') + ':6379'
        // },
        // thisrethink: {
        //     adapter: 'mysails-rethink',
        //     host: host('myrethink'), // 0.0.0.0 or name used in dockerfile
        //     port: 28015,
        //     db: 'test'
        // }
    }



};





module.exports = options;
