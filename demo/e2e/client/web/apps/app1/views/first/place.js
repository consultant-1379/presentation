define([
    'base',
    './presenter',
    './view'
], function (Base, Presenter, View) {

    return new Base.Place(['app1'], Presenter, View);

});