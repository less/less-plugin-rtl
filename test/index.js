var less = require("less"),
    lessTest = require("less/test/less-test"),
    lessTester = lessTest(),
    Plugin = require('../lib'),
    rtlPlugin = new Plugin(),
    ltrPlugin = new Plugin("dir=LTR"),
    stylize = less.lesscHelper.stylize;

console.log("\n" + stylize("LESS - RTL", 'underline') + "\n");

lessTester.runTestSet(
    {strictMath: true, relativeUrls: true, silent: true, plugins: [rtlPlugin] },
    "rtl/");
lessTester.runTestSet(
    {strictMath: true, relativeUrls: true, silent: true, plugins: [ltrPlugin] },
    "ltr/")

if (lessTester.finish) {
	lessTester.finish();
}