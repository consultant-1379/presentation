define([
    'Titan',
    'template!./template.html',
    'styles!./styles.less'
], function (Titan, template, styles) {

    var STYLE_SELECTED = 'launcher-groupSelector-list-item-link-selected';

    return Titan.View.extend({

        template:template,

        styles:styles,

        events:{
            "focus .launcher-searchBar-searchInput": "onSearchFieldFocus",
            "blur .launcher-searchBar-searchInput": "onSearchFieldBlur"
        },

        onSearchFieldFocus: function(e) {
            this.$(".launcher-searchBar-searchInput").animate({
                "width": "300px"
            });
        },

        onSearchFieldBlur: function(e) {
            this.$(".launcher-searchBar-searchInput").animate({
                "width": "160px"
            });
        }

    });

});