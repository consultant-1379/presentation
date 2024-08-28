define([
    'underscore',
    'base',
    './row',
    'text!./templateTable.html'
], function (_, Base, Row, templateTable) {

    var tableTemplate = Base.compileTemplate(templateTable);

    function initWidget() {
        if (this.model) {
            this.model.bind('change', this.loadData, this);
            this.model.fetch();
        } else {
            this.loadData();
        }
    }

    function render() {
        return this;
    }

    return Base.ui.Widget.extend({

        template:tableTemplate,
        init:initWidget,
        render:render,

        initialize:function () {
            this.eventBus = this.options.eventBus;
            this.init();
        },

        onLoad:function () {
            this.collection.each(this.renderNewRow, this);
        },

        loadData:function () {
            var element = $('<div></div>').html(this.template(this));
            this.el = $(this.el).append(element.children());
            this.collection.bind('add', this.renderNewRow, this);
            this.collection.bind('reset', this.onLoad, this);
            this.collection.bind('remove', this.onRemove, this);
            this.collection.fetch();
        },

        renderNewRow:function (model) {
            var row = new Row({
                model:model,
                eventBus:this.eventBus,
                config:this.model
            });
            this.$('tbody').append(row.el);
        },

        onRemove:function (model) {
            model.view.el.detach();
        }

    });
});
