import { w as whitespace } from './index-68e080e8.js';
import { c as convertElement, i as isElement } from './index-1c34005f.js';

/**
 * Check if a node is a *embedded content*.
 *
 * @param value
 *   Thing to check (typically `Node`).
 * @returns
 *   Whether `value` is an element considered embedded content.
 *
 *   The elements `audio`, `canvas`, `embed`, `iframe`, `img`, `math`,
 *   `object`, `picture`, `svg`, and `video` are embedded content.
 */
const embedded = convertElement(
  /**
   * @param element
   * @returns {element is {tagName: 'audio' | 'canvas' | 'embed' | 'iframe' | 'img' | 'math' | 'object' | 'picture' | 'svg' | 'video'}}
   */
  function (element) {
    return (
      element.tagName === 'audio' ||
      element.tagName === 'canvas' ||
      element.tagName === 'embed' ||
      element.tagName === 'iframe' ||
      element.tagName === 'img' ||
      element.tagName === 'math' ||
      element.tagName === 'object' ||
      element.tagName === 'picture' ||
      element.tagName === 'svg' ||
      element.tagName === 'video'
    )
  }
);

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 */


/**
 * Generate an assertion from a test.
 *
 * Useful if you’re going to test many nodes, for example when creating a
 * utility where something else passes a compatible test.
 *
 * The created function is a bit faster because it expects valid input only:
 * a `node`, `index`, and `parent`.
 *
 * @param {Test} test
 *   *   when nullish, checks if `node` is a `Node`.
 *   *   when `string`, works like passing `(node) => node.type === test`.
 *   *   when `function` checks if function passed the node is true.
 *   *   when `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
 *   *   when `array`, checks if any one of the subtests pass.
 * @returns {Check}
 *   An assertion.
 */
const convert =
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  (
    /**
     * @param {Test} [test]
     * @returns {Check}
     */
    function (test) {
      if (test === null || test === undefined) {
        return ok
      }

      if (typeof test === 'function') {
        return castFactory(test)
      }

      if (typeof test === 'object') {
        return Array.isArray(test) ? anyFactory(test) : propsFactory(test)
      }

      if (typeof test === 'string') {
        return typeFactory(test)
      }

      throw new Error('Expected function, string, or object as test')
    }
  );

/**
 * @param {Array<Props | TestFunction | string>} tests
 * @returns {Check}
 */
function anyFactory(tests) {
  /** @type {Array<Check>} */
  const checks = [];
  let index = -1;

  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }

  return castFactory(any)

  /**
   * @this {unknown}
   * @type {TestFunction}
   */
  function any(...parameters) {
    let index = -1;

    while (++index < checks.length) {
      if (checks[index].apply(this, parameters)) return true
    }

    return false
  }
}

/**
 * Turn an object into a test for a node with a certain fields.
 *
 * @param {Props} check
 * @returns {Check}
 */
function propsFactory(check) {
  const checkAsRecord = /** @type {Record<string, unknown>} */ (check);

  return castFactory(all)

  /**
   * @param {Node} node
   * @returns {boolean}
   */
  function all(node) {
    const nodeAsRecord = /** @type {Record<string, unknown>} */ (
      /** @type {unknown} */ (node)
    );

    /** @type {string} */
    let key;

    for (key in check) {
      if (nodeAsRecord[key] !== checkAsRecord[key]) return false
    }

    return true
  }
}

/**
 * Turn a string into a test for a node with a certain type.
 *
 * @param {string} check
 * @returns {Check}
 */
function typeFactory(check) {
  return castFactory(type)

  /**
   * @param {Node} node
   */
  function type(node) {
    return node && node.type === check
  }
}

/**
 * Turn a custom test into a test for a node that passes that test.
 *
 * @param {TestFunction} testFunction
 * @returns {Check}
 */
function castFactory(testFunction) {
  return check

  /**
   * @this {unknown}
   * @type {Check}
   */
  function check(value, index, parent) {
    return Boolean(
      looksLikeANode(value) &&
        testFunction.call(
          this,
          value,
          typeof index === 'number' ? index : undefined,
          parent || undefined
        )
    )
  }
}

function ok() {
  return true
}

/**
 * @param {unknown} value
 * @returns {value is Node}
 */
function looksLikeANode(value) {
  return value !== null && typeof value === 'object' && 'type' in value
}

