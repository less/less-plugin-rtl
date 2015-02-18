function RTLVariablePlugin() {
}

RTLVariablePlugin.prototype.process = function(src, extra) {
    var variable = "@rtl: true; @ltr: false;\n"
    var contentsIgnoredChars = extra.imports.contentsIgnoredChars;
    var filename = extra.fileInfo.filename;
    contentsIgnoredChars[filename] = contentsIgnoredChars[filename] || 0;
    contentsIgnoredChars[filename] += variable.length;
    return variable + src;
};

module.exports = RTLVariablePlugin;