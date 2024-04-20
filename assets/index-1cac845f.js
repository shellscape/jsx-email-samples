import { s as stringify, p as parse } from './index-dd77df7e.js';
import { visit } from 'https://jspm.dev/unist-util-visit@5.0.0';

/**
 * @typedef {import('hast').Root} Root
 */


const lists = new Set([
  'viewport',
  'keywords',
  'robots',
  'apple-itunes-app',
  'apple-media-service-subscription'
]);

/**
 * Minify `content` attributes on `meta` elements.
 *
 * @returns
 *   Transform.
 */
function rehypeMinifyMetaContent() {
  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'element', function (node) {
      if (node.tagName === 'meta') {
        let value = node.properties.content;

        if (typeof value === 'string') {
          const name = node.properties.name;

          if (name === 'viewport') {
            value = value
              .replace(/(\d+\.\d+)/, function (d) {
                return String(Number(d))
              })
              .replace(/user-scalable=\s*yes/, '');
            // Fall through.
          }

          if (typeof name === 'string' && lists.has(name)) {
            value = stringify(parse(value), {padLeft: false});
          }

          node.properties.content = value;
        }
      }
    });
  }
}

export { rehypeMinifyMetaContent as default };
