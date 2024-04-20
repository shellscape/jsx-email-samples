import { C as CleanCSS } from './index-a2c1aed2.js';
import { visit } from 'https://jspm.dev/unist-util-visit@5.0.0';
import './index-a8426493.js';
import 'https://jspm.dev/postcss@8.4.31';

/**
 * @typedef {import('hast').Root} Root
 */


const clean = new CleanCSS();

const prefix = '@media ';
const suffix = '{i{color:red}}';

/**
 * Minify media attributes.
 *
 * @returns
 *   Transform.
 */
function rehypeMinifyMediaAttribute() {
  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'element', function (node) {
      const props = node.properties;

      if (
        props &&
        (node.tagName === 'link' ||
          node.tagName === 'source' ||
          node.tagName === 'style')
      ) {
        let value = props.media;

        if (typeof value === 'string') {
          try {
            const output = clean.minify(prefix + value + suffix);
            value = output.styles.slice(prefix.length, -suffix.length);
            /* c8 ignore next -- in a try/catch for potential future third party errors */
          } catch {}

          props.media = value === 'all' || !value ? undefined : value;
        }
      }
    });
  }
}

export { rehypeMinifyMediaAttribute as default };
