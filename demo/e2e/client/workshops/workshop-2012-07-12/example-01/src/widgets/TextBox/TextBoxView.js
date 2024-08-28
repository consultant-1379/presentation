define([
    'Titan',
    'template!./template.html'
], function (Titan, template) {

    return Titan.View.extend({

        template: function() {
            return template();
        }

    });
});