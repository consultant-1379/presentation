define([
    'Titan',
    'template!./TableTemplate.html',
    'styles!./TableStyles.less'
], function(Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles,

        events:{
            'click .app1New-sortable':'onClickSortable'
        },

        onClickSortable:function (e) {
            var columnObj = this.$el.find(e.target);
            var desc = columnObj.is('.app1New-sorted-desc');

            this.$el.find('.app1New-sortable').removeClass('app1New-sorted-desc app1New-sorted-asc');
            columnObj.addClass(desc ? 'app1New-sorted-asc' : 'app1New-sorted-desc');

            this.model.save({
                'sorting':{
                    column:columnObj.data('column'),
                    asc:!desc
                }
            });
            this.collection.sort();
        }

    });

});