Main = undefined;

beforeEach(function() {
	require(['main'], function(dependency) {
		Main = dependency;
	});
});

describe("suite2.js", function () {

	it("contains spec with an expectation", function () {
		expect(Main.template).toBe('<div>Hello</div>');
	});

	it("contains spec with an expectation", function () {
		expect(Main.message).toBe('hello');
	});
	it("contains spec with an expectation", function () {
		expect(Main.message).toBe('hello suite2');
	});		

});	
	
afterEach(function() {
	Main = undefined;
});	


	
