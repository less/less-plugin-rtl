var getRTLPlugin = require("./rtl-plugin");

module.exports = {
    install: function(less, pluginManager) {
        var RTLPlugin = getRTLPlugin(less);
        pluginManager.addVisitor(new RTLPlugin());
    }
};
