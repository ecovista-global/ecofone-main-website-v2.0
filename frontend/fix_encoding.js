const fs = require('fs');
const filepath = 'd:/ecofone main website/frontend/components/franchise-detailed-models.tsx';

// Read as buffer
const buffer = fs.readFileSync(filepath);
// Convert to string ignoring invalid characters, or just decode as utf-8 and let JS handle replacement chars.
// But better to decode as latin1 so we don't lose bytes, then re-encode.
let content = buffer.toString('latin1');

// Actually, JS strings are UTF-16. If we read latin1, it just maps bytes 1-to-1 to codepoints.
// Let's just do a clean read in utf8, which might have replacement characters ().
content = buffer.toString('utf8');

// Wait, if it has , I can't search/replace exactly.
// Let's just fix the specific lines by looking for the surrounding text.

content = content.replace(/<div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl shrink-0">.*?<\/div>/, '<div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-ecoOrange-500 text-xl shrink-0">🏪</div>');

content = content.replace(/<div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-xl shrink-0">.*?<\/div>/, '<div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-xl shrink-0">📏</div>');

content = content.replace(/<div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl shrink-0">.*?<\/div>/, '<div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl shrink-0">👨‍💼</div>');

// The bottom ones:
content = content.replace(/<div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">.*?<\/div>/, '<div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">⏱️</div>');

content = content.replace(/<div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xl shrink-0">.*?<\/div>/, '<div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xl shrink-0">⚡</div>');

content = content.replace(/<div className="w-10 h-10 bg-orange-50 text-ecoOrange-500 rounded-full flex items-center justify-center text-xl shrink-0">.*?<\/div>/, '<div className="w-10 h-10 bg-orange-50 text-ecoOrange-500 rounded-full flex items-center justify-center text-xl shrink-0">✨</div>');

// In case the file has any BOM, strip it
if (content.charCodeAt(0) === 0xFEFF) {
  content = content.slice(1);
}

// Remove any invalid unicode character using a regex that matches non-UTF8 safe chars.
// A simpler way is to replace typical mojibake characters directly:
content = content.replace(/😀 ª/g, '🏪');
content = content.replace(/✅²/g, '📏');
content = content.replace(/😀‘¥/g, '👨‍💼');
content = content.replace(/â ±/g, '⏱️');
content = content.replace(/🤏Œ/g, '✨');

// Write it back as pure utf8
fs.writeFileSync(filepath, content, 'utf8');
console.log('Successfully stripped invalid unicode and restored emojis.');
