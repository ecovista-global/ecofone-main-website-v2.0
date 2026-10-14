const fs = require('fs');
const filepath = 'd:/ecofone main website/frontend/components/franchise-detailed-models.tsx';
let lines = fs.readFileSync(filepath, 'utf-8').split('\n');

// 46: <span className="text-2xl">...</span> Infrastructure Development
lines[45] = '                      <span className="text-2xl">🏢</span> Infrastructure Development';

// 64: <span className="text-2xl">...</span> Premium Stock
lines[63] = '                      <span className="text-2xl">📱</span> Premium Stock';

fs.writeFileSync(filepath, lines.join('\n'), 'utf-8');
console.log('Fixed lines 46 and 64');
