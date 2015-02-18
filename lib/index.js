var getRTLPlugin = require("./rtl-plugin"),
    RTLVariablePlugin = require("./rtl-variable-plugin");

module.exports = {
    install: function(less, pluginManager) {
        var RTLPlugin = getRTLPlugin(less);
        pluginManager.addVisitor(new RTLPlugin());
        pluginManager.addPreProcessor(new RTLVariablePlugin());
    }
};
