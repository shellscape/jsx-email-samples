import { C as CleanCSS } from './index-a2c1aed2.js';
import { visit } from 'https://jspm.dev/unist-util-visit@5.0.0';
import './index-a8426493.js';
import 'https://jspm.dev/postcss@8.4.31';

/**
 * @typedef {import('hast').Root} Root
 */


const clean = new CleanCSS();

const prefix = '*{';
const suffix = '}';

/**
 * Minify `style` attributes.
 *
 * @returns
 *   Transform.
 */
function rehypeMinifyStyleAttribute() {
  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'element', function (node) {
      let value = node.properties.style;

      if (typeof value === 'string') {
        try {
          const output = clean.minify(prefix + value + suffix).styles;
          value = output ? output.slice(prefix.length, -suffix.length) : value;
          /* c8 ignore next -- in a try/catch for potential future third party errors */
        } catch {}

        node.properties.style = value || undefined;
      }
    });
  }
}

export { rehypeMinifyStyleAttribute as default };
