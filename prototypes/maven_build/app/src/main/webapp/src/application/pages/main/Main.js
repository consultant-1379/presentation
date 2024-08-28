define([
    'Titan',
    './MainView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        View: View,

        hello: function () {
            console.log('Application.Main.hello()');
        }

    });

});