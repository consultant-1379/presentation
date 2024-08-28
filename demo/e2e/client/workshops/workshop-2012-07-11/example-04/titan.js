define('Titan', function () {

    var lib = {
        $:$.noConflict(),
        _:_.noConflict(),
        Backbone:Backbone.noConflict()
    };
    window.jQuery = undefined;

    var Titan = {};

    Titan.version = '0.0.1';


//    Titan.dom = {};
//    Titan.utils = {};
//
//    Titan.ui = {
//
//        Widget: {},
//        Module: {},
//
//        Model: {},
//        View: {},
//        Presenter: {}
//
//    };
//
//    Titan.ApplicationController = {};

    return Titan;

});
require(['Titan']);