import { C as CleanCSS } from './index-a2c1aed2.js';
import { visit } from 'https://jspm.dev/unist-util-visit@5.0.0';
import { i as isCssStyle } from './index-5679ecf3.js';
import { t as toString } from './index-b88e09d5.js';
import './index-a8426493.js';
import 'https://jspm.dev/postcss@8.4.31';
import './index-aedb0dc6.js';

/**
 * @typedef {import('hast').Nodes} Nodes
 */

/**
 * Set the plain-text value of a hast node.
 *
 * This is like the DOMs `Node#textContent` setter.
 * The given node is returned.
 *
 * @param {Nodes} node
 *   Node to change.
 * @param {string | null | undefined} [value='']
 *   Value to use (default: `''`)
 * @returns {undefined}
 *   Nothing.
 */
function fromString(node, value) {
  const normalized = value === undefined || value === null ? '' : String(value);

  if ('children' in node) {
    node.children = [];

    if (value) {
      node.children.push({type: 'text', value: normalized});
    }
  } else if (node.type !== 'doctype') {
    node.value = normalized;
  }
}

/**
 * @typedef {import('hast').Root} Root
 */


const clean = new CleanCSS();

/**
 * Minify CSS `<style>` elements.
 *
 * @returns
 *   Transform.
 */
function rehypeMinifyCssStyle() {
  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'element', function (node) {
      if (isCssStyle(node)) {
        try {
          const value = toString(node);
          fromString(node, clean.minify(value).styles || value);
          /* c8 ignore next -- in a try/catch for potential future third party errors */
        } catch {}
      }
    });
  }
}

export { rehypeMinifyCssStyle as default };
