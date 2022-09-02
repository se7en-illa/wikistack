const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () =>
  layout(html` <h3>404 Error</h3>
    <hr />
    <p>Page not found!</p>`);
