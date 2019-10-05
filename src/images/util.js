let fs = require('fs');
let path = require('path');

let allImageConfig = [];
let rootImagePath = path.join(__dirname, 'source');
console.log(
  'page-func: fs.readdirSync(rootImagePath)',
  fs.readdirSync(rootImagePath).sort((a, b) => a - b),
);
fs.readdirSync(rootImagePath)
  .sort((a, b) => a - b)
  .forEach(itemI => {
    let itemPath = path.join(rootImagePath, itemI);
    if (fs.statSync(itemPath).isDirectory()) {
      let targetData = JSON.parse(
        fs.readFileSync(path.join(itemPath, 'index.json'), 'utf8'),
      );
      
      fs.readdirSync(itemPath).forEach(itemJ => {
        if (['jpg', 'png', 'jpeg'].includes(itemJ.split('.').pop())) {
          targetData.image = `require('./source/${path.join(itemI, itemJ)}')`;
          targetData.rawURL = `./source/${path.join(itemI, itemJ)}`;
        }
      });
      allImageConfig.push(targetData);
    }
  });

fs.writeFileSync(
  path.join(__dirname, 'image-config.js'),
  'export default ' +
  JSON.stringify(allImageConfig, null, 2).replace(
    /"(require.*?\))"/gim,
    '$1',
  ),
);
