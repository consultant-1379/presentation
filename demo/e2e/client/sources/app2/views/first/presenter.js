define([
    'require',
    'base',
    'text!./styles.less'
], function (require, Base, styles) {

    return Base.Presenter.extend({

        init:function () {
            Base.ui.injectStyles('app2', this.view.cid, styles);
            this.view.render();
            this.initializeWidgets({
                path:require.toUrl('./.'),
                context:this.view
            });
            this.eventBus.bind('addRow', this.onAddRow, this);
        },

        onAddRow:function (value) {
            this.view['table'].collection.create({
                column1:value.column1,
                column2:value.column2,
                column3:value.column3
            });
        },

        start:function (container, args) {
            container.setWidget(this.view);
        }

    });

});