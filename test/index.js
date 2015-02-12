var less = require("less"),
    lessTest = require("less/test/less-test"),
    lessTester = lessTest(),
    plugin = require('../lib'),
    stylize = less.lesscHelper.stylize;

console.log("\n" + stylize("LESS - RTL", 'underline') + "\n");

lessTester.runTestSet(
    {strictMath: true, relativeUrls: true, silent: true, plugins: [plugin] },
    "rtl/");

if (lessTester.finish) {
	lessTester.finish();
}