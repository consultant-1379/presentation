define([
    'underscore',
    'base',
    'text!./settings.html',
    'text!./settings.less'
], function (_, Base, template, styles) {

    var tableTemplate = Base.compileTemplate(template);

    function updateWidget() {
        if (this.model) {
            this.model.fetch({
                success:_.bind(function (model, response) {
                    this.loadData();
                }, this)
            });
        } else {
            this.loadData();
        }
    }

    function drawSettings() {

    }

    function render() {
        return this;
    }

    return Base.ui.Widget.extend({

        template:Base.compileTemplate(template),

        init:function () {
            Base.ui.injectStyles('app1', this.cid, styles);
            this.updateWidget = _.bind(updateWidget, this);
        },

        toggle: function() {
            var settingsBlock = this.el;
            if (settingsBlock.is(':visible')) {
                settingsBlock.hide();
            } else {
                this.updateWidget();
                drawSettings();
                settingsBlock.show();
            }
        },

        events:{
            'click .app1-Settings-add':'onAdd',
            'click .app1-Settings-remove':'onRemove',
            'click .app1-Settings-up':'onUp',
            'click .app1-Settings-down':'onDown'
        },

        loadData:function () {
            var element = $(this.template(this));
            this.el.html(element.children());
        },

        onAdd:function (e) {
            var element = Base.$(e.target).parent();
            this.moveAnimate(element, this.$('[data-type=selected]'));
        },

        onRemove:function (e) {
            var element = Base.$(e.target).parent();
            this.moveAnimate(element, this.$('[data-type=not-selected]'));
        },

        onUp:function (e) {
            var thisRow = Base.$(e.target).parent();
            var prevRow = thisRow.prev();
            this.animatedSwap(prevRow, thisRow, _.bind(function()
            {
                var currentColumns = this.model.attributes;
                var thisRowIndex = thisRow.attr("data-column-index");
                var prevRowIndex = prevRow.attr("data-column-index");
                var temp = currentColumns.columns[thisRowIndex];
                currentColumns.columns[thisRowIndex] = currentColumns.columns[prevRowIndex];
                currentColumns.columns[prevRowIndex] = temp;
                thisRow.attr("data-column-index", prevRowIndex);
                prevRow.attr("data-column-index", thisRowIndex);
                this.model.save(currentColumns, {
                    success:_.bind(function() {
                        this.eventBus.trigger('reloadTable');
                    }, this)
                });
            }, this));
        },

        onDown:function (e) {
            var thisRow = Base.$(e.target).parent();
            var nextRow = thisRow.next();
            this.animatedSwap(thisRow, nextRow, _.bind(function()
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
                    success:_.bind(function() {
                        this.eventBus.trigger('reloadTable');
                    }, this)
                });
            }, this));
        },

        moveAnimate:function (element, newParent) {
            var oldOffset = element.offset();
            element.appendTo(newParent);
            var newOffset = element.offset();

            element.toggleClass('app1-Settings-selected');
            var temp = element.clone().appendTo(this.el);
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

            var topTemp = topElement.clone().appendTo(this.el);
            topTemp.addClass("app1-Settings-row-moving");
            topTemp.css({
                position:'absolute',
                left:topOldOffset.left,
                top:topOldOffset.top-5,
                zIndex:1000,
                width: topElement.width()
            });
            var bottomTemp = bottomElement.clone().appendTo(this.el);
            bottomTemp.addClass("app1-Settings-row-moving");
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
                if (callback)
                {
                    callback();
                }
            })
        }
    });

});