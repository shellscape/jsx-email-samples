import { C as CleanCSS } from './index-a2c1aed2.js';
import { visit } from 'https://jspm.dev/unist-util-visit@5.0.0';
import './index-a8426493.js';
import 'https://jspm.dev/postcss@8.4.31';

/**
 * @typedef {import('hast').Root} Root
 */


const clean = new CleanCSS();

const prefix = '*{color:';
const suffix = '}';

/**
 * Minify color attributes.
 *
 * @returns
 *   Transform.
 */
function rehypeMinifyMetaColor() {
  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'element', function (node) {
      if (
        node.tagName === 'meta' &&
        (node.properties.name === 'msapplication-TileColor' ||
          node.properties.name === 'theme-color')
      ) {
        let value = node.properties.content;

        if (typeof value === 'string') {
          try {
            const output = clean.minify(prefix + value + suffix);
            value = output.styles.slice(prefix.length, -suffix.length);
            /* c8 ignore next -- in a try/catch for potential future third party errors */
          } catch {}

          node.properties.content = value;
        }
      }
    });
  }
}

export { rehypeMinifyMetaColor as default };
