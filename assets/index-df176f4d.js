import { visit } from 'https://jspm.dev/unist-util-visit@5.0.0';
import { i as isElement } from './index-1c34005f.js';

/**
 * @type {Record<string, Array<string> | null>}
 */
const schema = {
  acceptCharset: ['form'],
  autoComplete: ['form'],
  charSet: ['meta', 'script'],
  contentEditable: null,
  crossOrigin: ['audio', 'img', 'link', 'script', 'video'],
  dir: null,
  draggable: null,
  dropzone: null,
  encType: ['form'],
  formEncType: ['button', 'input'],
  formMethod: ['button', 'input'],
  inputMode: ['input', 'textarea'],
  kind: ['track'],
  method: ['form'],
  preload: ['audio', 'video'],
  referrerPolicy: ['a', 'area', 'iframe', 'img', 'link'],
  sandbox: ['iframe'],
  spellCheck: null,
  scope: ['th'],
  shape: ['area'],
  sizes: ['link'],
  step: ['input'],
  translate: null,
  type: [
    'a',
    'link',
    'button',
    'embed',
    'object',
    'script',
    'source',
    'style',
    'input',
    'menu',
    'menuitem'
  ],
  wrap: ['textarea']
};

/**
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('hast').Root} Root
 */


/**
 * Normalize casing of attributes.
 *
 * @returns
 *   Transform.
 */
function rehypeNormalizeAttributeValueCase() {
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
        if (
          node.properties[prop] &&
          Object.hasOwn(schema, prop) &&
          isElement(node, schema[prop])
        ) {
          node.properties[prop] = minify(node.properties[prop]);
        }
      }
    });
  }
}

/**
 * @param {PropertyValue} value
 *   Value.
 * @returns {PropertyValue}
 *   Value.
 */
function minify(value) {
  return Array.isArray(value) ? all(value) : one(value)
}

/**
 * @param {Objects} value
 *   Value.
 * @returns {Objects}
 *   Value.
 */
function all(value) {
  let index = -1;
  /** @type {Objects} */
  const result = [];

  while (++index < value.length) {
    // @ts-expect-error: kind in -> kind out.
    result[index] = one(value[index]);
  }

  return result
}

/**
 * @param {Primitives} value
 *   Value.
 * @returns {Primitives}
 *   Value.
 */
function one(value) {
  return typeof value === 'string' ? value.toLowerCase() : value
}

export { rehypeNormalizeAttributeValueCase as default };
