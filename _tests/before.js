// load  test config
'use strict';

// const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

const Options = require('./_config/models/waterline');
const Loader = require('../index');




lab.test('load singleton, bfore after tests to reduce boilerplate', (done) => {

    const LoaderReady = Loader.initialize(Options);

    Promise.all([LoaderReady]).then(() => {

        Loader.collections.user.destroy({});
    })
        .then(() => {

            done();
        });


});




