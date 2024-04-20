import { p as parse$2, s as stringify$1 } from './index-16411aa5.js';
import { visit, EXIT, SKIP } from 'https://jspm.dev/unist-util-visit@5.0.0';
import { t as toString } from './index-b88e09d5.js';
import { s as stringify, p as parse$3 } from './index-dd77df7e.js';
import { g as getDefaultExportFromCjs } from './index-a8426493.js';
import { w as whitespace$1 } from './index-68e080e8.js';
import 'https://jspm.dev/postcss@8.4.31';

/**
 * @typedef {import('./info.js').Info} Info
 * @typedef {Record<string, Info>} Properties
 * @typedef {Record<string, string>} Normal
 */

class Schema {
  /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */
  constructor(property, normal, space) {
    this.property = property;
    this.normal = normal;
    if (space) {
      this.space = space;
    }
  }
}

/** @type {Properties} */
Schema.prototype.property = {};
/** @type {Normal} */
Schema.prototype.normal = {};
/** @type {string|null} */
Schema.prototype.space = null;

/**
 * @typedef {import('./schema.js').Properties} Properties
 * @typedef {import('./schema.js').Normal} Normal
 */


/**
 * @param {Schema[]} definitions
 * @param {string} [space]
 * @returns {Schema}
 */
function merge(definitions, space) {
  /** @type {Properties} */
  const property = {};
  /** @type {Normal} */
  const normal = {};
  let index = -1;

  while (++index < definitions.length) {
    Object.assign(property, definitions[index].property);
    Object.assign(normal, definitions[index].normal);
  }

  return new Schema(property, normal, space)
}

/**
 * @param {string} value
 * @returns {string}
 */
function normalize(value) {
  return value.toLowerCase()
}

class Info {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(property, attribute) {
    /** @type {string} */
    this.property = property;
    /** @type {string} */
    this.attribute = attribute;
  }
}

/** @type {string|null} */
Info.prototype.space = null;
Info.prototype.boolean = false;
Info.prototype.booleanish = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.number = false;
Info.prototype.commaSeparated = false;
Info.prototype.spaceSeparated = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.mustUseProperty = false;
Info.prototype.defined = false;

let powers = 0;

const boolean = increment();
const booleanish = increment();
const overloadedBoolean = increment();
const number = increment();
const spaceSeparated = increment();
const commaSeparated = increment();
const commaOrSpaceSeparated = increment();

function increment() {
  return 2 ** ++powers
}

const types = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  boolean,
  booleanish,
  commaOrSpaceSeparated,
  commaSeparated,
  number,
  overloadedBoolean,
  spaceSeparated
}, Symbol.toStringTag, { value: 'Module' }));

/** @type {Array<keyof types>} */
// @ts-expect-error: hush.
const checks = Object.keys(types);

class DefinedInfo extends Info {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(property, attribute, mask, space) {
    let index = -1;

    super(property, attribute);

    mark(this, 'space', space);

    if (typeof mask === 'number') {
      while (++index < checks.length) {
        const check = checks[index];
        mark(this, checks[index], (mask & types[check]) === types[check]);
      }
    }
  }
}

DefinedInfo.prototype.defined = true;

/**
 * @param {DefinedInfo} values
 * @param {string} key
 * @param {unknown} value
 */
function mark(values, key, value) {
  if (value) {
    // @ts-expect-error: assume `value` matches the expected value of `key`.
    values[key] = value;
  }
}

/**
 * @typedef {import('./schema.js').Properties} Properties
 * @typedef {import('./schema.js').Normal} Normal
 *
 * @typedef {Record<string, string>} Attributes
 *
 * @typedef {Object} Definition
 * @property {Record<string, number|null>} properties
 * @property {(attributes: Attributes, property: string) => string} transform
 * @property {string} [space]
 * @property {Attributes} [attributes]
 * @property {Array<string>} [mustUseProperty]
 */


const own$2 = {}.hasOwnProperty;

/**
 * @param {Definition} definition
 * @returns {Schema}
 */
function create(definition) {
  /** @type {Properties} */
  const property = {};
  /** @type {Normal} */
  const normal = {};
  /** @type {string} */
  let prop;

  for (prop in definition.properties) {
    if (own$2.call(definition.properties, prop)) {
      const value = definition.properties[prop];
      const info = new DefinedInfo(
        prop,
        definition.transform(definition.attributes || {}, prop),
        value,
        definition.space
      );

      if (
        definition.mustUseProperty &&
        definition.mustUseProperty.includes(prop)
      ) {
        info.mustUseProperty = true;
      }

      property[prop] = info;

      normal[normalize(prop)] = prop;
      normal[normalize(info.attribute)] = prop;
    }
  }

  return new Schema(property, normal, definition.space)
}

const xlink = create({
  space: 'xlink',
  transform(_, prop) {
    return 'xlink:' + prop.slice(5).toLowerCase()
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});

const xml = create({
  space: 'xml',
  transform(_, prop) {
    return 'xml:' + prop.slice(3).toLowerCase()
  },
  properties: {xmlLang: null, xmlBase: null, xmlSpace: null}
});

/**
 * @param {Record<string, string>} attributes
 * @param {string} attribute
 * @returns {string}
 */
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute
}

/**
 * @param {Record<string, string>} attributes
 * @param {string} property
 * @returns {string}
 */
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase())
}

const xmlns = create({
  space: 'xmlns',
  attributes: {xmlnsxlink: 'xmlns:xlink'},
  transform: caseInsensitiveTransform,
  properties: {xmlns: null, xmlnsXLink: null}
});

const aria = create({
  transform(_, prop) {
    return prop === 'role' ? prop : 'aria-' + prop.slice(4).toLowerCase()
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  }
});

const html$1 = create({
  space: 'html',
  attributes: {
    acceptcharset: 'accept-charset',
    classname: 'class',
    htmlfor: 'for',
    httpequiv: 'http-equiv'
  },
  transform: caseInsensitiveTransform,
  mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    blocking: spaceSeparated,
    capture: boolean,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: boolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: boolean,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,

    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null, // Several. Use CSS `text-align` instead,
    aLink: null, // `<body>`. Use CSS `a:active {color}` instead
    archive: spaceSeparated, // `<object>`. List of URIs to archives
    axis: null, // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null, // `<body>`. Use CSS `background-image` instead
    bgColor: null, // `<body>` and table elements. Use CSS `background-color` instead
    border: number, // `<table>`. Use CSS `border-width` instead,
    borderColor: null, // `<table>`. Use CSS `border-color` instead,
    bottomMargin: number, // `<body>`
    cellPadding: null, // `<table>`
    cellSpacing: null, // `<table>`
    char: null, // Several table elements. When `align=char`, sets the character to align on
    charOff: null, // Several table elements. When `char`, offsets the alignment
    classId: null, // `<object>`
    clear: null, // `<br>`. Use CSS `clear` instead
    code: null, // `<object>`
    codeBase: null, // `<object>`
    codeType: null, // `<object>`
    color: null, // `<font>` and `<hr>`. Use CSS instead
    compact: boolean, // Lists. Use CSS to reduce space between items instead
    declare: boolean, // `<object>`
    event: null, // `<script>`
    face: null, // `<font>`. Use CSS instead
    frame: null, // `<table>`
    frameBorder: null, // `<iframe>`. Use CSS `border` instead
    hSpace: number, // `<img>` and `<object>`
    leftMargin: number, // `<body>`
    link: null, // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null, // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null, // `<img>`. Use a `<picture>`
    marginHeight: number, // `<body>`
    marginWidth: number, // `<body>`
    noResize: boolean, // `<frame>`
    noHref: boolean, // `<area>`. Use no href instead of an explicit `nohref`
    noShade: boolean, // `<hr>`. Use background-color and height instead of borders
    noWrap: boolean, // `<td>` and `<th>`
    object: null, // `<applet>`
    profile: null, // `<head>`
    prompt: null, // `<isindex>`
    rev: null, // `<link>`
    rightMargin: number, // `<body>`
    rules: null, // `<table>`
    scheme: null, // `<meta>`
    scrolling: booleanish, // `<frame>`. Use overflow in the child context
    standby: null, // `<object>`
    summary: null, // `<table>`
    text: null, // `<body>`. Use CSS `color` instead
    topMargin: number, // `<body>`
    valueType: null, // `<param>`
    version: null, // `<html>`. Use a doctype.
    vAlign: null, // Several. Use CSS `vertical-align` instead
    vLink: null, // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: number, // `<img>` and `<object>`

    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  }
});

const svg$1 = create({
  space: 'svg',
  attributes: {
    accentHeight: 'accent-height',
    alignmentBaseline: 'alignment-baseline',
    arabicForm: 'arabic-form',
    baselineShift: 'baseline-shift',
    capHeight: 'cap-height',
    className: 'class',
    clipPath: 'clip-path',
    clipRule: 'clip-rule',
    colorInterpolation: 'color-interpolation',
    colorInterpolationFilters: 'color-interpolation-filters',
    colorProfile: 'color-profile',
    colorRendering: 'color-rendering',
    crossOrigin: 'crossorigin',
    dataType: 'datatype',
    dominantBaseline: 'dominant-baseline',
    enableBackground: 'enable-background',
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    floodColor: 'flood-color',
    floodOpacity: 'flood-opacity',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    glyphName: 'glyph-name',
    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
    glyphOrientationVertical: 'glyph-orientation-vertical',
    hrefLang: 'hreflang',
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    horizOriginY: 'horiz-origin-y',
    imageRendering: 'image-rendering',
    letterSpacing: 'letter-spacing',
    lightingColor: 'lighting-color',
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    navDown: 'nav-down',
    navDownLeft: 'nav-down-left',
    navDownRight: 'nav-down-right',
    navLeft: 'nav-left',
    navNext: 'nav-next',
    navPrev: 'nav-prev',
    navRight: 'nav-right',
    navUp: 'nav-up',
    navUpLeft: 'nav-up-left',
    navUpRight: 'nav-up-right',
    onAbort: 'onabort',
    onActivate: 'onactivate',
    onAfterPrint: 'onafterprint',
    onBeforePrint: 'onbeforeprint',
    onBegin: 'onbegin',
    onCancel: 'oncancel',
    onCanPlay: 'oncanplay',
    onCanPlayThrough: 'oncanplaythrough',
    onChange: 'onchange',
    onClick: 'onclick',
    onClose: 'onclose',
    onCopy: 'oncopy',
    onCueChange: 'oncuechange',
    onCut: 'oncut',
    onDblClick: 'ondblclick',
    onDrag: 'ondrag',
    onDragEnd: 'ondragend',
    onDragEnter: 'ondragenter',
    onDragExit: 'ondragexit',
    onDragLeave: 'ondragleave',
    onDragOver: 'ondragover',
    onDragStart: 'ondragstart',
    onDrop: 'ondrop',
    onDurationChange: 'ondurationchange',
    onEmptied: 'onemptied',
    onEnd: 'onend',
    onEnded: 'onended',
    onError: 'onerror',
    onFocus: 'onfocus',
    onFocusIn: 'onfocusin',
    onFocusOut: 'onfocusout',
    onHashChange: 'onhashchange',
    onInput: 'oninput',
    onInvalid: 'oninvalid',
    onKeyDown: 'onkeydown',
    onKeyPress: 'onkeypress',
    onKeyUp: 'onkeyup',
    onLoad: 'onload',
    onLoadedData: 'onloadeddata',
    onLoadedMetadata: 'onloadedmetadata',
    onLoadStart: 'onloadstart',
    onMessage: 'onmessage',
    onMouseDown: 'onmousedown',
    onMouseEnter: 'onmouseenter',
    onMouseLeave: 'onmouseleave',
    onMouseMove: 'onmousemove',
    onMouseOut: 'onmouseout',
    onMouseOver: 'onmouseover',
    onMouseUp: 'onmouseup',
    onMouseWheel: 'onmousewheel',
    onOffline: 'onoffline',
    onOnline: 'ononline',
    onPageHide: 'onpagehide',
    onPageShow: 'onpageshow',
    onPaste: 'onpaste',
    onPause: 'onpause',
    onPlay: 'onplay',
    onPlaying: 'onplaying',
    onPopState: 'onpopstate',
    onProgress: 'onprogress',
    onRateChange: 'onratechange',
    onRepeat: 'onrepeat',
    onReset: 'onreset',
    onResize: 'onresize',
    onScroll: 'onscroll',
    onSeeked: 'onseeked',
    onSeeking: 'onseeking',
    onSelect: 'onselect',
    onShow: 'onshow',
    onStalled: 'onstalled',
    onStorage: 'onstorage',
    onSubmit: 'onsubmit',
    onSuspend: 'onsuspend',
    onTimeUpdate: 'ontimeupdate',
    onToggle: 'ontoggle',
    onUnload: 'onunload',
    onVolumeChange: 'onvolumechange',
    onWaiting: 'onwaiting',
    onZoom: 'onzoom',
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    paintOrder: 'paint-order',
    panose1: 'panose-1',
    pointerEvents: 'pointer-events',
    referrerPolicy: 'referrerpolicy',
    renderingIntent: 'rendering-intent',
    shapeRendering: 'shape-rendering',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    strokeDashArray: 'stroke-dasharray',
    strokeDashOffset: 'stroke-dashoffset',
    strokeLineCap: 'stroke-linecap',
    strokeLineJoin: 'stroke-linejoin',
    strokeMiterLimit: 'stroke-miterlimit',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    tabIndex: 'tabindex',
    textAnchor: 'text-anchor',
    textDecoration: 'text-decoration',
    textRendering: 'text-rendering',
    transformOrigin: 'transform-origin',
    typeOf: 'typeof',
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicodeBidi: 'unicode-bidi',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    vectorEffect: 'vector-effect',
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    wordSpacing: 'word-spacing',
    writingMode: 'writing-mode',
    xHeight: 'x-height',
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: 'playbackorder',
    timelineBegin: 'timelinebegin'
  },
  transform: caseSensitiveTransform,
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null, // SEMI_COLON_SEPARATED
    keySplines: null, // SEMI_COLON_SEPARATED
    keyTimes: null, // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});

/**
 * @typedef {import('./util/schema.js').Schema} Schema
 */


const valid = /^data[-\w.:]+$/i;
const dash = /-[a-z]/g;
const cap = /[A-Z]/g;

/**
 * @param {Schema} schema
 * @param {string} value
 * @returns {Info}
 */
function find(schema, value) {
  const normal = normalize(value);
  let prop = value;
  let Type = Info;

  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]]
  }

  if (normal.length > 4 && normal.slice(0, 4) === 'data' && valid.test(value)) {
    // Attribute or property.
    if (value.charAt(4) === '-') {
      // Turn it into a property.
      const rest = value.slice(5).replace(dash, camelcase);
      prop = 'data' + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      // Turn it into an attribute.
      const rest = value.slice(4);

      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);

        if (dashes.charAt(0) !== '-') {
          dashes = '-' + dashes;
        }

        value = 'data' + dashes;
      }
    }

    Type = DefinedInfo;
  }

  return new Type(prop, value)
}

