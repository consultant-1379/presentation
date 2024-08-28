define([
    'text!./template.html',
    'com/ericsson/app/ui/Widget'
], function (template, Widget) {

    $('body').append(template)

    Widget.hello();

    console.log(Widget)



    return {};

});