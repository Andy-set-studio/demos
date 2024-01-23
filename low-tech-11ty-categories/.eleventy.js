const rssPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = config => {
  // Plugins
  config.addPlugin(rssPlugin);

  config.addCollection('posts', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
  });

  // Returns an array of tag names
  config.addCollection('categories', collection => {
    const gatheredTags = [];

    // Go through every piece of content and grab the tags
    collection.getAll().forEach(item => {
      if (item.data.tags) {
        if (typeof item.data.tags === 'string') {
          gatheredTags.push(item.data.tags);
        } else {
          item.data.tags.forEach(tag => gatheredTags.push(tag));
        }
      }
    });

    return [...new Set(gatheredTags)];
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
