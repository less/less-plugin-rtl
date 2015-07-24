module.exports = function(less) {

    var shortHandProperties = ["margin", "border-width", "padding", "border-radius", "border", "border-style"];
    var keywordProperties = ["float", "text-align"];
    
    function RTLPlugin(options) {
        this._options = options;
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

            if (ruleNode.variable) {
                return ruleNode;
            }

            var nodeName = ruleNode.name,
              wantedDir = this._options.dir,
              doReverse = this._options.autoReverse && wantedDir === "RTL",
              doRemove = false,
              match;

            if (match = nodeName.match(/^-rtl-reverse-(.*)$/)) {
                doReverse = wantedDir === "RTL";
                nodeName = match[1];
            }
            else if (match = nodeName.match(/^-ltr-reverse-(.*)$/)) {
                doReverse = wantedDir === "LTR";
                nodeName = match[1];
            }
            else if (match = nodeName.match(/^(-rtl-ltr-|-ltr-rtl-)(.*)$/)) {
                doReverse = false;
                nodeName = match[1];
            }
            else if (match = nodeName.match(/^-ltr-(.*)$/)) {
                doRemove = wantedDir === "RTL";
                nodeName = match[1];
            }
            else if (match = nodeName.match(/^-rtl-(.*)$/)) {
                doRemove = wantedDir === "LTR";
                nodeName = match[1];
            }

            if (doRemove) {
                return;
            }

            if (!doReverse && !doRemove && nodeName === ruleNode.name) {
                return ruleNode;
            }

            if (doReverse && nodeName.match(/(^|-)(left|right)($|-)/)) {
                nodeName = nodeName.replace(/(^|-)(left|right)($|-)/, function(allOfMatch, leftPart, replacePart, rightPart) {
                    if (replacePart === "left") {
                        replacePart = "right";
                    } else {
                        replacePart = "left";
                    }
                    return leftPart + replacePart + rightPart;
                });
            }

            if (doReverse && keywordProperties.indexOf(nodeName) >= 0) {
                this._reverseKeywords = true;
            }
            else if (doReverse && shortHandProperties.indexOf(nodeName) >= 0) {
                this._shortHandReorder = true;
            }

            if (nodeName !== ruleNode.name) {
                return new less.tree.Rule(
                    nodeName,
                    ruleNode.value,
                    ruleNode.important,
                    ruleNode.merge,
                    ruleNode.index,
                    ruleNode.currentFileInfo,
                    ruleNode.inline,
                    ruleNode.variable);
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
