module.exports = function(less) {
	
    function RTLPlugin() {
        this._visitor = new less.visitors.Visitor(this);
    };

    RTLPlugin.prototype = {
        isReplacing: true,
        run: function (root) {
            return this._visitor.visit(root);
        },
        visitRule: function (ruleNode, visitArgs) {
            return ruleNode;
        }
    };
    return RTLPlugin;
};
