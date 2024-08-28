define([
    'Titan',
    './TableView',
    './row/RowView'
], function (Titan, View, RowView) {

    return Titan.Presenter.extend({

        init: function () {
            this.view = new View({
                model: this.model,
                collection: this.collection
            });

            this.model.on('change', this.redrawHeaders, this);

            this.collection.on('add', this.renderNewRow, this);
            this.collection.on('reset', this.onLoad, this);
            this.collection.on('remove', this.onRemove, this);

            this.eventBus.bind('reloadTable', this.reloadTable, this);

            // TODO: find best way to make it
            this.collection.comparator = Titan.utils.bind(this.comparator, this);
        },

        onLoad: function () {
            this.view['app1NewRows'].$el.empty();
            this.collection.each(this.renderNewRow, this);
        },

        reloadTable:function () {
            // TODO: review
            this.model.fetch({
                success: Titan.utils.bind(function () {
                    this.collection.fetch();
                }, this)
            });
        },

        renderNewRow: function (model) {
            var rowView = new RowView({
                model: model,
                eventBus: this.eventBus,
                config: this.model
            });
            this.view['app1NewRows'].addWidget(rowView);
        },

        onRemove: function (model) {
            model.view.$el.detach();
        },

        redrawHeaders: function () {
            var groupHolder = this.view['app1NewColumnGroup'];
            var headerHolder = this.view['app1NewHeaders'];

            var sorting = this.model.get('sorting');
            var columns = this.model.get('columns');

            groupHolder.$el.empty();
            headerHolder.$el.empty();

            columns.forEach(function (column) {
                groupHolder.$el.append('<col style="width: ' + column.width + '">');

                var sortingClass = '';
                if (sorting && sorting.column == column.id) {
                    sortingClass = ' app1New-sorted-asc';
                    if (sorting.asc) {
                        sortingClass = ' app1New-sorted-desc';
                    }
                }
                headerHolder.$el.append('<th class="app1New-sortable' + sortingClass + '" data-column="' + column.id + '">' + column.title + '</th>');
            });
            groupHolder.$el.append('<col style="width: 70px;">');
            headerHolder.$el.append('<th><button class="btn app1New-TableComponent2-btn-settings" data-action="settings"></button></th>');
        },

        comparator: function (left, right) {
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