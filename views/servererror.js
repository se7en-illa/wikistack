const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () =>
  layout(html` <h3>500 Error</h3>
    <hr />
    <p>Server error!</p>`);
