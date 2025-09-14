#!/usr/bin/env node

// Demo script for markdown-js-parser
const { parseMarkdown, RegexUtils, REGEX_PATTERNS } = require('./index.js');

console.log(`
╔═══════════════════════════════════════════════════════╗
║                markdown-js-parser                     ║
║           Enhanced Markdown Parser Demo               ║
╚═══════════════════════════════════════════════════════╝
`);

const demoMarkdown = `# Welcome to markdown-js-parser

This is a **powerful** and *lightweight* markdown parser with enhanced regex support!

## Features Showcase

### Text Formatting
- **Bold text** and __also bold__
- *Italic text* and _also italic_
- ~~Strikethrough text~~
- \`inline code\`

### Task Lists
- [x] Create npm package ✅
- [x] Add enhanced regex support ✅
- [x] Comprehensive testing ✅
- [ ] Publish to npm registry

### Code Blocks

\`\`\`javascript
const { parseMarkdown } = require('markdown-js-parser');

const markdown = '# Hello **World**!';
const html = parseMarkdown(markdown);
console.log(html); // <h1>Hello <strong>World</strong>!</h1>
\`\`\`

### Links and Images
Check out the [GitHub repository](https://github.com/Ferretosan/markdown.js) for more info!

Auto-linking also works: https://github.com/Ferretosan/markdown.js

![Example Image](https://via.placeholder.com/150x50/0066cc/ffffff?text=Demo)

### Blockquotes
> This is a blockquote with **bold** text and *italic* text.
> Multiple lines are supported.

### Horizontal Rules

---

### Alternative Headers

Big Header
==========

Smaller Header
--------------

## Regex Utils Demo

The package includes powerful regex utilities:
`;

console.log('📝 Input Markdown:');
console.log('━'.repeat(60));
console.log(demoMarkdown);

console.log('\n🎨 Parsed HTML:');
console.log('━'.repeat(60));
const html = parseMarkdown(demoMarkdown);
console.log(html);

console.log('\n🔧 Regex Utils Demo:');
console.log('━'.repeat(60));
console.log('📋 Available regex patterns:', Object.keys(REGEX_PATTERNS).length);
console.log('🔍 Escape special chars:', RegexUtils.escape('Hello [world]! (.*+?)'));
console.log('✅ Pattern matching test:', RegexUtils.isMarkdownPattern('## Header', 'h2') ? 'PASS' : 'FAIL');

const testPattern = RegexUtils.createDelimiterPattern('**');
console.log('🏗️  Custom pattern created:', testPattern.toString());

console.log('\n📊 Package Info:');
console.log('━'.repeat(60));
const pkg = require('./package.json');
console.log(`📦 Name: ${pkg.name}`);
console.log(`🔢 Version: ${pkg.version}`);
console.log(`📝 Description: ${pkg.description}`);
console.log(`👤 Author: ${pkg.author}`);
console.log(`📜 License: ${pkg.license}`);

console.log('\n✨ Demo completed! Try it yourself with: npm install markdown-js-parser');