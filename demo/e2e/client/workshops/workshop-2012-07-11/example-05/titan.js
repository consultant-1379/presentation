define('Titan', function () {

    var lib = {
        $:$.noConflict(),
        _:_.noConflict(),
        Backbone:Backbone.noConflict()
    };
    window.jQuery = undefined;

    var Titan = {};

    Titan.version = '0.0.1';


    var Widget = Titan.Widget = function () {

        this.view = new this.options.View();
        this.model = new this.options.Model();

    };

    lib._.extend(Widget.prototype, {

        appendTo: function(selector) {
            lib.$(selector).append(this.view.$el);
        }

    });

    Titan.Model = lib.Backbone.Model;

    var View = Titan.View = function () {
        this.$el = lib.$('<div>111</div>');
    };
    //assign method from backbone to view and widget
    View.extend = Widget.extend = lib.Backbone.View.extend;


    return Titan;

});
require(['Titan']);