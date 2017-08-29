const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        path.join(__dirname, '/client/index.js')
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loaders: [ 'react-hot-loader', 'babel-loader' ]
            }
        ]
    },
    resolve: {
        extensions: [ '.js' ]
    },
    node: {
        net: 'empty',
        dns: 'empty'
    }
};
