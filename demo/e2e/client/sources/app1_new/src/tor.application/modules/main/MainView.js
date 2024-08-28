define([
    'Titan',
    'template!./template.html',
    'styles!./styles.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template:template,

        styles:styles,

        events:{
            'click [data-action=settings]':'onSettings'
        },

        onSettings:function () {
            this.presenter.toggleSettings();
        }

    });

});