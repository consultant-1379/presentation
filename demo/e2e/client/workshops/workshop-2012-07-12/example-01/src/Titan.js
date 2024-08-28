(function (global, undefined) {

    // Remove libraries from global space
    var $ = global.$.noConflict();
    var _ = global._.noConflict();
    var Backbone = global.Backbone.noConflict();
    global.jQuery = undefined;


    var Titan = {};

    Titan.version = '0.0.1';


    var Widget = Titan.Widget = function () {

        this.view = new this.options.View();
        this.model = new this.options.Model();

    };

    _.extend(Widget.prototype, {

        appendTo:function (selector) {
            $(selector).append(this.view.$el);
        }

    });


    Titan.Model = Backbone.Model;


    var View = Titan.View = function () {
        this.$el = $(this.template());
    };

    _.extend(View.prototype, {

        template:function () {
            return '<div></div>';
        }

    });


    View.extend = Widget.extend = Backbone.View.extend;


    define('Titan', function () {
        return Titan;
    });


})(window);