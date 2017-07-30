'use strict';

const Options = require('./_tests/_config/models/waterline');
const Loader = require('./index');

const LoaderReady = Loader.initialize(Options);

Promise.all([LoaderReady]).then((res) => {


    // console.log('Ready!', res);
})

    .then(() => {

        return Promise.all([
            Loader.collections.user.destroy({})]);
    })
    .then(() => {

        require('./tests/connect');
    })
    .catch((err) => {

        console.log('err:', err);
    });
