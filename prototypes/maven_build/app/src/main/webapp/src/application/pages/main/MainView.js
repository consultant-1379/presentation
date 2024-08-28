define([
    'Titan',
    'template!./Main.html',
    'styles!./Main.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles

    });

});