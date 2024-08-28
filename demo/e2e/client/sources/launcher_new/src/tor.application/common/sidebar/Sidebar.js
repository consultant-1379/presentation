define([
    'Titan',
    'template!./template.html',
    'styles!./styles.less'
], function (Titan, template, styles) {

    var STYLE_SELECTED = 'launcher-groupSelector-list-item-link-selected';

    return Titan.View.extend({

        template:template,

        styles:styles,

        setSelectedFolder:function (folderId) {
            this.$('.launcher-groupSelector-list-item-link').removeClass(STYLE_SELECTED);
            this.$('.launcher-groupSelector-list-item-link[data-folder=' + folderId + ']').addClass(STYLE_SELECTED);
        }

    });

});