define([
    'Titan',
    './TextBoxView',
    './TextBoxModel'
], function (Titan, View, Model) {

    return Titan.Widget.extend({
        options: {
            Model: Model,
            View: View
        }
    });

});