/**
 * @param {string} $0
 * @returns {string}
 */
function kebab($0) {
  return '-' + $0.toLowerCase()
}

/**
 * @param {string} $0
 * @returns {string}
 */
function camelcase($0) {
  return $0.charAt(1).toUpperCase()
}

/**
 * @typedef {import('./lib/util/info.js').Info} Info
 * @typedef {import('./lib/util/schema.js').Schema} Schema
 */

const html = merge([xml, xlink, xmlns, aria, html$1], 'html');
const svg = merge([xml, xlink, xmlns, aria, svg$1], 'svg');

const emptyMulticharIndex = {};
const emptyRegularIndex = {};
function extendIndex(item, index) {
    let currentIndex = index;
    for (let pos = 0; pos < item.length; pos++) {
        const isLast = pos === item.length - 1;
        const char = item.charAt(pos);
        const charIndex = currentIndex[char] || (currentIndex[char] = { chars: {} });
        if (isLast) {
            charIndex.self = item;
        }
        currentIndex = charIndex.chars;
    }
}
function createMulticharIndex(items) {
    if (items.length === 0) {
        return emptyMulticharIndex;
    }
    const index = {};
    for (const item of items) {
        extendIndex(item, index);
    }
    return index;
}
function createRegularIndex(items) {
    if (items.length === 0) {
        return emptyRegularIndex;
    }
    const result = {};
    for (const item of items) {
        result[item] = true;
    }
    return result;
}

const emptyPseudoSignatures = {};
const defaultPseudoSignature = {
    type: 'String',
    optional: true
};
function calculatePseudoSignature(types) {
    const result = {
        type: 'NoArgument',
        optional: false
    };
    function setResultType(type) {
        if (result.type && result.type !== type && result.type !== 'NoArgument') {
            throw new Error(`Conflicting pseudo-class argument type: "${result.type}" vs "${type}".`);
        }
        result.type = type;
    }
    for (const type of types) {
        if (type === 'NoArgument') {
            result.optional = true;
        }
        if (type === 'Formula') {
            setResultType('Formula');
        }
        if (type === 'FormulaOfSelector') {
            setResultType('Formula');
            result.ofSelector = true;
        }
        if (type === 'String') {
            setResultType('String');
        }
        if (type === 'Selector') {
            setResultType('Selector');
        }
    }
    return result;
}
function inverseCategories(obj) {
    const result = {};
    for (const category of Object.keys(obj)) {
        const items = obj[category];
        if (items) {
            for (const item of items) {
                (result[item] || (result[item] = [])).push(category);
            }
        }
    }
    return result;
}
function calculatePseudoSignatures(definitions) {
    const pseudoClassesToArgumentTypes = inverseCategories(definitions);
    const result = {};
    for (const pseudoClass of Object.keys(pseudoClassesToArgumentTypes)) {
        const argumentTypes = pseudoClassesToArgumentTypes[pseudoClass];
        if (argumentTypes) {
            result[pseudoClass] = calculatePseudoSignature(argumentTypes);
        }
    }
    return result;
}

const emptyXmlOptions = {};
const defaultXmlOptions = { wildcard: true };
function getXmlOptions(param) {
    if (param) {
        if (typeof param === 'boolean') {
            return defaultXmlOptions;
        }
        else {
            return param;
        }
    }
    else {
        return emptyXmlOptions;
    }
}
function withMigration(migration, merge) {
    return (base, extension) => merge(migration(base), migration(extension));
}
function withNoNegative(merge) {
    return (base, extension) => {
        const result = merge(base, extension);
        if (!result) {
            throw new Error(`Syntax definition cannot be null or undefined.`);
        }
        return result;
    };
}
function withPositive(positive, merge) {
    return (base, extension) => {
        if (extension === true) {
            return positive;
        }
        return merge(base === true ? positive : base, extension);
    };
}
function mergeSection(values) {
    return (base, extension) => {
        if (!extension || !base) {
            return extension;
        }
        if (typeof extension !== 'object' || extension === null) {
            throw new Error(`Unexpected syntax definition extension type: ${extension}.`);
        }
        const result = { ...base };
        for (const [key, value] of Object.entries(extension)) {
            const mergeSchema = values[key];
            result[key] = mergeSchema(base[key], value);
        }
        return result;
    };
}
function replaceValueIfSpecified(base, extension) {
    if (extension !== undefined) {
        return extension;
    }
    return base;
}
function concatArray(base, extension) {
    if (!extension) {
        return base;
    }
    if (!base) {
        return extension;
    }
    return base.concat(extension);
}
function mergeDefinitions(base, extension) {
    if (!extension) {
        return base;
    }
    if (!base) {
        return extension;
    }
    const result = { ...base };
    for (const [key, value] of Object.entries(extension)) {
        if (!value) {
            delete result[key];
            continue;
        }
        const baseValue = base[key];
        if (!baseValue) {
            result[key] = value;
            continue;
        }
        result[key] = baseValue.concat(value);
    }
    return result;
}
const extendSyntaxDefinition = withNoNegative(mergeSection({
    baseSyntax: replaceValueIfSpecified,
    tag: withPositive(defaultXmlOptions, mergeSection({
        wildcard: replaceValueIfSpecified
    })),
    ids: replaceValueIfSpecified,
    classNames: replaceValueIfSpecified,
    namespace: withPositive(defaultXmlOptions, mergeSection({
        wildcard: replaceValueIfSpecified
    })),
    combinators: concatArray,
    attributes: mergeSection({
        operators: concatArray,
        caseSensitivityModifiers: concatArray,
        unknownCaseSensitivityModifiers: replaceValueIfSpecified
    }),
    pseudoClasses: mergeSection({
        unknown: replaceValueIfSpecified,
        definitions: mergeDefinitions
    }),
    pseudoElements: mergeSection({
        unknown: replaceValueIfSpecified,
        notation: replaceValueIfSpecified,
        definitions: withMigration((definitions) => (Array.isArray(definitions) ? { NoArgument: definitions } : definitions), mergeDefinitions)
    })
}));
const css1SyntaxDefinition = {
    tag: {},
    ids: true,
    classNames: true,
    combinators: [],
    pseudoElements: {
        unknown: 'reject',
        notation: 'singleColon',
        definitions: ['first-letter', 'first-line']
    },
    pseudoClasses: {
        unknown: 'reject',
        definitions: {
            NoArgument: ['link', 'visited', 'active']
        }
    }
};
const css2SyntaxDefinition = extendSyntaxDefinition(css1SyntaxDefinition, {
    tag: { wildcard: true },
    combinators: ['>', '+'],
    attributes: {
        unknownCaseSensitivityModifiers: 'reject',
        operators: ['=', '~=', '|=']
    },
    pseudoElements: {
        definitions: ['before', 'after']
    },
    pseudoClasses: {
        unknown: 'reject',
        definitions: {
            NoArgument: ['hover', 'focus', 'first-child'],
            String: ['lang']
        }
    }
});
const selectors3SyntaxDefinition = extendSyntaxDefinition(css2SyntaxDefinition, {
    namespace: {
        wildcard: true
    },
    combinators: ['~'],
    attributes: {
        operators: ['^=', '$=', '*=']
    },
    pseudoElements: {
        notation: 'both'
    },
    pseudoClasses: {
        definitions: {
            NoArgument: [
                'root',
                'last-child',
                'first-of-type',
                'last-of-type',
                'only-child',
                'only-of-type',
                'empty',
                'target',
                'enabled',
                'disabled',
                'checked',
                'indeterminate'
            ],
            Formula: ['nth-child', 'nth-last-child', 'nth-of-type', 'nth-last-of-type'],
            Selector: ['not']
        }
    }
});
const selectors4SyntaxDefinition = extendSyntaxDefinition(selectors3SyntaxDefinition, {
    combinators: ['||'],
    attributes: {
        caseSensitivityModifiers: ['i', 'I', 's', 'S']
    },
    pseudoClasses: {
        definitions: {
            NoArgument: [
                'any-link',
                'local-link',
                'target-within',
                'scope',
                'current',
                'past',
                'future',
                'focus-within',
                'focus-visible',
                'read-write',
                'read-only',
                'placeholder-shown',
                'default',
                'valid',
                'invalid',
                'in-range',
                'out-of-range',
                'required',
                'optional',
                'blank',
                'user-invalid'
            ],
            Formula: ['nth-col', 'nth-last-col'],
            String: ['dir'],
            FormulaOfSelector: ['nth-child', 'nth-last-child'],
            Selector: ['current', 'is', 'where', 'has']
        }
    }
});
const progressiveSyntaxDefinition = extendSyntaxDefinition(selectors4SyntaxDefinition, {
    pseudoElements: {
        unknown: 'accept'
    },
    pseudoClasses: {
        unknown: 'accept'
    },
    attributes: {
        unknownCaseSensitivityModifiers: 'accept'
    }
});
const cssSyntaxDefinitions = {
    css1: css1SyntaxDefinition,
    css2: css2SyntaxDefinition,
    css3: selectors3SyntaxDefinition,
    'selectors-3': selectors3SyntaxDefinition,
    'selectors-4': selectors4SyntaxDefinition,
    latest: selectors4SyntaxDefinition,
    progressive: progressiveSyntaxDefinition
};

function isIdentStart(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '-' || c === '_' || c === '\\';
}
function isIdent(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c === '-' || c === '_';
}
function isHex(c) {
    return (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F') || (c >= '0' && c <= '9');
}
const stringEscapeChars = {
    n: '\n',
    r: '\r',
    t: '\t',
    f: '\f',
    '\\': '\\'
};
const whitespaceChars = {
    ' ': true,
    '\t': true,
    '\n': true,
    '\r': true,
    '\f': true
};
const quoteChars = {
    '"': true,
    "'": true
};
const digitsChars = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true
};

const errorPrefix = `css-selector-parser parse error: `;
/**
 * Creates a parse function to be used later to parse CSS selectors.
 */
