
define('specs/mainSpec',[
    'main'
], function (Main) {

    describe("A suite", function () {

        it("contains spec with an expectation", function () {
            expect(Main.template).toBe('<div>Hello</div>');
        });

        it("contains spec with an expectation", function () {
            expect(Main.message).toBe('hello');
        });
        it("contains spec with an expectation", function () {
            expect(Main.message).toBe('hello mainSpec.js');
        });		

    });

});
define('specs/all',[
    'specs/mainSpec'
]);