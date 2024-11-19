// src/utils/sanitize.js

import DOMPurify from 'dompurify';

// Define a reusable sanitize configuration
export default sanitizeConfig = {
  ALLOWED_TAGS: [
    'b', 'i', 'u', 'strike', 'a', 'img', 'p', 'br', 'div', 'span',
    'ul', 'ol', 'li', 'strong', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'video', // Include if you allow video embeds
  ],
  ALLOWED_ATTRIBUTES: {
    'a': ['href', 'title', 'target', 'rel'],
    'img': ['src', 'alt', 'title', 'width', 'height'],
    'video': ['src', 'controls', 'width', 'height'],
    '*': ['data-*'], // Allow data-* attributes if needed
  },
  ALLOW_DATA_ATTR: true, // Allow data-* attributes
};
