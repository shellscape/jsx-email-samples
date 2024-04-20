import { c as collapseWhiteSpace } from './index-aedb0dc6.js';
import { visit } from 'https://jspm.dev/unist-util-visit@5.0.0';
import { i as isEventHandler } from './index-3fa01af2.js';
import { i as isElement } from './index-1c34005f.js';

// Note: Don’t include non-strings (such as `boolean`s) here, they are handled
// by `rehype-stringify`.

/**
 * Map of property names to tag names.
 * `null` means all tag names.
 *
 * @type {Record<string, Array<string> | null>}
 */
const schema = {
  accept: ['input'],
  acceptCharset: ['form'],
  accessKey: null,
  action: ['form'],
  cite: ['blockquote', 'del', 'ins', 'q'],
  className: null,
  cols: ['textarea'],
  colSpan: ['td', 'th'],
  data: ['object'],
  dropzone: null,
  formAction: ['button', 'input'],
  height: ['canvas', 'embed', 'iframe', 'img', 'input', 'object', 'video'],
  high: ['meter'],
  href: ['a', 'area', 'base', 'link'],
  htmlFor: ['output'],
  icon: ['menuitem'],
  itemId: null,
  low: ['meter'],
  manifest: ['html'],
  max: ['meter', 'progress'],
  maxLength: ['input', 'textarea'],
  media: ['source'],
  min: ['meter'],
  minLength: ['input', 'textarea'],
  optimum: ['meter'],
  ping: ['a', 'area'],
  poster: ['video'],
  profile: ['head'],
  rows: ['textarea'],
  rowSpan: ['td', 'th'],
  size: ['input', 'select'],
  span: ['col', 'colgroup'],
  src: [
    'audio',
    'embed',
    'iframe',
    'img',
    'input',
    'script',
    'source',
    'track',
    'video'
  ],
  start: ['ol'],
  step: ['input'],
  style: null,
  tabIndex: null,
  useMap: ['img', 'object'],
  value: ['li', 'meter', 'progress'],
  width: ['canvas', 'embed', 'iframe', 'img', 'input', 'object', 'video']
};

/**
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('hast').Root} Root
 */


/**
 * Minify whitespace in attributes.
 *
 * @returns
 *   Transform.
 */
function rehypeMinifyAttributeWhitespace() {
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
          Object.hasOwn(node.properties, prop) &&
          (isEventHandler(prop) ||
            (Object.hasOwn(schema, prop) && isElement(node, schema[prop])))
        ) {
          node.properties[prop] = minify(node.properties[prop]);
        }
      }
    });
  }
}

/**
 * @param {PropertyValue} value
 *   Property value.
 * @returns {PropertyValue}
 *   Trimmed value.
 */
function minify(value) {
  return Array.isArray(value) ? all(value) : one(value)
}

/**
 * @param {Objects} value
 *   Objects.
 * @returns {Objects}
 *   Trimmed copy.
 */
function all(value) {
  let index = -1;
  /** @type {Objects} */
  const result = [];

  while (++index < value.length) {
    // @ts-expect-error: value in -> value out.
    result[index] = one(value[index]);
  }

  return result
}

/**
 * @param {Primitives} value
 *   Primitive.
 * @returns {Primitives}
 *   Trimmed.
 */
function one(value) {
  return typeof value === 'string'
    ? collapseWhiteSpace(value, {style: 'html', trim: true})
    : value
}

export { rehypeMinifyAttributeWhitespace as default };