function createParser(options = {}) {
    const { syntax = 'latest', substitutes, strict = true } = options;
    let syntaxDefinition = typeof syntax === 'object' ? syntax : cssSyntaxDefinitions[syntax];
    if (syntaxDefinition.baseSyntax) {
        syntaxDefinition = extendSyntaxDefinition(cssSyntaxDefinitions[syntaxDefinition.baseSyntax], syntaxDefinition);
    }
    const [tagNameEnabled, tagNameWildcardEnabled] = syntaxDefinition.tag
        ? [true, Boolean(getXmlOptions(syntaxDefinition.tag).wildcard)]
        : [false, false];
    const idEnabled = Boolean(syntaxDefinition.ids);
    const classNamesEnabled = Boolean(syntaxDefinition.classNames);
    const namespaceEnabled = Boolean(syntaxDefinition.namespace);
    const namespaceWildcardEnabled = syntaxDefinition.namespace &&
        (syntaxDefinition.namespace === true || syntaxDefinition.namespace.wildcard === true);
    if (namespaceEnabled && !tagNameEnabled) {
        throw new Error(`${errorPrefix}Namespaces cannot be enabled while tags are disabled.`);
    }
    const substitutesEnabled = Boolean(substitutes);
    const combinatorsIndex = syntaxDefinition.combinators
        ? createMulticharIndex(syntaxDefinition.combinators)
        : emptyMulticharIndex;
    const [attributesEnabled, attributesOperatorsIndex, attributesCaseSensitivityModifiers, attributesAcceptUnknownCaseSensitivityModifiers] = syntaxDefinition.attributes
        ? [
            true,
            syntaxDefinition.attributes.operators
                ? createMulticharIndex(syntaxDefinition.attributes.operators)
                : emptyMulticharIndex,
            syntaxDefinition.attributes.caseSensitivityModifiers
                ? createRegularIndex(syntaxDefinition.attributes.caseSensitivityModifiers)
                : emptyRegularIndex,
            syntaxDefinition.attributes.unknownCaseSensitivityModifiers === 'accept'
        ]
        : [false, emptyMulticharIndex, emptyRegularIndex, false];
    const attributesCaseSensitivityModifiersEnabled = attributesAcceptUnknownCaseSensitivityModifiers || Object.keys(attributesCaseSensitivityModifiers).length > 0;
    const [pseudoClassesEnabled, pseudoClassesDefinitions, pseudoClassesAcceptUnknown] = syntaxDefinition.pseudoClasses
        ? [
            true,
            syntaxDefinition.pseudoClasses.definitions
                ? calculatePseudoSignatures(syntaxDefinition.pseudoClasses.definitions)
                : emptyPseudoSignatures,
            syntaxDefinition.pseudoClasses.unknown === 'accept'
        ]
        : [false, emptyPseudoSignatures, false];
    const [pseudoElementsEnabled, pseudoElementsSingleColonNotationEnabled, pseudoElementsDoubleColonNotationEnabled, pseudoElementsDefinitions, pseudoElementsAcceptUnknown] = syntaxDefinition.pseudoElements
        ? [
            true,
            syntaxDefinition.pseudoElements.notation === 'singleColon' ||
                syntaxDefinition.pseudoElements.notation === 'both',
            !syntaxDefinition.pseudoElements.notation ||
                syntaxDefinition.pseudoElements.notation === 'doubleColon' ||
                syntaxDefinition.pseudoElements.notation === 'both',
            syntaxDefinition.pseudoElements.definitions
                ? calculatePseudoSignatures(Array.isArray(syntaxDefinition.pseudoElements.definitions)
                    ? { NoArgument: syntaxDefinition.pseudoElements.definitions }
                    : syntaxDefinition.pseudoElements.definitions)
                : emptyPseudoSignatures,
            syntaxDefinition.pseudoElements.unknown === 'accept'
        ]
        : [false, false, false, emptyPseudoSignatures, false];
    let str = '';
    let l = str.length;
    let pos = 0;
    let chr = '';
    const is = (comparison) => chr === comparison;
    const isTagStart = () => is('*') || isIdentStart(chr);
    const rewind = (newPos) => {
        pos = newPos;
        chr = str.charAt(pos);
    };
    const next = () => {
        pos++;
        chr = str.charAt(pos);
    };
    const readAndNext = () => {
        const current = chr;
        pos++;
        chr = str.charAt(pos);
        return current;
    };
    /** @throws ParserError */
    function fail(errorMessage) {
        const position = Math.min(l - 1, pos);
        const error = new Error(`${errorPrefix}${errorMessage} Pos: ${position}.`);
        error.position = position;
        error.name = 'ParserError';
        throw error;
    }
    function assert(condition, errorMessage) {
        if (!condition) {
            return fail(errorMessage);
        }
    }
    const assertNonEof = () => {
        assert(pos < l, 'Unexpected end of input.');
    };
    const isEof = () => pos >= l;
    const pass = (character) => {
        assert(pos < l, `Expected "${character}" but end of input reached.`);
        assert(chr === character, `Expected "${character}" but "${chr}" found.`);
        pos++;
        chr = str.charAt(pos);
    };
    function matchMulticharIndex(index) {
        const match = matchMulticharIndexPos(index, pos);
        if (match) {
            pos += match.length;
            chr = str.charAt(pos);
            return match;
        }
    }
    function matchMulticharIndexPos(index, subPos) {
        const char = str.charAt(subPos);
        const charIndex = index[char];
        if (charIndex) {
            const subMatch = matchMulticharIndexPos(charIndex.chars, subPos + 1);
            if (subMatch) {
                return subMatch;
            }
            if (charIndex.self) {
                return charIndex.self;
            }
        }
    }
    function parseHex() {
        let hex = readAndNext();
        while (isHex(chr)) {
            hex += readAndNext();
        }
        if (is(' ')) {
            next();
        }
        return String.fromCharCode(parseInt(hex, 16));
    }
    function parseString(quote) {
        let result = '';
        pass(quote);
        while (pos < l) {
            if (is(quote)) {
                next();
                return result;
            }
            else if (is('\\')) {
                next();
                let esc;
                if (is(quote)) {
                    result += quote;
                }
                else if ((esc = stringEscapeChars[chr]) !== undefined) {
                    result += esc;
                }
                else if (isHex(chr)) {
                    result += parseHex();
                    continue;
                }
                else {
                    result += chr;
                }
            }
            else {
                result += chr;
            }
            next();
        }
        return result;
    }
    function parseIdentifier() {
        let result = '';
        while (pos < l) {
            if (isIdent(chr)) {
                result += readAndNext();
            }
            else if (is('\\')) {
                next();
                assertNonEof();
                if (isHex(chr)) {
                    result += parseHex();
                }
                else {
                    result += readAndNext();
                }
            }
            else {
                return result;
            }
        }
        return result;
    }
    function parsePseudoClassString() {
        let result = '';
        while (pos < l) {
            if (is(')')) {
                break;
            }
            else if (is('\\')) {
                next();
                if (isEof() && !strict) {
                    return (result + '\\').trim();
                }
                assertNonEof();
                if (isHex(chr)) {
                    result += parseHex();
                }
                else {
                    result += readAndNext();
                }
            }
            else {
                result += readAndNext();
            }
        }
        return result.trim();
    }
    function skipWhitespace() {
        while (whitespaceChars[chr]) {
            next();
        }
    }
    function parseSelector(relative = false) {
        skipWhitespace();
        const rules = [parseRule(relative)];
        while (is(',')) {
            next();
            skipWhitespace();
            rules.push(parseRule(relative));
        }
        return {
            type: 'Selector',
            rules
        };
    }
    function parseAttribute() {
        pass('[');
        skipWhitespace();
        let attr;
        if (is('|')) {
            assert(namespaceEnabled, 'Namespaces are not enabled.');
            next();
            attr = {
                type: 'Attribute',
                name: parseIdentifier(),
                namespace: { type: 'NoNamespace' }
            };
        }
        else if (is('*')) {
            assert(namespaceEnabled, 'Namespaces are not enabled.');
            assert(namespaceWildcardEnabled, 'Wildcard namespace is not enabled.');
            next();
            pass('|');
            attr = {
                type: 'Attribute',
                name: parseIdentifier(),
                namespace: { type: 'WildcardNamespace' }
            };
        }
        else {
            const identifier = parseIdentifier();
            attr = {
                type: 'Attribute',
                name: identifier
            };
            if (is('|')) {
                const savedPos = pos;
                next();
                if (isIdentStart(chr)) {
                    assert(namespaceEnabled, 'Namespaces are not enabled.');
                    attr = {
                        type: 'Attribute',
                        name: parseIdentifier(),
                        namespace: { type: 'NamespaceName', name: identifier }
                    };
                }
                else {
                    rewind(savedPos);
                }
            }
        }
        assert(attr.name, 'Expected attribute name.');
        skipWhitespace();
        if (isEof() && !strict) {
            return attr;
        }
        if (is(']')) {
            next();
        }
        else {
            attr.operator = matchMulticharIndex(attributesOperatorsIndex);
            assert(attr.operator, 'Expected a valid attribute selector operator.');
            skipWhitespace();
            assertNonEof();
            if (quoteChars[chr]) {
                attr.value = {
                    type: 'String',
                    value: parseString(chr)
                };
            }
            else if (substitutesEnabled && is('$')) {
                next();
                attr.value = {
                    type: 'Substitution',
                    name: parseIdentifier()
                };
                assert(attr.value.name, 'Expected substitute name.');
            }
            else {
                attr.value = {
                    type: 'String',
                    value: parseIdentifier()
                };
                assert(attr.value.value, 'Expected attribute value.');
            }
            skipWhitespace();
            if (isEof() && !strict) {
                return attr;
            }
            if (!is(']')) {
                attr.caseSensitivityModifier = parseIdentifier();
                assert(attr.caseSensitivityModifier, 'Expected end of attribute selector.');
                assert(attributesCaseSensitivityModifiersEnabled, 'Attribute case sensitivity modifiers are not enabled.');
                assert(attributesAcceptUnknownCaseSensitivityModifiers ||
                    attributesCaseSensitivityModifiers[attr.caseSensitivityModifier], 'Unknown attribute case sensitivity modifier.');
                skipWhitespace();
                if (isEof() && !strict) {
                    return attr;
                }
            }
            pass(']');
        }
        return attr;
    }
    function parseNumber() {
        let result = '';
        while (digitsChars[chr]) {
            result += readAndNext();
        }
        assert(result !== '', 'Formula parse error.');
        return parseInt(result);
    }
    const isNumberStart = () => is('-') || is('+') || digitsChars[chr];
    function parseFormula() {
        if (is('e') || is('o')) {
            const ident = parseIdentifier();
            if (ident === 'even') {
                skipWhitespace();
                return [2, 0];
            }
            if (ident === 'odd') {
                skipWhitespace();
                return [2, 1];
            }
        }
        let firstNumber = null;
        let firstNumberMultiplier = 1;
        if (is('-')) {
            next();
            firstNumberMultiplier = -1;
        }
        if (isNumberStart()) {
            if (is('+')) {
                next();
            }
            firstNumber = parseNumber();
            if (!is('\\') && !is('n')) {
                return [0, firstNumber * firstNumberMultiplier];
            }
        }
        if (firstNumber === null) {
            firstNumber = 1;
        }
        firstNumber *= firstNumberMultiplier;
        let identifier;
        if (is('\\')) {
            next();
            if (isHex(chr)) {
                identifier = parseHex();
            }
            else {
                identifier = readAndNext();
            }
        }
        else {
            identifier = readAndNext();
        }
        assert(identifier === 'n', 'Formula parse error: expected "n".');
        skipWhitespace();
        if (is('+') || is('-')) {
            const sign = is('+') ? 1 : -1;
            next();
            skipWhitespace();
            return [firstNumber, sign * parseNumber()];
        }
        else {
            return [firstNumber, 0];
        }
    }
    function parsePseudoArgument(pseudoName, type, signature) {
        let argument;
        if (is('(')) {
            next();
            skipWhitespace();
            if (substitutesEnabled && is('$')) {
                next();
                argument = {
                    type: 'Substitution',
                    name: parseIdentifier()
                };
                assert(argument.name, 'Expected substitute name.');
            }
            else if (signature.type === 'String') {
                argument = {
                    type: 'String',
                    value: parsePseudoClassString()
                };
                assert(argument.value, `Expected ${type} argument value.`);
            }
            else if (signature.type === 'Selector') {
                argument = parseSelector(true);
            }
            else if (signature.type === 'Formula') {
                const [a, b] = parseFormula();
                argument = {
                    type: 'Formula',
                    a,
                    b
                };
                if (signature.ofSelector) {
                    skipWhitespace();
                    if (is('o') || is('\\')) {
                        const ident = parseIdentifier();
                        assert(ident === 'of', 'Formula of selector parse error.');
                        skipWhitespace();
                        argument = {
                            type: 'FormulaOfSelector',
                            a,
                            b,
                            selector: parseRule()
                        };
                    }
                }
            }
            else {
                return fail(`Invalid ${type} signature.`);
            }
            skipWhitespace();
            if (isEof() && !strict) {
                return argument;
            }
            pass(')');
        }
        else {
            assert(signature.optional, `Argument is required for ${type} "${pseudoName}".`);
        }
        return argument;
    }
    function parseTagName() {
        if (is('*')) {
            assert(tagNameWildcardEnabled, 'Wildcard tag name is not enabled.');
            next();
            return { type: 'WildcardTag' };
        }
        else if (isIdentStart(chr)) {
            assert(tagNameEnabled, 'Tag names are not enabled.');
            return {
                type: 'TagName',
                name: parseIdentifier()
            };
        }
        else {
            return fail('Expected tag name.');
        }
    }
    function parseTagNameWithNamespace() {
        if (is('*')) {
            const savedPos = pos;
            next();
            if (!is('|')) {
                rewind(savedPos);
                return parseTagName();
            }
            next();
            if (!isTagStart()) {
                rewind(savedPos);
                return parseTagName();
            }
            assert(namespaceEnabled, 'Namespaces are not enabled.');
            assert(namespaceWildcardEnabled, 'Wildcard namespace is not enabled.');
            const tagName = parseTagName();
            tagName.namespace = { type: 'WildcardNamespace' };
            return tagName;
        }
        else if (is('|')) {
            assert(namespaceEnabled, 'Namespaces are not enabled.');
            next();
            const tagName = parseTagName();
            tagName.namespace = { type: 'NoNamespace' };
            return tagName;
        }
        else if (isIdentStart(chr)) {
            const identifier = parseIdentifier();
            if (!is('|')) {
                assert(tagNameEnabled, 'Tag names are not enabled.');
                return {
                    type: 'TagName',
                    name: identifier
                };
            }
            const savedPos = pos;
            next();
            if (!isTagStart()) {
                rewind(savedPos);
                return {
                    type: 'TagName',
                    name: identifier
                };
            }
            assert(namespaceEnabled, 'Namespaces are not enabled.');
            const tagName = parseTagName();
            tagName.namespace = { type: 'NamespaceName', name: identifier };
            return tagName;
        }
        else {
            return fail('Expected tag name.');
        }
    }
    function parseRule(relative = false) {
        const rule = { type: 'Rule', items: [] };
        if (relative) {
            const combinator = matchMulticharIndex(combinatorsIndex);
            if (combinator) {
                rule.combinator = combinator;
                skipWhitespace();
            }
        }
        while (pos < l) {
            if (isTagStart()) {
                assert(rule.items.length === 0, 'Unexpected tag/namespace start.');
                rule.items.push(parseTagNameWithNamespace());
            }
            else if (is('|')) {
                const savedPos = pos;
                next();
                if (isTagStart()) {
                    assert(rule.items.length === 0, 'Unexpected tag/namespace start.');
                    rewind(savedPos);
                    rule.items.push(parseTagNameWithNamespace());
                }
                else {
                    rewind(savedPos);
                    break;
                }
            }
            else if (is('.')) {
                assert(classNamesEnabled, 'Class names are not enabled.');
                next();
                const className = parseIdentifier();
                assert(className, 'Expected class name.');
                rule.items.push({ type: 'ClassName', name: className });
            }
            else if (is('#')) {
                assert(idEnabled, 'IDs are not enabled.');
                next();
                const idName = parseIdentifier();
                assert(idName, 'Expected ID name.');
                rule.items.push({ type: 'Id', name: idName });
            }
            else if (is('[')) {
                assert(attributesEnabled, 'Attributes are not enabled.');
                rule.items.push(parseAttribute());
            }
            else if (is(':')) {
                let isDoubleColon = false;
                let isPseudoElement = false;
                next();
                if (is(':')) {
                    assert(pseudoElementsEnabled, 'Pseudo elements are not enabled.');
                    assert(pseudoElementsDoubleColonNotationEnabled, 'Pseudo elements double colon notation is not enabled.');
                    isDoubleColon = true;
                    next();
                }
                const pseudoName = parseIdentifier();
                assert(isDoubleColon || pseudoName, 'Expected pseudo-class name.');
                assert(!isDoubleColon || pseudoName, 'Expected pseudo-element name.');
                assert(!isDoubleColon ||
                    pseudoElementsAcceptUnknown ||
                    Object.prototype.hasOwnProperty.call(pseudoElementsDefinitions, pseudoName), `Unknown pseudo-element "${pseudoName}".`);
                isPseudoElement =
                    pseudoElementsEnabled &&
                        (isDoubleColon ||
                            (!isDoubleColon &&
                                pseudoElementsSingleColonNotationEnabled &&
                                Object.prototype.hasOwnProperty.call(pseudoElementsDefinitions, pseudoName)));
                if (isPseudoElement) {
                    const signature = pseudoElementsDefinitions[pseudoName] ??
                        (pseudoElementsAcceptUnknown && defaultPseudoSignature);
                    const pseudoElement = {
                        type: 'PseudoElement',
                        name: pseudoName
                    };
                    const argument = parsePseudoArgument(pseudoName, 'pseudo-element', signature);
                    if (argument) {
                        assert(argument.type !== 'Formula' && argument.type !== 'FormulaOfSelector', 'Pseudo-elements cannot have formula argument.');
                        pseudoElement.argument = argument;
                    }
                    rule.items.push(pseudoElement);
                }
                else {
                    assert(pseudoClassesEnabled, 'Pseudo-classes are not enabled.');
                    const signature = pseudoClassesDefinitions[pseudoName] ?? (pseudoClassesAcceptUnknown && defaultPseudoSignature);
                    assert(signature, `Unknown pseudo-class: "${pseudoName}".`);
                    const argument = parsePseudoArgument(pseudoName, 'pseudo-class', signature);
                    const pseudoClass = {
                        type: 'PseudoClass',
                        name: pseudoName
                    };
                    if (argument) {
                        pseudoClass.argument = argument;
                    }
                    rule.items.push(pseudoClass);
                }
            }
            else {
                break;
            }
        }
        if (rule.items.length === 0) {
            if (isEof()) {
                return fail('Expected rule but end of input reached.');
            }
            else {
                return fail(`Expected rule but "${chr}" found.`);
            }
        }
        skipWhitespace();
        if (!isEof() && !is(',') && !is(')')) {
            const combinator = matchMulticharIndex(combinatorsIndex);
            skipWhitespace();
            rule.nestedRule = parseRule();
            rule.nestedRule.combinator = combinator;
        }
        return rule;
    }
    return (input) => {
        // noinspection SuspiciousTypeOfGuard
        if (typeof input !== 'string') {
            throw new Error(`${errorPrefix}Expected string input.`);
        }
        str = input;
        l = str.length;
        pos = 0;
        chr = str.charAt(0);
        return parseSelector();
    };
}

