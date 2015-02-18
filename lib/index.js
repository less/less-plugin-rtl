var getRTLPlugin = require("./rtl-plugin"),
    RTLVariablePlugin = require("./rtl-variable-plugin");

function LessPluginRTL(options) {
    this.setOptions(options);
}

LessPluginRTL.prototype = {
    install: function(less, pluginManager) {
        if (this.options.dir === "RTL") {
            var RTLPlugin = getRTLPlugin(less);
            pluginManager.addVisitor(new RTLPlugin());
        }
        pluginManager.addPreProcessor(new RTLVariablePlugin(this.options.dir === "RTL"));
    },
    printUsage: function () {
        console.log("RTL Plugin");
        console.log("use dir=RTL or dir=LTR")
    },
    setOptions: function(options) {
        this.options = this.parseOptions(options);
    },
    parseOptions: function(options) {
        if (!options) {
            options = {dir: "RTL"};
        }
        if (typeof options === "string") {
            var args = options.match(/dir=(RTL|LTR)/);
            if (!args) {
                throw new Error("Invalid options for ");
            }
            options = {dir: args[1]};
        }
        return options;
    },
    minVersion: [2, 4, 0]
};

module.exports = LessPluginRTL