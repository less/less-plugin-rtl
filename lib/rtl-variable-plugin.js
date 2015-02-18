function RTLVariablePlugin(isRTL) {
    this.isRTL = Boolean(isRTL);
}

RTLVariablePlugin.prototype.process = function(src, extra) {
    var variable = "@rtl: " + String(this.isRTL) + "; @ltr: " + String(!this.isRTL) + ";\n";
    var contentsIgnoredChars = extra.imports.contentsIgnoredChars;
    var filename = extra.fileInfo.filename;
    contentsIgnoredChars[filename] = contentsIgnoredChars[filename] || 0;
    contentsIgnoredChars[filename] += variable.length;
    return variable + src;
};

module.exports = RTLVariablePlugin;