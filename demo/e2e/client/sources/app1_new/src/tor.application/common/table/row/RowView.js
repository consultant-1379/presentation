define([
    'Titan',
    'template!./RowTemplate.html'
], function (Titan, template) {

    return Titan.View.extend({

        template:template,

        events:{
            "click [data-action=edit]":  "onEditRow",
            "click [data-action=delete]":"onDeleteRow"
        },

        init:function () {
            this.model.view = this;
            this.model.bind('change', function() {
                var element = new Titan.Element(this.template(this));
                this.$el.html(element.$el.children());
            }, this);
        },

        onEditRow:function () {
            this.options.eventBus.trigger('editRow', this.model);
        },

        onDeleteRow:function () {
            this.options.eventBus.trigger('hideSaveAction', this.model);
            this.model.destroy();
        }

    });

});