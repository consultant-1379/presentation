define([
    'Titan',
    './ButtonView',
    './ButtonModel'
], function (Titan, View, Model) {

    return Titan.Widget.extend({
        options: {
            Model: Model,
            View: View
        }
    });

});