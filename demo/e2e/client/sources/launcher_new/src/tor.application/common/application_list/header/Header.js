define([
    'Titan',
    'template!./HeaderTemplate.html'
], function (Titan, template) {

    return Titan.View.extend({

        template:template,

        init:function () {
            this.model.view = this;
            this.model.bind('change', function() {
                this.render();
            }, this);
        }

    });

});