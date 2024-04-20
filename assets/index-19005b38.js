import { visit } from 'https://jspm.dev/unist-util-visit@5.0.0';

/**
 * @typedef {import('hast').Nodes} Nodes
 */

const re = /^\[if[ \t\f\n\r]+[^\]]+]|<!\[endif]$/;

/**
 * Check if a node is a conditional comment.
 *
 * @param {Nodes} node
 *   Node to check.
 * @returns {boolean}
 *   Whether `node` is a conditional comment.
 */
function isConditionalComment(node) {
  return node.type === 'comment' && re.test(node.value)
}

/**
 * @typedef {import('hast').Root} Root
 *
 * @typedef Options
 *   Configuration.
 * @property {boolean | null | undefined} [removeConditional=false]
 *   Remove conditional comments (default: `false`); the default is to leave
 *   them.
 */


/** @type {Options} */
const emptyOptions = {};

/**
 * Remove comments (except conditional comments).
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
function rehypeRemoveComments(options) {
  const settings = options || emptyOptions;

  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'comment', function (node, index, parent) {
      if (
        typeof index === 'number' &&
        parent &&
        (settings.removeConditional || !isConditionalComment(node))
      ) {
        parent.children.splice(index, 1);
        return index
      }
    });
  }
}

export { rehypeRemoveComments as default };
