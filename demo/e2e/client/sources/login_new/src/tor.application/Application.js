define([
    'Titan',
    './modules/places'
], function (Titan, places) {

    return Titan.Application.extend({

        places:places

    });

});