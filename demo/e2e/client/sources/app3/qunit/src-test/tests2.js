test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

require(['main'], function(dependency) {
	Main = dependency;

	test( "Will test main.template", function() {
	  ok( Main.template == "<div>Hello</div>", "Passed!" );
	});
});