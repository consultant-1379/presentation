define([
    'Titan'
], function (Titan) {

    return Titan.View.extend({

        template: function() {
            return '<div><input type="text" value="123"/></div>';
        }

    });
});