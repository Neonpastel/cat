const EleventyHtmlBasePlugin = require("@11ty/eleventy").EleventyHtmlBasePlugin;
const yaml = require("js-yaml");
const eleventySass = require("eleventy-sass");
const eleventyAutoCacheBuster = require("eleventy-auto-cache-buster");
const embedEverything = require("eleventy-plugin-embed-everything");

const favicons = require("./.favicons");


module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    favicons({
        input: "src",
        output: "dist",
    });
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

    eleventyConfig.ignores.add("src/poetry/**/[!index]*.md")

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPlugin(eleventySass, {
        sass: {
            loadPaths: ["node_modules"]
        }
    });

    eleventyConfig.addPlugin(embedEverything);

    eleventyConfig.addPlugin(eleventyAutoCacheBuster);

    return {
        dir: {
            input: "src",
            output: "dist",
        },
        pathPrefix: "cat"
    }
}