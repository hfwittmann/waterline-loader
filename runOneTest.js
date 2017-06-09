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

        // require('./tests/workflow/step_4_1_a_user_create_from_temp');
        // require('./tests/thinky/prechecks/verify_user_password_hashed');

        require('./tests/connect');
        // require('./tests/thinky/batch/ttl');
    })
    .catch((err) => {

        console.log('err:', err);
    });
