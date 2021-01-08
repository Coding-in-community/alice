const Parse = require("./parse");
const Register = require("./register");

exports.Parse = Parse
exports.Register = Register
exports.component = function(name, object) {
    return {name, object}
}