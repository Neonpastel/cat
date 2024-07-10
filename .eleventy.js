const EleventyHtmlBasePlugin = require("@11ty/eleventy").EleventyHtmlBasePlugin;
const yaml = require("js-yaml");
const eleventySass = require("eleventy-sass");
const eleventyAutoCacheBuster = require("eleventy-auto-cache-buster");
const embedEverything = require("eleventy-plugin-embed-everything");
const md = require("jstransformer")(require("jstransformer-markdown-it"));

const favicons = require("./.favicons");

const directusToData = require("./directus");


module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    favicons({
        input: "src",
        output: "dist",
    });
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

    directusToData({
        configFilename: ".directus.json"
    })

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPlugin(eleventySass, {
        sass: {
            loadPaths: ["node_modules"]
        }
    });

    eleventyConfig.addTransform("first", function(content) {
        if (!this.page.outputPath.endsWith(".html")) { return content; }

        const headers = content.match(/(?<=<h)\d(?=>)/g);
        const highestHeaderInHtml = Math.max(...headers)

        const match = content.match(/(?<=<section class="markdown-render">)(.|\n)*(?=<\/section>)/);
        if (match === null) {
            return content;
        } else {
            const originalMdString = match[0];
            // TODO: patchwork solution, doesn't work for other headers
            const newMdString = originalMdString.replaceAll("#", "#".repeat(highestHeaderInHtml + 1))
            return content.replace(originalMdString, md.render(newMdString).body);
        }
    })

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