import { visit } from 'https://jspm.dev/unist-util-visit@5.0.0';
import { i as isEventHandler } from './index-3fa01af2.js';
import { i as isElement } from './index-1c34005f.js';

/** @type {Record<string, Array<string> | string | null>} */
const schema = {
  abbr: 'th',
  accept: 'input',
  acceptCharset: 'form',
  accessKey: null,
  action: 'form',
  charSet: ['meta', 'script'],
  className: null,
  cols: 'textarea',
  colSpan: ['td', 'th'],
  coords: 'area',
  dir: null,
  dirname: ['input', 'textarea'],
  dropzone: null,
  headers: ['td', 'th'],
  htmlFor: ['label', 'output'],
  form: [
    'button',
    'fieldset',
    'input',
    'keygen',
    'object',
    'output',
    'select',
    'textarea'
  ],
  formAction: ['button', 'input'],
  height: ['canvas', 'embed', 'iframe', 'img', 'input', 'object', 'video'],
  high: 'meter',
  href: 'link',
  icon: 'menuitem',
  id: null,
  itemProp: null,
  itemRef: null,
  itemType: null,
  list: 'input',
  low: 'meter',
  manifest: 'html',
  max: ['meter', 'progress'],
  maxLength: ['input', 'textarea'],
  menu: 'button',
  min: 'meter',
  minLength: ['input', 'textarea'],
  name: [
    'button',
    'fieldset',
    'input',
    'keygen',
    'output',
    'select',
    'textarea',
    'form',
    'map',
    'meta',
    'param',
    'slot'
  ],
  optimum: 'meter',
  pattern: 'input',
  ping: ['a', 'area'],
  placeholder: ['input', 'textarea'],
  poster: 'video',
  rel: ['a', 'area', 'link'],
  rows: 'textarea',
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
  start: 'ol',
  style: null,
  tabIndex: null,
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
    'menuitem',
    'ol'
  ],
  useMap: ['img', 'object'],
  value: ['button', 'input', 'li'],
  width: ['canvas', 'embed', 'iframe', 'img', 'input', 'object', 'video']
};

/**
 * @typedef {import('hast').Root} Root
 */


/**
 * Remove empty attributes.
 *
 * @returns
 *   Transform.
 */
function rehypeRemoveEmptyAttribute() {
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
            (value === '' || (Array.isArray(value) && value.length === 0)) &&
            (isEventHandler(prop) ||
              (Object.hasOwn(schema, prop) && isElement(node, schema[prop])))
          ) {
            node.properties[prop] = undefined;
          }
        }
      }
    });
  }
}

export { rehypeRemoveEmptyAttribute as default };
