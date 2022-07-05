const fs = require("fs");
const yargs = require("yargs");
const path = require("path");
const camelCase = require("camelcase");

const argv = yargs
    .usage("Usage: $0 make <componentName> [fileName] [--type]")
    .example("$0 make NewComponent new_component.jsx --type=2")
    .option("type", {alias: "t", number: true, default: 1})
    .demandOption(["componentName"], "Name of the new component must be defined!")
    .demandCommand(1, "At least one command should be provided")
    .command(["make <componentName> [fileName]", "m"], "Make React component of specified type", {}, (argv) => {
        const filePath = path.join(__dirname, "/", argv.fileName || (argv.componentName + ".jsx"));
        // console.log(filePath);
        let content;
        if (argv.type == 1) {
            content = `import React from "react";
            function ${camelCase(argv.componentName, {pascalCase: true})} (props) {
                return (
                    <>
                        <h1>Header type one</h1>
                        <div>${argv.componentName} type ${argv.type} works</div>
                    </>
                );
            }
            export default ${camelCase(argv.componentName, {pascalCase: true})}`
        } else {
            content = `import React from "react";
            function ${camelCase(argv.componentName, {pascalCase: true})} (props) {
                return (
                    <>
                        <h2>Header type two</h2>
                        <div>${argv.componentName} type ${argv.type} works</div>
                    </>
                );
            }
            export default ${camelCase(argv.componentName, {pascalCase: true})}`
        }
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("The component has been made");
        })
    })
    .argv;
// console.log(__dirname);
// console.log(__filename);