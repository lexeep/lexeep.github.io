module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/favicon.png");
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
