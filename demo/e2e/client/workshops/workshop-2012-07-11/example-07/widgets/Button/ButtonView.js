define([
    'Titan'
], function (Titan) {

    return Titan.View.extend({

        template: function() {
            return '<div><input type="button" value="Click"/></div>';
        }

    });
});