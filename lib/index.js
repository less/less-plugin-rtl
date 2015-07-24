var getRTLPlugin = require("./rtl-plugin"),
    RTLVariablePlugin = require("./rtl-variable-plugin");

function LessPluginRTL(options) {
    this.setOptions(options);
}

LessPluginRTL.prototype = {
    install: function(less, pluginManager) {
        var RTLPlugin = getRTLPlugin(less);
        pluginManager.addVisitor(new RTLPlugin(this.options));

        if (this.options.vars !== false) {
            pluginManager.addPreProcessor(new RTLVariablePlugin(this.options.dir === "RTL"));
        }
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
            var spaceSepOptions = options.split(" ");
            options = { };
            spaceSepOptions.forEach(function(arg) {
                var match = arg.match(/^(--)?dir=(RTL|LTR)$/);
                if (match) {
                    options.dir = match[1];
                    return;
                }
                match = arg.match(/^(--)?vars(=(true|false))?$/);
                if (match) {
                    options.vars = match[1] !== false;
                    return;
                }

                match = arg.match(/^(--)?auto-reverse(=(true|false))?$/);
                if (match) {
                    options.autoReverse = match[1] !== false;
                    return;
                }

                throw new Error("Invalid options - '" + arg + "'");
            });
        }

        options.autoReverse = options.autoReverse !== false;
        options.vars = options.vars !== false;
        options.dir = options.dir || "LTR";

        if (options.dir !== "LTR" && options.dir !== "RTL") {
            throw new Error("Bad direction - use LTR or RTL");
        }

        return options;
    },
    minVersion: [2, 4, 0]
};

module.exports = LessPluginRTL