// this script should be executed from the root of the project
var fs = require('fs');
var data = fs.readFileSync("package.json", 'ascii');

var packageObject = JSON.parse(data);
var dep = packageObject.dependencies;

var linkHeader = "https://arm1s11-eiffel004.eiffel.gic.ericsson.se:8443/nexus/service/local/artifact/maven/content?g=com.ericsson.nms.ui&a=";

//iterate through dependencies
for(var key in dep){
	var attrName = key;
	var attrValue = dep[key];

	//construct absolute link
	var absoluteLink = linkHeader + key + "&v="+ attrValue+"&r=public&e=tgz";

    // change value in packageObject to absoluteLink
    packageObject.dependencies[key] = absoluteLink;

    //check if Dependency exists in Nexus
    //NOT IMPLEMENTED YET , REQUIRES DISCUSSION WITH ALEXANDER
}
// write updated object to file
fs.writeFile('package.json', JSON.stringify(packageObject), function (err) {
    if (err) throw err;
    console.log('Depndecies sucesfully converted to absolute links !');
});

















