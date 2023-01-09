/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require('./markov');

async function main() {

    //const { MarkovMachine } = require('./markov');

    let dataPhrase;

    if (process.argv.length === 4) {

        if (process.argv[2] === "file") {
            dataPhrase = textFromFile(process.argv[3]);

        } else {
            if (process.argv[2] === "url") {
                dataPhrase = await textFromUrl(process.argv[3]);

            } else {
                // 4 arguments passed in, but the 3rd argument was not file or url.
                console.log("ERROR: 'file' or 'url' arguments were not found. ");
                syntaxHelp();

                // exit the process with a non-zero status
                process.exit(1);
            }

        }

        let mm = new MarkovMachine(dataPhrase);
        console.log(mm.makeText(100))

    } else {
        syntaxHelp();
    }

}


if (require.main === module) {
    main();
}


function textFromFile(fileName) {

    /* 
        textFromFile reads the file specified by fileName and returns the data.
        readFileSync is used since we need the data form the file before we can 
        processed with the Markov Machine.

        Any errors will halt execution of the program.

    */

    const fs = require('fs');
    let outData;

    try {
        outData = fs.readFileSync(fileName, 'utf8')

        // Make sure outData has text
        if (!(outData)) {
            console.log(`  ERROR: '${fileName}' is an empty file.`)
            // exit the process with a non-zero status
            process.exit(1);
        }

    }
    catch (error) {

        console.log(`Error reading ${fileName}:`);
        console.error(error.message);

        // exit the process with a non-zero status
        process.exit(1);

    }

    return outData;

}


async function textFromUrl(url) {

    /* 
        textFromUrl goes to the website specified by url and when the response code is 
        200, returns the html (hopefully all text) from the axios get request.

        Response codes that are not 200 or any other errors wil halt the program.

    */

    const axios = require('axios');

    try {

        const resp = await axios.get(url);

        if (resp.status === 200) {

            // Make sure resp.data has text
            if (!(resp.data)) {
                console.log(`  ERROR: no text was returned from '${url}'.`)
                // exit the process with a non-zero status
                process.exit(1);
            }

            return resp.data;

        } else {
            console.log(`Error accessing website at '${url}'.`);
            console.error(`  Website responded with status code ${resp.status}.`);

            // exit the process with a non-zero status
            process.exit(1);
        }

    }
    catch (error) {

        console.log(`Error accessing website at '${url}'.`);
        console.error(`  The following error was encountered: ${error}`);

        // exit the process with a non-zero status
        process.exit(1);

    }

}


function syntaxHelp() {

    // prints help text to the console with the syntax for calling this function.

    console.log("  syntax: makeText.js {file file_name | url web_address} ");
    console.log("  specify either 'file file_name' or 'url web_address' ");
    console.log("  In both cases, file_name and web_address is replaced by an actual ");
    console.log("   filename or web url. ");
    console.log("  where: ");
    console.log("    file file_name ");
    console.log("      'file' argument indicates that a file (with path if in a different ");
    console.log("      folder) is getting specified as the second parameter.");
    console.log("   OR ");
    console.log("    url web_address ");
    console.log("      'url' argument indicates that a website url is getting specified ");
    console.log("      as the second parameter. ");

}

