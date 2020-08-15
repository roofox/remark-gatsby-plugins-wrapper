const gatsbyPluginsWrapper = (plugins) => async (markdownAST, _, done) => {
  if (!Array.isArray(plugins)) {
    throw new Error("plugins is not an Array");
  }
  const promises = plugins.map(async (plugin) => {
    let instance;
    let options = {};

    if (typeof plugin === "object" && plugin.resolve) {
      instance = require(plugin.resolve);
      options = plugin.options ? plugin.options : {};
    }

    if (typeof plugin === "string") {
      instance = require(plugin);
    }

    return instance({ markdownAST }, options);
  });

  await Promise.all(promises);

  done();
};

module.exports = gatsbyPluginsWrapper;
