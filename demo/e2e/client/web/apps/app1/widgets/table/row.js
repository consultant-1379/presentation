define([
    'base',
    'text!./templateRow.html'
], function (Base, templateRow) {

    var rowTemplate = Base.compileTemplate(templateRow);

    return Base.ui.Widget.extend({

        template:rowTemplate,
        events:{
            "click [data-action=edit]":"onEditRow",
            "click [data-action=delete]":"onDeleteRow"
        },
        init:function () {
            this.model.view = this;
            this.model.bind('change', function() {
                var element = $('<div></div>').html(this.template(this));
                this.el.empty().append(element.children().children());
            }, this);
        },
        onEditRow:function () {
            this.eventBus.trigger('editRow', this.model);
        },
        onDeleteRow:function () {
            this.model.destroy();
        }

    });

});
