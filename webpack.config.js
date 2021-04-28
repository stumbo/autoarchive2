//development does not work in Thunderbird, it will raise CSP errors because of an included "eval"
//production minifies the code which I don't like because errors are all reported on line 1 then
const theMode = "none";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const outputPath = path.resolve(__dirname, "./dist/release/");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const tsLoaderRules = {
  test: /\.tsx?$/,
  use: "ts-loader",
  exclude: /node_modules/,
};
const extensions = [".tsx", ".ts", ".js"];

module.exports = {
  name: "webextension", //all "standard" webextension scripts
  mode: theMode,
  entry: {
    background: "./src/app/background/background.ts",
    options: "./src/app/options/options.ts",
    popup: "./src/app/popup/popup.ts",
  },
  output: {
    path: outputPath,
  },
  module: {
    rules: [
      tsLoaderRules,
      {
        test: /\.html$/,
        use: "html-loader",
      },
    ],
  },
  resolve: {
    extensions: extensions,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "options.html",
      template: "src/app/options/options.html",
    }),
  ],
};
