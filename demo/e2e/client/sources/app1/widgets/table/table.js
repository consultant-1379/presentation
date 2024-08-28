define([
    'underscore',
    'base',
    './row',
    'text!./templateTable.html',
    'text!./styles.less'
], function (_, Base, Row, templateTable, styles) {

    var tableTemplate = Base.compileTemplate(templateTable);

    function initWidget() {
        if (this.model) {
            this.model.fetch({
                success:_.bind(function (model, response) {
                    this.loadData();
                }, this)
            });
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

        events:{
            'click .app1-sortable':'onClickSortable'
        },

        initialize:function () {
            Base.ui.injectStyles('app1', this.cid, styles);
            this.eventBus = this.options.eventBus;
            this.eventBus.bind('reloadTable', this.reloadTable, this);
            this.init();
        },

        reloadTable:function () {
            this.$("table").remove();
            this.init();
        },

        onLoad:function () {
            this.$('tbody').empty();
            this.collection.each(this.renderNewRow, this);
        },

        loadData:function () {
            var element = $('<div></div>').html(this.template(this));
            this.el = $(this.el).append(element.children());
            this.collection.comparator = _.bind(this.comparator, this);
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
        },

        onClickSortable:function (e) {
            var columnObj = $(e.target);
            var desc = columnObj.is('.app1-sorted-desc');

            this.$('.app1-sortable').removeClass('app1-sorted-desc app1-sorted-asc');
            columnObj.addClass(desc ? 'app1-sorted-asc' : 'app1-sorted-desc');

            this.model.save({'sorting':{
                column:columnObj.data('column'),
                asc:!desc
            }});
            this.collection.sort();
        },

        comparator:function (left, right) {
            var criteria = this.model.get('sorting');
            if (criteria) {
                var a = left.get(criteria.column),
                    b = right.get(criteria.column);
                var result = a < b ? -1 : a > b ? 1 : 0;
                return criteria.asc ? result : -result;
            }
            return 0;
        }

    });
});
