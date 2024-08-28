define([
    'jquery',
    'underscore',
    'base',
    'text!./template.html'
], function ($, _, Base, template) {

    return Base.View.extend({

        template: _.template(template),

        render: function() {
            this.renderTemplate();
            return this;
        }

    });

});