/**
 * @typedef {import('css-selector-parser').AstSelector} AstSelector
 */


const cssSelectorParse = createParser({syntax: 'selectors-4'});

/**
 * @param {string} selector
 *   Selector to parse.
 * @returns {AstSelector}
 *   Parsed selector.
 */
function parse$1(selector) {
  if (typeof selector !== 'string') {
    throw new TypeError('Expected `string` as selector, not `' + selector + '`')
  }

  return cssSelectorParse(selector)
}

const rtlRange = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
const ltrRange =
  'A-Za-z\u00C0-\u00D6\u00D8-\u00F6' +
  '\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C' +
  '\uFE00-\uFE6F\uFEFD-\uFFFF';

/* eslint-disable no-misleading-character-class */
const rtl = new RegExp('^[^' + ltrRange + ']*[' + rtlRange + ']');
const ltr = new RegExp('^[^' + rtlRange + ']*[' + ltrRange + ']');
/* eslint-enable no-misleading-character-class */

/**
 * Detect the direction of text: left-to-right, right-to-left, or neutral
 *
 * @param {string} value
 * @returns {'rtl'|'ltr'|'neutral'}
 */
function direction(value) {
  const source = String(value || '');
  return rtl.test(source) ? 'rtl' : ltr.test(source) ? 'ltr' : 'neutral'
}

/**
 * @typedef {import('hast').ElementContent} ElementContent
 * @typedef {import('hast').Nodes} Nodes
 *
 * @typedef {import('unist-util-visit').Visitor<ElementContent>} Visitor
 *
 * @typedef {import('./index.js').Direction} Direction
 * @typedef {import('./index.js').State} State
 */


/**
 * Enter a node.
 *
 * The caller is responsible for calling the return value `exit`.
 *
 * @param {State} state
 *   Current state.
 *
 *   Will be mutated: `exit` undos the changes.
 * @param {Nodes} node
 *   Node to enter.
 * @returns {() => undefined}
 *   Call to exit.
 */
// eslint-disable-next-line complexity
function enterState(state, node) {
  const schema = state.schema;
  const language = state.language;
  const currentDirection = state.direction;
  const editableOrEditingHost = state.editableOrEditingHost;
  /** @type {Direction | undefined} */
  let dirInferred;

  if (node.type === 'element') {
    const lang = node.properties.xmlLang || node.properties.lang;
    const type = node.properties.type || 'text';
    const dir = dirProperty(node);

    if (lang !== null && lang !== undefined) {
      state.language = String(lang);
    }

    if (schema && schema.space === 'html') {
      if (node.properties.contentEditable === 'true') {
        state.editableOrEditingHost = true;
      }

      if (node.tagName === 'svg') {
        state.schema = svg;
      }

      // See: <https://html.spec.whatwg.org/#the-directionality>.
      // Explicit `[dir=rtl]`.
      if (dir === 'rtl') {
        dirInferred = dir;
      } else if (
        // Explicit `[dir=ltr]`.
        dir === 'ltr' ||
        // HTML with an invalid or no `[dir]`.
        (dir !== 'auto' && node.tagName === 'html') ||
        // `input[type=tel]` with an invalid or no `[dir]`.
        (dir !== 'auto' && node.tagName === 'input' && type === 'tel')
      ) {
        dirInferred = 'ltr';
        // `[dir=auto]` or `bdi` with an invalid or no `[dir]`.
      } else if (dir === 'auto' || node.tagName === 'bdi') {
        if (node.tagName === 'textarea') {
          // Check contents of `<textarea>`.
          dirInferred = dirBidi(toString(node));
        } else if (
          node.tagName === 'input' &&
          (type === 'email' ||
            type === 'search' ||
            type === 'tel' ||
            type === 'text')
        ) {
          // Check value of `<input>`.
          dirInferred = node.properties.value
            ? dirBidi(String(node.properties.value))
            : 'ltr';
        } else {
          // Check text nodes in `node`.
          visit(node, inferDirectionality);
        }
      }

      if (dirInferred) {
        state.direction = dirInferred;
      }
    }
    // Turn off editing mode in non-HTML spaces.
    else if (state.editableOrEditingHost) {
      state.editableOrEditingHost = false;
    }
  }

  return reset

  /**
   * @returns {undefined}
   *   Nothing.
   */
  function reset() {
    state.schema = schema;
    state.language = language;
    state.direction = currentDirection;
    state.editableOrEditingHost = editableOrEditingHost;
  }

  /** @type {Visitor} */
  function inferDirectionality(child) {
    if (child.type === 'text') {
      dirInferred = dirBidi(child.value);
      return dirInferred ? EXIT : undefined
    }

    if (
      child !== node &&
      child.type === 'element' &&
      (child.tagName === 'bdi' ||
        child.tagName === 'script' ||
        child.tagName === 'style' ||
        child.tagName === 'textare' ||
        dirProperty(child))
    ) {
      return SKIP
    }
  }
}

/**
 * See `wooorm/direction`.
 *
 * @param {string} value
 *   Value to check.
 * @returns {Exclude<Direction, 'auto'> | undefined}
 *   Directionality.
 */
function dirBidi(value) {
  const result = direction(value);
  return result === 'neutral' ? undefined : result
}

/**
 * @param {ElementContent} node
 *   Node to check.
 * @returns {Direction | undefined}
 *   Directionality.
 */
function dirProperty(node) {
  const value =
    node.type === 'element' && typeof node.properties.dir === 'string'
      ? node.properties.dir.toLowerCase()
      : undefined;

  return value === 'auto' || value === 'ltr' || value === 'rtl'
    ? value
    : undefined
}

function ok() {}

/**
 * @typedef {import('css-selector-parser').AstAttribute} AstAttribute
 *
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Properties} Properties
 *
 * @typedef {import('property-information').Info} Info
 * @typedef {import('property-information').Schema} Schema
 */


/**
 * @param {AstAttribute} query
 *   Query.
 * @param {Element} element
 *   Element.
 * @param {Schema} schema
 *   Schema of element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function attribute(query, element, schema) {
  const info = find(schema, query.name);
  const propertyValue = element.properties[info.property];
  let value = normalizeValue(propertyValue, info);

  // Exists.
  if (!query.value) {
    return value !== undefined
  }

  ok(query.value.type === 'String');
  let key = query.value.value;

  // Case-sensitivity.
  if (query.caseSensitivityModifier === 'i') {
    key = key.toLowerCase();

    if (value) {
      value = value.toLowerCase();
    }
  }

  if (value !== undefined) {
    switch (query.operator) {
      // Exact.
      case '=': {
        return key === value
      }

      // Ends.
      case '$=': {
        return key === value.slice(-key.length)
      }

      // Contains.
      case '*=': {
        return value.includes(key)
      }

      // Begins.
      case '^=': {
        return key === value.slice(0, key.length)
      }

      // Exact or prefix.
      case '|=': {
        return (
          key === value ||
          (key === value.slice(0, key.length) &&
            value.charAt(key.length) === '-')
        )
      }

      // Space-separated list.
      case '~=': {
        return (
          // For all other values (including comma-separated lists), return whether this
          // is an exact match.
          key === value ||
          // If this is a space-separated list, and the query is contained in it, return
          // true.
          parse$2(value).includes(key)
        )
      }
      // Other values are not yet supported by CSS.
      // No default
    }
  }

  return false
}

/**
 *
 * @param {Properties[keyof Properties]} value
 * @param {Info} info
 * @returns {string | undefined}
 */
