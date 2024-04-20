import { c as collapseWhiteSpace } from './index-aedb0dc6.js';

/**
 * @typedef {import('hast').Nodes} Nodes
 */


/**
 * Check whether a hast node is a `<style>` that contains CSS.
 *
 * Returns `true` if `node` is a `<style>` element that has no `type`, an empty
 * `type`, or `'text/css'` as its `type`.
 *
 * @param {Nodes} node
 *   Node to check.
 * @returns {boolean}
 *   Whether `node` is a CSS style element.
 */
function isCssStyle(node) {
  if (node.type !== 'element' || node.tagName !== 'style') {
    return false
  }

  const value = collapseWhiteSpace(String(node.properties.type || ''), {
    style: 'html',
    trim: true
  }).toLowerCase();

  return value === '' || value === 'text/css'
}

export { isCssStyle as i };
