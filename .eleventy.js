const yaml = require("js-yaml");
const eleventySass = require("eleventy-sass");
const eleventyAutoCacheBuster = require("eleventy-auto-cache-buster");

const favicons = require("./.favicons");


module.exports = function (eleventyConfig) {
    favicons({
        input: "src",
        output: "dist",
    });
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPlugin(eleventySass, {
        sass: {
            loadPaths: ["node_modules"]
        }
    });

    eleventyConfig.addPlugin(eleventyAutoCacheBuster);

    return {
        dir: {
            input: "src",
            output: "dist",
        }
    }
}