function normalizeValue(value, info) {
  if (value === null || value === undefined) ; else if (typeof value === 'boolean') {
    if (value) {
      return info.attribute
    }
  } else if (Array.isArray(value)) {
    if (value.length > 0) {
      return (info.commaSeparated ? stringify : stringify$1)(value)
    }
  } else {
    return String(value)
  }
}

/**
 * @typedef {import('css-selector-parser').AstClassName} AstClassName
 * @typedef {import('hast').Element} Element
 */

/** @type {Array<never>} */
const emptyClassNames = [];

/**
 * Check whether an element has all class names.
 *
 * @param {AstClassName} query
 *   AST rule (with `classNames`).
 * @param {Element} element
 *   Element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function className(query, element) {
  // Assume array.
  const value = /** @type {Readonly<Array<string>>} */ (
    element.properties.className || emptyClassNames
  );

  return value.includes(query.name)
}

/**
 * @typedef {import('css-selector-parser').AstId} AstId
 *
 * @typedef {import('hast').Element} Element
 */


/**
 * Check whether an element has an ID.
 *
 * @param {AstId} query
 *   AST rule (with `ids`).
 * @param {Element} element
 *   Element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function id(query, element) {
  return element.properties.id === query.name
}

/**
 * @typedef {import('css-selector-parser').AstTagName} AstTagName
 *
 * @typedef {import('hast').Element} Element
 */


/**
 * Check whether an element has a tag name.
 *
 * @param {AstTagName} query
 *   AST rule (with `tag`).
 * @param {Element} element
 *   Element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function name(query, element) {
  return query.name === element.tagName
}

/**
 * See <https://tools.ietf.org/html/rfc4647#section-3.1>
 * for more info on the algorithms.
 */

/**
 * @typedef {string} Tag
 *   BCP-47 tag.
 * @typedef {Array<Tag>} Tags
 *   List of BCP-47 tags.
 * @typedef {string} Range
 *   RFC 4647 range.
 * @typedef {Array<Range>} Ranges
 *   List of RFC 4647 range.
 *
 * @callback Check
 *   An internal check.
 * @param {Tag} tag
 *   BCP-47 tag.
 * @param {Range} range
 *   RFC 4647 range.
 * @returns {boolean}
 *   Whether the range matches the tag.
 *
 * @typedef {FilterOrLookup<true>} Filter
 *   Filter: yields all tags that match a range.
 * @typedef {FilterOrLookup<false>} Lookup
 *   Lookup: yields the best tag that matches a range.
 */

/**
 * @template {boolean} IsFilter
 *   Whether to filter or perform a lookup.
 * @callback FilterOrLookup
 *   A check.
 * @param {Tag|Tags} tags
 *   One or more BCP-47 tags.
 * @param {Range|Ranges|undefined} [ranges='*']
 *   One or more RFC 4647 ranges.
 * @returns {IsFilter extends true ? Tags : Tag|undefined}
 *   Result.
 */

/**
 * Factory to perform a filter or a lookup.
 *
 * This factory creates a function that accepts a list of tags and a list of
 * ranges, and contains logic to exit early for lookups.
 * `check` just has to deal with one tag and one range.
 * This match function iterates over ranges, and for each range,
 * iterates over tags.
 * That way, earlier ranges matching any tag have precedence over later ranges.
 *
 * @template {boolean} IsFilter
 * @param {Check} check
 *   A check.
 * @param {IsFilter} filter
 *   Whether to filter or perform a lookup.
 * @returns {FilterOrLookup<IsFilter>}
 *   Filter or lookup.
 */
function factory(check, filter) {
  /**
   * @param {Tag|Tags} tags
   *   One or more BCP-47 tags.
   * @param {Range|Ranges|undefined} [ranges='*']
   *   One or more RFC 4647 ranges.
   * @returns {IsFilter extends true ? Tags : Tag|undefined}
   *   Result.
   */
  return function (tags, ranges) {
    let left = cast(tags, 'tag');
    const right = cast(
      ranges === null || ranges === undefined ? '*' : ranges,
      'range'
    );
    /** @type {Tags} */
    const matches = [];
    let rightIndex = -1;

    while (++rightIndex < right.length) {
      const range = right[rightIndex].toLowerCase();

      // Ignore wildcards in lookup mode.
      if (!filter && range === '*') continue

      let leftIndex = -1;
      /** @type {Tags} */
      const next = [];

      while (++leftIndex < left.length) {
        if (check(left[leftIndex].toLowerCase(), range)) {
          // Exit if this is a lookup and we have a match.
          if (!filter) {
            return /** @type {IsFilter extends true ? Tags : Tag|undefined} */ (
              left[leftIndex]
            )
          }

          matches.push(left[leftIndex]);
        } else {
          next.push(left[leftIndex]);
        }
      }

      left = next;
    }

    // If this is a filter, return the list.  If it’s a lookup, we didn’t find
    // a match, so return `undefined`.
    return /** @type {IsFilter extends true ? Tags : Tag|undefined} */ (
      filter ? matches : undefined
    )
  }
}

/**
 * Extended Filtering (Section 3.3.2) matches a language priority list
 * consisting of extended language ranges (Section 2.2) to sets of language
 * tags.
 *
 * @param {Tag|Tags} tags
 *   One or more BCP-47 tags.
 * @param {Range|Ranges|undefined} [ranges='*']
 *   One or more RFC 4647 ranges.
 * @returns {Tags}
 *   List of BCP-47 tags.
 */
const extendedFilter = factory(function (tag, range) {
  // 3.3.2.1
  const left = tag.split('-');
  const right = range.split('-');
  let leftIndex = 0;
  let rightIndex = 0;

  // 3.3.2.2
  if (right[rightIndex] !== '*' && left[leftIndex] !== right[rightIndex]) {
    return false
  }

  leftIndex++;
  rightIndex++;

  // 3.3.2.3
  while (rightIndex < right.length) {
    // 3.3.2.3.A
    if (right[rightIndex] === '*') {
      rightIndex++;
      continue
    }

    // 3.3.2.3.B
    if (!left[leftIndex]) return false

    // 3.3.2.3.C
    if (left[leftIndex] === right[rightIndex]) {
      leftIndex++;
      rightIndex++;
      continue
    }

    // 3.3.2.3.D
    if (left[leftIndex].length === 1) return false

    // 3.3.2.3.E
    leftIndex++;
  }

  // 3.3.2.4
  return true
}, true);

/**
 * Validate tags or ranges, and cast them to arrays.
 *
 * @param {string|Array<string>} values
 * @param {string} name
 * @returns {Array<string>}
 */
function cast(values, name) {
  const value = values && typeof values === 'string' ? [values] : values;

  if (!value || typeof value !== 'object' || !('length' in value)) {
    throw new Error(
      'Invalid ' + name + ' `' + value + '`, expected non-empty string'
    )
  }

  return value
}

/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Nodes} Nodes
 */

const own$1 = {}.hasOwnProperty;

/**
 * Check if `node` is an element and has a `name` property.
 *
 * @template {string} Key
 *   Type of key.
 * @param {Nodes} node
 *   Node to check (typically `Element`).
 * @param {Key} name
 *   Property name to check.
 * @returns {node is Element & {properties: Record<Key, Array<number | string> | number | string | true>}}}
 *   Whether `node` is an element that has a `name` property.
 *
 *   Note: see <https://github.com/DefinitelyTyped/DefinitelyTyped/blob/27c9274/types/hast/index.d.ts#L37C29-L37C98>.
 */
function hasProperty(node, name) {
  const value =
    node.type === 'element' &&
    own$1.call(node.properties, name) &&
    node.properties[name];

  return value !== null && value !== undefined && value !== false
}

// Following http://www.w3.org/TR/css3-selectors/#nth-child-pseudo
// Whitespace as per https://www.w3.org/TR/selectors-3/#lex is " \t\r\n\f"
const whitespace = new Set([9, 10, 12, 13, 32]);
const ZERO = "0".charCodeAt(0);
const NINE = "9".charCodeAt(0);
/**
 * Parses an expression.
 *
 * @throws An `Error` if parsing fails.
 * @returns An array containing the integer step size and the integer offset of the nth rule.
 * @example nthCheck.parse("2n+3"); // returns [2, 3]
 */
function parse(formula) {
    formula = formula.trim().toLowerCase();
    if (formula === "even") {
        return [2, 0];
    }
    else if (formula === "odd") {
        return [2, 1];
    }
    // Parse [ ['-'|'+']? INTEGER? {N} [ S* ['-'|'+'] S* INTEGER ]?
    let idx = 0;
    let a = 0;
    let sign = readSign();
    let number = readNumber();
    if (idx < formula.length && formula.charAt(idx) === "n") {
        idx++;
        a = sign * (number !== null && number !== void 0 ? number : 1);
        skipWhitespace();
        if (idx < formula.length) {
            sign = readSign();
            skipWhitespace();
            number = readNumber();
        }
        else {
            sign = number = 0;
        }
    }
    // Throw if there is anything else
    if (number === null || idx < formula.length) {
        throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
    }
    return [a, sign * number];
    function readSign() {
        if (formula.charAt(idx) === "-") {
            idx++;
            return -1;
        }
        if (formula.charAt(idx) === "+") {
            idx++;
        }
        return 1;
    }
    function readNumber() {
        const start = idx;
        let value = 0;
        while (idx < formula.length &&
            formula.charCodeAt(idx) >= ZERO &&
            formula.charCodeAt(idx) <= NINE) {
            value = value * 10 + (formula.charCodeAt(idx) - ZERO);
            idx++;
        }
        // Return `null` if we didn't read anything.
        return idx === start ? null : value;
    }
    function skipWhitespace() {
        while (idx < formula.length &&
            whitespace.has(formula.charCodeAt(idx))) {
            idx++;
        }
    }
}

var boolbase = {
	trueFunc: function trueFunc(){
		return true;
	},
	falseFunc: function falseFunc(){
		return false;
	}
};

const boolbase$1 = /*@__PURE__*/getDefaultExportFromCjs(boolbase);

/**
 * Returns a function that checks if an elements index matches the given rule
 * highly optimized to return the fastest solution.
 *
 * @param parsed A tuple [a, b], as returned by `parse`.
 * @returns A highly optimized function that returns whether an index matches the nth-check.
 * @example
 *
 * ```js
 * const check = nthCheck.compile([2, 3]);
 *
 * check(0); // `false`
 * check(1); // `false`
 * check(2); // `true`
 * check(3); // `false`
 * check(4); // `true`
 * check(5); // `false`
 * check(6); // `true`
 * ```
 */
function compile(parsed) {
    const a = parsed[0];
    // Subtract 1 from `b`, to convert from one- to zero-indexed.
    const b = parsed[1] - 1;
    /*
     * When `b <= 0`, `a * n` won't be lead to any matches for `a < 0`.
     * Besides, the specification states that no elements are
     * matched when `a` and `b` are 0.
     *
     * `b < 0` here as we subtracted 1 from `b` above.
     */
    if (b < 0 && a <= 0)
        return boolbase$1.falseFunc;
    // When `a` is in the range -1..1, it matches any element (so only `b` is checked).
    if (a === -1)
        return (index) => index <= b;
    if (a === 0)
        return (index) => index === b;
    // When `b <= 0` and `a === 1`, they match any element.
    if (a === 1)
        return b < 0 ? boolbase$1.trueFunc : (index) => index >= b;
    /*
     * Otherwise, modulo can be used to check if there is a match.
     *
     * Modulo doesn't care about the sign, so let's use `a`s absolute value.
     */
    const absA = Math.abs(a);
    // Get `b mod a`, + a if this is negative.
    const bMod = ((b % absA) + absA) % absA;
    return a > 1
        ? (index) => index >= b && index % absA === bMod
        : (index) => index <= b && index % absA === bMod;
}

/**
 * Parses and compiles a formula to a highly optimized function.
 * Combination of {@link parse} and {@link compile}.
 *
 * If the formula doesn't match any elements,
 * it returns [`boolbase`](https://github.com/fb55/boolbase)'s `falseFunc`.
 * Otherwise, a function accepting an _index_ is returned, which returns
 * whether or not the passed _index_ matches the formula.
 *
 * Note: The nth-rule starts counting at `1`, the returned function at `0`.
 *
 * @param formula The formula to compile.
 * @example
 * const check = nthCheck("2n+3");
 *
 * check(0); // `false`
 * check(1); // `false`
 * check(2); // `true`
 * check(3); // `false`
 * check(4); // `true`
 * check(5); // `false`
 * check(6); // `true`
 */
function nthCheck$1(formula) {
    return compile(parse(formula));
}

/**
 * @callback Handler
 *   Handle a value, with a certain ID field set to a certain value.
 *   The ID field is passed to `zwitch`, and it’s value is this function’s
 *   place on the `handlers` record.
 * @param {...any} parameters
 *   Arbitrary parameters passed to the zwitch.
 *   The first will be an object with a certain ID field set to a certain value.
 * @returns {any}
 *   Anything!
 */

/**
 * @callback UnknownHandler
 *   Handle values that do have a certain ID field, but it’s set to a value
 *   that is not listed in the `handlers` record.
 * @param {unknown} value
 *   An object with a certain ID field set to an unknown value.
 * @param {...any} rest
 *   Arbitrary parameters passed to the zwitch.
 * @returns {any}
 *   Anything!
 */

