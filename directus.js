const { writeFile, readFileSync } = require("fs");
const { env } = require("process");
const { createDirectus, rest, readItems, staticToken } = require("@directus/sdk");

function _handleError(err) { if (err) { console.error(err); };}

module.exports = async function({cmsUrl="", staticTokenValue="", collectionName="", outputFilename="src/_data/{{collectionName}}.json", configFilename=undefined}) {
    let config = {}
    if (configFilename) {
        config = JSON.parse(readFileSync(configFilename, {encoding: "utf-8"}));
    }
    cmsUrl = cmsUrl || config["cmsUrl"] || env.CMS_URL;
    staticTokenValue = staticTokenValue || config["staticTokenValue"] || config["staticToken"] || env.STATIC_TOKEN;
    collectionName = collectionName || config["collectionName"] || env.COLLECTION_NAME;
    outputFilename = outputFilename || config["outputFilename"]  || env.OUTPUT_FILENAME;

    outputFilename = outputFilename.replace("{{collectionName}}", collectionName);

    const directus = createDirectus(cmsUrl).with(staticToken(staticTokenValue)).with(rest());

    directus.request(readItems(collectionName)).then((data) => {
        writeFile(outputFilename, JSON.stringify(data), { encoding: "utf-8" }, _handleError);
    }).catch((err) => {console.error(err)});
}
