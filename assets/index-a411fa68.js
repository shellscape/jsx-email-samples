import { visit } from 'https://jspm.dev/unist-util-visit@5.0.0';
import { c as collapseWhiteSpace } from './index-aedb0dc6.js';
import { i as isCssStyle } from './index-5679ecf3.js';

/**
 * @typedef {import('hast').Nodes} Nodes
 */


/**
 * Check whether a hast node is a `<link>` that references CSS.
 *
 * Returns `true` if `node` is a `<link>` element with a `rel` list that
 * contains `'stylesheet'` and has no `type`, an empty `type`, or `'text/css'`
 * as its `type`.
 *
 * @param {Nodes} node
 *   Node to check.
 * @returns {boolean}
 *   Whether `node` is a CSS link.
 */
function isCssLink(node) {
  if (node.type !== 'element' || node.tagName !== 'link') {
    return false
  }

  const rel = node.properties.rel;

  if (!rel || !Array.isArray(rel) || !rel.includes('stylesheet')) {
    return false
  }

  const value = collapseWhiteSpace(String(node.properties.type || ''), {
    style: 'html',
    trim: true
  }).toLowerCase();

  return value === '' || value === 'text/css'
}

/**
 * @typedef {import('hast').Root} Root
 */


/**
 * Remove `type` attributes on CSS `<style>`s and `<link>`s.
 *
 * @returns
 *   Transform.
 */
function rehypeRemoveStyleTypeCss() {
  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'element', function (node) {
      if ('type' in node.properties && (isCssLink(node) || isCssStyle(node))) {
        node.properties.type = undefined;
      }
    });
  }
}

export { rehypeRemoveStyleTypeCss as default };