// See: <https://html.spec.whatwg.org/#the-css-user-agent-style-sheet-and-presentational-hints>
const blocks = [
  'address', // Flow content.
  'article', // Sections and headings.
  'aside', // Sections and headings.
  'blockquote', // Flow content.
  'body', // Page.
  'br', // Contribute whitespace intrinsically.
  'caption', // Similar to block.
  'center', // Flow content, legacy.
  'col', // Similar to block.
  'colgroup', // Similar to block.
  'dd', // Lists.
  'dialog', // Flow content.
  'dir', // Lists, legacy.
  'div', // Flow content.
  'dl', // Lists.
  'dt', // Lists.
  'figcaption', // Flow content.
  'figure', // Flow content.
  'footer', // Flow content.
  'form', // Flow content.
  'h1', // Sections and headings.
  'h2', // Sections and headings.
  'h3', // Sections and headings.
  'h4', // Sections and headings.
  'h5', // Sections and headings.
  'h6', // Sections and headings.
  'head', // Page.
  'header', // Flow content.
  'hgroup', // Sections and headings.
  'hr', // Flow content.
  'html', // Page.
  'legend', // Flow content.
  'li', // Block-like.
  'li', // Similar to block.
  'listing', // Flow content, legacy
  'main', // Flow content.
  'menu', // Lists.
  'nav', // Sections and headings.
  'ol', // Lists.
  'optgroup', // Similar to block.
  'option', // Similar to block.
  'p', // Flow content.
  'plaintext', // Flow content, legacy
  'pre', // Flow content.
  'section', // Sections and headings.
  'summary', // Similar to block.
  'table', // Similar to block.
  'tbody', // Similar to block.
  'td', // Block-like.
  'td', // Similar to block.
  'tfoot', // Similar to block.
  'th', // Block-like.
  'th', // Similar to block.
  'thead', // Similar to block.
  'tr', // Similar to block.
  'ul', // Lists.
  'wbr', // Contribute whitespace intrinsically.
  'xmp' // Flow content, legacy
];

const content$1 = [
  // Form.
  'button',
  'input',
  'select',
  'textarea'
];

const skippable$1 = [
  'area',
  'base',
  'basefont',
  'dialog',
  'datalist',
  'head',
  'link',
  'meta',
  'noembed',
  'noframes',
  'param',
  'rp',
  'script',
  'source',
  'style',
  'template',
  'track',
  'title'
];

/**
 * @typedef {import('hast').Nodes} Nodes
 * @typedef {import('hast').Parents} Parents
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Text} Text
 */


/** @type {Options} */
const emptyOptions = {};
const ignorableNode = convert(['doctype', 'comment']);

/**
 * Minify whitespace.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
function rehypeMinifyWhitespace(options) {
  const settings = options || emptyOptions;
  const collapse = collapseFactory(
    settings.newlines ? replaceNewlines : replaceWhitespace
  );

  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    minify(tree, {collapse, whitespace: 'normal'});
  }
}

/**
 * @param {Nodes} node
 *   Node.
 * @param {State} state
 *   Info passed around.
 * @returns {Result}
 *   Result.
 */
function minify(node, state) {
  if ('children' in node) {
    const settings = {...state};

    if (node.type === 'root' || blocklike(node)) {
      settings.before = true;
      settings.after = true;
    }

    settings.whitespace = inferWhiteSpace(node, state);

    return all(node, settings)
  }

  if (node.type === 'text') {
    if (state.whitespace === 'normal') {
      return minifyText(node, state)
    }

    // Naïve collapse, but no trimming:
    if (state.whitespace === 'nowrap') {
      node.value = state.collapse(node.value);
    }

    // The `pre-wrap` or `pre` whitespace settings are neither collapsed nor
    // trimmed.
  }

  return {ignore: ignorableNode(node), stripAtStart: false, remove: false}
}

/**
 * @param {Text} node
 *   Node.
 * @param {State} state
 *   Info passed around.
 * @returns {Result}
 *   Result.
 */
function minifyText(node, state) {
  const value = state.collapse(node.value);
  const result = {ignore: false, stripAtStart: false, remove: false};
  let start = 0;
  let end = value.length;

  if (state.before && removable(value.charAt(0))) {
    start++;
  }

  if (start !== end && removable(value.charAt(end - 1))) {
    if (state.after) {
      end--;
    } else {
      result.stripAtStart = true;
    }
  }

  if (start === end) {
    result.remove = true;
  } else {
    node.value = value.slice(start, end);
  }

  return result
}

/**
 * @param {Parents} parent
 *   Node.
 * @param {State} state
 *   Info passed around.
 * @returns {Result}
 *   Result.
 */
