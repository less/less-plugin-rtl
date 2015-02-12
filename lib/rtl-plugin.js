module.exports = function(less) {
    
    function RTLPlugin() {
        this._visitor = new less.visitors.Visitor(this);
    };
    
    function reverseKeyword(reverseKeywords, keywordNode) {
        if (reverseKeywords) {
                switch(keywordNode.value) {
                    case "left":
                        return new less.tree.Keyword("right");
                    case "right":
                        return new less.tree.Keyword("left");
                }
        }
        return keywordNode;
    }

    RTLPlugin.prototype = {
        isReplacing: true,
        run: function (root) {
            return this._visitor.visit(root);
        },
        visitRule: function (ruleNode, visitArgs) {
            if (ruleNode.name === "float") {
                this._reverseKeywords = true;
            }
            return ruleNode;
        },
        visitRuleOut: function () {
            this._reverseKeywords = false;
        },
        visitAnonymous: function(anonNode, visitArgs) {
            return reverseKeyword(this._reverseKeywords, anonNode);
        },
        visitKeyword: function (keywordNode, visitArgs) {
            return reverseKeyword(this._reverseKeywords, keywordNode);
        }
    };
    return RTLPlugin;
};
