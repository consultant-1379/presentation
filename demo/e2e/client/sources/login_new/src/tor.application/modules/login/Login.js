define([
    'Titan',
    './LoginView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        View:View,

        home:function () {
            console.log('Login_Presenter.home');
        }

    });

});