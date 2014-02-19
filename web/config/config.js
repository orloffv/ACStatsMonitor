'use strict';

angular.module('monitorApp')
    .constant('configuration', {
        api: {
            host: 'http://localhost\\:3000/'
        }
    });

angular.module('loaderApp')
    .constant('configuration', {
        api: {
            host: 'http://localhost\\:3000/'
        }
    });
