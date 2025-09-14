// markdown-js-parser - Enhanced Markdown to HTML parser with advanced regex support
// by Ferretosan

/**
 * Enhanced regex patterns for markdown parsing
 */
const REGEX_PATTERNS = {
  // Headers (with improved patterns)
  h6: /^#{6}\s+(.*$)/gim,
  h5: /^#{5}\s+(.*$)/gim,
  h4: /^#{4}\s+(.*$)/gim,
  h3: /^#{3}\s+(.*$)/gim,
  h2: /^#{2}\s+(.*$)/gim,
  h1: /^#{1}\s+(.*$)/gim,
  
  // Alternative header syntax (underline style)
  h1Alt: /^(.+)\n={3,}$/gm,
  h2Alt: /^(.+)\n-{3,}$/gm,
  
  // Text formatting
  bold: /\*\*(.*?)\*\*/gim,
  boldAlt: /__(.*?)__/gim,
  italic: /\*((?!\*)(.*?))\*/gim,
  italicAlt: /_((?!_)(.*?))_/gim,
  strikethrough: /~~(.*?)~~/gim,
  
  // Code
  codeBlock: /```([\s\S]*?)```/gim,
  codeBlockWithLang: /```(\w+)?\n([\s\S]*?)```/gim,
  inlineCode: /`([^`]+)`/gim,
  
  // Links and images
  link: /\[([^\]]+)\]\(([^)]+)\)/gim,
  autoLink: /(https?:\/\/[^\s]+)/gim,
  image: /!\[([^\]]*)\]\(([^)]+)\)/gim,
  
  // Lists
  unorderedList: /^[-*+]\s+(.*$)/gim,
  orderedList: /^\d+\.\s+(.*$)/gim,
  taskListChecked: /^[-*+]\s+\[x\]\s+(.*$)/gim,
  taskListUnchecked: /^[-*+]\s+\[\s\]\s+(.*$)/gim,
  
  // Quotes and horizontal rules
  blockquote: /^>\s+(.*$)/gim,
  horizontalRule: /^(-{3,}|_{3,}|\*{3,})$/gim,
  
  // Tables
  tableHeader: /\|(.+)\|/g,
  tableSeparator: /\|[\s]*:?-+:?[\s]*\|/g,
  tableRow: /\|(.+)\|/g,
  
  // Line breaks
  lineBreak: /\n/g,
  doubleLineBreak: /\n\s*\n/g
};

/**
 * Regex utility functions
 */
const RegexUtils = {
  /**
   * Escape special regex characters in a string
   * @param {string} string 
   * @returns {string}
   */
  escape(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  /**
   * Create a regex pattern for matching between delimiters
   * @param {string} delimiter 
   * @param {string} flags 
   * @returns {RegExp}
   */
  createDelimiterPattern(delimiter, flags = 'gim') {
    const escaped = this.escape(delimiter);
    return new RegExp(`${escaped}([^${escaped}]+)${escaped}`, flags);
  },

  /**
   * Test if a string matches a markdown pattern
   * @param {string} text 
   * @param {string} pattern 
   * @returns {boolean}
   */
  isMarkdownPattern(text, pattern) {
    const regex = REGEX_PATTERNS[pattern];
    return regex ? regex.test(text) : false;
  },

  /**
   * Extract all matches for a pattern
   * @param {string} text 
   * @param {RegExp} pattern 
   * @returns {Array}
   */
  extractMatches(text, pattern) {
    const matches = [];
    let match;
    while ((match = pattern.exec(text)) !== null) {
      matches.push(match);
    }
    return matches;
  }
};

/**
 * Enhanced markdown parser with advanced regex support
 * @param {string} markdown - The markdown text to parse
 * @param {Object} options - Parser options
 * @returns {string} - The parsed HTML
 */
function parseMarkdown(markdown, options = {}) {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  const defaults = {
    sanitize: true,
    breaks: true,
    tables: true,
    taskLists: true,
    autoLinks: true,
    ...options
  };

  let html = markdown;

  // Handle horizontal rules first (but not when they follow text for alt headers)
  html = html.replace(/^(-{3,}|_{3,}|\*{3,})$/gim, '<hr>');

  // Handle alternative header syntax before regular headers
  html = html.replace(REGEX_PATTERNS.h1Alt, '<h1>$1</h1>');
  html = html.replace(REGEX_PATTERNS.h2Alt, '<h2>$1</h2>');

  // Handle headers (h6 to h1 for proper precedence)
  html = html.replace(REGEX_PATTERNS.h6, '<h6>$1</h6>');
  html = html.replace(REGEX_PATTERNS.h5, '<h5>$1</h5>');
  html = html.replace(REGEX_PATTERNS.h4, '<h4>$1</h4>');
  html = html.replace(REGEX_PATTERNS.h3, '<h3>$1</h3>');
  html = html.replace(REGEX_PATTERNS.h2, '<h2>$1</h2>');
  html = html.replace(REGEX_PATTERNS.h1, '<h1>$1</h1>');

  // Handle images before links (to avoid conflicts)
  html = html.replace(REGEX_PATTERNS.image, '<img src="$2" alt="$1" />');

  // Handle links first
  html = html.replace(REGEX_PATTERNS.link, '<a href="$2">$1</a>');
  
  // Auto-link URLs if enabled (simple approach to avoid conflicts)
  if (defaults.autoLinks) {
    // Only auto-link URLs that are not already part of existing links
    html = html.replace(/(^|\s)(https?:\/\/[^\s<]+)/gim, '$1<a href="$2" target="_blank">$2</a>');
  }

  // Handle code blocks with language specification
  html = html.replace(REGEX_PATTERNS.codeBlockWithLang, (match, lang, code) => {
    const langClass = lang ? ` class="language-${lang}"` : '';
    return `<pre><code${langClass}>${code.trim()}</code></pre>`;
  });

  // Handle simple code blocks
  html = html.replace(REGEX_PATTERNS.codeBlock, '<pre><code>$1</code></pre>');

  // Handle inline code
  html = html.replace(REGEX_PATTERNS.inlineCode, '<code>$1</code>');

  // Text formatting (order matters)
  html = html.replace(REGEX_PATTERNS.strikethrough, '<del>$1</del>');
  html = html.replace(REGEX_PATTERNS.bold, '<strong>$1</strong>');
  html = html.replace(REGEX_PATTERNS.boldAlt, '<strong>$1</strong>');
  html = html.replace(REGEX_PATTERNS.italic, '<em>$1</em>');
  html = html.replace(REGEX_PATTERNS.italicAlt, '<em>$1</em>');

  // Handle task lists if enabled
  if (defaults.taskLists) {
    html = html.replace(REGEX_PATTERNS.taskListChecked, '<li class="task-list-item"><input type="checkbox" checked disabled> $1</li>');
    html = html.replace(REGEX_PATTERNS.taskListUnchecked, '<li class="task-list-item"><input type="checkbox" disabled> $1</li>');
  }

  // Handle regular lists
  html = html.replace(REGEX_PATTERNS.unorderedList, '<li>$1</li>');
  html = html.replace(REGEX_PATTERNS.orderedList, '<li>$1</li>');

  // Wrap consecutive list items in ul/ol tags
  html = html.replace(/(<li>.*?<\/li>(\s*<li>.*?<\/li>)*)/gims, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/gim, '');

  // Handle blockquotes
  html = html.replace(REGEX_PATTERNS.blockquote, '<blockquote><p>$1</p></blockquote>');
  html = html.replace(/<\/blockquote>\s*<blockquote>/gim, '');

  // Split into paragraphs
  const paragraphs = html.split(REGEX_PATTERNS.doubleLineBreak);

  // Process each paragraph
  html = paragraphs.map(para => {
    para = para.trim();
    if (!para) return '';

    // Skip if it's already wrapped in block elements
    if (para.match(/^<(h[1-6]|ul|ol|li|pre|div|blockquote|hr)/)) {
      return para;
    }

    // Replace single line breaks with <br> if breaks option is enabled
    if (defaults.breaks) {
      para = para.replace(REGEX_PATTERNS.lineBreak, '<br>');
    }

    // Wrap in paragraph tags
    return `<p>${para}</p>`;
  }).join('\n\n');

  return html;
}

/**
 * Parse markdown from a file
 * @param {string} filePath - Path to the markdown file
 * @param {Object} options - Parser options
 * @returns {Promise<string>} - The parsed HTML
 */
async function parseMarkdownFile(filePath, options = {}) {
  const fs = require('fs').promises;
  try {
    const markdown = await fs.readFile(filePath, 'utf8');
    return parseMarkdown(markdown, options);
  } catch (error) {
    throw new Error(`Failed to parse markdown file: ${error.message}`);
  }
}

// Browser compatibility - legacy function for backward compatibility
async function loadBlogPost(filename) {
  try {
    const response = await fetch(`/blog/${filename}`);
    if (!response.ok) {
      throw new Error('Blog post not found');
    }
    
    const markdown = await response.text();
    const html = parseMarkdown(markdown);
    
    return html;
  } catch (error) {
    console.error('Error loading blog post:', error);
    throw error;
  }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  // Node.js
  module.exports = {
    parseMarkdown,
    parseMarkdownFile,
    RegexUtils,
    REGEX_PATTERNS,
    loadBlogPost // for backward compatibility
  };
} else if (typeof window !== 'undefined') {
  // Browser
  window.parseMarkdown = parseMarkdown;
  window.RegexUtils = RegexUtils;
  window.REGEX_PATTERNS = REGEX_PATTERNS;
  window.loadBlogPost = loadBlogPost;
}