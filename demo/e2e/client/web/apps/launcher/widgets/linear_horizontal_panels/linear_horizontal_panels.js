define([
    'underscore',
    'base',
    'text!./linear_horizontal_panels.html',
    'text!./linear_horizontal_panels.less'
], function (_, Base, template, styles) {

    var tableTemplate = Base.compileTemplate(template);

    /*function updateWidget() {
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
    */
    function render() {
        return this;
    }

    return Base.ui.Widget.extend({

        template:Base.compileTemplate(template),

        init:function () {
            Base.ui.injectStyles('linear_horizontal_panels', this.cid, styles);
            this.eventBus.bind("mainWindowResized", this.onResize, this);
            this.size = "";
            this.currentPanelNum = 2;
            this.panels = this.$(".linear-horizontal-panel");
            //this.updateWidget = _.bind(updateWidget, this);
        },

        events:{
            // 'click .app1-Settings-add':'onAdd'
            'click .launcher_app_details': 'onClick'
        },

        loadData:function () {
            var element = Base.$(this.template(this));
            this.el.html(element.children());
        },

        onClick: function() {
            this.currentPanelNum = this.currentPanelNum == 0 ? 0 : this.currentPanelNum - 1;
            this.size = "";
            this.onResize();
        },

        onResize: function() {
            var width = Base.$(window).width();
            if (width > 1200 && this.size != "wide-desktop")
            {
                this.size = "wide-desktop";

                Base.$(this.panels).closest(".linear-horizontal-panels-container").animate({
                    left: "30px",
                    right: "30px"
                });

                var offsetCurrentPanelNum = Math.max(this.currentPanelNum, 2);
                Base.$.each(this.panels, function(i, panel)
                {
                    if(i == offsetCurrentPanelNum)
                    {
                        Base.$(panel).css({
                            width: "auto"
                        })
                        Base.$(panel).animate({
                            left: (((i + 1 - offsetCurrentPanelNum)*320) + 420) + "px",
                            right: 0
                        });
                    }
                    else if (i == offsetCurrentPanelNum - 1)
                    {
                        Base.$(panel).animate({
                            width: "400px",
                            left: ((i + 2 - offsetCurrentPanelNum)*320) + "px"
                        });
                    }
                    else if (i < offsetCurrentPanelNum)
                    {
                        Base.$(panel).animate({
                            width: "300px",
                            left: ((i + 2 - offsetCurrentPanelNum)*320) + "px"
                        });
                    }
                    else if (i > offsetCurrentPanelNum)
                    {
                        Base.$(panel).animate({
                            width: "300px",
                            left: "1000px"
                        });
                    }
                });
            }
            else if (width <= 1200 && width > 1000 && this.size != "desktop")
            {
                this.size = "desktop";
                Base.$(this.panels).closest(".linear-horizontal-panels-container").animate({
                    left: "30px",
                    right: "30px"
                });

                var offsetCurrentPanelNum = Math.max(this.currentPanelNum, 2);
                Base.$.each(this.panels, function(i, panel)
                {
                    if (i < offsetCurrentPanelNum)
                    {
                        Base.$(panel).animate({
                            width: "300px",
                            left: ((i + 2 - offsetCurrentPanelNum)*320) + "px"
                        });
                    }
                    else if (i > offsetCurrentPanelNum)
                    {
                        Base.$(panel).animate({
                            width: "300px",
                            left: "1000px"
                        });
                    }
                    else if(i == offsetCurrentPanelNum)
                    {
                        Base.$(panel).css({
                            width: "auto"
                        });
                        Base.$(panel).animate({
                            left: ((i + 2 - offsetCurrentPanelNum)*320) + "px",
                            right: 0
                        });
                    }
                });
            }
            else if (width <= 1000 && width > 670 && this.size != "tablet")
            {
                this.size = "tablet";

                Base.$(this.panels).closest(".linear-horizontal-panels-container").animate({
                    left: "30px",
                    right: "30px"
                });

                var offsetCurrentPanelNum = Math.max(this.currentPanelNum, 1);
                Base.$.each(this.panels, function(i, panel)
                {
                    var $panel = Base.$(panel);
                    $panel.css({
                        left: $panel.position().left + "px",
                        right: $panel.position().right + "px"
                    });
                    if (i < offsetCurrentPanelNum)
                    {
                        $panel.animate({
                            width: "300px",
                            left: ((i + 1 - offsetCurrentPanelNum)*320) + "px"
                        });
                    }
                    else if (i > offsetCurrentPanelNum)
                    {
                        $panel.animate({
                            width: "300px",
                            left: "1000px"
                        });
                    }
                    else if(i == offsetCurrentPanelNum)
                    {
                        $tempPanel = $panel.clone();
                        $tempPanel.css({
                            left: ((i + 1 - offsetCurrentPanelNum)*320) + "px",
                            right: 0,
                            width: "auto",
                            visibility: "hidden"
                        });
                        $panel.parent().append($tempPanel);
                        $panel.animate({
                            width: $tempPanel.width() + "px",
                            left: ((i + 1 - offsetCurrentPanelNum)*320) + "px",
                            right: 0
                        }, function() {
                            $panel.css({
                                width: "auto"
                            })
                        });
                    }
                });
            }
            else if (width <= 670 && this.size != "phone")
            {
                var self = this;
                this.size = "phone";

                Base.$(this.panels).closest(".linear-horizontal-panels-container").animate({
                    left: "10px",
                    right: "10px"
                });

                Base.$.each(this.panels, function(i, panel)
                {
                    if (i != self.currentPanelNum)
                    {
                        Base.$(panel).animate({
                            width: "100%",
                            left: ((i-self.currentPanelNum)*110) + "%"
                        }, function() {
                            /*$(this).css({
                            });  */
                        });
                    }
                    else
                    {
                        Base.$(panel).animate({
                            width: 100 + "%",
                            left: 0
                        });
                    }
                });
            }
        }
    });

});