/**
 * @callback InvalidHandler
 *   Handle values that do not have a certain ID field.
 * @param {unknown} value
 *   Any unknown value.
 * @param {...any} rest
 *   Arbitrary parameters passed to the zwitch.
 * @returns {void|null|undefined|never}
 *   This should crash or return nothing.
 */

/**
 * @template {InvalidHandler} [Invalid=InvalidHandler]
 * @template {UnknownHandler} [Unknown=UnknownHandler]
 * @template {Record<string, Handler>} [Handlers=Record<string, Handler>]
 * @typedef Options
 *   Configuration (required).
 * @property {Invalid} [invalid]
 *   Handler to use for invalid values.
 * @property {Unknown} [unknown]
 *   Handler to use for unknown values.
 * @property {Handlers} [handlers]
 *   Handlers to use.
 */

const own = {}.hasOwnProperty;

/**
 * Handle values based on a field.
 *
 * @template {InvalidHandler} [Invalid=InvalidHandler]
 * @template {UnknownHandler} [Unknown=UnknownHandler]
 * @template {Record<string, Handler>} [Handlers=Record<string, Handler>]
 * @param {string} key
 *   Field to switch on.
 * @param {Options<Invalid, Unknown, Handlers>} [options]
 *   Configuration (required).
 * @returns {{unknown: Unknown, invalid: Invalid, handlers: Handlers, (...parameters: Parameters<Handlers[keyof Handlers]>): ReturnType<Handlers[keyof Handlers]>, (...parameters: Parameters<Unknown>): ReturnType<Unknown>}}
 */
function zwitch(key, options) {
  const settings = options || {};

  /**
   * Handle one value.
   *
   * Based on the bound `key`, a respective handler will be called.
   * If `value` is not an object, or doesn’t have a `key` property, the special
   * “invalid” handler will be called.
   * If `value` has an unknown `key`, the special “unknown” handler will be
   * called.
   *
   * All arguments, and the context object, are passed through to the handler,
   * and it’s result is returned.
   *
   * @this {unknown}
   *   Any context object.
   * @param {unknown} [value]
   *   Any value.
   * @param {...unknown} parameters
   *   Arbitrary parameters passed to the zwitch.
   * @property {Handler} invalid
   *   Handle for values that do not have a certain ID field.
   * @property {Handler} unknown
   *   Handle values that do have a certain ID field, but it’s set to a value
   *   that is not listed in the `handlers` record.
   * @property {Handlers} handlers
   *   Record of handlers.
   * @returns {unknown}
   *   Anything.
   */
  function one(value, ...parameters) {
    /** @type {Handler|undefined} */
    let fn = one.invalid;
    const handlers = one.handlers;

    if (value && own.call(value, key)) {
      // @ts-expect-error Indexable.
      const id = String(value[key]);
      // @ts-expect-error Indexable.
      fn = own.call(handlers, id) ? handlers[id] : one.unknown;
    }

    if (fn) {
      return fn.call(this, value, ...parameters)
    }
  }

  one.handlers = settings.handlers || {};
  one.invalid = settings.invalid;
  one.unknown = settings.unknown;

  // @ts-expect-error: matches!
  return one
}

/**
 * @typedef {import('css-selector-parser').AstPseudoClass} AstPseudoClass
 *
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').ElementContent} ElementContent
 * @typedef {import('hast').Parents} Parents
 *
 * @typedef {import('./index.js').State} State
 */


/** @type {import('nth-check').default} */
// @ts-expect-error: types are broken.
const nthCheck = nthCheck$1.default || nthCheck$1;

/** @type {(rule: AstPseudoClass, element: Element, index: number | undefined, parent: Parents | undefined, state: State) => boolean} */
const pseudo = zwitch('name', {
  handlers: {
    'any-link': anyLink,
    blank,
    checked,
    dir,
    disabled,
    empty: empty$1,
    enabled,
    'first-child': firstChild,
    'first-of-type': firstOfType,
    has,
    is,
    lang,
    'last-child': lastChild,
    'last-of-type': lastOfType,
    not,
    'nth-child': nthChild,
    'nth-last-child': nthLastChild,
    'nth-last-of-type': nthLastOfType,
    'nth-of-type': nthOfType,
    'only-child': onlyChild,
    'only-of-type': onlyOfType,
    optional,
    'read-only': readOnly,
    'read-write': readWrite,
    required,
    root,
    scope
  },
  invalid: invalidPseudo,
  unknown: unknownPseudo
});

/**
 * Check whether an element matches an `:any-link` pseudo.
 *
 * @param {AstPseudoClass} _
 *   Query.
 * @param {Element} element
 *   Element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function anyLink(_, element) {
  return (
    (element.tagName === 'a' ||
      element.tagName === 'area' ||
      element.tagName === 'link') &&
    hasProperty(element, 'href')
  )
}

/**
 * @param {State} state
 *   State.
 * @param {AstPseudoClass} query
 *   Query.
 */
function assertDeep(state, query) {
  if (state.shallow) {
    throw new Error('Cannot use `:' + query.name + '` without parent')
  }
}

/**
 * Check whether an element matches a `:blank` pseudo.
 *
 * @param {AstPseudoClass} _
 *   Query.
 * @param {Element} element
 *   Element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function blank(_, element) {
  return !someChildren(element, check)

  /**
   * @param {ElementContent} child
   * @returns {boolean}
   */
  function check(child) {
    return (
      child.type === 'element' || (child.type === 'text' && !whitespace$1(child))
    )
  }
}

/**
 * Check whether an element matches a `:checked` pseudo.
 *
 * @param {AstPseudoClass} _
 *   Query.
 * @param {Element} element
 *   Element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function checked(_, element) {
  if (element.tagName === 'input' || element.tagName === 'menuitem') {
    return Boolean(
      (element.properties.type === 'checkbox' ||
        element.properties.type === 'radio') &&
        hasProperty(element, 'checked')
    )
  }

  if (element.tagName === 'option') {
    return hasProperty(element, 'selected')
  }

  return false
}

/**
 * Check whether an element matches a `:dir()` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function dir(query, _1, _2, _3, state) {
  ok(query.argument);
  ok(query.argument.type === 'String');
  return state.direction === query.argument.value
}

/**
 * Check whether an element matches a `:disabled` pseudo.
 *
 * @param {AstPseudoClass} _
 *   Query.
 * @param {Element} element
 *   Element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function disabled(_, element) {
  return (
    (element.tagName === 'button' ||
      element.tagName === 'input' ||
      element.tagName === 'select' ||
      element.tagName === 'textarea' ||
      element.tagName === 'optgroup' ||
      element.tagName === 'option' ||
      element.tagName === 'menuitem' ||
      element.tagName === 'fieldset') &&
    hasProperty(element, 'disabled')
  )
}

/**
 * Check whether an element matches an `:empty` pseudo.
 *
 * @param {AstPseudoClass} _
 *   Query.
 * @param {Element} element
 *   Element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function empty$1(_, element) {
  return !someChildren(element, check)

  /**
   * @param {ElementContent} child
   * @returns {boolean}
   */
  function check(child) {
    return child.type === 'element' || child.type === 'text'
  }
}

/**
 * Check whether an element matches an `:enabled` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} element
 *   Element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function enabled(query, element) {
  return !disabled(query, element)
}

/**
 * Check whether an element matches a `:first-child` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function firstChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.elementIndex === 0
}

/**
 * Check whether an element matches a `:first-of-type` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function firstOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeIndex === 0
}

/**
 * @param {AstPseudoClass} query
 *   Query.
 * @returns {(value: number) => boolean}
 *   N.
 */
function getCachedNthCheck(query) {
  /** @type {(value: number) => boolean} */
  // @ts-expect-error: cache.
  let fn = query._cachedFn;

  if (!fn) {
    const value = query.argument;

    if (value.type !== 'Formula') {
      throw new Error(
        'Expected `nth` formula, such as `even` or `2n+1` (`of` is not yet supported)'
      )
    }

    fn = nthCheck(value.a + 'n+' + value.b);
    // @ts-expect-error: cache.
    query._cachedFn = fn;
  }

  return fn
}

/**
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} element
 *   Element.
 * @param {number | undefined} _1
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _2
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function has(query, element, _1, _2, state) {
  ok(query.argument);
  ok(query.argument.type === 'Selector');

  /** @type {State} */
  const childState = {
    ...state,
    // Not found yet.
    found: false,
    // One result is enough.
    one: true,
    results: [],
    rootQuery: query.argument,
    scopeElements: [element],
    // Do walk deep.
    shallow: false
  };

  walk(childState, {type: 'root', children: element.children});

  return childState.results.length > 0
}

// Shouldn’t be called, parser gives correct data.
/* c8 ignore next 3 */
function invalidPseudo() {
}

/**
 * Check whether an element `:is` further selectors.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} element
 *   Element.
 * @param {number | undefined} _1
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _2
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function is(query, element, _1, _2, state) {
  ok(query.argument);
  ok(query.argument.type === 'Selector');

  /** @type {State} */
  const childState = {
    ...state,
    // Not found yet.
    found: false,
    // One result is enough.
    one: true,
    results: [],
    rootQuery: query.argument,
    scopeElements: [element],
    // Do walk deep.
    shallow: false
  };

  walk(childState, element);

  return childState.results[0] === element
}

/**
 * Check whether an element matches a `:lang()` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function lang(query, _1, _2, _3, state) {
  ok(query.argument);
  ok(query.argument.type === 'String');

  return (
    state.language !== '' &&
    state.language !== undefined &&
    extendedFilter(state.language, parse$3(query.argument.value)).length > 0
  )
}

/**
 * Check whether an element matches a `:last-child` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function lastChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return Boolean(
    state.elementCount && state.elementIndex === state.elementCount - 1
  )
}

/**
 * Check whether an element matches a `:last-of-type` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function lastOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return (
    typeof state.typeIndex === 'number' &&
    typeof state.typeCount === 'number' &&
    state.typeIndex === state.typeCount - 1
  )
}

/**
 * Check whether an element does `:not` match further selectors.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} element
 *   Element.
 * @param {number | undefined} index
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} parent
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function not(query, element, index, parent, state) {
  return !is(query, element, index, parent, state)
}

/**
 * Check whether an element matches an `:nth-child` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function nthChild(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.elementIndex === 'number' && fn(state.elementIndex)
}

/**
 * Check whether an element matches an `:nth-last-child` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function nthLastChild(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return Boolean(
    typeof state.elementCount === 'number' &&
      typeof state.elementIndex === 'number' &&
      fn(state.elementCount - state.elementIndex - 1)
  )
}

/**
 * Check whether an element matches a `:nth-last-of-type` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function nthLastOfType(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return (
    typeof state.typeCount === 'number' &&
    typeof state.typeIndex === 'number' &&
    fn(state.typeCount - 1 - state.typeIndex)
  )
}

/**
 * Check whether an element matches an `:nth-of-type` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function nthOfType(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.typeIndex === 'number' && fn(state.typeIndex)
}

/**
 * Check whether an element matches an `:only-child` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function onlyChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.elementCount === 1
}

/**
 * Check whether an element matches an `:only-of-type` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} _1
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function onlyOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeCount === 1
}

/**
 * Check whether an element matches an `:optional` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} element
 *   Element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function optional(query, element) {
  return !required(query, element)
}

/**
 * Check whether an element matches a `:read-only` pseudo.
 *
 * @param {AstPseudoClass} query
 *   Query.
 * @param {Element} element
 *   Element.
 * @param {number | undefined} index
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} parent
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function readOnly(query, element, index, parent, state) {
  return !readWrite(query, element, index, parent, state)
}

/**
 * Check whether an element matches a `:read-write` pseudo.
 *
 * @param {AstPseudoClass} _
 *   Query.
 * @param {Element} element
 *   Element.
 * @param {number | undefined} _1
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _2
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function readWrite(_, element, _1, _2, state) {
  return element.tagName === 'input' || element.tagName === 'textarea'
    ? !hasProperty(element, 'readOnly') && !hasProperty(element, 'disabled')
    : Boolean(state.editableOrEditingHost)
}

/**
 * Check whether an element matches a `:required` pseudo.
 *
 * @param {AstPseudoClass} _
 *   Query.
 * @param {Element} element
 *   Element.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function required(_, element) {
  return (
    (element.tagName === 'input' ||
      element.tagName === 'textarea' ||
      element.tagName === 'select') &&
    hasProperty(element, 'required')
  )
}

/**
 * Check whether an element matches a `:root` pseudo.
 *
 * @param {AstPseudoClass} _1
 *   Query.
 * @param {Element} element
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} parent
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function root(_1, element, _2, parent, state) {
  return Boolean(
    (!parent || parent.type === 'root') &&
      state.schema &&
      (state.schema.space === 'html' || state.schema.space === 'svg') &&
      (element.tagName === 'html' || element.tagName === 'svg')
  )
}

/**
 * Check whether an element matches a `:scope` pseudo.
 *
 * @param {AstPseudoClass} _1
 *   Query.
 * @param {Element} element
 *   Element.
 * @param {number | undefined} _2
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} _3
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function scope(_1, element, _2, _3, state) {
  return state.scopeElements.includes(element)
}

/**
 * Check children.
 *
 * @param {Element} element
 *   Element.
 * @param {(child: ElementContent) => boolean} check
 *   Check.
 * @returns {boolean}
 *   Whether a child of `element` matches `check`.
 */
