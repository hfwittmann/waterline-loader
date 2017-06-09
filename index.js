'use strict';

// read in models
const Hoek = require('hoek');
const Path = require('path');
const _ = require('lodash');

const Waterline = require('waterline');



const loader = {
    initialize: null,
    teardown: null,
    waterline: null,
    models: {},
    collections:null,
    dbReady: false,
    message: null
};



const _waterline_ready_fresh = function (options) {

    return new Promise((res, rej) => {

        loader.waterline.initialize(options, (err, ontology) => {

            Hoek.assert(!err, err);
            return res(ontology);
        });
    });
};

const _waterline_ready_already = function () {


    return new Promise((res, rej) => {

        return res(null);
    });
};

loader.initialize = function (options) {

    if (loader.dbReady) {

        loader.message = 'Warning: Waterline Loader has already beeen initialised. Using existing instance with previous configuration.';

        return _waterline_ready_already()
            .then(() => {

                return loader;
            });
    }

    loader.waterline = new Waterline();


    const modelPath = options.modelPath;

    const modelFiles = require('./_readInModels').models(modelPath);

    modelFiles.forEach((modelFile) => {

        const model = require(Path.join(modelPath, modelFile));
        const modelExtended = Waterline.Collection.extend(model); // !!!!!!!!!!
        loader.waterline.loadCollection(modelExtended);

        _.set(loader, ['models', model.connection, model.tableName], model);
    });


    const waterline_ready = _waterline_ready_fresh(options);


    loader.collections = loader.waterline.collections;
    loader.dbReady = true;
    loader.message = 'Success. Waterline Loader has now beeen initialised.';

    return waterline_ready
        .then(() => {



            return loader;
        });




};


loader.teardown = function () {

    loader.waterline.teardown();
    loader.dbReady = false;
};


module.exports = loader;
