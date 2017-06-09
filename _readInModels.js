'use strict';
// read in models

exports.models = function (modelPath) {

    const fs = require('fs');
    const onlyJs = function (file) {

        return /\.js$/.test(file);
    };

    return fs.readdirSync(modelPath).filter(onlyJs);
};
