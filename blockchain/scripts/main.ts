const fs = require('fs')
const path = require('path')


export const saveAddress = async (name: string, value: string, file?: string) => {
    await saveJson("addresses", name, value, file);
};

const saveJson = async (type: string, name: string, value: string, file?: string) => {
    let object = await readJson(undefined, undefined, file);
    if (object === undefined) object = {};
    if (object[type] === undefined) object[type] = {};
    object[type][name] = value;
    const fileName = file || "constants.json";
    await fs.promises.writeFile(
        path.resolve(__dirname, fileName),
        JSON.stringify(object)
    );
};

const readJson = async (type: string | undefined, name: string | undefined, file: string | undefined) => {
    const fileName = file || "constants.json";
    const rawdata = await fs.promises.readFile(path.resolve(__dirname, fileName));
    let object;
    /* eslint-disable no-empty */
    try {
        object = JSON.parse(rawdata.toString());
    } catch (e) { }
    /* eslint-enable no-empty */
    if (object === undefined) return undefined;
    if (type === undefined) return object;
    if (name === undefined) return object[type];
    if (object[type]) return object[type][name];
    return undefined;
};
