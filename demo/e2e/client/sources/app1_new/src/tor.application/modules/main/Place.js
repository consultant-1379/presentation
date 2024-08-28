define([
    'Titan',
    './Main'
], function (Titan, Main) {

    return Titan.Place.extend({
        name:'main',
        pattern:'',
        presenter:Main,
        fn:'home'
    });

});