define([
    'Titan',
    './Login'
], function (Titan, Login) {

    return Titan.Place.extend({
        name:'login',
        pattern:'',
        presenter:Login,
        fn:'home'
    });

});