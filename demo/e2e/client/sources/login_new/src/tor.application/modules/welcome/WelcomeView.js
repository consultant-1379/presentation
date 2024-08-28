define([
    'Titan',
    'template!./template.html',
    'styles!./styles.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template:template,

        styles:styles

    });

});