define([
    'Titan',
    './Welcome'
], function (Titan, Welcome) {

    return Titan.Place.extend({
        name:'welcome',
        pattern:'',
        presenter:Welcome,
        fn:'home'
    });

});