function someChildren(element, check) {
  const children = element.children;
  let index = -1;

  while (++index < children.length) {
    if (check(children[index])) return true
  }

  return false
}

/**
 * @param {unknown} query_
 *   Query-like value.
 * @returns {never}
 *   Nothing.
 * @throws
 *   Exception.
 */
function unknownPseudo(query_) {
  // Runtime JS guarantees it has a `name`.
  const query = /** @type {AstPseudoClass} */ (query_);
  throw new Error('Unknown pseudo-selector `' + query.name + '`')
}

/**
 * @typedef {import('css-selector-parser').AstRule} AstRule
 *
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Parents} Parents
 *
 * @typedef {import('./index.js').State} State
 */


/**
 * Test a rule.
 *
 * @param {AstRule} query
 *   AST rule (with `pseudoClasses`).
 * @param {Element} element
 *   Element.
 * @param {number | undefined} index
 *   Index of `element` in `parent`.
 * @param {Parents | undefined} parent
 *   Parent of `element`.
 * @param {State} state
 *   State.
 * @returns {boolean}
 *   Whether `element` matches `query`.
 */
function test(query, element, index, parent, state) {
  for (const item of query.items) {
    // eslint-disable-next-line unicorn/prefer-switch
    if (item.type === 'Attribute') {
      if (!attribute(item, element, state.schema)) return false
    } else if (item.type === 'Id') {
      if (!id(item, element)) return false
    } else if (item.type === 'ClassName') {
      if (!className(item, element)) return false
    } else if (item.type === 'PseudoClass') {
      if (!pseudo(item, element, index, parent, state)) return false
    } else if (item.type === 'PseudoElement') {
      throw new Error('Invalid selector: `::' + item.name + '`')
    } else if (item.type === 'TagName') {
      if (!name(item, element)) return false
    } else ;
  }

  return true
}

/**
 * @typedef {import('css-selector-parser').AstRule} AstRule
 *
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Nodes} Nodes
 * @typedef {import('hast').Parents} Parents
 *
 * @typedef {import('./index.js').State} State
 */


/** @type {Array<never>} */
const empty = [];

/**
 * Walk a tree.
 *
 * @param {State} state
 *   State.
 * @param {Nodes | undefined} tree
 *   Tree.
 */
function walk(state, tree) {
  if (tree) {
    one(state, [], tree, undefined, undefined, tree);
  }
}

/**
 * Add a rule to a nesting map.
 *
 * @param {Nest} nest
 *   Nesting.
 * @param {keyof Nest} field
 *   Field.
 * @param {AstRule} rule
 *   Rule.
 */
function add(nest, field, rule) {
  const list = nest[field];
  if (list) {
    list.push(rule);
  } else {
    nest[field] = [rule];
  }
}

/**
 * Check in a parent.
 *
 * @param {State} state
 *   State.
 * @param {Nest} nest
 *   Nesting.
 * @param {Parents} node
 *   Parent.
 * @param {Nodes} tree
 *   Tree.
 * @returns {undefined}
 *   Nothing.
 */
function all(state, nest, node, tree) {
  const fromParent = combine(nest.descendant, nest.directChild);
  /** @type {Array<AstRule> | undefined} */
  let fromSibling;
  let index = -1;
  /**
   * Total counts.
   * @type {Counts}
   */
  const total = {count: 0, types: new Map()};
  /**
   * Counts of previous siblings.
   * @type {Counts}
   */
  const before = {count: 0, types: new Map()};

  while (++index < node.children.length) {
    count(total, node.children[index]);
  }

  index = -1;

  while (++index < node.children.length) {
    const child = node.children[index];
    // Uppercase to prevent prototype polution, injecting `constructor` or so.
    // Normalize because HTML is insensitive.
    const name =
      child.type === 'element' ? child.tagName.toUpperCase() : undefined;
    // Before counting further elements:
    state.elementIndex = before.count;
    state.typeIndex = name ? before.types.get(name) || 0 : 0;
    // After counting all elements.
    state.elementCount = total.count;
    state.typeCount = name ? total.types.get(name) : 0;

    // Only apply if this is a parent, this should be an element, but we check
    // for parents so that we delve into custom nodes too.
    if ('children' in child) {
      const forSibling = combine(fromParent, fromSibling);
      const nest = one(
        state,
        forSibling,
        node.children[index],
        index,
        node,
        tree
      );
      fromSibling = combine(nest.generalSibling, nest.adjacentSibling);
    }

    // We found one thing, and one is enough.
    if (state.one && state.found) {
      break
    }

    count(before, node.children[index]);
  }
}

/**
 * Apply selectors to an element.
 *
 * @param {State} state
 *   Current state.
 * @param {Array<AstRule>} rules
 *   Rules to apply.
 * @param {Element} node
 *   Element to apply rules to.
 * @param {number | undefined} index
 *   Index of `node` in `parent`.
 * @param {Parents | undefined} parent
 *   Parent of `node`.
 * @returns {Nest}
 *   Further rules.
 */
function applySelectors(state, rules, node, index, parent) {
  /** @type {Nest} */
  const nestResult = {
    adjacentSibling: undefined,
    descendant: undefined,
    directChild: undefined,
    generalSibling: undefined
  };
  let selectorIndex = -1;

  while (++selectorIndex < rules.length) {
    const rule = rules[selectorIndex];

    // We found one thing, and one is enough.
    if (state.one && state.found) {
      break
    }

    // When shallow, we don’t allow nested rules.
    // Idea: we could allow a stack of parents?
    // Might get quite complex though.
    if (state.shallow && rule.nestedRule) {
      throw new Error('Expected selector without nesting')
    }

    // If this rule matches:
    if (test(rule, node, index, parent, state)) {
      const nest = rule.nestedRule;

      // Are there more?
      if (nest) {
        /** @type {keyof Nest} */
        const label =
          nest.combinator === '+'
            ? 'adjacentSibling'
            : nest.combinator === '~'
            ? 'generalSibling'
            : nest.combinator === '>'
            ? 'directChild'
            : 'descendant';
        add(nestResult, label, nest);
      } else {
        // We have a match!
        state.found = true;

        if (!state.results.includes(node)) {
          state.results.push(node);
        }
      }
    }

    // Descendant.
    if (rule.combinator === undefined) {
      add(nestResult, 'descendant', rule);
    }
    // Adjacent.
    else if (rule.combinator === '~') {
      add(nestResult, 'generalSibling', rule);
    }
    // Drop direct child (`>`), adjacent sibling (`+`).
  }

  return nestResult
}

/**
 * Combine two lists, if needed.
 *
 * This is optimized to create as few lists as possible.
 *
 * @param {Array<AstRule> | undefined} left
 *   Rules.
 * @param {Array<AstRule> | undefined} right
 *   Rules.
 * @returns {Array<AstRule>}
 *   Rules.
 */
function combine(left, right) {
  return left && right && left.length > 0 && right.length > 0
    ? [...left, ...right]
    : left && left.length > 0
    ? left
    : right && right.length > 0
    ? right
    : empty
}

/**
 * Count a node.
 *
 * @param {Counts} counts
 *   Counts.
 * @param {Nodes} node
 *   Node (we’re looking for elements).
 * @returns {undefined}
 *   Nothing.
 */
function count(counts, node) {
  if (node.type === 'element') {
    // Uppercase to prevent prototype polution, injecting `constructor` or so.
    // Normalize because HTML is insensitive.
    const name = node.tagName.toUpperCase();
    const count = (counts.types.get(name) || 0) + 1;
    counts.count++;
    counts.types.set(name, count);
  }
}

/**
 * Check a node.
 *
 * @param {State} state
 *   State.
 * @param {Array<AstRule>} currentRules
 *   Rules.
 * @param {Nodes} node
 *   Node.
 * @param {number | undefined} index
 *   Index of `node` in `parent`.
 * @param {Parents | undefined} parent
 *   Parent of `node`.
 * @param {Nodes} tree
 *   Tree.
 * @returns {Nest}
 *   Nesting.
 */
function one(state, currentRules, node, index, parent, tree) {
  /** @type {Nest} */
  let nestResult = {
    adjacentSibling: undefined,
    descendant: undefined,
    directChild: undefined,
    generalSibling: undefined
  };

  const exit = enterState(state, node);

  if (node.type === 'element') {
    let rootRules = state.rootQuery.rules;

    // Remove direct child rules if this is the root.
    // This only happens for a `:has()` rule, which can be like
    // `a:has(> b)`.
    if (parent && parent !== tree) {
      rootRules = state.rootQuery.rules.filter(
        (d) =>
          d.combinator === undefined ||
          (d.combinator === '>' && parent === tree)
      );
    }

    nestResult = applySelectors(
      state,
      // Try the root rules for this element too.
      combine(currentRules, rootRules),
      node,
      index,
      parent
    );
  }

  // If this is a parent, and we want to delve into them, and we haven’t found
  // our single result yet.
  if ('children' in node && !state.shallow && !(state.one && state.found)) {
    all(state, nestResult, node, tree);
  }

  exit();

  return nestResult
}

/**
 * @typedef {import('css-selector-parser').AstSelector} AstSelector
 *
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Nodes} Nodes
 * @typedef {import('hast').RootContent} RootContent
 *
 * @typedef {import('property-information').Schema} Schema
 */


/**
 * Check that the given `node` matches `selector`.
 *
 * This only checks the element itself, not the surrounding tree.
 * Thus, nesting in selectors is not supported (`p b`, `p > b`), neither are
 * selectors like `:first-child`, etc.
 * This only checks that the given element matches the selector.
 *
 * @param {string} selector
 *   CSS selector, such as (`h1`, `a, b`).
 * @param {Nodes | null | undefined} [node]
 *   Node that might match `selector`, should be an element (optional).
 * @param {Space | null | undefined} [space='html']
 *   Name of namespace (default: `'html'`).
 * @returns {boolean}
 *   Whether `node` matches `selector`.
 */
function matches(selector, node, space) {
  const state = createState(selector, node, space);
  state.one = true;
  state.shallow = true;
  walk(state, node || undefined);
  return state.results.length > 0
}

/**
 * @param {string} selector
 *   CSS selector, such as (`h1`, `a, b`).
 * @param {Nodes | null | undefined} [tree]
 *   Tree to search (optional).
 * @param {Space | null | undefined} [space='html']
 *   Name of namespace (default: `'html'`).
 * @returns {State} State
 *   State.
 */
function createState(selector, tree, space) {
  return {
    direction: 'ltr',
    editableOrEditingHost: false,
    elementCount: undefined,
    elementIndex: undefined,
    found: false,
    language: undefined,
    one: false,
    // State of the query.
    results: [],
    rootQuery: parse$1(selector),
    schema: space === 'svg' ? svg : html,
    scopeElements: tree ? (tree.type === 'root' ? tree.children : [tree]) : [],
    shallow: false,
    typeIndex: undefined,
    typeCount: undefined
  }
}

/**
 * @typedef Definition
 *   Info.
 * @property {true} [allowUnknown=false]
 *   Whether arbitrary values are allowed (default: `false`).
 * @property {true} [caseSensitive=false]
 *   Enumerated values are often treated case-insensitive, except when this
 *   field is on (default: `false`).
 * @property {string | null} [invalid]
 *   Invalid value default; `null` means a particular unnamed state.
 * @property {string | null} [missing]
 *   Missing value default; `null` means a particular unnamed state.
 * @property {string | undefined} [selector]
 *   Simple CSS selector; can contain commas; missing means it applies to all
 *   elements.
 * @property {Array<Array<string> | string | null>} states
 *   Possible states.
 */

/**
 * Enumerated HTML attributes.
 *
 * @type {Record<string, Array<Definition> | Definition>}
 */
