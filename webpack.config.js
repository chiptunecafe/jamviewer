const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [{
            test: /\.tsx?$/,
            include: path.resolve(__dirname, "src"),
            use: [
                { loader: "babel-loader" },
                { loader: "ts-loader" },
            ],
        }],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        contentBase: "./dist",
    },
};