function all(parent, state) {
  let before = state.before;
  const after = state.after;
  const children = parent.children;
  let length = children.length;
  let index = -1;

  while (++index < length) {
    const result = minify(children[index], {
      ...state,
      after: collapsableAfter(children, index, after),
      before
    });

    if (result.remove) {
      children.splice(index, 1);
      index--;
      length--;
    } else if (!result.ignore) {
      before = result.stripAtStart;
    }

    // If this element, such as a `<select>` or `<img>`, contributes content
    // somehow, allow whitespace again.
    if (content(children[index])) {
      before = false;
    }
  }

  return {ignore: false, stripAtStart: Boolean(before || after), remove: false}
}

/**
 * @param {Array<Nodes>} nodes
 *   Nodes.
 * @param {number} index
 *   Index.
 * @param {boolean | undefined} [after]
 *   Whether there is a break after `nodes` (default: `false`).
 * @returns {boolean | undefined}
 *   Whether there is a break after the node at `index`.
 */
function collapsableAfter(nodes, index, after) {
  while (++index < nodes.length) {
    const node = nodes[index];
    let result = inferBoundary(node);

    if (result === undefined && 'children' in node && !skippable(node)) {
      result = collapsableAfter(node.children, -1);
    }

    if (typeof result === 'boolean') {
      return result
    }
  }

  return after
}

/**
 * Infer two types of boundaries:
 *
 * 1. `true` — boundary for which whitespace around it does not contribute
 *    anything
 * 2. `false` — boundary for which whitespace around it *does* contribute
 *
 * No result (`undefined`) is returned if it is unknown.
 *
 * @param {Nodes} node
 *   Node.
 * @returns {boolean | undefined}
 *   Boundary.
 */
function inferBoundary(node) {
  if (node.type === 'element') {
    if (content(node)) {
      return false
    }

    if (blocklike(node)) {
      return true
    }

    // Unknown: either depends on siblings if embedded or metadata, or on
    // children.
  } else if (node.type === 'text') {
    if (!whitespace(node)) {
      return false
    }
  } else if (!ignorableNode(node)) {
    return false
  }
}

/**
 * Infer whether a node is skippable.
 *
 * @param {Nodes} node
 *   Node.
 * @returns {boolean}
 *   Whether `node` is skippable.
 */
function content(node) {
  return embedded(node) || isElement(node, content$1)
}

/**
 * See: <https://html.spec.whatwg.org/#the-css-user-agent-style-sheet-and-presentational-hints>
 *
 * @param {Nodes} node
 *   Node.
 * @returns {boolean}
 *   Whether `node` is block-like.
 */
function blocklike(node) {
  return isElement(node, blocks)
}

/**
 * @param {Parents} node
 *   Node.
 * @returns {boolean}
 *   Whether `node` is skippable.
 */
function skippable(node) {
  return (
    Boolean(node.type === 'element' && node.properties.hidden) ||
    ignorableNode(node) ||
    isElement(node, skippable$1)
  )
}

/**
 * @param {string} character
 *   Character.
 * @returns {boolean}
 *   Whether `character` is removable.
 */
function removable(character) {
  return character === ' ' || character === '\n'
}

/**
 * @type {Collapse}
 */
function replaceNewlines(value) {
  const match = /\r?\n|\r/.exec(value);
  return match ? match[0] : ' '
}

/**
 * @type {Collapse}
 */
function replaceWhitespace() {
  return ' '
}

/**
 * @param {Collapse} replace
 * @returns {Collapse}
 *   Collapse.
 */
function collapseFactory(replace) {
  return collapse

  /**
   * @type {Collapse}
   */
  function collapse(value) {
    return String(value).replace(/[\t\n\v\f\r ]+/g, replace)
  }
}

/**
 * We don’t need to support void elements here (so `nobr wbr` -> `normal` is
 * ignored).
 *
 * @param {Parents} node
 *   Node.
 * @param {State} state
 *   Info passed around.
 * @returns {Whitespace}
 *   Whitespace.
 */
function inferWhiteSpace(node, state) {
  if ('tagName' in node && node.properties) {
    switch (node.tagName) {
      // Whitespace in script/style, while not displayed by CSS as significant,
      // could have some meaning in JS/CSS, so we can’t touch them.
      case 'listing':
      case 'plaintext':
      case 'script':
      case 'style':
      case 'xmp': {
        return 'pre'
      }

      case 'nobr': {
        return 'nowrap'
      }

      case 'pre': {
        return node.properties.wrap ? 'pre-wrap' : 'pre'
      }

      case 'td':
      case 'th': {
        return node.properties.noWrap ? 'nowrap' : state.whitespace
      }

      case 'textarea': {
        return 'pre-wrap'
      }
    }
  }

  return state.whitespace
}

export { rehypeMinifyWhitespace as default };
