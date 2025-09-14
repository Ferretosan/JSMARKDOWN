# markdown-js-parser

```
                            __            __                                     _         
                           [  |  _       |  ]                                   (_)   
 _ .--..--.   ,--.   _ .--. | | / ]  .--.| |  .--.   _   _   __  _ .--.         __  .--.  
[ `.-. .-. | `'_\ : [ `/'`\]| '' < / /'`\' |/ .'`\ \[ \ [ \ [  ][ `.-. |       [  |( (`\]  
 | | | | | | // | |, | |    | |`\ \| \__/  || \__. | \ \/\ \/ /  | | | |  _  _  | | `'.'. 
[___||__||__]\'-;__/[___]  [__|  \_]'.__.;__]'.__.'   \__/\__/  [___||__](_)[ \_| |[\__) )
                                                                             \____/
```

## The best JavaScript Markdown Engine with Enhanced Regex Support

A powerful, lightweight markdown parser with advanced regex patterns and utilities.

## Installation

```bash
npm install markdown-js-parser
```

## Usage

### Basic Usage

```javascript
const { parseMarkdown } = require('markdown-js-parser');

const markdown = `
# Hello World

This is **bold** and *italic* text.

- [x] Task completed
- [ ] Task pending

\`\`\`javascript
console.log('Hello, World!');
\`\`\`
`;

const html = parseMarkdown(markdown);
console.log(html);
```

### Advanced Usage with Options

```javascript
const { parseMarkdown } = require('markdown-js-parser');

const options = {
  sanitize: true,
  breaks: true,
  tables: true,
  taskLists: true,
  autoLinks: true
};

const html = parseMarkdown(markdown, options);
```

### Using Regex Utilities

```javascript
const { RegexUtils, REGEX_PATTERNS } = require('markdown-js-parser');

// Escape special regex characters
const escaped = RegexUtils.escape('Hello [world]');

// Check if text matches a markdown pattern
const isHeader = RegexUtils.isMarkdownPattern('# Title', 'h1');

// Access regex patterns directly
console.log(REGEX_PATTERNS.bold);
```

### Browser Usage

```html
<script src="index.js"></script>
<script>
  const html = parseMarkdown('# Hello **World**');
  document.body.innerHTML = html;
</script>
```

## Features

- ✅ Headers (H1-H6) with # syntax and underline syntax
- ✅ Bold and italic text formatting
- ✅ Code blocks with language highlighting support
- ✅ Inline code
- ✅ Links and auto-linking
- ✅ Images
- ✅ Unordered and ordered lists
- ✅ Task lists with checkboxes
- ✅ Blockquotes
- ✅ Horizontal rules
- ✅ Strikethrough text
- ✅ Advanced regex utilities
- ✅ Browser and Node.js compatibility

## API

### parseMarkdown(markdown, options)

Converts markdown text to HTML.

**Parameters:**
- `markdown` (string): The markdown text to parse
- `options` (object, optional): Parser options

**Returns:** string - The parsed HTML

### parseMarkdownFile(filePath, options)

Parses a markdown file and returns HTML.

**Parameters:**
- `filePath` (string): Path to the markdown file
- `options` (object, optional): Parser options

**Returns:** Promise<string> - The parsed HTML

### RegexUtils

Utility functions for working with regex patterns:

- `escape(string)`: Escape special regex characters
- `createDelimiterPattern(delimiter, flags)`: Create regex for delimiter matching
- `isMarkdownPattern(text, pattern)`: Test if text matches a markdown pattern
- `extractMatches(text, pattern)`: Extract all matches for a pattern

### REGEX_PATTERNS

Object containing all regex patterns used by the parser.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
