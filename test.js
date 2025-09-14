// Simple test suite for markdown-js-parser
const { parseMarkdown, RegexUtils, REGEX_PATTERNS } = require('./index.js');

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}\nExpected: ${expected}\nActual: ${actual}`);
  }
}

// Test basic functionality
test('Headers', () => {
  const markdown = '# Header 1\n## Header 2\n### Header 3';
  const expected = '<h1>Header 1</h1>\n<h2>Header 2</h2>\n<h3>Header 3</h3>';
  const result = parseMarkdown(markdown);
  assertEqual(result, expected, 'Headers should be converted correctly');
});

test('Bold and Italic', () => {
  const markdown = '**bold** and *italic* text';
  const result = parseMarkdown(markdown);
  if (!result.includes('<strong>bold</strong>') || !result.includes('<em>italic</em>')) {
    throw new Error('Bold and italic formatting failed');
  }
});

test('Links', () => {
  const markdown = '[GitHub](https://github.com)';
  const result = parseMarkdown(markdown);
  if (!result.includes('<a href="https://github.com">GitHub</a>')) {
    throw new Error('Link formatting failed');
  }
});

test('Code blocks', () => {
  const markdown = '```javascript\nconsole.log("hello");\n```';
  const result = parseMarkdown(markdown);
  if (!result.includes('<pre><code class="language-javascript">console.log("hello");</code></pre>')) {
    throw new Error('Code block formatting failed');
  }
});

test('Task lists', () => {
  const markdown = '- [x] Completed task\n- [ ] Incomplete task';
  const result = parseMarkdown(markdown);
  if (!result.includes('checked disabled') || !result.includes('type="checkbox"')) {
    throw new Error('Task list formatting failed');
  }
});

test('RegexUtils.escape', () => {
  const input = 'test.*+?^${}()|[]\\';
  const expected = 'test\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\';
  const result = RegexUtils.escape(input);
  assertEqual(result, expected, 'Special characters should be escaped');
});

test('RegexUtils.isMarkdownPattern', () => {
  const text = '# Header';
  const result = RegexUtils.isMarkdownPattern(text, 'h1');
  if (!result) {
    throw new Error('Should detect h1 pattern');
  }
});

test('Empty input handling', () => {
  assertEqual(parseMarkdown(''), '', 'Empty string should return empty string');
  assertEqual(parseMarkdown(null), '', 'Null should return empty string');
  assertEqual(parseMarkdown(undefined), '', 'Undefined should return empty string');
});

// Run all tests
console.log('Running markdown-js-parser tests...\n');

test('Headers', () => {
  const markdown = '# Header 1\n## Header 2\n### Header 3';
  const result = parseMarkdown(markdown);
  if (!result.includes('<h1>Header 1</h1>') || 
      !result.includes('<h2>Header 2</h2>') || 
      !result.includes('<h3>Header 3</h3>')) {
    throw new Error('Headers not converted correctly');
  }
});

test('Bold and Italic', () => {
  const markdown = '**bold** and *italic* text';
  const result = parseMarkdown(markdown);
  if (!result.includes('<strong>bold</strong>') || !result.includes('<em>italic</em>')) {
    throw new Error('Bold and italic formatting failed');
  }
});

test('Links', () => {
  const markdown = '[GitHub](https://github.com)';
  const result = parseMarkdown(markdown);
  if (!result.includes('<a href="https://github.com">GitHub</a>')) {
    throw new Error('Link formatting failed');
  }
});

test('Code blocks', () => {
  const markdown = '```javascript\nconsole.log("hello");\n```';
  const result = parseMarkdown(markdown);
  if (!result.includes('language-javascript') && !result.includes('<code>')) {
    throw new Error('Code block formatting failed');
  }
});

test('Task lists', () => {
  const markdown = '- [x] Completed task\n- [ ] Incomplete task';
  const result = parseMarkdown(markdown);
  if (!result.includes('checked disabled') || !result.includes('type="checkbox"')) {
    throw new Error('Task list formatting failed');
  }
});

test('RegexUtils.escape', () => {
  const input = 'test.*+?^${}()|[]\\';
  const expected = 'test\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\';
  const result = RegexUtils.escape(input);
  assertEqual(result, expected, 'Special characters should be escaped');
});

test('RegexUtils.isMarkdownPattern', () => {
  const text = '# Header';
  const result = RegexUtils.isMarkdownPattern(text, 'h1');
  if (!result) {
    throw new Error('Should detect h1 pattern');
  }
});

test('Empty input handling', () => {
  assertEqual(parseMarkdown(''), '', 'Empty string should return empty string');
  assertEqual(parseMarkdown(null), '', 'Null should return empty string');
  assertEqual(parseMarkdown(undefined), '', 'Undefined should return empty string');
});

console.log('\nTest suite completed!');