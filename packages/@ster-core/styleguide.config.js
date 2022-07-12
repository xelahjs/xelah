const path = require('path');

const {
  name: packageName, version, repository,
} = require('./package.json');

module.exports = {
  usageMode: 'expand',
  exampleMode: 'expand',
  getComponentPathLine: componentPath => {
    const name = path.basename(componentPath, '.js');
    return `import { ${name} } from '${packageName}';`;
  },
  title: `${name} v${version}`,
  ribbon: {
    url: repository.url,
    text: 'View on GitHub',
  },
};

module.exports.moduleAliases[packageName] = path.resolve(__dirname, 'src');