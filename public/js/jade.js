function mainJade(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),name = locals_.name,description = locals_.description;
buf.push("<h2>Jade</h2><p>" + (jade.escape(null == (jade.interp = name) ? "" : jade.interp)) + "</p><p>" + (jade.escape(null == (jade.interp = description) ? "" : jade.interp)) + "</p>");;return buf.join("");
}