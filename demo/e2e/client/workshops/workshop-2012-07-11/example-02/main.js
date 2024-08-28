console.log('1')

define('Widget', [], function () {

    function Widget(name) {

        this.name = name;

        this.hello = function() {
            console.log('hello, ' + this.name)
        }
    }
    return Widget;
});

define('B', [], function () {

    console.log('B')

    return {};
});