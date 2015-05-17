module.exports = function(less) {

    var shortHandProperties = ["margin", "border-width", "padding", "border-radius", "border", "border-style"];
    var keywordProperties = ["float", "text-align"];
    
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
            if (!ruleNode.variable && ruleNode.name.match(/(^|-)(left|right)($|-)/)) {
                return new less.tree.Rule(
                    ruleNode.name.replace(/(^|-)(left|right)($|-)/, function(allOfMatch, leftPart, replacePart, rightPart) {
                        if (replacePart === "left") {
                            replacePart = "right";
                        } else {
                            replacePart = "left";
                        }
                        return leftPart + replacePart + rightPart;
                    }),
                    ruleNode.value,
                    ruleNode.important,
                    ruleNode.merge,
                    ruleNode.index,
                    ruleNode.currentFileInfo,
                    ruleNode.inline,
                    ruleNode.variable);
            } else
            if (keywordProperties.indexOf(ruleNode.name) >= 0) {
                this._reverseKeywords = true;
            } else
            if (shortHandProperties.indexOf(ruleNode.name) >= 0) {
                this._shortHandReorder = true;
            }
            return ruleNode;
        },
        visitRuleOut: function () {
            this._reverseKeywords = false;
            this._shortHandReorder = false;
        },
        visitAnonymous: function(anonNode, visitArgs) {
            return reverseKeyword(this._reverseKeywords, anonNode);
        },
        visitKeyword: function (keywordNode, visitArgs) {
            return reverseKeyword(this._reverseKeywords, keywordNode);
        },
        visitExpression: function (expressionNode, visitArgs) {
            if (this._shortHandReorder && expressionNode.value.length === 4) {
                this._shortHandReorder = false;
                return new less.tree.Expression([expressionNode.value[0], expressionNode.value[3], expressionNode.value[2], expressionNode.value[1]]);
            }
            return expressionNode;
        }
    };
    return RTLPlugin;
};
