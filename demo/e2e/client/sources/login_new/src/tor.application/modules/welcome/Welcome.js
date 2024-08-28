define([
    'Titan',
    './WelcomeView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        View:View,

        home:function () {
            console.log('Welcome.home');
        }

    });

});