define([
    'require',
    'base',
    'text!./styles.less'
], function (require, Base, styles) {

    return Base.Presenter.extend({

        init:function () {
            Base.ui.injectStyles('launcher', this.view.cid, styles);
            this.view.render();
            this.initializeWidgets({
                path:require.toUrl('./.'),
                context:this.view
            });
        },

        start:function (container, args) {
            container.setWidget(this.view);
        }

    });

});