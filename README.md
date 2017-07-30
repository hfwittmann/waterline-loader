This module is inspired by https://github.com/mwielbut/thinky-loader

It does the same for waterline, so basically it is just a singleton for waterline;

Once the connection is ready, you can use the following line anywhere in your server app to get access (same principle as for thinky-loader):

```javascript
const Waterline = require('waterline-loader');
```
This module is tested and comes with 100% test-coverage.



An example config may be found in the sub folder _tests/_config

The recommended use is to place this config folder in your own project's root folder, then to change the config according to your requirements.

The tests here use sails-memory as the "database"-module. Other modules can be used, such as mysails-redis.

The necessary steps are

1) Place the example config from the sub folder _tests/_config in your project's root folder.
2) Choose the database type you want to use. Download the necessary module, e.g. sails-redis if you want to use redis.
3) Modify the config to reflect this. The example config file has commented out versions of what to use. E.g. for redis a standard config is:

```javascript	

	adapters: {
           'mysails-redis' : require('sails-redis'),
    	},

        
	thisredis: {
            adapter: 'mysails-redis',
            host: host('myredis'), // 0.0.0.0 or name used in dockerfile
            port: 6379,
            database: 'test'
            url: 'redis://' + host('myredis') + ':6379'
        },

```
Remark : host('myredis') is just a shorthand and should be replaced, depending on the circumstances. There are two cases: 
a) If docker is not used then typically this should be replaced by 0.0.0.0 or localhost
b) If docker is used, then typically this the moniker used in the docker-compose.yml 

4) change the connection name in the models files to your requirements.

   E.g. if you use the config settings from 3) change the connection names in the models from thismemory to thisredis; ie the TempUserModel.js and UserModel.js will have a changed line

	.... connection: 'thismemory', 

	becomes
	
	connection: 'thisredis'

5) Initialise your waterline connection 
	
	```javascript
	const Waterline = require('waterline-loader');
	const _waterlineConfig = require(Path.resolve(models, 'waterline'));
	const WaterlineReady = Waterline.initialize(_waterlineConfig);
	```
	
	WaterlineReady is a Promise that will resolve, when the database connection is ready.

6) Once the connection is ready, you can use the following line anywhere in your server app to get access (same principle as for thinky-loader):

const Waterline = require('waterline-loader');
 