const enumeratedAttributes = {
  autocomplete: {
    invalid: '',
    missing: '',
    selector: 'form',
    states: [['', 'on'], 'off']
  },
  behavior: {
    missing: 'scroll',
    selector: 'marquee',
    states: ['alternate', 'scroll', 'slide']
  },
  charset: {
    selector: 'meta, script',
    // In HTML5, utf8 is implied.
    // But we let it be here for older versions.
    states: [
      ['utf8', 'utf-8', 'unicode-1-1-utf-8'],
      ['866', 'cp866', 'ibm866', 'csibm866'],
      [
        'l1',
        'ascii',
        'cp819',
        'cp1252',
        'ibm819',
        'latin1',
        'us-ascii',
        'x-cp1252',
        'iso88591',
        'iso8859-1',
        'iso_8859-1',
        'iso-8859-1',
        'iso-ir-100',
        'csisolatin1',
        'windows-1252',
        'ansi_x3.4-1968',
        'iso_8859-1:1987'
      ],
      [
        'l2',
        'csisolatin2',
        'iso-8859-2',
        'iso-ir-101',
        'iso8859-2',
        'iso88592',
        'iso_8859-2',
        'iso_8859-2:1987',
        'latin2'
      ],
      [
        'l3',
        'csisolatin3',
        'iso-8859-3',
        'iso-ir-109',
        'iso8859-3',
        'iso88593',
        'iso_8859-3',
        'iso_8859-3:1988',
        'latin3'
      ],
      [
        'l4',
        'csisolatin4',
        'iso-8859-4',
        'iso-ir-110',
        'iso8859-4',
        'iso88594',
        'iso_8859-4',
        'iso_8859-4:1988',
        'latin4'
      ],
      [
        'l5',
        'latin5',
        'cp1254',
        'x-cp1254',
        'iso88599',
        'iso8859-9',
        'iso-8859-9',
        'iso_8859-9',
        'iso-ir-148',
        'csisolatin5',
        'windows-1254',
        'iso_8859-9:1989'
      ],
      [
        'l6',
        'latin6',
        'iso885910',
        'iso-ir-157',
        'iso8859-10',
        'csisolatin6',
        'iso-8859-10'
      ],
      [
        'l9',
        'iso885915',
        'iso8859-15',
        'iso-8859-15',
        'iso_8859-15',
        'csisolatin9'
      ],
      ['cp1250', 'x-cp1250', 'windows-1250'],
      ['cp1251', 'x-cp1251', 'windows-1251'],
      ['cp1253', 'x-cp1253', 'windows-1253'],
      ['cp1255', 'x-cp1255', 'windows-1255'],
      ['cp1256', 'x-cp1256', 'windows-1256'],
      ['cp1257', 'x-cp1257', 'windows-1257'],
      ['cp1258', 'x-cp1258', 'windows-1258'],
      [
        'cyrillic',
        'iso88595',
        'iso8859-5',
        'iso-8859-5',
        'iso_8859-5',
        'iso-ir-144',
        'iso_8859-5:1988',
        'csisolatincyrillic'
      ],
      [
        'arabic',
        'iso88596',
        'ecma-114',
        'asmo-708',
        'iso8859-6',
        'iso-ir-127',
        'iso_8859-6',
        'iso-8859-6',
        'csiso88596e',
        'csiso88596i',
        'iso-8859-6-e',
        'iso-8859-6-i',
        'iso_8859-6:1987',
        'csisolatinarabic'
      ],
      [
        'greek',
        'greek8',
        'iso88597',
        'ecma-118',
        'elot_928',
        'iso8859-7',
        'iso-8859-7',
        'iso_8859-7',
        'iso-ir-126',
        'sun_eu_greek',
        'iso_8859-7:1987',
        'csisolatingreek'
      ],
      [
        'hebrew',
        'visual',
        'iso88598',
        'iso8859-8',
        'iso-8859-8',
        'iso_8859-8',
        'iso-ir-138',
        'csiso88598e',
        'iso-8859-8-e',
        'iso_8859-8:1988',
        'csisolatinhebrew'
      ],
      ['logical', 'csiso88598i', 'iso-8859-8-i'],
      ['iso885913', 'iso8859-13', 'iso-8859-13'],
      ['iso885914', 'iso8859-14', 'iso-8859-14'],
      ['iso-8859-16'],
      ['koi', 'koi8', 'koi8-r', 'koi8_r', 'cskoi8r'],
      ['koi8-u', 'koi8-ru'],
      ['mac', 'macintosh', 'csmacintosh', 'x-mac-roman'],
      [
        'dos-874',
        'tis-620',
        'iso885911',
        'iso8859-11',
        'iso-8859-11',
        'windows-874'
      ],
      ['x-mac-cyrillic', 'x-mac-ukrainian'],
      [
        'gbk',
        'x-gbk',
        'gb2312',
        'chinese',
        'gb_2312',
        'csgb2312',
        'iso-ir-58',
        'gb_2312-80',
        'csiso58gb231280'
      ],
      ['gb18030'],
      ['big5', 'csbig5', 'cn-big5', 'x-x-big5', 'big5-hkscs'],
      ['euc-jp', 'x-euc-jp', 'cseucpkdfmtjapanese'],
      ['csiso2022jp', 'iso-2022-jp'],
      [
        'ms932',
        'sjis',
        'x-sjis',
        'ms_kanji',
        'shift-jis',
        'shift_jis',
        'csshiftjis',
        'windows-31j'
      ],
      [
        'korean',
        'euc-kr',
        'cseuckr',
        'ksc5601',
        'ksc_5601',
        'iso-ir-149',
        'windows-949',
        'csksc56011987',
        'ks_c_5601-1987',
        'ks_c_5601-1989'
      ],
      [
        'hz-gb-2312',
        'csiso2022kr',
        'iso-2022-kr',
        'iso-2022-cn',
        'iso-2022-cn-ext'
      ],
      ['utf-16be'],
      ['utf-16', 'utf-16le'],
      ['x-user-defined']
    ]
  },
  contenteditable: {
    invalid: null,
    missing: null,
    states: [null, ['', 'true'], 'false']
  },
  crossorigin: {
    invalid: '',
    missing: null,
    selector: 'link, img, audio, video, script',
    states: [['', 'anonymous'], 'use-credentials']
  },
  decoding: {
    invalid: '',
    missing: '',
    selector: 'img',
    states: ['sync', 'async', ['', 'auto']]
  },
  dir: {
    invalid: '',
    missing: '',
    states: ['', 'ltr', 'rtl', 'auto']
  },
  direction: {
    missing: 'left',
    selector: 'marquee',
    states: ['left', 'right', 'up', 'down']
  },
  draggable: {
    missing: null,
    states: [null, 'true', 'false']
  },
  // When changing `encType`, please also change `formenctype`.
  enctype: {
    invalid: 'application/x-www-form-urlencoded',
    missing: 'application/x-www-form-urlencoded',
    selector: 'form',
    states: [
      'application/x-www-form-urlencoded',
      'multipart/form-data',
      'text/plain'
    ]
  },
  // When changing `formenctype`, please also change `encType`.
  formenctype: {
    invalid: 'application/x-www-form-urlencoded',
    // Note that `missing: null` here is intentionally different from `encType`.
    missing: null,
    selector: 'button, input',
    states: [
      'application/x-www-form-urlencoded',
      'multipart/form-data',
      'text/plain'
    ]
  },
  // When changing `formmethod`, please also change `method`.
  formmethod: {
    invalid: 'get',
    // Note that `missing: null` here is intentionally different from `formmethod`.
    missing: null,
    selector: 'button, input',
    states: ['dialog', 'get', 'post']
  },
  // When changing `formtarget`, please also change `target`.
  formtarget: {
    allowUnknown: true,
    // Note that `missing: null` here is intentionally different from `target`.
    missing: null,
    selector: 'button, input',
    // Note that `formtarget` uses `_self` and `target` uses `['', '_self']`,
    // which is intentional.
    states: ['_blank', '_parent', '_self', '_top']
  },
  inputmode: {
    invalid: '',
    missing: '',
    // In fact only applies to `text`, `search`, and `password`.
    selector: 'input',
    states: [
      '',
      'email',
      'full-width-latin',
      'kana',
      'kana-name',
      'katakana',
      'latin',
      'latin-name',
      'latin-prose',
      'numeric',
      'tel',
      'url',
      'verbatim'
    ]
  },
  keytype: {
    missing: 'rsa',
    selector: 'keygen',
    states: ['', 'rsa']
  },
  kind: {
    invalid: 'metadata',
    missing: 'subtitles',
    selector: 'track',
    states: ['captions', 'chapters', 'descriptions', 'metadata', 'subtitles']
  },
  loading: {
    invalid: 'eager',
    missing: 'eager',
    selector: 'iframe, img',
    states: ['eager', 'lazy']
  },
  // When changing `method`, please also change `formmethod`.
  method: {
    invalid: 'get',
    missing: 'get',
    selector: 'form',
    states: ['dialog', 'get', 'post']
  },
  preload: {
    selector: 'audio, video',
    // Note: https://html.spec.whatwg.org/#attr-media-preload
    states: [['', 'auto'], 'metadata', 'none']
  },
  // Should also apply to `content` on `meta[name=referrer]`.
  referrerpolicy: {
    invalid: '',
    missing: '',
    selector: 'a, area, iframe, img, link',
    states: [
      '',
      'no-referrer',
      'no-referrer-when-downgrade',
      'origin',
      'origin-when-cross-origin',
      'unsafe-url'
    ]
  },
  scope: {
    missing: '',
    selector: 'th',
    states: ['', 'col', 'colgroup', 'row', 'rowgroup']
  },
  shadowrootmode: {
    missing: null,
    invalid: null,
    selector: 'template',
    states: [null, 'closed', 'open']
  },
  shape: {
    missing: 'rect',
    selector: 'area',
    states: [
      // The latter are non-conforming.
      ['rect', 'rectangle'],
      ['poly', 'polygon'],
      ['circle', 'circ'],
      'default'
    ]
  },
  spellcheck: {
    invalid: null,
    missing: null,
    states: [null, ['', 'true'], 'false']
  },
  // When changing `target`, please also change `formtarget`.
  target: {
    allowUnknown: true,
    missing: '',
    selector: 'a, area, base, form',
    states: ['_blank', '_parent', ['', '_self'], '_top']
  },
  translate: {
    invalid: null,
    missing: null,
    states: [['', 'yes'], 'no']
  },
  type: [
    {
      missing: 'submit',
      selector: 'button',
      states: ['button', 'menu', 'reset', 'submit']
    },
    {
      missing: 'text',
      selector: 'input',
      states: [
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'number',
        'month',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week'
      ]
    },
    {
      caseSensitive: true,
      invalid: '',
      missing: '',
      selector: 'li',
      states: ['1', 'a', 'A', 'i', 'I', 'circle', 'disc', 'square']
    },
    {
      missing: '',
      selector: 'menu',
      states: ['', 'context', 'toolbar']
    },
    {
      missing: 'command',
      selector: 'menuitem',
      states: ['checkbox', 'command', 'radio']
    },
    {
      caseSensitive: true,
      invalid: '1',
      missing: '1',
      selector: 'ol',
      states: ['1', 'a', 'A', 'i', 'I']
    },
    {
      invalid: '',
      missing: '',
      selector: 'ul',
      states: ['circle', 'disc', 'square']
    }
  ],
  wrap: {
    missing: 'soft',
    selector: 'textarea',
    states: ['hard', 'soft']
  }
};

/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('html-enumerated-attributes').Definition} Definition
 */


/**
 * Minify enumerated attributes.
 *
 * @returns
 *   Transform.
 */
function rehypeMinifyEnumeratedAttribute() {
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
          const attribute = find(html, prop).attribute;

          if (Object.hasOwn(enumeratedAttributes, attribute)) {
            let value = node.properties[prop];

            // Note: we don’t really handle enumerated as lists, so instead
            // we cast them to a string (assuming they are space-separated).
            if (Array.isArray(value)) {
              value = stringify$1(value);
            }

            if (typeof value === 'string') {
              const definition = enumeratedAttributes[attribute];
              const definitions = Array.isArray(definition)
                ? definition
                : [definition];
              let index = -1;

              // eslint-disable-next-line max-depth
              while (++index < definitions.length) {
                const definition = definitions[index];

                // eslint-disable-next-line max-depth
                if (
                  !definition.selector ||
                  matches(definition.selector, node)
                ) {
                  node.properties[prop] = minify(value, definition);
                }
              }
            }
          }
        }
      }
    });
  }
}

/**
 * @param {string} value
 *   Value.
 * @param {Definition} info
 *   Info.
 * @returns {string | undefined}
 *   Result.
 */
function minify(value, info) {
  const insensitive = info.caseSensitive ? value : value.toLowerCase();
  const states = info.states;
  let index = -1;
  let known = false;
  /** @type {string | null} */
  let result = null;
  /** @type {Array<string> | string | null} */
  let state = null;

  while (++index < states.length) {
    state = states[index];

    if (state === null) {
      continue
    }

    if (typeof state === 'string') {
      state = [state];
    }

    if (state.includes(insensitive)) {
      known = true;
      break
    }
  }

  // So, this is a valid enumerated attribute.
  // Lets’s optimize it.
  if (known && state) {
    result = state[0];
  } else if (typeof info.invalid === 'string') {
    result = info.invalid;
  } else if (typeof info.missing === 'string' && !info.allowUnknown) {
    result = info.missing;
  } else {
    return value
  }

  // Should be a setting.
  // There’s a missing value defined, so we can just as well remove the property
  // all-together if they’re the same.
  if (result === info.missing) {
    return
  }

  if (result === info.invalid) {
    // If the invalid state is longer that one character, we explicitly set a
    // short keyword, namely “a” (never used as a keyword so always invalid).
    // Otherwise, we keep the result (it’s often an empty string)
    result = result.length > 1 ? 'a' : result;
  }

  return result
}

export { rehypeMinifyEnumeratedAttribute as default };
