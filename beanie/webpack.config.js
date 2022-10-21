module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [ 'babel-loader' ]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
          exclude: /favicon\.ico$/,
          loader: 'file-loader',
          options: {
            name: 'static/[name].[hash:8].[ext]',
          },
        },
        // A special rule for favicon.ico to place it into build root directory.
        {
          test: /favicon\.ico$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash:8]',
          },
        },
      ]
    }
  };