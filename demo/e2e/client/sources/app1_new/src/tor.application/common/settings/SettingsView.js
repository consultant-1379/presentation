define([
    'Titan',
    'template!./SettingsTemplate.html',
    'styles!./SettingsStyles.less'
], function(Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles,

        events: {
            'click .app1New-Settings-add':'onAdd',
            'click .app1New-Settings-remove':'onRemove',
            'click .app1New-Settings-up':'onUp',
            'click .app1New-Settings-down':'onDown'
        },

        toggle: function() {
            var settingsBlock = this.$el;
            if (settingsBlock.is(':visible')) {
                settingsBlock.hide();
            } else {
                settingsBlock.show();
            }
        },

        init:function () {
            // TODO: there could be better way to do it
            this.model.view = this;
            this.model.bind('change', function() {
                var element = new Titan.Element(this.template(this));
                this.$el.html(element.$el.children());
            }, this);
        },

        onAdd:function (e) {
            var element = this.$el.find(e.target).parent();
            this.moveAnimate(element, this.$el.find('[data-type=selected]'));
        },

        onRemove:function (e) {
            var element = this.$el.find(e.target).parent();
            this.moveAnimate(element, this.$el.find('[data-type=not-selected]'));
        },

        onUp:function (e) {
            var thisRow = this.$el.find(e.target).parent();
            var prevRow = thisRow.prev();
            this.animatedSwap(prevRow, thisRow, Titan.utils.bind(function() {
                var currentColumns = this.model.attributes;
                var thisRowIndex = thisRow.attr("data-column-index");
                var prevRowIndex = prevRow.attr("data-column-index");
                var temp = currentColumns.columns[thisRowIndex];
                currentColumns.columns[thisRowIndex] = currentColumns.columns[prevRowIndex];
                currentColumns.columns[prevRowIndex] = temp;
                thisRow.attr("data-column-index", prevRowIndex);
                prevRow.attr("data-column-index", thisRowIndex);
                this.model.save(currentColumns, {
                    success: Titan.utils.bind(this.presenter.triggerReloadTable, this.presenter)
                });
            }, this));
        },

        onDown:function (e) {
            var thisRow = this.$el.find(e.target).parent();
            var nextRow = thisRow.next();
            this.animatedSwap(thisRow, nextRow, Titan.utils.bind(function()
            {
                var currentColumns = this.model.attributes;
                var thisRowIndex = thisRow.attr("data-column-index");
                var nextRowIndex = nextRow.attr("data-column-index");
                var temp = currentColumns.columns[thisRowIndex];
                currentColumns.columns[thisRowIndex] = currentColumns.columns[nextRowIndex];
                currentColumns.columns[nextRowIndex] = temp;
                thisRow.attr("data-column-index", nextRowIndex);
                nextRow.attr("data-column-index", thisRowIndex);
                this.model.save(currentColumns, {
                    success: Titan.utils.bind(this.presenter.triggerReloadTable, this.presenter)
                });
            }, this));
        },

        moveAnimate:function (element, newParent) {
            var oldOffset = element.offset();
            element.appendTo(newParent);
            var newOffset = element.offset();

            element.toggleClass('app1New-Settings-selected');
            var temp = element.clone().appendTo(this.$el);
            temp.css({
                position:'absolute',
                left:oldOffset.left,
                top:oldOffset.top-5,
                zIndex:1000,
                width: element.width()
            });
            element.css('visibility', 'hidden');
            temp.animate({
                top:newOffset.top-5,
                left:newOffset.left
            }, 400, function () {
                element.css('visibility', 'visible');
                temp.remove();
            });
        },

        animatedSwap:function (topElement, bottomElement, callback) {
            var topOldOffset = topElement.offset();
            var bottomOldOffset = bottomElement.offset();
            bottomElement.insertBefore(topElement);
            var topNewOffset = topElement.offset();
            var bottomNewOffset = bottomElement.offset();

            var topTemp = topElement.clone().appendTo(this.$el);
            topTemp.addClass("app1New-Settings-row-moving");
            topTemp.css({
                position:'absolute',
                left:topOldOffset.left,
                top:topOldOffset.top-5,
                zIndex:1000,
                width: topElement.width()
            });
            var bottomTemp = bottomElement.clone().appendTo(this.$el);
            bottomTemp.addClass("app1New-Settings-row-moving");
            bottomTemp.css({
                position:'absolute',
                left:bottomOldOffset.left,
                top:bottomOldOffset.top-5,
                zIndex:1000,
                width: bottomElement.width()
            });
            topElement.css('visibility', 'hidden');
            bottomElement.css('visibility', 'hidden');
            topTemp.animate({
                top:topNewOffset.top-5,
                left:topNewOffset.left
            }, 400);
            bottomTemp.animate({
                top:bottomNewOffset.top-5,
                left:bottomNewOffset.left
            }, 400, function () {
                topElement.css('visibility', 'visible');
                bottomElement.css('visibility', 'visible');
                topTemp.remove();
                bottomTemp.remove();
                if (callback) {
                    callback();
                }
            })
        }

    });

});