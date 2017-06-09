'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const Path = require('path');
const Loader = require('../index');
// const _ = require('lodash');

const myId = Path.basename(__filename);
const Mocks = require('../_tests/mocks-config');
const User1 = Mocks.generateUser(myId + '1');
const User2 = Mocks.generateUser(myId + '2');
const User3 = Mocks.generateUser(myId + '3');

const Options = require('../_tests/_config/models/waterline');


lab.experiment('test singleton', () => {

    lab.before((done) => {

        done();
    });

    lab.test('test singleton behaviour', (done) => {


        Loader.collections.user.count({}).then((mycount) => {

            console.log(mycount);
            Code.expect(mycount).to.equal(0);
            done();
        });

    });

    lab.test('save user', (done) => {


        Loader.collections.user.create(User1).then(() => {

            return Loader.collections.user.count({});
        })
            .then((mycount) => {

                // console.log(mycount);
                Code.expect(mycount).to.equal(1);
                done();
            });

    });

    lab.test('save temp user2', (done) => {

        let res2;
        let res3;

        Loader.collections.tempuser.create(User2)
            .then((_res2) => {

                res2 = _res2;
                return Loader.collections.tempuser.create(User3);
            })
            .then((_res3) => {

                res3 = _res3;
            })
            .then(() => {

                Code.expect(res2.expiry).not.to.equal(res3.expiry);
                done();
            });

    });


    lab.test('get details of temp user2', (done) => {


        Loader.collections.tempuser.findOne(User2)
            .then((res) => {

                // console.log(res);
                Code.expect(res.expiry).to.exist();
                done();
            });

    });



    lab.test('connect again', (done) => {


        Loader.initialize(Options)

            .then(() => {

                // console.log('Loader', Loader.message);
                Code.expect(Loader.message).to
                    .equal('Warning: Waterline Loader has already beeen initialised. Using existing instance with previous configuration.');
                return Loader.collections.user.count({});

            })
            .then(() => {

                done();
            });


    });

    lab.test('close and then connect again, this time no warnng message', (done) => {


        // thinky.r.getPool().drain()

        Loader.teardown();

        Loader.initialize(Options)
            .then(() => {

                // console.log('Loader', Loader.message);
                Code.expect(Loader.message).to
                    .equal('Success. Waterline Loader has now beeen initialised.');
                return Loader.collections.user.count({});

            })
            .then(() => {

                done();
            });


    });


});
