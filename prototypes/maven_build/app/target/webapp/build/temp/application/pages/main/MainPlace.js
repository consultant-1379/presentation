define([
    'Titan',
    './Main'
], function (Titan, Main) {

    return Titan.Place.extend({
        name: 'main',
        pattern: 'application',
        presenter: Main,
        fn: 'hello',
        default: true
    });

});