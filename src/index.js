const gatsbyPluginsWrapper = ({ plugins = [] }) => async (markdownAST, _, done) => {
  if (!Array.isArray(plugins)) {
    throw new Error("plugins option is not an Array");
  }
  const promises = plugins.map(async (plugin) => {
    let fn;
    let options = {};

    if (typeof plugin === "object" && plugin.resolve) {
      fn = require(plugin.resolve);
      options = plugin.options ? plugin.options : {};
    }

    if (typeof plugin === "string") {
      fn = require(plugin);
    }

    return fn({ markdownAST }, options);
  });

  await Promise.all(promises);

  done();
};

module.exports = gatsbyPluginsWrapper;
