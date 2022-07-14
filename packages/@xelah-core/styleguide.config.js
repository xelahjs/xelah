const path = require('path');
const webpack = require('webpack');

const {
  name: packageName, version, repository,
} = require('./package.json');

module.exports = {
  usageMode: 'expand',
  exampleMode: 'expand',
  moduleAliases: {},
  getComponentPathLine: componentPath => {
    const name = path.basename(componentPath, '.jsx');
    return `import { ${name} } from '${packageName}';`;
  },
  title: `${packageName} v${version}`,
  ribbon: {
    url: repository.url,
    text: 'View on GitHub',
  },
  dangerouslyUpdateWebpackConfig(config) {
    config.module.rules.push({
      test: /.\.md$/,
      type: "javascript/auto"
    });
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /react-styleguidist\/lib\/loaders\/utils\/client\/requireInRuntime$/,
        "react-styleguidist/lib/loaders/utils/client/requireInRuntime"
      )
    );
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /react-styleguidist\/lib\/loaders\/utils\/client\/evalInContext$/,
        "react-styleguidist/lib/loaders/utils/client/evalInContext"
      )
    );
    return config;
  },
};

module.exports.moduleAliases[packageName] = path.resolve(__dirname, 'src');