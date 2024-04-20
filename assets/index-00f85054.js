import { visit } from 'https://jspm.dev/unist-util-visit@5.0.0';
import { i as isElement } from './index-1c34005f.js';

/** @type {Record<string, Array<string> | string | null>} */
const schema = {
  acceptCharset: 'form',
  accessKey: null,
  className: null,
  dropzone: null,
  htmlFor: 'output',
  headers: ['td', 'th'],
  itemProp: null,
  itemRef: null,
  itemType: null,
  sandbox: 'iframe',
  sizes: 'link'
};

/**
 * @typedef {import('hast').Root} Root
 */


/**
 * Remove duplicates in attributes values.
 *
 * @returns
 *   Transform.
 */
function rehypeRemoveDuplicateAttributeValues() {
  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'element', function (node) {
      /** @type {string} */
      let prop;

      for (prop in node.properties) {
        if (Object.hasOwn(node.properties, prop)) {
          const value = node.properties[prop];

          if (
            Object.hasOwn(schema, prop) &&
            isElement(node, schema[prop]) &&
            Array.isArray(value)
          ) {
            node.properties[prop] = [...new Set(value)];
          }
        }
      }
    });
  }
}

export { rehypeRemoveDuplicateAttributeValues as default };
