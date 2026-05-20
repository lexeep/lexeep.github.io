import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/favicon.png");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      publicDir: "public",
      server: {
        middlewareMode: false,
      },
    },
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
