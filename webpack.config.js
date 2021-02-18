//development does not work in Thunderbird, it will raise CSP errors because of an included "eval"
//production minifies the code which I don't like because errors are all reported on line 1 then
const theMode = "none";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const outputPath = path.resolve(__dirname, "./dist/release/");

const tsLoaderRules = [
  {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  },
];
const extensions = [".tsx", ".ts", ".js"];

module.exports = [
  {
    name: "webextension", //all "standard" webextension scripts
    mode: theMode,
    entry: {
      background: "./src/background/background.ts",
      options: "./src/options/options.ts",
      popup: "./src/popup/popup.ts",
    },
    output: {
      path: outputPath,
    },
    module: {
      rules: tsLoaderRules,
    },
    resolve: {
      extensions: extensions,
    },
  },
  /*
	 *  Let's see if we really need this before we delete it.
	{
		//the experiment needs a slightly different output configuration
		name: "experiment",
		mode: theMode,
		entry: "./src/webexperiment/autoarchive-api.ts",
		output: {
			filename: "autoarchive-api.js",
			path: outputPath,

			//export the default class under the variable "autoarchive"!
			library: "autoarchive",
			libraryExport: "default",
		},
		module: {
			rules: tsLoaderRules,
		},
		resolve: {
			extensions: extensions,
		},
	},
	 */
  /*
	 * Tests would be good...
	{
		//Tests will be created in a different dir
		name: "tests", //all "tests"
		mode: theMode,
		entry: {
			test: "./src/alltests.js",
		},
		module: {
			rules: tsLoaderRules,
		},
		resolve: {
			extensions: extensions,
			fallback: {
				assert: require.resolve("assert/"),
			},
		},
	},

	 */
];
