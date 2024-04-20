import { c as commonjsGlobal, d as dist, b as buffer, g as getDefaultExportFromCjs } from './index-a8426493.js';

var clean = {exports: {}};

function level0Optimize$1(tokens) {
  // noop as level 0 means no optimizations!
  return tokens;
}

var optimize$4 = level0Optimize$1;

// adapted from http://nedbatchelder.com/blog/200712.html#e20071211T054956

var NUMBER_PATTERN = /([0-9]+)/;

function naturalCompare$1(value1, value2) {
  var keys1 = ('' + value1).split(NUMBER_PATTERN).map(tryParseInt);
  var keys2 = ('' + value2).split(NUMBER_PATTERN).map(tryParseInt);
  var key1;
  var key2;
  var compareFirst = Math.min(keys1.length, keys2.length);
  var i, l;

  for (i = 0, l = compareFirst; i < l; i++) {
    key1 = keys1[i];
    key2 = keys2[i];

    if (key1 != key2) {
      return key1 > key2 ? 1 : -1;
    }
  }

  return keys1.length > keys2.length ? 1 : (keys1.length == keys2.length ? 0 : -1);
}

function tryParseInt(value) {
  return ('' + parseInt(value)) == value
    ? parseInt(value)
    : value;
}

var naturalCompare_1 = naturalCompare$1;

var naturalCompare = naturalCompare_1;

function naturalSorter$1(scope1, scope2) {
  return naturalCompare(scope1[1], scope2[1]);
}

function standardSorter(scope1, scope2) {
  return scope1[1] > scope2[1] ? 1 : -1;
}

function sortSelectors$3(selectors, method) {
  switch (method) {
  case 'natural':
    return selectors.sort(naturalSorter$1);
  case 'standard':
    return selectors.sort(standardSorter);
  case 'none':
  case false:
    return selectors;
  }
}

var sortSelectors_1 = sortSelectors$3;

var browser$2 = {};

browser$2.endianness = function () { return 'LE' };

browser$2.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

browser$2.loadavg = function () { return [] };

browser$2.uptime = function () { return 0 };

browser$2.freemem = function () {
    return Number.MAX_VALUE;
};

browser$2.totalmem = function () {
    return Number.MAX_VALUE;
};

browser$2.cpus = function () { return [] };

browser$2.type = function () { return 'Browser' };

browser$2.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

browser$2.networkInterfaces
= browser$2.getNetworkInterfaces
= function () { return {} };

browser$2.arch = function () { return 'javascript' };

browser$2.platform = function () { return 'browser' };

browser$2.tmpdir = browser$2.tmpDir = function () {
    return '/tmp';
};

browser$2.EOL = '\n';

browser$2.homedir = function () {
	return '/'
};

function override$7(source1, source2) {
  var target = {};
  var key1;
  var key2;
  var item;

  for (key1 in source1) {
    item = source1[key1];

    if (Array.isArray(item)) {
      target[key1] = item.slice(0);
    } else if (typeof item == 'object' && item !== null) {
      target[key1] = override$7(item, {});
    } else {
      target[key1] = item;
    }
  }

  for (key2 in source2) {
    item = source2[key2];

    if (key2 in target && Array.isArray(item)) {
      target[key2] = item.slice(0);
    } else if (key2 in target && typeof item == 'object' && item !== null) {
      target[key2] = override$7(target[key2], item);
    } else {
      target[key2] = item;
    }
  }

  return target;
}

var override_1 = override$7;

var systemLineBreak = browser$2.EOL;

var override$6 = override_1;

var Breaks$1 = {
  AfterAtRule: 'afterAtRule',
  AfterBlockBegins: 'afterBlockBegins',
  AfterBlockEnds: 'afterBlockEnds',
  AfterComment: 'afterComment',
  AfterProperty: 'afterProperty',
  AfterRuleBegins: 'afterRuleBegins',
  AfterRuleEnds: 'afterRuleEnds',
  BeforeBlockEnds: 'beforeBlockEnds',
  BetweenSelectors: 'betweenSelectors'
};

var BreakWith = {
  CarriageReturnLineFeed: '\r\n',
  LineFeed: '\n',
  System: systemLineBreak
};

var IndentWith = {
  Space: ' ',
  Tab: '\t'
};

var Spaces$2 = {
  AroundSelectorRelation: 'aroundSelectorRelation',
  BeforeBlockBegins: 'beforeBlockBegins',
  BeforeValue: 'beforeValue'
};

var DEFAULTS$2 = {
  breaks: breaks(false),
  breakWith: BreakWith.System,
  indentBy: 0,
  indentWith: IndentWith.Space,
  spaces: spaces(false),
  wrapAt: false,
  semicolonAfterLastProperty: false
};

var BEAUTIFY_ALIAS = 'beautify';
var KEEP_BREAKS_ALIAS = 'keep-breaks';

var OPTION_SEPARATOR$1 = ';';
var OPTION_NAME_VALUE_SEPARATOR = ':';
var HASH_VALUES_OPTION_SEPARATOR = ',';
var HASH_VALUES_NAME_VALUE_SEPARATOR = '=';

var FALSE_KEYWORD_1$1 = 'false';
var FALSE_KEYWORD_2$1 = 'off';
var TRUE_KEYWORD_1$1 = 'true';
var TRUE_KEYWORD_2$1 = 'on';

function breaks(value) {
  var breakOptions = {};

  breakOptions[Breaks$1.AfterAtRule] = value;
  breakOptions[Breaks$1.AfterBlockBegins] = value;
  breakOptions[Breaks$1.AfterBlockEnds] = value;
  breakOptions[Breaks$1.AfterComment] = value;
  breakOptions[Breaks$1.AfterProperty] = value;
  breakOptions[Breaks$1.AfterRuleBegins] = value;
  breakOptions[Breaks$1.AfterRuleEnds] = value;
  breakOptions[Breaks$1.BeforeBlockEnds] = value;
  breakOptions[Breaks$1.BetweenSelectors] = value;

  return breakOptions;
}

function spaces(value) {
  var spaceOptions = {};

  spaceOptions[Spaces$2.AroundSelectorRelation] = value;
  spaceOptions[Spaces$2.BeforeBlockBegins] = value;
  spaceOptions[Spaces$2.BeforeValue] = value;

  return spaceOptions;
}

function formatFrom$1(source) {
  if (source === undefined || source === false) {
    return false;
  }

  if (typeof source == 'object' && 'breakWith' in source) {
    source = override$6(source, { breakWith: mapBreakWith(source.breakWith) });
  }

  if (typeof source == 'object' && 'indentBy' in source) {
    source = override$6(source, { indentBy: parseInt(source.indentBy) });
  }

  if (typeof source == 'object' && 'indentWith' in source) {
    source = override$6(source, { indentWith: mapIndentWith(source.indentWith) });
  }

  if (typeof source == 'object') {
    return remapBreaks(override$6(DEFAULTS$2, source));
  }

  if (typeof source == 'string' && source == BEAUTIFY_ALIAS) {
    return remapBreaks(
      override$6(DEFAULTS$2, {
        breaks: breaks(true),
        indentBy: 2,
        spaces: spaces(true)
      })
    );
  }

  if (typeof source == 'string' && source == KEEP_BREAKS_ALIAS) {
    return remapBreaks(
      override$6(DEFAULTS$2, {
        breaks: {
          afterAtRule: true,
          afterBlockBegins: true,
          afterBlockEnds: true,
          afterComment: true,
          afterRuleEnds: true,
          beforeBlockEnds: true
        }
      })
    );
  }

  if (typeof source == 'string') {
    return remapBreaks(override$6(DEFAULTS$2, toHash(source)));
  }

  return DEFAULTS$2;
}

function toHash(string) {
  return string
    .split(OPTION_SEPARATOR$1)
    .reduce(function(accumulator, directive) {
      var parts = directive.split(OPTION_NAME_VALUE_SEPARATOR);
      var name = parts[0];
      var value = parts[1];

      if (name == 'breaks' || name == 'spaces') {
        accumulator[name] = hashValuesToHash(value);
      } else if (name == 'indentBy' || name == 'wrapAt') {
        accumulator[name] = parseInt(value);
      } else if (name == 'indentWith') {
        accumulator[name] = mapIndentWith(value);
      } else if (name == 'breakWith') {
        accumulator[name] = mapBreakWith(value);
      }

      return accumulator;
    }, {});
}

function hashValuesToHash(string) {
  return string
    .split(HASH_VALUES_OPTION_SEPARATOR)
    .reduce(function(accumulator, directive) {
      var parts = directive.split(HASH_VALUES_NAME_VALUE_SEPARATOR);
      var name = parts[0];
      var value = parts[1];

      accumulator[name] = normalizeValue$1(value);

      return accumulator;
    }, {});
}

function normalizeValue$1(value) {
  switch (value) {
  case FALSE_KEYWORD_1$1:
  case FALSE_KEYWORD_2$1:
    return false;
  case TRUE_KEYWORD_1$1:
  case TRUE_KEYWORD_2$1:
    return true;
  default:
    return value;
  }
}

function mapBreakWith(value) {
  switch (value) {
  case 'windows':
  case 'crlf':
  case BreakWith.CarriageReturnLineFeed:
    return BreakWith.CarriageReturnLineFeed;
  case 'unix':
  case 'lf':
  case BreakWith.LineFeed:
    return BreakWith.LineFeed;
  default:
    return systemLineBreak;
  }
}

function mapIndentWith(value) {
  switch (value) {
  case 'space':
    return IndentWith.Space;
  case 'tab':
    return IndentWith.Tab;
  default:
    return value;
  }
}

function remapBreaks(source) {
  for (var key in Breaks$1) {
    var breakName = Breaks$1[key];
    var breakValue = source.breaks[breakName];

    if (breakValue === true) {
      source.breaks[breakName] = source.breakWith;
    } else if (breakValue === false) {
      source.breaks[breakName] = '';
    } else {
      source.breaks[breakName] = source.breakWith.repeat(parseInt(breakValue));
    }
  }

  return source;
}

var format = {
  Breaks: Breaks$1,
  Spaces: Spaces$2,
  formatFrom: formatFrom$1
};

var Marker$g = {
  ASTERISK: '*',
  AT: '@',
  BACK_SLASH: '\\',
  CARRIAGE_RETURN: '\r',
  CLOSE_CURLY_BRACKET: '}',
  CLOSE_ROUND_BRACKET: ')',
  CLOSE_SQUARE_BRACKET: ']',
  COLON: ':',
  COMMA: ',',
  DOUBLE_QUOTE: '"',
  EXCLAMATION: '!',
  FORWARD_SLASH: '/',
  INTERNAL: '-clean-css-',
  NEW_LINE_NIX: '\n',
  OPEN_CURLY_BRACKET: '{',
  OPEN_ROUND_BRACKET: '(',
  OPEN_SQUARE_BRACKET: '[',
  SEMICOLON: ';',
  SINGLE_QUOTE: '\'',
  SPACE: ' ',
  TAB: '\t',
  UNDERSCORE: '_'
};

var marker = Marker$g;

function formatPosition$4(metadata) {
  var line = metadata[0];
  var column = metadata[1];
  var source = metadata[2];

  return source
    ? source + ':' + line + ':' + column
    : line + ':' + column;
}

var formatPosition_1 = formatPosition$4;

var Spaces$1 = format.Spaces;
var Marker$f = marker;
var formatPosition$3 = formatPosition_1;

var CASE_ATTRIBUTE_PATTERN = /[\s"'][iI]\s*\]/;
var CASE_RESTORE_PATTERN = /([\d\w])([iI])\]/g;
var DOUBLE_QUOTE_CASE_PATTERN = /="([a-zA-Z][a-zA-Z\d\-_]+)"([iI])/g;
var DOUBLE_QUOTE_PATTERN = /="([a-zA-Z][a-zA-Z\d\-_]+)"(\s|\])/g;
var HTML_COMMENT_PATTERN = /^(?:(?:<!--|-->)\s*)+/;
var SINGLE_QUOTE_CASE_PATTERN = /='([a-zA-Z][a-zA-Z\d\-_]+)'([iI])/g;
var SINGLE_QUOTE_PATTERN = /='([a-zA-Z][a-zA-Z\d\-_]+)'(\s|\])/g;
var RELATION_PATTERN$1 = /[>+~]/;
var WHITESPACE_PATTERN$2 = /\s/;

var ASTERISK_PLUS_HTML_HACK = '*+html ';
var ASTERISK_FIRST_CHILD_PLUS_HTML_HACK = '*:first-child+html ';
var LESS_THAN = '<';

var PSEUDO_CLASSES_WITH_SELECTORS = [
  ':current',
  ':future',
  ':has',
  ':host',
  ':host-context',
  ':is',
  ':not',
  ':past',
  ':where'
];

function hasInvalidCharacters(value) {
  var isEscaped;
  var isInvalid = false;
  var character;
  var isQuote = false;
  var i, l;

  for (i = 0, l = value.length; i < l; i++) {
    character = value[i];

    if (isEscaped) ; else if (character == Marker$f.SINGLE_QUOTE || character == Marker$f.DOUBLE_QUOTE) {
      isQuote = !isQuote;
    } else if (!isQuote
      && (character == Marker$f.CLOSE_CURLY_BRACKET
        || character == Marker$f.EXCLAMATION
        || character == LESS_THAN
        || character == Marker$f.SEMICOLON)
    ) {
      isInvalid = true;
      break;
    } else if (!isQuote && i === 0 && RELATION_PATTERN$1.test(character)) {
      isInvalid = true;
      break;
    }

    isEscaped = character == Marker$f.BACK_SLASH;
  }

  return isInvalid;
}

function removeWhitespace(value, format) {
  var stripped = [];
  var character;
  var isNewLineNix;
  var isNewLineWin;
  var isEscaped;
  var wasEscaped;
  var isQuoted;
  var isSingleQuoted;
  var isDoubleQuoted;
  var isAttribute;
  var isRelation;
  var isWhitespace;
  var isSpaceAwarePseudoClass;
  var roundBracketLevel = 0;
  var wasComma = false;
  var wasRelation = false;
  var wasWhitespace = false;
  var withCaseAttribute = CASE_ATTRIBUTE_PATTERN.test(value);
  var spaceAroundRelation = format && format.spaces[Spaces$1.AroundSelectorRelation];
  var i, l;

  for (i = 0, l = value.length; i < l; i++) {
    character = value[i];

    isNewLineNix = character == Marker$f.NEW_LINE_NIX;
    isNewLineWin = character == Marker$f.NEW_LINE_NIX && value[i - 1] == Marker$f.CARRIAGE_RETURN;
    isQuoted = isSingleQuoted || isDoubleQuoted;
    isRelation = !isAttribute && !isEscaped && roundBracketLevel === 0 && RELATION_PATTERN$1.test(character);
    isWhitespace = WHITESPACE_PATTERN$2.test(character);
    isSpaceAwarePseudoClass = roundBracketLevel == 1 && character == Marker$f.CLOSE_ROUND_BRACKET
      ? false
      : isSpaceAwarePseudoClass
        || (roundBracketLevel === 0 && character == Marker$f.COLON && isPseudoClassWithSelectors(value, i));

    if (wasEscaped && isQuoted && isNewLineWin) {
      // swallow escaped new windows lines in comments
      stripped.pop();
      stripped.pop();
    } else if (isEscaped && isQuoted && isNewLineNix) {
      // swallow escaped new *nix lines in comments
      stripped.pop();
    } else if (isEscaped) {
      stripped.push(character);
    } else if (character == Marker$f.OPEN_SQUARE_BRACKET && !isQuoted) {
      stripped.push(character);
      isAttribute = true;
    } else if (character == Marker$f.CLOSE_SQUARE_BRACKET && !isQuoted) {
      stripped.push(character);
      isAttribute = false;
    } else if (character == Marker$f.OPEN_ROUND_BRACKET && !isQuoted) {
      stripped.push(character);
      roundBracketLevel++;
    } else if (character == Marker$f.CLOSE_ROUND_BRACKET && !isQuoted) {
      stripped.push(character);
      roundBracketLevel--;
    } else if (character == Marker$f.SINGLE_QUOTE && !isQuoted) {
      stripped.push(character);
      isSingleQuoted = true;
    } else if (character == Marker$f.DOUBLE_QUOTE && !isQuoted) {
      stripped.push(character);
      isDoubleQuoted = true;
    } else if (character == Marker$f.SINGLE_QUOTE && isQuoted) {
      stripped.push(character);
      isSingleQuoted = false;
    } else if (character == Marker$f.DOUBLE_QUOTE && isQuoted) {
      stripped.push(character);
      isDoubleQuoted = false;
    } else if (isWhitespace && wasRelation && !spaceAroundRelation) {
      continue;
    } else if (!isWhitespace && wasRelation && spaceAroundRelation) {
      stripped.push(Marker$f.SPACE);
      stripped.push(character);
    } else if (isWhitespace && !wasWhitespace && wasComma && roundBracketLevel > 0 && isSpaceAwarePseudoClass) ; else if (isWhitespace && !wasWhitespace && roundBracketLevel > 0 && isSpaceAwarePseudoClass) {
      stripped.push(character);
    } else if (isWhitespace && (isAttribute || roundBracketLevel > 0) && !isQuoted) ; else if (isWhitespace && wasWhitespace && !isQuoted) ; else if ((isNewLineWin || isNewLineNix) && (isAttribute || roundBracketLevel > 0) && isQuoted) ; else if (isRelation && wasWhitespace && !spaceAroundRelation) {
      stripped.pop();
      stripped.push(character);
    } else if (isRelation && !wasWhitespace && spaceAroundRelation) {
      stripped.push(Marker$f.SPACE);
      stripped.push(character);
    } else if (isWhitespace) {
      stripped.push(Marker$f.SPACE);
    } else {
      stripped.push(character);
    }

    wasEscaped = isEscaped;
    isEscaped = character == Marker$f.BACK_SLASH;
    wasRelation = isRelation;
    wasWhitespace = isWhitespace;
    wasComma = character == Marker$f.COMMA;
  }

  return withCaseAttribute
    ? stripped.join('').replace(CASE_RESTORE_PATTERN, '$1 $2]')
    : stripped.join('');
}

function isPseudoClassWithSelectors(value, colonPosition) {
  var pseudoClass = value.substring(colonPosition, value.indexOf(Marker$f.OPEN_ROUND_BRACKET, colonPosition));

  return PSEUDO_CLASSES_WITH_SELECTORS.indexOf(pseudoClass) > -1;
}

function removeQuotes(value) {
  if (value.indexOf('\'') == -1 && value.indexOf('"') == -1) {
    return value;
  }

  return value
    .replace(SINGLE_QUOTE_CASE_PATTERN, '=$1 $2')
    .replace(SINGLE_QUOTE_PATTERN, '=$1$2')
    .replace(DOUBLE_QUOTE_CASE_PATTERN, '=$1 $2')
    .replace(DOUBLE_QUOTE_PATTERN, '=$1$2');
}

function replacePseudoClasses(value) {
  return value
    .replace('nth-child(1)', 'first-child')
    .replace('nth-of-type(1)', 'first-of-type')
    .replace('nth-of-type(even)', 'nth-of-type(2n)')
    .replace('nth-child(even)', 'nth-child(2n)')
    .replace('nth-of-type(2n+1)', 'nth-of-type(odd)')
    .replace('nth-child(2n+1)', 'nth-child(odd)')
    .replace('nth-last-child(1)', 'last-child')
    .replace('nth-last-of-type(1)', 'last-of-type')
    .replace('nth-last-of-type(even)', 'nth-last-of-type(2n)')
    .replace('nth-last-child(even)', 'nth-last-child(2n)')
    .replace('nth-last-of-type(2n+1)', 'nth-last-of-type(odd)')
    .replace('nth-last-child(2n+1)', 'nth-last-child(odd)');
}

function tidyRules$3(rules, removeUnsupported, adjacentSpace, format, warnings) {
  var list = [];
  var repeated = [];

  function removeHTMLComment(rule, match) {
    warnings.push('HTML comment \'' + match + '\' at ' + formatPosition$3(rule[2][0]) + '. Removing.');
    return '';
  }

  for (var i = 0, l = rules.length; i < l; i++) {
    var rule = rules[i];
    var reduced = rule[1];

    reduced = reduced.replace(HTML_COMMENT_PATTERN, removeHTMLComment.bind(null, rule));

    if (hasInvalidCharacters(reduced)) {
      warnings.push('Invalid selector \'' + rule[1] + '\' at ' + formatPosition$3(rule[2][0]) + '. Ignoring.');
      continue;
    }

    reduced = removeWhitespace(reduced, format);
    reduced = removeQuotes(reduced);

    if (adjacentSpace && reduced.indexOf('nav') > 0) {
      reduced = reduced.replace(/\+nav(\S|$)/, '+ nav$1');
    }

    if (removeUnsupported && reduced.indexOf(ASTERISK_PLUS_HTML_HACK) > -1) {
      continue;
    }

    if (removeUnsupported && reduced.indexOf(ASTERISK_FIRST_CHILD_PLUS_HTML_HACK) > -1) {
      continue;
    }

    if (reduced.indexOf('*') > -1) {
      reduced = reduced
        .replace(/\*([:#.[])/g, '$1')
        .replace(/^(:first-child)?\+html/, '*$1+html');
    }

    if (repeated.indexOf(reduced) > -1) {
      continue;
    }

    reduced = replacePseudoClasses(reduced);

    rule[1] = reduced;
    repeated.push(reduced);
    list.push(rule);
  }

  if (list.length == 1 && list[0][1].length === 0) {
    warnings.push('Empty selector \'' + list[0][1] + '\' at ' + formatPosition$3(list[0][2][0]) + '. Ignoring.');
    list = [];
  }

  return list;
}

var tidyRules_1 = tidyRules$3;

var SUPPORTED_COMPACT_BLOCK_MATCHER = /^@media\W/;
var SUPPORTED_QUOTE_REMOVAL_MATCHER = /^@(?:keyframes|-moz-keyframes|-o-keyframes|-webkit-keyframes)\W/;

function tidyBlock$1(values, spaceAfterClosingBrace) {
  var withoutSpaceAfterClosingBrace;
  var withoutQuotes;
  var i;

  for (i = values.length - 1; i >= 0; i--) {
    withoutSpaceAfterClosingBrace = !spaceAfterClosingBrace && SUPPORTED_COMPACT_BLOCK_MATCHER.test(values[i][1]);
    withoutQuotes = SUPPORTED_QUOTE_REMOVAL_MATCHER.test(values[i][1]);

    values[i][1] = values[i][1]
      .replace(/\n|\r\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/(,|:|\() /g, '$1')
      .replace(/ \)/g, ')');

    if (withoutQuotes) {
      values[i][1] = values[i][1]
        .replace(/'([a-zA-Z][a-zA-Z\d\-_]+)'/, '$1')
        .replace(/"([a-zA-Z][a-zA-Z\d\-_]+)"/, '$1');
    }

    if (withoutSpaceAfterClosingBrace) {
      values[i][1] = values[i][1]
        .replace(/\) /g, ')');
    }
  }

  return values;
}

var tidyBlock_1 = tidyBlock$1;

function tidyAtRule$1(value) {
  return value
    .replace(/\s+/g, ' ')
    .replace(/url\(\s+/g, 'url(')
    .replace(/\s+\)/g, ')')
    .trim();
}

var tidyAtRule_1 = tidyAtRule$1;

var Hack$3 = {
  ASTERISK: 'asterisk',
  BANG: 'bang',
  BACKSLASH: 'backslash',
  UNDERSCORE: 'underscore'
};

var hack = Hack$3;

function removeUnused$2(properties) {
  for (var i = properties.length - 1; i >= 0; i--) {
    var property = properties[i];

    if (property.unused) {
      property.all.splice(property.position, 1);
    }
  }
}

var removeUnused_1 = removeUnused$2;

var Hack$2 = hack;

var Marker$e = marker;

var ASTERISK_HACK = '*';
var BACKSLASH_HACK = '\\';
var IMPORTANT_TOKEN = '!important';
var UNDERSCORE_HACK = '_';
var BANG_HACK = '!ie';

function restoreFromOptimizing$5(properties, restoreCallback) {
  var property;
  var restored;
  var current;
  var i;

  for (i = properties.length - 1; i >= 0; i--) {
    property = properties[i];

    if (property.dynamic && property.important) {
      restoreImportant(property);
      continue;
    }

    if (property.dynamic) {
      continue;
    }

    if (property.unused) {
      continue;
    }

    if (!property.dirty && !property.important && !property.hack) {
      continue;
    }

    if (property.optimizable && restoreCallback) {
      restored = restoreCallback(property);
      property.value = restored;
    } else {
      restored = property.value;
    }

    if (property.important) {
      restoreImportant(property);
    }

    if (property.hack) {
      restoreHack(property);
    }

    if ('all' in property) {
      current = property.all[property.position];
      current[1][1] = property.name;

      current.splice(2, current.length - 1);
      Array.prototype.push.apply(current, restored);
    }
  }
}

function restoreImportant(property) {
  property.value[property.value.length - 1][1] += IMPORTANT_TOKEN;
}

function restoreHack(property) {
  if (property.hack[0] == Hack$2.UNDERSCORE) {
    property.name = UNDERSCORE_HACK + property.name;
  } else if (property.hack[0] == Hack$2.ASTERISK) {
    property.name = ASTERISK_HACK + property.name;
  } else if (property.hack[0] == Hack$2.BACKSLASH) {
    property.value[property.value.length - 1][1] += BACKSLASH_HACK + property.hack[1];
  } else if (property.hack[0] == Hack$2.BANG) {
    property.value[property.value.length - 1][1] += Marker$e.SPACE + BANG_HACK;
  }
}

var restoreFromOptimizing_1 = restoreFromOptimizing$5;

var Token$o = {
  AT_RULE: 'at-rule', // e.g. `@import`, `@charset`
  AT_RULE_BLOCK: 'at-rule-block', // e.g. `@font-face{...}`
  AT_RULE_BLOCK_SCOPE: 'at-rule-block-scope', // e.g. `@font-face`
  COMMENT: 'comment', // e.g. `/* comment */`
  NESTED_BLOCK: 'nested-block', // e.g. `@media screen{...}`, `@keyframes animation {...}`
  NESTED_BLOCK_SCOPE: 'nested-block-scope', // e.g. `@media`, `@keyframes`
  PROPERTY: 'property', // e.g. `color:red`
  PROPERTY_BLOCK: 'property-block', // e.g. `--var:{color:red}`
  PROPERTY_NAME: 'property-name', // e.g. `color`
  PROPERTY_VALUE: 'property-value', // e.g. `red`
  RAW: 'raw', // e.g. anything between /* clean-css ignore:start */ and /* clean-css ignore:end */ comments
  RULE: 'rule', // e.g `div > a{...}`
  RULE_SCOPE: 'rule-scope' // e.g `div > a`
};

var token = Token$o;

var Hack$1 = hack;

var Marker$d = marker;
var Token$n = token;

var Match = {
  ASTERISK: '*',
  BACKSLASH: '\\',
  BANG: '!',
  BANG_SUFFIX_PATTERN: /!\w+$/,
  IMPORTANT_TOKEN: '!important',
  IMPORTANT_TOKEN_PATTERN: new RegExp('!important$', 'i'),
  IMPORTANT_WORD: 'important',
  IMPORTANT_WORD_PATTERN: new RegExp('important$', 'i'),
  SUFFIX_BANG_PATTERN: /!$/,
  UNDERSCORE: '_',
  VARIABLE_REFERENCE_PATTERN: /var\(--.+\)$/
};

function wrapAll(properties, skipProperties) {
  var wrapped = [];
  var single;
  var property;
  var i;

  for (i = properties.length - 1; i >= 0; i--) {
    property = properties[i];

    if (property[0] != Token$n.PROPERTY) {
      continue;
    }

    if (skipProperties && skipProperties.indexOf(property[1][1]) > -1) {
      continue;
    }

    single = wrapSingle$3(property);
    single.all = properties;
    single.position = i;
    wrapped.unshift(single);
  }

  return wrapped;
}

function someVariableReferences(property) {
  var i, l;
  var value;

  // skipping `property` and property name tokens
  for (i = 2, l = property.length; i < l; i++) {
    value = property[i];

    if (value[0] != Token$n.PROPERTY_VALUE) {
      continue;
    }

    if (isVariableReference(value[1])) {
      return true;
    }
  }

  return false;
}

function isVariableReference(value) {
  return Match.VARIABLE_REFERENCE_PATTERN.test(value);
}

function isMultiplex(property) {
  var value;
  var i, l;

  for (i = 3, l = property.length; i < l; i++) {
    value = property[i];

    if (value[0] == Token$n.PROPERTY_VALUE && (value[1] == Marker$d.COMMA || value[1] == Marker$d.FORWARD_SLASH)) {
      return true;
    }
  }

  return false;
}

function hackFrom(property) {
  var match = false;
  var name = property[1][1];
  var lastValue = property[property.length - 1];

  if (name[0] == Match.UNDERSCORE) {
    match = [Hack$1.UNDERSCORE];
  } else if (name[0] == Match.ASTERISK) {
    match = [Hack$1.ASTERISK];
  } else if (lastValue[1][0] == Match.BANG && !lastValue[1].match(Match.IMPORTANT_WORD_PATTERN)) {
    match = [Hack$1.BANG];
  } else if (lastValue[1].indexOf(Match.BANG) > 0
    && !lastValue[1].match(Match.IMPORTANT_WORD_PATTERN)
    && Match.BANG_SUFFIX_PATTERN.test(lastValue[1])) {
    match = [Hack$1.BANG];
  } else if (lastValue[1].indexOf(Match.BACKSLASH) > 0
    && lastValue[1].indexOf(Match.BACKSLASH) == lastValue[1].length - Match.BACKSLASH.length - 1) {
    match = [Hack$1.BACKSLASH, lastValue[1].substring(lastValue[1].indexOf(Match.BACKSLASH) + 1)];
  } else if (lastValue[1].indexOf(Match.BACKSLASH) === 0 && lastValue[1].length == 2) {
    match = [Hack$1.BACKSLASH, lastValue[1].substring(1)];
  }

  return match;
}

function isImportant(property) {
  if (property.length < 3) { return false; }

  var lastValue = property[property.length - 1];
  if (Match.IMPORTANT_TOKEN_PATTERN.test(lastValue[1])) {
    return true;
  } if (Match.IMPORTANT_WORD_PATTERN.test(lastValue[1])
    && Match.SUFFIX_BANG_PATTERN.test(property[property.length - 2][1])) {
    return true;
  }

  return false;
}

function stripImportant(property) {
  var lastValue = property[property.length - 1];
  var oneButLastValue = property[property.length - 2];

  if (Match.IMPORTANT_TOKEN_PATTERN.test(lastValue[1])) {
    lastValue[1] = lastValue[1].replace(Match.IMPORTANT_TOKEN_PATTERN, '');
  } else {
    lastValue[1] = lastValue[1].replace(Match.IMPORTANT_WORD_PATTERN, '');
    oneButLastValue[1] = oneButLastValue[1].replace(Match.SUFFIX_BANG_PATTERN, '');
  }

  if (lastValue[1].length === 0) {
    property.pop();
  }

  if (oneButLastValue[1].length === 0) {
    property.pop();
  }
}

function stripPrefixHack(property) {
  property[1][1] = property[1][1].substring(1);
}

function stripSuffixHack(property, hackFrom) {
  var lastValue = property[property.length - 1];
  lastValue[1] = lastValue[1]
    .substring(0, lastValue[1].indexOf(hackFrom[0] == Hack$1.BACKSLASH ? Match.BACKSLASH : Match.BANG))
    .trim();

  if (lastValue[1].length === 0) {
    property.pop();
  }
}

function wrapSingle$3(property) {
  var importantProperty = isImportant(property);
  if (importantProperty) {
    stripImportant(property);
  }

  var whichHack = hackFrom(property);
  if (whichHack[0] == Hack$1.ASTERISK || whichHack[0] == Hack$1.UNDERSCORE) {
    stripPrefixHack(property);
  } else if (whichHack[0] == Hack$1.BACKSLASH || whichHack[0] == Hack$1.BANG) {
    stripSuffixHack(property, whichHack);
  }

  return {
    block: property[2] && property[2][0] == Token$n.PROPERTY_BLOCK,
    components: [],
    dirty: false,
    dynamic: someVariableReferences(property),
    hack: whichHack,
    important: importantProperty,
    name: property[1][1],
    multiplex: property.length > 3 ? isMultiplex(property) : false,
    optimizable: true,
    position: 0,
    shorthand: false,
    unused: false,
    value: property.slice(2)
  };
}

var wrapForOptimizing$3 = {
  all: wrapAll,
  single: wrapSingle$3
};

function InvalidPropertyError$2(message) {
  this.name = 'InvalidPropertyError';
  this.message = message;
  this.stack = (new Error()).stack;
}

InvalidPropertyError$2.prototype = Object.create(Error.prototype);
InvalidPropertyError$2.prototype.constructor = InvalidPropertyError$2;

var invalidPropertyError = InvalidPropertyError$2;

var InvalidPropertyError$1 = invalidPropertyError;

var wrapSingle$2 = wrapForOptimizing$3.single;

var Token$m = token;
var Marker$c = marker;

var formatPosition$2 = formatPosition_1;

function _anyIsInherit(values) {
  var i, l;

  for (i = 0, l = values.length; i < l; i++) {
    if (values[i][1] == 'inherit') {
      return true;
    }
  }

  return false;
}

function _colorFilter(validator) {
  return function(value) {
    return value[1] == 'invert' || validator.isColor(value[1]) || validator.isPrefixed(value[1]);
  };
}

function _styleFilter(validator) {
  return function(value) {
    return value[1] != 'inherit' && validator.isStyleKeyword(value[1]) && !validator.isColorFunction(value[1]);
  };
}

function _wrapDefault(name, property, configuration) {
  var descriptor = configuration[name];
  if (descriptor.doubleValues && descriptor.defaultValue.length == 2) {
    return wrapSingle$2([
      Token$m.PROPERTY,
      [Token$m.PROPERTY_NAME, name],
      [Token$m.PROPERTY_VALUE, descriptor.defaultValue[0]],
      [Token$m.PROPERTY_VALUE, descriptor.defaultValue[1]]
    ]);
  } if (descriptor.doubleValues && descriptor.defaultValue.length == 1) {
    return wrapSingle$2([
      Token$m.PROPERTY,
      [Token$m.PROPERTY_NAME, name],
      [Token$m.PROPERTY_VALUE, descriptor.defaultValue[0]]
    ]);
  }
  return wrapSingle$2([
    Token$m.PROPERTY,
    [Token$m.PROPERTY_NAME, name],
    [Token$m.PROPERTY_VALUE, descriptor.defaultValue]
  ]);
}

function _widthFilter(validator) {
  return function(value) {
    return value[1] != 'inherit'
      && (validator.isWidth(value[1]) || validator.isUnit(value[1]) || validator.isDynamicUnit(value[1]))
      && !validator.isStyleKeyword(value[1])
      && !validator.isColorFunction(value[1]);
  };
}

function animation(property, configuration, validator) {
  var duration = _wrapDefault(property.name + '-duration', property, configuration);
  var timing = _wrapDefault(property.name + '-timing-function', property, configuration);
  var delay = _wrapDefault(property.name + '-delay', property, configuration);
  var iteration = _wrapDefault(property.name + '-iteration-count', property, configuration);
  var direction = _wrapDefault(property.name + '-direction', property, configuration);
  var fill = _wrapDefault(property.name + '-fill-mode', property, configuration);
  var play = _wrapDefault(property.name + '-play-state', property, configuration);
  var name = _wrapDefault(property.name + '-name', property, configuration);
  var components = [duration, timing, delay, iteration, direction, fill, play, name];
  var values = property.value;
  var value;
  var durationSet = false;
  var timingSet = false;
  var delaySet = false;
  var iterationSet = false;
  var directionSet = false;
  var fillSet = false;
  var playSet = false;
  var nameSet = false;
  var i;
  var l;

  if (property.value.length == 1 && property.value[0][1] == 'inherit') {
    // eslint-disable-next-line max-len
    duration.value = timing.value = delay.value = iteration.value = direction.value = fill.value = play.value = name.value = property.value;
    return components;
  }

  if (values.length > 1 && _anyIsInherit(values)) {
    throw new InvalidPropertyError$1('Invalid animation values at ' + formatPosition$2(values[0][2][0]) + '. Ignoring.');
  }

  for (i = 0, l = values.length; i < l; i++) {
    value = values[i];

    if (validator.isTime(value[1]) && !durationSet) {
      duration.value = [value];
      durationSet = true;
    } else if (validator.isTime(value[1]) && !delaySet) {
      delay.value = [value];
      delaySet = true;
    } else if ((validator.isGlobal(value[1]) || validator.isTimingFunction(value[1])) && !timingSet) {
      timing.value = [value];
      timingSet = true;
    } else if ((validator.isAnimationIterationCountKeyword(value[1])
      || validator.isPositiveNumber(value[1]))
      && !iterationSet) {
      iteration.value = [value];
      iterationSet = true;
    } else if (validator.isAnimationDirectionKeyword(value[1]) && !directionSet) {
      direction.value = [value];
      directionSet = true;
    } else if (validator.isAnimationFillModeKeyword(value[1]) && !fillSet) {
      fill.value = [value];
      fillSet = true;
    } else if (validator.isAnimationPlayStateKeyword(value[1]) && !playSet) {
      play.value = [value];
      playSet = true;
    } else if ((validator.isAnimationNameKeyword(value[1]) || validator.isIdentifier(value[1])) && !nameSet) {
      name.value = [value];
      nameSet = true;
    } else {
      throw new InvalidPropertyError$1('Invalid animation value at ' + formatPosition$2(value[2][0]) + '. Ignoring.');
    }
  }

  return components;
}

function background$2(property, configuration, validator) {
  var image = _wrapDefault('background-image', property, configuration);
  var position = _wrapDefault('background-position', property, configuration);
  var size = _wrapDefault('background-size', property, configuration);
  var repeat = _wrapDefault('background-repeat', property, configuration);
  var attachment = _wrapDefault('background-attachment', property, configuration);
  var origin = _wrapDefault('background-origin', property, configuration);
  var clip = _wrapDefault('background-clip', property, configuration);
  var color = _wrapDefault('background-color', property, configuration);
  var components = [image, position, size, repeat, attachment, origin, clip, color];
  var values = property.value;

  var positionSet = false;
  var clipSet = false;
  var originSet = false;
  var repeatSet = false;

  var anyValueSet = false;

  if (property.value.length == 1 && property.value[0][1] == 'inherit') {
    // NOTE: 'inherit' is not a valid value for background-attachment
    color.value = image.value = repeat.value = position.value = size.value = origin.value = clip.value = property.value;
    return components;
  }

  if (property.value.length == 1 && property.value[0][1] == '0 0') {
    return components;
  }

  for (var i = values.length - 1; i >= 0; i--) {
    var value = values[i];

    if (validator.isBackgroundAttachmentKeyword(value[1])) {
      attachment.value = [value];
      anyValueSet = true;
    } else if (validator.isBackgroundClipKeyword(value[1]) || validator.isBackgroundOriginKeyword(value[1])) {
      if (clipSet) {
        origin.value = [value];
        originSet = true;
      } else {
        clip.value = [value];
        clipSet = true;
      }
      anyValueSet = true;
    } else if (validator.isBackgroundRepeatKeyword(value[1])) {
      if (repeatSet) {
        repeat.value.unshift(value);
      } else {
        repeat.value = [value];
        repeatSet = true;
      }
      anyValueSet = true;
    } else if (validator.isBackgroundPositionKeyword(value[1])
    || validator.isBackgroundSizeKeyword(value[1])
    || validator.isUnit(value[1])
    || validator.isDynamicUnit(value[1])) {
      if (i > 0) {
        var previousValue = values[i - 1];

        if (previousValue[1] == Marker$c.FORWARD_SLASH) {
          size.value = [value];
        } else if (i > 1 && values[i - 2][1] == Marker$c.FORWARD_SLASH) {
          size.value = [previousValue, value];
          i -= 2;
        } else {
          if (!positionSet) { position.value = []; }

          position.value.unshift(value);
          positionSet = true;
        }
      } else {
        if (!positionSet) { position.value = []; }

        position.value.unshift(value);
        positionSet = true;
      }
      anyValueSet = true;
    } else if ((color.value[0][1] == configuration[color.name].defaultValue || color.value[0][1] == 'none') && (validator.isColor(value[1]) || validator.isPrefixed(value[1]))) {
      color.value = [value];
      anyValueSet = true;
    } else if (validator.isUrl(value[1]) || validator.isFunction(value[1])) {
      image.value = [value];
      anyValueSet = true;
    }
  }

  if (clipSet && !originSet) { origin.value = clip.value.slice(0); }

  if (!anyValueSet) {
    throw new InvalidPropertyError$1('Invalid background value at ' + formatPosition$2(values[0][2][0]) + '. Ignoring.');
  }

  return components;
}

function borderRadius$2(property, configuration) {
  var values = property.value;
  var splitAt = -1;

  for (var i = 0, l = values.length; i < l; i++) {
    if (values[i][1] == Marker$c.FORWARD_SLASH) {
      splitAt = i;
      break;
    }
  }

  if (splitAt === 0 || splitAt === values.length - 1) {
    throw new InvalidPropertyError$1('Invalid border-radius value at ' + formatPosition$2(values[0][2][0]) + '. Ignoring.');
  }

  var target = _wrapDefault(property.name, property, configuration);
  target.value = splitAt > -1
    ? values.slice(0, splitAt)
    : values.slice(0);
  target.components = fourValues$1(target, configuration);

  var remainder = _wrapDefault(property.name, property, configuration);
  remainder.value = splitAt > -1
    ? values.slice(splitAt + 1)
    : values.slice(0);
  remainder.components = fourValues$1(remainder, configuration);

  for (var j = 0; j < 4; j++) {
    target.components[j].multiplex = true;
    target.components[j].value = target.components[j].value.concat(remainder.components[j].value);
  }

  return target.components;
}

function font$1(property, configuration, validator) {
  var style = _wrapDefault('font-style', property, configuration);
  var variant = _wrapDefault('font-variant', property, configuration);
  var weight = _wrapDefault('font-weight', property, configuration);
  var stretch = _wrapDefault('font-stretch', property, configuration);
  var size = _wrapDefault('font-size', property, configuration);
  var height = _wrapDefault('line-height', property, configuration);
  var family = _wrapDefault('font-family', property, configuration);
  var components = [style, variant, weight, stretch, size, height, family];
  var values = property.value;
  var fuzzyMatched = 4; // style, variant, weight, and stretch
  var index = 0;
  var isStretchSet = false;
  var isStretchValid;
  var isStyleSet = false;
  var isStyleValid;
  var isVariantSet = false;
  var isVariantValid;
  var isWeightSet = false;
  var isWeightValid;
  var appendableFamilyName = false;

  if (!values[index]) {
    throw new InvalidPropertyError$1('Missing font values at ' + formatPosition$2(property.all[property.position][1][2][0]) + '. Ignoring.');
  }

  if (values.length == 1 && values[0][1] == 'inherit') {
    style.value = variant.value = weight.value = stretch.value = size.value = height.value = family.value = values;
    return components;
  }

  if (values.length == 1
    && (validator.isFontKeyword(values[0][1])
    || validator.isGlobal(values[0][1])
    || validator.isPrefixed(values[0][1]))
  ) {
    values[0][1] = Marker$c.INTERNAL + values[0][1];
    style.value = variant.value = weight.value = stretch.value = size.value = height.value = family.value = values;
    return components;
  }

  if (values.length < 2 || !_anyIsFontSize(values, validator) || !_anyIsFontFamily(values, validator)) {
    throw new InvalidPropertyError$1('Invalid font values at ' + formatPosition$2(property.all[property.position][1][2][0]) + '. Ignoring.');
  }

  if (values.length > 1 && _anyIsInherit(values)) {
    throw new InvalidPropertyError$1('Invalid font values at ' + formatPosition$2(values[0][2][0]) + '. Ignoring.');
  }

  // fuzzy match style, variant, weight, and stretch on first elements
  while (index < fuzzyMatched) {
    isStretchValid = validator.isFontStretchKeyword(values[index][1]) || validator.isGlobal(values[index][1]);
    isStyleValid = validator.isFontStyleKeyword(values[index][1]) || validator.isGlobal(values[index][1]);
    isVariantValid = validator.isFontVariantKeyword(values[index][1]) || validator.isGlobal(values[index][1]);
    isWeightValid = validator.isFontWeightKeyword(values[index][1]) || validator.isGlobal(values[index][1]);

    if (isStyleValid && !isStyleSet) {
      style.value = [values[index]];
      isStyleSet = true;
    } else if (isVariantValid && !isVariantSet) {
      variant.value = [values[index]];
      isVariantSet = true;
    } else if (isWeightValid && !isWeightSet) {
      weight.value = [values[index]];
      isWeightSet = true;
    } else if (isStretchValid && !isStretchSet) {
      stretch.value = [values[index]];
      isStretchSet = true;
    } else if (isStyleValid
      && isStyleSet
      || isVariantValid
      && isVariantSet
      || isWeightValid
      && isWeightSet
      || isStretchValid
      && isStretchSet) {
      throw new InvalidPropertyError$1('Invalid font style / variant / weight / stretch value at ' + formatPosition$2(values[0][2][0]) + '. Ignoring.');
    } else {
      break;
    }

    index++;
  }

  // now comes font-size ...
  if (validator.isFontSizeKeyword(values[index][1])
    || validator.isUnit(values[index][1])
    && !validator.isDynamicUnit(values[index][1])) {
    size.value = [values[index]];
    index++;
  } else {
    throw new InvalidPropertyError$1('Missing font size at ' + formatPosition$2(values[0][2][0]) + '. Ignoring.');
  }

  if (!values[index]) {
    throw new InvalidPropertyError$1('Missing font family at ' + formatPosition$2(values[0][2][0]) + '. Ignoring.');
  }

  // ... and perhaps line-height
  if (values[index]
    && values[index][1] == Marker$c.FORWARD_SLASH
    && values[index + 1]
    && (validator.isLineHeightKeyword(values[index + 1][1])
    || validator.isUnit(values[index + 1][1])
    || validator.isNumber(values[index + 1][1]))) {
    height.value = [values[index + 1]];
    index++;
    index++;
  }

  // ... and whatever comes next is font-family
  family.value = [];

  while (values[index]) {
    if (values[index][1] == Marker$c.COMMA) {
      appendableFamilyName = false;
    } else {
      if (appendableFamilyName) {
        family.value[family.value.length - 1][1] += Marker$c.SPACE + values[index][1];
      } else {
        family.value.push(values[index]);
      }

      appendableFamilyName = true;
    }

    index++;
  }

  if (family.value.length === 0) {
    throw new InvalidPropertyError$1('Missing font family at ' + formatPosition$2(values[0][2][0]) + '. Ignoring.');
  }

  return components;
}

function _anyIsFontSize(values, validator) {
  var value;
  var i, l;

  for (i = 0, l = values.length; i < l; i++) {
    value = values[i];

    if (validator.isFontSizeKeyword(value[1])
      || validator.isUnit(value[1])
      && !validator.isDynamicUnit(value[1])
      || validator.isFunction(value[1])) {
      return true;
    }
  }

  return false;
}

function _anyIsFontFamily(values, validator) {
  var value;
  var i, l;

  for (i = 0, l = values.length; i < l; i++) {
    value = values[i];

    if (validator.isIdentifier(value[1]) || validator.isQuotedText(value[1])) {
      return true;
    }
  }

  return false;
}

function fourValues$1(property, configuration) {
  var componentNames = configuration[property.name].components;
  var components = [];
  var value = property.value;

  if (value.length < 1) { return []; }

  if (value.length < 2) { value[1] = value[0].slice(0); }
  if (value.length < 3) { value[2] = value[0].slice(0); }
  if (value.length < 4) { value[3] = value[1].slice(0); }

  for (var i = componentNames.length - 1; i >= 0; i--) {
    var component = wrapSingle$2([
      Token$m.PROPERTY,
      [Token$m.PROPERTY_NAME, componentNames[i]]
    ]);
    component.value = [value[i]];
    components.unshift(component);
  }

  return components;
}

function multiplex$1(splitWith) {
  return function(property, configuration, validator) {
    var splitsAt = [];
    var values = property.value;
    var i, j, l, m;

    // find split commas
    for (i = 0, l = values.length; i < l; i++) {
      if (values[i][1] == ',') { splitsAt.push(i); }
    }

    if (splitsAt.length === 0) { return splitWith(property, configuration, validator); }

    var splitComponents = [];

    // split over commas, and into components
    for (i = 0, l = splitsAt.length; i <= l; i++) {
      var from = i === 0 ? 0 : splitsAt[i - 1] + 1;
      var to = i < l ? splitsAt[i] : values.length;

      var _property = _wrapDefault(property.name, property, configuration);
      _property.value = values.slice(from, to);

      if (_property.value.length > 0) {
        splitComponents.push(splitWith(_property, configuration, validator));
      }
    }

    var components = splitComponents[0];

    // group component values from each split
    for (i = 0, l = components.length; i < l; i++) {
      components[i].multiplex = true;

      for (j = 1, m = splitComponents.length; j < m; j++) {
        components[i].value.push([Token$m.PROPERTY_VALUE, Marker$c.COMMA]);
        Array.prototype.push.apply(components[i].value, splitComponents[j][i].value);
      }
    }

    return components;
  };
}

function listStyle(property, configuration, validator) {
  var type = _wrapDefault('list-style-type', property, configuration);
  var position = _wrapDefault('list-style-position', property, configuration);
  var image = _wrapDefault('list-style-image', property, configuration);
  var components = [type, position, image];

  if (property.value.length == 1 && property.value[0][1] == 'inherit') {
    type.value = position.value = image.value = [property.value[0]];
    return components;
  }

  var values = property.value.slice(0);
  var total = values.length;
  var index = 0;

  // `image` first...
  for (index = 0, total = values.length; index < total; index++) {
    if (validator.isUrl(values[index][1]) || values[index][1] == '0') {
      image.value = [values[index]];
      values.splice(index, 1);
      break;
    }
  }

  // ... then `position`
  for (index = 0, total = values.length; index < total; index++) {
    if (validator.isListStylePositionKeyword(values[index][1])) {
      position.value = [values[index]];
      values.splice(index, 1);
      break;
    }
  }

  // ... and what's left is a `type`
  if (values.length > 0 && (validator.isListStyleTypeKeyword(values[0][1]) || validator.isIdentifier(values[0][1]))) {
    type.value = [values[0]];
  }

  return components;
}

function transition(property, configuration, validator) {
  var prop = _wrapDefault(property.name + '-property', property, configuration);
  var duration = _wrapDefault(property.name + '-duration', property, configuration);
  var timing = _wrapDefault(property.name + '-timing-function', property, configuration);
  var delay = _wrapDefault(property.name + '-delay', property, configuration);
  var components = [prop, duration, timing, delay];
  var values = property.value;
  var value;
  var durationSet = false;
  var delaySet = false;
  var propSet = false;
  var timingSet = false;
  var i;
  var l;

  if (property.value.length == 1 && property.value[0][1] == 'inherit') {
    prop.value = duration.value = timing.value = delay.value = property.value;
    return components;
  }

  if (values.length > 1 && _anyIsInherit(values)) {
    throw new InvalidPropertyError$1('Invalid animation values at ' + formatPosition$2(values[0][2][0]) + '. Ignoring.');
  }

  for (i = 0, l = values.length; i < l; i++) {
    value = values[i];

    if (validator.isTime(value[1]) && !durationSet) {
      duration.value = [value];
      durationSet = true;
    } else if (validator.isTime(value[1]) && !delaySet) {
      delay.value = [value];
      delaySet = true;
    } else if ((validator.isGlobal(value[1]) || validator.isTimingFunction(value[1])) && !timingSet) {
      timing.value = [value];
      timingSet = true;
    } else if (validator.isIdentifier(value[1]) && !propSet) {
      prop.value = [value];
      propSet = true;
    } else {
      throw new InvalidPropertyError$1('Invalid animation value at ' + formatPosition$2(value[2][0]) + '. Ignoring.');
    }
  }

  return components;
}

function widthStyleColor(property, configuration, validator) {
  var descriptor = configuration[property.name];
  var components = [
    _wrapDefault(descriptor.components[0], property, configuration),
    _wrapDefault(descriptor.components[1], property, configuration),
    _wrapDefault(descriptor.components[2], property, configuration)
  ];
  var color, style, width;

  for (var i = 0; i < 3; i++) {
    var component = components[i];

    if (component.name.indexOf('color') > 0) { color = component; } else if (component.name.indexOf('style') > 0) { style = component; } else { width = component; }
  }

  if ((property.value.length == 1 && property.value[0][1] == 'inherit')
      || (property.value.length == 3 && property.value[0][1] == 'inherit' && property.value[1][1] == 'inherit' && property.value[2][1] == 'inherit')) {
    color.value = style.value = width.value = [property.value[0]];
    return components;
  }

  var values = property.value.slice(0);
  var match, matches;

  // NOTE: usually users don't follow the required order of parts in this shorthand,
  // so we'll try to parse it caring as little about order as possible

  if (values.length > 0) {
    matches = values.filter(_widthFilter(validator));
    match = matches.length > 1 && (matches[0][1] == 'none' || matches[0][1] == 'auto') ? matches[1] : matches[0];
    if (match) {
      width.value = [match];
      values.splice(values.indexOf(match), 1);
    }
  }

  if (values.length > 0) {
    match = values.filter(_styleFilter(validator))[0];
    if (match) {
      style.value = [match];
      values.splice(values.indexOf(match), 1);
    }
  }

  if (values.length > 0) {
    match = values.filter(_colorFilter(validator))[0];
    if (match) {
      color.value = [match];
      values.splice(values.indexOf(match), 1);
    }
  }

  return components;
}

var breakUp$1 = {
  animation: animation,
  background: background$2,
  border: widthStyleColor,
  borderRadius: borderRadius$2,
  font: font$1,
  fourValues: fourValues$1,
  listStyle: listStyle,
  multiplex: multiplex$1,
  outline: widthStyleColor,
  transition: transition
};

var VENDOR_PREFIX_PATTERN = /(?:^|\W)(-\w+-)/g;

function unique(value) {
  var prefixes = [];
  var match;

  // eslint-disable-next-line no-cond-assign
  while ((match = VENDOR_PREFIX_PATTERN.exec(value)) !== null) {
    if (prefixes.indexOf(match[0]) == -1) {
      prefixes.push(match[0]);
    }
  }

  return prefixes;
}

function same(value1, value2) {
  return unique(value1).sort().join(',') == unique(value2).sort().join(',');
}

var vendorPrefixes = {
  unique: unique,
  same: same
};

var sameVendorPrefixes = vendorPrefixes.same;

function understandable$1(validator, value1, value2, _position, isPaired) {
  if (!sameVendorPrefixes(value1, value2)) {
    return false;
  }

  if (isPaired && validator.isVariable(value1) !== validator.isVariable(value2)) {
    return false;
  }

  return true;
}

var understandable_1 = understandable$1;

var understandable = understandable_1;

function animationIterationCount(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true)
    && !(validator.isAnimationIterationCountKeyword(value2) || validator.isPositiveNumber(value2))) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isAnimationIterationCountKeyword(value2) || validator.isPositiveNumber(value2);
}

function animationName(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true)
    && !(validator.isAnimationNameKeyword(value2) || validator.isIdentifier(value2))) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isAnimationNameKeyword(value2) || validator.isIdentifier(value2);
}

function areSameFunction(validator, value1, value2) {
  if (!validator.isFunction(value1) || !validator.isFunction(value2)) {
    return false;
  }

  var function1Name = value1.substring(0, value1.indexOf('('));
  var function2Name = value2.substring(0, value2.indexOf('('));

  var function1Value = value1.substring(function1Name.length + 1, value1.length - 1);
  var function2Value = value2.substring(function2Name.length + 1, value2.length - 1);

  if (validator.isFunction(function1Value) || validator.isFunction(function2Value)) {
    return function1Name === function2Name && areSameFunction(validator, function1Value, function2Value);
  }
  return function1Name === function2Name;
}

function backgroundPosition(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true)
    && !(validator.isBackgroundPositionKeyword(value2) || validator.isGlobal(value2))) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } if (validator.isBackgroundPositionKeyword(value2) || validator.isGlobal(value2)) {
    return true;
  }

  return unit$1(validator, value1, value2);
}

function backgroundSize(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true)
    && !(validator.isBackgroundSizeKeyword(value2) || validator.isGlobal(value2))) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } if (validator.isBackgroundSizeKeyword(value2) || validator.isGlobal(value2)) {
    return true;
  }

  return unit$1(validator, value1, value2);
}

function color$1(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true) && !validator.isColor(value2)) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } if (!validator.colorOpacity && (validator.isRgbColor(value1) || validator.isHslColor(value1))) {
    return false;
  } if (!validator.colorOpacity && (validator.isRgbColor(value2) || validator.isHslColor(value2))) {
    return false;
  } if (!validator.colorHexAlpha && (validator.isHexAlphaColor(value1) || validator.isHexAlphaColor(value2))) {
    return false;
  } if (validator.isColor(value1) && validator.isColor(value2)) {
    return true;
  }

  return sameFunctionOrValue(validator, value1, value2);
}

function components(overrideCheckers) {
  return function(validator, value1, value2, position) {
    return overrideCheckers[position](validator, value1, value2);
  };
}

function fontFamily(validator, value1, value2) {
  return understandable(validator, value1, value2, 0, true);
}

function image(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true) && !validator.isImage(value2)) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } if (validator.isImage(value2)) {
    return true;
  } if (validator.isImage(value1)) {
    return false;
  }

  return sameFunctionOrValue(validator, value1, value2);
}

function keyword(propertyName) {
  return function(validator, value1, value2) {
    if (!understandable(validator, value1, value2, 0, true) && !validator.isKeyword(propertyName)(value2)) {
      return false;
    } if (validator.isVariable(value1) && validator.isVariable(value2)) {
      return true;
    }

    return validator.isKeyword(propertyName)(value2);
  };
}

function keywordWithGlobal(propertyName) {
  return function(validator, value1, value2) {
    if (!understandable(validator, value1, value2, 0, true)
      && !(validator.isKeyword(propertyName)(value2) || validator.isGlobal(value2))) {
      return false;
    } if (validator.isVariable(value1) && validator.isVariable(value2)) {
      return true;
    }

    return validator.isKeyword(propertyName)(value2) || validator.isGlobal(value2);
  };
}

function propertyName$1(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true) && !validator.isIdentifier(value2)) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isIdentifier(value2);
}

function sameFunctionOrValue(validator, value1, value2) {
  return areSameFunction(validator, value1, value2)
    ? true
    : value1 === value2;
}

function textShadow(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true)
    && !(validator.isUnit(value2)
    || validator.isColor(value2)
    || validator.isGlobal(value2))) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isUnit(value2) || validator.isColor(value2) || validator.isGlobal(value2);
}

function time$1(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true) && !validator.isTime(value2)) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } if (validator.isTime(value1) && !validator.isTime(value2)) {
    return false;
  } if (validator.isTime(value2)) {
    return true;
  } if (validator.isTime(value1)) {
    return false;
  } if (validator.isFunction(value1)
    && !validator.isPrefixed(value1)
    && validator.isFunction(value2)
    && !validator.isPrefixed(value2)) {
    return true;
  }

  return sameFunctionOrValue(validator, value1, value2);
}

function timingFunction(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true)
    && !(validator.isTimingFunction(value2) || validator.isGlobal(value2))) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isTimingFunction(value2) || validator.isGlobal(value2);
}

function unit$1(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true) && !validator.isUnit(value2)) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } if (validator.isUnit(value1) && !validator.isUnit(value2)) {
    return false;
  } if (validator.isUnit(value2)) {
    return true;
  } if (validator.isUnit(value1)) {
    return false;
  } if (validator.isFunction(value1)
    && !validator.isPrefixed(value1)
    && validator.isFunction(value2)
    && !validator.isPrefixed(value2)) {
    return true;
  }

  return sameFunctionOrValue(validator, value1, value2);
}

function unitOrKeywordWithGlobal(propertyName) {
  var byKeyword = keywordWithGlobal(propertyName);

  return function(validator, value1, value2) {
    return unit$1(validator, value1, value2) || byKeyword(validator, value1, value2);
  };
}

function unitOrNumber(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true)
    && !(validator.isUnit(value2)
    || validator.isNumber(value2))) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } if ((validator.isUnit(value1)
    || validator.isNumber(value1))
    && !(validator.isUnit(value2)
    || validator.isNumber(value2))) {
    return false;
  } if (validator.isUnit(value2) || validator.isNumber(value2)) {
    return true;
  } if (validator.isUnit(value1) || validator.isNumber(value1)) {
    return false;
  } if (validator.isFunction(value1)
    && !validator.isPrefixed(value1)
    && validator.isFunction(value2)
    && !validator.isPrefixed(value2)) {
    return true;
  }

  return sameFunctionOrValue(validator, value1, value2);
}

function zIndex(validator, value1, value2) {
  if (!understandable(validator, value1, value2, 0, true) && !validator.isZIndex(value2)) {
    return false;
  } if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isZIndex(value2);
}

var canOverride$1 = {
  generic: {
    color: color$1,
    components: components,
    image: image,
    propertyName: propertyName$1,
    time: time$1,
    timingFunction: timingFunction,
    unit: unit$1,
    unitOrNumber: unitOrNumber
  },
  property: {
    animationDirection: keywordWithGlobal('animation-direction'),
    animationFillMode: keyword('animation-fill-mode'),
    animationIterationCount: animationIterationCount,
    animationName: animationName,
    animationPlayState: keywordWithGlobal('animation-play-state'),
    backgroundAttachment: keyword('background-attachment'),
    backgroundClip: keywordWithGlobal('background-clip'),
    backgroundOrigin: keyword('background-origin'),
    backgroundPosition: backgroundPosition,
    backgroundRepeat: keyword('background-repeat'),
    backgroundSize: backgroundSize,
    bottom: unitOrKeywordWithGlobal('bottom'),
    borderCollapse: keyword('border-collapse'),
    borderStyle: keywordWithGlobal('*-style'),
    clear: keywordWithGlobal('clear'),
    cursor: keywordWithGlobal('cursor'),
    display: keywordWithGlobal('display'),
    float: keywordWithGlobal('float'),
    left: unitOrKeywordWithGlobal('left'),
    fontFamily: fontFamily,
    fontStretch: keywordWithGlobal('font-stretch'),
    fontStyle: keywordWithGlobal('font-style'),
    fontVariant: keywordWithGlobal('font-variant'),
    fontWeight: keywordWithGlobal('font-weight'),
    listStyleType: keywordWithGlobal('list-style-type'),
    listStylePosition: keywordWithGlobal('list-style-position'),
    outlineStyle: keywordWithGlobal('*-style'),
    overflow: keywordWithGlobal('overflow'),
    position: keywordWithGlobal('position'),
    right: unitOrKeywordWithGlobal('right'),
    textAlign: keywordWithGlobal('text-align'),
    textDecoration: keywordWithGlobal('text-decoration'),
    textOverflow: keywordWithGlobal('text-overflow'),
    textShadow: textShadow,
    top: unitOrKeywordWithGlobal('top'),
    transform: sameFunctionOrValue,
    verticalAlign: unitOrKeywordWithGlobal('vertical-align'),
    visibility: keywordWithGlobal('visibility'),
    whiteSpace: keywordWithGlobal('white-space'),
    zIndex: zIndex
  }
};

var wrapSingle$1 = wrapForOptimizing$3.single;

var Token$l = token;

function deep(property) {
  var cloned = shallow(property);
  for (var i = property.components.length - 1; i >= 0; i--) {
    var component = shallow(property.components[i]);
    component.value = property.components[i].value.slice(0);
    cloned.components.unshift(component);
  }

  cloned.dirty = true;
  cloned.value = property.value.slice(0);

  return cloned;
}

function shallow(property) {
  var cloned = wrapSingle$1([
    Token$l.PROPERTY,
    [Token$l.PROPERTY_NAME, property.name]
  ]);
  cloned.important = property.important;
  cloned.hack = property.hack;
  cloned.unused = false;
  return cloned;
}

var clone = {
  deep: deep,
  shallow: shallow
};

var shallowClone$1 = clone.shallow;

var Token$k = token;
var Marker$b = marker;

function isInheritOnly(values) {
  for (var i = 0, l = values.length; i < l; i++) {
    var value = values[i][1];

    if (value != 'inherit' && value != Marker$b.COMMA && value != Marker$b.FORWARD_SLASH) { return false; }
  }

  return true;
}

function background$1(property, configuration, lastInMultiplex) {
  var components = property.components;
  var restored = [];
  var needsOne, needsBoth;

  function restoreValue(component) {
    Array.prototype.unshift.apply(restored, component.value);
  }

  function isDefaultValue(component) {
    var descriptor = configuration[component.name];

    if (descriptor.doubleValues && descriptor.defaultValue.length == 1) {
      return component.value[0][1] == descriptor.defaultValue[0]
        && (component.value[1]
          ? component.value[1][1] == descriptor.defaultValue[0]
          : true);
    } if (descriptor.doubleValues && descriptor.defaultValue.length != 1) {
      return component.value[0][1] == descriptor.defaultValue[0]
      && ((component.value[1] ? component.value[1][1] : component.value[0][1])
        == descriptor.defaultValue[1]);
    }
    return component.value[0][1] == descriptor.defaultValue;
  }

  for (var i = components.length - 1; i >= 0; i--) {
    var component = components[i];
    var isDefault = isDefaultValue(component);

    if (component.name == 'background-clip') {
      var originComponent = components[i - 1];
      var isOriginDefault = isDefaultValue(originComponent);

      needsOne = component.value[0][1] == originComponent.value[0][1];

      needsBoth = !needsOne && (
        (isOriginDefault && !isDefault)
        || (!isOriginDefault && !isDefault)
        || (!isOriginDefault && isDefault && component.value[0][1] != originComponent.value[0][1]));

      if (needsOne) {
        restoreValue(originComponent);
      } else if (needsBoth) {
        restoreValue(component);
        restoreValue(originComponent);
      }

      i--;
    } else if (component.name == 'background-size') {
      var positionComponent = components[i - 1];
      var isPositionDefault = isDefaultValue(positionComponent);

      needsOne = !isPositionDefault && isDefault;

      needsBoth = !needsOne
        && (isPositionDefault && !isDefault || !isPositionDefault && !isDefault);

      if (needsOne) {
        restoreValue(positionComponent);
      } else if (needsBoth) {
        restoreValue(component);
        restored.unshift([Token$k.PROPERTY_VALUE, Marker$b.FORWARD_SLASH]);
        restoreValue(positionComponent);
      } else if (positionComponent.value.length == 1) {
        restoreValue(positionComponent);
      }

      i--;
    } else {
      if (isDefault || configuration[component.name].multiplexLastOnly && !lastInMultiplex) { continue; }

      restoreValue(component);
    }
  }

  if (restored.length === 0 && property.value.length == 1 && property.value[0][1] == '0') { restored.push(property.value[0]); }

  if (restored.length === 0) { restored.push([Token$k.PROPERTY_VALUE, configuration[property.name].defaultValue]); }

  if (isInheritOnly(restored)) { return [restored[0]]; }

  return restored;
}

function borderRadius$1(property) {
  if (property.multiplex) {
    var horizontal = shallowClone$1(property);
    var vertical = shallowClone$1(property);

    for (var i = 0; i < 4; i++) {
      var component = property.components[i];

      var horizontalComponent = shallowClone$1(property);
      horizontalComponent.value = [component.value[0]];
      horizontal.components.push(horizontalComponent);

      var verticalComponent = shallowClone$1(property);
      // FIXME: only shorthand compactor (see breakup#borderRadius) knows that border radius
      // longhands have two values, whereas tokenizer does not care about populating 2nd value
      // if it's missing, hence this fallback
      verticalComponent.value = [component.value[1] || component.value[0]];
      vertical.components.push(verticalComponent);
    }

    var horizontalValues = fourValues(horizontal);
    var verticalValues = fourValues(vertical);

    if (horizontalValues.length == verticalValues.length
        && horizontalValues[0][1] == verticalValues[0][1]
        && (horizontalValues.length > 1 ? horizontalValues[1][1] == verticalValues[1][1] : true)
        && (horizontalValues.length > 2 ? horizontalValues[2][1] == verticalValues[2][1] : true)
        && (horizontalValues.length > 3 ? horizontalValues[3][1] == verticalValues[3][1] : true)) {
      return horizontalValues;
    }
    return horizontalValues.concat([[Token$k.PROPERTY_VALUE, Marker$b.FORWARD_SLASH]]).concat(verticalValues);
  }
  return fourValues(property);
}

function font(property, configuration) {
  var components = property.components;
  var restored = [];
  var component;
  var componentIndex = 0;
  var fontFamilyIndex = 0;

  if (property.value[0][1].indexOf(Marker$b.INTERNAL) === 0) {
    property.value[0][1] = property.value[0][1].substring(Marker$b.INTERNAL.length);
    return property.value;
  }

  // first four components are optional
  while (componentIndex < 4) {
    component = components[componentIndex];

    if (component.value[0][1] != configuration[component.name].defaultValue) {
      Array.prototype.push.apply(restored, component.value);
    }

    componentIndex++;
  }

  // then comes font-size
  Array.prototype.push.apply(restored, components[componentIndex].value);
  componentIndex++;

  // then may come line-height
  if (components[componentIndex].value[0][1] != configuration[components[componentIndex].name].defaultValue) {
    Array.prototype.push.apply(restored, [[Token$k.PROPERTY_VALUE, Marker$b.FORWARD_SLASH]]);
    Array.prototype.push.apply(restored, components[componentIndex].value);
  }

  componentIndex++;

  // then comes font-family
  while (components[componentIndex].value[fontFamilyIndex]) {
    restored.push(components[componentIndex].value[fontFamilyIndex]);

    if (components[componentIndex].value[fontFamilyIndex + 1]) {
      restored.push([Token$k.PROPERTY_VALUE, Marker$b.COMMA]);
    }

    fontFamilyIndex++;
  }

  if (isInheritOnly(restored)) {
    return [restored[0]];
  }

  return restored;
}

function fourValues(property) {
  var components = property.components;
  var value1 = components[0].value[0];
  var value2 = components[1].value[0];
  var value3 = components[2].value[0];
  var value4 = components[3].value[0];

  if (value1[1] == value2[1] && value1[1] == value3[1] && value1[1] == value4[1]) {
    return [value1];
  } if (value1[1] == value3[1] && value2[1] == value4[1]) {
    return [value1, value2];
  } if (value2[1] == value4[1]) {
    return [value1, value2, value3];
  }
  return [value1, value2, value3, value4];
}

function multiplex(restoreWith) {
  return function(property, configuration) {
    if (!property.multiplex) { return restoreWith(property, configuration, true); }

    var multiplexSize = 0;
    var restored = [];
    var componentMultiplexSoFar = {};
    var i, l;

    // At this point we don't know what's the multiplex size, e.g. how many background layers are there
    for (i = 0, l = property.components[0].value.length; i < l; i++) {
      if (property.components[0].value[i][1] == Marker$b.COMMA) { multiplexSize++; }
    }

    for (i = 0; i <= multiplexSize; i++) {
      var _property = shallowClone$1(property);

      // We split multiplex into parts and restore them one by one
      for (var j = 0, m = property.components.length; j < m; j++) {
        var componentToClone = property.components[j];
        var _component = shallowClone$1(componentToClone);
        _property.components.push(_component);

        // The trick is some properties has more than one value, so we iterate over values looking for
        // a multiplex separator - a comma
        for (var k = componentMultiplexSoFar[_component.name] || 0, n = componentToClone.value.length; k < n; k++) {
          if (componentToClone.value[k][1] == Marker$b.COMMA) {
            componentMultiplexSoFar[_component.name] = k + 1;
            break;
          }

          _component.value.push(componentToClone.value[k]);
        }
      }

      // No we can restore shorthand value
      var lastInMultiplex = i == multiplexSize;
      var _restored = restoreWith(_property, configuration, lastInMultiplex);
      Array.prototype.push.apply(restored, _restored);

      if (i < multiplexSize) { restored.push([Token$k.PROPERTY_VALUE, Marker$b.COMMA]); }
    }

    return restored;
  };
}

function withoutDefaults(property, configuration) {
  var components = property.components;
  var restored = [];

  for (var i = components.length - 1; i >= 0; i--) {
    var component = components[i];
    var descriptor = configuration[component.name];

    if (component.value[0][1] != descriptor.defaultValue || ('keepUnlessDefault' in descriptor) && !isDefault(components, configuration, descriptor.keepUnlessDefault)) {
      restored.unshift(component.value[0]);
    }
  }

  if (restored.length === 0) { restored.push([Token$k.PROPERTY_VALUE, configuration[property.name].defaultValue]); }

  if (isInheritOnly(restored)) { return [restored[0]]; }

  return restored;
}

function isDefault(components, configuration, propertyName) {
  var component;
  var i, l;

  for (i = 0, l = components.length; i < l; i++) {
    component = components[i];

    if (component.name == propertyName && component.value[0][1] == configuration[propertyName].defaultValue) {
      return true;
    }
  }

  return false;
}

var restore$1 = {
  background: background$1,
  borderRadius: borderRadius$1,
  font: font,
  fourValues: fourValues,
  multiplex: multiplex,
  withoutDefaults: withoutDefaults
};

var override$5 = override_1;

var INTEGER_PATTERN = /^\d+$/;

var ALL_UNITS = ['*', 'all'];
var DEFAULT_PRECISION = 'off'; // all precision changes are disabled
var DIRECTIVES_SEPARATOR = ','; // e.g. *=5,px=3
var DIRECTIVE_VALUE_SEPARATOR = '='; // e.g. *=5

function roundingPrecisionFrom$1(source) {
  return override$5(defaults$1(DEFAULT_PRECISION), buildPrecisionFrom(source));
}

function defaults$1(value) {
  return {
    ch: value,
    cm: value,
    em: value,
    ex: value,
    in: value,
    mm: value,
    pc: value,
    pt: value,
    px: value,
    q: value,
    rem: value,
    vh: value,
    vmax: value,
    vmin: value,
    vw: value,
    '%': value
  };
}

function buildPrecisionFrom(source) {
  if (source === null || source === undefined) {
    return {};
  }

  if (typeof source == 'boolean') {
    return {};
  }

  if (typeof source == 'number' && source == -1) {
    return defaults$1(DEFAULT_PRECISION);
  }

  if (typeof source == 'number') {
    return defaults$1(source);
  }

  if (typeof source == 'string' && INTEGER_PATTERN.test(source)) {
    return defaults$1(parseInt(source));
  }

  if (typeof source == 'string' && source == DEFAULT_PRECISION) {
    return defaults$1(DEFAULT_PRECISION);
  }

  if (typeof source == 'object') {
    return source;
  }

  return source
    .split(DIRECTIVES_SEPARATOR)
    .reduce(function(accumulator, directive) {
      var directiveParts = directive.split(DIRECTIVE_VALUE_SEPARATOR);
      var name = directiveParts[0];
      var value = parseInt(directiveParts[1]);

      if (Number.isNaN(value) || value == -1) {
        value = DEFAULT_PRECISION;
      }

      if (ALL_UNITS.indexOf(name) > -1) {
        accumulator = override$5(accumulator, defaults$1(value));
      } else {
        accumulator[name] = value;
      }

      return accumulator;
    }, {});
}

var roundingPrecision = {
  DEFAULT: DEFAULT_PRECISION,
  roundingPrecisionFrom: roundingPrecisionFrom$1
};

var roundingPrecisionFrom = roundingPrecision.roundingPrecisionFrom;

var override$4 = override_1;

var OptimizationLevel$j = {
  Zero: '0',
  One: '1',
  Two: '2'
};

var DEFAULTS$1 = {};

DEFAULTS$1[OptimizationLevel$j.Zero] = {};
DEFAULTS$1[OptimizationLevel$j.One] = {
  cleanupCharsets: true,
  normalizeUrls: true,
  optimizeBackground: true,
  optimizeBorderRadius: true,
  optimizeFilter: true,
  optimizeFontWeight: true,
  optimizeOutline: true,
  removeEmpty: true,
  removeNegativePaddings: true,
  removeQuotes: true,
  removeWhitespace: true,
  replaceMultipleZeros: true,
  replaceTimeUnits: true,
  replaceZeroUnits: true,
  roundingPrecision: roundingPrecisionFrom(undefined),
  selectorsSortingMethod: 'standard',
  specialComments: 'all',
  tidyAtRules: true,
  tidyBlockScopes: true,
  tidySelectors: true,
  variableValueOptimizers: []
};
DEFAULTS$1[OptimizationLevel$j.Two] = {
  mergeAdjacentRules: true,
  mergeIntoShorthands: true,
  mergeMedia: true,
  mergeNonAdjacentRules: true,
  mergeSemantically: false,
  overrideProperties: true,
  removeEmpty: true,
  reduceNonAdjacentRules: true,
  removeDuplicateFontRules: true,
  removeDuplicateMediaBlocks: true,
  removeDuplicateRules: true,
  removeUnusedAtRules: false,
  restructureRules: false,
  skipProperties: []
};

var ALL_KEYWORD_1 = '*';
var ALL_KEYWORD_2 = 'all';
var FALSE_KEYWORD_1 = 'false';
var FALSE_KEYWORD_2 = 'off';
var TRUE_KEYWORD_1 = 'true';
var TRUE_KEYWORD_2 = 'on';

var LIST_VALUE_SEPARATOR = ',';
var OPTION_SEPARATOR = ';';
var OPTION_VALUE_SEPARATOR = ':';

function optimizationLevelFrom$1(source) {
  var level = override$4(DEFAULTS$1, {});
  var Zero = OptimizationLevel$j.Zero;
  var One = OptimizationLevel$j.One;
  var Two = OptimizationLevel$j.Two;

  if (undefined === source) {
    delete level[Two];
    return level;
  }

  if (typeof source == 'string') {
    source = parseInt(source);
  }

  if (typeof source == 'number' && source === parseInt(Two)) {
    return level;
  }

  if (typeof source == 'number' && source === parseInt(One)) {
    delete level[Two];
    return level;
  }

  if (typeof source == 'number' && source === parseInt(Zero)) {
    delete level[Two];
    delete level[One];
    return level;
  }

  if (typeof source == 'object') {
    source = covertValuesToHashes(source);
  }

  if (One in source && 'roundingPrecision' in source[One]) {
    source[One].roundingPrecision = roundingPrecisionFrom(source[One].roundingPrecision);
  }

  if (Two in source && 'skipProperties' in source[Two] && typeof (source[Two].skipProperties) == 'string') {
    source[Two].skipProperties = source[Two].skipProperties.split(LIST_VALUE_SEPARATOR);
  }

  if (Zero in source || One in source || Two in source) {
    level[Zero] = override$4(level[Zero], source[Zero]);
  }

  if (One in source && ALL_KEYWORD_1 in source[One]) {
    level[One] = override$4(level[One], defaults(One, normalizeValue(source[One][ALL_KEYWORD_1])));
    delete source[One][ALL_KEYWORD_1];
  }

  if (One in source && ALL_KEYWORD_2 in source[One]) {
    level[One] = override$4(level[One], defaults(One, normalizeValue(source[One][ALL_KEYWORD_2])));
    delete source[One][ALL_KEYWORD_2];
  }

  if (One in source || Two in source) {
    level[One] = override$4(level[One], source[One]);
  } else {
    delete level[One];
  }

  if (Two in source && ALL_KEYWORD_1 in source[Two]) {
    level[Two] = override$4(level[Two], defaults(Two, normalizeValue(source[Two][ALL_KEYWORD_1])));
    delete source[Two][ALL_KEYWORD_1];
  }

  if (Two in source && ALL_KEYWORD_2 in source[Two]) {
    level[Two] = override$4(level[Two], defaults(Two, normalizeValue(source[Two][ALL_KEYWORD_2])));
    delete source[Two][ALL_KEYWORD_2];
  }

  if (Two in source) {
    level[Two] = override$4(level[Two], source[Two]);
  } else {
    delete level[Two];
  }

  return level;
}

function defaults(level, value) {
  var options = override$4(DEFAULTS$1[level], {});
  var key;

  for (key in options) {
    if (typeof options[key] == 'boolean') {
      options[key] = value;
    }
  }

  return options;
}

function normalizeValue(value) {
  switch (value) {
  case FALSE_KEYWORD_1:
  case FALSE_KEYWORD_2:
    return false;
  case TRUE_KEYWORD_1:
  case TRUE_KEYWORD_2:
    return true;
  default:
    return value;
  }
}

function covertValuesToHashes(source) {
  var clonedSource = override$4(source, {});
  var level;
  var i;

  for (i = 0; i <= 2; i++) {
    level = '' + i;

    if (level in clonedSource && (clonedSource[level] === undefined || clonedSource[level] === false)) {
      delete clonedSource[level];
    }

    if (level in clonedSource && clonedSource[level] === true) {
      clonedSource[level] = {};
    }

    if (level in clonedSource && typeof clonedSource[level] == 'string') {
      clonedSource[level] = covertToHash(clonedSource[level], level);
    }
  }

  return clonedSource;
}

function covertToHash(asString, level) {
  return asString
    .split(OPTION_SEPARATOR)
    .reduce(function(accumulator, directive) {
      var parts = directive.split(OPTION_VALUE_SEPARATOR);
      var name = parts[0];
      var value = parts[1];
      var normalizedValue = normalizeValue(value);

      if (ALL_KEYWORD_1 == name || ALL_KEYWORD_2 == name) {
        accumulator = override$4(accumulator, defaults(level, normalizedValue));
      } else {
        accumulator[name] = normalizedValue;
      }

      return accumulator;
    }, {});
}

var optimizationLevel = {
  OptimizationLevel: OptimizationLevel$j,
  optimizationLevelFrom: optimizationLevelFrom$1
};

var OptimizationLevel$i = optimizationLevel.OptimizationLevel;

var plugin$j = {
  level1: {
    property: function background(_rule, property, options) {
      var values = property.value;

      if (!options.level[OptimizationLevel$i.One].optimizeBackground) {
        return;
      }

      if (values.length == 1 && values[0][1] == 'none') {
        values[0][1] = '0 0';
      }

      if (values.length == 1 && values[0][1] == 'transparent') {
        values[0][1] = '0 0';
      }
    }
  }
};

var background = plugin$j;

var plugin$i = {
  level1: {
    property: function boxShadow(_rule, property) {
      var values = property.value;

      // remove multiple zeros
      if (values.length == 4 && values[0][1] === '0' && values[1][1] === '0' && values[2][1] === '0' && values[3][1] === '0') {
        property.value.splice(2);
        property.dirty = true;
      }
    }
  }
};

var boxShadow = plugin$i;

var OptimizationLevel$h = optimizationLevel.OptimizationLevel;

var plugin$h = {
  level1: {
    property: function borderRadius(_rule, property, options) {
      var values = property.value;

      if (!options.level[OptimizationLevel$h.One].optimizeBorderRadius) {
        return;
      }

      if (values.length == 3 && values[1][1] == '/' && values[0][1] == values[2][1]) {
        property.value.splice(1);
        property.dirty = true;
      } else if (values.length == 5 && values[2][1] == '/' && values[0][1] == values[3][1] && values[1][1] == values[4][1]) {
        property.value.splice(2);
        property.dirty = true;
      } else if (values.length == 7 && values[3][1] == '/' && values[0][1] == values[4][1] && values[1][1] == values[5][1] && values[2][1] == values[6][1]) {
        property.value.splice(3);
        property.dirty = true;
      } else if (values.length == 9 && values[4][1] == '/' && values[0][1] == values[5][1] && values[1][1] == values[6][1] && values[2][1] == values[7][1] && values[3][1] == values[8][1]) {
        property.value.splice(4);
        property.dirty = true;
      }
    }
  }
};

var borderRadius = plugin$h;

var OptimizationLevel$g = optimizationLevel.OptimizationLevel;

var ALPHA_OR_CHROMA_FILTER_PATTERN = /progid:DXImageTransform\.Microsoft\.(Alpha|Chroma)(\W)/;
var NO_SPACE_AFTER_COMMA_PATTERN = /,(\S)/g;
var WHITESPACE_AROUND_EQUALS_PATTERN = / ?= ?/g;

var plugin$g = {
  level1: {
    property: function filter(_rule, property, options) {
      if (!options.compatibility.properties.ieFilters) {
        return;
      }

      if (!options.level[OptimizationLevel$g.One].optimizeFilter) {
        return;
      }

      if (property.value.length == 1) {
        property.value[0][1] = property.value[0][1].replace(
          ALPHA_OR_CHROMA_FILTER_PATTERN,
          function(match, filter, suffix) {
            return filter.toLowerCase() + suffix;
          }
        );
      }

      property.value[0][1] = property.value[0][1]
        .replace(NO_SPACE_AFTER_COMMA_PATTERN, ', $1')
        .replace(WHITESPACE_AROUND_EQUALS_PATTERN, '=');
    }
  }
};

var filter = plugin$g;

var OptimizationLevel$f = optimizationLevel.OptimizationLevel;

var plugin$f = {
  level1: {
    property: function fontWeight(_rule, property, options) {
      var value = property.value[0][1];

      if (!options.level[OptimizationLevel$f.One].optimizeFontWeight) {
        return;
      }

      if (value == 'normal') {
        value = '400';
      } else if (value == 'bold') {
        value = '700';
      }

      property.value[0][1] = value;
    }
  }
};

var fontWeight = plugin$f;

var OptimizationLevel$e = optimizationLevel.OptimizationLevel;

var plugin$e = {
  level1: {
    property: function margin(_rule, property, options) {
      var values = property.value;

      if (!options.level[OptimizationLevel$e.One].replaceMultipleZeros) {
        return;
      }

      // remove multiple zeros
      if (values.length == 4 && values[0][1] === '0' && values[1][1] === '0' && values[2][1] === '0' && values[3][1] === '0') {
        property.value.splice(1);
        property.dirty = true;
      }
    }
  }
};

var margin = plugin$e;

var OptimizationLevel$d = optimizationLevel.OptimizationLevel;

var plugin$d = {
  level1: {
    property: function outline(_rule, property, options) {
      var values = property.value;

      if (!options.level[OptimizationLevel$d.One].optimizeOutline) {
        return;
      }

      if (values.length == 1 && values[0][1] == 'none') {
        values[0][1] = '0';
      }
    }
  }
};

var outline = plugin$d;

var OptimizationLevel$c = optimizationLevel.OptimizationLevel;

function isNegative(value) {
  return value && value[1][0] == '-' && parseFloat(value[1]) < 0;
}

var plugin$c = {
  level1: {
    property: function padding(_rule, property, options) {
      var values = property.value;

      // remove multiple zeros
      if (values.length == 4 && values[0][1] === '0' && values[1][1] === '0' && values[2][1] === '0' && values[3][1] === '0') {
        property.value.splice(1);
        property.dirty = true;
      }

      // remove negative paddings
      if (options.level[OptimizationLevel$c.One].removeNegativePaddings
        && (
          isNegative(property.value[0])
          || isNegative(property.value[1])
          || isNegative(property.value[2])
          || isNegative(property.value[3])
        )) {
        property.unused = true;
      }
    }
  }
};

var padding = plugin$c;

var propertyOptimizers$1 = {
  background: background.level1.property,
  boxShadow: boxShadow.level1.property,
  borderRadius: borderRadius.level1.property,
  filter: filter.level1.property,
  fontWeight: fontWeight.level1.property,
  margin: margin.level1.property,
  outline: outline.level1.property,
  padding: padding.level1.property
};

var COLORS = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#0ff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000',
  blanchedalmond: '#ffebcd',
  blue: '#00f',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#0ff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#f0f',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#0f0',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#f00',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#fff',
  whitesmoke: '#f5f5f5',
  yellow: '#ff0',
  yellowgreen: '#9acd32'
};

var toHex = {};
var toName = {};

for (var name in COLORS) {
  var hex = COLORS[name];

  if (name.length < hex.length) {
    toName[hex] = name;
  } else {
    toHex[name] = hex;
  }
}

var toHexPattern = new RegExp('(^| |,|\\))(' + Object.keys(toHex).join('|') + ')( |,|\\)|$)', 'ig');
var toNamePattern = new RegExp('(' + Object.keys(toName).join('|') + ')([^a-f0-9]|$)', 'ig');

function hexConverter(match, prefix, colorValue, suffix) {
  return prefix + toHex[colorValue.toLowerCase()] + suffix;
}

function nameConverter(match, colorValue, suffix) {
  return toName[colorValue.toLowerCase()] + suffix;
}

function shortenHex$1(value) {
  var hasHex = value.indexOf('#') > -1;
  var shortened = value.replace(toHexPattern, hexConverter);

  if (shortened != value) {
    shortened = shortened.replace(toHexPattern, hexConverter);
  }

  return hasHex
    ? shortened.replace(toNamePattern, nameConverter)
    : shortened;
}

var shortenHex_1 = shortenHex$1;

// HSL to RGB converter. Both methods adapted from:
// http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript

function hslToRgb(h, s, l) {
  var r, g, b;

  // normalize hue orientation b/w 0 and 360 degrees
  h %= 360;
  if (h < 0) { h += 360; }
  h = ~~h / 360;

  if (s < 0) { s = 0; } else if (s > 100) { s = 100; }
  s = ~~s / 100;

  if (l < 0) { l = 0; } else if (l > 100) { l = 100; }
  l = ~~l / 100;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5
      ? l * (1 + s)
      : l + s - l * s;
    var p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [~~(r * 255), ~~(g * 255), ~~(b * 255)];
}

function hueToRgb(p, q, t) {
  if (t < 0) { t += 1; }
  if (t > 1) { t -= 1; }
  if (t < 1 / 6) { return p + (q - p) * 6 * t; }
  if (t < 1 / 2) { return q; }
  if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
  return p;
}

function shortenHsl$1(hue, saturation, lightness) {
  var asRgb = hslToRgb(hue, saturation, lightness);
  var redAsHex = asRgb[0].toString(16);
  var greenAsHex = asRgb[1].toString(16);
  var blueAsHex = asRgb[2].toString(16);

  return '#'
    + ((redAsHex.length == 1 ? '0' : '') + redAsHex)
    + ((greenAsHex.length == 1 ? '0' : '') + greenAsHex)
    + ((blueAsHex.length == 1 ? '0' : '') + blueAsHex);
}

var shortenHsl_1 = shortenHsl$1;

function shortenRgb$1(red, green, blue) {
  var normalizedRed = Math.max(0, Math.min(parseInt(red), 255));
  var normalizedGreen = Math.max(0, Math.min(parseInt(green), 255));
  var normalizedBlue = Math.max(0, Math.min(parseInt(blue), 255));

  // Credit: Asen  http://jsbin.com/UPUmaGOc/2/edit?js,console
  return '#' + ('00000' + (normalizedRed << 16 | normalizedGreen << 8 | normalizedBlue).toString(16)).slice(-6);
}

var shortenRgb_1 = shortenRgb$1;

var Marker$a = marker;

function is(value, separator, isSeparatorRegex) {
  return isSeparatorRegex
    ? separator.test(value)
    : value === separator;
}

function split$5(value, separator) {
  var openLevel = Marker$a.OPEN_ROUND_BRACKET;
  var closeLevel = Marker$a.CLOSE_ROUND_BRACKET;
  var level = 0;
  var cursor = 0;
  var lastStart = 0;
  var lastValue;
  var lastCharacter;
  var len = value.length;
  var parts = [];
  var isSeparatorRegex = typeof (separator) == 'object' && 'exec' in separator;

  if (!isSeparatorRegex && value.indexOf(separator) == -1) {
    return [value];
  }

  if (value.indexOf(openLevel) == -1) {
    return value.split(separator);
  }

  while (cursor < len) {
    if (value[cursor] == openLevel) {
      level++;
    } else if (value[cursor] == closeLevel) {
      level--;
    }

    if (level === 0 && cursor > 0 && cursor + 1 < len && is(value[cursor], separator, isSeparatorRegex)) {
      parts.push(value.substring(lastStart, cursor));

      if (isSeparatorRegex && separator.exec(value[cursor]).length > 1) {
        parts.push(value[cursor]);
      }

      lastStart = cursor + 1;
    }

    cursor++;
  }

  if (lastStart < cursor + 1) {
    lastValue = value.substring(lastStart);
    lastCharacter = lastValue[lastValue.length - 1];
    if (is(lastCharacter, separator, isSeparatorRegex)) {
      lastValue = lastValue.substring(0, lastValue.length - 1);
    }

    parts.push(lastValue);
  }

  return parts;
}

var split_1 = split$5;

var shortenHex = shortenHex_1;
var shortenHsl = shortenHsl_1;
var shortenRgb = shortenRgb_1;

var split$4 = split_1;

var ANY_COLOR_FUNCTION_PATTERN = /(rgb|rgba|hsl|hsla)\(([^()]+)\)/gi;
var COLOR_PREFIX_PATTERN = /#|rgb|hsl/gi;
var HEX_LONG_PATTERN = /(^|[^='"])#([0-9a-f]{6})/gi;
var HEX_SHORT_PATTERN = /(^|[^='"])#([0-9a-f]{3})/gi;
var HEX_VALUE_PATTERN = /[0-9a-f]/i;
var HSL_PATTERN = /hsl\((-?\d+),(-?\d+)%?,(-?\d+)%?\)/gi;
var RGBA_HSLA_PATTERN = /(rgb|hsl)a?\((-?\d+),(-?\d+%?),(-?\d+%?),(0*[1-9]+[0-9]*(\.?\d*)?)\)/gi;
var RGB_PATTERN = /rgb\((-?\d+),(-?\d+),(-?\d+)\)/gi;
var TRANSPARENT_FUNCTION_PATTERN = /(?:rgba|hsla)\(0,0%?,0%?,0\)/g;

var plugin$b = {
  level1: {
    value: function color(name, value, options) {
      if (!options.compatibility.properties.colors) {
        return value;
      }

      if (!value.match(COLOR_PREFIX_PATTERN)) {
        return shortenHex(value);
      }

      value = value
        .replace(RGBA_HSLA_PATTERN, function(match, colorFn, p1, p2, p3, alpha) {
          return (parseInt(alpha) >= 1 ? colorFn + '(' + [p1, p2, p3].join(',') + ')' : match);
        })
        .replace(RGB_PATTERN, function(match, red, green, blue) {
          return shortenRgb(red, green, blue);
        })
        .replace(HSL_PATTERN, function(match, hue, saturation, lightness) {
          return shortenHsl(hue, saturation, lightness);
        })
        .replace(HEX_LONG_PATTERN, function(match, prefix, color, at, inputValue) {
          var suffix = inputValue[at + match.length];

          if (suffix && HEX_VALUE_PATTERN.test(suffix)) {
            return match;
          } if (color[0] == color[1] && color[2] == color[3] && color[4] == color[5]) {
            return (prefix + '#' + color[0] + color[2] + color[4]).toLowerCase();
          }
          return (prefix + '#' + color).toLowerCase();
        })
        .replace(HEX_SHORT_PATTERN, function(match, prefix, color) {
          return prefix + '#' + color.toLowerCase();
        })
        .replace(ANY_COLOR_FUNCTION_PATTERN, function(match, colorFunction, colorDef) {
          var tokens = colorDef.split(',');
          var colorFnLowercase = colorFunction && colorFunction.toLowerCase();
          var applies = (colorFnLowercase == 'hsl' && tokens.length == 3)
            || (colorFnLowercase == 'hsla' && tokens.length == 4)
            || (colorFnLowercase == 'rgb' && tokens.length === 3 && colorDef.indexOf('%') > 0)
            || (colorFnLowercase == 'rgba' && tokens.length == 4 && tokens[0].indexOf('%') > 0);

          if (!applies) {
            return match;
          }

          if (tokens[1].indexOf('%') == -1) {
            tokens[1] += '%';
          }

          if (tokens[2].indexOf('%') == -1) {
            tokens[2] += '%';
          }

          return colorFunction + '(' + tokens.join(',') + ')';
        });

      if (options.compatibility.colors.opacity && name.indexOf('background') == -1) {
        value = value.replace(TRANSPARENT_FUNCTION_PATTERN, function(match) {
          if (split$4(value, ',').pop().indexOf('gradient(') > -1) {
            return match;
          }

          return 'transparent';
        });
      }

      return shortenHex(value);
    }
  }
};

var color = plugin$b;

var ZERO_DEG_PATTERN = /\(0deg\)/g;

var plugin$a = {
  level1: {
    value: function degrees(_name, value, options) {
      if (!options.compatibility.properties.zeroUnits) {
        return value;
      }

      if (value.indexOf('0deg') == -1) {
        return value;
      }

      return value.replace(ZERO_DEG_PATTERN, '(0)');
    }
  }
};

var degrees = plugin$a;

var URL_PREFIX_PATTERN$4 = /^url\(/i;

function startsAsUrl$4(value) {
  return URL_PREFIX_PATTERN$4.test(value);
}

var startsAsUrl_1 = startsAsUrl$4;

var split$3 = split_1;
var startsAsUrl$3 = startsAsUrl_1;

var OptimizationLevel$b = optimizationLevel.OptimizationLevel;

var EXPRESSION_PATTERN = /^expression\(.*\)$/;
var ANY_FUNCTION_PATTERN$1 = /^(-(?:moz|ms|o|webkit)-[a-z-]+|[a-z-]+)\((.+)\)$/;
var TOKEN_SEPARATOR_PATTERN$1 = /([\s,/])/;

var DOT_ZERO_PATTERN = /(^|\D)\.0+(\D|$)/g;
var FRACTION_PATTERN = /\.([1-9]*)0+(\D|$)/g;
var LEADING_ZERO_FRACTION_PATTERN = /(^|\D)0\.(\d)/g;
var MINUS_ZERO_FRACTION_PATTERN = /([^\w\d-]|^)-0([^.]|$)/g;
var ZERO_PREFIXED_UNIT_PATTERN = /(^|\s)0+([1-9])/g;

function optimizeRecursively(value) {
  var functionTokens;
  var tokens;

  if (startsAsUrl$3(value)) {
    return value;
  }

  if (EXPRESSION_PATTERN.test(value)) {
    return value;
  }

  functionTokens = ANY_FUNCTION_PATTERN$1.exec(value);

  if (!functionTokens) {
    return optimizeFractions(value);
  }

  tokens = split$3(functionTokens[2], TOKEN_SEPARATOR_PATTERN$1)
    .map(function(token) { return optimizeRecursively(token); });

  return functionTokens[1] + '(' + tokens.join('') + ')';
}

function optimizeFractions(value) {
  if (value.indexOf('0') == -1) {
    return value;
  }

  if (value.indexOf('-') > -1) {
    value = value
      .replace(MINUS_ZERO_FRACTION_PATTERN, '$10$2')
      .replace(MINUS_ZERO_FRACTION_PATTERN, '$10$2');
  }

  return value
    .replace(ZERO_PREFIXED_UNIT_PATTERN, '$1$2')
    .replace(DOT_ZERO_PATTERN, '$10$2')
    .replace(FRACTION_PATTERN, function(match, nonZeroPart, suffix) {
      return (nonZeroPart.length > 0 ? '.' : '') + nonZeroPart + suffix;
    })
    .replace(LEADING_ZERO_FRACTION_PATTERN, '$1.$2');
}

var plugin$9 = {
  level1: {
    value: function fraction(name, value, options) {
      if (!options.level[OptimizationLevel$b.One].replaceZeroUnits) {
        return value;
      }

      return optimizeRecursively(value);
    }
  }
};

var fraction = plugin$9;

var plugin$8 = {
  level1: {
    value: function precision(_name, value, options) {
      if (!options.precision.enabled || value.indexOf('.') === -1) {
        return value;
      }

      return value
        .replace(options.precision.decimalPointMatcher, '$1$2$3')
        .replace(options.precision.zeroMatcher, function(match, integerPart, fractionPart, unit) {
          var multiplier = options.precision.units[unit].multiplier;
          var parsedInteger = parseInt(integerPart);
          var integer = Number.isNaN(parsedInteger) ? 0 : parsedInteger;
          var fraction = parseFloat(fractionPart);

          return Math.round((integer + fraction) * multiplier) / multiplier + unit;
        });
    }
  }
};

var precision = plugin$8;

var OptimizationLevel$a = optimizationLevel.OptimizationLevel;

var LOCAL_PREFIX_PATTERN = /^local\(/i;
var QUOTED_PATTERN = /^('.*'|".*")$/;
var QUOTED_BUT_SAFE_PATTERN = /^['"][a-zA-Z][a-zA-Z\d\-_]+['"]$/;
// eslint-disable-next-line max-len
var GENERIC_FONT_FAMILY_PATTERN = /^['"](?:cursive|default|emoji|fangsong|fantasy|inherit|initial|math|monospace|revert|revert-layer|sans-serif|serif|system-ui|ui-monospace|ui-rounded|ui-sans-serif|ui-serif|unset)['"]$/;

var plugin$7 = {
  level1: {
    value: function textQuotes(name, value, options) {
      if ((name == 'font-family' || name == 'font') && GENERIC_FONT_FAMILY_PATTERN.test(value)) {
        return value;
      }

      if (!options.level[OptimizationLevel$a.One].removeQuotes) {
        return value;
      }

      if (!QUOTED_PATTERN.test(value) && !LOCAL_PREFIX_PATTERN.test(value)) {
        return value;
      }

      return QUOTED_BUT_SAFE_PATTERN.test(value)
        ? value.substring(1, value.length - 1)
        : value;
    }
  }
};

var textQuotes = plugin$7;

var OptimizationLevel$9 = optimizationLevel.OptimizationLevel;

var TIME_VALUE = /^(-?[\d.]+)(m?s)$/;

var plugin$6 = {
  level1: {
    value: function time(name, value, options) {
      if (!options.level[OptimizationLevel$9.One].replaceTimeUnits) {
        return value;
      }

      if (!TIME_VALUE.test(value)) {
        return value;
      }

      return value.replace(TIME_VALUE, function(match, val, unit) {
        var newValue;

        if (unit == 'ms') {
          newValue = parseInt(val) / 1000 + 's';
        } else if (unit == 's') {
          newValue = parseFloat(val) * 1000 + 'ms';
        }

        return newValue.length < match.length ? newValue : match;
      });
    }
  }
};

var time = plugin$6;

var WHOLE_PIXEL_VALUE = /(?:^|\s|\()(-?\d+)px/;

var plugin$5 = {
  level1: {
    value: function unit(_name, value, options) {
      if (!WHOLE_PIXEL_VALUE.test(value)) {
        return value;
      }

      return value.replace(WHOLE_PIXEL_VALUE, function(match, val) {
        var newValue;
        var intVal = parseInt(val);

        if (intVal === 0) {
          return match;
        }

        if (options.compatibility.properties.shorterLengthUnits
          && options.compatibility.units.pt
          && intVal * 3 % 4 === 0) {
          newValue = intVal * 3 / 4 + 'pt';
        }

        if (options.compatibility.properties.shorterLengthUnits
          && options.compatibility.units.pc
          && intVal % 16 === 0) {
          newValue = intVal / 16 + 'pc';
        }

        if (options.compatibility.properties.shorterLengthUnits
          && options.compatibility.units.in
          && intVal % 96 === 0) {
          newValue = intVal / 96 + 'in';
        }

        if (newValue) {
          newValue = match.substring(0, match.indexOf(val)) + newValue;
        }

        return newValue && newValue.length < match.length ? newValue : match;
      });
    }
  }
};

var unit = plugin$5;

var startsAsUrl$2 = startsAsUrl_1;

var OptimizationLevel$8 = optimizationLevel.OptimizationLevel;

var URL_PREFIX_PATTERN$3 = /^url\(/i;

var plugin$4 = {
  level1: {
    value: function urlPrefix(_name, value, options) {
      if (!options.level[OptimizationLevel$8.One].normalizeUrls) {
        return value;
      }

      if (!startsAsUrl$2(value)) {
        return value;
      }

      return value.replace(URL_PREFIX_PATTERN$3, 'url(');
    }
  }
};

var urlPrefix = plugin$4;

var QUOTED_URL_PATTERN = /^url\(['"].+['"]\)$/;
var QUOTED_URL_WITH_WHITESPACE_PATTERN = /^url\(['"].*[*\s()'"].*['"]\)$/;
var QUOTES_PATTERN = /["']/g;
var URL_DATA_PATTERN = /^url\(['"]data:[^;]+;charset/;

var plugin$3 = {
  level1: {
    value: function urlQuotes(_name, value, options) {
      if (options.compatibility.properties.urlQuotes) {
        return value;
      }

      return QUOTED_URL_PATTERN.test(value)
        && !QUOTED_URL_WITH_WHITESPACE_PATTERN.test(value)
        && !URL_DATA_PATTERN.test(value)
        ? value.replace(QUOTES_PATTERN, '')
        : value;
    }
  }
};

var urlQuotes = plugin$3;

var startsAsUrl$1 = startsAsUrl_1;

var WHITESPACE_PATTERN$1 = /\\?\n|\\?\r\n/g;
var WHITESPACE_PREFIX_PATTERN = /(\()\s+/g;
var WHITESPACE_SUFFIX_PATTERN = /\s+(\))/g;

var plugin$2 = {
  level1: {
    value: function urlWhitespace(_name, value) {
      if (!startsAsUrl$1(value)) {
        return value;
      }

      return value
        .replace(WHITESPACE_PATTERN$1, '')
        .replace(WHITESPACE_PREFIX_PATTERN, '$1')
        .replace(WHITESPACE_SUFFIX_PATTERN, '$1');
    }
  }
};

var urlWhitespace = plugin$2;

var OptimizationLevel$7 = optimizationLevel.OptimizationLevel;

var Marker$9 = marker;

var CALC_DIVISION_WHITESPACE_PATTERN = /\) ?\/ ?/g;
var COMMA_AND_SPACE_PATTERN = /, /g;
var LINE_BREAK_PATTERN = /\r?\n/g;
var MULTI_WHITESPACE_PATTERN = /\s+/g;
var FUNCTION_CLOSING_BRACE_WHITESPACE_PATTERN = /\s+(;?\))/g;
var FUNCTION_OPENING_BRACE_WHITESPACE_PATTERN = /(\(;?)\s+/g;
var VARIABLE_NAME_PATTERN = /^--\S+$/;
var VARIABLE_VALUE_PATTERN = /^var\(\s*--\S+\s*\)$/;

var plugin$1 = {
  level1: {
    value: function whitespace(name, value, options) {
      if (!options.level[OptimizationLevel$7.One].removeWhitespace) {
        return value;
      }

      if (VARIABLE_NAME_PATTERN.test(name) && !VARIABLE_VALUE_PATTERN.test(value)) {
        return value;
      }

      if ((value.indexOf(' ') == -1 && value.indexOf('\n') == -1) || value.indexOf('expression') === 0) {
        return value;
      }

      if (value.indexOf(Marker$9.SINGLE_QUOTE) > -1 || value.indexOf(Marker$9.DOUBLE_QUOTE) > -1) {
        return value;
      }

      value = value.replace(LINE_BREAK_PATTERN, '');
      value = value.replace(MULTI_WHITESPACE_PATTERN, ' ');

      if (value.indexOf('calc') > -1) {
        value = value.replace(CALC_DIVISION_WHITESPACE_PATTERN, ')/ ');
      }

      return value
        .replace(FUNCTION_OPENING_BRACE_WHITESPACE_PATTERN, '$1')
        .replace(FUNCTION_CLOSING_BRACE_WHITESPACE_PATTERN, '$1')
        .replace(COMMA_AND_SPACE_PATTERN, ',');
    }
  }
};

var whitespace = plugin$1;

var split$2 = split_1;

var ANY_FUNCTION_PATTERN = /^(-(?:moz|ms|o|webkit)-[a-z-]+|[a-z-]+)\((.+)\)$/;
var SKIP_FUNCTION_PATTERN = /^(?:-moz-calc|-webkit-calc|calc|rgb|hsl|rgba|hsla|min|max|clamp|expression)\(/;
var TOKEN_SEPARATOR_PATTERN = /([\s,/])/;

function removeRecursively(value, options) {
  var functionTokens;
  var tokens;

  if (SKIP_FUNCTION_PATTERN.test(value)) {
    return value;
  }

  functionTokens = ANY_FUNCTION_PATTERN.exec(value);

  if (!functionTokens) {
    return removeZeros(value, options);
  }

  tokens = split$2(functionTokens[2], TOKEN_SEPARATOR_PATTERN)
    .map(function(token) { return removeRecursively(token, options); });

  return functionTokens[1] + '(' + tokens.join('') + ')';
}

function removeZeros(value, options) {
  return value
    .replace(options.unitsRegexp, '$10$2')
    .replace(options.unitsRegexp, '$10$2');
}

var plugin = {
  level1: {
    value: function zero(name, value, options) {
      if (!options.compatibility.properties.zeroUnits) {
        return value;
      }

      if (value.indexOf('%') > 0 && (name == 'height' || name == 'max-height' || name == 'width' || name == 'max-width')) {
        return value;
      }

      return removeRecursively(value, options);
    }
  }
};

var zero = plugin;

var valueOptimizers$1 = {
  color: color.level1.value,
  degrees: degrees.level1.value,
  fraction: fraction.level1.value,
  precision: precision.level1.value,
  textQuotes: textQuotes.level1.value,
  time: time.level1.value,
  unit: unit.level1.value,
  urlPrefix: urlPrefix.level1.value,
  urlQuotes: urlQuotes.level1.value,
  urlWhiteSpace: urlWhitespace.level1.value,
  whiteSpace: whitespace.level1.value,
  zero: zero.level1.value
};

// Contains the interpretation of CSS properties, as used by the property optimizer

var breakUp = breakUp$1;
var canOverride = canOverride$1;
var restore = restore$1;

var propertyOptimizers = propertyOptimizers$1;
var valueOptimizers = valueOptimizers$1;

var override$3 = override_1;

// Properties to process
// Extend this object in order to add support for more properties in the optimizer.
//
// Each key in this object represents a CSS property and should be an object.
// Such an object contains properties that describe how the represented CSS property should be handled.
// Possible options:
//
// * components: array (Only specify for shorthand properties.)
//   Contains the names of the granular properties this shorthand compacts.
//
// * canOverride: function
//   Returns whether two tokens of this property can be merged with each other.
//   This property has no meaning for shorthands.
//
// * defaultValue: string
//   Specifies the default value of the property according to the CSS standard.
//   For shorthand, this is used when every component is set to its default value, therefore it should be the shortest possible default value of all the components.
//
// * shortestValue: string
//   Specifies the shortest possible value the property can possibly have.
//   (Falls back to defaultValue if unspecified.)
//
// * breakUp: function (Only specify for shorthand properties.)
//   Breaks the shorthand up to its components.
//
// * restore: function (Only specify for shorthand properties.)
//   Puts the shorthand together from its components.
//
var configuration$8 = {
  animation: {
    canOverride: canOverride.generic.components([
      canOverride.generic.time,
      canOverride.generic.timingFunction,
      canOverride.generic.time,
      canOverride.property.animationIterationCount,
      canOverride.property.animationDirection,
      canOverride.property.animationFillMode,
      canOverride.property.animationPlayState,
      canOverride.property.animationName
    ]),
    components: [
      'animation-duration',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
      'animation-fill-mode',
      'animation-play-state',
      'animation-name'
    ],
    breakUp: breakUp.multiplex(breakUp.animation),
    defaultValue: 'none',
    restore: restore.multiplex(restore.withoutDefaults),
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.textQuotes,
      valueOptimizers.time,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ],
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-delay': {
    canOverride: canOverride.generic.time,
    componentOf: [
      'animation'
    ],
    defaultValue: '0s',
    intoMultiplexMode: 'real',
    valueOptimizers: [
      valueOptimizers.time,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ],
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-direction': {
    canOverride: canOverride.property.animationDirection,
    componentOf: [
      'animation'
    ],
    defaultValue: 'normal',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-duration': {
    canOverride: canOverride.generic.time,
    componentOf: [
      'animation'
    ],
    defaultValue: '0s',
    intoMultiplexMode: 'real',
    keepUnlessDefault: 'animation-delay',
    valueOptimizers: [
      valueOptimizers.time,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ],
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-fill-mode': {
    canOverride: canOverride.property.animationFillMode,
    componentOf: [
      'animation'
    ],
    defaultValue: 'none',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-iteration-count': {
    canOverride: canOverride.property.animationIterationCount,
    componentOf: [
      'animation'
    ],
    defaultValue: '1',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-name': {
    canOverride: canOverride.property.animationName,
    componentOf: [
      'animation'
    ],
    defaultValue: 'none',
    intoMultiplexMode: 'real',
    valueOptimizers: [
      valueOptimizers.textQuotes
    ],
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-play-state': {
    canOverride: canOverride.property.animationPlayState,
    componentOf: [
      'animation'
    ],
    defaultValue: 'running',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-timing-function': {
    canOverride: canOverride.generic.timingFunction,
    componentOf: [
      'animation'
    ],
    defaultValue: 'ease',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  background: {
    canOverride: canOverride.generic.components([
      canOverride.generic.image,
      canOverride.property.backgroundPosition,
      canOverride.property.backgroundSize,
      canOverride.property.backgroundRepeat,
      canOverride.property.backgroundAttachment,
      canOverride.property.backgroundOrigin,
      canOverride.property.backgroundClip,
      canOverride.generic.color
    ]),
    components: [
      'background-image',
      'background-position',
      'background-size',
      'background-repeat',
      'background-attachment',
      'background-origin',
      'background-clip',
      'background-color'
    ],
    breakUp: breakUp.multiplex(breakUp.background),
    defaultValue: '0 0',
    propertyOptimizer: propertyOptimizers.background,
    restore: restore.multiplex(restore.background),
    shortestValue: '0',
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.urlWhiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.zero,
      valueOptimizers.color,
      valueOptimizers.urlPrefix,
      valueOptimizers.urlQuotes
    ]
  },
  'background-attachment': {
    canOverride: canOverride.property.backgroundAttachment,
    componentOf: [
      'background'
    ],
    defaultValue: 'scroll',
    intoMultiplexMode: 'real'
  },
  'background-clip': {
    canOverride: canOverride.property.backgroundClip,
    componentOf: [
      'background'
    ],
    defaultValue: 'border-box',
    intoMultiplexMode: 'real',
    shortestValue: 'border-box'
  },
  'background-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'background'
    ],
    defaultValue: 'transparent',
    intoMultiplexMode: 'real', // otherwise real color will turn into default since color appears in last multiplex only
    multiplexLastOnly: true,
    nonMergeableValue: 'none',
    shortestValue: 'red',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.color
    ]
  },
  'background-image': {
    canOverride: canOverride.generic.image,
    componentOf: [
      'background'
    ],
    defaultValue: 'none',
    intoMultiplexMode: 'default',
    valueOptimizers: [
      valueOptimizers.urlWhiteSpace,
      valueOptimizers.urlPrefix,
      valueOptimizers.urlQuotes,
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero,
      valueOptimizers.color
    ]
  },
  'background-origin': {
    canOverride: canOverride.property.backgroundOrigin,
    componentOf: [
      'background'
    ],
    defaultValue: 'padding-box',
    intoMultiplexMode: 'real',
    shortestValue: 'border-box'
  },
  'background-position': {
    canOverride: canOverride.property.backgroundPosition,
    componentOf: [
      'background'
    ],
    defaultValue: ['0', '0'],
    doubleValues: true,
    intoMultiplexMode: 'real',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'background-repeat': {
    canOverride: canOverride.property.backgroundRepeat,
    componentOf: [
      'background'
    ],
    defaultValue: ['repeat'],
    doubleValues: true,
    intoMultiplexMode: 'real'
  },
  'background-size': {
    canOverride: canOverride.property.backgroundSize,
    componentOf: [
      'background'
    ],
    defaultValue: ['auto'],
    doubleValues: true,
    intoMultiplexMode: 'real',
    shortestValue: '0 0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  bottom: {
    canOverride: canOverride.property.bottom,
    defaultValue: 'auto',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  border: {
    breakUp: breakUp.border,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.property.borderStyle,
      canOverride.generic.color
    ]),
    components: [
      'border-width',
      'border-style',
      'border-color'
    ],
    defaultValue: 'none',
    overridesShorthands: [
      'border-bottom',
      'border-left',
      'border-right',
      'border-top'
    ],
    restore: restore.withoutDefaults,
    shorthand: true,
    shorthandComponents: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.zero,
      valueOptimizers.color
    ]
  },
  'border-bottom': {
    breakUp: breakUp.border,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.property.borderStyle,
      canOverride.generic.color
    ]),
    components: [
      'border-bottom-width',
      'border-bottom-style',
      'border-bottom-color'
    ],
    defaultValue: 'none',
    restore: restore.withoutDefaults,
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.zero,
      valueOptimizers.color
    ]
  },
  'border-bottom-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'border-bottom',
      'border-color'
    ],
    defaultValue: 'none',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.color
    ]
  },
  'border-bottom-left-radius': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-radius'
    ],
    defaultValue: '0',
    propertyOptimizer: propertyOptimizers.borderRadius,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ],
    vendorPrefixes: [
      '-moz-',
      '-o-'
    ]
  },
  'border-bottom-right-radius': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-radius'
    ],
    defaultValue: '0',
    propertyOptimizer: propertyOptimizers.borderRadius,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ],
    vendorPrefixes: [
      '-moz-',
      '-o-'
    ]
  },
  'border-bottom-style': {
    canOverride: canOverride.property.borderStyle,
    componentOf: [
      'border-bottom',
      'border-style'
    ],
    defaultValue: 'none'
  },
  'border-bottom-width': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-bottom',
      'border-width'
    ],
    defaultValue: 'medium',
    oppositeTo: 'border-top-width',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'border-collapse': {
    canOverride: canOverride.property.borderCollapse,
    defaultValue: 'separate'
  },
  'border-color': {
    breakUp: breakUp.fourValues,
    canOverride: canOverride.generic.components([
      canOverride.generic.color,
      canOverride.generic.color,
      canOverride.generic.color,
      canOverride.generic.color
    ]),
    componentOf: [
      'border'
    ],
    components: [
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color'
    ],
    defaultValue: 'none',
    restore: restore.fourValues,
    shortestValue: 'red',
    shorthand: true,
    singleTypeComponents: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.color
    ]
  },
  'border-left': {
    breakUp: breakUp.border,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.property.borderStyle,
      canOverride.generic.color
    ]),
    components: [
      'border-left-width',
      'border-left-style',
      'border-left-color'
    ],
    defaultValue: 'none',
    restore: restore.withoutDefaults,
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.zero,
      valueOptimizers.color
    ]
  },
  'border-left-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'border-color',
      'border-left'
    ],
    defaultValue: 'none',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.color
    ]
  },
  'border-left-style': {
    canOverride: canOverride.property.borderStyle,
    componentOf: [
      'border-left',
      'border-style'
    ],
    defaultValue: 'none'
  },
  'border-left-width': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-left',
      'border-width'
    ],
    defaultValue: 'medium',
    oppositeTo: 'border-right-width',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'border-radius': {
    breakUp: breakUp.borderRadius,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit
    ]),
    components: [
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius'
    ],
    defaultValue: '0',
    propertyOptimizer: propertyOptimizers.borderRadius,
    restore: restore.borderRadius,
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ],
    vendorPrefixes: [
      '-moz-',
      '-o-'
    ]
  },
  'border-right': {
    breakUp: breakUp.border,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.property.borderStyle,
      canOverride.generic.color
    ]),
    components: [
      'border-right-width',
      'border-right-style',
      'border-right-color'
    ],
    defaultValue: 'none',
    restore: restore.withoutDefaults,
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.color
    ]
  },
  'border-right-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'border-color',
      'border-right'
    ],
    defaultValue: 'none',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.color
    ]
  },
  'border-right-style': {
    canOverride: canOverride.property.borderStyle,
    componentOf: [
      'border-right',
      'border-style'
    ],
    defaultValue: 'none'
  },
  'border-right-width': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-right',
      'border-width'
    ],
    defaultValue: 'medium',
    oppositeTo: 'border-left-width',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'border-style': {
    breakUp: breakUp.fourValues,
    canOverride: canOverride.generic.components([
      canOverride.property.borderStyle,
      canOverride.property.borderStyle,
      canOverride.property.borderStyle,
      canOverride.property.borderStyle
    ]),
    componentOf: [
      'border'
    ],
    components: [
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style'
    ],
    defaultValue: 'none',
    restore: restore.fourValues,
    shorthand: true,
    singleTypeComponents: true
  },
  'border-top': {
    breakUp: breakUp.border,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.property.borderStyle,
      canOverride.generic.color
    ]),
    components: [
      'border-top-width',
      'border-top-style',
      'border-top-color'
    ],
    defaultValue: 'none',
    restore: restore.withoutDefaults,
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.zero,
      valueOptimizers.color,
      valueOptimizers.unit
    ]
  },
  'border-top-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'border-color',
      'border-top'
    ],
    defaultValue: 'none',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.color
    ]
  },
  'border-top-left-radius': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-radius'
    ],
    defaultValue: '0',
    propertyOptimizer: propertyOptimizers.borderRadius,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ],
    vendorPrefixes: [
      '-moz-',
      '-o-'
    ]
  },
  'border-top-right-radius': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-radius'
    ],
    defaultValue: '0',
    propertyOptimizer: propertyOptimizers.borderRadius,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ],
    vendorPrefixes: [
      '-moz-',
      '-o-'
    ]
  },
  'border-top-style': {
    canOverride: canOverride.property.borderStyle,
    componentOf: [
      'border-style',
      'border-top'
    ],
    defaultValue: 'none'
  },
  'border-top-width': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-top',
      'border-width'
    ],
    defaultValue: 'medium',
    oppositeTo: 'border-bottom-width',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'border-width': {
    breakUp: breakUp.fourValues,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit
    ]),
    componentOf: [
      'border'
    ],
    components: [
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width'
    ],
    defaultValue: 'medium',
    restore: restore.fourValues,
    shortestValue: '0',
    shorthand: true,
    singleTypeComponents: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'box-shadow': {
    propertyOptimizer: propertyOptimizers.boxShadow,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero,
      valueOptimizers.color
    ],
    vendorPrefixes: [
      '-moz-',
      '-ms-',
      '-o-',
      '-webkit-'
    ]
  },
  clear: {
    canOverride: canOverride.property.clear,
    defaultValue: 'none'
  },
  clip: {
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  color: {
    canOverride: canOverride.generic.color,
    defaultValue: 'transparent',
    shortestValue: 'red',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.color
    ]
  },
  'column-gap': {
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  cursor: {
    canOverride: canOverride.property.cursor,
    defaultValue: 'auto'
  },
  display: { canOverride: canOverride.property.display },
  filter: {
    propertyOptimizer: propertyOptimizers.filter,
    valueOptimizers: [
      valueOptimizers.fraction
    ]
  },
  float: {
    canOverride: canOverride.property.float,
    defaultValue: 'none'
  },
  font: {
    breakUp: breakUp.font,
    canOverride: canOverride.generic.components([
      canOverride.property.fontStyle,
      canOverride.property.fontVariant,
      canOverride.property.fontWeight,
      canOverride.property.fontStretch,
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.property.fontFamily
    ]),
    components: [
      'font-style',
      'font-variant',
      'font-weight',
      'font-stretch',
      'font-size',
      'line-height',
      'font-family'
    ],
    restore: restore.font,
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.textQuotes
    ]
  },
  'font-family': {
    canOverride: canOverride.property.fontFamily,
    defaultValue: 'user|agent|specific',
    valueOptimizers: [
      valueOptimizers.textQuotes
    ]
  },
  'font-size': {
    canOverride: canOverride.generic.unit,
    defaultValue: 'medium',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.fraction
    ]
  },
  'font-stretch': {
    canOverride: canOverride.property.fontStretch,
    defaultValue: 'normal'
  },
  'font-style': {
    canOverride: canOverride.property.fontStyle,
    defaultValue: 'normal'
  },
  'font-variant': {
    canOverride: canOverride.property.fontVariant,
    defaultValue: 'normal'
  },
  'font-weight': {
    canOverride: canOverride.property.fontWeight,
    defaultValue: 'normal',
    propertyOptimizer: propertyOptimizers.fontWeight,
    shortestValue: '400'
  },
  gap: {
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  height: {
    canOverride: canOverride.generic.unit,
    defaultValue: 'auto',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  left: {
    canOverride: canOverride.property.left,
    defaultValue: 'auto',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'letter-spacing': {
    valueOptimizers: [
      valueOptimizers.fraction,
      valueOptimizers.zero
    ]
  },
  'line-height': {
    canOverride: canOverride.generic.unitOrNumber,
    defaultValue: 'normal',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.fraction,
      valueOptimizers.zero
    ]
  },
  'list-style': {
    canOverride: canOverride.generic.components([
      canOverride.property.listStyleType,
      canOverride.property.listStylePosition,
      canOverride.property.listStyleImage
    ]),
    components: [
      'list-style-type',
      'list-style-position',
      'list-style-image'
    ],
    breakUp: breakUp.listStyle,
    restore: restore.withoutDefaults,
    defaultValue: 'outside', // can't use 'disc' because that'd override default 'decimal' for <ol>
    shortestValue: 'none',
    shorthand: true
  },
  'list-style-image': {
    canOverride: canOverride.generic.image,
    componentOf: [
      'list-style'
    ],
    defaultValue: 'none'
  },
  'list-style-position': {
    canOverride: canOverride.property.listStylePosition,
    componentOf: [
      'list-style'
    ],
    defaultValue: 'outside',
    shortestValue: 'inside'
  },
  'list-style-type': {
    canOverride: canOverride.property.listStyleType,
    componentOf: [
      'list-style'
    ],
    // NOTE: we can't tell the real default value here, it's 'disc' for <ul> and 'decimal' for <ol>
    // this is a hack, but it doesn't matter because this value will be either overridden or
    // it will disappear at the final step anyway
    defaultValue: 'decimal|disc',
    shortestValue: 'none'
  },
  margin: {
    breakUp: breakUp.fourValues,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit
    ]),
    components: [
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left'
    ],
    defaultValue: '0',
    propertyOptimizer: propertyOptimizers.margin,
    restore: restore.fourValues,
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'margin-bottom': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'margin'
    ],
    defaultValue: '0',
    oppositeTo: 'margin-top',
    propertyOptimizer: propertyOptimizers.margin,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'margin-inline-end': {
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'margin-inline-start': {
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'margin-left': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'margin'
    ],
    defaultValue: '0',
    oppositeTo: 'margin-right',
    propertyOptimizer: propertyOptimizers.margin,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'margin-right': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'margin'
    ],
    defaultValue: '0',
    oppositeTo: 'margin-left',
    propertyOptimizer: propertyOptimizers.margin,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'margin-top': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'margin'
    ],
    defaultValue: '0',
    oppositeTo: 'margin-bottom',
    propertyOptimizer: propertyOptimizers.margin,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'max-height': {
    canOverride: canOverride.generic.unit,
    defaultValue: 'none',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'max-width': {
    canOverride: canOverride.generic.unit,
    defaultValue: 'none',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'min-height': {
    canOverride: canOverride.generic.unit,
    defaultValue: '0',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'min-width': {
    canOverride: canOverride.generic.unit,
    defaultValue: '0',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  opacity: {
    valueOptimizers: [
      valueOptimizers.fraction,
      valueOptimizers.precision
    ]
  },
  outline: {
    canOverride: canOverride.generic.components([
      canOverride.generic.color,
      canOverride.property.outlineStyle,
      canOverride.generic.unit
    ]),
    components: [
      'outline-color',
      'outline-style',
      'outline-width'
    ],
    breakUp: breakUp.outline,
    restore: restore.withoutDefaults,
    defaultValue: '0',
    propertyOptimizer: propertyOptimizers.outline,
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'outline-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'outline'
    ],
    defaultValue: 'invert',
    shortestValue: 'red',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.color
    ]
  },
  'outline-style': {
    canOverride: canOverride.property.outlineStyle,
    componentOf: [
      'outline'
    ],
    defaultValue: 'none'
  },
  'outline-width': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'outline'
    ],
    defaultValue: 'medium',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  overflow: {
    canOverride: canOverride.property.overflow,
    defaultValue: 'visible'
  },
  'overflow-x': {
    canOverride: canOverride.property.overflow,
    defaultValue: 'visible'
  },
  'overflow-y': {
    canOverride: canOverride.property.overflow,
    defaultValue: 'visible'
  },
  padding: {
    breakUp: breakUp.fourValues,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit
    ]),
    components: [
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left'
    ],
    defaultValue: '0',
    propertyOptimizer: propertyOptimizers.padding,
    restore: restore.fourValues,
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'padding-bottom': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'padding'
    ],
    defaultValue: '0',
    oppositeTo: 'padding-top',
    propertyOptimizer: propertyOptimizers.padding,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'padding-left': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'padding'
    ],
    defaultValue: '0',
    oppositeTo: 'padding-right',
    propertyOptimizer: propertyOptimizers.padding,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'padding-right': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'padding'
    ],
    defaultValue: '0',
    oppositeTo: 'padding-left',
    propertyOptimizer: propertyOptimizers.padding,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'padding-top': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'padding'
    ],
    defaultValue: '0',
    oppositeTo: 'padding-bottom',
    propertyOptimizer: propertyOptimizers.padding,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  position: {
    canOverride: canOverride.property.position,
    defaultValue: 'static'
  },
  right: {
    canOverride: canOverride.property.right,
    defaultValue: 'auto',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'row-gap': {
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  src: {
    valueOptimizers: [
      valueOptimizers.urlWhiteSpace,
      valueOptimizers.urlPrefix,
      valueOptimizers.urlQuotes
    ]
  },
  'stroke-width': {
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'text-align': {
    canOverride: canOverride.property.textAlign,
    // NOTE: we can't tell the real default value here, as it depends on default text direction
    // this is a hack, but it doesn't matter because this value will be either overridden or
    // it will disappear anyway
    defaultValue: 'left|right'
  },
  'text-decoration': {
    canOverride: canOverride.property.textDecoration,
    defaultValue: 'none'
  },
  'text-indent': {
    canOverride: canOverride.property.textOverflow,
    defaultValue: 'none',
    valueOptimizers: [
      valueOptimizers.fraction,
      valueOptimizers.zero
    ]
  },
  'text-overflow': {
    canOverride: canOverride.property.textOverflow,
    defaultValue: 'none'
  },
  'text-shadow': {
    canOverride: canOverride.property.textShadow,
    defaultValue: 'none',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.zero,
      valueOptimizers.color
    ]
  },
  top: {
    canOverride: canOverride.property.top,
    defaultValue: 'auto',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  transform: {
    canOverride: canOverride.property.transform,
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.degrees,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ],
    vendorPrefixes: [
      '-moz-',
      '-ms-',
      '-o-',
      '-webkit-'
    ]
  },
  transition: {
    breakUp: breakUp.multiplex(breakUp.transition),
    canOverride: canOverride.generic.components([
      canOverride.property.transitionProperty,
      canOverride.generic.time,
      canOverride.generic.timingFunction,
      canOverride.generic.time
    ]),
    components: [
      'transition-property',
      'transition-duration',
      'transition-timing-function',
      'transition-delay'
    ],
    defaultValue: 'none',
    restore: restore.multiplex(restore.withoutDefaults),
    shorthand: true,
    valueOptimizers: [
      valueOptimizers.time,
      valueOptimizers.fraction
    ],
    vendorPrefixes: [
      '-moz-',
      '-ms-',
      '-o-',
      '-webkit-'
    ]
  },
  'transition-delay': {
    canOverride: canOverride.generic.time,
    componentOf: [
      'transition'
    ],
    defaultValue: '0s',
    intoMultiplexMode: 'real',
    valueOptimizers: [
      valueOptimizers.time
    ],
    vendorPrefixes: [
      '-moz-',
      '-ms-',
      '-o-',
      '-webkit-'
    ]
  },
  'transition-duration': {
    canOverride: canOverride.generic.time,
    componentOf: [
      'transition'
    ],
    defaultValue: '0s',
    intoMultiplexMode: 'real',
    keepUnlessDefault: 'transition-delay',
    valueOptimizers: [
      valueOptimizers.time,
      valueOptimizers.fraction
    ],
    vendorPrefixes: [
      '-moz-',
      '-ms-',
      '-o-',
      '-webkit-'
    ]
  },
  'transition-property': {
    canOverride: canOverride.generic.propertyName,
    componentOf: [
      'transition'
    ],
    defaultValue: 'all',
    intoMultiplexMode: 'placeholder',
    placeholderValue: '_', // it's a short value that won't match any property and still be a valid `transition-property`
    vendorPrefixes: [
      '-moz-',
      '-ms-',
      '-o-',
      '-webkit-'
    ]
  },
  'transition-timing-function': {
    canOverride: canOverride.generic.timingFunction,
    componentOf: [
      'transition'
    ],
    defaultValue: 'ease',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-ms-',
      '-o-',
      '-webkit-'
    ]
  },
  'vertical-align': {
    canOverride: canOverride.property.verticalAlign,
    defaultValue: 'baseline',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  visibility: {
    canOverride: canOverride.property.visibility,
    defaultValue: 'visible'
  },
  '-webkit-tap-highlight-color': {
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.color
    ]
  },
  '-webkit-margin-end': {
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'white-space': {
    canOverride: canOverride.property.whiteSpace,
    defaultValue: 'normal'
  },
  width: {
    canOverride: canOverride.generic.unit,
    defaultValue: 'auto',
    shortestValue: '0',
    valueOptimizers: [
      valueOptimizers.whiteSpace,
      valueOptimizers.fraction,
      valueOptimizers.precision,
      valueOptimizers.unit,
      valueOptimizers.zero
    ]
  },
  'z-index': {
    canOverride: canOverride.property.zIndex,
    defaultValue: 'auto'
  }
};

// generate vendor-prefixed configuration
var vendorPrefixedConfiguration = {};

function cloneDescriptor(propertyName, prefix) {
  var clonedDescriptor = override$3(configuration$8[propertyName], {});

  if ('componentOf' in clonedDescriptor) {
    clonedDescriptor.componentOf = clonedDescriptor.componentOf.map(function(shorthandName) {
      return prefix + shorthandName;
    });
  }

  if ('components' in clonedDescriptor) {
    clonedDescriptor.components = clonedDescriptor.components.map(function(longhandName) {
      return prefix + longhandName;
    });
  }

  if ('keepUnlessDefault' in clonedDescriptor) {
    clonedDescriptor.keepUnlessDefault = prefix + clonedDescriptor.keepUnlessDefault;
  }

  return clonedDescriptor;
}

for (var propertyName in configuration$8) {
  var descriptor = configuration$8[propertyName];

  if (!('vendorPrefixes' in descriptor)) {
    continue;
  }

  for (var i = 0; i < descriptor.vendorPrefixes.length; i++) {
    var prefix = descriptor.vendorPrefixes[i];
    var clonedDescriptor = cloneDescriptor(propertyName, prefix);
    delete clonedDescriptor.vendorPrefixes;

    vendorPrefixedConfiguration[prefix + propertyName] = clonedDescriptor;
  }

  delete descriptor.vendorPrefixes;
}

var configuration_1 = override$3(configuration$8, vendorPrefixedConfiguration);

var emptyCharacter = '';

var Breaks = format.Breaks;
var Spaces = format.Spaces;

var Marker$8 = marker;
var Token$j = token;

function supportsAfterClosingBrace(token) {
  return token[1][1] == 'background' || token[1][1] == 'transform' || token[1][1] == 'src';
}

function afterClosingBrace(token, valueIndex) {
  return token[valueIndex][1][token[valueIndex][1].length - 1] == Marker$8.CLOSE_ROUND_BRACKET;
}

function afterComma(token, valueIndex) {
  return token[valueIndex][1] == Marker$8.COMMA;
}

function afterSlash(token, valueIndex) {
  return token[valueIndex][1] == Marker$8.FORWARD_SLASH;
}

function beforeComma(token, valueIndex) {
  return token[valueIndex + 1] && token[valueIndex + 1][1] == Marker$8.COMMA;
}

function beforeSlash(token, valueIndex) {
  return token[valueIndex + 1] && token[valueIndex + 1][1] == Marker$8.FORWARD_SLASH;
}

function inFilter(token) {
  return token[1][1] == 'filter' || token[1][1] == '-ms-filter';
}

function disallowsSpace(context, token, valueIndex) {
  return !context.spaceAfterClosingBrace
    && supportsAfterClosingBrace(token)
    && afterClosingBrace(token, valueIndex)
    || beforeSlash(token, valueIndex)
    || afterSlash(token, valueIndex)
    || beforeComma(token, valueIndex)
    || afterComma(token, valueIndex);
}

function rules$1(context, tokens) {
  var store = context.store;

  for (var i = 0, l = tokens.length; i < l; i++) {
    store(context, tokens[i]);

    if (i < l - 1) {
      store(context, comma(context));
    }
  }
}

function body$1(context, tokens) {
  var lastPropertyAt = lastPropertyIndex(tokens);

  for (var i = 0, l = tokens.length; i < l; i++) {
    property$1(context, tokens, i, lastPropertyAt);
  }
}

function lastPropertyIndex(tokens) {
  var index = tokens.length - 1;

  for (; index >= 0; index--) {
    if (tokens[index][0] != Token$j.COMMENT) {
      break;
    }
  }

  return index;
}

function property$1(context, tokens, position, lastPropertyAt) {
  var store = context.store;
  var token = tokens[position];

  var propertyValue = token[2];
  var isPropertyBlock = propertyValue && propertyValue[0] === Token$j.PROPERTY_BLOCK;

  var needsSemicolon;
  if (context.format) {
    if (context.format.semicolonAfterLastProperty || isPropertyBlock) {
      needsSemicolon = true;
    } else if (position < lastPropertyAt) {
      needsSemicolon = true;
    } else {
      needsSemicolon = false;
    }
  } else {
    needsSemicolon = position < lastPropertyAt || isPropertyBlock;
  }

  var isLast = position === lastPropertyAt;

  switch (token[0]) {
  case Token$j.AT_RULE:
    store(context, token);
    store(context, semicolon(context, Breaks.AfterProperty, false));
    break;
  case Token$j.AT_RULE_BLOCK:
    rules$1(context, token[1]);
    store(context, openBrace(context, Breaks.AfterRuleBegins, true));
    body$1(context, token[2]);
    store(context, closeBrace(context, Breaks.AfterRuleEnds, false, isLast));
    break;
  case Token$j.COMMENT:
    store(context, token);
    store(context, breakFor(context, Breaks.AfterComment) + context.indentWith);
    break;
  case Token$j.PROPERTY:
    store(context, token[1]);
    store(context, colon(context));
    if (propertyValue) {
      value$1(context, token);
    }
    store(
      context,
      needsSemicolon ? semicolon(context, Breaks.AfterProperty, isLast) : emptyCharacter
    );
    break;
  case Token$j.RAW:
    store(context, token);
  }
}

function value$1(context, token) {
  var store = context.store;
  var j, m;

  if (token[2][0] == Token$j.PROPERTY_BLOCK) {
    store(context, openBrace(context, Breaks.AfterBlockBegins, false));
    body$1(context, token[2][1]);
    store(context, closeBrace(context, Breaks.AfterBlockEnds, false, true));
  } else {
    for (j = 2, m = token.length; j < m; j++) {
      store(context, token[j]);

      if (j < m - 1 && (inFilter(token) || !disallowsSpace(context, token, j))) {
        store(context, Marker$8.SPACE);
      }
    }
  }
}

function breakFor(context, where) {
  return context.format ? context.format.breaks[where] : emptyCharacter;
}

function allowsSpace(context, where) {
  return context.format && context.format.spaces[where];
}

function openBrace(context, where, needsPrefixSpace) {
  if (context.format) {
    context.indentBy += context.format.indentBy;
    context.indentWith = context.format.indentWith.repeat(context.indentBy);
    return (
      needsPrefixSpace
      && allowsSpace(context, Spaces.BeforeBlockBegins) ? Marker$8.SPACE : emptyCharacter
    ) + Marker$8.OPEN_CURLY_BRACKET
      + breakFor(context, where)
      + context.indentWith;
  }
  return Marker$8.OPEN_CURLY_BRACKET;
}

function closeBrace(context, where, beforeBlockEnd, isLast) {
  if (context.format) {
    context.indentBy -= context.format.indentBy;
    context.indentWith = context.format.indentWith.repeat(context.indentBy);
    return (
      beforeBlockEnd
        ? breakFor(context, Breaks.BeforeBlockEnds)
        : breakFor(context, Breaks.AfterProperty)
    ) + context.indentWith
      + Marker$8.CLOSE_CURLY_BRACKET
      + (isLast ? emptyCharacter : breakFor(context, where) + context.indentWith);
  }
  return Marker$8.CLOSE_CURLY_BRACKET;
}

function colon(context) {
  return context.format
    ? Marker$8.COLON + (allowsSpace(context, Spaces.BeforeValue) ? Marker$8.SPACE : emptyCharacter)
    : Marker$8.COLON;
}

function semicolon(context, where, isLast) {
  return context.format
    ? Marker$8.SEMICOLON + (isLast ? emptyCharacter : (breakFor(context, where) + context.indentWith))
    : Marker$8.SEMICOLON;
}

function comma(context) {
  return context.format
    ? Marker$8.COMMA + breakFor(context, Breaks.BetweenSelectors) + context.indentWith
    : Marker$8.COMMA;
}

function all$5(context, tokens) {
  var store = context.store;
  var token;
  var isLast;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];
    isLast = i == l - 1;

    switch (token[0]) {
    case Token$j.AT_RULE:
      store(context, token);
      store(context, semicolon(context, Breaks.AfterAtRule, isLast));
      break;
    case Token$j.AT_RULE_BLOCK:
      rules$1(context, token[1]);
      store(context, openBrace(context, Breaks.AfterRuleBegins, true));
      body$1(context, token[2]);
      store(context, closeBrace(context, Breaks.AfterRuleEnds, false, isLast));
      break;
    case Token$j.NESTED_BLOCK:
      rules$1(context, token[1]);
      store(context, openBrace(context, Breaks.AfterBlockBegins, true));
      all$5(context, token[2]);
      store(context, closeBrace(context, Breaks.AfterBlockEnds, true, isLast));
      break;
    case Token$j.COMMENT:
      store(context, token);
      store(context, breakFor(context, Breaks.AfterComment) + context.indentWith);
      break;
    case Token$j.RAW:
      store(context, token);
      break;
    case Token$j.RULE:
      rules$1(context, token[1]);
      store(context, openBrace(context, Breaks.AfterRuleBegins, true));
      body$1(context, token[2]);
      store(context, closeBrace(context, Breaks.AfterRuleEnds, false, isLast));
      break;
    }
  }
}

var helpers$1 = {
  all: all$5,
  body: body$1,
  property: property$1,
  rules: rules$1,
  value: value$1
};

var helpers = helpers$1;

function store$2(serializeContext, token) {
  serializeContext.output.push(typeof token == 'string' ? token : token[1]);
}

function context() {
  var newContext = {
    output: [],
    store: store$2
  };

  return newContext;
}

function all$4(tokens) {
  var oneTimeContext = context();
  helpers.all(oneTimeContext, tokens);
  return oneTimeContext.output.join('');
}

function body(tokens) {
  var oneTimeContext = context();
  helpers.body(oneTimeContext, tokens);
  return oneTimeContext.output.join('');
}

function property(tokens, position) {
  var oneTimeContext = context();
  helpers.property(oneTimeContext, tokens, position, true);
  return oneTimeContext.output.join('');
}

function rules(tokens) {
  var oneTimeContext = context();
  helpers.rules(oneTimeContext, tokens);
  return oneTimeContext.output.join('');
}

function value(tokens) {
  var oneTimeContext = context();
  helpers.value(oneTimeContext, tokens);
  return oneTimeContext.output.join('');
}

var oneTime = {
  all: all$4,
  body: body,
  property: property,
  rules: rules,
  value: value
};

var sortSelectors$2 = sortSelectors_1;
var tidyRules$2 = tidyRules_1;
var tidyBlock = tidyBlock_1;
var tidyAtRule = tidyAtRule_1;

var Hack = hack;
var removeUnused$1 = removeUnused_1;
var restoreFromOptimizing$4 = restoreFromOptimizing_1;
var wrapForOptimizing$2 = wrapForOptimizing$3.all;

var configuration$7 = configuration_1;
var optimizers = valueOptimizers$1;

var OptimizationLevel$6 = optimizationLevel.OptimizationLevel;

var Token$i = token;
var Marker$7 = marker;

var formatPosition$1 = formatPosition_1;

var serializeRules$9 = oneTime.rules;

var CHARSET_TOKEN = '@charset';
var CHARSET_REGEXP = new RegExp('^' + CHARSET_TOKEN, 'i');

var DEFAULT_ROUNDING_PRECISION = roundingPrecision.DEFAULT;

var VARIABLE_PROPERTY_NAME_PATTERN = /^--\S+$/;
var PROPERTY_NAME_PATTERN = /^(?:-chrome-|-[\w-]+\w|\w[\w-]+\w|\w{1,})$/;
var IMPORT_PREFIX_PATTERN$2 = /^@import/i;
var URL_PREFIX_PATTERN$2 = /^url\(/i;

function startsAsUrl(value) {
  return URL_PREFIX_PATTERN$2.test(value);
}

function isImport$3(token) {
  return IMPORT_PREFIX_PATTERN$2.test(token[1]);
}

function isLegacyFilter(property) {
  var value;

  if (property.name == 'filter' || property.name == '-ms-filter') {
    value = property.value[0][1];

    return value.indexOf('progid') > -1
      || value.indexOf('alpha') === 0
      || value.indexOf('chroma') === 0;
  }
  return false;
}

function noop$2() {}

function noopValueOptimizer(_name, value, _options) { return value; }

function optimizeBody(rule, properties, context) {
  var options = context.options;
  var valueOptimizers;
  var property, name, type, value;
  var propertyToken;
  var propertyOptimizer;
  var serializedRule = serializeRules$9(rule);
  var _properties = wrapForOptimizing$2(properties);
  var pluginValueOptimizers = context.options.plugins.level1Value;
  var pluginPropertyOptimizers = context.options.plugins.level1Property;
  var isVariable;
  var i, l;

  for (i = 0, l = _properties.length; i < l; i++) {
    var j, k, m, n;

    property = _properties[i];
    name = property.name;
    propertyOptimizer = configuration$7[name] && configuration$7[name].propertyOptimizer || noop$2;
    valueOptimizers = configuration$7[name] && configuration$7[name].valueOptimizers || [optimizers.whiteSpace];
    isVariable = VARIABLE_PROPERTY_NAME_PATTERN.test(name);

    if (isVariable) {
      valueOptimizers = options.variableOptimizers.length > 0
        ? options.variableOptimizers
        : [optimizers.whiteSpace];
    }

    if (!isVariable && !PROPERTY_NAME_PATTERN.test(name)) {
      propertyToken = property.all[property.position];
      context.warnings.push('Invalid property name \'' + name + '\' at ' + formatPosition$1(propertyToken[1][2][0]) + '. Ignoring.');
      property.unused = true;
      continue;
    }

    if (property.value.length === 0) {
      propertyToken = property.all[property.position];
      context.warnings.push('Empty property \'' + name + '\' at ' + formatPosition$1(propertyToken[1][2][0]) + '. Ignoring.');
      property.unused = true;
      continue;
    }

    if (property.hack && (
      (property.hack[0] == Hack.ASTERISK || property.hack[0] == Hack.UNDERSCORE)
        && !options.compatibility.properties.iePrefixHack
        || property.hack[0] == Hack.BACKSLASH && !options.compatibility.properties.ieSuffixHack
        || property.hack[0] == Hack.BANG && !options.compatibility.properties.ieBangHack)) {
      property.unused = true;
      continue;
    }

    if (!options.compatibility.properties.ieFilters && isLegacyFilter(property)) {
      property.unused = true;
      continue;
    }

    if (property.block) {
      optimizeBody(rule, property.value[0][1], context);
      continue;
    }

    for (j = 0, m = property.value.length; j < m; j++) {
      type = property.value[j][0];
      value = property.value[j][1];

      if (type == Token$i.PROPERTY_BLOCK) {
        property.unused = true;
        context.warnings.push('Invalid value token at ' + formatPosition$1(value[0][1][2][0]) + '. Ignoring.');
        break;
      }

      if (startsAsUrl(value) && !context.validator.isUrl(value)) {
        property.unused = true;
        context.warnings.push('Broken URL \'' + value + '\' at ' + formatPosition$1(property.value[j][2][0]) + '. Ignoring.');
        break;
      }

      for (k = 0, n = valueOptimizers.length; k < n; k++) {
        value = valueOptimizers[k](name, value, options);
      }

      for (k = 0, n = pluginValueOptimizers.length; k < n; k++) {
        value = pluginValueOptimizers[k](name, value, options);
      }

      property.value[j][1] = value;
    }

    propertyOptimizer(serializedRule, property, options);

    for (j = 0, m = pluginPropertyOptimizers.length; j < m; j++) {
      pluginPropertyOptimizers[j](serializedRule, property, options);
    }
  }

  restoreFromOptimizing$4(_properties);
  removeUnused$1(_properties);
  removeComments(properties, options);
}

function removeComments(tokens, options) {
  var token;
  var i;

  for (i = 0; i < tokens.length; i++) {
    token = tokens[i];

    if (token[0] != Token$i.COMMENT) {
      continue;
    }

    optimizeComment(token, options);

    if (token[1].length === 0) {
      tokens.splice(i, 1);
      i--;
    }
  }
}

function optimizeComment(token, options) {
  if (token[1][2] == Marker$7.EXCLAMATION && (options.level[OptimizationLevel$6.One].specialComments == 'all' || options.commentsKept < options.level[OptimizationLevel$6.One].specialComments)) {
    options.commentsKept++;
    return;
  }

  token[1] = [];
}

function cleanupCharsets(tokens) {
  var hasCharset = false;

  for (var i = 0, l = tokens.length; i < l; i++) {
    var token = tokens[i];

    if (token[0] != Token$i.AT_RULE) { continue; }

    if (!CHARSET_REGEXP.test(token[1])) { continue; }

    if (hasCharset || token[1].indexOf(CHARSET_TOKEN) == -1) {
      tokens.splice(i, 1);
      i--;
      l--;
    } else {
      hasCharset = true;
      tokens.splice(i, 1);
      tokens.unshift([Token$i.AT_RULE, token[1].replace(CHARSET_REGEXP, CHARSET_TOKEN)]);
    }
  }
}

function buildUnitRegexp(options) {
  var units = ['px', 'em', 'ex', 'cm', 'mm', 'in', 'pt', 'pc', '%'];
  var otherUnits = ['ch', 'rem', 'vh', 'vm', 'vmax', 'vmin', 'vw'];

  otherUnits.forEach(function(unit) {
    if (options.compatibility.units[unit]) {
      units.push(unit);
    }
  });

  return new RegExp('(^|\\s|\\(|,)0(?:' + units.join('|') + ')(\\W|$)', 'g');
}

function buildPrecisionOptions(roundingPrecision) {
  var precisionOptions = {
    matcher: null,
    units: {}
  };
  var optimizable = [];
  var unit;
  var value;

  for (unit in roundingPrecision) {
    value = roundingPrecision[unit];

    if (value != DEFAULT_ROUNDING_PRECISION) {
      precisionOptions.units[unit] = {};
      precisionOptions.units[unit].value = value;
      precisionOptions.units[unit].multiplier = 10 ** value;

      optimizable.push(unit);
    }
  }

  if (optimizable.length > 0) {
    precisionOptions.enabled = true;
    precisionOptions.decimalPointMatcher = new RegExp('(\\d)\\.($|' + optimizable.join('|') + ')($|\\W)', 'g');
    precisionOptions.zeroMatcher = new RegExp('(\\d*)(\\.\\d+)(' + optimizable.join('|') + ')', 'g');
  }

  return precisionOptions;
}

function buildVariableOptimizers(options) {
  return options.level[OptimizationLevel$6.One].variableValueOptimizers.map(function(optimizer) {
    if (typeof (optimizer) == 'string') {
      return optimizers[optimizer] || noopValueOptimizer;
    }

    return optimizer;
  });
}

function level1Optimize$1(tokens, context) {
  var options = context.options;
  var levelOptions = options.level[OptimizationLevel$6.One];
  var ie7Hack = options.compatibility.selectors.ie7Hack;
  var adjacentSpace = options.compatibility.selectors.adjacentSpace;
  var spaceAfterClosingBrace = options.compatibility.properties.spaceAfterClosingBrace;
  var format = options.format;
  var mayHaveCharset = false;
  var afterRules = false;

  options.unitsRegexp = options.unitsRegexp || buildUnitRegexp(options);
  options.precision = options.precision || buildPrecisionOptions(levelOptions.roundingPrecision);
  options.commentsKept = options.commentsKept || 0;
  options.variableOptimizers = options.variableOptimizers || buildVariableOptimizers(options);

  for (var i = 0, l = tokens.length; i < l; i++) {
    var token = tokens[i];

    switch (token[0]) {
    case Token$i.AT_RULE:
      token[1] = isImport$3(token) && afterRules ? '' : token[1];
      token[1] = levelOptions.tidyAtRules ? tidyAtRule(token[1]) : token[1];
      mayHaveCharset = true;
      break;
    case Token$i.AT_RULE_BLOCK:
      optimizeBody(token[1], token[2], context);
      afterRules = true;
      break;
    case Token$i.NESTED_BLOCK:
      token[1] = levelOptions.tidyBlockScopes ? tidyBlock(token[1], spaceAfterClosingBrace) : token[1];
      level1Optimize$1(token[2], context);
      afterRules = true;
      break;
    case Token$i.COMMENT:
      optimizeComment(token, options);
      break;
    case Token$i.RULE:
      token[1] = levelOptions.tidySelectors
        ? tidyRules$2(token[1], !ie7Hack, adjacentSpace, format, context.warnings)
        : token[1];
      token[1] = token[1].length > 1 ? sortSelectors$2(token[1], levelOptions.selectorsSortingMethod) : token[1];
      optimizeBody(token[1], token[2], context);
      afterRules = true;
      break;
    }

    if (token[0] == Token$i.COMMENT
      && token[1].length === 0
      || levelOptions.removeEmpty
      && (token[1].length === 0 || (token[2] && token[2].length === 0))) {
      tokens.splice(i, 1);
      i--;
      l--;
    }
  }

  if (levelOptions.cleanupCharsets && mayHaveCharset) {
    cleanupCharsets(tokens);
  }

  return tokens;
}

var optimize$3 = level1Optimize$1;

var Marker$6 = marker;
var split$1 = split_1;

var DEEP_SELECTOR_PATTERN = /\/deep\//;
var DOUBLE_COLON_PATTERN = /^::/;
var VENDOR_PREFIXED_PATTERN = /:(-moz-|-ms-|-o-|-webkit-)/;

var NOT_PSEUDO = ':not';
var PSEUDO_CLASSES_WITH_ARGUMENTS = [
  ':dir',
  ':lang',
  ':not',
  ':nth-child',
  ':nth-last-child',
  ':nth-last-of-type',
  ':nth-of-type'
];
var RELATION_PATTERN = /[>+~]/;
var UNMIXABLE_PSEUDO_CLASSES = [
  ':after',
  ':before',
  ':first-letter',
  ':first-line',
  ':lang'
];
var UNMIXABLE_PSEUDO_ELEMENTS = [
  '::after',
  '::before',
  '::first-letter',
  '::first-line'
];

var Level$1 = {
  DOUBLE_QUOTE: 'double-quote',
  SINGLE_QUOTE: 'single-quote',
  ROOT: 'root'
};

function isMergeable$4(selector, mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging) {
  var singleSelectors = split$1(selector, Marker$6.COMMA);
  var singleSelector;
  var i, l;

  for (i = 0, l = singleSelectors.length; i < l; i++) {
    singleSelector = singleSelectors[i];

    if (singleSelector.length === 0
        || isDeepSelector(singleSelector)
        || isVendorPrefixed(singleSelector)
        || (singleSelector.indexOf(Marker$6.COLON) > -1
          && !areMergeable(
            singleSelector,
            extractPseudoFrom(singleSelector),
            mergeablePseudoClasses,
            mergeablePseudoElements,
            multiplePseudoMerging
          ))) {
      return false;
    }
  }

  return true;
}

function isDeepSelector(selector) {
  return DEEP_SELECTOR_PATTERN.test(selector);
}

function isVendorPrefixed(selector) {
  return VENDOR_PREFIXED_PATTERN.test(selector);
}

function extractPseudoFrom(selector) {
  var list = [];
  var character;
  var buffer = [];
  var level = Level$1.ROOT;
  var roundBracketLevel = 0;
  var isQuoted;
  var isEscaped;
  var isPseudo = false;
  var isRelation;
  var wasColon = false;
  var index;
  var len;

  for (index = 0, len = selector.length; index < len; index++) {
    character = selector[index];

    isRelation = !isEscaped && RELATION_PATTERN.test(character);
    isQuoted = level == Level$1.DOUBLE_QUOTE || level == Level$1.SINGLE_QUOTE;

    if (isEscaped) {
      buffer.push(character);
    } else if (character == Marker$6.DOUBLE_QUOTE && level == Level$1.ROOT) {
      buffer.push(character);
      level = Level$1.DOUBLE_QUOTE;
    } else if (character == Marker$6.DOUBLE_QUOTE && level == Level$1.DOUBLE_QUOTE) {
      buffer.push(character);
      level = Level$1.ROOT;
    } else if (character == Marker$6.SINGLE_QUOTE && level == Level$1.ROOT) {
      buffer.push(character);
      level = Level$1.SINGLE_QUOTE;
    } else if (character == Marker$6.SINGLE_QUOTE && level == Level$1.SINGLE_QUOTE) {
      buffer.push(character);
      level = Level$1.ROOT;
    } else if (isQuoted) {
      buffer.push(character);
    } else if (character == Marker$6.OPEN_ROUND_BRACKET) {
      buffer.push(character);
      roundBracketLevel++;
    } else if (character == Marker$6.CLOSE_ROUND_BRACKET && roundBracketLevel == 1 && isPseudo) {
      buffer.push(character);
      list.push(buffer.join(''));
      roundBracketLevel--;
      buffer = [];
      isPseudo = false;
    } else if (character == Marker$6.CLOSE_ROUND_BRACKET) {
      buffer.push(character);
      roundBracketLevel--;
    } else if (character == Marker$6.COLON && roundBracketLevel === 0 && isPseudo && !wasColon) {
      list.push(buffer.join(''));
      buffer = [];
      buffer.push(character);
    } else if (character == Marker$6.COLON && roundBracketLevel === 0 && !wasColon) {
      buffer = [];
      buffer.push(character);
      isPseudo = true;
    } else if (character == Marker$6.SPACE && roundBracketLevel === 0 && isPseudo) {
      list.push(buffer.join(''));
      buffer = [];
      isPseudo = false;
    } else if (isRelation && roundBracketLevel === 0 && isPseudo) {
      list.push(buffer.join(''));
      buffer = [];
      isPseudo = false;
    } else {
      buffer.push(character);
    }

    isEscaped = character == Marker$6.BACK_SLASH;
    wasColon = character == Marker$6.COLON;
  }

  if (buffer.length > 0 && isPseudo) {
    list.push(buffer.join(''));
  }

  return list;
}

function areMergeable(selector, matches, mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging) {
  return areAllowed(matches, mergeablePseudoClasses, mergeablePseudoElements)
    && needArguments(matches)
    && (matches.length < 2 || !someIncorrectlyChained(selector, matches))
    && (matches.length < 2 || multiplePseudoMerging && allMixable(matches));
}

function areAllowed(matches, mergeablePseudoClasses, mergeablePseudoElements) {
  var match;
  var name;
  var i, l;

  for (i = 0, l = matches.length; i < l; i++) {
    match = matches[i];
    name = match.indexOf(Marker$6.OPEN_ROUND_BRACKET) > -1
      ? match.substring(0, match.indexOf(Marker$6.OPEN_ROUND_BRACKET))
      : match;

    if (mergeablePseudoClasses.indexOf(name) === -1 && mergeablePseudoElements.indexOf(name) === -1) {
      return false;
    }
  }

  return true;
}

function needArguments(matches) {
  var match;
  var name;
  var bracketOpensAt;
  var hasArguments;
  var i, l;

  for (i = 0, l = matches.length; i < l; i++) {
    match = matches[i];

    bracketOpensAt = match.indexOf(Marker$6.OPEN_ROUND_BRACKET);
    hasArguments = bracketOpensAt > -1;
    name = hasArguments
      ? match.substring(0, bracketOpensAt)
      : match;

    if (hasArguments && PSEUDO_CLASSES_WITH_ARGUMENTS.indexOf(name) == -1) {
      return false;
    }

    if (!hasArguments && PSEUDO_CLASSES_WITH_ARGUMENTS.indexOf(name) > -1) {
      return false;
    }
  }

  return true;
}

function someIncorrectlyChained(selector, matches) {
  var positionInSelector = 0;
  var match;
  var matchAt;
  var nextMatch;
  var nextMatchAt;
  var name;
  var nextName;
  var areChained;
  var i, l;

  for (i = 0, l = matches.length; i < l; i++) {
    match = matches[i];
    nextMatch = matches[i + 1];

    if (!nextMatch) {
      break;
    }

    matchAt = selector.indexOf(match, positionInSelector);
    nextMatchAt = selector.indexOf(match, matchAt + 1);
    positionInSelector = nextMatchAt;
    areChained = matchAt + match.length == nextMatchAt;

    if (areChained) {
      name = match.indexOf(Marker$6.OPEN_ROUND_BRACKET) > -1
        ? match.substring(0, match.indexOf(Marker$6.OPEN_ROUND_BRACKET))
        : match;
      nextName = nextMatch.indexOf(Marker$6.OPEN_ROUND_BRACKET) > -1
        ? nextMatch.substring(0, nextMatch.indexOf(Marker$6.OPEN_ROUND_BRACKET))
        : nextMatch;

      if (name != NOT_PSEUDO || nextName != NOT_PSEUDO) {
        return true;
      }
    }
  }

  return false;
}

function allMixable(matches) {
  var unmixableMatches = 0;
  var match;
  var i, l;

  for (i = 0, l = matches.length; i < l; i++) {
    match = matches[i];

    if (isPseudoElement(match)) {
      unmixableMatches += UNMIXABLE_PSEUDO_ELEMENTS.indexOf(match) > -1 ? 1 : 0;
    } else {
      unmixableMatches += UNMIXABLE_PSEUDO_CLASSES.indexOf(match) > -1 ? 1 : 0;
    }

    if (unmixableMatches > 1) {
      return false;
    }
  }

  return true;
}

function isPseudoElement(pseudo) {
  return DOUBLE_COLON_PATTERN.test(pseudo);
}

var isMergeable_1 = isMergeable$4;

var Marker$5 = marker;

function everyValuesPair$2(fn, left, right) {
  var leftSize = left.value.length;
  var rightSize = right.value.length;
  var total = Math.max(leftSize, rightSize);
  var lowerBound = Math.min(leftSize, rightSize) - 1;
  var leftValue;
  var rightValue;
  var position;

  for (position = 0; position < total; position++) {
    leftValue = left.value[position] && left.value[position][1] || leftValue;
    rightValue = right.value[position] && right.value[position][1] || rightValue;

    if (leftValue == Marker$5.COMMA || rightValue == Marker$5.COMMA) {
      continue;
    }

    if (!fn(leftValue, rightValue, position, position <= lowerBound)) {
      return false;
    }
  }

  return true;
}

var everyValuesPair_1 = everyValuesPair$2;

function hasInherit$2(property) {
  for (var i = property.value.length - 1; i >= 0; i--) {
    if (property.value[i][1] == 'inherit') { return true; }
  }

  return false;
}

var hasInherit_1 = hasInherit$2;

function hasSameValues$1(property) {
  var firstValue = property.value[0][1];
  var i, l;

  for (i = 1, l = property.value.length; i < l; i++) {
    if (property.value[i][1] != firstValue) {
      return false;
    }
  }

  return true;
}

var hasSameValues_1 = hasSameValues$1;

var configuration$6 = configuration_1;
var InvalidPropertyError = invalidPropertyError;

function populateComponents$3(properties, validator, warnings) {
  var component;
  var j, m;

  for (var i = properties.length - 1; i >= 0; i--) {
    var property = properties[i];
    var descriptor = configuration$6[property.name];

    if (!property.dynamic && descriptor && descriptor.shorthand) {
      if (onlyValueIsVariable(property, validator) || moreThanOneValueIsVariable(property, validator)) {
        property.optimizable = false;
        continue;
      }

      property.shorthand = true;
      property.dirty = true;

      try {
        property.components = descriptor.breakUp(property, configuration$6, validator);

        if (descriptor.shorthandComponents) {
          for (j = 0, m = property.components.length; j < m; j++) {
            component = property.components[j];
            component.components = configuration$6[component.name].breakUp(component, configuration$6, validator);
          }
        }
      } catch (e) {
        if (e instanceof InvalidPropertyError) {
          property.components = []; // this will set property.unused to true below
          warnings.push(e.message);
        } else {
          throw e;
        }
      }

      if (property.components.length > 0) {
        property.multiplex = property.components[0].multiplex;
      } else {
        property.unused = true;
      }
    }
  }
}

function onlyValueIsVariable(property, validator) {
  return property.value.length == 1 && validator.isVariable(property.value[0][1]);
}

function moreThanOneValueIsVariable(property, validator) {
  return property.value.length > 1
    && property.value.filter(
      function(value) {
        return validator.isVariable(value[1]);
      }
    ).length > 1;
}

var populateComponents_1 = populateComponents$3;

var configuration$5 = configuration_1;

function restoreWithComponents$3(property) {
  var descriptor = configuration$5[property.name];

  if (descriptor && descriptor.shorthand) {
    return descriptor.restore(property, configuration$5);
  }
  return property.value;
}

var restoreWithComponents_1 = restoreWithComponents$3;

var everyValuesPair$1 = everyValuesPair_1;
var hasInherit$1 = hasInherit_1;
var hasSameValues = hasSameValues_1;
var populateComponents$2 = populateComponents_1;

var configuration$4 = configuration_1;
var deepClone$1 = clone.deep;
var restoreWithComponents$2 = restoreWithComponents_1;

var restoreFromOptimizing$3 = restoreFromOptimizing_1;
var wrapSingle = wrapForOptimizing$3.single;

var serializeBody$5 = oneTime.body;
var Token$h = token;

function mergeIntoShorthands$1(properties, validator) {
  var candidates = {};
  var descriptor;
  var componentOf;
  var property;
  var i, l;
  var j, m;

  // there is no shorthand property made up of less than 3 longhands
  if (properties.length < 3) {
    return;
  }

  for (i = 0, l = properties.length; i < l; i++) {
    property = properties[i];
    descriptor = configuration$4[property.name];

    if (property.dynamic) {
      continue;
    }

    if (property.unused) {
      continue;
    }

    if (property.hack) {
      continue;
    }

    if (property.block) {
      continue;
    }

    if (descriptor && descriptor.singleTypeComponents && !hasSameValues(property)) {
      continue;
    }

    invalidateOrCompact(properties, i, candidates, validator);

    if (descriptor && descriptor.componentOf) {
      for (j = 0, m = descriptor.componentOf.length; j < m; j++) {
        componentOf = descriptor.componentOf[j];

        candidates[componentOf] = candidates[componentOf] || {};
        candidates[componentOf][property.name] = property;
      }
    }
  }

  invalidateOrCompact(properties, i, candidates, validator);
}

function invalidateOrCompact(properties, position, candidates, validator) {
  var invalidatedBy = properties[position];
  var shorthandName;
  var shorthandDescriptor;
  var candidateComponents;
  var replacedCandidates = [];
  var i;

  for (shorthandName in candidates) {
    if (undefined !== invalidatedBy && shorthandName == invalidatedBy.name) {
      continue;
    }

    shorthandDescriptor = configuration$4[shorthandName];
    candidateComponents = candidates[shorthandName];
    if (invalidatedBy && invalidates(candidates, shorthandName, invalidatedBy)) {
      delete candidates[shorthandName];
      continue;
    }

    if (shorthandDescriptor.components.length > Object.keys(candidateComponents).length) {
      continue;
    }

    if (mixedImportance(candidateComponents)) {
      continue;
    }

    if (!overridable(candidateComponents, shorthandName, validator)) {
      continue;
    }

    if (!mergeable(candidateComponents)) {
      continue;
    }

    if (mixedInherit(candidateComponents)) {
      replaceWithInheritBestFit(properties, candidateComponents, shorthandName, validator);
    } else {
      replaceWithShorthand(properties, candidateComponents, shorthandName, validator);
    }

    replacedCandidates.push(shorthandName);
  }

  for (i = replacedCandidates.length - 1; i >= 0; i--) {
    delete candidates[replacedCandidates[i]];
  }
}

function invalidates(candidates, shorthandName, invalidatedBy) {
  var shorthandDescriptor = configuration$4[shorthandName];
  var invalidatedByDescriptor = configuration$4[invalidatedBy.name];
  var componentName;

  if ('overridesShorthands' in shorthandDescriptor && shorthandDescriptor.overridesShorthands.indexOf(invalidatedBy.name) > -1) {
    return true;
  }

  if (invalidatedByDescriptor && 'componentOf' in invalidatedByDescriptor) {
    for (componentName in candidates[shorthandName]) {
      if (invalidatedByDescriptor.componentOf.indexOf(componentName) > -1) {
        return true;
      }
    }
  }

  return false;
}

function mixedImportance(components) {
  var important;
  var componentName;

  for (componentName in components) {
    if (undefined !== important && components[componentName].important != important) {
      return true;
    }

    important = components[componentName].important;
  }

  return false;
}

function overridable(components, shorthandName, validator) {
  var descriptor = configuration$4[shorthandName];
  var newValuePlaceholder = [
    Token$h.PROPERTY,
    [Token$h.PROPERTY_NAME, shorthandName],
    [Token$h.PROPERTY_VALUE, descriptor.defaultValue]
  ];
  var newProperty = wrapSingle(newValuePlaceholder);
  var component;
  var mayOverride;
  var i, l;

  populateComponents$2([newProperty], validator, []);

  for (i = 0, l = descriptor.components.length; i < l; i++) {
    component = components[descriptor.components[i]];
    mayOverride = configuration$4[component.name].canOverride || sameValue$1;

    if (!everyValuesPair$1(mayOverride.bind(null, validator), newProperty.components[i], component)) {
      return false;
    }
  }

  return true;
}

function sameValue$1(_validator, value1, value2) {
  return value1 === value2;
}

function mergeable(components) {
  var lastCount = null;
  var currentCount;
  var componentName;
  var component;
  var descriptor;
  var values;

  for (componentName in components) {
    component = components[componentName];
    descriptor = configuration$4[componentName];

    if (!('restore' in descriptor)) {
      continue;
    }

    restoreFromOptimizing$3([component.all[component.position]], restoreWithComponents$2);
    values = descriptor.restore(component, configuration$4);

    currentCount = values.length;

    if (lastCount !== null && currentCount !== lastCount) {
      return false;
    }

    lastCount = currentCount;
  }

  return true;
}

function mixedInherit(components) {
  var componentName;
  var lastValue = null;
  var currentValue;

  for (componentName in components) {
    currentValue = hasInherit$1(components[componentName]);

    if (lastValue !== null && lastValue !== currentValue) {
      return true;
    }

    lastValue = currentValue;
  }

  return false;
}

function replaceWithInheritBestFit(properties, candidateComponents, shorthandName, validator) {
  var viaLonghands = buildSequenceWithInheritLonghands(candidateComponents, shorthandName, validator);
  var viaShorthand = buildSequenceWithInheritShorthand(candidateComponents, shorthandName, validator);
  var longhandTokensSequence = viaLonghands[0];
  var shorthandTokensSequence = viaShorthand[0];
  var isLonghandsShorter = serializeBody$5(longhandTokensSequence).length < serializeBody$5(shorthandTokensSequence).length;
  var newTokensSequence = isLonghandsShorter ? longhandTokensSequence : shorthandTokensSequence;
  var newProperty = isLonghandsShorter ? viaLonghands[1] : viaShorthand[1];
  var newComponents = isLonghandsShorter ? viaLonghands[2] : viaShorthand[2];
  var lastComponent = candidateComponents[Object.keys(candidateComponents).pop()];
  var all = lastComponent.all;
  var insertAt = lastComponent.position;
  var componentName;
  var oldComponent;
  var newComponent;
  var newToken;

  newProperty.position = insertAt;
  newProperty.shorthand = true;
  newProperty.important = lastComponent.important;
  newProperty.multiplex = false;
  newProperty.dirty = true;
  newProperty.all = all;
  newProperty.all[insertAt] = newTokensSequence[0];

  properties.splice(insertAt, 1, newProperty);

  for (componentName in candidateComponents) {
    oldComponent = candidateComponents[componentName];
    oldComponent.unused = true;

    newProperty.multiplex = newProperty.multiplex || oldComponent.multiplex;

    if (oldComponent.name in newComponents) {
      newComponent = newComponents[oldComponent.name];
      newToken = findTokenIn(newTokensSequence, componentName);

      newComponent.position = all.length;
      newComponent.all = all;
      newComponent.all.push(newToken);

      properties.push(newComponent);
    }
  }
}

function buildSequenceWithInheritLonghands(components, shorthandName, validator) {
  var tokensSequence = [];
  var inheritComponents = {};
  var nonInheritComponents = {};
  var descriptor = configuration$4[shorthandName];
  var shorthandToken = [
    Token$h.PROPERTY,
    [Token$h.PROPERTY_NAME, shorthandName],
    [Token$h.PROPERTY_VALUE, descriptor.defaultValue]
  ];
  var newProperty = wrapSingle(shorthandToken);
  var component;
  var longhandToken;
  var newComponent;
  var nameMetadata;
  var i, l;

  populateComponents$2([newProperty], validator, []);

  for (i = 0, l = descriptor.components.length; i < l; i++) {
    component = components[descriptor.components[i]];

    if (hasInherit$1(component)) {
      longhandToken = component.all[component.position].slice(0, 2);
      Array.prototype.push.apply(longhandToken, component.value);
      tokensSequence.push(longhandToken);

      newComponent = deepClone$1(component);
      newComponent.value = inferComponentValue(components, newComponent.name);

      newProperty.components[i] = newComponent;
      inheritComponents[component.name] = deepClone$1(component);
    } else {
      newComponent = deepClone$1(component);
      newComponent.all = component.all;
      newProperty.components[i] = newComponent;

      nonInheritComponents[component.name] = component;
    }
  }

  newProperty.important = components[Object.keys(components).pop()].important;

  nameMetadata = joinMetadata(nonInheritComponents, 1);
  shorthandToken[1].push(nameMetadata);

  restoreFromOptimizing$3([newProperty], restoreWithComponents$2);

  shorthandToken = shorthandToken.slice(0, 2);
  Array.prototype.push.apply(shorthandToken, newProperty.value);

  tokensSequence.unshift(shorthandToken);

  return [tokensSequence, newProperty, inheritComponents];
}

function inferComponentValue(components, propertyName) {
  var descriptor = configuration$4[propertyName];

  if ('oppositeTo' in descriptor) {
    return components[descriptor.oppositeTo].value;
  }
  return [[Token$h.PROPERTY_VALUE, descriptor.defaultValue]];
}

function joinMetadata(components, at) {
  var metadata = [];
  var component;
  var originalValue;
  var componentMetadata;
  var componentName;

  for (componentName in components) {
    component = components[componentName];
    originalValue = component.all[component.position];
    componentMetadata = originalValue[at][originalValue[at].length - 1];

    Array.prototype.push.apply(metadata, componentMetadata);
  }

  return metadata.sort(metadataSorter);
}

function metadataSorter(metadata1, metadata2) {
  var line1 = metadata1[0];
  var line2 = metadata2[0];
  var column1 = metadata1[1];
  var column2 = metadata2[1];

  if (line1 < line2) {
    return -1;
  } if (line1 === line2) {
    return column1 < column2 ? -1 : 1;
  }
  return 1;
}

function buildSequenceWithInheritShorthand(components, shorthandName, validator) {
  var tokensSequence = [];
  var inheritComponents = {};
  var nonInheritComponents = {};
  var descriptor = configuration$4[shorthandName];
  var shorthandToken = [
    Token$h.PROPERTY,
    [Token$h.PROPERTY_NAME, shorthandName],
    [Token$h.PROPERTY_VALUE, 'inherit']
  ];
  var newProperty = wrapSingle(shorthandToken);
  var component;
  var longhandToken;
  var nameMetadata;
  var valueMetadata;
  var i, l;

  populateComponents$2([newProperty], validator, []);

  for (i = 0, l = descriptor.components.length; i < l; i++) {
    component = components[descriptor.components[i]];

    if (hasInherit$1(component)) {
      inheritComponents[component.name] = component;
    } else {
      longhandToken = component.all[component.position].slice(0, 2);
      Array.prototype.push.apply(longhandToken, component.value);
      tokensSequence.push(longhandToken);

      nonInheritComponents[component.name] = deepClone$1(component);
    }
  }

  nameMetadata = joinMetadata(inheritComponents, 1);
  shorthandToken[1].push(nameMetadata);

  valueMetadata = joinMetadata(inheritComponents, 2);
  shorthandToken[2].push(valueMetadata);

  tokensSequence.unshift(shorthandToken);

  return [tokensSequence, newProperty, nonInheritComponents];
}

function findTokenIn(tokens, componentName) {
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    if (tokens[i][1][1] == componentName) {
      return tokens[i];
    }
  }
}

function replaceWithShorthand(properties, candidateComponents, shorthandName, validator) {
  var descriptor = configuration$4[shorthandName];
  var nameMetadata;
  var valueMetadata;
  var newValuePlaceholder = [
    Token$h.PROPERTY,
    [Token$h.PROPERTY_NAME, shorthandName],
    [Token$h.PROPERTY_VALUE, descriptor.defaultValue]
  ];
  var all;
  var insertAt = inferInsertAtFrom(properties, candidateComponents, shorthandName);

  var newProperty = wrapSingle(newValuePlaceholder);
  newProperty.shorthand = true;
  newProperty.dirty = true;
  newProperty.multiplex = false;

  populateComponents$2([newProperty], validator, []);

  for (var i = 0, l = descriptor.components.length; i < l; i++) {
    var component = candidateComponents[descriptor.components[i]];

    newProperty.components[i] = deepClone$1(component);
    newProperty.important = component.important;
    newProperty.multiplex = newProperty.multiplex || component.multiplex;

    all = component.all;
  }

  for (var componentName in candidateComponents) {
    candidateComponents[componentName].unused = true;
  }

  nameMetadata = joinMetadata(candidateComponents, 1);
  newValuePlaceholder[1].push(nameMetadata);

  valueMetadata = joinMetadata(candidateComponents, 2);
  newValuePlaceholder[2].push(valueMetadata);

  newProperty.position = insertAt;
  newProperty.all = all;
  newProperty.all[insertAt] = newValuePlaceholder;

  properties.splice(insertAt, 1, newProperty);
}

function inferInsertAtFrom(properties, candidateComponents, shorthandName) {
  var candidateComponentNames = Object.keys(candidateComponents);
  var firstCandidatePosition = candidateComponents[candidateComponentNames[0]].position;
  var lastCandidatePosition = candidateComponents[candidateComponentNames[candidateComponentNames.length - 1]].position;

  if (shorthandName == 'border' && traversesVia(properties.slice(firstCandidatePosition, lastCandidatePosition), 'border-image')) {
    return firstCandidatePosition;
  }
  return lastCandidatePosition;
}

function traversesVia(properties, propertyName) {
  for (var i = properties.length - 1; i >= 0; i--) {
    if (properties[i].name == propertyName) {
      return true;
    }
  }

  return false;
}

var mergeIntoShorthands_1 = mergeIntoShorthands$1;

function hasUnset$1(property) {
  for (var i = property.value.length - 1; i >= 0; i--) {
    if (property.value[i][1] == 'unset') { return true; }
  }

  return false;
}

var hasUnset_1 = hasUnset$1;

var configuration$3 = configuration_1;

function findComponentIn$1(shorthand, longhand) {
  var comparator = nameComparator(longhand);

  return findInDirectComponents(shorthand, comparator) || findInSubComponents(shorthand, comparator);
}

function nameComparator(to) {
  return function(property) {
    return to.name === property.name;
  };
}

function findInDirectComponents(shorthand, comparator) {
  return shorthand.components.filter(comparator)[0];
}

function findInSubComponents(shorthand, comparator) {
  var shorthandComponent;
  var longhandMatch;
  var i, l;

  if (!configuration$3[shorthand.name].shorthandComponents) {
    return;
  }

  for (i = 0, l = shorthand.components.length; i < l; i++) {
    shorthandComponent = shorthand.components[i];
    longhandMatch = findInDirectComponents(shorthandComponent, comparator);

    if (longhandMatch) {
      return longhandMatch;
    }
  }
}

var findComponentIn_1 = findComponentIn$1;

var configuration$2 = configuration_1;

function isComponentOf$1(property1, property2, shallow) {
  return isDirectComponentOf(property1, property2)
    || !shallow && !!configuration$2[property1.name].shorthandComponents && isSubComponentOf(property1, property2);
}

function isDirectComponentOf(property1, property2) {
  var descriptor = configuration$2[property1.name];

  return 'components' in descriptor && descriptor.components.indexOf(property2.name) > -1;
}

function isSubComponentOf(property1, property2) {
  return property1
    .components
    .some(function(component) {
      return isDirectComponentOf(component, property2);
    });
}

var isComponentOf_1 = isComponentOf$1;

var Marker$4 = marker;

function isMergeableShorthand$1(shorthand) {
  if (shorthand.name != 'font') {
    return true;
  }

  return shorthand.value[0][1].indexOf(Marker$4.INTERNAL) == -1;
}

var isMergeableShorthand_1 = isMergeableShorthand$1;

var configuration$1 = configuration_1;

function overridesNonComponentShorthand$1(property1, property2) {
  return property1.name in configuration$1
    && 'overridesShorthands' in configuration$1[property1.name]
    && configuration$1[property1.name].overridesShorthands.indexOf(property2.name) > -1;
}

var overridesNonComponentShorthand_1 = overridesNonComponentShorthand$1;

var hasInherit = hasInherit_1;
var hasUnset = hasUnset_1;
var everyValuesPair = everyValuesPair_1;
var findComponentIn = findComponentIn_1;
var isComponentOf = isComponentOf_1;
var isMergeableShorthand = isMergeableShorthand_1;
var overridesNonComponentShorthand = overridesNonComponentShorthand_1;
var sameVendorPrefixesIn = vendorPrefixes.same;

var configuration = configuration_1;
var deepClone = clone.deep;
var restoreWithComponents$1 = restoreWithComponents_1;
var shallowClone = clone.shallow;

var restoreFromOptimizing$2 = restoreFromOptimizing_1;

var Token$g = token;
var Marker$3 = marker;

var serializeProperty = oneTime.property;

function sameValue(_validator, value1, value2) {
  return value1 === value2;
}

function wouldBreakCompatibility(property, validator) {
  for (var i = 0; i < property.components.length; i++) {
    var component = property.components[i];
    var descriptor = configuration[component.name];
    var canOverride = descriptor && descriptor.canOverride || sameValue;

    var _component = shallowClone(component);
    _component.value = [[Token$g.PROPERTY_VALUE, descriptor.defaultValue]];

    if (!everyValuesPair(canOverride.bind(null, validator), _component, component)) {
      return true;
    }
  }

  return false;
}

function overrideIntoMultiplex(property, by) {
  by.unused = true;

  turnIntoMultiplex(by, multiplexSize(property));
  property.value = by.value;
}

function overrideByMultiplex(property, by) {
  by.unused = true;
  property.multiplex = true;
  property.value = by.value;
}

function overrideSimple(property, by) {
  by.unused = true;
  property.value = by.value;
}

function override$2(property, by) {
  if (by.multiplex) {
    overrideByMultiplex(property, by);
  } else if (property.multiplex) {
    overrideIntoMultiplex(property, by);
  } else {
    overrideSimple(property, by);
  }
}

function overrideShorthand(property, by) {
  by.unused = true;

  for (var i = 0, l = property.components.length; i < l; i++) {
    override$2(property.components[i], by.components[i]);
  }
}

function turnIntoMultiplex(property, size) {
  property.multiplex = true;

  if (configuration[property.name].shorthand) {
    turnShorthandValueIntoMultiplex(property, size);
  } else {
    turnLonghandValueIntoMultiplex(property, size);
  }
}

function turnShorthandValueIntoMultiplex(property, size) {
  var component;
  var i, l;

  for (i = 0, l = property.components.length; i < l; i++) {
    component = property.components[i];

    if (!component.multiplex) {
      turnLonghandValueIntoMultiplex(component, size);
    }
  }
}

function turnLonghandValueIntoMultiplex(property, size) {
  var descriptor = configuration[property.name];
  var withRealValue = descriptor.intoMultiplexMode == 'real';
  var withValue = descriptor.intoMultiplexMode == 'real'
    ? property.value.slice(0)
    : (descriptor.intoMultiplexMode == 'placeholder' ? descriptor.placeholderValue : descriptor.defaultValue);
  var i = multiplexSize(property);
  var j;
  var m = withValue.length;

  for (; i < size; i++) {
    property.value.push([Token$g.PROPERTY_VALUE, Marker$3.COMMA]);

    if (Array.isArray(withValue)) {
      for (j = 0; j < m; j++) {
        property.value.push(withRealValue ? withValue[j] : [Token$g.PROPERTY_VALUE, withValue[j]]);
      }
    } else {
      property.value.push(withRealValue ? withValue : [Token$g.PROPERTY_VALUE, withValue]);
    }
  }
}

function multiplexSize(component) {
  var size = 0;

  for (var i = 0, l = component.value.length; i < l; i++) {
    if (component.value[i][1] == Marker$3.COMMA) { size++; }
  }

  return size + 1;
}

function lengthOf(property) {
  var fakeAsArray = [
    Token$g.PROPERTY,
    [Token$g.PROPERTY_NAME, property.name]
  ].concat(property.value);
  return serializeProperty([fakeAsArray], 0).length;
}

function moreSameShorthands(properties, startAt, name) {
  // Since we run the main loop in `compactOverrides` backwards, at this point some
  // properties may not be marked as unused.
  // We should consider reverting the order if possible
  var count = 0;

  for (var i = startAt; i >= 0; i--) {
    if (properties[i].name == name && !properties[i].unused) { count++; }
    if (count > 1) { break; }
  }

  return count > 1;
}

function overridingFunction(shorthand, validator) {
  for (var i = 0, l = shorthand.components.length; i < l; i++) {
    if (!anyValue(validator.isUrl, shorthand.components[i])
      && anyValue(validator.isFunction, shorthand.components[i])) { return true; }
  }

  return false;
}

function anyValue(fn, property) {
  for (var i = 0, l = property.value.length; i < l; i++) {
    if (property.value[i][1] == Marker$3.COMMA) { continue; }

    if (fn(property.value[i][1])) { return true; }
  }

  return false;
}

function wouldResultInLongerValue(left, right) {
  if (!left.multiplex && !right.multiplex || left.multiplex && right.multiplex) { return false; }

  var multiplex = left.multiplex ? left : right;
  var simple = left.multiplex ? right : left;
  var component;

  var multiplexClone = deepClone(multiplex);
  restoreFromOptimizing$2([multiplexClone], restoreWithComponents$1);

  var simpleClone = deepClone(simple);
  restoreFromOptimizing$2([simpleClone], restoreWithComponents$1);

  var lengthBefore = lengthOf(multiplexClone) + 1 + lengthOf(simpleClone);

  if (left.multiplex) {
    component = findComponentIn(multiplexClone, simpleClone);
    overrideIntoMultiplex(component, simpleClone);
  } else {
    component = findComponentIn(simpleClone, multiplexClone);
    turnIntoMultiplex(simpleClone, multiplexSize(multiplexClone));
    overrideByMultiplex(component, multiplexClone);
  }

  restoreFromOptimizing$2([simpleClone], restoreWithComponents$1);

  var lengthAfter = lengthOf(simpleClone);

  return lengthBefore <= lengthAfter;
}

function isCompactable(property) {
  return property.name in configuration;
}

function noneOverrideHack(left, right) {
  return !left.multiplex
    && (left.name == 'background' || left.name == 'background-image')
    && right.multiplex
    && (right.name == 'background' || right.name == 'background-image')
    && anyLayerIsNone(right.value);
}

function anyLayerIsNone(values) {
  var layers = intoLayers(values);

  for (var i = 0, l = layers.length; i < l; i++) {
    if (layers[i].length == 1 && layers[i][0][1] == 'none') { return true; }
  }

  return false;
}

function intoLayers(values) {
  var layers = [];

  for (var i = 0, layer = [], l = values.length; i < l; i++) {
    var value = values[i];
    if (value[1] == Marker$3.COMMA) {
      layers.push(layer);
      layer = [];
    } else {
      layer.push(value);
    }
  }

  layers.push(layer);
  return layers;
}

function overrideProperties$1(properties, withMerging, compatibility, validator) {
  var mayOverride, right, left, component;
  var overriddenComponents;
  var overriddenComponent;
  var overridingComponent;
  var overridable;
  var i, j, k;

  propertyLoop:
  for (i = properties.length - 1; i >= 0; i--) {
    right = properties[i];

    if (!isCompactable(right)) { continue; }

    if (right.block) { continue; }

    mayOverride = configuration[right.name].canOverride || sameValue;

    traverseLoop:
    for (j = i - 1; j >= 0; j--) {
      left = properties[j];

      if (!isCompactable(left)) { continue; }

      if (left.block) { continue; }

      if (left.dynamic || right.dynamic) { continue; }

      if (left.unused || right.unused) { continue; }

      if (left.hack && !right.hack && !right.important || !left.hack && !left.important && right.hack) { continue; }

      if (left.important == right.important && left.hack[0] != right.hack[0]) { continue; }

      if (left.important == right.important
        && (left.hack[0] != right.hack[0] || (left.hack[1] && left.hack[1] != right.hack[1]))) { continue; }

      if (hasInherit(right)) { continue; }

      if (noneOverrideHack(left, right)) { continue; }

      if (right.shorthand && isComponentOf(right, left)) {
        // maybe `left` can be overridden by `right` which is a shorthand?
        if (!right.important && left.important) { continue; }

        if (!sameVendorPrefixesIn([left], right.components)) { continue; }

        if (!anyValue(validator.isFunction, left) && overridingFunction(right, validator)) { continue; }

        if (!isMergeableShorthand(right)) {
          left.unused = true;
          continue;
        }

        component = findComponentIn(right, left);
        mayOverride = configuration[left.name].canOverride || sameValue;
        if (everyValuesPair(mayOverride.bind(null, validator), left, component)) {
          left.unused = true;
        }
      } else if (right.shorthand && overridesNonComponentShorthand(right, left)) {
        // `right` is a shorthand while `left` can be overriden by it, think `border` and `border-top`
        if (!right.important && left.important) {
          continue;
        }

        if (!sameVendorPrefixesIn([left], right.components)) {
          continue;
        }

        if (!anyValue(validator.isFunction, left) && overridingFunction(right, validator)) {
          continue;
        }

        overriddenComponents = left.shorthand
          ? left.components
          : [left];

        for (k = overriddenComponents.length - 1; k >= 0; k--) {
          overriddenComponent = overriddenComponents[k];
          overridingComponent = findComponentIn(right, overriddenComponent);
          mayOverride = configuration[overriddenComponent.name].canOverride || sameValue;

          if (!everyValuesPair(mayOverride.bind(null, validator), left, overridingComponent)) {
            continue traverseLoop;
          }
        }

        left.unused = true;
      } else if (withMerging && left.shorthand && !right.shorthand && isComponentOf(left, right, true)) {
        // maybe `right` can be pulled into `left` which is a shorthand?
        if (right.important && !left.important) { continue; }

        if (!right.important && left.important) {
          right.unused = true;
          continue;
        }

        // Pending more clever algorithm in #527
        if (moreSameShorthands(properties, i - 1, left.name)) { continue; }

        if (overridingFunction(left, validator)) { continue; }

        if (!isMergeableShorthand(left)) { continue; }

        if (hasUnset(left) || hasUnset(right)) { continue; }

        component = findComponentIn(left, right);
        if (everyValuesPair(mayOverride.bind(null, validator), component, right)) {
          var disabledBackgroundMerging = !compatibility.properties.backgroundClipMerging && component.name.indexOf('background-clip') > -1
            || !compatibility.properties.backgroundOriginMerging && component.name.indexOf('background-origin') > -1
            || !compatibility.properties.backgroundSizeMerging && component.name.indexOf('background-size') > -1;
          var nonMergeableValue = configuration[right.name].nonMergeableValue === right.value[0][1];

          if (disabledBackgroundMerging || nonMergeableValue) { continue; }

          if (!compatibility.properties.merging && wouldBreakCompatibility(left, validator)) { continue; }

          if (component.value[0][1] != right.value[0][1] && (hasInherit(left) || hasInherit(right))) { continue; }

          if (wouldResultInLongerValue(left, right)) { continue; }

          if (!left.multiplex && right.multiplex) { turnIntoMultiplex(left, multiplexSize(right)); }

          override$2(component, right);
          left.dirty = true;
        }
      } else if (withMerging && left.shorthand && right.shorthand && left.name == right.name) {
        // merge if all components can be merged

        if (!left.multiplex && right.multiplex) { continue; }

        if (!right.important && left.important) {
          right.unused = true;
          continue propertyLoop;
        }

        if (right.important && !left.important) {
          left.unused = true;
          continue;
        }

        if (!isMergeableShorthand(right)) {
          left.unused = true;
          continue;
        }

        for (k = left.components.length - 1; k >= 0; k--) {
          var leftComponent = left.components[k];
          var rightComponent = right.components[k];

          mayOverride = configuration[leftComponent.name].canOverride || sameValue;
          if (!everyValuesPair(mayOverride.bind(null, validator), leftComponent, rightComponent)) {
            continue propertyLoop;
          }
        }

        overrideShorthand(left, right);
        left.dirty = true;
      } else if (withMerging && left.shorthand && right.shorthand && isComponentOf(left, right)) {
        // border is a shorthand but any of its components is a shorthand too

        if (!left.important && right.important) { continue; }

        component = findComponentIn(left, right);
        mayOverride = configuration[right.name].canOverride || sameValue;
        if (!everyValuesPair(mayOverride.bind(null, validator), component, right)) { continue; }

        if (left.important && !right.important) {
          right.unused = true;
          continue;
        }

        var rightRestored = configuration[right.name].restore(right, configuration);
        if (rightRestored.length > 1) { continue; }

        component = findComponentIn(left, right);
        override$2(component, right);
        right.dirty = true;
      } else if (left.name == right.name) {
        // two non-shorthands should be merged based on understandability
        overridable = true;

        if (right.shorthand) {
          for (k = right.components.length - 1; k >= 0 && overridable; k--) {
            overriddenComponent = left.components[k];
            overridingComponent = right.components[k];
            mayOverride = configuration[overridingComponent.name].canOverride || sameValue;

            overridable = everyValuesPair(mayOverride.bind(null, validator), overriddenComponent, overridingComponent);
          }
        } else {
          mayOverride = configuration[right.name].canOverride || sameValue;
          overridable = everyValuesPair(mayOverride.bind(null, validator), left, right);
        }

        if (left.important && !right.important && overridable) {
          right.unused = true;
          continue;
        }

        if (!left.important && right.important && overridable) {
          left.unused = true;
          continue;
        }

        if (!overridable) {
          continue;
        }

        left.unused = true;
      }
    }
  }
}

var overrideProperties_1 = overrideProperties$1;

var mergeIntoShorthands = mergeIntoShorthands_1;
var overrideProperties = overrideProperties_1;
var populateComponents$1 = populateComponents_1;

var restoreWithComponents = restoreWithComponents_1;

var wrapForOptimizing$1 = wrapForOptimizing$3.all;
var removeUnused = removeUnused_1;
var restoreFromOptimizing$1 = restoreFromOptimizing_1;

var OptimizationLevel$5 = optimizationLevel.OptimizationLevel;

function optimizeProperties$4(properties, withOverriding, withMerging, context) {
  var levelOptions = context.options.level[OptimizationLevel$5.Two];
  var _properties = wrapForOptimizing$1(properties, levelOptions.skipProperties);
  var _property;
  var i, l;

  populateComponents$1(_properties, context.validator, context.warnings);

  for (i = 0, l = _properties.length; i < l; i++) {
    _property = _properties[i];
    if (_property.block) {
      optimizeProperties$4(_property.value[0][1], withOverriding, withMerging, context);
    }
  }

  if (withMerging && levelOptions.mergeIntoShorthands) {
    mergeIntoShorthands(_properties, context.validator);
  }

  if (withOverriding && levelOptions.overrideProperties) {
    overrideProperties(_properties, withMerging, context.options.compatibility, context.validator);
  }

  restoreFromOptimizing$1(_properties, restoreWithComponents);
  removeUnused(_properties);
}

var optimize$2 = optimizeProperties$4;

var isMergeable$3 = isMergeable_1;

var optimizeProperties$3 = optimize$2;

var sortSelectors$1 = sortSelectors_1;
var tidyRules$1 = tidyRules_1;

var OptimizationLevel$4 = optimizationLevel.OptimizationLevel;

var serializeBody$4 = oneTime.body;
var serializeRules$8 = oneTime.rules;

var Token$f = token;

function mergeAdjacent$1(tokens, context) {
  var lastToken = [null, [], []];
  var options = context.options;
  var adjacentSpace = options.compatibility.selectors.adjacentSpace;
  var selectorsSortingMethod = options.level[OptimizationLevel$4.One].selectorsSortingMethod;
  var mergeablePseudoClasses = options.compatibility.selectors.mergeablePseudoClasses;
  var mergeablePseudoElements = options.compatibility.selectors.mergeablePseudoElements;
  var mergeLimit = options.compatibility.selectors.mergeLimit;
  var multiplePseudoMerging = options.compatibility.selectors.multiplePseudoMerging;

  for (var i = 0, l = tokens.length; i < l; i++) {
    var token = tokens[i];

    if (token[0] != Token$f.RULE) {
      lastToken = [null, [], []];
      continue;
    }

    if (lastToken[0] == Token$f.RULE && serializeRules$8(token[1]) == serializeRules$8(lastToken[1])) {
      Array.prototype.push.apply(lastToken[2], token[2]);
      optimizeProperties$3(lastToken[2], true, true, context);
      token[2] = [];
    } else if (lastToken[0] == Token$f.RULE && serializeBody$4(token[2]) == serializeBody$4(lastToken[2])
        && isMergeable$3(serializeRules$8(token[1]), mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging)
        && isMergeable$3(
          serializeRules$8(lastToken[1]),
          mergeablePseudoClasses,
          mergeablePseudoElements,
          multiplePseudoMerging
        )
        && lastToken[1].length < mergeLimit) {
      lastToken[1] = tidyRules$1(lastToken[1].concat(token[1]), false, adjacentSpace, false, context.warnings);
      lastToken[1] = lastToken.length > 1 ? sortSelectors$1(lastToken[1], selectorsSortingMethod) : lastToken[1];
      token[2] = [];
    } else {
      lastToken = token;
    }
  }
}

var mergeAdjacent_1 = mergeAdjacent$1;

var MODIFIER_PATTERN = /--.+$/;

function rulesOverlap$2(rule1, rule2, bemMode) {
  var scope1;
  var scope2;
  var i, l;
  var j, m;

  for (i = 0, l = rule1.length; i < l; i++) {
    scope1 = rule1[i][1];

    for (j = 0, m = rule2.length; j < m; j++) {
      scope2 = rule2[j][1];

      if (scope1 == scope2) {
        return true;
      }

      if (bemMode && withoutModifiers(scope1) == withoutModifiers(scope2)) {
        return true;
      }
    }
  }

  return false;
}

function withoutModifiers(scope) {
  return scope.replace(MODIFIER_PATTERN, '');
}

var rulesOverlap_1 = rulesOverlap$2;

var Marker$2 = marker;

var Selector = {
  ADJACENT_SIBLING: '+',
  DESCENDANT: '>',
  DOT: '.',
  HASH: '#',
  NON_ADJACENT_SIBLING: '~',
  PSEUDO: ':'
};

var LETTER_PATTERN = /[a-zA-Z]/;
var NOT_PREFIX = ':not(';
var SEPARATOR_PATTERN = /[\s,(>~+]/;

function specificity$1(selector) {
  var result = [0, 0, 0];
  var character;
  var isEscaped;
  var isSingleQuoted;
  var isDoubleQuoted;
  var roundBracketLevel = 0;
  var couldIntroduceNewTypeSelector;
  var withinNotPseudoClass = false;
  var wasPseudoClass = false;
  var i, l;

  for (i = 0, l = selector.length; i < l; i++) {
    character = selector[i];

    if (isEscaped) ; else if (character == Marker$2.SINGLE_QUOTE && !isDoubleQuoted && !isSingleQuoted) {
      isSingleQuoted = true;
    } else if (character == Marker$2.SINGLE_QUOTE && !isDoubleQuoted && isSingleQuoted) {
      isSingleQuoted = false;
    } else if (character == Marker$2.DOUBLE_QUOTE && !isDoubleQuoted && !isSingleQuoted) {
      isDoubleQuoted = true;
    } else if (character == Marker$2.DOUBLE_QUOTE && isDoubleQuoted && !isSingleQuoted) {
      isDoubleQuoted = false;
    } else if (isSingleQuoted || isDoubleQuoted) {
      continue;
    } else if (roundBracketLevel > 0 && !withinNotPseudoClass) ; else if (character == Marker$2.OPEN_ROUND_BRACKET) {
      roundBracketLevel++;
    } else if (character == Marker$2.CLOSE_ROUND_BRACKET && roundBracketLevel == 1) {
      roundBracketLevel--;
      withinNotPseudoClass = false;
    } else if (character == Marker$2.CLOSE_ROUND_BRACKET) {
      roundBracketLevel--;
    } else if (character == Selector.HASH) {
      result[0]++;
    } else if (character == Selector.DOT || character == Marker$2.OPEN_SQUARE_BRACKET) {
      result[1]++;
    } else if (character == Selector.PSEUDO && !wasPseudoClass && !isNotPseudoClass(selector, i)) {
      result[1]++;
      withinNotPseudoClass = false;
    } else if (character == Selector.PSEUDO) {
      withinNotPseudoClass = true;
    } else if ((i === 0 || couldIntroduceNewTypeSelector) && LETTER_PATTERN.test(character)) {
      result[2]++;
    }

    isEscaped = character == Marker$2.BACK_SLASH;
    wasPseudoClass = character == Selector.PSEUDO;
    couldIntroduceNewTypeSelector = !isEscaped && SEPARATOR_PATTERN.test(character);
  }

  return result;
}

function isNotPseudoClass(selector, index) {
  return selector.indexOf(NOT_PREFIX, index) === index;
}

var specificity_1 = specificity$1;

var specificity = specificity_1;

function specificitiesOverlap$1(selector1, selector2, cache) {
  var specificity1;
  var specificity2;
  var i, l;
  var j, m;

  for (i = 0, l = selector1.length; i < l; i++) {
    specificity1 = findSpecificity(selector1[i][1], cache);

    for (j = 0, m = selector2.length; j < m; j++) {
      specificity2 = findSpecificity(selector2[j][1], cache);

      if (specificity1[0] === specificity2[0]
        && specificity1[1] === specificity2[1]
        && specificity1[2] === specificity2[2]) {
        return true;
      }
    }
  }

  return false;
}

function findSpecificity(selector, cache) {
  var value;

  if (!(selector in cache)) {
    cache[selector] = value = specificity(selector);
  }

  return value || cache[selector];
}

var specificitiesOverlap_1 = specificitiesOverlap$1;

// TODO: it'd be great to merge it with the other canReorder functionality

var rulesOverlap$1 = rulesOverlap_1;
var specificitiesOverlap = specificitiesOverlap_1;

var FLEX_PROPERTIES = /align-items|box-align|box-pack|flex|justify/;
var BORDER_PROPERTIES = /^border-(top|right|bottom|left|color|style|width|radius)/;

function canReorder$2(left, right, cache) {
  for (var i = right.length - 1; i >= 0; i--) {
    for (var j = left.length - 1; j >= 0; j--) {
      if (!canReorderSingle$2(left[j], right[i], cache)) { return false; }
    }
  }

  return true;
}

function canReorderSingle$2(left, right, cache) {
  var leftName = left[0];
  var leftValue = left[1];
  var leftNameRoot = left[2];
  var leftSelector = left[5];
  var leftInSpecificSelector = left[6];
  var rightName = right[0];
  var rightValue = right[1];
  var rightNameRoot = right[2];
  var rightSelector = right[5];
  var rightInSpecificSelector = right[6];

  if (leftName == 'font' && rightName == 'line-height' || rightName == 'font' && leftName == 'line-height') { return false; }
  if (FLEX_PROPERTIES.test(leftName) && FLEX_PROPERTIES.test(rightName)) { return false; }
  if (leftNameRoot == rightNameRoot
    && unprefixed(leftName) == unprefixed(rightName)
    && (vendorPrefixed(leftName) ^ vendorPrefixed(rightName))) { return false; }
  if (leftNameRoot == 'border' && BORDER_PROPERTIES.test(rightNameRoot) && (leftName == 'border' || leftName == rightNameRoot || (leftValue != rightValue && sameBorderComponent(leftName, rightName)))) { return false; }
  if (rightNameRoot == 'border' && BORDER_PROPERTIES.test(leftNameRoot) && (rightName == 'border' || rightName == leftNameRoot || (leftValue != rightValue && sameBorderComponent(leftName, rightName)))) { return false; }
  if (leftNameRoot == 'border' && rightNameRoot == 'border' && leftName != rightName && (isSideBorder(leftName) && isStyleBorder(rightName) || isStyleBorder(leftName) && isSideBorder(rightName))) { return false; }
  if (leftNameRoot != rightNameRoot) { return true; }
  if (leftName == rightName
    && leftNameRoot == rightNameRoot
    && (leftValue == rightValue || withDifferentVendorPrefix(leftValue, rightValue))) { return true; }
  if (leftName != rightName
    && leftNameRoot == rightNameRoot
    && leftName != leftNameRoot
    && rightName != rightNameRoot) { return true; }
  if (leftName != rightName
    && leftNameRoot == rightNameRoot
    && leftValue == rightValue) { return true; }
  if (rightInSpecificSelector
    && leftInSpecificSelector
    && !inheritable(leftNameRoot)
    && !inheritable(rightNameRoot)
    && !rulesOverlap$1(rightSelector, leftSelector, false)) { return true; }
  if (!specificitiesOverlap(leftSelector, rightSelector, cache)) { return true; }

  return false;
}

function vendorPrefixed(name) {
  return /^-(?:moz|webkit|ms|o)-/.test(name);
}

function unprefixed(name) {
  return name.replace(/^-(?:moz|webkit|ms|o)-/, '');
}

function sameBorderComponent(name1, name2) {
  return name1.split('-').pop() == name2.split('-').pop();
}

function isSideBorder(name) {
  return name == 'border-top' || name == 'border-right' || name == 'border-bottom' || name == 'border-left';
}

function isStyleBorder(name) {
  return name == 'border-color' || name == 'border-style' || name == 'border-width';
}

function withDifferentVendorPrefix(value1, value2) {
  return vendorPrefixed(value1) && vendorPrefixed(value2) && value1.split('-')[1] != value2.split('-')[2];
}

function inheritable(name) {
  // According to http://www.w3.org/TR/CSS21/propidx.html
  // Others will be catched by other, preceeding rules
  return name == 'font' || name == 'line-height' || name == 'list-style';
}

var reorderable = {
  canReorder: canReorder$2,
  canReorderSingle: canReorderSingle$2
};

// This extractor is used in level 2 optimizations
// IMPORTANT: Mind Token class and this code is not related!
// Properties will be tokenized in one step, see #429

var Token$e = token;
var serializeRules$7 = oneTime.rules;
var serializeValue = oneTime.value;

function extractProperties$3(token) {
  var properties = [];
  var inSpecificSelector;
  var property;
  var name;
  var value;
  var i, l;

  if (token[0] == Token$e.RULE) {
    inSpecificSelector = !/[.+>~]/.test(serializeRules$7(token[1]));

    for (i = 0, l = token[2].length; i < l; i++) {
      property = token[2][i];

      if (property[0] != Token$e.PROPERTY) { continue; }

      name = property[1][1];
      if (name.length === 0) { continue; }

      value = serializeValue(property, i);

      properties.push([
        name,
        value,
        findNameRoot(name),
        token[2][i],
        name + ':' + value,
        token[1],
        inSpecificSelector
      ]);
    }
  } else if (token[0] == Token$e.NESTED_BLOCK) {
    for (i = 0, l = token[2].length; i < l; i++) {
      properties = properties.concat(extractProperties$3(token[2][i]));
    }
  }

  return properties;
}

function findNameRoot(name) {
  if (name == 'list-style') { return name; }
  if (name.indexOf('-radius') > 0) { return 'border-radius'; }
  if (name == 'border-collapse' || name == 'border-spacing' || name == 'border-image') { return name; }
  if (name.indexOf('border-') === 0 && /^border-\w+-\w+$/.test(name)) { return name.match(/border-\w+/)[0]; }
  if (name.indexOf('border-') === 0 && /^border-\w+$/.test(name)) { return 'border'; }
  if (name.indexOf('text-') === 0) { return name; }
  if (name == '-chrome-') { return name; }

  return name.replace(/^-\w+-/, '').match(/([a-zA-Z]+)/)[0].toLowerCase();
}

var extractProperties_1 = extractProperties$3;

var canReorder$1 = reorderable.canReorder;
var canReorderSingle$1 = reorderable.canReorderSingle;
var extractProperties$2 = extractProperties_1;
var rulesOverlap = rulesOverlap_1;

var serializeRules$6 = oneTime.rules;
var OptimizationLevel$3 = optimizationLevel.OptimizationLevel;
var Token$d = token;

function mergeMediaQueries$1(tokens, context) {
  var mergeSemantically = context.options.level[OptimizationLevel$3.Two].mergeSemantically;
  var specificityCache = context.cache.specificity;
  var candidates = {};
  var reduced = [];

  for (var i = tokens.length - 1; i >= 0; i--) {
    var token = tokens[i];
    if (token[0] != Token$d.NESTED_BLOCK) {
      continue;
    }

    var key = serializeRules$6(token[1]);
    var candidate = candidates[key];
    if (!candidate) {
      candidate = [];
      candidates[key] = candidate;
    }

    candidate.push(i);
  }

  for (var name in candidates) {
    var positions = candidates[name];

    positionLoop:
    for (var j = positions.length - 1; j > 0; j--) {
      var positionOne = positions[j];
      var tokenOne = tokens[positionOne];
      var positionTwo = positions[j - 1];
      var tokenTwo = tokens[positionTwo];

      directionLoop:
      for (var direction = 1; direction >= -1; direction -= 2) {
        var topToBottom = direction == 1;
        var from = topToBottom ? positionOne + 1 : positionTwo - 1;
        var to = topToBottom ? positionTwo : positionOne;
        var delta = topToBottom ? 1 : -1;
        var source = topToBottom ? tokenOne : tokenTwo;
        var target = topToBottom ? tokenTwo : tokenOne;
        var movedProperties = extractProperties$2(source);

        while (from != to) {
          var traversedProperties = extractProperties$2(tokens[from]);
          from += delta;

          if (mergeSemantically
            && allSameRulePropertiesCanBeReordered(movedProperties, traversedProperties, specificityCache)
          ) {
            continue;
          }

          if (!canReorder$1(movedProperties, traversedProperties, specificityCache)) { continue directionLoop; }
        }

        target[2] = topToBottom
          ? source[2].concat(target[2])
          : target[2].concat(source[2]);
        source[2] = [];

        reduced.push(target);
        continue positionLoop;
      }
    }
  }

  return reduced;
}

function allSameRulePropertiesCanBeReordered(movedProperties, traversedProperties, specificityCache) {
  var movedProperty;
  var movedRule;
  var traversedProperty;
  var traversedRule;
  var i, l;
  var j, m;

  for (i = 0, l = movedProperties.length; i < l; i++) {
    movedProperty = movedProperties[i];
    movedRule = movedProperty[5];

    for (j = 0, m = traversedProperties.length; j < m; j++) {
      traversedProperty = traversedProperties[j];
      traversedRule = traversedProperty[5];

      if (rulesOverlap(movedRule, traversedRule, true)
        && !canReorderSingle$1(movedProperty, traversedProperty, specificityCache)) {
        return false;
      }
    }
  }

  return true;
}

var mergeMediaQueries_1 = mergeMediaQueries$1;

var isMergeable$2 = isMergeable_1;

var sortSelectors = sortSelectors_1;
var tidyRules = tidyRules_1;

var OptimizationLevel$2 = optimizationLevel.OptimizationLevel;

var serializeBody$3 = oneTime.body;
var serializeRules$5 = oneTime.rules;

var Token$c = token;

function unsafeSelector(value) {
  return /\.|\*| :/.test(value);
}

function isBemElement(token) {
  var asString = serializeRules$5(token[1]);
  return asString.indexOf('__') > -1 || asString.indexOf('--') > -1;
}

function withoutModifier(selector) {
  return selector.replace(/--[^ ,>+~:]+/g, '');
}

function removeAnyUnsafeElements(left, candidates) {
  var leftSelector = withoutModifier(serializeRules$5(left[1]));

  for (var body in candidates) {
    var right = candidates[body];
    var rightSelector = withoutModifier(serializeRules$5(right[1]));

    if (rightSelector.indexOf(leftSelector) > -1 || leftSelector.indexOf(rightSelector) > -1) {
      delete candidates[body];
    }
  }
}

function mergeNonAdjacentByBody$1(tokens, context) {
  var options = context.options;
  var mergeSemantically = options.level[OptimizationLevel$2.Two].mergeSemantically;
  var adjacentSpace = options.compatibility.selectors.adjacentSpace;
  var selectorsSortingMethod = options.level[OptimizationLevel$2.One].selectorsSortingMethod;
  var mergeablePseudoClasses = options.compatibility.selectors.mergeablePseudoClasses;
  var mergeablePseudoElements = options.compatibility.selectors.mergeablePseudoElements;
  var multiplePseudoMerging = options.compatibility.selectors.multiplePseudoMerging;
  var candidates = {};

  for (var i = tokens.length - 1; i >= 0; i--) {
    var token = tokens[i];
    if (token[0] != Token$c.RULE) { continue; }

    if (token[2].length > 0 && (!mergeSemantically && unsafeSelector(serializeRules$5(token[1])))) { candidates = {}; }

    if (token[2].length > 0 && mergeSemantically && isBemElement(token)) { removeAnyUnsafeElements(token, candidates); }

    var candidateBody = serializeBody$3(token[2]);
    var oldToken = candidates[candidateBody];
    if (oldToken
        && isMergeable$2(
          serializeRules$5(token[1]),
          mergeablePseudoClasses,
          mergeablePseudoElements,
          multiplePseudoMerging
        )
        && isMergeable$2(
          serializeRules$5(oldToken[1]),
          mergeablePseudoClasses,
          mergeablePseudoElements,
          multiplePseudoMerging
        )
    ) {
      if (token[2].length > 0) {
        token[1] = tidyRules(oldToken[1].concat(token[1]), false, adjacentSpace, false, context.warnings);
        token[1] = token[1].length > 1 ? sortSelectors(token[1], selectorsSortingMethod) : token[1];
      } else {
        token[1] = oldToken[1].concat(token[1]);
      }

      oldToken[2] = [];
      candidates[candidateBody] = null;
    }

    candidates[serializeBody$3(token[2])] = token;
  }
}

var mergeNonAdjacentByBody_1 = mergeNonAdjacentByBody$1;

var canReorder = reorderable.canReorder;
var extractProperties$1 = extractProperties_1;

var optimizeProperties$2 = optimize$2;

var serializeRules$4 = oneTime.rules;

var Token$b = token;

function mergeNonAdjacentBySelector$1(tokens, context) {
  var specificityCache = context.cache.specificity;
  var allSelectors = {};
  var repeatedSelectors = [];
  var i;

  for (i = tokens.length - 1; i >= 0; i--) {
    if (tokens[i][0] != Token$b.RULE) { continue; }
    if (tokens[i][2].length === 0) { continue; }

    var selector = serializeRules$4(tokens[i][1]);
    allSelectors[selector] = [i].concat(allSelectors[selector] || []);

    if (allSelectors[selector].length == 2) { repeatedSelectors.push(selector); }
  }

  for (i = repeatedSelectors.length - 1; i >= 0; i--) {
    var positions = allSelectors[repeatedSelectors[i]];

    selectorIterator:
    for (var j = positions.length - 1; j > 0; j--) {
      var positionOne = positions[j - 1];
      var tokenOne = tokens[positionOne];
      var positionTwo = positions[j];
      var tokenTwo = tokens[positionTwo];

      directionIterator:
      for (var direction = 1; direction >= -1; direction -= 2) {
        var topToBottom = direction == 1;
        var from = topToBottom ? positionOne + 1 : positionTwo - 1;
        var to = topToBottom ? positionTwo : positionOne;
        var delta = topToBottom ? 1 : -1;
        var moved = topToBottom ? tokenOne : tokenTwo;
        var target = topToBottom ? tokenTwo : tokenOne;
        var movedProperties = extractProperties$1(moved);

        while (from != to) {
          var traversedProperties = extractProperties$1(tokens[from]);
          from += delta;

          // traversed then moved as we move selectors towards the start
          var reorderable = topToBottom
            ? canReorder(movedProperties, traversedProperties, specificityCache)
            : canReorder(traversedProperties, movedProperties, specificityCache);

          if (!reorderable && !topToBottom) { continue selectorIterator; }
          if (!reorderable && topToBottom) { continue directionIterator; }
        }

        if (topToBottom) {
          Array.prototype.push.apply(moved[2], target[2]);
          target[2] = moved[2];
        } else {
          Array.prototype.push.apply(target[2], moved[2]);
        }

        optimizeProperties$2(target[2], true, true, context);
        moved[2] = [];
      }
    }
  }
}

var mergeNonAdjacentBySelector_1 = mergeNonAdjacentBySelector$1;

function cloneArray$2(array) {
  var cloned = array.slice(0);

  for (var i = 0, l = cloned.length; i < l; i++) {
    if (Array.isArray(cloned[i])) { cloned[i] = cloneArray$2(cloned[i]); }
  }

  return cloned;
}

var cloneArray_1 = cloneArray$2;

var isMergeable$1 = isMergeable_1;

var optimizeProperties$1 = optimize$2;

var cloneArray$1 = cloneArray_1;

var Token$a = token;

var serializeBody$2 = oneTime.body;
var serializeRules$3 = oneTime.rules;

function reduceNonAdjacent$1(tokens, context) {
  var options = context.options;
  var mergeablePseudoClasses = options.compatibility.selectors.mergeablePseudoClasses;
  var mergeablePseudoElements = options.compatibility.selectors.mergeablePseudoElements;
  var multiplePseudoMerging = options.compatibility.selectors.multiplePseudoMerging;
  var candidates = {};
  var repeated = [];

  for (var i = tokens.length - 1; i >= 0; i--) {
    var token = tokens[i];

    if (token[0] != Token$a.RULE) {
      continue;
    } else if (token[2].length === 0) {
      continue;
    }

    var selectorAsString = serializeRules$3(token[1]);
    var isComplexAndNotSpecial = token[1].length > 1
      && isMergeable$1(selectorAsString, mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging);
    var wrappedSelectors = wrappedSelectorsFrom(token[1]);
    var selectors = isComplexAndNotSpecial
      ? [selectorAsString].concat(wrappedSelectors)
      : [selectorAsString];

    for (var j = 0, m = selectors.length; j < m; j++) {
      var selector = selectors[j];

      if (!candidates[selector]) { candidates[selector] = []; } else { repeated.push(selector); }

      candidates[selector].push({
        where: i,
        list: wrappedSelectors,
        isPartial: isComplexAndNotSpecial && j > 0,
        isComplex: isComplexAndNotSpecial && j === 0
      });
    }
  }

  reduceSimpleNonAdjacentCases(tokens, repeated, candidates, options, context);
  reduceComplexNonAdjacentCases(tokens, candidates, options, context);
}

function wrappedSelectorsFrom(list) {
  var wrapped = [];

  for (var i = 0; i < list.length; i++) {
    wrapped.push([list[i][1]]);
  }

  return wrapped;
}

function reduceSimpleNonAdjacentCases(tokens, repeated, candidates, options, context) {
  function filterOut(idx, bodies) {
    return data[idx].isPartial && bodies.length === 0;
  }

  function reduceBody(token, newBody, processedCount, tokenIdx) {
    if (!data[processedCount - tokenIdx - 1].isPartial) { token[2] = newBody; }
  }

  for (var i = 0, l = repeated.length; i < l; i++) {
    var selector = repeated[i];
    var data = candidates[selector];

    reduceSelector(tokens, data, {
      filterOut: filterOut,
      callback: reduceBody
    }, options, context);
  }
}

function reduceComplexNonAdjacentCases(tokens, candidates, options, context) {
  var mergeablePseudoClasses = options.compatibility.selectors.mergeablePseudoClasses;
  var mergeablePseudoElements = options.compatibility.selectors.mergeablePseudoElements;
  var multiplePseudoMerging = options.compatibility.selectors.multiplePseudoMerging;
  var localContext = {};

  function filterOut(idx) {
    return localContext.data[idx].where < localContext.intoPosition;
  }

  function collectReducedBodies(token, newBody, processedCount, tokenIdx) {
    if (tokenIdx === 0) { localContext.reducedBodies.push(newBody); }
  }

  allSelectors:
  for (var complexSelector in candidates) {
    var into = candidates[complexSelector];
    if (!into[0].isComplex) { continue; }

    var intoPosition = into[into.length - 1].where;
    var intoToken = tokens[intoPosition];
    var reducedBodies = [];

    var selectors = isMergeable$1(complexSelector, mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging)
      ? into[0].list
      : [complexSelector];

    localContext.intoPosition = intoPosition;
    localContext.reducedBodies = reducedBodies;

    for (var j = 0, m = selectors.length; j < m; j++) {
      var selector = selectors[j];
      var data = candidates[selector];

      if (data.length < 2) { continue allSelectors; }

      localContext.data = data;

      reduceSelector(tokens, data, {
        filterOut: filterOut,
        callback: collectReducedBodies
      }, options, context);

      if (serializeBody$2(reducedBodies[reducedBodies.length - 1]) != serializeBody$2(reducedBodies[0])) {
        continue allSelectors;
      }
    }

    intoToken[2] = reducedBodies[0];
  }
}

function reduceSelector(tokens, data, context, options, outerContext) {
  var bodies = [];
  var bodiesAsList = [];
  var processedTokens = [];

  for (var j = data.length - 1; j >= 0; j--) {
    if (context.filterOut(j, bodies)) { continue; }

    var where = data[j].where;
    var token = tokens[where];
    var clonedBody = cloneArray$1(token[2]);

    bodies = bodies.concat(clonedBody);
    bodiesAsList.push(clonedBody);
    processedTokens.push(where);
  }

  optimizeProperties$1(bodies, true, false, outerContext);

  var processedCount = processedTokens.length;
  var propertyIdx = bodies.length - 1;
  var tokenIdx = processedCount - 1;

  while (tokenIdx >= 0) {
    if ((tokenIdx === 0
      || (bodies[propertyIdx] && bodiesAsList[tokenIdx].indexOf(bodies[propertyIdx]) > -1)) && propertyIdx > -1) {
      propertyIdx--;
      continue;
    }

    var newBody = bodies.splice(propertyIdx + 1);
    context.callback(tokens[processedTokens[tokenIdx]], newBody, processedCount, tokenIdx);

    tokenIdx--;
  }
}

var reduceNonAdjacent_1 = reduceNonAdjacent$1;

var Token$9 = token;

var serializeAll$1 = oneTime.all;

var FONT_FACE_SCOPE = '@font-face';

function removeDuplicateFontAtRules$1(tokens) {
  var fontAtRules = [];
  var token;
  var key;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];

    if (token[0] != Token$9.AT_RULE_BLOCK && token[1][0][1] != FONT_FACE_SCOPE) {
      continue;
    }

    key = serializeAll$1([token]);

    if (fontAtRules.indexOf(key) > -1) {
      token[2] = [];
    } else {
      fontAtRules.push(key);
    }
  }
}

var removeDuplicateFontAtRules_1 = removeDuplicateFontAtRules$1;

var Token$8 = token;

var serializeAll = oneTime.all;
var serializeRules$2 = oneTime.rules;

function removeDuplicateMediaQueries$1(tokens) {
  var candidates = {};
  var candidate;
  var token;
  var key;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];
    if (token[0] != Token$8.NESTED_BLOCK) {
      continue;
    }

    key = serializeRules$2(token[1]) + '%' + serializeAll(token[2]);
    candidate = candidates[key];

    if (candidate) {
      candidate[2] = [];
    }

    candidates[key] = token;
  }
}

var removeDuplicateMediaQueries_1 = removeDuplicateMediaQueries$1;

var Token$7 = token;

var serializeBody$1 = oneTime.body;
var serializeRules$1 = oneTime.rules;

function removeDuplicates$1(tokens) {
  var matched = {};
  var moreThanOnce = [];
  var id, token;
  var body, bodies;

  for (var i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];
    if (token[0] != Token$7.RULE) { continue; }

    id = serializeRules$1(token[1]);

    if (matched[id] && matched[id].length == 1) { moreThanOnce.push(id); } else { matched[id] = matched[id] || []; }

    matched[id].push(i);
  }

  for (i = 0, l = moreThanOnce.length; i < l; i++) {
    id = moreThanOnce[i];
    bodies = [];

    for (var j = matched[id].length - 1; j >= 0; j--) {
      token = tokens[matched[id][j]];
      body = serializeBody$1(token[2]);

      if (bodies.indexOf(body) > -1) { token[2] = []; } else { bodies.push(body); }
    }
  }
}

var removeDuplicates_1 = removeDuplicates$1;

var populateComponents = populateComponents_1;

var wrapForOptimizing = wrapForOptimizing$3.single;
var restoreFromOptimizing = restoreFromOptimizing_1;

var Token$6 = token;

var animationNameRegex = /^(-moz-|-o-|-webkit-)?animation-name$/;
var animationRegex = /^(-moz-|-o-|-webkit-)?animation$/;
var keyframeRegex = /^@(-moz-|-o-|-webkit-)?keyframes /;
var importantRegex = /\s{0,31}!important$/;
var optionalMatchingQuotesRegex = /^(['"]?)(.*)\1$/;

function normalize$1(value) {
  return value
    .replace(optionalMatchingQuotesRegex, '$2')
    .replace(importantRegex, '');
}

function removeUnusedAtRules$1(tokens, context) {
  removeUnusedAtRule(tokens, matchCounterStyle, markCounterStylesAsUsed, context);
  removeUnusedAtRule(tokens, matchFontFace, markFontFacesAsUsed, context);
  removeUnusedAtRule(tokens, matchKeyframe, markKeyframesAsUsed, context);
  removeUnusedAtRule(tokens, matchNamespace, markNamespacesAsUsed, context);
}

function removeUnusedAtRule(tokens, matchCallback, markCallback, context) {
  var atRules = {};
  var atRule;
  var atRuleTokens;
  var atRuleToken;
  var zeroAt;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    matchCallback(tokens[i], atRules);
  }

  if (Object.keys(atRules).length === 0) {
    return;
  }

  markUsedAtRules(tokens, markCallback, atRules, context);

  for (atRule in atRules) {
    atRuleTokens = atRules[atRule];

    for (i = 0, l = atRuleTokens.length; i < l; i++) {
      atRuleToken = atRuleTokens[i];
      zeroAt = atRuleToken[0] == Token$6.AT_RULE ? 1 : 2;
      atRuleToken[zeroAt] = [];
    }
  }
}

function markUsedAtRules(tokens, markCallback, atRules, context) {
  var boundMarkCallback = markCallback(atRules);
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    switch (tokens[i][0]) {
    case Token$6.RULE:
      boundMarkCallback(tokens[i], context);
      break;
    case Token$6.NESTED_BLOCK:
      markUsedAtRules(tokens[i][2], markCallback, atRules, context);
    }
  }
}

function matchCounterStyle(token, atRules) {
  var match;

  if (token[0] == Token$6.AT_RULE_BLOCK && token[1][0][1].indexOf('@counter-style') === 0) {
    match = token[1][0][1].split(' ')[1];
    atRules[match] = atRules[match] || [];
    atRules[match].push(token);
  }
}

function markCounterStylesAsUsed(atRules) {
  return function(token, context) {
    var property;
    var wrappedProperty;
    var i, l;

    for (i = 0, l = token[2].length; i < l; i++) {
      property = token[2][i];

      if (property[1][1] == 'list-style') {
        wrappedProperty = wrapForOptimizing(property);
        populateComponents([wrappedProperty], context.validator, context.warnings);

        if (wrappedProperty.components[0].value[0][1] in atRules) {
          delete atRules[property[2][1]];
        }

        restoreFromOptimizing([wrappedProperty]);
      }

      if (property[1][1] == 'list-style-type' && property[2][1] in atRules) {
        delete atRules[property[2][1]];
      }
    }
  };
}

function matchFontFace(token, atRules) {
  var property;
  var match;
  var i, l;

  if (token[0] == Token$6.AT_RULE_BLOCK && token[1][0][1] == '@font-face') {
    for (i = 0, l = token[2].length; i < l; i++) {
      property = token[2][i];

      if (property[1][1] == 'font-family') {
        match = normalize$1(property[2][1].toLowerCase());
        atRules[match] = atRules[match] || [];
        atRules[match].push(token);
        break;
      }
    }
  }
}

function markFontFacesAsUsed(atRules) {
  return function(token, context) {
    var property;
    var wrappedProperty;
    var component;
    var normalizedMatch;
    var i, l;
    var j, m;

    for (i = 0, l = token[2].length; i < l; i++) {
      property = token[2][i];

      if (property[1][1] == 'font') {
        wrappedProperty = wrapForOptimizing(property);
        populateComponents([wrappedProperty], context.validator, context.warnings);
        component = wrappedProperty.components[6];

        for (j = 0, m = component.value.length; j < m; j++) {
          normalizedMatch = normalize$1(component.value[j][1].toLowerCase());

          if (normalizedMatch in atRules) {
            delete atRules[normalizedMatch];
          }
        }

        restoreFromOptimizing([wrappedProperty]);
      }

      if (property[1][1] == 'font-family') {
        for (j = 2, m = property.length; j < m; j++) {
          normalizedMatch = normalize$1(property[j][1].toLowerCase());

          if (normalizedMatch in atRules) {
            delete atRules[normalizedMatch];
          }
        }
      }
    }
  };
}

function matchKeyframe(token, atRules) {
  var match;

  if (token[0] == Token$6.NESTED_BLOCK && keyframeRegex.test(token[1][0][1])) {
    match = token[1][0][1].split(' ')[1];
    atRules[match] = atRules[match] || [];
    atRules[match].push(token);
  }
}

function markKeyframesAsUsed(atRules) {
  return function(token, context) {
    var property;
    var wrappedProperty;
    var component;
    var i, l;
    var j, m;

    for (i = 0, l = token[2].length; i < l; i++) {
      property = token[2][i];

      if (animationRegex.test(property[1][1])) {
        wrappedProperty = wrapForOptimizing(property);
        populateComponents([wrappedProperty], context.validator, context.warnings);
        component = wrappedProperty.components[7];

        for (j = 0, m = component.value.length; j < m; j++) {
          if (component.value[j][1] in atRules) {
            delete atRules[component.value[j][1]];
          }
        }

        restoreFromOptimizing([wrappedProperty]);
      }

      if (animationNameRegex.test(property[1][1])) {
        for (j = 2, m = property.length; j < m; j++) {
          if (property[j][1] in atRules) {
            delete atRules[property[j][1]];
          }
        }
      }
    }
  };
}

function matchNamespace(token, atRules) {
  var match;

  if (token[0] == Token$6.AT_RULE && token[1].indexOf('@namespace') === 0) {
    match = token[1].split(' ')[1];
    atRules[match] = atRules[match] || [];
    atRules[match].push(token);
  }
}

function markNamespacesAsUsed(atRules) {
  var namespaceRegex = new RegExp(Object.keys(atRules).join('\\||') + '\\|', 'g');

  return function(token) {
    var match;
    var scope;
    var normalizedMatch;
    var i, l;
    var j, m;

    for (i = 0, l = token[1].length; i < l; i++) {
      scope = token[1][i];
      match = scope[1].match(namespaceRegex);

      for (j = 0, m = match.length; j < m; j++) {
        normalizedMatch = match[j].substring(0, match[j].length - 1);

        if (normalizedMatch in atRules) {
          delete atRules[normalizedMatch];
        }
      }
    }
  };
}

var removeUnusedAtRules_1 = removeUnusedAtRules$1;

function ruleSorter(s1, s2) {
  return s1[1] > s2[1] ? 1 : -1;
}

function tidyRuleDuplicates$1(rules) {
  var list = [];
  var repeated = [];

  for (var i = 0, l = rules.length; i < l; i++) {
    var rule = rules[i];

    if (repeated.indexOf(rule[1]) == -1) {
      repeated.push(rule[1]);
      list.push(rule);
    }
  }

  return list.sort(ruleSorter);
}

var tidyRuleDuplicates_1 = tidyRuleDuplicates$1;

var canReorderSingle = reorderable.canReorderSingle;
var extractProperties = extractProperties_1;
var isMergeable = isMergeable_1;
var tidyRuleDuplicates = tidyRuleDuplicates_1;

var Token$5 = token;

var cloneArray = cloneArray_1;

var serializeBody = oneTime.body;
var serializeRules = oneTime.rules;

function naturalSorter(a, b) {
  return a > b ? 1 : -1;
}

function cloneAndMergeSelectors(propertyA, propertyB) {
  var cloned = cloneArray(propertyA);
  cloned[5] = cloned[5].concat(propertyB[5]);

  return cloned;
}

function restructure$1(tokens, context) {
  var options = context.options;
  var mergeablePseudoClasses = options.compatibility.selectors.mergeablePseudoClasses;
  var mergeablePseudoElements = options.compatibility.selectors.mergeablePseudoElements;
  var mergeLimit = options.compatibility.selectors.mergeLimit;
  var multiplePseudoMerging = options.compatibility.selectors.multiplePseudoMerging;
  var specificityCache = context.cache.specificity;
  var movableTokens = {};
  var movedProperties = [];
  var multiPropertyMoveCache = {};
  var movedToBeDropped = [];
  var maxCombinationsLevel = 2;
  var ID_JOIN_CHARACTER = '%';

  function sendToMultiPropertyMoveCache(position, movedProperty, allFits) {
    for (var i = allFits.length - 1; i >= 0; i--) {
      var fit = allFits[i][0];
      var id = addToCache(movedProperty, fit);

      if (multiPropertyMoveCache[id].length > 1 && processMultiPropertyMove(position, multiPropertyMoveCache[id])) {
        removeAllMatchingFromCache(id);
        break;
      }
    }
  }

  function addToCache(movedProperty, fit) {
    var id = cacheId(fit);
    multiPropertyMoveCache[id] = multiPropertyMoveCache[id] || [];
    multiPropertyMoveCache[id].push([movedProperty, fit]);
    return id;
  }

  function removeAllMatchingFromCache(matchId) {
    var matchSelectors = matchId.split(ID_JOIN_CHARACTER);
    var forRemoval = [];
    var i;

    for (var id in multiPropertyMoveCache) {
      var selectors = id.split(ID_JOIN_CHARACTER);
      for (i = selectors.length - 1; i >= 0; i--) {
        if (matchSelectors.indexOf(selectors[i]) > -1) {
          forRemoval.push(id);
          break;
        }
      }
    }

    for (i = forRemoval.length - 1; i >= 0; i--) {
      delete multiPropertyMoveCache[forRemoval[i]];
    }
  }

  function cacheId(cachedTokens) {
    var id = [];
    for (var i = 0, l = cachedTokens.length; i < l; i++) {
      id.push(serializeRules(cachedTokens[i][1]));
    }
    return id.join(ID_JOIN_CHARACTER);
  }

  function tokensToMerge(sourceTokens) {
    var uniqueTokensWithBody = [];
    var mergeableTokens = [];

    for (var i = sourceTokens.length - 1; i >= 0; i--) {
      if (!isMergeable(
        serializeRules(sourceTokens[i][1]),
        mergeablePseudoClasses,
        mergeablePseudoElements,
        multiplePseudoMerging
      )) {
        continue;
      }

      mergeableTokens.unshift(sourceTokens[i]);
      if (sourceTokens[i][2].length > 0
        && uniqueTokensWithBody.indexOf(sourceTokens[i]) == -1) {
        uniqueTokensWithBody.push(sourceTokens[i]);
      }
    }

    return uniqueTokensWithBody.length > 1
      ? mergeableTokens
      : [];
  }

  function shortenIfPossible(position, movedProperty) {
    var name = movedProperty[0];
    var value = movedProperty[1];
    var key = movedProperty[4];
    var valueSize = name.length + value.length + 1;
    var allSelectors = [];
    var qualifiedTokens = [];

    var mergeableTokens = tokensToMerge(movableTokens[key]);
    if (mergeableTokens.length < 2) { return; }

    var allFits = findAllFits(mergeableTokens, valueSize, 1);
    var bestFit = allFits[0];
    if (bestFit[1] > 0) { return sendToMultiPropertyMoveCache(position, movedProperty, allFits); }

    for (var i = bestFit[0].length - 1; i >= 0; i--) {
      allSelectors = bestFit[0][i][1].concat(allSelectors);
      qualifiedTokens.unshift(bestFit[0][i]);
    }

    allSelectors = tidyRuleDuplicates(allSelectors);
    dropAsNewTokenAt(position, [movedProperty], allSelectors, qualifiedTokens);
  }

  function fitSorter(fit1, fit2) {
    return fit1[1] > fit2[1] ? 1 : (fit1[1] == fit2[1] ? 0 : -1);
  }

  function findAllFits(mergeableTokens, propertySize, propertiesCount) {
    var combinations = allCombinations(mergeableTokens, propertySize, propertiesCount, maxCombinationsLevel - 1);
    return combinations.sort(fitSorter);
  }

  function allCombinations(tokensVariant, propertySize, propertiesCount, level) {
    var differenceVariants = [[tokensVariant, sizeDifference(tokensVariant, propertySize, propertiesCount)]];
    if (tokensVariant.length > 2 && level > 0) {
      for (var i = tokensVariant.length - 1; i >= 0; i--) {
        var subVariant = Array.prototype.slice.call(tokensVariant, 0);
        subVariant.splice(i, 1);
        differenceVariants = differenceVariants.concat(
          allCombinations(subVariant, propertySize, propertiesCount, level - 1)
        );
      }
    }

    return differenceVariants;
  }

  function sizeDifference(tokensVariant, propertySize, propertiesCount) {
    var allSelectorsSize = 0;
    for (var i = tokensVariant.length - 1; i >= 0; i--) {
      allSelectorsSize += tokensVariant[i][2].length > propertiesCount
        ? serializeRules(tokensVariant[i][1]).length
        : -1;
    }
    return allSelectorsSize - (tokensVariant.length - 1) * propertySize + 1;
  }

  function dropAsNewTokenAt(position, properties, allSelectors, mergeableTokens) {
    var i, j, k, m;
    var allProperties = [];

    for (i = mergeableTokens.length - 1; i >= 0; i--) {
      var mergeableToken = mergeableTokens[i];

      for (j = mergeableToken[2].length - 1; j >= 0; j--) {
        var mergeableProperty = mergeableToken[2][j];

        for (k = 0, m = properties.length; k < m; k++) {
          var property = properties[k];

          var mergeablePropertyName = mergeableProperty[1][1];
          var propertyName = property[0];
          var propertyBody = property[4];
          if (mergeablePropertyName == propertyName && serializeBody([mergeableProperty]) == propertyBody) {
            mergeableToken[2].splice(j, 1);
            break;
          }
        }
      }
    }

    for (i = properties.length - 1; i >= 0; i--) {
      allProperties.unshift(properties[i][3]);
    }

    var newToken = [Token$5.RULE, allSelectors, allProperties];
    tokens.splice(position, 0, newToken);
  }

  function dropPropertiesAt(position, movedProperty) {
    var key = movedProperty[4];
    var toMove = movableTokens[key];

    if (toMove && toMove.length > 1) {
      if (!shortenMultiMovesIfPossible(position, movedProperty)) { shortenIfPossible(position, movedProperty); }
    }
  }

  function shortenMultiMovesIfPossible(position, movedProperty) {
    var candidates = [];
    var propertiesAndMergableTokens = [];
    var key = movedProperty[4];
    var j, k;

    var mergeableTokens = tokensToMerge(movableTokens[key]);
    if (mergeableTokens.length < 2) { return; }

    movableLoop:
    for (var value in movableTokens) {
      var tokensList = movableTokens[value];

      for (j = mergeableTokens.length - 1; j >= 0; j--) {
        if (tokensList.indexOf(mergeableTokens[j]) == -1) { continue movableLoop; }
      }

      candidates.push(value);
    }

    if (candidates.length < 2) { return false; }

    for (j = candidates.length - 1; j >= 0; j--) {
      for (k = movedProperties.length - 1; k >= 0; k--) {
        if (movedProperties[k][4] == candidates[j]) {
          propertiesAndMergableTokens.unshift([movedProperties[k], mergeableTokens]);
          break;
        }
      }
    }

    return processMultiPropertyMove(position, propertiesAndMergableTokens);
  }

  function processMultiPropertyMove(position, propertiesAndMergableTokens) {
    var valueSize = 0;
    var properties = [];
    var property;

    for (var i = propertiesAndMergableTokens.length - 1; i >= 0; i--) {
      property = propertiesAndMergableTokens[i][0];
      var fullValue = property[4];
      valueSize += fullValue.length + (i > 0 ? 1 : 0);

      properties.push(property);
    }

    var mergeableTokens = propertiesAndMergableTokens[0][1];
    var bestFit = findAllFits(mergeableTokens, valueSize, properties.length)[0];
    if (bestFit[1] > 0) { return false; }

    var allSelectors = [];
    var qualifiedTokens = [];
    for (i = bestFit[0].length - 1; i >= 0; i--) {
      allSelectors = bestFit[0][i][1].concat(allSelectors);
      qualifiedTokens.unshift(bestFit[0][i]);
    }

    allSelectors = tidyRuleDuplicates(allSelectors);
    dropAsNewTokenAt(position, properties, allSelectors, qualifiedTokens);

    for (i = properties.length - 1; i >= 0; i--) {
      property = properties[i];
      var index = movedProperties.indexOf(property);

      delete movableTokens[property[4]];

      if (index > -1 && movedToBeDropped.indexOf(index) == -1) { movedToBeDropped.push(index); }
    }

    return true;
  }

  function boundToAnotherPropertyInCurrrentToken(property, movedProperty, token) {
    var propertyName = property[0];
    var movedPropertyName = movedProperty[0];
    if (propertyName != movedPropertyName) { return false; }

    var key = movedProperty[4];
    var toMove = movableTokens[key];
    return toMove && toMove.indexOf(token) > -1;
  }

  for (var i = tokens.length - 1; i >= 0; i--) {
    var token = tokens[i];
    var isRule;
    var j, k, m;
    var samePropertyAt;

    if (token[0] == Token$5.RULE) {
      isRule = true;
    } else if (token[0] == Token$5.NESTED_BLOCK) {
      isRule = false;
    } else {
      continue;
    }

    // We cache movedProperties.length as it may change in the loop
    var movedCount = movedProperties.length;

    var properties = extractProperties(token);
    movedToBeDropped = [];

    var unmovableInCurrentToken = [];
    for (j = properties.length - 1; j >= 0; j--) {
      for (k = j - 1; k >= 0; k--) {
        if (!canReorderSingle(properties[j], properties[k], specificityCache)) {
          unmovableInCurrentToken.push(j);
          break;
        }
      }
    }

    for (j = properties.length - 1; j >= 0; j--) {
      var property = properties[j];
      var movedSameProperty = false;

      for (k = 0; k < movedCount; k++) {
        var movedProperty = movedProperties[k];

        if (movedToBeDropped.indexOf(k) == -1 && (
          !canReorderSingle(property, movedProperty, specificityCache)
          && !boundToAnotherPropertyInCurrrentToken(property, movedProperty, token)
          || movableTokens[movedProperty[4]] && movableTokens[movedProperty[4]].length === mergeLimit)
        ) {
          dropPropertiesAt(i + 1, movedProperty);

          if (movedToBeDropped.indexOf(k) == -1) {
            movedToBeDropped.push(k);
            delete movableTokens[movedProperty[4]];
          }
        }

        if (!movedSameProperty) {
          movedSameProperty = property[0] == movedProperty[0] && property[1] == movedProperty[1];

          if (movedSameProperty) {
            samePropertyAt = k;
          }
        }
      }

      if (!isRule || unmovableInCurrentToken.indexOf(j) > -1) { continue; }

      var key = property[4];

      if (movedSameProperty && movedProperties[samePropertyAt][5].length + property[5].length > mergeLimit) {
        dropPropertiesAt(i + 1, movedProperties[samePropertyAt]);
        movedProperties.splice(samePropertyAt, 1);
        movableTokens[key] = [token];
        movedSameProperty = false;
      } else {
        movableTokens[key] = movableTokens[key] || [];
        movableTokens[key].push(token);
      }

      if (movedSameProperty) {
        movedProperties[samePropertyAt] = cloneAndMergeSelectors(movedProperties[samePropertyAt], property);
      } else {
        movedProperties.push(property);
      }
    }

    movedToBeDropped = movedToBeDropped.sort(naturalSorter);
    for (j = 0, m = movedToBeDropped.length; j < m; j++) {
      var dropAt = movedToBeDropped[j] - j;
      movedProperties.splice(dropAt, 1);
    }
  }

  var position = tokens[0] && tokens[0][0] == Token$5.AT_RULE && tokens[0][1].indexOf('@charset') === 0 ? 1 : 0;
  for (; position < tokens.length - 1; position++) {
    var isImportRule = tokens[position][0] === Token$5.AT_RULE && tokens[position][1].indexOf('@import') === 0;
    var isComment = tokens[position][0] === Token$5.COMMENT;
    if (!(isImportRule || isComment)) { break; }
  }

  for (i = 0; i < movedProperties.length; i++) {
    dropPropertiesAt(position, movedProperties[i]);
  }
}

var restructure_1 = restructure$1;

var mergeAdjacent = mergeAdjacent_1;
var mergeMediaQueries = mergeMediaQueries_1;
var mergeNonAdjacentByBody = mergeNonAdjacentByBody_1;
var mergeNonAdjacentBySelector = mergeNonAdjacentBySelector_1;
var reduceNonAdjacent = reduceNonAdjacent_1;
var removeDuplicateFontAtRules = removeDuplicateFontAtRules_1;
var removeDuplicateMediaQueries = removeDuplicateMediaQueries_1;
var removeDuplicates = removeDuplicates_1;
var removeUnusedAtRules = removeUnusedAtRules_1;
var restructure = restructure_1;

var optimizeProperties = optimize$2;

var OptimizationLevel$1 = optimizationLevel.OptimizationLevel;

var Token$4 = token;

function removeEmpty(tokens) {
  for (var i = 0, l = tokens.length; i < l; i++) {
    var token = tokens[i];
    var isEmpty = false;

    switch (token[0]) {
    case Token$4.RULE:
      isEmpty = token[1].length === 0 || token[2].length === 0;
      break;
    case Token$4.NESTED_BLOCK:
      removeEmpty(token[2]);
      isEmpty = token[2].length === 0;
      break;
    case Token$4.AT_RULE:
      isEmpty = token[1].length === 0;
      break;
    case Token$4.AT_RULE_BLOCK:
      isEmpty = token[2].length === 0;
    }

    if (isEmpty) {
      tokens.splice(i, 1);
      i--;
      l--;
    }
  }
}

function recursivelyOptimizeBlocks(tokens, context) {
  for (var i = 0, l = tokens.length; i < l; i++) {
    var token = tokens[i];

    if (token[0] == Token$4.NESTED_BLOCK) {
      var isKeyframes = /@(-moz-|-o-|-webkit-)?keyframes/.test(token[1][0][1]);
      level2Optimize$1(token[2], context, !isKeyframes);
    }
  }
}

function recursivelyOptimizeProperties(tokens, context) {
  for (var i = 0, l = tokens.length; i < l; i++) {
    var token = tokens[i];

    switch (token[0]) {
    case Token$4.RULE:
      optimizeProperties(token[2], true, true, context);
      break;
    case Token$4.NESTED_BLOCK:
      recursivelyOptimizeProperties(token[2], context);
    }
  }
}

function level2Optimize$1(tokens, context, withRestructuring) {
  var levelOptions = context.options.level[OptimizationLevel$1.Two];
  var level2Plugins = context.options.plugins.level2Block;
  var reduced;
  var i;

  recursivelyOptimizeBlocks(tokens, context);
  recursivelyOptimizeProperties(tokens, context);

  if (levelOptions.removeDuplicateRules) {
    removeDuplicates(tokens);
  }

  if (levelOptions.mergeAdjacentRules) {
    mergeAdjacent(tokens, context);
  }

  if (levelOptions.reduceNonAdjacentRules) {
    reduceNonAdjacent(tokens, context);
  }

  if (levelOptions.mergeNonAdjacentRules && levelOptions.mergeNonAdjacentRules != 'body') {
    mergeNonAdjacentBySelector(tokens, context);
  }

  if (levelOptions.mergeNonAdjacentRules && levelOptions.mergeNonAdjacentRules != 'selector') {
    mergeNonAdjacentByBody(tokens, context);
  }

  if (levelOptions.restructureRules && levelOptions.mergeAdjacentRules && withRestructuring) {
    restructure(tokens, context);
    mergeAdjacent(tokens, context);
  }

  if (levelOptions.restructureRules && !levelOptions.mergeAdjacentRules && withRestructuring) {
    restructure(tokens, context);
  }

  if (levelOptions.removeDuplicateFontRules) {
    removeDuplicateFontAtRules(tokens);
  }

  if (levelOptions.removeDuplicateMediaBlocks) {
    removeDuplicateMediaQueries(tokens);
  }

  if (levelOptions.removeUnusedAtRules) {
    removeUnusedAtRules(tokens, context);
  }

  if (levelOptions.mergeMedia) {
    reduced = mergeMediaQueries(tokens, context);
    for (i = reduced.length - 1; i >= 0; i--) {
      level2Optimize$1(reduced[i][2], context, false);
    }
  }

  for (i = 0; i < level2Plugins.length; i++) {
    level2Plugins[i](tokens);
  }

  if (levelOptions.removeEmpty) {
    removeEmpty(tokens);
  }

  return tokens;
}

var optimize$1 = level2Optimize$1;

var functionNoVendorRegexStr = '[A-Z]+(\\-|[A-Z]|[0-9])+\\(.*?\\)';
var functionVendorRegexStr = '\\-(\\-|[A-Z]|[0-9])+\\(.*?\\)';
var variableRegexStr = 'var\\(\\-\\-[^\\)]+\\)';
var functionAnyRegexStr = '(' + variableRegexStr + '|' + functionNoVendorRegexStr + '|' + functionVendorRegexStr + ')';

var calcRegex = new RegExp('^(\\-moz\\-|\\-webkit\\-)?calc\\([^\\)]+\\)$', 'i');
var decimalRegex = /[0-9]/;
var functionAnyRegex = new RegExp('^' + functionAnyRegexStr + '$', 'i');
var hexAlphaColorRegex = /^#(?:[0-9a-f]{4}|[0-9a-f]{8})$/i;
// eslint-disable-next-line max-len
var hslColorRegex = /^hsl\(\s{0,31}[-.]?\d+\s{0,31},\s{0,31}\d*\.?\d+%\s{0,31},\s{0,31}\d*\.?\d+%\s{0,31}\)|hsla\(\s{0,31}[-.]?\d+\s{0,31},\s{0,31}\d*\.?\d+%\s{0,31},\s{0,31}\d*\.?\d+%\s{0,31},\s{0,31}\.?\d+\s{0,31}\)$/;
// eslint-disable-next-line max-len
var hslColorWithSpacesRegex = /^hsl\(\s{0,31}[-.]?\d+(deg)?\s{1,31}\d*\.?\d+%\s{1,31}\d*\.?\d+%\s{0,31}\)|hsla\(\s{0,31}[-.]?\d+(deg)?\s{1,31}\d*\.?\d+%\s{1,31}\d*\.?\d+%\s{1,31}\/\s{1,31}\d*\.?\d+%?\s{0,31}\)$/;
var identifierRegex = /^(-[a-z0-9_][a-z0-9\-_]*|[a-z_][a-z0-9\-_]*)$/i;
var namedEntityRegex = /^[a-z]+$/i;
var prefixRegex = /^-([a-z0-9]|-)*$/i;
var quotedTextRegex = /^("[^"]*"|'[^']*')$/i;
// eslint-disable-next-line max-len
var rgbColorRegex = /^rgb\(\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31}\)|rgba\(\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[.\d]+\s{0,31}\)$/i;
// eslint-disable-next-line max-len
var rgbColorWithSpacesRegex = /^rgb\(\s{0,31}[\d]{1,3}\s{1,31}[\d]{1,3}\s{1,31}[\d]{1,3}\s{0,31}\)|rgba\(\s{0,31}[\d]{1,3}\s{1,31}[\d]{1,3}\s{1,31}[\d]{1,3}\s{1,31}\/\s{1,31}[\d]*\.?[.\d]+%?\s{0,31}\)$/i;
var timeUnitPattern = /\d+(s|ms)/;
var timingFunctionRegex = /^(cubic-bezier|steps)\([^)]+\)$/;
var validTimeUnits = ['ms', 's'];
var urlRegex = /^url\([\s\S]+\)$/i;
var variableRegex = new RegExp('^' + variableRegexStr + '$', 'i');

var eightValueColorRegex = /^#[0-9a-f]{8}$/i;
var fourValueColorRegex = /^#[0-9a-f]{4}$/i;
var sixValueColorRegex = /^#[0-9a-f]{6}$/i;
var threeValueColorRegex = /^#[0-9a-f]{3}$/i;

var DECIMAL_DOT = '.';
var MINUS_SIGN = '-';
var PLUS_SIGN = '+';

var Keywords = {
  '^': [
    'inherit',
    'initial',
    'unset'
  ],
  '*-style': [
    'auto',
    'dashed',
    'dotted',
    'double',
    'groove',
    'hidden',
    'inset',
    'none',
    'outset',
    'ridge',
    'solid'
  ],
  '*-timing-function': [
    'ease',
    'ease-in',
    'ease-in-out',
    'ease-out',
    'linear',
    'step-end',
    'step-start'
  ],
  'animation-direction': [
    'alternate',
    'alternate-reverse',
    'normal',
    'reverse'
  ],
  'animation-fill-mode': [
    'backwards',
    'both',
    'forwards',
    'none'
  ],
  'animation-iteration-count': [
    'infinite'
  ],
  'animation-name': [
    'none'
  ],
  'animation-play-state': [
    'paused',
    'running'
  ],
  'background-attachment': [
    'fixed',
    'inherit',
    'local',
    'scroll'
  ],
  'background-clip': [
    'border-box',
    'content-box',
    'inherit',
    'padding-box',
    'text'
  ],
  'background-origin': [
    'border-box',
    'content-box',
    'inherit',
    'padding-box'
  ],
  'background-position': [
    'bottom',
    'center',
    'left',
    'right',
    'top'
  ],
  'background-repeat': [
    'no-repeat',
    'inherit',
    'repeat',
    'repeat-x',
    'repeat-y',
    'round',
    'space'
  ],
  'background-size': [
    'auto',
    'cover',
    'contain'
  ],
  'border-collapse': [
    'collapse',
    'inherit',
    'separate'
  ],
  bottom: [
    'auto'
  ],
  clear: [
    'both',
    'left',
    'none',
    'right'
  ],
  color: [
    'transparent'
  ],
  cursor: [
    'all-scroll',
    'auto',
    'col-resize',
    'crosshair',
    'default',
    'e-resize',
    'help',
    'move',
    'n-resize',
    'ne-resize',
    'no-drop',
    'not-allowed',
    'nw-resize',
    'pointer',
    'progress',
    'row-resize',
    's-resize',
    'se-resize',
    'sw-resize',
    'text',
    'vertical-text',
    'w-resize',
    'wait'
  ],
  display: [
    'block',
    'inline',
    'inline-block',
    'inline-table',
    'list-item',
    'none',
    'table',
    'table-caption',
    'table-cell',
    'table-column',
    'table-column-group',
    'table-footer-group',
    'table-header-group',
    'table-row',
    'table-row-group'
  ],
  float: [
    'left',
    'none',
    'right'
  ],
  left: [
    'auto'
  ],
  font: [
    'caption',
    'icon',
    'menu',
    'message-box',
    'small-caption',
    'status-bar',
    'unset'
  ],
  'font-size': [
    'large',
    'larger',
    'medium',
    'small',
    'smaller',
    'x-large',
    'x-small',
    'xx-large',
    'xx-small'
  ],
  'font-stretch': [
    'condensed',
    'expanded',
    'extra-condensed',
    'extra-expanded',
    'normal',
    'semi-condensed',
    'semi-expanded',
    'ultra-condensed',
    'ultra-expanded'
  ],
  'font-style': [
    'italic',
    'normal',
    'oblique'
  ],
  'font-variant': [
    'normal',
    'small-caps'
  ],
  'font-weight': [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    'bold',
    'bolder',
    'lighter',
    'normal'
  ],
  'line-height': [
    'normal'
  ],
  'list-style-position': [
    'inside',
    'outside'
  ],
  'list-style-type': [
    'armenian',
    'circle',
    'decimal',
    'decimal-leading-zero',
    'disc',
    'decimal|disc', // this is the default value of list-style-type, see comment in configuration.js
    'georgian',
    'lower-alpha',
    'lower-greek',
    'lower-latin',
    'lower-roman',
    'none',
    'square',
    'upper-alpha',
    'upper-latin',
    'upper-roman'
  ],
  overflow: [
    'auto',
    'hidden',
    'scroll',
    'visible'
  ],
  position: [
    'absolute',
    'fixed',
    'relative',
    'static'
  ],
  right: [
    'auto'
  ],
  'text-align': [
    'center',
    'justify',
    'left',
    'left|right', // this is the default value of list-style-type, see comment in configuration.js
    'right'
  ],
  'text-decoration': [
    'line-through',
    'none',
    'overline',
    'underline'
  ],
  'text-overflow': [
    'clip',
    'ellipsis'
  ],
  top: [
    'auto'
  ],
  'vertical-align': [
    'baseline',
    'bottom',
    'middle',
    'sub',
    'super',
    'text-bottom',
    'text-top',
    'top'
  ],
  visibility: [
    'collapse',
    'hidden',
    'visible'
  ],
  'white-space': [
    'normal',
    'nowrap',
    'pre'
  ],
  width: [
    'inherit',
    'initial',
    'medium',
    'thick',
    'thin'
  ]
};

var Units = [
  '%',
  'ch',
  'cm',
  'em',
  'ex',
  'in',
  'mm',
  'pc',
  'pt',
  'px',
  'rem',
  'vh',
  'vm',
  'vmax',
  'vmin',
  'vw'
];

function isColor(value) {
  return value != 'auto'
    && (
      isKeyword('color')(value)
      || isHexColor(value)
      || isColorFunction(value)
      || isNamedEntity(value)
    );
}

function isColorFunction(value) {
  return isRgbColor(value) || isHslColor(value);
}

function isDynamicUnit(value) {
  return calcRegex.test(value);
}

function isFunction(value) {
  return functionAnyRegex.test(value);
}

function isHexColor(value) {
  return threeValueColorRegex.test(value)
    || fourValueColorRegex.test(value)
    || sixValueColorRegex.test(value)
    || eightValueColorRegex.test(value);
}

function isHslColor(value) {
  return hslColorRegex.test(value) || hslColorWithSpacesRegex.test(value);
}

function isHexAlphaColor(value) {
  return hexAlphaColorRegex.test(value);
}

function isIdentifier(value) {
  return identifierRegex.test(value);
}

function isQuotedText(value) {
  return quotedTextRegex.test(value);
}

function isImage(value) {
  return value == 'none' || value == 'inherit' || isUrl(value);
}

function isKeyword(propertyName) {
  return function(value) {
    return Keywords[propertyName].indexOf(value) > -1;
  };
}

function isNamedEntity(value) {
  return namedEntityRegex.test(value);
}

function isNumber(value) {
  return scanForNumber(value) == value.length;
}

function isRgbColor(value) {
  return rgbColorRegex.test(value) || rgbColorWithSpacesRegex.test(value);
}

function isPrefixed(value) {
  return prefixRegex.test(value);
}

function isPositiveNumber(value) {
  return isNumber(value)
    && parseFloat(value) >= 0;
}

function isVariable(value) {
  return variableRegex.test(value);
}

function isTime(value) {
  var numberUpTo = scanForNumber(value);

  return numberUpTo == value.length && parseInt(value) === 0
    || numberUpTo > -1 && validTimeUnits.indexOf(value.slice(numberUpTo + 1)) > -1
    || isCalculatedTime(value);
}

function isCalculatedTime(value) {
  return isFunction(value) && timeUnitPattern.test(value);
}

function isTimingFunction() {
  var isTimingFunctionKeyword = isKeyword('*-timing-function');

  return function(value) {
    return isTimingFunctionKeyword(value) || timingFunctionRegex.test(value);
  };
}

function isUnit(validUnits, value) {
  var numberUpTo = scanForNumber(value);

  return numberUpTo == value.length && parseInt(value) === 0
    || numberUpTo > -1 && validUnits.indexOf(value.slice(numberUpTo + 1).toLowerCase()) > -1
    || value == 'auto'
    || value == 'inherit';
}

function isUrl(value) {
  return urlRegex.test(value);
}

function isZIndex(value) {
  return value == 'auto'
    || isNumber(value)
    || isKeyword('^')(value);
}

function scanForNumber(value) {
  var hasDot = false;
  var hasSign = false;
  var character;
  var i, l;

  for (i = 0, l = value.length; i < l; i++) {
    character = value[i];

    if (i === 0 && (character == PLUS_SIGN || character == MINUS_SIGN)) {
      hasSign = true;
    } else if (i > 0 && hasSign && (character == PLUS_SIGN || character == MINUS_SIGN)) {
      return i - 1;
    } else if (character == DECIMAL_DOT && !hasDot) {
      hasDot = true;
    } else if (character == DECIMAL_DOT && hasDot) {
      return i - 1;
    } else if (decimalRegex.test(character)) {
      continue;
    } else {
      return i - 1;
    }
  }

  return i;
}

function validator$1(compatibility) {
  var validUnits = Units.slice(0).filter(function(value) {
    return !(value in compatibility.units) || compatibility.units[value] === true;
  });

  if (compatibility.customUnits.rpx) {
    validUnits.push('rpx');
  }

  return {
    colorOpacity: compatibility.colors.opacity,
    colorHexAlpha: compatibility.colors.hexAlpha,
    isAnimationDirectionKeyword: isKeyword('animation-direction'),
    isAnimationFillModeKeyword: isKeyword('animation-fill-mode'),
    isAnimationIterationCountKeyword: isKeyword('animation-iteration-count'),
    isAnimationNameKeyword: isKeyword('animation-name'),
    isAnimationPlayStateKeyword: isKeyword('animation-play-state'),
    isTimingFunction: isTimingFunction(),
    isBackgroundAttachmentKeyword: isKeyword('background-attachment'),
    isBackgroundClipKeyword: isKeyword('background-clip'),
    isBackgroundOriginKeyword: isKeyword('background-origin'),
    isBackgroundPositionKeyword: isKeyword('background-position'),
    isBackgroundRepeatKeyword: isKeyword('background-repeat'),
    isBackgroundSizeKeyword: isKeyword('background-size'),
    isColor: isColor,
    isColorFunction: isColorFunction,
    isDynamicUnit: isDynamicUnit,
    isFontKeyword: isKeyword('font'),
    isFontSizeKeyword: isKeyword('font-size'),
    isFontStretchKeyword: isKeyword('font-stretch'),
    isFontStyleKeyword: isKeyword('font-style'),
    isFontVariantKeyword: isKeyword('font-variant'),
    isFontWeightKeyword: isKeyword('font-weight'),
    isFunction: isFunction,
    isGlobal: isKeyword('^'),
    isHexAlphaColor: isHexAlphaColor,
    isHslColor: isHslColor,
    isIdentifier: isIdentifier,
    isImage: isImage,
    isKeyword: isKeyword,
    isLineHeightKeyword: isKeyword('line-height'),
    isListStylePositionKeyword: isKeyword('list-style-position'),
    isListStyleTypeKeyword: isKeyword('list-style-type'),
    isNumber: isNumber,
    isPrefixed: isPrefixed,
    isPositiveNumber: isPositiveNumber,
    isQuotedText: isQuotedText,
    isRgbColor: isRgbColor,
    isStyleKeyword: isKeyword('*-style'),
    isTime: isTime,
    isUnit: isUnit.bind(null, validUnits),
    isUrl: isUrl,
    isVariable: isVariable,
    isWidth: isKeyword('width'),
    isZIndex: isZIndex
  };
}

var validator_1 = validator$1;

var DEFAULTS = {
  '*': {
    colors: {
      hexAlpha: false, // 4- and 8-character hex notation
      opacity: true // rgba / hsla
    },
    customUnits: { rpx: false },
    properties: {
      backgroundClipMerging: true, // background-clip to shorthand
      backgroundOriginMerging: true, // background-origin to shorthand
      backgroundSizeMerging: true, // background-size to shorthand
      colors: true, // any kind of color transformations, like `#ff00ff` to `#f0f` or `#fff` into `red`
      ieBangHack: false, // !ie suffix hacks on IE<8
      ieFilters: false, // whether to preserve `filter` and `-ms-filter` properties
      iePrefixHack: false, // underscore / asterisk prefix hacks on IE
      ieSuffixHack: false, // \9 suffix hacks on IE6-9, \0 suffix hack on IE6-11
      merging: true, // merging properties into one
      shorterLengthUnits: false, // optimize pixel units into `pt`, `pc` or `in` units
      spaceAfterClosingBrace: true, // 'url() no-repeat' to 'url()no-repeat'
      urlQuotes: true, // whether to wrap content of `url()` into quotes or not
      zeroUnits: true // 0[unit] -> 0
    },
    selectors: {
      adjacentSpace: false, // div+ nav Android stock browser hack
      ie7Hack: false, // *+html hack
      mergeablePseudoClasses: [
        ':active',
        ':after',
        ':before',
        ':empty',
        ':checked',
        ':disabled',
        ':empty',
        ':enabled',
        ':first-child',
        ':first-letter',
        ':first-line',
        ':first-of-type',
        ':focus',
        ':hover',
        ':lang',
        ':last-child',
        ':last-of-type',
        ':link',
        ':not',
        ':nth-child',
        ':nth-last-child',
        ':nth-last-of-type',
        ':nth-of-type',
        ':only-child',
        ':only-of-type',
        ':root',
        ':target',
        ':visited'
      ], // selectors with these pseudo-classes can be merged as these are universally supported
      mergeablePseudoElements: [
        '::after',
        '::before',
        '::first-letter',
        '::first-line'
      ], // selectors with these pseudo-elements can be merged as these are universally supported
      mergeLimit: 8191, // number of rules that can be safely merged together
      multiplePseudoMerging: true
    },
    units: {
      ch: true,
      in: true,
      pc: true,
      pt: true,
      rem: true,
      vh: true,
      vm: true, // vm is vmin on IE9+ see https://developer.mozilla.org/en-US/docs/Web/CSS/length
      vmax: true,
      vmin: true,
      vw: true
    }
  }
};

DEFAULTS.ie11 = merge(DEFAULTS['*'], { properties: { ieSuffixHack: true } });

DEFAULTS.ie10 = merge(DEFAULTS['*'], { properties: { ieSuffixHack: true } });

DEFAULTS.ie9 = merge(DEFAULTS['*'], {
  properties: {
    ieFilters: true,
    ieSuffixHack: true
  }
});

DEFAULTS.ie8 = merge(DEFAULTS.ie9, {
  colors: { opacity: false },
  properties: {
    backgroundClipMerging: false,
    backgroundOriginMerging: false,
    backgroundSizeMerging: false,
    iePrefixHack: true,
    merging: false
  },
  selectors: {
    mergeablePseudoClasses: [
      ':after',
      ':before',
      ':first-child',
      ':first-letter',
      ':focus',
      ':hover',
      ':visited'
    ],
    mergeablePseudoElements: []
  },
  units: {
    ch: false,
    rem: false,
    vh: false,
    vm: false,
    vmax: false,
    vmin: false,
    vw: false
  }
});

DEFAULTS.ie7 = merge(DEFAULTS.ie8, {
  properties: { ieBangHack: true },
  selectors: {
    ie7Hack: true,
    mergeablePseudoClasses: [
      ':first-child',
      ':first-letter',
      ':hover',
      ':visited'
    ]
  }
});

function compatibilityFrom$1(source) {
  return merge(DEFAULTS['*'], calculateSource(source));
}

function merge(source, target) {
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      var value = source[key];

      if (Object.prototype.hasOwnProperty.call(target, key) && typeof value === 'object' && !Array.isArray(value)) {
        target[key] = merge(value, target[key] || {});
      } else {
        target[key] = key in target ? target[key] : value;
      }
    }
  }

  return target;
}

function calculateSource(source) {
  if (typeof source == 'object') { return source; }

  if (!/[,+-]/.test(source)) { return DEFAULTS[source] || DEFAULTS['*']; }

  var parts = source.split(',');
  var template = parts[0] in DEFAULTS
    ? DEFAULTS[parts.shift()]
    : DEFAULTS['*'];

  source = {};

  parts.forEach(function(part) {
    var isAdd = part[0] == '+';
    var key = part.substring(1).split('.');
    var group = key[0];
    var option = key[1];

    source[group] = source[group] || {};
    source[group][option] = isAdd;
  });

  return merge(template, source);
}

var compatibility = compatibilityFrom$1;

var streamHttp = {};

var request = {exports: {}};

var capability$2 = {};

(function (exports) {
	exports.fetch = isFunction(commonjsGlobal.fetch) && isFunction(commonjsGlobal.ReadableStream);

	exports.writableStream = isFunction(commonjsGlobal.WritableStream);

	exports.abortController = isFunction(commonjsGlobal.AbortController);

	// The xhr request to example.com may violate some restrictive CSP configurations,
	// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
	// and assume support for certain features below.
	var xhr;
	function getXHR () {
		// Cache the xhr value
		if (xhr !== undefined) return xhr

		if (commonjsGlobal.XMLHttpRequest) {
			xhr = new commonjsGlobal.XMLHttpRequest();
			// If XDomainRequest is available (ie only, where xhr might not work
			// cross domain), use the page location. Otherwise use example.com
			// Note: this doesn't actually make an http request.
			try {
				xhr.open('GET', commonjsGlobal.XDomainRequest ? '/' : 'https://example.com');
			} catch(e) {
				xhr = null;
			}
		} else {
			// Service workers don't have XHR
			xhr = null;
		}
		return xhr
	}

	function checkTypeSupport (type) {
		var xhr = getXHR();
		if (!xhr) return false
		try {
			xhr.responseType = type;
			return xhr.responseType === type
		} catch (e) {}
		return false
	}

	// If fetch is supported, then arraybuffer will be supported too. Skip calling
	// checkTypeSupport(), since that calls getXHR().
	exports.arraybuffer = exports.fetch || checkTypeSupport('arraybuffer');

	// These next two tests unavoidably show warnings in Chrome. Since fetch will always
	// be used if it's available, just return false for these to avoid the warnings.
	exports.msstream = !exports.fetch && checkTypeSupport('ms-stream');
	exports.mozchunkedarraybuffer = !exports.fetch && checkTypeSupport('moz-chunked-arraybuffer');

	// If fetch is supported, then overrideMimeType will be supported too. Skip calling
	// getXHR().
	exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false);

	function isFunction (value) {
		return typeof value === 'function'
	}

	xhr = null; // Help gc 
} (capability$2));

var inherits_browser = {exports: {}};

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

var inherits_browserExports = inherits_browser.exports;

var response$1 = {};

var readableBrowser = {exports: {}};

var events = {exports: {}};

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };

var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}
events.exports = EventEmitter;
events.exports.once = once$2;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once$2(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

var eventsExports = events.exports;

var streamBrowser = eventsExports.EventEmitter;

var util$6 = {};

var types = {};

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams$1 = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

var hasSymbols$2 = shams$1;

var shams = function hasToStringTagShams() {
	return hasSymbols$2() && !!Symbol.toStringTag;
};

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = shams$1;

var hasSymbols$1 = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

var test = {
	foo: {}
};

var $Object = Object;

var hasProto$1 = function hasProto() {
	return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr$3 = Object.prototype.toString;
var funcType = '[object Function]';

var implementation$1 = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr$3.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var implementation = implementation$1;

var functionBind = Function.prototype.bind || implementation;

var bind$1 = functionBind;

var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);

var undefined$1;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD$1 = Object.getOwnPropertyDescriptor;
if ($gOPD$1) {
	try {
		$gOPD$1({}, '');
	} catch (e) {
		$gOPD$1 = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD$1
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD$1(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = hasSymbols$1();
var hasProto = hasProto$1();

var getProto$1 = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto$1 ? undefined$1 : getProto$1(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto$1 ? getProto$1([][Symbol.iterator]()) : undefined$1,
	'%AsyncFromSyncIteratorPrototype%': undefined$1,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto$1 ? getProto$1(getProto$1([][Symbol.iterator]())) : undefined$1,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto$1 ? undefined$1 : getProto$1(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto$1 ? undefined$1 : getProto$1(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto$1 ? getProto$1(''[Symbol.iterator]()) : undefined$1,
	'%Symbol%': hasSymbols ? Symbol : undefined$1,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
};

if (getProto$1) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto$1(getProto$1(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto$1) {
			value = getProto$1(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = functionBind;
var hasOwn = src;
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

var getIntrinsic = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined$1;
			}
			if ($gOPD$1 && (i + 1) >= parts.length) {
				var desc = $gOPD$1(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

var callBind$2 = {exports: {}};

(function (module) {

	var bind = functionBind;
	var GetIntrinsic = getIntrinsic;

	var $apply = GetIntrinsic('%Function.prototype.apply%');
	var $call = GetIntrinsic('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

	var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
	var $max = GetIntrinsic('%Math.max%');

	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = null;
		}
	}

	module.exports = function callBind(originalFunction) {
		var func = $reflectApply(bind, $call, arguments);
		if ($gOPD && $defineProperty) {
			var desc = $gOPD(func, 'length');
			if (desc.configurable) {
				// original length, plus the receiver, minus any additional arguments (after the receiver)
				$defineProperty(
					func,
					'length',
					{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
				);
			}
		}
		return func;
	};

	var applyBind = function applyBind() {
		return $reflectApply(bind, $apply, arguments);
	};

	if ($defineProperty) {
		$defineProperty(module.exports, 'apply', { value: applyBind });
	} else {
		module.exports.apply = applyBind;
	} 
} (callBind$2));

var callBindExports = callBind$2.exports;

var GetIntrinsic$1 = getIntrinsic;

var callBind$1 = callBindExports;

var $indexOf$1 = callBind$1(GetIntrinsic$1('String.prototype.indexOf'));

var callBound$2 = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic$1(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf$1(name, '.prototype.') > -1) {
		return callBind$1(intrinsic);
	}
	return intrinsic;
};

var hasToStringTag$3 = shams();
var callBound$1 = callBound$2;

var $toString$1 = callBound$1('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag$3 && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString$1(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString$1(value) !== '[object Array]' &&
		$toString$1(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

var isArguments = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

var toStr$2 = Object.prototype.toString;
var fnToStr$1 = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag$2 = shams();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag$2) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

var isGeneratorFunction = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr$1.call(fn))) {
		return true;
	}
	if (!hasToStringTag$2) {
		var str = toStr$2.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr$1 = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag$1 = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all$3 = document.all;
	if (toStr$1.call(all$3) === toStr$1.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr$1.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

var isCallable$1 = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag$1) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr$1.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};

var isCallable = isCallable$1;

var toStr = Object.prototype.toString;
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty$2.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty$2.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach$1 = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

var forEach_1 = forEach$1;

var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g$1 = typeof globalThis === 'undefined' ? commonjsGlobal : globalThis;

var availableTypedArrays$1 = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g$1[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};

var GetIntrinsic = getIntrinsic;

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

var gopd = $gOPD;

var forEach = forEach_1;
var availableTypedArrays = availableTypedArrays$1;
var callBind = callBindExports;
var callBound = callBound$2;
var gOPD = gopd;

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = shams();

var g = typeof globalThis === 'undefined' ? commonjsGlobal : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var cache = { __proto__: null };
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			cache['$' + typedArray] = callBind(descriptor.get);
		}
	});
} else {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		cache['$' + typedArray] = callBind(arr.slice);
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var found = false;
	forEach(cache, function (getter, typedArray) {
		if (!found) {
			try {
				if ('$' + getter(value) === typedArray) {
					found = $slice(typedArray, 1);
				}
			} catch (e) { /**/ }
		}
	});
	return found;
};

var trySlices = function tryAllSlices(value) {
	var found = false;
	forEach(cache, function (getter, name) {
		if (!found) {
			try {
				getter(value);
				found = $slice(name, 1);
			} catch (e) { /**/ }
		}
	});
	return found;
};

var whichTypedArray$1 = function whichTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		var tag = $slice($toString(value), 8, -1);
		if ($indexOf(typedArrays, tag) > -1) {
			return tag;
		}
		if (tag !== 'Object') {
			return false;
		}
		// node < 0.6 hits here on real Typed Arrays
		return trySlices(value);
	}
	if (!gOPD) { return null; } // unknown engine
	return tryTypedArrays(value);
};

var whichTypedArray = whichTypedArray$1;

var isTypedArray = function isTypedArray(value) {
	return !!whichTypedArray(value);
};

(function (exports) {

	var isArgumentsObject = isArguments;
	var isGeneratorFunction$1 = isGeneratorFunction;
	var whichTypedArray = whichTypedArray$1;
	var isTypedArray$1 = isTypedArray;

	function uncurryThis(f) {
	  return f.call.bind(f);
	}

	var BigIntSupported = typeof BigInt !== 'undefined';
	var SymbolSupported = typeof Symbol !== 'undefined';

	var ObjectToString = uncurryThis(Object.prototype.toString);

	var numberValue = uncurryThis(Number.prototype.valueOf);
	var stringValue = uncurryThis(String.prototype.valueOf);
	var booleanValue = uncurryThis(Boolean.prototype.valueOf);

	if (BigIntSupported) {
	  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
	}

	if (SymbolSupported) {
	  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
	}

	function checkBoxedPrimitive(value, prototypeValueOf) {
	  if (typeof value !== 'object') {
	    return false;
	  }
	  try {
	    prototypeValueOf(value);
	    return true;
	  } catch(e) {
	    return false;
	  }
	}

	exports.isArgumentsObject = isArgumentsObject;
	exports.isGeneratorFunction = isGeneratorFunction$1;
	exports.isTypedArray = isTypedArray$1;

	// Taken from here and modified for better browser support
	// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
	function isPromise(input) {
		return (
			(
				typeof Promise !== 'undefined' &&
				input instanceof Promise
			) ||
			(
				input !== null &&
				typeof input === 'object' &&
				typeof input.then === 'function' &&
				typeof input.catch === 'function'
			)
		);
	}
	exports.isPromise = isPromise;

	function isArrayBufferView(value) {
	  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
	    return ArrayBuffer.isView(value);
	  }

	  return (
	    isTypedArray$1(value) ||
	    isDataView(value)
	  );
	}
	exports.isArrayBufferView = isArrayBufferView;


	function isUint8Array(value) {
	  return whichTypedArray(value) === 'Uint8Array';
	}
	exports.isUint8Array = isUint8Array;

	function isUint8ClampedArray(value) {
	  return whichTypedArray(value) === 'Uint8ClampedArray';
	}
	exports.isUint8ClampedArray = isUint8ClampedArray;

	function isUint16Array(value) {
	  return whichTypedArray(value) === 'Uint16Array';
	}
	exports.isUint16Array = isUint16Array;

	function isUint32Array(value) {
	  return whichTypedArray(value) === 'Uint32Array';
	}
	exports.isUint32Array = isUint32Array;

	function isInt8Array(value) {
	  return whichTypedArray(value) === 'Int8Array';
	}
	exports.isInt8Array = isInt8Array;

	function isInt16Array(value) {
	  return whichTypedArray(value) === 'Int16Array';
	}
	exports.isInt16Array = isInt16Array;

	function isInt32Array(value) {
	  return whichTypedArray(value) === 'Int32Array';
	}
	exports.isInt32Array = isInt32Array;

	function isFloat32Array(value) {
	  return whichTypedArray(value) === 'Float32Array';
	}
	exports.isFloat32Array = isFloat32Array;

	function isFloat64Array(value) {
	  return whichTypedArray(value) === 'Float64Array';
	}
	exports.isFloat64Array = isFloat64Array;

	function isBigInt64Array(value) {
	  return whichTypedArray(value) === 'BigInt64Array';
	}
	exports.isBigInt64Array = isBigInt64Array;

	function isBigUint64Array(value) {
	  return whichTypedArray(value) === 'BigUint64Array';
	}
	exports.isBigUint64Array = isBigUint64Array;

	function isMapToString(value) {
	  return ObjectToString(value) === '[object Map]';
	}
	isMapToString.working = (
	  typeof Map !== 'undefined' &&
	  isMapToString(new Map())
	);

	function isMap(value) {
	  if (typeof Map === 'undefined') {
	    return false;
	  }

	  return isMapToString.working
	    ? isMapToString(value)
	    : value instanceof Map;
	}
	exports.isMap = isMap;

	function isSetToString(value) {
	  return ObjectToString(value) === '[object Set]';
	}
	isSetToString.working = (
	  typeof Set !== 'undefined' &&
	  isSetToString(new Set())
	);
	function isSet(value) {
	  if (typeof Set === 'undefined') {
	    return false;
	  }

	  return isSetToString.working
	    ? isSetToString(value)
	    : value instanceof Set;
	}
	exports.isSet = isSet;

	function isWeakMapToString(value) {
	  return ObjectToString(value) === '[object WeakMap]';
	}
	isWeakMapToString.working = (
	  typeof WeakMap !== 'undefined' &&
	  isWeakMapToString(new WeakMap())
	);
	function isWeakMap(value) {
	  if (typeof WeakMap === 'undefined') {
	    return false;
	  }

	  return isWeakMapToString.working
	    ? isWeakMapToString(value)
	    : value instanceof WeakMap;
	}
	exports.isWeakMap = isWeakMap;

	function isWeakSetToString(value) {
	  return ObjectToString(value) === '[object WeakSet]';
	}
	isWeakSetToString.working = (
	  typeof WeakSet !== 'undefined' &&
	  isWeakSetToString(new WeakSet())
	);
	function isWeakSet(value) {
	  return isWeakSetToString(value);
	}
	exports.isWeakSet = isWeakSet;

	function isArrayBufferToString(value) {
	  return ObjectToString(value) === '[object ArrayBuffer]';
	}
	isArrayBufferToString.working = (
	  typeof ArrayBuffer !== 'undefined' &&
	  isArrayBufferToString(new ArrayBuffer())
	);
	function isArrayBuffer(value) {
	  if (typeof ArrayBuffer === 'undefined') {
	    return false;
	  }

	  return isArrayBufferToString.working
	    ? isArrayBufferToString(value)
	    : value instanceof ArrayBuffer;
	}
	exports.isArrayBuffer = isArrayBuffer;

	function isDataViewToString(value) {
	  return ObjectToString(value) === '[object DataView]';
	}
	isDataViewToString.working = (
	  typeof ArrayBuffer !== 'undefined' &&
	  typeof DataView !== 'undefined' &&
	  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
	);
	function isDataView(value) {
	  if (typeof DataView === 'undefined') {
	    return false;
	  }

	  return isDataViewToString.working
	    ? isDataViewToString(value)
	    : value instanceof DataView;
	}
	exports.isDataView = isDataView;

	// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
	var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
	function isSharedArrayBufferToString(value) {
	  return ObjectToString(value) === '[object SharedArrayBuffer]';
	}
	function isSharedArrayBuffer(value) {
	  if (typeof SharedArrayBufferCopy === 'undefined') {
	    return false;
	  }

	  if (typeof isSharedArrayBufferToString.working === 'undefined') {
	    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
	  }

	  return isSharedArrayBufferToString.working
	    ? isSharedArrayBufferToString(value)
	    : value instanceof SharedArrayBufferCopy;
	}
	exports.isSharedArrayBuffer = isSharedArrayBuffer;

	function isAsyncFunction(value) {
	  return ObjectToString(value) === '[object AsyncFunction]';
	}
	exports.isAsyncFunction = isAsyncFunction;

	function isMapIterator(value) {
	  return ObjectToString(value) === '[object Map Iterator]';
	}
	exports.isMapIterator = isMapIterator;

	function isSetIterator(value) {
	  return ObjectToString(value) === '[object Set Iterator]';
	}
	exports.isSetIterator = isSetIterator;

	function isGeneratorObject(value) {
	  return ObjectToString(value) === '[object Generator]';
	}
	exports.isGeneratorObject = isGeneratorObject;

	function isWebAssemblyCompiledModule(value) {
	  return ObjectToString(value) === '[object WebAssembly.Module]';
	}
	exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

	function isNumberObject(value) {
	  return checkBoxedPrimitive(value, numberValue);
	}
	exports.isNumberObject = isNumberObject;

	function isStringObject(value) {
	  return checkBoxedPrimitive(value, stringValue);
	}
	exports.isStringObject = isStringObject;

	function isBooleanObject(value) {
	  return checkBoxedPrimitive(value, booleanValue);
	}
	exports.isBooleanObject = isBooleanObject;

	function isBigIntObject(value) {
	  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
	}
	exports.isBigIntObject = isBigIntObject;

	function isSymbolObject(value) {
	  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
	}
	exports.isSymbolObject = isSymbolObject;

	function isBoxedPrimitive(value) {
	  return (
	    isNumberObject(value) ||
	    isStringObject(value) ||
	    isBooleanObject(value) ||
	    isBigIntObject(value) ||
	    isSymbolObject(value)
	  );
	}
	exports.isBoxedPrimitive = isBoxedPrimitive;

	function isAnyArrayBuffer(value) {
	  return typeof Uint8Array !== 'undefined' && (
	    isArrayBuffer(value) ||
	    isSharedArrayBuffer(value)
	  );
	}
	exports.isAnyArrayBuffer = isAnyArrayBuffer;

	['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
	  Object.defineProperty(exports, method, {
	    enumerable: false,
	    value: function() {
	      throw new Error(method + ' is not supported in userland');
	    }
	  });
	}); 
} (types));

var isBufferBrowser = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
};

(function (exports) {
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
	  function getOwnPropertyDescriptors(obj) {
	    var keys = Object.keys(obj);
	    var descriptors = {};
	    for (var i = 0; i < keys.length; i++) {
	      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
	    }
	    return descriptors;
	  };

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  if (typeof dist.process !== 'undefined' && dist.process.noDeprecation === true) {
	    return fn;
	  }

	  // Allow for deprecating things in the process of starting up.
	  if (typeof dist.process === 'undefined') {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (dist.process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (dist.process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnvRegex = /^$/;

	if ({}.NODE_DEBUG) {
	  var debugEnv = {}.NODE_DEBUG;
	  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
	    .replace(/\*/g, '.*')
	    .replace(/,/g, '$|^')
	    .toUpperCase();
	  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
	}
	exports.debuglog = function(set) {
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (debugEnvRegex.test(set)) {
	      var pid = dist.process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').slice(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.slice(1, -1);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var length = output.reduce(function(prev, cur) {
	    if (cur.indexOf('\n') >= 0) ;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	exports.types = types;

	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	exports.types.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	exports.types.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	exports.types.isNativeError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = isBufferBrowser;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = inherits_browserExports;

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

	exports.promisify = function promisify(original) {
	  if (typeof original !== 'function')
	    throw new TypeError('The "original" argument must be of type Function');

	  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
	    var fn = original[kCustomPromisifiedSymbol];
	    if (typeof fn !== 'function') {
	      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
	    }
	    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
	      value: fn, enumerable: false, writable: false, configurable: true
	    });
	    return fn;
	  }

	  function fn() {
	    var promiseResolve, promiseReject;
	    var promise = new Promise(function (resolve, reject) {
	      promiseResolve = resolve;
	      promiseReject = reject;
	    });

	    var args = [];
	    for (var i = 0; i < arguments.length; i++) {
	      args.push(arguments[i]);
	    }
	    args.push(function (err, value) {
	      if (err) {
	        promiseReject(err);
	      } else {
	        promiseResolve(value);
	      }
	    });

	    try {
	      original.apply(this, args);
	    } catch (err) {
	      promiseReject(err);
	    }

	    return promise;
	  }

	  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

	  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
	    value: fn, enumerable: false, writable: false, configurable: true
	  });
	  return Object.defineProperties(
	    fn,
	    getOwnPropertyDescriptors(original)
	  );
	};

	exports.promisify.custom = kCustomPromisifiedSymbol;

	function callbackifyOnRejected(reason, cb) {
	  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
	  // Because `null` is a special error value in callbacks which means "no error
	  // occurred", we error-wrap so the callback consumer can distinguish between
	  // "the promise rejected with null" or "the promise fulfilled with undefined".
	  if (!reason) {
	    var newReason = new Error('Promise was rejected with a falsy value');
	    newReason.reason = reason;
	    reason = newReason;
	  }
	  return cb(reason);
	}

	function callbackify(original) {
	  if (typeof original !== 'function') {
	    throw new TypeError('The "original" argument must be of type Function');
	  }

	  // We DO NOT return the promise as it gives the user a false sense that
	  // the promise is actually somehow related to the callback's execution
	  // and that the callback throwing will reject the promise.
	  function callbackified() {
	    var args = [];
	    for (var i = 0; i < arguments.length; i++) {
	      args.push(arguments[i]);
	    }

	    var maybeCb = args.pop();
	    if (typeof maybeCb !== 'function') {
	      throw new TypeError('The last argument must be of type Function');
	    }
	    var self = this;
	    var cb = function() {
	      return maybeCb.apply(self, arguments);
	    };
	    // In true node style we process the callback on `nextTick` with all the
	    // implications (stack, `uncaughtException`, `async_hooks`)
	    original.apply(this, args)
	      .then(function(ret) { dist.process.nextTick(cb.bind(null, null, ret)); },
	            function(rej) { dist.process.nextTick(callbackifyOnRejected.bind(null, rej, cb)); });
	  }

	  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
	  Object.defineProperties(callbackified,
	                          getOwnPropertyDescriptors(original));
	  return callbackified;
	}
	exports.callbackify = callbackify; 
} (util$6));

var buffer_list;
var hasRequiredBuffer_list;

function requireBuffer_list () {
	if (hasRequiredBuffer_list) return buffer_list;
	hasRequiredBuffer_list = 1;

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
	function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
	function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
	function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
	var _require = buffer,
	  Buffer = _require.Buffer;
	var _require2 = util$6,
	  inspect = _require2.inspect;
	var custom = inspect && inspect.custom || 'inspect';
	function copyBuffer(src, target, offset) {
	  Buffer.prototype.copy.call(src, target, offset);
	}
	buffer_list = /*#__PURE__*/function () {
	  function BufferList() {
	    _classCallCheck(this, BufferList);
	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }
	  _createClass(BufferList, [{
	    key: "push",
	    value: function push(v) {
	      var entry = {
	        data: v,
	        next: null
	      };
	      if (this.length > 0) this.tail.next = entry;else this.head = entry;
	      this.tail = entry;
	      ++this.length;
	    }
	  }, {
	    key: "unshift",
	    value: function unshift(v) {
	      var entry = {
	        data: v,
	        next: this.head
	      };
	      if (this.length === 0) this.tail = entry;
	      this.head = entry;
	      ++this.length;
	    }
	  }, {
	    key: "shift",
	    value: function shift() {
	      if (this.length === 0) return;
	      var ret = this.head.data;
	      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	      --this.length;
	      return ret;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.head = this.tail = null;
	      this.length = 0;
	    }
	  }, {
	    key: "join",
	    value: function join(s) {
	      if (this.length === 0) return '';
	      var p = this.head;
	      var ret = '' + p.data;
	      while (p = p.next) ret += s + p.data;
	      return ret;
	    }
	  }, {
	    key: "concat",
	    value: function concat(n) {
	      if (this.length === 0) return Buffer.alloc(0);
	      var ret = Buffer.allocUnsafe(n >>> 0);
	      var p = this.head;
	      var i = 0;
	      while (p) {
	        copyBuffer(p.data, ret, i);
	        i += p.data.length;
	        p = p.next;
	      }
	      return ret;
	    }

	    // Consumes a specified amount of bytes or characters from the buffered data.
	  }, {
	    key: "consume",
	    value: function consume(n, hasStrings) {
	      var ret;
	      if (n < this.head.data.length) {
	        // `slice` is the same for buffers and strings.
	        ret = this.head.data.slice(0, n);
	        this.head.data = this.head.data.slice(n);
	      } else if (n === this.head.data.length) {
	        // First chunk is a perfect match.
	        ret = this.shift();
	      } else {
	        // Result spans more than one buffer.
	        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
	      }
	      return ret;
	    }
	  }, {
	    key: "first",
	    value: function first() {
	      return this.head.data;
	    }

	    // Consumes a specified amount of characters from the buffered data.
	  }, {
	    key: "_getString",
	    value: function _getString(n) {
	      var p = this.head;
	      var c = 1;
	      var ret = p.data;
	      n -= ret.length;
	      while (p = p.next) {
	        var str = p.data;
	        var nb = n > str.length ? str.length : n;
	        if (nb === str.length) ret += str;else ret += str.slice(0, n);
	        n -= nb;
	        if (n === 0) {
	          if (nb === str.length) {
	            ++c;
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = str.slice(nb);
	          }
	          break;
	        }
	        ++c;
	      }
	      this.length -= c;
	      return ret;
	    }

	    // Consumes a specified amount of bytes from the buffered data.
	  }, {
	    key: "_getBuffer",
	    value: function _getBuffer(n) {
	      var ret = Buffer.allocUnsafe(n);
	      var p = this.head;
	      var c = 1;
	      p.data.copy(ret);
	      n -= p.data.length;
	      while (p = p.next) {
	        var buf = p.data;
	        var nb = n > buf.length ? buf.length : n;
	        buf.copy(ret, ret.length - n, 0, nb);
	        n -= nb;
	        if (n === 0) {
	          if (nb === buf.length) {
	            ++c;
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = buf.slice(nb);
	          }
	          break;
	        }
	        ++c;
	      }
	      this.length -= c;
	      return ret;
	    }

	    // Make sure the linked list only shows the minimal necessary information.
	  }, {
	    key: custom,
	    value: function value(_, options) {
	      return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
	        // Only inspect one level.
	        depth: 0,
	        // It should not recurse.
	        customInspect: false
	      }));
	    }
	  }]);
	  return BufferList;
	}();
	return buffer_list;
}

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;
  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;
  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        dist.process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        dist.process.nextTick(emitErrorNT, this, err);
      }
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }
  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        dist.process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        dist.process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        dist.process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      dist.process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      dist.process.nextTick(emitCloseNT, _this);
    }
  });
  return this;
}
function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}
function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}
function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }
  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}
function emitErrorNT(self, err) {
  self.emit('error', err);
}
function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.

  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}
var destroy_1 = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};

var errorsBrowser = {};

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
errorsBrowser.codes = codes;

var ERR_INVALID_OPT_VALUE = errorsBrowser.codes.ERR_INVALID_OPT_VALUE;
function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }
    return Math.floor(hwm);
  }

  // Default value
  return state.objectMode ? 16 : 16 * 1024;
}
var state = {
  getHighWaterMark: getHighWaterMark
};

/**
 * Module exports.
 */

var browser$1 = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!commonjsGlobal.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = commonjsGlobal.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

var _stream_writable;
var hasRequired_stream_writable;

function require_stream_writable () {
	if (hasRequired_stream_writable) return _stream_writable;
	hasRequired_stream_writable = 1;

	_stream_writable = Writable;

	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;
	  this.next = null;
	  this.entry = null;
	  this.finish = function () {
	    onCorkedFinish(_this, state);
	  };
	}
	/* </replacement> */

	/*<replacement>*/
	var Duplex;
	/*</replacement>*/

	Writable.WritableState = WritableState;

	/*<replacement>*/
	var internalUtil = {
	  deprecate: browser$1
	};
	/*</replacement>*/

	/*<replacement>*/
	var Stream = streamBrowser;
	/*</replacement>*/

	var Buffer = buffer.Buffer;
	var OurUint8Array = (typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function () {};
	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	var destroyImpl = destroy_1;
	var _require = state,
	  getHighWaterMark = _require.getHighWaterMark;
	var _require$codes = errorsBrowser.codes,
	  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
	  ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	  ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
	  ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
	  ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
	  ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
	  ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
	  ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
	var errorOrDestroy = destroyImpl.errorOrDestroy;
	inherits_browserExports(Writable, Stream);
	function nop() {}
	function WritableState(options, stream, isDuplex) {
	  Duplex = Duplex || require_stream_duplex();
	  options = options || {};

	  // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream,
	  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex);

	  // if _final has been called
	  this.finalCalled = false;

	  // drain event flag.
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // has it been destroyed
	  this.destroyed = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;

	  // Should close be emitted on destroy. Defaults to true.
	  this.emitClose = options.emitClose !== false;

	  // Should .destroy() be called after 'finish' (and potentially 'end')
	  this.autoDestroy = !!options.autoDestroy;

	  // count buffered requests
	  this.bufferedRequestCount = 0;

	  // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two
	  this.corkedRequestsFree = new CorkedRequest(this);
	}
	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};
	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function writableStateBufferGetter() {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
	    });
	  } catch (_) {}
	})();

	// Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.
	var realHasInstance;
	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable, Symbol.hasInstance, {
	    value: function value(object) {
	      if (realHasInstance.call(this, object)) return true;
	      if (this !== Writable) return false;
	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function realHasInstance(object) {
	    return object instanceof this;
	  };
	}
	function Writable(options) {
	  Duplex = Duplex || require_stream_duplex();

	  // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.

	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.

	  // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the WritableState constructor, at least with V8 6.5
	  var isDuplex = this instanceof Duplex;
	  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
	  this._writableState = new WritableState(options, this, isDuplex);

	  // legacy.
	  this.writable = true;
	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	    if (typeof options.writev === 'function') this._writev = options.writev;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	    if (typeof options.final === 'function') this._final = options.final;
	  }
	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
	};
	function writeAfterEnd(stream, cb) {
	  var er = new ERR_STREAM_WRITE_AFTER_END();
	  // TODO: defer error events consistently everywhere, not just the cb
	  errorOrDestroy(stream, er);
	  dist.process.nextTick(cb, er);
	}

	// Checks that a user-supplied chunk is valid, especially for the particular
	// mode the stream is in. Currently this means that `null` is never accepted
	// and undefined/non-string values are only allowed in object mode.
	function validChunk(stream, state, chunk, cb) {
	  var er;
	  if (chunk === null) {
	    er = new ERR_STREAM_NULL_VALUES();
	  } else if (typeof chunk !== 'string' && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
	  }
	  if (er) {
	    errorOrDestroy(stream, er);
	    dist.process.nextTick(cb, er);
	    return false;
	  }
	  return true;
	}
	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	  var isBuf = !state.objectMode && _isUint8Array(chunk);
	  if (isBuf && !Buffer.isBuffer(chunk)) {
	    chunk = _uint8ArrayToBuffer(chunk);
	  }
	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	  if (typeof cb !== 'function') cb = nop;
	  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
	  }
	  return ret;
	};
	Writable.prototype.cork = function () {
	  this._writableState.corked++;
	};
	Writable.prototype.uncork = function () {
	  var state = this._writableState;
	  if (state.corked) {
	    state.corked--;
	    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};
	Object.defineProperty(Writable.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});
	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer.from(chunk, encoding);
	  }
	  return chunk;
	}
	Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	});

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
	  if (!isBuf) {
	    var newChunk = decodeChunk(state, chunk, encoding);
	    if (chunk !== newChunk) {
	      isBuf = true;
	      encoding = 'buffer';
	      chunk = newChunk;
	    }
	  }
	  var len = state.objectMode ? 1 : chunk.length;
	  state.length += len;
	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;
	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = {
	      chunk: chunk,
	      encoding: encoding,
	      isBuf: isBuf,
	      callback: cb,
	      next: null
	    };
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }
	  return ret;
	}
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}
	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	  if (sync) {
	    // defer the callback if we are being called synchronously
	    // to avoid piling up things on the stack
	    dist.process.nextTick(cb, er);
	    // this can emit finish, and it will always happen
	    // after error
	    dist.process.nextTick(finishMaybe, stream, state);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy(stream, er);
	  } else {
	    // the caller expect this to happen before if
	    // it is async
	    cb(er);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy(stream, er);
	    // this can emit finish, but finish must
	    // always follow error
	    finishMaybe(stream, state);
	  }
	}
	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}
	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
	  onwriteStateUpdate(state);
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state) || stream.destroyed;
	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }
	    if (sync) {
	      dist.process.nextTick(afterWrite, stream, state, finished, cb);
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}
	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}

	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;
	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	    var count = 0;
	    var allBuffers = true;
	    while (entry) {
	      buffer[count] = entry;
	      if (!entry.isBuf) allBuffers = false;
	      entry = entry.next;
	      count += 1;
	    }
	    buffer.allBuffers = allBuffers;
	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

	    // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	    state.bufferedRequestCount = 0;
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      state.bufferedRequestCount--;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }
	    if (entry === null) state.lastBufferedRequest = null;
	  }
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}
	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
	};
	Writable.prototype._writev = null;
	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending) endWritable(this, state, cb);
	  return this;
	};
	Object.defineProperty(Writable.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	});
	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	function callFinal(stream, state) {
	  stream._final(function (err) {
	    state.pendingcb--;
	    if (err) {
	      errorOrDestroy(stream, err);
	    }
	    state.prefinished = true;
	    stream.emit('prefinish');
	    finishMaybe(stream, state);
	  });
	}
	function prefinish(stream, state) {
	  if (!state.prefinished && !state.finalCalled) {
	    if (typeof stream._final === 'function' && !state.destroyed) {
	      state.pendingcb++;
	      state.finalCalled = true;
	      dist.process.nextTick(callFinal, stream, state);
	    } else {
	      state.prefinished = true;
	      stream.emit('prefinish');
	    }
	  }
	}
	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    prefinish(stream, state);
	    if (state.pendingcb === 0) {
	      state.finished = true;
	      stream.emit('finish');
	      if (state.autoDestroy) {
	        // In case of duplex streams we need a way to detect
	        // if the readable side is ready for autoDestroy as well
	        var rState = stream._readableState;
	        if (!rState || rState.autoDestroy && rState.endEmitted) {
	          stream.destroy();
	        }
	      }
	    }
	  }
	  return need;
	}
	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) dist.process.nextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}
	function onCorkedFinish(corkReq, state, err) {
	  var entry = corkReq.entry;
	  corkReq.entry = null;
	  while (entry) {
	    var cb = entry.callback;
	    state.pendingcb--;
	    cb(err);
	    entry = entry.next;
	  }

	  // reuse the free corkReq.
	  state.corkedRequestsFree.next = corkReq;
	}
	Object.defineProperty(Writable.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._writableState === undefined) {
	      return false;
	    }
	    return this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._writableState) {
	      return;
	    }

	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._writableState.destroyed = value;
	  }
	});
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;
	Writable.prototype._destroy = function (err, cb) {
	  cb(err);
	};
	return _stream_writable;
}

var _stream_duplex;
var hasRequired_stream_duplex;

function require_stream_duplex () {
	if (hasRequired_stream_duplex) return _stream_duplex;
	hasRequired_stream_duplex = 1;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	};
	/*</replacement>*/

	_stream_duplex = Duplex;
	var Readable = require_stream_readable();
	var Writable = require_stream_writable();
	inherits_browserExports(Duplex, Readable);
	{
	  // Allow the keys array to be GC'ed.
	  var keys = objectKeys(Writable.prototype);
	  for (var v = 0; v < keys.length; v++) {
	    var method = keys[v];
	    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	  }
	}
	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);
	  Readable.call(this, options);
	  Writable.call(this, options);
	  this.allowHalfOpen = true;
	  if (options) {
	    if (options.readable === false) this.readable = false;
	    if (options.writable === false) this.writable = false;
	    if (options.allowHalfOpen === false) {
	      this.allowHalfOpen = false;
	      this.once('end', onend);
	    }
	  }
	}
	Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	});
	Object.defineProperty(Duplex.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});
	Object.defineProperty(Duplex.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	});

	// the no-half-open enforcer
	function onend() {
	  // If the writable side ended, then we're ok.
	  if (this._writableState.ended) return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  dist.process.nextTick(onEndNT, this);
	}
	function onEndNT(self) {
	  self.end();
	}
	Object.defineProperty(Duplex.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return false;
	    }
	    return this._readableState.destroyed && this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return;
	    }

	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._readableState.destroyed = value;
	    this._writableState.destroyed = value;
	  }
	});
	return _stream_duplex;
}

var string_decoder = {};

var safeBuffer = {exports: {}};

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

var hasRequiredSafeBuffer;

function requireSafeBuffer () {
	if (hasRequiredSafeBuffer) return safeBuffer.exports;
	hasRequiredSafeBuffer = 1;
	(function (module, exports) {
		/* eslint-disable node/no-deprecated-api */
		var buffer$1 = buffer;
		var Buffer = buffer$1.Buffer;

		// alternative to using Object.keys for old browsers
		function copyProps (src, dst) {
		  for (var key in src) {
		    dst[key] = src[key];
		  }
		}
		if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
		  module.exports = buffer$1;
		} else {
		  // Copy properties from require('buffer')
		  copyProps(buffer$1, exports);
		  exports.Buffer = SafeBuffer;
		}

		function SafeBuffer (arg, encodingOrOffset, length) {
		  return Buffer(arg, encodingOrOffset, length)
		}

		SafeBuffer.prototype = Object.create(Buffer.prototype);

		// Copy static methods from Buffer
		copyProps(Buffer, SafeBuffer);

		SafeBuffer.from = function (arg, encodingOrOffset, length) {
		  if (typeof arg === 'number') {
		    throw new TypeError('Argument must not be a number')
		  }
		  return Buffer(arg, encodingOrOffset, length)
		};

		SafeBuffer.alloc = function (size, fill, encoding) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  var buf = Buffer(size);
		  if (fill !== undefined) {
		    if (typeof encoding === 'string') {
		      buf.fill(fill, encoding);
		    } else {
		      buf.fill(fill);
		    }
		  } else {
		    buf.fill(0);
		  }
		  return buf
		};

		SafeBuffer.allocUnsafe = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return Buffer(size)
		};

		SafeBuffer.allocUnsafeSlow = function (size) {
		  if (typeof size !== 'number') {
		    throw new TypeError('Argument must be a number')
		  }
		  return buffer$1.SlowBuffer(size)
		}; 
	} (safeBuffer, safeBuffer.exports));
	return safeBuffer.exports;
}

var hasRequiredString_decoder;

function requireString_decoder () {
	if (hasRequiredString_decoder) return string_decoder;
	hasRequiredString_decoder = 1;

	/*<replacement>*/

	var Buffer = requireSafeBuffer().Buffer;
	/*</replacement>*/

	var isEncoding = Buffer.isEncoding || function (encoding) {
	  encoding = '' + encoding;
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};

	function _normalizeEncoding(enc) {
	  if (!enc) return 'utf8';
	  var retried;
	  while (true) {
	    switch (enc) {
	      case 'utf8':
	      case 'utf-8':
	        return 'utf8';
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return 'utf16le';
	      case 'latin1':
	      case 'binary':
	        return 'latin1';
	      case 'base64':
	      case 'ascii':
	      case 'hex':
	        return enc;
	      default:
	        if (retried) return; // undefined
	        enc = ('' + enc).toLowerCase();
	        retried = true;
	    }
	  }
	}
	// Do not cache `Buffer.isEncoding` when checking encoding names as some
	// modules monkey-patch it to support additional encodings
	function normalizeEncoding(enc) {
	  var nenc = _normalizeEncoding(enc);
	  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
	  return nenc || enc;
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters.
	string_decoder.StringDecoder = StringDecoder;
	function StringDecoder(encoding) {
	  this.encoding = normalizeEncoding(encoding);
	  var nb;
	  switch (this.encoding) {
	    case 'utf16le':
	      this.text = utf16Text;
	      this.end = utf16End;
	      nb = 4;
	      break;
	    case 'utf8':
	      this.fillLast = utf8FillLast;
	      nb = 4;
	      break;
	    case 'base64':
	      this.text = base64Text;
	      this.end = base64End;
	      nb = 3;
	      break;
	    default:
	      this.write = simpleWrite;
	      this.end = simpleEnd;
	      return;
	  }
	  this.lastNeed = 0;
	  this.lastTotal = 0;
	  this.lastChar = Buffer.allocUnsafe(nb);
	}

	StringDecoder.prototype.write = function (buf) {
	  if (buf.length === 0) return '';
	  var r;
	  var i;
	  if (this.lastNeed) {
	    r = this.fillLast(buf);
	    if (r === undefined) return '';
	    i = this.lastNeed;
	    this.lastNeed = 0;
	  } else {
	    i = 0;
	  }
	  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
	  return r || '';
	};

	StringDecoder.prototype.end = utf8End;

	// Returns only complete characters in a Buffer
	StringDecoder.prototype.text = utf8Text;

	// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
	StringDecoder.prototype.fillLast = function (buf) {
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
	  this.lastNeed -= buf.length;
	};

	// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
	// continuation byte. If an invalid byte is detected, -2 is returned.
	function utf8CheckByte(byte) {
	  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
	  return byte >> 6 === 0x02 ? -1 : -2;
	}

	// Checks at most 3 bytes at the end of a Buffer in order to detect an
	// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
	// needed to complete the UTF-8 character (if applicable) are returned.
	function utf8CheckIncomplete(self, buf, i) {
	  var j = buf.length - 1;
	  if (j < i) return 0;
	  var nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 1;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 2;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) {
	      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
	    }
	    return nb;
	  }
	  return 0;
	}

	// Validates as many continuation bytes for a multi-byte UTF-8 character as
	// needed or are available. If we see a non-continuation byte where we expect
	// one, we "replace" the validated continuation bytes we've seen so far with
	// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
	// behavior. The continuation byte check is included three times in the case
	// where all of the continuation bytes for a character exist in the same buffer.
	// It is also done this way as a slight performance increase instead of using a
	// loop.
	function utf8CheckExtraBytes(self, buf, p) {
	  if ((buf[0] & 0xC0) !== 0x80) {
	    self.lastNeed = 0;
	    return '\ufffd';
	  }
	  if (self.lastNeed > 1 && buf.length > 1) {
	    if ((buf[1] & 0xC0) !== 0x80) {
	      self.lastNeed = 1;
	      return '\ufffd';
	    }
	    if (self.lastNeed > 2 && buf.length > 2) {
	      if ((buf[2] & 0xC0) !== 0x80) {
	        self.lastNeed = 2;
	        return '\ufffd';
	      }
	    }
	  }
	}

	// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
	function utf8FillLast(buf) {
	  var p = this.lastTotal - this.lastNeed;
	  var r = utf8CheckExtraBytes(this, buf);
	  if (r !== undefined) return r;
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, p, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, p, 0, buf.length);
	  this.lastNeed -= buf.length;
	}

	// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
	// partial character, the character's bytes are buffered until the required
	// number of bytes are available.
	function utf8Text(buf, i) {
	  var total = utf8CheckIncomplete(this, buf, i);
	  if (!this.lastNeed) return buf.toString('utf8', i);
	  this.lastTotal = total;
	  var end = buf.length - (total - this.lastNeed);
	  buf.copy(this.lastChar, 0, end);
	  return buf.toString('utf8', i, end);
	}

	// For UTF-8, a replacement character is added when ending on a partial
	// character.
	function utf8End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + '\ufffd';
	  return r;
	}

	// UTF-16LE typically needs two bytes per character, but even if we have an even
	// number of bytes available, we need to check if we end on a leading/high
	// surrogate. In that case, we need to wait for the next two bytes in order to
	// decode the last character properly.
	function utf16Text(buf, i) {
	  if ((buf.length - i) % 2 === 0) {
	    var r = buf.toString('utf16le', i);
	    if (r) {
	      var c = r.charCodeAt(r.length - 1);
	      if (c >= 0xD800 && c <= 0xDBFF) {
	        this.lastNeed = 2;
	        this.lastTotal = 4;
	        this.lastChar[0] = buf[buf.length - 2];
	        this.lastChar[1] = buf[buf.length - 1];
	        return r.slice(0, -1);
	      }
	    }
	    return r;
	  }
	  this.lastNeed = 1;
	  this.lastTotal = 2;
	  this.lastChar[0] = buf[buf.length - 1];
	  return buf.toString('utf16le', i, buf.length - 1);
	}

	// For UTF-16LE we do not explicitly append special replacement characters if we
	// end on a partial character, we simply let v8 handle that.
	function utf16End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) {
	    var end = this.lastTotal - this.lastNeed;
	    return r + this.lastChar.toString('utf16le', 0, end);
	  }
	  return r;
	}

	function base64Text(buf, i) {
	  var n = (buf.length - i) % 3;
	  if (n === 0) return buf.toString('base64', i);
	  this.lastNeed = 3 - n;
	  this.lastTotal = 3;
	  if (n === 1) {
	    this.lastChar[0] = buf[buf.length - 1];
	  } else {
	    this.lastChar[0] = buf[buf.length - 2];
	    this.lastChar[1] = buf[buf.length - 1];
	  }
	  return buf.toString('base64', i, buf.length - n);
	}

	function base64End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
	  return r;
	}

	// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
	function simpleWrite(buf) {
	  return buf.toString(this.encoding);
	}

	function simpleEnd(buf) {
	  return buf && buf.length ? this.write(buf) : '';
	}
	return string_decoder;
}

var ERR_STREAM_PREMATURE_CLOSE = errorsBrowser.codes.ERR_STREAM_PREMATURE_CLOSE;
function once$1(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    callback.apply(this, args);
  };
}
function noop$1() {}
function isRequest$1(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}
function eos$1(stream, opts, callback) {
  if (typeof opts === 'function') return eos$1(stream, null, opts);
  if (!opts) opts = {};
  callback = once$1(callback || noop$1);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;
  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };
  var writableEnded = stream._writableState && stream._writableState.finished;
  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };
  var readableEnded = stream._readableState && stream._readableState.endEmitted;
  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };
  var onerror = function onerror(err) {
    callback.call(stream, err);
  };
  var onclose = function onclose() {
    var err;
    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };
  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };
  if (isRequest$1(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }
  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}
var endOfStream = eos$1;

var async_iterator;
var hasRequiredAsync_iterator;

function requireAsync_iterator () {
	if (hasRequiredAsync_iterator) return async_iterator;
	hasRequiredAsync_iterator = 1;

	var _Object$setPrototypeO;
	function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
	function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
	var finished = endOfStream;
	var kLastResolve = Symbol('lastResolve');
	var kLastReject = Symbol('lastReject');
	var kError = Symbol('error');
	var kEnded = Symbol('ended');
	var kLastPromise = Symbol('lastPromise');
	var kHandlePromise = Symbol('handlePromise');
	var kStream = Symbol('stream');
	function createIterResult(value, done) {
	  return {
	    value: value,
	    done: done
	  };
	}
	function readAndResolve(iter) {
	  var resolve = iter[kLastResolve];
	  if (resolve !== null) {
	    var data = iter[kStream].read();
	    // we defer if data is null
	    // we can be expecting either 'end' or
	    // 'error'
	    if (data !== null) {
	      iter[kLastPromise] = null;
	      iter[kLastResolve] = null;
	      iter[kLastReject] = null;
	      resolve(createIterResult(data, false));
	    }
	  }
	}
	function onReadable(iter) {
	  // we wait for the next tick, because it might
	  // emit an error with process.nextTick
	  dist.process.nextTick(readAndResolve, iter);
	}
	function wrapForNext(lastPromise, iter) {
	  return function (resolve, reject) {
	    lastPromise.then(function () {
	      if (iter[kEnded]) {
	        resolve(createIterResult(undefined, true));
	        return;
	      }
	      iter[kHandlePromise](resolve, reject);
	    }, reject);
	  };
	}
	var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
	var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
	  get stream() {
	    return this[kStream];
	  },
	  next: function next() {
	    var _this = this;
	    // if we have detected an error in the meanwhile
	    // reject straight away
	    var error = this[kError];
	    if (error !== null) {
	      return Promise.reject(error);
	    }
	    if (this[kEnded]) {
	      return Promise.resolve(createIterResult(undefined, true));
	    }
	    if (this[kStream].destroyed) {
	      // We need to defer via nextTick because if .destroy(err) is
	      // called, the error will be emitted via nextTick, and
	      // we cannot guarantee that there is no error lingering around
	      // waiting to be emitted.
	      return new Promise(function (resolve, reject) {
	        dist.process.nextTick(function () {
	          if (_this[kError]) {
	            reject(_this[kError]);
	          } else {
	            resolve(createIterResult(undefined, true));
	          }
	        });
	      });
	    }

	    // if we have multiple next() calls
	    // we will wait for the previous Promise to finish
	    // this logic is optimized to support for await loops,
	    // where next() is only called once at a time
	    var lastPromise = this[kLastPromise];
	    var promise;
	    if (lastPromise) {
	      promise = new Promise(wrapForNext(lastPromise, this));
	    } else {
	      // fast path needed to support multiple this.push()
	      // without triggering the next() queue
	      var data = this[kStream].read();
	      if (data !== null) {
	        return Promise.resolve(createIterResult(data, false));
	      }
	      promise = new Promise(this[kHandlePromise]);
	    }
	    this[kLastPromise] = promise;
	    return promise;
	  }
	}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
	  return this;
	}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
	  var _this2 = this;
	  // destroy(err, cb) is a private API
	  // we can guarantee we have that here, because we control the
	  // Readable class this is attached to
	  return new Promise(function (resolve, reject) {
	    _this2[kStream].destroy(null, function (err) {
	      if (err) {
	        reject(err);
	        return;
	      }
	      resolve(createIterResult(undefined, true));
	    });
	  });
	}), _Object$setPrototypeO), AsyncIteratorPrototype);
	var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
	  var _Object$create;
	  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
	    value: stream,
	    writable: true
	  }), _defineProperty(_Object$create, kLastResolve, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kLastReject, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kError, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kEnded, {
	    value: stream._readableState.endEmitted,
	    writable: true
	  }), _defineProperty(_Object$create, kHandlePromise, {
	    value: function value(resolve, reject) {
	      var data = iterator[kStream].read();
	      if (data) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        resolve(createIterResult(data, false));
	      } else {
	        iterator[kLastResolve] = resolve;
	        iterator[kLastReject] = reject;
	      }
	    },
	    writable: true
	  }), _Object$create));
	  iterator[kLastPromise] = null;
	  finished(stream, function (err) {
	    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
	      var reject = iterator[kLastReject];
	      // reject if we are waiting for data in the Promise
	      // returned by next() and store the error
	      if (reject !== null) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        reject(err);
	      }
	      iterator[kError] = err;
	      return;
	    }
	    var resolve = iterator[kLastResolve];
	    if (resolve !== null) {
	      iterator[kLastPromise] = null;
	      iterator[kLastResolve] = null;
	      iterator[kLastReject] = null;
	      resolve(createIterResult(undefined, true));
	    }
	    iterator[kEnded] = true;
	  });
	  stream.on('readable', onReadable.bind(null, iterator));
	  return iterator;
	};
	async_iterator = createReadableStreamAsyncIterator;
	return async_iterator;
}

var fromBrowser;
var hasRequiredFromBrowser;

function requireFromBrowser () {
	if (hasRequiredFromBrowser) return fromBrowser;
	hasRequiredFromBrowser = 1;
	fromBrowser = function () {
	  throw new Error('Readable.from is not available in the browser')
	};
	return fromBrowser;
}

var _stream_readable;
var hasRequired_stream_readable;

function require_stream_readable () {
	if (hasRequired_stream_readable) return _stream_readable;
	hasRequired_stream_readable = 1;

	_stream_readable = Readable;

	/*<replacement>*/
	var Duplex;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	/*<replacement>*/
	eventsExports.EventEmitter;
	var EElistenerCount = function EElistenerCount(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	/*<replacement>*/
	var Stream = streamBrowser;
	/*</replacement>*/

	var Buffer = buffer.Buffer;
	var OurUint8Array = (typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function () {};
	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}

	/*<replacement>*/
	var debugUtil = util$6;
	var debug;
	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function debug() {};
	}
	/*</replacement>*/

	var BufferList = requireBuffer_list();
	var destroyImpl = destroy_1;
	var _require = state,
	  getHighWaterMark = _require.getHighWaterMark;
	var _require$codes = errorsBrowser.codes,
	  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
	  ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
	  ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	  ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;

	// Lazy loaded to improve the startup performance.
	var StringDecoder;
	var createReadableStreamAsyncIterator;
	var from;
	inherits_browserExports(Readable, Stream);
	var errorOrDestroy = destroyImpl.errorOrDestroy;
	var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];
	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

	  // This is a hack to make sure that our error handler is attached before any
	  // userland ones.  NEVER DO THIS. This is here only because this code needs
	  // to continue to work with older versions of Node.js that do not include
	  // the prependListener() method. The goal is to eventually remove this hack.
	  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	}
	function ReadableState(options, stream, isDuplex) {
	  Duplex = Duplex || require_stream_duplex();
	  options = options || {};

	  // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream.
	  // These options can be provided separately as readableXXX and writableXXX.
	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex;

	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex);

	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the event 'readable'/'data' is emitted
	  // immediately, or on a later tick.  We set this to true at first, because
	  // any actions that shouldn't happen until "later" should generally also
	  // not happen before the first read call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;
	  this.paused = true;

	  // Should close be emitted on destroy. Defaults to true.
	  this.emitClose = options.emitClose !== false;

	  // Should .destroy() be called after 'end' (and potentially 'finish')
	  this.autoDestroy = !!options.autoDestroy;

	  // has it been destroyed
	  this.destroyed = false;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;
	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = requireString_decoder().StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	function Readable(options) {
	  Duplex = Duplex || require_stream_duplex();
	  if (!(this instanceof Readable)) return new Readable(options);

	  // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the ReadableState constructor, at least with V8 6.5
	  var isDuplex = this instanceof Duplex;
	  this._readableState = new ReadableState(options, this, isDuplex);

	  // legacy
	  this.readable = true;
	  if (options) {
	    if (typeof options.read === 'function') this._read = options.read;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	  }
	  Stream.call(this);
	}
	Object.defineProperty(Readable.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined) {
	      return false;
	    }
	    return this._readableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._readableState) {
	      return;
	    }

	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._readableState.destroyed = value;
	  }
	});
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;
	Readable.prototype._destroy = function (err, cb) {
	  cb(err);
	};

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	  var skipChunkCheck;
	  if (!state.objectMode) {
	    if (typeof chunk === 'string') {
	      encoding = encoding || state.defaultEncoding;
	      if (encoding !== state.encoding) {
	        chunk = Buffer.from(chunk, encoding);
	        encoding = '';
	      }
	      skipChunkCheck = true;
	    }
	  } else {
	    skipChunkCheck = true;
	  }
	  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  return readableAddChunk(this, chunk, null, true, false);
	};
	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
	  debug('readableAddChunk', chunk);
	  var state = stream._readableState;
	  if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else {
	    var er;
	    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
	    if (er) {
	      errorOrDestroy(stream, er);
	    } else if (state.objectMode || chunk && chunk.length > 0) {
	      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
	        chunk = _uint8ArrayToBuffer(chunk);
	      }
	      if (addToFront) {
	        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
	      } else if (state.ended) {
	        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
	      } else if (state.destroyed) {
	        return false;
	      } else {
	        state.reading = false;
	        if (state.decoder && !encoding) {
	          chunk = state.decoder.write(chunk);
	          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
	        } else {
	          addChunk(stream, state, chunk, false);
	        }
	      }
	    } else if (!addToFront) {
	      state.reading = false;
	      maybeReadMore(stream, state);
	    }
	  }

	  // We can push more data if we are below the highWaterMark.
	  // Also, if we have no data yet, we can stand some more bytes.
	  // This is to work around cases where hwm=0, such as the repl.
	  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
	}
	function addChunk(stream, state, chunk, addToFront) {
	  if (state.flowing && state.length === 0 && !state.sync) {
	    state.awaitDrain = 0;
	    stream.emit('data', chunk);
	  } else {
	    // update the buffer info.
	    state.length += state.objectMode ? 1 : chunk.length;
	    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	    if (state.needReadable) emitReadable(stream);
	  }
	  maybeReadMore(stream, state);
	}
	function chunkInvalid(state, chunk) {
	  var er;
	  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
	  }
	  return er;
	}
	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};

	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = requireString_decoder().StringDecoder;
	  var decoder = new StringDecoder(enc);
	  this._readableState.decoder = decoder;
	  // If setEncoding(null), decoder.encoding equals utf8
	  this._readableState.encoding = this._readableState.decoder.encoding;

	  // Iterate over current buffer to convert already stored Buffers:
	  var p = this._readableState.buffer.head;
	  var content = '';
	  while (p !== null) {
	    content += decoder.write(p.data);
	    p = p.next;
	  }
	  this._readableState.buffer.clear();
	  if (content !== '') this._readableState.buffer.push(content);
	  this._readableState.length = content.length;
	  return this;
	};

	// Don't raise the hwm > 1GB
	var MAX_HWM = 0x40000000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}

	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	  if (n !== 0) state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }
	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.
	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }
	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;
	  if (ret === null) {
	    state.needReadable = state.length <= state.highWaterMark;
	    n = 0;
	  } else {
	    state.length -= n;
	    state.awaitDrain = 0;
	  }
	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true;

	    // If we tried to read() past the EOF, then emit end on the next tick.
	    if (nOrig !== n && state.ended) endReadable(this);
	  }
	  if (ret !== null) this.emit('data', ret);
	  return ret;
	};
	function onEofChunk(stream, state) {
	  debug('onEofChunk');
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;
	  if (state.sync) {
	    // if we are sync, wait until next tick to emit the data.
	    // Otherwise we risk emitting data in the flow()
	    // the readable code triggers during a read() call
	    emitReadable(stream);
	  } else {
	    // emit 'readable' now to make sure it gets picked up.
	    state.needReadable = false;
	    if (!state.emittedReadable) {
	      state.emittedReadable = true;
	      emitReadable_(stream);
	    }
	  }
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  debug('emitReadable', state.needReadable, state.emittedReadable);
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    dist.process.nextTick(emitReadable_, stream);
	  }
	}
	function emitReadable_(stream) {
	  var state = stream._readableState;
	  debug('emitReadable_', state.destroyed, state.length, state.ended);
	  if (!state.destroyed && (state.length || state.ended)) {
	    stream.emit('readable');
	    state.emittedReadable = false;
	  }

	  // The stream needs another readable event if
	  // 1. It is not flowing, as the flow mechanism will take
	  //    care of it.
	  // 2. It is not ended.
	  // 3. It is below the highWaterMark, so we can schedule
	  //    another readable later.
	  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
	  flow(stream);
	}

	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    dist.process.nextTick(maybeReadMore_, stream, state);
	  }
	}
	function maybeReadMore_(stream, state) {
	  // Attempt to read more data if we should.
	  //
	  // The conditions for reading more data are (one of):
	  // - Not enough data buffered (state.length < state.highWaterMark). The loop
	  //   is responsible for filling the buffer with enough data if such data
	  //   is available. If highWaterMark is 0 and we are not in the flowing mode
	  //   we should _not_ attempt to buffer any extra data. We'll get more data
	  //   when the stream consumer calls read() instead.
	  // - No data in the buffer, and the stream is in flowing mode. In this mode
	  //   the loop below is responsible for ensuring read() is called. Failing to
	  //   call read here would abort the flow and there's no other mechanism for
	  //   continuing the flow if the stream consumer has just subscribed to the
	  //   'data' event.
	  //
	  // In addition to the above conditions to keep reading data, the following
	  // conditions prevent the data from being read:
	  // - The stream has ended (state.ended).
	  // - There is already a pending 'read' operation (state.reading). This is a
	  //   case where the the stream has called the implementation defined _read()
	  //   method, but they are processing the call asynchronously and have _not_
	  //   called push() with new data. In this case we skip performing more
	  //   read()s. The execution ends in this method again after the _read() ends
	  //   up calling push() with more data.
	  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
	    var len = state.length;
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
	};
	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;
	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== dist.process.stdout && dest !== dist.process.stderr;
	  var endFn = doEnd ? onend : unpipe;
	  if (state.endEmitted) dist.process.nextTick(endFn);else src.once('end', endFn);
	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable, unpipeInfo) {
	    debug('onunpipe');
	    if (readable === src) {
	      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
	        unpipeInfo.hasUnpiped = true;
	        cleanup();
	      }
	    }
	  }
	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', unpipe);
	    src.removeListener('data', ondata);
	    cleanedUp = true;

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    debug('dest.write', ret);
	    if (ret === false) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', state.awaitDrain);
	        state.awaitDrain++;
	      }
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
	  }

	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);

	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);
	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }
	  return dest;
	};
	function pipeOnDrain(src) {
	  return function pipeOnDrainFunctionResult() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}
	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;
	  var unpipeInfo = {
	    hasUnpiped: false
	  };

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	    if (!dest) dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this, unpipeInfo);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    for (var i = 0; i < len; i++) dests[i].emit('unpipe', this, {
	      hasUnpiped: false
	    });
	    return this;
	  }

	  // try to find the right one.
	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;
	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	  dest.emit('unpipe', this, unpipeInfo);
	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	  var state = this._readableState;
	  if (ev === 'data') {
	    // update readableListening so that resume() may be a no-op
	    // a few lines down. This is needed to support once('readable').
	    state.readableListening = this.listenerCount('readable') > 0;

	    // Try start flowing on next tick if stream isn't explicitly paused
	    if (state.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.flowing = false;
	      state.emittedReadable = false;
	      debug('on readable', state.length, state.reading);
	      if (state.length) {
	        emitReadable(this);
	      } else if (!state.reading) {
	        dist.process.nextTick(nReadingNextTick, this);
	      }
	    }
	  }
	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	Readable.prototype.removeListener = function (ev, fn) {
	  var res = Stream.prototype.removeListener.call(this, ev, fn);
	  if (ev === 'readable') {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    dist.process.nextTick(updateReadableListening, this);
	  }
	  return res;
	};
	Readable.prototype.removeAllListeners = function (ev) {
	  var res = Stream.prototype.removeAllListeners.apply(this, arguments);
	  if (ev === 'readable' || ev === undefined) {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    dist.process.nextTick(updateReadableListening, this);
	  }
	  return res;
	};
	function updateReadableListening(self) {
	  var state = self._readableState;
	  state.readableListening = self.listenerCount('readable') > 0;
	  if (state.resumeScheduled && !state.paused) {
	    // flowing needs to be set to true now, otherwise
	    // the upcoming resume will not flow.
	    state.flowing = true;

	    // crude way to check if we should resume
	  } else if (self.listenerCount('data') > 0) {
	    self.resume();
	  }
	}
	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    // we flow only if there is no one listening
	    // for readable, but we still have to call
	    // resume()
	    state.flowing = !state.readableListening;
	    resume(this, state);
	  }
	  state.paused = false;
	  return this;
	};
	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    dist.process.nextTick(resume_, stream, state);
	  }
	}
	function resume_(stream, state) {
	  debug('resume', state.reading);
	  if (!state.reading) {
	    stream.read(0);
	  }
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}
	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (this._readableState.flowing !== false) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  this._readableState.paused = true;
	  return this;
	};
	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  while (state.flowing && stream.read() !== null);
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var _this = this;
	  var state = this._readableState;
	  var paused = false;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) _this.push(chunk);
	    }
	    _this.push(null);
	  });
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
	    var ret = _this.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function methodWrap(method) {
	        return function methodWrapReturnFunction() {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }

	  // proxy certain important events.
	  for (var n = 0; n < kProxyEvents.length; n++) {
	    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
	  }

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  this._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };
	  return this;
	};
	if (typeof Symbol === 'function') {
	  Readable.prototype[Symbol.asyncIterator] = function () {
	    if (createReadableStreamAsyncIterator === undefined) {
	      createReadableStreamAsyncIterator = requireAsync_iterator();
	    }
	    return createReadableStreamAsyncIterator(this);
	  };
	}
	Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.highWaterMark;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState && this._readableState.buffer;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableFlowing', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.flowing;
	  },
	  set: function set(state) {
	    if (this._readableState) {
	      this._readableState.flowing = state;
	    }
	  }
	});

	// exposed for testing purposes only.
	Readable._fromList = fromList;
	Object.defineProperty(Readable.prototype, 'readableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.length;
	  }
	});

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = state.buffer.consume(n, state.decoder);
	  }
	  return ret;
	}
	function endReadable(stream) {
	  var state = stream._readableState;
	  debug('endReadable', state.endEmitted);
	  if (!state.endEmitted) {
	    state.ended = true;
	    dist.process.nextTick(endReadableNT, state, stream);
	  }
	}
	function endReadableNT(state, stream) {
	  debug('endReadableNT', state.endEmitted, state.length);

	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	    if (state.autoDestroy) {
	      // In case of duplex streams we need a way to detect
	      // if the writable side is ready for autoDestroy as well
	      var wState = stream._writableState;
	      if (!wState || wState.autoDestroy && wState.finished) {
	        stream.destroy();
	      }
	    }
	  }
	}
	if (typeof Symbol === 'function') {
	  Readable.from = function (iterable, opts) {
	    if (from === undefined) {
	      from = requireFromBrowser();
	    }
	    return from(Readable, iterable, opts);
	  };
	}
	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	return _stream_readable;
}

var _stream_transform = Transform$1;
var _require$codes$1 = errorsBrowser.codes,
  ERR_METHOD_NOT_IMPLEMENTED = _require$codes$1.ERR_METHOD_NOT_IMPLEMENTED,
  ERR_MULTIPLE_CALLBACK = _require$codes$1.ERR_MULTIPLE_CALLBACK,
  ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes$1.ERR_TRANSFORM_ALREADY_TRANSFORMING,
  ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes$1.ERR_TRANSFORM_WITH_LENGTH_0;
var Duplex = require_stream_duplex();
inherits_browserExports(Transform$1, Duplex);
function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;
  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }
  ts.writechunk = null;
  ts.writecb = null;
  if (data != null)
    // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}
function Transform$1(options) {
  if (!(this instanceof Transform$1)) return new Transform$1(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;
  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}
function prefinish() {
  var _this = this;
  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}
Transform$1.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform$1.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};
Transform$1.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform$1.prototype._read = function (n) {
  var ts = this._transformState;
  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};
Transform$1.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};
function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null)
    // single equals check for both `null` and `undefined`
    stream.push(data);

  // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}

var _stream_passthrough = PassThrough;
var Transform = _stream_transform;
inherits_browserExports(PassThrough, Transform);
function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}
PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

var eos;
function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}
var _require$codes = errorsBrowser.codes,
  ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
  ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}
function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}
function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = endOfStream;
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true;

    // request.destroy just do .end - .abort is what we want
    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}
function call(fn) {
  fn();
}
function pipe(from, to) {
  return from.pipe(to);
}
function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}
function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }
  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];
  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }
  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}
var pipeline_1 = pipeline;

(function (module, exports) {
	exports = module.exports = require_stream_readable();
	exports.Stream = exports;
	exports.Readable = exports;
	exports.Writable = require_stream_writable();
	exports.Duplex = require_stream_duplex();
	exports.Transform = _stream_transform;
	exports.PassThrough = _stream_passthrough;
	exports.finished = endOfStream;
	exports.pipeline = pipeline_1; 
} (readableBrowser, readableBrowser.exports));

var readableBrowserExports = readableBrowser.exports;

var capability$1 = capability$2;
var inherits$1 = inherits_browserExports;
var stream$1 = readableBrowserExports;

var rStates$1 = response$1.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
};

var IncomingMessage$1 = response$1.IncomingMessage = function (xhr, response, mode, resetTimers) {
	var self = this;
	stream$1.Readable.call(self);

	self._mode = mode;
	self.headers = {};
	self.rawHeaders = [];
	self.trailers = {};
	self.rawTrailers = [];

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		dist.process.nextTick(function () {
			self.emit('close');
		});
	});

	if (mode === 'fetch') {
		self._fetchResponse = response;

		self.url = response.url;
		self.statusCode = response.status;
		self.statusMessage = response.statusText;
		
		response.headers.forEach(function (header, key){
			self.headers[key.toLowerCase()] = header;
			self.rawHeaders.push(key, header);
		});

		if (capability$1.writableStream) {
			var writable = new WritableStream({
				write: function (chunk) {
					resetTimers(false);
					return new Promise(function (resolve, reject) {
						if (self._destroyed) {
							reject();
						} else if(self.push(dist.Buffer.from(chunk))) {
							resolve();
						} else {
							self._resumeFetch = resolve;
						}
					})
				},
				close: function () {
					resetTimers(true);
					if (!self._destroyed)
						self.push(null);
				},
				abort: function (err) {
					resetTimers(true);
					if (!self._destroyed)
						self.emit('error', err);
				}
			});

			try {
				response.body.pipeTo(writable).catch(function (err) {
					resetTimers(true);
					if (!self._destroyed)
						self.emit('error', err);
				});
				return
			} catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this
		}
		// fallback for when writableStream or pipeTo aren't available
		var reader = response.body.getReader();
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				resetTimers(result.done);
				if (result.done) {
					self.push(null);
					return
				}
				self.push(dist.Buffer.from(result.value));
				read();
			}).catch(function (err) {
				resetTimers(true);
				if (!self._destroyed)
					self.emit('error', err);
			});
		}
		read();
	} else {
		self._xhr = xhr;
		self._pos = 0;

		self.url = xhr.responseURL;
		self.statusCode = xhr.status;
		self.statusMessage = xhr.statusText;
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/);
			if (matches) {
				var key = matches[1].toLowerCase();
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = [];
					}
					self.headers[key].push(matches[2]);
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2];
				} else {
					self.headers[key] = matches[2];
				}
				self.rawHeaders.push(matches[1], matches[2]);
			}
		});

		self._charset = 'x-user-defined';
		if (!capability$1.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type'];
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/);
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase();
				}
			}
			if (!self._charset)
				self._charset = 'utf-8'; // best guess
		}
	}
};

inherits$1(IncomingMessage$1, stream$1.Readable);

IncomingMessage$1.prototype._read = function () {
	var self = this;

	var resolve = self._resumeFetch;
	if (resolve) {
		self._resumeFetch = null;
		resolve();
	}
};

IncomingMessage$1.prototype._onXHRProgress = function (resetTimers) {
	var self = this;

	var xhr = self._xhr;

	var response = null;
	switch (self._mode) {
		case 'text':
			response = xhr.responseText;
			if (response.length > self._pos) {
				var newData = response.substr(self._pos);
				if (self._charset === 'x-user-defined') {
					var buffer = dist.Buffer.alloc(newData.length);
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff;

					self.push(buffer);
				} else {
					self.push(newData, self._charset);
				}
				self._pos = response.length;
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates$1.DONE || !xhr.response)
				break
			response = xhr.response;
			self.push(dist.Buffer.from(new Uint8Array(response)));
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response;
			if (xhr.readyState !== rStates$1.LOADING || !response)
				break
			self.push(dist.Buffer.from(new Uint8Array(response)));
			break
		case 'ms-stream':
			response = xhr.response;
			if (xhr.readyState !== rStates$1.LOADING)
				break
			var reader = new commonjsGlobal.MSStreamReader();
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(dist.Buffer.from(new Uint8Array(reader.result.slice(self._pos))));
					self._pos = reader.result.byteLength;
				}
			};
			reader.onload = function () {
				resetTimers(true);
				self.push(null);
			};
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response);
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates$1.DONE && self._mode !== 'ms-stream') {
		resetTimers(true);
		self.push(null);
	}
};

var capability = capability$2;
var inherits = inherits_browserExports;
var response = response$1;
var stream = readableBrowserExports;

var IncomingMessage = response.IncomingMessage;
var rStates = response.readyStates;

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else {
		return 'text'
	}
}

var ClientRequest = request.exports = function (opts) {
	var self = this;
	stream.Writable.call(self);

	self._opts = opts;
	self._body = [];
	self._headers = {};
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + dist.Buffer.from(opts.auth).toString('base64'));
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name]);
	});

	var preferBinary;
	var useFetch = true;
	if (opts.mode === 'disable-fetch' || ('requestTimeout' in opts && !capability.abortController)) {
		// If the use of XHR should be preferred. Not typically needed.
		useFetch = false;
		preferBinary = true;
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false;
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType;
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true;
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch);
	self._fetchTimer = null;
	self._socketTimeout = null;
	self._socketTimer = null;

	self.on('finish', function () {
		self._onFinish();
	});
};

inherits(ClientRequest, stream.Writable);

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this;
	var lowerName = name.toLowerCase();
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	};
};

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()];
	if (header)
		return header.value
	return null
};

ClientRequest.prototype.removeHeader = function (name) {
	var self = this;
	delete self._headers[name.toLowerCase()];
};

ClientRequest.prototype._onFinish = function () {
	var self = this;

	if (self._destroyed)
		return
	var opts = self._opts;

	if ('timeout' in opts && opts.timeout !== 0) {
		self.setTimeout(opts.timeout);
	}

	var headersObj = self._headers;
	var body = null;
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
        body = new Blob(self._body, {
            type: (headersObj['content-type'] || {}).value || ''
        });
    }

	// create flattened list of headers
	var headersList = [];
	Object.keys(headersObj).forEach(function (keyName) {
		var name = headersObj[keyName].name;
		var value = headersObj[keyName].value;
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				headersList.push([name, v]);
			});
		} else {
			headersList.push([name, value]);
		}
	});

	if (self._mode === 'fetch') {
		var signal = null;
		if (capability.abortController) {
			var controller = new AbortController();
			signal = controller.signal;
			self._fetchAbortController = controller;

			if ('requestTimeout' in opts && opts.requestTimeout !== 0) {
				self._fetchTimer = commonjsGlobal.setTimeout(function () {
					self.emit('requestTimeout');
					if (self._fetchAbortController)
						self._fetchAbortController.abort();
				}, opts.requestTimeout);
			}
		}

		commonjsGlobal.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headersList,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin',
			signal: signal
		}).then(function (response) {
			self._fetchResponse = response;
			self._resetTimers(false);
			self._connect();
		}, function (reason) {
			self._resetTimers(true);
			if (!self._destroyed)
				self.emit('error', reason);
		});
	} else {
		var xhr = self._xhr = new commonjsGlobal.XMLHttpRequest();
		try {
			xhr.open(self._opts.method, self._opts.url, true);
		} catch (err) {
			dist.process.nextTick(function () {
				self.emit('error', err);
			});
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode;

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials;

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined');

		if ('requestTimeout' in opts) {
			xhr.timeout = opts.requestTimeout;
			xhr.ontimeout = function () {
				self.emit('requestTimeout');
			};
		}

		headersList.forEach(function (header) {
			xhr.setRequestHeader(header[0], header[1]);
		});

		self._response = null;
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress();
					break
			}
		};
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress();
			};
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self._resetTimers(true);
			self.emit('error', new Error('XHR error'));
		};

		try {
			xhr.send(body);
		} catch (err) {
			dist.process.nextTick(function () {
				self.emit('error', err);
			});
			return
		}
	}
};

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status;
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this;

	self._resetTimers(false);

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect();

	self._response._onXHRProgress(self._resetTimers.bind(self));
};

ClientRequest.prototype._connect = function () {
	var self = this;

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode, self._resetTimers.bind(self));
	self._response.on('error', function(err) {
		self.emit('error', err);
	});

	self.emit('response', self._response);
};

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this;

	self._body.push(chunk);
	cb();
};

ClientRequest.prototype._resetTimers = function (done) {
	var self = this;

	commonjsGlobal.clearTimeout(self._socketTimer);
	self._socketTimer = null;

	if (done) {
		commonjsGlobal.clearTimeout(self._fetchTimer);
		self._fetchTimer = null;
	} else if (self._socketTimeout) {
		self._socketTimer = commonjsGlobal.setTimeout(function () {
			self.emit('timeout');
		}, self._socketTimeout);
	}
};

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function (err) {
	var self = this;
	self._destroyed = true;
	self._resetTimers(true);
	if (self._response)
		self._response._destroyed = true;
	if (self._xhr)
		self._xhr.abort();
	else if (self._fetchAbortController)
		self._fetchAbortController.abort();

	if (err)
		self.emit('error', err);
};

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this;
	if (typeof data === 'function') {
		cb = data;
		data = undefined;
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb);
};

ClientRequest.prototype.setTimeout = function (timeout, cb) {
	var self = this;

	if (cb)
		self.once('timeout', cb);

	self._socketTimeout = timeout;
	self._resetTimers(false);
};

ClientRequest.prototype.flushHeaders = function () {};
ClientRequest.prototype.setNoDelay = function () {};
ClientRequest.prototype.setSocketKeepAlive = function () {};

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'via'
];

var requestExports = request.exports;

var immutable = extend;

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (hasOwnProperty$1.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target
}

var browser = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
};

var url$5 = {exports: {}};

var punycode = {exports: {}};

/*! https://mths.be/punycode v1.4.1 by @mathias */
punycode.exports;

(function (module, exports) {
(function(root) {

		/** Detect free variables */
		var freeExports = exports &&
			!exports.nodeType && exports;
		var freeModule = module &&
			!module.nodeType && module;
		var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw new RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * https://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.4.1',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js, io.js, or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}

	}(commonjsGlobal)); 
} (punycode, punycode.exports));

var punycodeExports = punycode.exports;

var querystring = {exports: {}};

var querystringEs3 = {};

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var decode = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray$1(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray$1 = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

var encode = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

querystringEs3.decode = querystringEs3.parse = decode;
querystringEs3.encode = querystringEs3.stringify = encode;

(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	var querystringEs3$1 = querystringEs3;

	/**
	 * @typedef {import('querystring').escape} qsEscape
	 * @typedef {import('querystring').unescape} qsUnescape
	 */
	/**
	 * @type {qsEscape}
	 */

	function qsEscape(string) {
	  return encodeURIComponent(string);
	}
	/**
	 * @type {qsUnescape}
	 */


	function qsUnescape(string) {
	  return decodeURIComponent(string);
	}

	var api = {
	  decode: querystringEs3$1.decode,
	  encode: querystringEs3$1.encode,
	  parse: querystringEs3$1.parse,
	  stringify: querystringEs3$1.stringify,
	  escape: qsEscape,
	  unescape: qsUnescape
	};

	Object.defineProperty(exports, 'decode', {
		enumerable: true,
		get: function () { return querystringEs3$1.decode; }
	});
	Object.defineProperty(exports, 'encode', {
		enumerable: true,
		get: function () { return querystringEs3$1.encode; }
	});
	Object.defineProperty(exports, 'parse', {
		enumerable: true,
		get: function () { return querystringEs3$1.parse; }
	});
	Object.defineProperty(exports, 'stringify', {
		enumerable: true,
		get: function () { return querystringEs3$1.stringify; }
	});
	exports["default"] = api;
	exports.escape = qsEscape;
	exports.unescape = qsUnescape;

	exports = module.exports = api;
	
} (querystring, querystring.exports));

var querystringExports = querystring.exports;

(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	var require$$0 = punycodeExports;
	var require$$2 = querystringExports;

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
	var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);

	var util$1 = {
	  isString: function(arg) {
	    return typeof(arg) === 'string';
	  },
	  isObject: function(arg) {
	    return typeof(arg) === 'object' && arg !== null;
	  },
	  isNull: function(arg) {
	    return arg === null;
	  },
	  isNullOrUndefined: function(arg) {
	    return arg == null;
	  }
	};

	var punycode = require$$0__default["default"];
	var util = util$1;

	var parse = urlParse;
	var resolve$1 = urlResolve;
	var resolveObject = urlResolveObject;
	var format = urlFormat;

	var Url_1 = Url;

	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,

	    // Special case for a simple path URL
	    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = require$$2__default["default"];

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && util.isObject(url) && url instanceof Url) return url;

	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!util.isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }

	  // Copy chrome, IE, opera backslash-handling behavior.
	  // Back slashes before the query string get converted to forward slashes
	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
	  var queryIndex = url.indexOf('?'),
	      splitter =
	          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	      uSplit = url.split(splitter),
	      slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);

	  var rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.path = rest;
	      this.href = rest;
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	        if (parseQueryString) {
	          this.query = querystring.parse(this.search.substr(1));
	        } else {
	          this.query = this.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        this.search = '';
	        this.query = {};
	      }
	      return this;
	    }
	  }

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;

	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost();

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a punycoded representation of "domain".
	      // It only converts parts of the domain name that
	      // have non-ASCII characters, i.e. it doesn't matter if
	      // you call it with a domain that already is ASCII-only.
	      this.hostname = punycode.toASCII(this.hostname);
	    }

	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {

	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1)
	        continue;
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }


	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }

	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};

	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (util.isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}

	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';

	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }

	  if (this.query &&
	      util.isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }

	  var search = this.search || (query && ('?' + query)) || '';

	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;

	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function(relative) {
	  if (util.isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }

	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol')
	        result[rkey] = relative[rkey];
	    }

	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }

	    result.href = result.format();
	    return result;
	  }

	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];

	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }

	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!util.isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especially happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }

	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host || srcPath.length > 1) &&
	      (last === '.' || last === '..') || last === '');

	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');

	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especially happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }

	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }

	  //to support request.http
	  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// path.resolve([from ...], to)
	// posix version
	function resolve() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : '/';

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	}function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	var _globalThis = function (Object) {
	  function get() {
	    var _global = this || self;

	    delete Object.prototype.__magic__;
	    return _global;
	  }

	  if (typeof globalThis === "object") {
	    return globalThis;
	  }

	  if (this) {
	    return get();
	  } else {
	    Object.defineProperty(Object.prototype, "__magic__", {
	      configurable: true,
	      get: get
	    });
	    var _global = __magic__;
	    return _global;
	  }
	}(Object);
	var formatImport =
	/** @type {formatImport}*/
	format;
	var parseImport =
	/** @type {parseImport}*/
	parse;
	var resolveImport =
	/** @type {resolveImport}*/
	resolve$1; // @ts-ignore

	var UrlImport =
	/** @type {UrlImport}*/
	Url_1;
	var URL = _globalThis.URL;
	/* eslint-disable-next-line unicorn/prevent-abbreviations */

	var URLSearchParams = _globalThis.URLSearchParams;
	var percentRegEx = /%/g;
	var backslashRegEx = /\\/g;
	var newlineRegEx = /\n/g;
	var carriageReturnRegEx = /\r/g;
	var tabRegEx = /\t/g;
	var CHAR_FORWARD_SLASH = 47;
	/**
	 * @param {unknown} instance
	 */

	function isURLInstance(instance) {
	  var resolved =
	  /** @type {URL|null} */
	  instance != null ? instance : null;
	  return Boolean(resolved !== null && (resolved == null ? void 0 : resolved.href) && (resolved == null ? void 0 : resolved.origin));
	}
	/**
	 * @param {URL} url
	 */


	function getPathFromURLPosix(url) {
	  if (url.hostname !== '') {
	    throw new TypeError("File URL host must be \"localhost\" or empty on browser");
	  }

	  var pathname = url.pathname;

	  for (var n = 0; n < pathname.length; n++) {
	    if (pathname[n] === '%') {
	      // @ts-ignore
	      var third = pathname.codePointAt(n + 2) | 0x20;

	      if (pathname[n + 1] === '2' && third === 102) {
	        throw new TypeError('File URL path must not include encoded / characters');
	      }
	    }
	  }

	  return decodeURIComponent(pathname);
	}
	/**
	 * @param {string} filepath
	 */


	function encodePathChars(filepath) {
	  if (filepath.includes('%')) {
	    filepath = filepath.replace(percentRegEx, '%25');
	  }

	  if (filepath.includes('\\')) {
	    filepath = filepath.replace(backslashRegEx, '%5C');
	  }

	  if (filepath.includes('\n')) {
	    filepath = filepath.replace(newlineRegEx, '%0A');
	  }

	  if (filepath.includes('\r')) {
	    filepath = filepath.replace(carriageReturnRegEx, '%0D');
	  }

	  if (filepath.includes('\t')) {
	    filepath = filepath.replace(tabRegEx, '%09');
	  }

	  return filepath;
	}

	var domainToASCII =
	/**
	 * @type {domainToASCII}
	 */
	function domainToASCII(domain) {
	  if (typeof domain === 'undefined') {
	    throw new TypeError('The "domain" argument must be specified');
	  }

	  return new URL("http://" + domain).hostname;
	};

	var domainToUnicode =
	/**
	 * @type {domainToUnicode}
	 */
	function domainToUnicode(domain) {
	  if (typeof domain === 'undefined') {
	    throw new TypeError('The "domain" argument must be specified');
	  }

	  return new URL("http://" + domain).hostname;
	};

	var pathToFileURL =
	/**
	 * @type {(url: string) => URL}
	 */
	function pathToFileURL(filepath) {
	  var outURL = new URL('file://');
	  var resolved = resolve(filepath);
	  var filePathLast = filepath.charCodeAt(filepath.length - 1);

	  if (filePathLast === CHAR_FORWARD_SLASH && resolved[resolved.length - 1] !== '/') {
	    resolved += '/';
	  }

	  outURL.pathname = encodePathChars(resolved);
	  return outURL;
	};

	var fileURLToPath =
	/**
	 * @type {fileURLToPath & ((path: string | URL) => string)}
	 */
	function fileURLToPath(path) {
	  if (!isURLInstance(path) && typeof path !== 'string') {
	    throw new TypeError("The \"path\" argument must be of type string or an instance of URL. Received type " + typeof path + " (" + path + ")");
	  }

	  var resolved = new URL(path);

	  if (resolved.protocol !== 'file:') {
	    throw new TypeError('The URL must be of scheme file');
	  }

	  return getPathFromURLPosix(resolved);
	};

	var formatImportWithOverloads =
	/**
	 * @type {(
	 *   ((urlObject: URL, options?: URLFormatOptions) => string) &
	 *   ((urlObject: UrlObject | string, options?: never) => string)
	 * )}
	 */
	function formatImportWithOverloads(urlObject, options) {
	  var _options$auth, _options$fragment, _options$search;

	  if (options === void 0) {
	    options = {};
	  }

	  if (!(urlObject instanceof URL)) {
	    return formatImport(urlObject);
	  }

	  if (typeof options !== 'object' || options === null) {
	    throw new TypeError('The "options" argument must be of type object.');
	  }

	  var auth = (_options$auth = options.auth) != null ? _options$auth : true;
	  var fragment = (_options$fragment = options.fragment) != null ? _options$fragment : true;
	  var search = (_options$search = options.search) != null ? _options$search : true;
	  var parsed = new URL(urlObject.toString());

	  if (!auth) {
	    parsed.username = '';
	    parsed.password = '';
	  }

	  if (!fragment) {
	    parsed.hash = '';
	  }

	  if (!search) {
	    parsed.search = '';
	  }

	  return parsed.toString();
	};

	var api = {
	  format: formatImportWithOverloads,
	  parse: parseImport,
	  resolve: resolveImport,
	  resolveObject: resolveObject,
	  Url: UrlImport,
	  URL: URL,
	  URLSearchParams: URLSearchParams,
	  domainToASCII: domainToASCII,
	  domainToUnicode: domainToUnicode,
	  pathToFileURL: pathToFileURL,
	  fileURLToPath: fileURLToPath
	};

	exports.URL = URL;
	exports.URLSearchParams = URLSearchParams;
	exports.Url = UrlImport;
	exports["default"] = api;
	exports.domainToASCII = domainToASCII;
	exports.domainToUnicode = domainToUnicode;
	exports.fileURLToPath = fileURLToPath;
	exports.format = formatImportWithOverloads;
	exports.parse = parseImport;
	exports.pathToFileURL = pathToFileURL;
	exports.resolve = resolveImport;
	exports.resolveObject = resolveObject;

	exports = module.exports = api;
	
} (url$5, url$5.exports));

var urlExports = url$5.exports;

(function (exports) {
	var ClientRequest = requestExports;
	var response = response$1;
	var extend = immutable;
	var statusCodes = browser;
	var url = urlExports;

	var http = exports;

	http.request = function (opts, cb) {
		if (typeof opts === 'string')
			opts = url.parse(opts);
		else
			opts = extend(opts);

		// Normally, the page is loaded from http or https, so not specifying a protocol
		// will result in a (valid) protocol-relative url. However, this won't work if
		// the protocol is something else, like 'file:'
		var defaultProtocol = commonjsGlobal.location.protocol.search(/^https?:$/) === -1 ? 'http:' : '';

		var protocol = opts.protocol || defaultProtocol;
		var host = opts.hostname || opts.host;
		var port = opts.port;
		var path = opts.path || '/';

		// Necessary for IPv6 addresses
		if (host && host.indexOf(':') !== -1)
			host = '[' + host + ']';

		// This may be a relative url. The browser should always be able to interpret it correctly.
		opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path;
		opts.method = (opts.method || 'GET').toUpperCase();
		opts.headers = opts.headers || {};

		// Also valid opts.auth, opts.mode

		var req = new ClientRequest(opts);
		if (cb)
			req.on('response', cb);
		return req
	};

	http.get = function get (opts, cb) {
		var req = http.request(opts, cb);
		req.end();
		return req
	};

	http.ClientRequest = ClientRequest;
	http.IncomingMessage = response.IncomingMessage;

	http.Agent = function () {};
	http.Agent.defaultMaxSockets = 4;

	http.globalAgent = new http.Agent();

	http.STATUS_CODES = statusCodes;

	http.METHODS = [
		'CHECKOUT',
		'CONNECT',
		'COPY',
		'DELETE',
		'GET',
		'HEAD',
		'LOCK',
		'M-SEARCH',
		'MERGE',
		'MKACTIVITY',
		'MKCOL',
		'MOVE',
		'NOTIFY',
		'OPTIONS',
		'PATCH',
		'POST',
		'PROPFIND',
		'PROPPATCH',
		'PURGE',
		'PUT',
		'REPORT',
		'SEARCH',
		'SUBSCRIBE',
		'TRACE',
		'UNLOCK',
		'UNSUBSCRIBE'
	]; 
} (streamHttp));

var httpsBrowserify = {exports: {}};

(function (module) {
	var http = streamHttp;
	var url = urlExports;

	var https = module.exports;

	for (var key in http) {
	  if (http.hasOwnProperty(key)) https[key] = http[key];
	}

	https.request = function (params, cb) {
	  params = validateParams(params);
	  return http.request.call(this, params, cb)
	};

	https.get = function (params, cb) {
	  params = validateParams(params);
	  return http.get.call(this, params, cb)
	};

	function validateParams (params) {
	  if (typeof params === 'string') {
	    params = url.parse(params);
	  }
	  if (!params.protocol) {
	    params.protocol = 'https:';
	  }
	  if (params.protocol !== 'https:') {
	    throw new Error('Protocol "' + params.protocol + '" not supported. Expected "https:"')
	  }
	  return params
	} 
} (httpsBrowserify));

var httpsBrowserifyExports = httpsBrowserify.exports;

var HTTP_RESOURCE_PATTERN = /^http:\/\//;

function isHttpResource$1(uri) {
  return HTTP_RESOURCE_PATTERN.test(uri);
}

var isHttpResource_1 = isHttpResource$1;

var HTTPS_RESOURCE_PATTERN = /^https:\/\//;

function isHttpsResource$1(uri) {
  return HTTPS_RESOURCE_PATTERN.test(uri);
}

var isHttpsResource_1 = isHttpsResource$1;

var http = streamHttp;
var https = httpsBrowserifyExports;
var url$4 = urlExports;

var isHttpResource = isHttpResource_1;
var isHttpsResource = isHttpsResource_1;
var override$1 = override_1;

var HTTP_PROTOCOL$1 = 'http:';

function loadRemoteResource$1(uri, inlineRequest, inlineTimeout, callback) {
  var proxyProtocol = inlineRequest.protocol || inlineRequest.hostname;
  var errorHandled = false;
  var requestOptions;
  var fetch;

  requestOptions = override$1(
    url$4.parse(uri),
    inlineRequest || {}
  );

  if (inlineRequest.hostname !== undefined) {
    // overwrite as we always expect a http proxy currently
    requestOptions.protocol = inlineRequest.protocol || HTTP_PROTOCOL$1;
    requestOptions.path = requestOptions.href;
  }

  fetch = (proxyProtocol && !isHttpsResource(proxyProtocol)) || isHttpResource(uri)
    ? http.get
    : https.get;

  fetch(requestOptions, function(res) {
    var chunks = [];
    var movedUri;

    if (errorHandled) {
      return;
    }

    if (res.statusCode < 200 || res.statusCode > 399) {
      return callback(res.statusCode, null);
    } if (res.statusCode > 299) {
      movedUri = url$4.resolve(uri, res.headers.location);
      return loadRemoteResource$1(movedUri, inlineRequest, inlineTimeout, callback);
    }

    res.on('data', function(chunk) {
      chunks.push(chunk.toString());
    });
    res.on('end', function() {
      var body = chunks.join('');
      callback(null, body);
    });
  })
    .on('error', function(res) {
      if (errorHandled) {
        return;
      }

      errorHandled = true;
      callback(res.message, null);
    })
    .on('timeout', function() {
      if (errorHandled) {
        return;
      }

      errorHandled = true;
      callback('timeout', null);
    })
    .setTimeout(inlineTimeout);
}

var loadRemoteResource_1 = loadRemoteResource$1;

var loadRemoteResource = loadRemoteResource_1;

function fetchFrom$1(callback) {
  return callback || loadRemoteResource;
}

var fetch = fetchFrom$1;

function inlineOptionsFrom(rules) {
  if (Array.isArray(rules)) {
    return rules;
  }

  if (rules === false) {
    return ['none'];
  }

  return undefined === rules
    ? ['local']
    : rules.split(',');
}

var inline$1 = inlineOptionsFrom;

var url$3 = urlExports;

var override = override_1;

function inlineRequestFrom$1(option) {
  return override(
    /* jshint camelcase: false */
    proxyOptionsFrom({}.HTTP_PROXY || {}.http_proxy),
    option || {}
  );
}

function proxyOptionsFrom(httpProxy) {
  return httpProxy
    ? {
      hostname: url$3.parse(httpProxy).hostname,
      port: parseInt(url$3.parse(httpProxy).port)
    }
    : {};
}

var inlineRequest = inlineRequestFrom$1;

var DEFAULT_TIMEOUT = 5000;

function inlineTimeoutFrom$1(option) {
  return option || DEFAULT_TIMEOUT;
}

var inlineTimeout = inlineTimeoutFrom$1;

function pluginsFrom$1(plugins) {
  var flatPlugins = {
    level1Value: [],
    level1Property: [],
    level2Block: []
  };

  plugins = plugins || [];

  flatPlugins.level1Value = plugins
    .map(function(plugin) { return plugin.level1 && plugin.level1.value; })
    .filter(function(plugin) { return plugin != null; });

  flatPlugins.level1Property = plugins
    .map(function(plugin) { return plugin.level1 && plugin.level1.property; })
    .filter(function(plugin) { return plugin != null; });

  flatPlugins.level2Block = plugins
    .map(function(plugin) { return plugin.level2 && plugin.level2.block; })
    .filter(function(plugin) { return plugin != null; });

  return flatPlugins;
}

var plugins = pluginsFrom$1;

function rebaseFrom$1(rebaseOption, rebaseToOption) {
  if (undefined !== rebaseToOption) {
    return true;
  } if (undefined === rebaseOption) {
    return false;
  }
  return !!rebaseOption;
}

var rebase$3 = rebaseFrom$1;

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) ; else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = dist.process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

var pathBrowserify = posix;

var path$7 = pathBrowserify;

function rebaseToFrom$1(option) {
  return option ? path$7.resolve(option) : dist.process.cwd();
}

var rebaseTo = rebaseToFrom$1;

var sourceMap = {};

var sourceMapGenerator = {};

var base64Vlq = {};

var base64$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
base64$1.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
base64$1.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = base64$1;

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
base64Vlq.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var util$5 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

(function (exports) {
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	/**
	 * This is a helper function for getting values from parameter/options
	 * objects.
	 *
	 * @param args The object we are extracting values from
	 * @param name The name of the property we are getting.
	 * @param defaultValue An optional value to return if the property is missing
	 * from the object. If this is not specified and the property is missing, an
	 * error will be thrown.
	 */
	function getArg(aArgs, aName, aDefaultValue) {
	  if (aName in aArgs) {
	    return aArgs[aName];
	  } else if (arguments.length === 3) {
	    return aDefaultValue;
	  } else {
	    throw new Error('"' + aName + '" is a required argument.');
	  }
	}
	exports.getArg = getArg;

	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;

	function urlParse(aUrl) {
	  var match = aUrl.match(urlRegexp);
	  if (!match) {
	    return null;
	  }
	  return {
	    scheme: match[1],
	    auth: match[2],
	    host: match[3],
	    port: match[4],
	    path: match[5]
	  };
	}
	exports.urlParse = urlParse;

	function urlGenerate(aParsedUrl) {
	  var url = '';
	  if (aParsedUrl.scheme) {
	    url += aParsedUrl.scheme + ':';
	  }
	  url += '//';
	  if (aParsedUrl.auth) {
	    url += aParsedUrl.auth + '@';
	  }
	  if (aParsedUrl.host) {
	    url += aParsedUrl.host;
	  }
	  if (aParsedUrl.port) {
	    url += ":" + aParsedUrl.port;
	  }
	  if (aParsedUrl.path) {
	    url += aParsedUrl.path;
	  }
	  return url;
	}
	exports.urlGenerate = urlGenerate;

	/**
	 * Normalizes a path, or the path portion of a URL:
	 *
	 * - Replaces consecutive slashes with one slash.
	 * - Removes unnecessary '.' parts.
	 * - Removes unnecessary '<dir>/..' parts.
	 *
	 * Based on code in the Node.js 'path' core module.
	 *
	 * @param aPath The path or url to normalize.
	 */
	function normalize(aPath) {
	  var path = aPath;
	  var url = urlParse(aPath);
	  if (url) {
	    if (!url.path) {
	      return aPath;
	    }
	    path = url.path;
	  }
	  var isAbsolute = exports.isAbsolute(path);

	  var parts = path.split(/\/+/);
	  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
	    part = parts[i];
	    if (part === '.') {
	      parts.splice(i, 1);
	    } else if (part === '..') {
	      up++;
	    } else if (up > 0) {
	      if (part === '') {
	        // The first part is blank if the path is absolute. Trying to go
	        // above the root is a no-op. Therefore we can remove all '..' parts
	        // directly after the root.
	        parts.splice(i + 1, up);
	        up = 0;
	      } else {
	        parts.splice(i, 2);
	        up--;
	      }
	    }
	  }
	  path = parts.join('/');

	  if (path === '') {
	    path = isAbsolute ? '/' : '.';
	  }

	  if (url) {
	    url.path = path;
	    return urlGenerate(url);
	  }
	  return path;
	}
	exports.normalize = normalize;

	/**
	 * Joins two paths/URLs.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be joined with the root.
	 *
	 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	 *   first.
	 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	 *   is updated with the result and aRoot is returned. Otherwise the result
	 *   is returned.
	 *   - If aPath is absolute, the result is aPath.
	 *   - Otherwise the two paths are joined with a slash.
	 * - Joining for example 'http://' and 'www.example.com' is also supported.
	 */
	function join(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }
	  if (aPath === "") {
	    aPath = ".";
	  }
	  var aPathUrl = urlParse(aPath);
	  var aRootUrl = urlParse(aRoot);
	  if (aRootUrl) {
	    aRoot = aRootUrl.path || '/';
	  }

	  // `join(foo, '//www.example.org')`
	  if (aPathUrl && !aPathUrl.scheme) {
	    if (aRootUrl) {
	      aPathUrl.scheme = aRootUrl.scheme;
	    }
	    return urlGenerate(aPathUrl);
	  }

	  if (aPathUrl || aPath.match(dataUrlRegexp)) {
	    return aPath;
	  }

	  // `join('http://', 'www.example.com')`
	  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
	    aRootUrl.host = aPath;
	    return urlGenerate(aRootUrl);
	  }

	  var joined = aPath.charAt(0) === '/'
	    ? aPath
	    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

	  if (aRootUrl) {
	    aRootUrl.path = joined;
	    return urlGenerate(aRootUrl);
	  }
	  return joined;
	}
	exports.join = join;

	exports.isAbsolute = function (aPath) {
	  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
	};

	/**
	 * Make a path relative to a URL or another path.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be made relative to aRoot.
	 */
	function relative(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }

	  aRoot = aRoot.replace(/\/$/, '');

	  // It is possible for the path to be above the root. In this case, simply
	  // checking whether the root is a prefix of the path won't work. Instead, we
	  // need to remove components from the root one by one, until either we find
	  // a prefix that fits, or we run out of components to remove.
	  var level = 0;
	  while (aPath.indexOf(aRoot + '/') !== 0) {
	    var index = aRoot.lastIndexOf("/");
	    if (index < 0) {
	      return aPath;
	    }

	    // If the only part of the root that is left is the scheme (i.e. http://,
	    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
	    // have exhausted all components, so the path is not relative to the root.
	    aRoot = aRoot.slice(0, index);
	    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
	      return aPath;
	    }

	    ++level;
	  }

	  // Make sure we add a "../" for each component we removed from the root.
	  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;

	var supportsNullProto = (function () {
	  var obj = Object.create(null);
	  return !('__proto__' in obj);
	}());

	function identity (s) {
	  return s;
	}

	/**
	 * Because behavior goes wacky when you set `__proto__` on objects, we
	 * have to prefix all the strings in our set with an arbitrary character.
	 *
	 * See https://github.com/mozilla/source-map/pull/31 and
	 * https://github.com/mozilla/source-map/issues/30
	 *
	 * @param String aStr
	 */
	function toSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return '$' + aStr;
	  }

	  return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return aStr.slice(1);
	  }

	  return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
	  if (!s) {
	    return false;
	  }

	  var length = s.length;

	  if (length < 9 /* "__proto__".length */) {
	    return false;
	  }

	  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
	      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
	      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
	      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 9) !== 95  /* '_' */) {
	    return false;
	  }

	  for (var i = length - 10; i >= 0; i--) {
	    if (s.charCodeAt(i) !== 36 /* '$' */) {
	      return false;
	    }
	  }

	  return true;
	}

	/**
	 * Comparator between two mappings where the original positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same original source/line/column, but different generated
	 * line and column the same. Useful when searching for a mapping with a
	 * stubbed out mapping.
	 */
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	  var cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0 || onlyCompareOriginal) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;

	/**
	 * Comparator between two mappings with deflated source and name indices where
	 * the generated positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same generated line and column, but different
	 * source/name/original line and column the same. Useful when searching for a
	 * mapping with a stubbed out mapping.
	 */
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0 || onlyCompareGenerated) {
	    return cmp;
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

	function strcmp(aStr1, aStr2) {
	  if (aStr1 === aStr2) {
	    return 0;
	  }

	  if (aStr1 === null) {
	    return 1; // aStr2 !== null
	  }

	  if (aStr2 === null) {
	    return -1; // aStr1 !== null
	  }

	  if (aStr1 > aStr2) {
	    return 1;
	  }

	  return -1;
	}

	/**
	 * Comparator between two mappings with inflated source and name strings where
	 * the generated positions are compared.
	 */
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

	/**
	 * Strip any JSON XSSI avoidance prefix from the string (as documented
	 * in the source maps specification), and then parse the string as
	 * JSON.
	 */
	function parseSourceMapInput(str) {
	  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
	}
	exports.parseSourceMapInput = parseSourceMapInput;

	/**
	 * Compute the URL of a source given the the source root, the source's
	 * URL, and the source map's URL.
	 */
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
	  sourceURL = sourceURL || '';

	  if (sourceRoot) {
	    // This follows what Chrome does.
	    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
	      sourceRoot += '/';
	    }
	    // The spec says:
	    //   Line 4: An optional source root, useful for relocating source
	    //   files on a server or removing repeated values in the
	    //   “sources” entry.  This value is prepended to the individual
	    //   entries in the “source” field.
	    sourceURL = sourceRoot + sourceURL;
	  }

	  // Historically, SourceMapConsumer did not take the sourceMapURL as
	  // a parameter.  This mode is still somewhat supported, which is why
	  // this code block is conditional.  However, it's preferable to pass
	  // the source map URL to SourceMapConsumer, so that this function
	  // can implement the source URL resolution algorithm as outlined in
	  // the spec.  This block is basically the equivalent of:
	  //    new URL(sourceURL, sourceMapURL).toString()
	  // ... except it avoids using URL, which wasn't available in the
	  // older releases of node still supported by this library.
	  //
	  // The spec says:
	  //   If the sources are not absolute URLs after prepending of the
	  //   “sourceRoot”, the sources are resolved relative to the
	  //   SourceMap (like resolving script src in a html document).
	  if (sourceMapURL) {
	    var parsed = urlParse(sourceMapURL);
	    if (!parsed) {
	      throw new Error("sourceMapURL could not be parsed");
	    }
	    if (parsed.path) {
	      // Strip the last path component, but keep the "/".
	      var index = parsed.path.lastIndexOf('/');
	      if (index >= 0) {
	        parsed.path = parsed.path.substring(0, index + 1);
	      }
	    }
	    sourceURL = join(urlGenerate(parsed), sourceURL);
	  }

	  return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL; 
} (util$5));

var arraySet = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$4 = util$5;
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet$2() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet$2.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet$2();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet$2.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet$2.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util$4.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet$2.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util$4.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet$2.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util$4.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet$2.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet$2.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

arraySet.ArraySet = ArraySet$2;

var mappingList = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$3 = util$5;

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util$3.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList$1() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList$1.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList$1.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList$1.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util$3.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

mappingList.MappingList = MappingList$1;

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ$1 = base64Vlq;
var util$2 = util$5;
var ArraySet$1 = arraySet.ArraySet;
var MappingList = mappingList.MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator$2(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util$2.getArg(aArgs, 'file', null);
  this._sourceRoot = util$2.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util$2.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet$1();
  this._names = new ArraySet$1();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator$2.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator$2.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator$2({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util$2.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util$2.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator$2.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util$2.getArg(aArgs, 'generated');
    var original = util$2.getArg(aArgs, 'original', null);
    var source = util$2.getArg(aArgs, 'source', null);
    var name = util$2.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator$2.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util$2.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util$2.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util$2.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator$2.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util$2.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet$1();
    var newNames = new ArraySet$1();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util$2.join(aSourceMapPath, mapping.source);
          }
          if (sourceRoot != null) {
            mapping.source = util$2.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util$2.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util$2.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator$2.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator$2.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = '';

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util$2.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ$1.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ$1.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ$1.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ$1.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ$1.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator$2.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util$2.relative(aSourceRoot, source);
      }
      var key = util$2.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator$2.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator$2.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

sourceMapGenerator.SourceMapGenerator = SourceMapGenerator$2;

var sourceMapConsumer = {};

var binarySearch$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

(function (exports) {
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;

	/**
	 * Recursive implementation of binary search.
	 *
	 * @param aLow Indices here and lower do not contain the needle.
	 * @param aHigh Indices here and higher do not contain the needle.
	 * @param aNeedle The element being searched for.
	 * @param aHaystack The non-empty array being searched.
	 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 */
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
	  // This function terminates when one of the following is true:
	  //
	  //   1. We find the exact element we are looking for.
	  //
	  //   2. We did not find the exact element, but we can return the index of
	  //      the next-closest element.
	  //
	  //   3. We did not find the exact element, and there is no next-closest
	  //      element than the one we are searching for, so we return -1.
	  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
	  var cmp = aCompare(aNeedle, aHaystack[mid], true);
	  if (cmp === 0) {
	    // Found the element we are looking for.
	    return mid;
	  }
	  else if (cmp > 0) {
	    // Our needle is greater than aHaystack[mid].
	    if (aHigh - mid > 1) {
	      // The element is in the upper half.
	      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
	    }

	    // The exact needle element was not found in this haystack. Determine if
	    // we are in termination case (3) or (2) and return the appropriate thing.
	    if (aBias == exports.LEAST_UPPER_BOUND) {
	      return aHigh < aHaystack.length ? aHigh : -1;
	    } else {
	      return mid;
	    }
	  }
	  else {
	    // Our needle is less than aHaystack[mid].
	    if (mid - aLow > 1) {
	      // The element is in the lower half.
	      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
	    }

	    // we are in termination case (3) or (2) and return the appropriate thing.
	    if (aBias == exports.LEAST_UPPER_BOUND) {
	      return mid;
	    } else {
	      return aLow < 0 ? -1 : aLow;
	    }
	  }
	}

	/**
	 * This is an implementation of binary search which will always try and return
	 * the index of the closest element if there is no exact hit. This is because
	 * mappings between original and generated line/col pairs are single points,
	 * and there is an implicit region between each of them, so a miss just means
	 * that you aren't on the very start of a region.
	 *
	 * @param aNeedle The element you are looking for.
	 * @param aHaystack The array that is being searched.
	 * @param aCompare A function which takes the needle and an element in the
	 *     array and returns -1, 0, or 1 depending on whether the needle is less
	 *     than, equal to, or greater than the element, respectively.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	 */
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
	  if (aHaystack.length === 0) {
	    return -1;
	  }

	  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
	                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
	  if (index < 0) {
	    return -1;
	  }

	  // We have found either the exact element, or the next-closest element than
	  // the one we are searching for. However, there may be more than one such
	  // element. Make sure we always return the smallest of these.
	  while (index - 1 >= 0) {
	    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
	      break;
	    }
	    --index;
	  }

	  return index;
	}; 
} (binarySearch$1));

var quickSort$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
quickSort$1.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$1 = util$5;
var binarySearch = binarySearch$1;
var ArraySet = arraySet.ArraySet;
var base64VLQ = base64Vlq;
var quickSort = quickSort$1.quickSort;

function SourceMapConsumer$1(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer$1.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer$1.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer$1.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer$1.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer$1.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer$1.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer$1.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer$1.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer$1.GENERATED_ORDER = 1;
SourceMapConsumer$1.ORIGINAL_ORDER = 2;

SourceMapConsumer$1.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer$1.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer$1.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer$1.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer$1.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer$1.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util$1.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer$1.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util$1.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util$1.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util$1.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util$1.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util$1.getArg(mapping, 'generatedLine', null),
            column: util$1.getArg(mapping, 'generatedColumn', null),
            lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util$1.getArg(mapping, 'generatedLine', null),
            column: util$1.getArg(mapping, 'generatedColumn', null),
            lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

sourceMapConsumer.SourceMapConsumer = SourceMapConsumer$1;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  var version = util$1.getArg(sourceMap, 'version');
  var sources = util$1.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util$1.getArg(sourceMap, 'names', []);
  var sourceRoot = util$1.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util$1.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util$1.getArg(sourceMap, 'mappings');
  var file = util$1.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util$1.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util$1.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util$1.isAbsolute(sourceRoot) && util$1.isAbsolute(source)
        ? util$1.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util$1.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer$1;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util$1.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util$1.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util$1.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util$1.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util$1.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util$1.getArg(aArgs, 'line'),
      generatedColumn: util$1.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util$1.compareByGeneratedPositionsDeflated,
      util$1.getArg(aArgs, 'bias', SourceMapConsumer$1.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util$1.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util$1.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util$1.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util$1.getArg(mapping, 'originalLine', null),
          column: util$1.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util$1.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util$1.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util$1.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util$1.getArg(aArgs, 'line'),
      originalColumn: util$1.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util$1.compareByOriginalPositions,
      util$1.getArg(aArgs, 'bias', SourceMapConsumer$1.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util$1.getArg(mapping, 'generatedLine', null),
          column: util$1.getArg(mapping, 'generatedColumn', null),
          lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  var version = util$1.getArg(sourceMap, 'version');
  var sections = util$1.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util$1.getArg(s, 'offset');
    var offsetLine = util$1.getArg(offset, 'line');
    var offsetColumn = util$1.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer$1(util$1.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer$1;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util$1.getArg(aArgs, 'line'),
      generatedColumn: util$1.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util$1.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util$1.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util$1.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util$1.compareByOriginalPositions);
  };

sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;

var sourceNode = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator$1 = sourceMapGenerator.SourceMapGenerator;
var util = util$5;

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex] || '';
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || '';
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator$1(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

sourceNode.SourceNode = SourceNode;

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

sourceMap.SourceMapGenerator = sourceMapGenerator.SourceMapGenerator;
sourceMap.SourceMapConsumer = sourceMapConsumer.SourceMapConsumer;
sourceMap.SourceNode = sourceNode.SourceNode;

var SourceMapConsumer = sourceMap.SourceMapConsumer;

function inputSourceMapTracker$1() {
  var maps = {};

  return {
    all: all$2.bind(null, maps),
    isTracking: isTracking.bind(null, maps),
    originalPositionFor: originalPositionFor.bind(null, maps),
    track: track$2.bind(null, maps)
  };
}

function all$2(maps) {
  return maps;
}

function isTracking(maps, source) {
  return source in maps;
}

function originalPositionFor(maps, metadata, range, selectorFallbacks) {
  var line = metadata[0];
  var column = metadata[1];
  var source = metadata[2];
  var position = {
    line: line,
    column: column + range
  };
  var originalPosition;

  while (!originalPosition && position.column > column) {
    position.column--;
    originalPosition = maps[source].originalPositionFor(position);
  }

  if (!originalPosition || originalPosition.column < 0) {
    return metadata;
  }

  if (originalPosition.line === null && line > 1 && selectorFallbacks > 0) {
    return originalPositionFor(maps, [line - 1, column, source], range, selectorFallbacks - 1);
  }

  return originalPosition.line !== null
    ? toMetadata(originalPosition)
    : metadata;
}

function toMetadata(asHash) {
  return [asHash.line, asHash.column, asHash.source];
}

function track$2(maps, source, data) {
  maps[source] = new SourceMapConsumer(data);
}

var inputSourceMapTracker_1 = inputSourceMapTracker$1;

var empty = null;

var empty_1 = empty;

var REMOTE_RESOURCE_PATTERN = /^(\w+:\/\/|\/\/)/;
var FILE_RESOURCE_PATTERN = /^file:\/\//;

function isRemoteResource$5(uri) {
  return REMOTE_RESOURCE_PATTERN.test(uri) && !FILE_RESOURCE_PATTERN.test(uri);
}

var isRemoteResource_1 = isRemoteResource$5;

var NO_PROTOCOL_RESOURCE_PATTERN = /^\/\//;

function hasProtocol$4(uri) {
  return !NO_PROTOCOL_RESOURCE_PATTERN.test(uri);
}

var hasProtocol_1 = hasProtocol$4;

var path$6 = pathBrowserify;
var url$2 = urlExports;

var isRemoteResource$4 = isRemoteResource_1;
var hasProtocol$3 = hasProtocol_1;

var HTTP_PROTOCOL = 'http:';

function isAllowedResource$3(uri, isRemote, rules) {
  var match;
  var absoluteUri;
  var allowed = !isRemote;
  var rule;
  var isNegated;
  var normalizedRule;
  var i;

  if (rules.length === 0) {
    return false;
  }

  if (isRemote && !hasProtocol$3(uri)) {
    uri = HTTP_PROTOCOL + uri;
  }

  match = isRemote
    ? url$2.parse(uri).host
    : uri;

  absoluteUri = isRemote
    ? uri
    : path$6.resolve(uri);

  for (i = 0; i < rules.length; i++) {
    rule = rules[i];
    isNegated = rule[0] == '!';
    normalizedRule = rule.substring(1);

    if (isNegated && isRemote && isRemoteRule(normalizedRule)) {
      allowed = allowed && !isAllowedResource$3(uri, true, [normalizedRule]);
    } else if (isNegated && !isRemote && !isRemoteRule(normalizedRule)) {
      allowed = allowed && !isAllowedResource$3(uri, false, [normalizedRule]);
    } else if (isNegated) {
      allowed = allowed && true;
    } else if (rule == 'all') {
      allowed = true;
    } else if (isRemote && rule == 'local') {
      allowed = allowed || false;
    } else if (isRemote && rule == 'remote') {
      allowed = true;
    } else if (!isRemote && rule == 'remote') {
      allowed = false;
    } else if (!isRemote && rule == 'local') {
      allowed = true;
    } else if (rule === match) {
      allowed = true;
    } else if (rule === uri) {
      allowed = true;
    } else if (isRemote && absoluteUri.indexOf(rule) === 0) {
      allowed = true;
    } else if (!isRemote && absoluteUri.indexOf(path$6.resolve(rule)) === 0) {
      allowed = true;
    } else if (isRemote != isRemoteRule(normalizedRule)) {
      allowed = allowed && true;
    } else {
      allowed = false;
    }
  }

  return allowed;
}

function isRemoteRule(rule) {
  return isRemoteResource$4(rule) || url$2.parse(HTTP_PROTOCOL + '//' + rule).host == rule;
}

var isAllowedResource_1 = isAllowedResource$3;

var DATA_URI_PATTERN$1 = /^data:(\S*?)?(;charset=(?:(?!;charset=)[^;])+)?(;[^,]+?)?,(.+)/;

function matchDataUri$1(uri) {
  return DATA_URI_PATTERN$1.exec(uri);
}

var matchDataUri_1 = matchDataUri$1;

var path$5 = pathBrowserify;

function rebaseLocalMap$2(sourceMap, sourceUri, rebaseTo) {
  var currentPath = path$5.resolve('');
  var absoluteUri = path$5.resolve(currentPath, sourceUri);
  var absoluteUriDirectory = path$5.dirname(absoluteUri);

  sourceMap.sources = sourceMap.sources.map(function(source) {
    return path$5.relative(rebaseTo, path$5.resolve(absoluteUriDirectory, source));
  });

  return sourceMap;
}

var rebaseLocalMap_1 = rebaseLocalMap$2;

var path$4 = pathBrowserify;
var url$1 = urlExports;

function rebaseRemoteMap$2(sourceMap, sourceUri) {
  var sourceDirectory = path$4.dirname(sourceUri);

  sourceMap.sources = sourceMap.sources.map(function(source) {
    return url$1.resolve(sourceDirectory, source);
  });

  return sourceMap;
}

var rebaseRemoteMap_1 = rebaseRemoteMap$2;

var DATA_URI_PATTERN = /^data:(\S{0,31}?)?(;charset=(?:(?!;charset=)[^;])+)?(;[^,]+?)?,(.+)/;

function isDataUriResource$2(uri) {
  return DATA_URI_PATTERN.test(uri);
}

var isDataUriResource_1 = isDataUriResource$2;

var fs$2 = empty_1;
var path$3 = pathBrowserify;

var isAllowedResource$2 = isAllowedResource_1;
var matchDataUri = matchDataUri_1;
var rebaseLocalMap$1 = rebaseLocalMap_1;
var rebaseRemoteMap$1 = rebaseRemoteMap_1;

var Token$3 = token;
var hasProtocol$2 = hasProtocol_1;
var isDataUriResource$1 = isDataUriResource_1;
var isRemoteResource$3 = isRemoteResource_1;

var MAP_MARKER_PATTERN = /^\/\*# sourceMappingURL=(\S+) \*\/$/;

function applySourceMaps$1(tokens, context, callback) {
  var applyContext = {
    callback: callback,
    fetch: context.options.fetch,
    index: 0,
    inline: context.options.inline,
    inlineRequest: context.options.inlineRequest,
    inlineTimeout: context.options.inlineTimeout,
    inputSourceMapTracker: context.inputSourceMapTracker,
    localOnly: context.localOnly,
    processedTokens: [],
    rebaseTo: context.options.rebaseTo,
    sourceTokens: tokens,
    warnings: context.warnings
  };

  return context.options.sourceMap && tokens.length > 0
    ? doApplySourceMaps(applyContext)
    : callback(tokens);
}

function doApplySourceMaps(applyContext) {
  var singleSourceTokens = [];
  var lastSource = findTokenSource(applyContext.sourceTokens[0]);
  var source;
  var token;
  var l;

  for (l = applyContext.sourceTokens.length; applyContext.index < l; applyContext.index++) {
    token = applyContext.sourceTokens[applyContext.index];
    source = findTokenSource(token);

    if (source != lastSource) {
      singleSourceTokens = [];
      lastSource = source;
    }

    singleSourceTokens.push(token);
    applyContext.processedTokens.push(token);

    if (token[0] == Token$3.COMMENT && MAP_MARKER_PATTERN.test(token[1])) {
      return fetchAndApplySourceMap(token[1], source, singleSourceTokens, applyContext);
    }
  }

  return applyContext.callback(applyContext.processedTokens);
}

function findTokenSource(token) {
  var scope;
  var metadata;

  if (token[0] == Token$3.AT_RULE || token[0] == Token$3.COMMENT || token[0] == Token$3.RAW) {
    metadata = token[2][0];
  } else {
    scope = token[1][0];
    metadata = scope[2][0];
  }

  return metadata[2];
}

function fetchAndApplySourceMap(sourceMapComment, source, singleSourceTokens, applyContext) {
  return extractInputSourceMapFrom(sourceMapComment, applyContext, function(inputSourceMap) {
    if (inputSourceMap) {
      applyContext.inputSourceMapTracker.track(source, inputSourceMap);
      applySourceMapRecursively(singleSourceTokens, applyContext.inputSourceMapTracker);
    }

    applyContext.index++;
    return doApplySourceMaps(applyContext);
  });
}

function extractInputSourceMapFrom(sourceMapComment, applyContext, whenSourceMapReady) {
  var uri = MAP_MARKER_PATTERN.exec(sourceMapComment)[1];
  var absoluteUri;
  var sourceMap;
  var rebasedMap;

  if (isDataUriResource$1(uri)) {
    sourceMap = extractInputSourceMapFromDataUri(uri);
    return whenSourceMapReady(sourceMap);
  } if (isRemoteResource$3(uri)) {
    return loadInputSourceMapFromRemoteUri(uri, applyContext, function(sourceMap) {
      var parsedMap;

      if (sourceMap) {
        parsedMap = JSON.parse(sourceMap);
        rebasedMap = rebaseRemoteMap$1(parsedMap, uri);
        whenSourceMapReady(rebasedMap);
      } else {
        whenSourceMapReady(null);
      }
    });
  }
  // at this point `uri` is already rebased, see lib/reader/rebase.js#rebaseSourceMapComment
  // it is rebased to be consistent with rebasing other URIs
  // however here we need to resolve it back to read it from disk
  absoluteUri = path$3.resolve(applyContext.rebaseTo, uri);
  sourceMap = loadInputSourceMapFromLocalUri(absoluteUri, applyContext);

  if (sourceMap) {
    rebasedMap = rebaseLocalMap$1(sourceMap, absoluteUri, applyContext.rebaseTo);
    return whenSourceMapReady(rebasedMap);
  }
  return whenSourceMapReady(null);
}

function extractInputSourceMapFromDataUri(uri) {
  var dataUriMatch = matchDataUri(uri);
  var charset = dataUriMatch[2] ? dataUriMatch[2].split(/[=;]/)[2] : 'us-ascii';
  var encoding = dataUriMatch[3] ? dataUriMatch[3].split(';')[1] : 'utf8';
  var data = encoding == 'utf8' ? commonjsGlobal.unescape(dataUriMatch[4]) : dataUriMatch[4];

  var buffer = dist.Buffer.from(data, encoding);
  buffer.charset = charset;

  return JSON.parse(buffer.toString());
}

function loadInputSourceMapFromRemoteUri(uri, applyContext, whenLoaded) {
  var isAllowed = isAllowedResource$2(uri, true, applyContext.inline);
  var isRuntimeResource = !hasProtocol$2(uri);

  if (applyContext.localOnly) {
    applyContext.warnings.push('Cannot fetch remote resource from "' + uri + '" as no callback given.');
    return whenLoaded(null);
  } if (isRuntimeResource) {
    applyContext.warnings.push('Cannot fetch "' + uri + '" as no protocol given.');
    return whenLoaded(null);
  } if (!isAllowed) {
    applyContext.warnings.push('Cannot fetch "' + uri + '" as resource is not allowed.');
    return whenLoaded(null);
  }

  applyContext.fetch(uri, applyContext.inlineRequest, applyContext.inlineTimeout, function(error, body) {
    if (error) {
      applyContext.warnings.push('Missing source map at "' + uri + '" - ' + error);
      return whenLoaded(null);
    }

    whenLoaded(body);
  });
}

function loadInputSourceMapFromLocalUri(uri, applyContext) {
  var isAllowed = isAllowedResource$2(uri, false, applyContext.inline);
  var sourceMap;

  if (!fs$2.existsSync(uri) || !fs$2.statSync(uri).isFile()) {
    applyContext.warnings.push('Ignoring local source map at "' + uri + '" as resource is missing.');
    return null;
  } if (!isAllowed) {
    applyContext.warnings.push('Cannot fetch "' + uri + '" as resource is not allowed.');
    return null;
  } if (!fs$2.statSync(uri).size) {
    applyContext.warnings.push('Cannot fetch "' + uri + '" as resource is empty.');
    return null;
  }

  sourceMap = fs$2.readFileSync(uri, 'utf-8');
  return JSON.parse(sourceMap);
}

function applySourceMapRecursively(tokens, inputSourceMapTracker) {
  var token;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];

    switch (token[0]) {
    case Token$3.AT_RULE:
      applySourceMapTo(token, inputSourceMapTracker);
      break;
    case Token$3.AT_RULE_BLOCK:
      applySourceMapRecursively(token[1], inputSourceMapTracker);
      applySourceMapRecursively(token[2], inputSourceMapTracker);
      break;
    case Token$3.AT_RULE_BLOCK_SCOPE:
      applySourceMapTo(token, inputSourceMapTracker);
      break;
    case Token$3.NESTED_BLOCK:
      applySourceMapRecursively(token[1], inputSourceMapTracker);
      applySourceMapRecursively(token[2], inputSourceMapTracker);
      break;
    case Token$3.NESTED_BLOCK_SCOPE:
      applySourceMapTo(token, inputSourceMapTracker);
      break;
    case Token$3.COMMENT:
      applySourceMapTo(token, inputSourceMapTracker);
      break;
    case Token$3.PROPERTY:
      applySourceMapRecursively(token, inputSourceMapTracker);
      break;
    case Token$3.PROPERTY_BLOCK:
      applySourceMapRecursively(token[1], inputSourceMapTracker);
      break;
    case Token$3.PROPERTY_NAME:
      applySourceMapTo(token, inputSourceMapTracker);
      break;
    case Token$3.PROPERTY_VALUE:
      applySourceMapTo(token, inputSourceMapTracker);
      break;
    case Token$3.RULE:
      applySourceMapRecursively(token[1], inputSourceMapTracker);
      applySourceMapRecursively(token[2], inputSourceMapTracker);
      break;
    case Token$3.RULE_SCOPE:
      applySourceMapTo(token, inputSourceMapTracker);
    }
  }

  return tokens;
}

function applySourceMapTo(token, inputSourceMapTracker) {
  var value = token[1];
  var metadata = token[2];
  var newMetadata = [];
  var i, l;

  for (i = 0, l = metadata.length; i < l; i++) {
    newMetadata.push(inputSourceMapTracker.originalPositionFor(metadata[i], value.length));
  }

  token[2] = newMetadata;
}

var applySourceMaps_1 = applySourceMaps$1;

var split = split_1;

var BRACE_PREFIX = /^\(/;
var BRACE_SUFFIX = /\)$/;
var IMPORT_PREFIX_PATTERN$1 = /^@import/i;
var QUOTE_PREFIX_PATTERN$1 = /['"]\s{0,31}/;
var QUOTE_SUFFIX_PATTERN$1 = /\s{0,31}['"]/;
var URL_PREFIX_PATTERN$1 = /^url\(\s{0,31}/i;
var URL_SUFFIX_PATTERN$1 = /\s{0,31}\)/i;

function extractImportUrlAndMedia$2(atRuleValue) {
  var uri;
  var mediaQuery;
  var normalized;
  var parts;

  normalized = atRuleValue
    .replace(IMPORT_PREFIX_PATTERN$1, '')
    .trim()
    .replace(URL_PREFIX_PATTERN$1, '(')
    .replace(URL_SUFFIX_PATTERN$1, ') ')
    .replace(QUOTE_PREFIX_PATTERN$1, '')
    .replace(QUOTE_SUFFIX_PATTERN$1, '');

  parts = split(normalized, ' ');

  uri = parts[0]
    .replace(BRACE_PREFIX, '')
    .replace(BRACE_SUFFIX, '');
  mediaQuery = parts.slice(1).join(' ');

  return [uri, mediaQuery];
}

var extractImportUrlAndMedia_1 = extractImportUrlAndMedia$2;

var fs$1 = empty_1;
var path$2 = pathBrowserify;

var isAllowedResource$1 = isAllowedResource_1;

var hasProtocol$1 = hasProtocol_1;
var isRemoteResource$2 = isRemoteResource_1;

function loadOriginalSources$1(context, callback) {
  var loadContext = {
    callback: callback,
    fetch: context.options.fetch,
    index: 0,
    inline: context.options.inline,
    inlineRequest: context.options.inlineRequest,
    inlineTimeout: context.options.inlineTimeout,
    localOnly: context.localOnly,
    rebaseTo: context.options.rebaseTo,
    sourcesContent: context.sourcesContent,
    uriToSource: uriToSourceMapping(context.inputSourceMapTracker.all()),
    warnings: context.warnings
  };

  return context.options.sourceMap && context.options.sourceMapInlineSources
    ? doLoadOriginalSources(loadContext)
    : callback();
}

function uriToSourceMapping(allSourceMapConsumers) {
  var mapping = {};
  var consumer;
  var uri;
  var source;
  var i, l;

  for (source in allSourceMapConsumers) {
    consumer = allSourceMapConsumers[source];

    for (i = 0, l = consumer.sources.length; i < l; i++) {
      uri = consumer.sources[i];
      source = consumer.sourceContentFor(uri, true);

      mapping[uri] = source;
    }
  }

  return mapping;
}

function doLoadOriginalSources(loadContext) {
  var uris = Object.keys(loadContext.uriToSource);
  var uri;
  var source;
  var total;

  for (total = uris.length; loadContext.index < total; loadContext.index++) {
    uri = uris[loadContext.index];
    source = loadContext.uriToSource[uri];

    if (source) {
      loadContext.sourcesContent[uri] = source;
    } else {
      return loadOriginalSource(uri, loadContext);
    }
  }

  return loadContext.callback();
}

function loadOriginalSource(uri, loadContext) {
  var content;

  if (isRemoteResource$2(uri)) {
    return loadOriginalSourceFromRemoteUri(uri, loadContext, function(content) {
      loadContext.index++;
      loadContext.sourcesContent[uri] = content;
      return doLoadOriginalSources(loadContext);
    });
  }
  content = loadOriginalSourceFromLocalUri(uri, loadContext);
  loadContext.index++;
  loadContext.sourcesContent[uri] = content;
  return doLoadOriginalSources(loadContext);
}

function loadOriginalSourceFromRemoteUri(uri, loadContext, whenLoaded) {
  var isAllowed = isAllowedResource$1(uri, true, loadContext.inline);
  var isRuntimeResource = !hasProtocol$1(uri);

  if (loadContext.localOnly) {
    loadContext.warnings.push('Cannot fetch remote resource from "' + uri + '" as no callback given.');
    return whenLoaded(null);
  } if (isRuntimeResource) {
    loadContext.warnings.push('Cannot fetch "' + uri + '" as no protocol given.');
    return whenLoaded(null);
  } if (!isAllowed) {
    loadContext.warnings.push('Cannot fetch "' + uri + '" as resource is not allowed.');
    return whenLoaded(null);
  }

  loadContext.fetch(uri, loadContext.inlineRequest, loadContext.inlineTimeout, function(error, content) {
    if (error) {
      loadContext.warnings.push('Missing original source at "' + uri + '" - ' + error);
    }

    whenLoaded(content);
  });
}

function loadOriginalSourceFromLocalUri(relativeUri, loadContext) {
  var isAllowed = isAllowedResource$1(relativeUri, false, loadContext.inline);
  var absoluteUri = path$2.resolve(loadContext.rebaseTo, relativeUri);

  if (!fs$1.existsSync(absoluteUri) || !fs$1.statSync(absoluteUri).isFile()) {
    loadContext.warnings.push('Ignoring local source map at "' + absoluteUri + '" as resource is missing.');
    return null;
  } if (!isAllowed) {
    loadContext.warnings.push('Cannot fetch "' + absoluteUri + '" as resource is not allowed.');
    return null;
  }

  var result = fs$1.readFileSync(absoluteUri, 'utf8');
  if (result.charCodeAt(0) === 65279) {
    result = result.substring(1);
  }
  return result;
}

var loadOriginalSources_1 = loadOriginalSources$1;

var UNIX_SEPARATOR = '/';
var WINDOWS_SEPARATOR_PATTERN = /\\/g;

function normalizePath$1(path) {
  return path.replace(WINDOWS_SEPARATOR_PATTERN, UNIX_SEPARATOR);
}

var normalizePath_1 = normalizePath$1;

function restoreImport$2(uri, mediaQuery) {
  return ('@import ' + uri + ' ' + mediaQuery).trim();
}

var restoreImport_1 = restoreImport$2;

var path$1 = pathBrowserify;
var url = urlExports;

var isDataUriResource = isDataUriResource_1;

var DOUBLE_QUOTE = '"';
var SINGLE_QUOTE = '\'';
var URL_PREFIX = 'url(';
var URL_SUFFIX = ')';

var PROTOCOL_LESS_PREFIX_PATTERN = /^[^\w\d]*\/\//;
var QUOTE_PREFIX_PATTERN = /^["']/;
var QUOTE_SUFFIX_PATTERN = /["']$/;
var ROUND_BRACKETS_PATTERN = /[()]/;
var URL_PREFIX_PATTERN = /^url\(/i;
var URL_SUFFIX_PATTERN = /\)$/;
var WHITESPACE_PATTERN = /\s/;

var isWindows$1 = dist.process.platform == 'win32';

function rebase$2(uri, rebaseConfig) {
  if (!rebaseConfig) {
    return uri;
  }

  if (isAbsolute(uri) && !isRemote(rebaseConfig.toBase)) {
    return uri;
  }

  if (isRemote(uri) || isSVGMarker(uri) || isInternal(uri) || isDataUriResource(uri)) {
    return uri;
  }

  if (isRemote(rebaseConfig.toBase)) {
    return url.resolve(rebaseConfig.toBase, uri);
  }

  return rebaseConfig.absolute
    ? normalize(absolute(uri, rebaseConfig))
    : normalize(relative(uri, rebaseConfig));
}

function isAbsolute(uri) {
  return path$1.isAbsolute(uri);
}

function isSVGMarker(uri) {
  return uri[0] == '#';
}

function isInternal(uri) {
  return /^\w+:\w+/.test(uri);
}

function isRemote(uri) {
  return /^[^:]+?:\/\//.test(uri) || PROTOCOL_LESS_PREFIX_PATTERN.test(uri);
}

function absolute(uri, rebaseConfig) {
  return path$1
    .resolve(path$1.join(rebaseConfig.fromBase || '', uri))
    .replace(rebaseConfig.toBase, '');
}

function relative(uri, rebaseConfig) {
  return path$1.relative(rebaseConfig.toBase, path$1.join(rebaseConfig.fromBase || '', uri));
}

function normalize(uri) {
  return isWindows$1 ? uri.replace(/\\/g, '/') : uri;
}

function quoteFor(unquotedUrl) {
  if (unquotedUrl.indexOf(SINGLE_QUOTE) > -1) {
    return DOUBLE_QUOTE;
  } if (unquotedUrl.indexOf(DOUBLE_QUOTE) > -1) {
    return SINGLE_QUOTE;
  } if (hasWhitespace(unquotedUrl) || hasRoundBrackets(unquotedUrl)) {
    return SINGLE_QUOTE;
  }
  return '';
}

function hasWhitespace(url) {
  return WHITESPACE_PATTERN.test(url);
}

function hasRoundBrackets(url) {
  return ROUND_BRACKETS_PATTERN.test(url);
}

function rewriteUrl$1(originalUrl, rebaseConfig, pathOnly) {
  var strippedUrl = originalUrl
    .replace(URL_PREFIX_PATTERN, '')
    .replace(URL_SUFFIX_PATTERN, '')
    .trim();

  var unquotedUrl = strippedUrl
    .replace(QUOTE_PREFIX_PATTERN, '')
    .replace(QUOTE_SUFFIX_PATTERN, '')
    .trim();

  var quote = strippedUrl[0] == SINGLE_QUOTE || strippedUrl[0] == DOUBLE_QUOTE
    ? strippedUrl[0]
    : quoteFor(unquotedUrl);

  return pathOnly
    ? rebase$2(unquotedUrl, rebaseConfig)
    : URL_PREFIX + quote + rebase$2(unquotedUrl, rebaseConfig) + quote + URL_SUFFIX;
}

var rewriteUrl_1 = rewriteUrl$1;

var IMPORT_PREFIX_PATTERN = /^@import/i;

function isImport$2(value) {
  return IMPORT_PREFIX_PATTERN.test(value);
}

var isImport_1 = isImport$2;

var extractImportUrlAndMedia$1 = extractImportUrlAndMedia_1;
var restoreImport$1 = restoreImport_1;
var rewriteUrl = rewriteUrl_1;

var Token$2 = token;
var isImport$1 = isImport_1;

var SOURCE_MAP_COMMENT_PATTERN = /^\/\*# sourceMappingURL=(\S+) \*\/$/;

function rebase$1(tokens, rebaseAll, validator, rebaseConfig) {
  return rebaseAll
    ? rebaseEverything(tokens, validator, rebaseConfig)
    : rebaseAtRules(tokens, validator, rebaseConfig);
}

function rebaseEverything(tokens, validator, rebaseConfig) {
  var token;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];

    switch (token[0]) {
    case Token$2.AT_RULE:
      rebaseAtRule(token, validator, rebaseConfig);
      break;
    case Token$2.AT_RULE_BLOCK:
      rebaseProperties(token[2], validator, rebaseConfig);
      break;
    case Token$2.COMMENT:
      rebaseSourceMapComment(token, rebaseConfig);
      break;
    case Token$2.NESTED_BLOCK:
      rebaseEverything(token[2], validator, rebaseConfig);
      break;
    case Token$2.RULE:
      rebaseProperties(token[2], validator, rebaseConfig);
      break;
    }
  }

  return tokens;
}

function rebaseAtRules(tokens, validator, rebaseConfig) {
  var token;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];

    switch (token[0]) {
    case Token$2.AT_RULE:
      rebaseAtRule(token, validator, rebaseConfig);
      break;
    }
  }

  return tokens;
}

function rebaseAtRule(token, validator, rebaseConfig) {
  if (!isImport$1(token[1])) {
    return;
  }

  var uriAndMediaQuery = extractImportUrlAndMedia$1(token[1]);
  var newUrl = rewriteUrl(uriAndMediaQuery[0], rebaseConfig);
  var mediaQuery = uriAndMediaQuery[1];

  token[1] = restoreImport$1(newUrl, mediaQuery);
}

function rebaseSourceMapComment(token, rebaseConfig) {
  var matches = SOURCE_MAP_COMMENT_PATTERN.exec(token[1]);

  if (matches && matches[1].indexOf('data:') === -1) {
    token[1] = token[1].replace(matches[1], rewriteUrl(matches[1], rebaseConfig, true));
  }
}

function rebaseProperties(properties, validator, rebaseConfig) {
  var property;
  var value;
  var i, l;
  var j, m;

  for (i = 0, l = properties.length; i < l; i++) {
    property = properties[i];

    for (j = 2 /* 0 is Token.PROPERTY, 1 is name */, m = property.length; j < m; j++) {
      value = property[j][1];

      if (validator.isUrl(value)) {
        property[j][1] = rewriteUrl(value, rebaseConfig);
      }
    }
  }
}

var rebase_1 = rebase$1;

var Marker$1 = marker;
var Token$1 = token;

var formatPosition = formatPosition_1;

var Level = {
  BLOCK: 'block',
  COMMENT: 'comment',
  DOUBLE_QUOTE: 'double-quote',
  RULE: 'rule',
  SINGLE_QUOTE: 'single-quote'
};

var AT_RULES = [
  '@charset',
  '@import'
];

var BLOCK_RULES = [
  '@-moz-document',
  '@document',
  '@-moz-keyframes',
  '@-ms-keyframes',
  '@-o-keyframes',
  '@-webkit-keyframes',
  '@keyframes',
  '@media',
  '@supports',
  '@container',
  '@layer'
];

var IGNORE_END_COMMENT_PATTERN = /\/\* clean-css ignore:end \*\/$/;
var IGNORE_START_COMMENT_PATTERN = /^\/\* clean-css ignore:start \*\//;

var PAGE_MARGIN_BOXES = [
  '@bottom-center',
  '@bottom-left',
  '@bottom-left-corner',
  '@bottom-right',
  '@bottom-right-corner',
  '@left-bottom',
  '@left-middle',
  '@left-top',
  '@right-bottom',
  '@right-middle',
  '@right-top',
  '@top-center',
  '@top-left',
  '@top-left-corner',
  '@top-right',
  '@top-right-corner'
];

var EXTRA_PAGE_BOXES = [
  '@footnote',
  '@footnotes',
  '@left',
  '@page-float-bottom',
  '@page-float-top',
  '@right'
];

var REPEAT_PATTERN = /^\[\s{0,31}\d+\s{0,31}\]$/;
var TAIL_BROKEN_VALUE_PATTERN = /([^}])\}*$/;
var RULE_WORD_SEPARATOR_PATTERN = /[\s(]/;

function tokenize$1(source, externalContext) {
  var internalContext = {
    level: Level.BLOCK,
    position: {
      source: externalContext.source || undefined,
      line: 1,
      column: 0,
      index: 0
    }
  };

  return intoTokens(source, externalContext, internalContext, false);
}

function intoTokens(source, externalContext, internalContext, isNested) {
  var allTokens = [];
  var newTokens = allTokens;
  var lastToken;
  var ruleToken;
  var ruleTokens = [];
  var propertyToken;
  var metadata;
  var metadatas = [];
  var level = internalContext.level;
  var levels = [];
  var buffer = [];
  var buffers = [];
  var isBufferEmpty = true;
  var serializedBuffer;
  var serializedBufferPart;
  var roundBracketLevel = 0;
  var isQuoted;
  var isSpace;
  var isNewLineNix;
  var isNewLineWin;
  var isCarriageReturn;
  var isCommentStart;
  var wasCommentStart = false;
  var isCommentEnd;
  var wasCommentEnd = false;
  var isCommentEndMarker;
  var isEscaped;
  var wasEscaped = false;
  var characterWithNoSpecialMeaning;
  var isPreviousDash = false;
  var isVariable = false;
  var isRaw = false;
  var seekingValue = false;
  var seekingPropertyBlockClosing = false;
  var position = internalContext.position;
  var lastCommentStartAt;

  for (; position.index < source.length; position.index++) {
    var character = source[position.index];

    isQuoted = level == Level.SINGLE_QUOTE || level == Level.DOUBLE_QUOTE;
    isSpace = character == Marker$1.SPACE || character == Marker$1.TAB;
    isNewLineNix = character == Marker$1.NEW_LINE_NIX;
    isNewLineWin = character == Marker$1.NEW_LINE_NIX
      && source[position.index - 1] == Marker$1.CARRIAGE_RETURN;
    isCarriageReturn = character == Marker$1.CARRIAGE_RETURN
      && source[position.index + 1] && source[position.index + 1] != Marker$1.NEW_LINE_NIX;
    isCommentStart = !wasCommentEnd
      && level != Level.COMMENT && !isQuoted
      && character == Marker$1.ASTERISK && source[position.index - 1] == Marker$1.FORWARD_SLASH;
    isCommentEndMarker = !wasCommentStart
      && !isQuoted && character == Marker$1.FORWARD_SLASH
      && source[position.index - 1] == Marker$1.ASTERISK;
    isCommentEnd = level == Level.COMMENT && isCommentEndMarker;
    characterWithNoSpecialMeaning = !isSpace && !isCarriageReturn && (character >= 'A' && character <= 'Z' || character >= 'a' && character <= 'z' || character >= '0' && character <= '9' || character == '-');
    isVariable = isVariable || (level != Level.COMMENT && !seekingValue && isPreviousDash && character === '-' && buffer.length === 1);
    isPreviousDash = character === '-';
    roundBracketLevel = Math.max(roundBracketLevel, 0);

    metadata = isBufferEmpty
      ? [position.line, position.column, position.source]
      : metadata;

    if (isEscaped) {
      // previous character was a backslash
      buffer.push(character);
      isBufferEmpty = false;
    } else if (characterWithNoSpecialMeaning) {
      // it's just an alphanumeric character or a hyphen (part of any rule or property name) so let's end it quickly
      buffer.push(character);
      isBufferEmpty = false;
    } else if ((isSpace || isNewLineNix && !isNewLineWin) && (isQuoted || level == Level.COMMENT)) {
      buffer.push(character);
      isBufferEmpty = false;
    } else if ((isSpace || isNewLineNix && !isNewLineWin) && isBufferEmpty) ; else if (!isCommentEnd && level == Level.COMMENT) {
      buffer.push(character);
      isBufferEmpty = false;
    } else if (!isCommentStart && !isCommentEnd && isRaw) {
      buffer.push(character);
      isBufferEmpty = false;
    } else if (isCommentStart
        && isVariable
        && (level == Level.BLOCK || level == Level.RULE) && buffer.length > 1) {
      // comment start within a variable, e.g. var(/*<--
      buffer.push(character);
      isBufferEmpty = false;

      levels.push(level);
      level = Level.COMMENT;
    } else if (isCommentStart && (level == Level.BLOCK || level == Level.RULE) && buffer.length > 1) {
      // comment start within block preceded by some content, e.g. div/*<--
      metadatas.push(metadata);
      buffer.push(character);
      buffers.push(buffer.slice(0, -2));
      isBufferEmpty = false;

      buffer = buffer.slice(-2);
      metadata = [position.line, position.column - 1, position.source];

      levels.push(level);
      level = Level.COMMENT;
    } else if (isCommentStart) {
      // comment start, e.g. /*<--
      levels.push(level);
      level = Level.COMMENT;
      buffer.push(character);
      isBufferEmpty = false;
    } else if (isCommentEnd && isVariable) {
      // comment end within a variable, e.g. var(/*!*/<--
      buffer.push(character);
      level = levels.pop();
    } else if (isCommentEnd && isIgnoreStartComment(buffer)) {
      // ignore:start comment end, e.g. /* clean-css ignore:start */<--
      serializedBuffer = buffer.join('').trim() + character;
      lastToken = [
        Token$1.COMMENT,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ];
      newTokens.push(lastToken);

      isRaw = true;
      metadata = metadatas.pop() || null;
      buffer = buffers.pop() || [];
      isBufferEmpty = buffer.length === 0;
    } else if (isCommentEnd && isIgnoreEndComment(buffer)) {
      // ignore:start comment end, e.g. /* clean-css ignore:end */<--
      serializedBuffer = buffer.join('') + character;
      lastCommentStartAt = serializedBuffer.lastIndexOf(Marker$1.FORWARD_SLASH + Marker$1.ASTERISK);

      serializedBufferPart = serializedBuffer.substring(0, lastCommentStartAt);
      lastToken = [
        Token$1.RAW,
        serializedBufferPart,
        [originalMetadata(metadata, serializedBufferPart, externalContext)]
      ];
      newTokens.push(lastToken);

      serializedBufferPart = serializedBuffer.substring(lastCommentStartAt);
      metadata = [position.line, position.column - serializedBufferPart.length + 1, position.source];
      lastToken = [
        Token$1.COMMENT,
        serializedBufferPart,
        [originalMetadata(metadata, serializedBufferPart, externalContext)]
      ];
      newTokens.push(lastToken);

      isRaw = false;
      level = levels.pop();
      metadata = metadatas.pop() || null;
      buffer = buffers.pop() || [];
      isBufferEmpty = buffer.length === 0;
    } else if (isCommentEnd) {
      // comment end, e.g. /* comment */<--
      serializedBuffer = buffer.join('').trim() + character;
      lastToken = [
        Token$1.COMMENT,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ];
      newTokens.push(lastToken);

      level = levels.pop();
      metadata = metadatas.pop() || null;
      buffer = buffers.pop() || [];
      isBufferEmpty = buffer.length === 0;
    } else if (isCommentEndMarker && source[position.index + 1] != Marker$1.ASTERISK) {
      externalContext.warnings.push('Unexpected \'*/\' at ' + formatPosition([position.line, position.column, position.source]) + '.');
      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.SINGLE_QUOTE && !isQuoted) {
      // single quotation start, e.g. a[href^='https<--
      levels.push(level);
      level = Level.SINGLE_QUOTE;
      buffer.push(character);
      isBufferEmpty = false;
    } else if (character == Marker$1.SINGLE_QUOTE && level == Level.SINGLE_QUOTE) {
      // single quotation end, e.g. a[href^='https'<--
      level = levels.pop();
      buffer.push(character);
      isBufferEmpty = false;
    } else if (character == Marker$1.DOUBLE_QUOTE && !isQuoted) {
      // double quotation start, e.g. a[href^="<--
      levels.push(level);
      level = Level.DOUBLE_QUOTE;
      buffer.push(character);
      isBufferEmpty = false;
    } else if (character == Marker$1.DOUBLE_QUOTE && level == Level.DOUBLE_QUOTE) {
      // double quotation end, e.g. a[href^="https"<--
      level = levels.pop();
      buffer.push(character);
      isBufferEmpty = false;
    } else if (character != Marker$1.CLOSE_ROUND_BRACKET
      && character != Marker$1.OPEN_ROUND_BRACKET
      && level != Level.COMMENT && !isQuoted && roundBracketLevel > 0) {
      // character inside any function, e.g. hsla(.<--
      buffer.push(character);
      isBufferEmpty = false;
    } else if (character == Marker$1.OPEN_ROUND_BRACKET
      && !isQuoted && level != Level.COMMENT
      && !seekingValue) {
      // round open bracket, e.g. @import url(<--
      buffer.push(character);
      isBufferEmpty = false;

      roundBracketLevel++;
    } else if (character == Marker$1.CLOSE_ROUND_BRACKET
      && !isQuoted
      && level != Level.COMMENT
      && !seekingValue) {
      // round open bracket, e.g. @import url(test.css)<--
      buffer.push(character);
      isBufferEmpty = false;

      roundBracketLevel--;
    } else if (character == Marker$1.SEMICOLON && level == Level.BLOCK && buffer[0] == Marker$1.AT) {
      // semicolon ending rule at block level, e.g. @import '...';<--
      serializedBuffer = buffer.join('').trim();
      allTokens.push([
        Token$1.AT_RULE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);

      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.COMMA && level == Level.BLOCK && ruleToken) {
      // comma separator at block level, e.g. a,div,<--
      serializedBuffer = buffer.join('').trim();
      ruleToken[1].push([
        tokenScopeFrom(ruleToken[0]),
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext, ruleToken[1].length)]
      ]);

      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.COMMA && level == Level.BLOCK && tokenTypeFrom(buffer) == Token$1.AT_RULE) {
      // comma separator at block level, e.g. @import url(...) screen,<--
      // keep iterating as end semicolon will create the token
      buffer.push(character);
      isBufferEmpty = false;
    } else if (character == Marker$1.COMMA && level == Level.BLOCK) {
      // comma separator at block level, e.g. a,<--
      ruleToken = [tokenTypeFrom(buffer), [], []];
      serializedBuffer = buffer.join('').trim();
      ruleToken[1].push([
        tokenScopeFrom(ruleToken[0]),
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext, 0)]
      ]);

      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.OPEN_CURLY_BRACKET
      && level == Level.BLOCK
      && ruleToken
      && ruleToken[0] == Token$1.NESTED_BLOCK) {
      // open brace opening at-rule at block level, e.g. @media{<--
      serializedBuffer = buffer.join('').trim();
      ruleToken[1].push([
        Token$1.NESTED_BLOCK_SCOPE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);
      allTokens.push(ruleToken);

      levels.push(level);
      position.column++;
      position.index++;
      buffer = [];
      isBufferEmpty = true;

      ruleToken[2] = intoTokens(source, externalContext, internalContext, true);
      ruleToken = null;
    } else if (character == Marker$1.OPEN_CURLY_BRACKET
      && level == Level.BLOCK
      && tokenTypeFrom(buffer) == Token$1.NESTED_BLOCK) {
      // open brace opening at-rule at block level, e.g. @media{<--
      serializedBuffer = buffer.join('').trim();
      ruleToken = ruleToken || [Token$1.NESTED_BLOCK, [], []];
      ruleToken[1].push([
        Token$1.NESTED_BLOCK_SCOPE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);
      allTokens.push(ruleToken);

      levels.push(level);
      position.column++;
      position.index++;
      buffer = [];
      isBufferEmpty = true;
      isVariable = false;

      ruleToken[2] = intoTokens(source, externalContext, internalContext, true);
      ruleToken = null;
    } else if (character == Marker$1.OPEN_CURLY_BRACKET && level == Level.BLOCK) {
      // open brace opening rule at block level, e.g. div{<--
      serializedBuffer = buffer.join('').trim();
      ruleToken = ruleToken || [tokenTypeFrom(buffer), [], []];
      ruleToken[1].push([
        tokenScopeFrom(ruleToken[0]),
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext, ruleToken[1].length)]
      ]);
      newTokens = ruleToken[2];
      allTokens.push(ruleToken);

      levels.push(level);
      level = Level.RULE;
      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.OPEN_CURLY_BRACKET && level == Level.RULE && seekingValue) {
      // open brace opening rule at rule level, e.g. div{--variable:{<--
      ruleTokens.push(ruleToken);
      ruleToken = [Token$1.PROPERTY_BLOCK, []];
      propertyToken.push(ruleToken);
      newTokens = ruleToken[1];

      levels.push(level);
      level = Level.RULE;
      seekingValue = false;
    } else if (character == Marker$1.OPEN_CURLY_BRACKET && level == Level.RULE && isPageMarginBox(buffer)) {
      // open brace opening page-margin box at rule level, e.g. @page{@top-center{<--
      serializedBuffer = buffer.join('').trim();
      ruleTokens.push(ruleToken);
      ruleToken = [Token$1.AT_RULE_BLOCK, [], []];
      ruleToken[1].push([
        Token$1.AT_RULE_BLOCK_SCOPE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);
      newTokens.push(ruleToken);
      newTokens = ruleToken[2];

      levels.push(level);
      level = Level.RULE;
      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.COLON && level == Level.RULE && !seekingValue) {
      // colon at rule level, e.g. a{color:<--
      serializedBuffer = buffer.join('').trim();
      propertyToken = [
        Token$1.PROPERTY,
        [
          Token$1.PROPERTY_NAME,
          serializedBuffer,
          [originalMetadata(metadata, serializedBuffer, externalContext)]
        ]
      ];
      newTokens.push(propertyToken);

      seekingValue = true;
      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.SEMICOLON
      && level == Level.RULE
      && propertyToken
      && ruleTokens.length > 0
      && !isBufferEmpty
      && buffer[0] == Marker$1.AT) {
      // semicolon at rule level for at-rule, e.g. a{--color:{@apply(--other-color);<--
      serializedBuffer = buffer.join('').trim();
      ruleToken[1].push([
        Token$1.AT_RULE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);

      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.SEMICOLON && level == Level.RULE && propertyToken && !isBufferEmpty) {
      // semicolon at rule level, e.g. a{color:red;<--
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);

      propertyToken = null;
      seekingValue = false;
      buffer = [];
      isBufferEmpty = true;
      isVariable = false;
    } else if (character == Marker$1.SEMICOLON
      && level == Level.RULE
      && propertyToken
      && isBufferEmpty
      && isVariable
      && !propertyToken[2]) {
      // semicolon after empty variable value at rule level, e.g. a{--color: ;<--
      propertyToken.push([Token$1.PROPERTY_VALUE, ' ', [originalMetadata(metadata, ' ', externalContext)]]);
      isVariable = false;
      propertyToken = null;
      seekingValue = false;
    } else if (character == Marker$1.SEMICOLON && level == Level.RULE && propertyToken && isBufferEmpty) {
      // semicolon after bracketed value at rule level, e.g. a{color:rgb(...);<--
      propertyToken = null;
      seekingValue = false;
    } else if (character == Marker$1.SEMICOLON
      && level == Level.RULE
      && !isBufferEmpty
      && buffer[0] == Marker$1.AT) {
      // semicolon for at-rule at rule level, e.g. a{@apply(--variable);<--
      serializedBuffer = buffer.join('');
      newTokens.push([
        Token$1.AT_RULE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);

      seekingValue = false;
      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.SEMICOLON && level == Level.RULE && seekingPropertyBlockClosing) {
      // close brace after a property block at rule level, e.g. a{--custom:{color:red;};<--
      seekingPropertyBlockClosing = false;
      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.SEMICOLON && level == Level.RULE && isBufferEmpty) ; else if (character == Marker$1.CLOSE_CURLY_BRACKET
      && level == Level.RULE
      && propertyToken
      && seekingValue
      && !isBufferEmpty && ruleTokens.length > 0) {
      // close brace at rule level, e.g. a{--color:{color:red}<--
      serializedBuffer = buffer.join('');
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);
      propertyToken = null;
      ruleToken = ruleTokens.pop();
      newTokens = ruleToken[2];

      level = levels.pop();
      seekingValue = false;
      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.CLOSE_CURLY_BRACKET
      && level == Level.RULE
      && propertyToken
      && !isBufferEmpty
      && buffer[0] == Marker$1.AT
      && ruleTokens.length > 0) {
      // close brace at rule level for at-rule, e.g. a{--color:{@apply(--other-color)}<--
      serializedBuffer = buffer.join('');
      ruleToken[1].push([
        Token$1.AT_RULE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);
      propertyToken = null;
      ruleToken = ruleTokens.pop();
      newTokens = ruleToken[2];

      level = levels.pop();
      seekingValue = false;
      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.CLOSE_CURLY_BRACKET
      && level == Level.RULE
      && propertyToken
      && ruleTokens.length > 0) {
      // close brace at rule level after space, e.g. a{--color:{color:red }<--
      propertyToken = null;
      ruleToken = ruleTokens.pop();
      newTokens = ruleToken[2];

      level = levels.pop();
      seekingValue = false;
    } else if (character == Marker$1.CLOSE_CURLY_BRACKET
      && level == Level.RULE
      && propertyToken
      && !isBufferEmpty) {
      // close brace at rule level, e.g. a{color:red}<--
      serializedBuffer = buffer.join('');
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);
      propertyToken = null;
      ruleToken = ruleTokens.pop();
      newTokens = allTokens;

      level = levels.pop();
      seekingValue = false;
      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.CLOSE_CURLY_BRACKET
      && level == Level.RULE
      && !isBufferEmpty
      && buffer[0] == Marker$1.AT) {
      // close brace after at-rule at rule level, e.g. a{@apply(--variable)}<--
      propertyToken = null;
      ruleToken = null;
      serializedBuffer = buffer.join('').trim();
      newTokens.push([
        Token$1.AT_RULE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);
      newTokens = allTokens;

      level = levels.pop();
      seekingValue = false;
      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.CLOSE_CURLY_BRACKET
      && level == Level.RULE
      && levels[levels.length - 1] == Level.RULE) {
      // close brace after a property block at rule level, e.g. a{--custom:{color:red;}<--
      propertyToken = null;
      ruleToken = ruleTokens.pop();
      newTokens = ruleToken[2];

      level = levels.pop();
      seekingValue = false;
      seekingPropertyBlockClosing = true;
      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.CLOSE_CURLY_BRACKET
      && level == Level.RULE
      && isVariable
      && propertyToken
      && !propertyToken[2]) {
      // close brace after an empty variable declaration inside a rule, e.g. a{--color: }<--
      propertyToken.push([Token$1.PROPERTY_VALUE, ' ', [originalMetadata(metadata, ' ', externalContext)]]);
      isVariable = false;
      propertyToken = null;
      ruleToken = null;
      newTokens = allTokens;

      level = levels.pop();
      seekingValue = false;
      isVariable = false;
    } else if (character == Marker$1.CLOSE_CURLY_BRACKET && level == Level.RULE) {
      // close brace after a rule, e.g. a{color:red;}<--
      propertyToken = null;
      ruleToken = null;
      newTokens = allTokens;

      level = levels.pop();
      seekingValue = false;
      isVariable = false;
    } else if (character == Marker$1.CLOSE_CURLY_BRACKET
      && level == Level.BLOCK
      && !isNested
      && position.index <= source.length - 1) {
      // stray close brace at block level, e.g. a{color:red}color:blue}<--
      externalContext.warnings.push('Unexpected \'}\' at ' + formatPosition([position.line, position.column, position.source]) + '.');
      buffer.push(character);
      isBufferEmpty = false;
    } else if (character == Marker$1.CLOSE_CURLY_BRACKET && level == Level.BLOCK) {
      // close brace at block level, e.g. @media screen {...}<--
      break;
    } else if (character == Marker$1.OPEN_ROUND_BRACKET && level == Level.RULE && seekingValue) {
      // round open bracket, e.g. a{color:hsla(<--
      buffer.push(character);
      isBufferEmpty = false;
      roundBracketLevel++;
    } else if (character == Marker$1.CLOSE_ROUND_BRACKET
      && level == Level.RULE
      && seekingValue
      && roundBracketLevel == 1) {
      // round close bracket, e.g. a{color:hsla(0,0%,0%)<--
      buffer.push(character);
      isBufferEmpty = false;
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);

      roundBracketLevel--;
      buffer = [];
      isBufferEmpty = true;
      isVariable = false;
    } else if (character == Marker$1.CLOSE_ROUND_BRACKET && level == Level.RULE && seekingValue) {
      // round close bracket within other brackets, e.g. a{width:calc((10rem / 2)<--
      buffer.push(character);
      isBufferEmpty = false;
      isVariable = false;
      roundBracketLevel--;
    } else if (character == Marker$1.FORWARD_SLASH
      && source[position.index + 1] != Marker$1.ASTERISK
      && level == Level.RULE
      && seekingValue
      && !isBufferEmpty) {
      // forward slash within a property, e.g. a{background:url(image.png) 0 0/<--
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        character,
        [[position.line, position.column, position.source]]
      ]);

      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.FORWARD_SLASH
      && source[position.index + 1] != Marker$1.ASTERISK
      && level == Level.RULE
      && seekingValue) {
      // forward slash within a property after space, e.g. a{background:url(image.png) 0 0 /<--
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        character,
        [[position.line, position.column, position.source]]
      ]);

      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.COMMA && level == Level.RULE && seekingValue && !isBufferEmpty) {
      // comma within a property, e.g. a{background:url(image.png),<--
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        character,
        [[position.line, position.column, position.source]]
      ]);

      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.COMMA && level == Level.RULE && seekingValue) {
      // comma within a property after space, e.g. a{background:url(image.png) ,<--
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        character,
        [[position.line, position.column, position.source]]
      ]);

      buffer = [];
      isBufferEmpty = true;
    } else if (character == Marker$1.CLOSE_SQUARE_BRACKET
      && propertyToken
      && propertyToken.length > 1
      && !isBufferEmpty
      && isRepeatToken(buffer)) {
      buffer.push(character);
      serializedBuffer = buffer.join('').trim();
      propertyToken[propertyToken.length - 1][1] += serializedBuffer;

      buffer = [];
      isBufferEmpty = true;
    } else if ((isSpace || (isNewLineNix && !isNewLineWin))
      && level == Level.RULE
      && seekingValue
      && propertyToken
      && !isBufferEmpty) {
      // space or *nix newline within property, e.g. a{margin:0 <--
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);

      buffer = [];
      isBufferEmpty = true;
    } else if (isNewLineWin && level == Level.RULE && seekingValue && propertyToken && buffer.length > 1) {
      // win newline within property, e.g. a{margin:0\r\n<--
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([
        Token$1.PROPERTY_VALUE,
        serializedBuffer,
        [originalMetadata(metadata, serializedBuffer, externalContext)]
      ]);

      buffer = [];
      isBufferEmpty = true;
    } else if (isNewLineWin && level == Level.RULE && seekingValue) {
      // win newline
      buffer = [];
      isBufferEmpty = true;
    } else if (isNewLineWin && buffer.length == 1) {
      // ignore windows newline which is composed of two characters
      buffer.pop();
      isBufferEmpty = buffer.length === 0;
    } else if (!isBufferEmpty || !isSpace && !isNewLineNix && !isNewLineWin && !isCarriageReturn) {
      // any character
      buffer.push(character);
      isBufferEmpty = false;
    }

    wasEscaped = isEscaped;
    isEscaped = !wasEscaped && character == Marker$1.BACK_SLASH;
    wasCommentStart = isCommentStart;
    wasCommentEnd = isCommentEnd;

    position.line = (isNewLineWin || isNewLineNix || isCarriageReturn) ? position.line + 1 : position.line;
    position.column = (isNewLineWin || isNewLineNix || isCarriageReturn) ? 0 : position.column + 1;
  }

  if (seekingValue) {
    externalContext.warnings.push('Missing \'}\' at ' + formatPosition([position.line, position.column, position.source]) + '.');
  }

  if (seekingValue && buffer.length > 0) {
    serializedBuffer = buffer.join('').trimRight().replace(TAIL_BROKEN_VALUE_PATTERN, '$1').trimRight();
    propertyToken.push([
      Token$1.PROPERTY_VALUE,
      serializedBuffer,
      [originalMetadata(metadata, serializedBuffer, externalContext)]
    ]);

    buffer = [];
  }

  if (buffer.length > 0) {
    externalContext.warnings.push('Invalid character(s) \'' + buffer.join('') + '\' at ' + formatPosition(metadata) + '. Ignoring.');
  }

  return allTokens;
}

function isIgnoreStartComment(buffer) {
  return IGNORE_START_COMMENT_PATTERN.test(buffer.join('') + Marker$1.FORWARD_SLASH);
}

function isIgnoreEndComment(buffer) {
  return IGNORE_END_COMMENT_PATTERN.test(buffer.join('') + Marker$1.FORWARD_SLASH);
}

function originalMetadata(metadata, value, externalContext, selectorFallbacks) {
  var source = metadata[2];

  return externalContext.inputSourceMapTracker.isTracking(source)
    ? externalContext.inputSourceMapTracker.originalPositionFor(metadata, value.length, selectorFallbacks)
    : metadata;
}

function tokenTypeFrom(buffer) {
  var isAtRule = buffer[0] == Marker$1.AT || buffer[0] == Marker$1.UNDERSCORE;
  var ruleWord = buffer.join('').split(RULE_WORD_SEPARATOR_PATTERN)[0];

  if (isAtRule && BLOCK_RULES.indexOf(ruleWord) > -1) {
    return Token$1.NESTED_BLOCK;
  } if (isAtRule && AT_RULES.indexOf(ruleWord) > -1) {
    return Token$1.AT_RULE;
  } if (isAtRule) {
    return Token$1.AT_RULE_BLOCK;
  }
  return Token$1.RULE;
}

function tokenScopeFrom(tokenType) {
  if (tokenType == Token$1.RULE) {
    return Token$1.RULE_SCOPE;
  } if (tokenType == Token$1.NESTED_BLOCK) {
    return Token$1.NESTED_BLOCK_SCOPE;
  } if (tokenType == Token$1.AT_RULE_BLOCK) {
    return Token$1.AT_RULE_BLOCK_SCOPE;
  }
}

function isPageMarginBox(buffer) {
  var serializedBuffer = buffer.join('').trim();

  return PAGE_MARGIN_BOXES.indexOf(serializedBuffer) > -1 || EXTRA_PAGE_BOXES.indexOf(serializedBuffer) > -1;
}

function isRepeatToken(buffer) {
  return REPEAT_PATTERN.test(buffer.join('') + Marker$1.CLOSE_SQUARE_BRACKET);
}

var tokenize_1 = tokenize$1;

var fs = empty_1;
var path = pathBrowserify;

var applySourceMaps = applySourceMaps_1;
var extractImportUrlAndMedia = extractImportUrlAndMedia_1;
var isAllowedResource = isAllowedResource_1;
var loadOriginalSources = loadOriginalSources_1;
var normalizePath = normalizePath_1;
var rebase = rebase_1;
var rebaseLocalMap = rebaseLocalMap_1;
var rebaseRemoteMap = rebaseRemoteMap_1;
var restoreImport = restoreImport_1;

var tokenize = tokenize_1;
var Token = token;
var Marker = marker;
var hasProtocol = hasProtocol_1;
var isImport = isImport_1;
var isRemoteResource$1 = isRemoteResource_1;

var UNKNOWN_URI = 'uri:unknown';
var FILE_RESOURCE_PROTOCOL = 'file://';

function readSources$1(input, context, callback) {
  return doReadSources(input, context, function(tokens) {
    return applySourceMaps(tokens, context, function() {
      return loadOriginalSources(context, function() { return callback(tokens); });
    });
  });
}

function doReadSources(input, context, callback) {
  if (typeof input == 'string') {
    return fromString(input, context, callback);
  } if (dist.Buffer.isBuffer(input)) {
    return fromString(input.toString(), context, callback);
  } if (Array.isArray(input)) {
    return fromArray(input, context, callback);
  } if (typeof input == 'object') {
    return fromHash(input, context, callback);
  }
}

function fromString(input, context, callback) {
  context.source = undefined;
  context.sourcesContent[undefined] = input;
  context.stats.originalSize += input.length;

  return fromStyles(input, context, { inline: context.options.inline }, callback);
}

function fromArray(input, context, callback) {
  var inputAsImports = input.reduce(function(accumulator, uriOrHash) {
    if (typeof uriOrHash === 'string') {
      return addStringSource(uriOrHash, accumulator);
    }
    return addHashSource(uriOrHash, context, accumulator);
  }, []);

  return fromStyles(inputAsImports.join(''), context, { inline: ['all'] }, callback);
}

function fromHash(input, context, callback) {
  var inputAsImports = addHashSource(input, context, []);
  return fromStyles(inputAsImports.join(''), context, { inline: ['all'] }, callback);
}

function addStringSource(input, imports) {
  imports.push(restoreAsImport(normalizeUri(input)));
  return imports;
}

function addHashSource(input, context, imports) {
  var uri;
  var normalizedUri;
  var source;

  for (uri in input) {
    source = input[uri];
    normalizedUri = normalizeUri(uri);

    imports.push(restoreAsImport(normalizedUri));

    context.sourcesContent[normalizedUri] = source.styles;

    if (source.sourceMap) {
      trackSourceMap(source.sourceMap, normalizedUri, context);
    }
  }

  return imports;
}

function normalizeUri(uri) {
  var currentPath = path.resolve('');
  var absoluteUri;
  var relativeToCurrentPath;
  var normalizedUri;

  if (isRemoteResource$1(uri)) {
    return uri;
  }

  absoluteUri = path.isAbsolute(uri)
    ? uri
    : path.resolve(uri);
  relativeToCurrentPath = path.relative(currentPath, absoluteUri);
  normalizedUri = normalizePath(relativeToCurrentPath);

  return normalizedUri;
}

function trackSourceMap(sourceMap, uri, context) {
  var parsedMap = typeof sourceMap == 'string'
    ? JSON.parse(sourceMap)
    : sourceMap;
  var rebasedMap = isRemoteResource$1(uri)
    ? rebaseRemoteMap(parsedMap, uri)
    : rebaseLocalMap(parsedMap, uri || UNKNOWN_URI, context.options.rebaseTo);

  context.inputSourceMapTracker.track(uri, rebasedMap);
}

function restoreAsImport(uri) {
  return restoreImport('url(' + uri + ')', '') + Marker.SEMICOLON;
}

function fromStyles(styles, context, parentInlinerContext, callback) {
  var tokens;
  var rebaseConfig = {};

  if (!context.source) {
    rebaseConfig.fromBase = path.resolve('');
    rebaseConfig.toBase = context.options.rebaseTo;
  } else if (isRemoteResource$1(context.source)) {
    rebaseConfig.fromBase = context.source;
    rebaseConfig.toBase = context.source;
  } else if (path.isAbsolute(context.source)) {
    rebaseConfig.fromBase = path.dirname(context.source);
    rebaseConfig.toBase = context.options.rebaseTo;
  } else {
    rebaseConfig.fromBase = path.dirname(path.resolve(context.source));
    rebaseConfig.toBase = context.options.rebaseTo;
  }

  tokens = tokenize(styles, context);
  tokens = rebase(tokens, context.options.rebase, context.validator, rebaseConfig);

  return allowsAnyImports(parentInlinerContext.inline)
    ? inline(tokens, context, parentInlinerContext, callback)
    : callback(tokens);
}

function allowsAnyImports(inline) {
  return !(inline.length == 1 && inline[0] == 'none');
}

function inline(tokens, externalContext, parentInlinerContext, callback) {
  var inlinerContext = {
    afterContent: false,
    callback: callback,
    errors: externalContext.errors,
    externalContext: externalContext,
    fetch: externalContext.options.fetch,
    inlinedStylesheets: parentInlinerContext.inlinedStylesheets || externalContext.inlinedStylesheets,
    inline: parentInlinerContext.inline,
    inlineRequest: externalContext.options.inlineRequest,
    inlineTimeout: externalContext.options.inlineTimeout,
    isRemote: parentInlinerContext.isRemote || false,
    localOnly: externalContext.localOnly,
    outputTokens: [],
    rebaseTo: externalContext.options.rebaseTo,
    sourceTokens: tokens,
    warnings: externalContext.warnings
  };

  return doInlineImports(inlinerContext);
}

function doInlineImports(inlinerContext) {
  var token;
  var i, l;

  for (i = 0, l = inlinerContext.sourceTokens.length; i < l; i++) {
    token = inlinerContext.sourceTokens[i];

    if (token[0] == Token.AT_RULE && isImport(token[1])) {
      inlinerContext.sourceTokens.splice(0, i);
      return inlineStylesheet(token, inlinerContext);
    } if (token[0] == Token.AT_RULE || token[0] == Token.COMMENT) {
      inlinerContext.outputTokens.push(token);
    } else {
      inlinerContext.outputTokens.push(token);
      inlinerContext.afterContent = true;
    }
  }

  inlinerContext.sourceTokens = [];
  return inlinerContext.callback(inlinerContext.outputTokens);
}

function inlineStylesheet(token, inlinerContext) {
  var uriAndMediaQuery = extractImportUrlAndMedia(token[1]);
  var uri = uriAndMediaQuery[0];
  var mediaQuery = uriAndMediaQuery[1];
  var metadata = token[2];

  return isRemoteResource$1(uri)
    ? inlineRemoteStylesheet(uri, mediaQuery, metadata, inlinerContext)
    : inlineLocalStylesheet(uri, mediaQuery, metadata, inlinerContext);
}

function inlineRemoteStylesheet(uri, mediaQuery, metadata, inlinerContext) {
  var isAllowed = isAllowedResource(uri, true, inlinerContext.inline);
  var originalUri = uri;
  var isLoaded = uri in inlinerContext.externalContext.sourcesContent;
  var isRuntimeResource = !hasProtocol(uri);

  if (inlinerContext.inlinedStylesheets.indexOf(uri) > -1) {
    inlinerContext.warnings.push('Ignoring remote @import of "' + uri + '" as it has already been imported.');
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  } if (inlinerContext.localOnly && inlinerContext.afterContent) {
    inlinerContext.warnings.push('Ignoring remote @import of "' + uri + '" as no callback given and after other content.');
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  } if (isRuntimeResource) {
    inlinerContext.warnings.push('Skipping remote @import of "' + uri + '" as no protocol given.');
    inlinerContext.outputTokens = inlinerContext.outputTokens.concat(inlinerContext.sourceTokens.slice(0, 1));
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  } if (inlinerContext.localOnly && !isLoaded) {
    inlinerContext.warnings.push('Skipping remote @import of "' + uri + '" as no callback given.');
    inlinerContext.outputTokens = inlinerContext.outputTokens.concat(inlinerContext.sourceTokens.slice(0, 1));
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  } if (!isAllowed && inlinerContext.afterContent) {
    inlinerContext.warnings.push('Ignoring remote @import of "' + uri + '" as resource is not allowed and after other content.');
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  } if (!isAllowed) {
    inlinerContext.warnings.push('Skipping remote @import of "' + uri + '" as resource is not allowed.');
    inlinerContext.outputTokens = inlinerContext.outputTokens.concat(inlinerContext.sourceTokens.slice(0, 1));
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  }

  inlinerContext.inlinedStylesheets.push(uri);

  function whenLoaded(error, importedStyles) {
    if (error) {
      inlinerContext.errors.push('Broken @import declaration of "' + uri + '" - ' + error);

      return dist.process.nextTick(function() {
        inlinerContext.outputTokens = inlinerContext.outputTokens.concat(inlinerContext.sourceTokens.slice(0, 1));
        inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
        doInlineImports(inlinerContext);
      });
    }

    inlinerContext.inline = inlinerContext.externalContext.options.inline;
    inlinerContext.isRemote = true;

    inlinerContext.externalContext.source = originalUri;
    inlinerContext.externalContext.sourcesContent[uri] = importedStyles;
    inlinerContext.externalContext.stats.originalSize += importedStyles.length;

    return fromStyles(importedStyles, inlinerContext.externalContext, inlinerContext, function(importedTokens) {
      importedTokens = wrapInMedia(importedTokens, mediaQuery, metadata);

      inlinerContext.outputTokens = inlinerContext.outputTokens.concat(importedTokens);
      inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);

      return doInlineImports(inlinerContext);
    });
  }

  return isLoaded
    ? whenLoaded(null, inlinerContext.externalContext.sourcesContent[uri])
    : inlinerContext.fetch(uri, inlinerContext.inlineRequest, inlinerContext.inlineTimeout, whenLoaded);
}

function inlineLocalStylesheet(uri, mediaQuery, metadata, inlinerContext) {
  var protocolLessUri = uri.replace(FILE_RESOURCE_PROTOCOL, '');
  var currentPath = path.resolve('');
  var absoluteUri = path.isAbsolute(protocolLessUri)
    ? path.resolve(currentPath, protocolLessUri[0] == '/' ? protocolLessUri.substring(1) : protocolLessUri)
    : path.resolve(inlinerContext.rebaseTo, protocolLessUri);
  var relativeToCurrentPath = path.relative(currentPath, absoluteUri);
  var importedStyles;
  var isAllowed = isAllowedResource(protocolLessUri, false, inlinerContext.inline);
  var normalizedPath = normalizePath(relativeToCurrentPath);
  var isLoaded = normalizedPath in inlinerContext.externalContext.sourcesContent;

  if (inlinerContext.inlinedStylesheets.indexOf(absoluteUri) > -1) {
    inlinerContext.warnings.push('Ignoring local @import of "' + protocolLessUri + '" as it has already been imported.');
  } else if (isAllowed && !isLoaded && (!fs.existsSync(absoluteUri) || !fs.statSync(absoluteUri).isFile())) {
    inlinerContext.errors.push('Ignoring local @import of "' + protocolLessUri + '" as resource is missing.');
  } else if (!isAllowed && inlinerContext.afterContent) {
    inlinerContext.warnings.push('Ignoring local @import of "' + protocolLessUri + '" as resource is not allowed and after other content.');
  } else if (inlinerContext.afterContent) {
    inlinerContext.warnings.push('Ignoring local @import of "' + protocolLessUri + '" as after other content.');
  } else if (!isAllowed) {
    inlinerContext.warnings.push('Skipping local @import of "' + protocolLessUri + '" as resource is not allowed.');
    inlinerContext.outputTokens = inlinerContext.outputTokens.concat(inlinerContext.sourceTokens.slice(0, 1));
  } else {
    importedStyles = isLoaded
      ? inlinerContext.externalContext.sourcesContent[normalizedPath]
      : fs.readFileSync(absoluteUri, 'utf-8');

    if (importedStyles.charCodeAt(0) === 65279) {
      importedStyles = importedStyles.substring(1);
    }

    inlinerContext.inlinedStylesheets.push(absoluteUri);
    inlinerContext.inline = inlinerContext.externalContext.options.inline;

    inlinerContext.externalContext.source = normalizedPath;
    inlinerContext.externalContext.sourcesContent[normalizedPath] = importedStyles;
    inlinerContext.externalContext.stats.originalSize += importedStyles.length;

    return fromStyles(importedStyles, inlinerContext.externalContext, inlinerContext, function(importedTokens) {
      importedTokens = wrapInMedia(importedTokens, mediaQuery, metadata);

      inlinerContext.outputTokens = inlinerContext.outputTokens.concat(importedTokens);
      inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);

      return doInlineImports(inlinerContext);
    });
  }

  inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);

  return doInlineImports(inlinerContext);
}

function wrapInMedia(tokens, mediaQuery, metadata) {
  if (mediaQuery) {
    return [[Token.NESTED_BLOCK, [[Token.NESTED_BLOCK_SCOPE, '@media ' + mediaQuery, metadata]], tokens]];
  }
  return tokens;
}

var readSources_1 = readSources$1;

var all$1 = helpers$1.all;

function store$1(serializeContext, token) {
  var value = typeof token == 'string'
    ? token
    : token[1];
  var wrap = serializeContext.wrap;

  wrap(serializeContext, value);
  track$1(serializeContext, value);
  serializeContext.output.push(value);
}

function wrap$1(serializeContext, value) {
  if (serializeContext.column + value.length > serializeContext.format.wrapAt) {
    track$1(serializeContext, serializeContext.format.breakWith);
    serializeContext.output.push(serializeContext.format.breakWith);
  }
}

function track$1(serializeContext, value) {
  var parts = value.split('\n');

  serializeContext.line += parts.length - 1;
  serializeContext.column = parts.length > 1 ? 0 : (serializeContext.column + parts.pop().length);
}

function serializeStyles$1(tokens, context) {
  var serializeContext = {
    column: 0,
    format: context.options.format,
    indentBy: 0,
    indentWith: '',
    line: 1,
    output: [],
    spaceAfterClosingBrace: context.options.compatibility.properties.spaceAfterClosingBrace,
    store: store$1,
    wrap: context.options.format.wrapAt
      ? wrap$1
      : function() { /* noop */ }
  };

  all$1(serializeContext, tokens);

  return { styles: serializeContext.output.join('') };
}

var simple = serializeStyles$1;

var SourceMapGenerator = sourceMap.SourceMapGenerator;
var all = helpers$1.all;

var isRemoteResource = isRemoteResource_1;

var isWindows = dist.process.platform == 'win32';

var NIX_SEPARATOR_PATTERN = /\//g;
var UNKNOWN_SOURCE = '$stdin';
var WINDOWS_SEPARATOR = '\\';

function store(serializeContext, element) {
  var fromString = typeof element == 'string';
  var value = fromString ? element : element[1];
  var mappings = fromString ? null : element[2];
  var wrap = serializeContext.wrap;

  wrap(serializeContext, value);
  track(serializeContext, value, mappings);
  serializeContext.output.push(value);
}

function wrap(serializeContext, value) {
  if (serializeContext.column + value.length > serializeContext.format.wrapAt) {
    track(serializeContext, serializeContext.format.breakWith, false);
    serializeContext.output.push(serializeContext.format.breakWith);
  }
}

function track(serializeContext, value, mappings) {
  var parts = value.split('\n');

  if (mappings) {
    trackAllMappings(serializeContext, mappings);
  }

  serializeContext.line += parts.length - 1;
  serializeContext.column = parts.length > 1 ? 0 : (serializeContext.column + parts.pop().length);
}

function trackAllMappings(serializeContext, mappings) {
  for (var i = 0, l = mappings.length; i < l; i++) {
    trackMapping(serializeContext, mappings[i]);
  }
}

function trackMapping(serializeContext, mapping) {
  var line = mapping[0];
  var column = mapping[1];
  var originalSource = mapping[2];
  var source = originalSource;
  var storedSource = source || UNKNOWN_SOURCE;

  if (isWindows && source && !isRemoteResource(source)) {
    storedSource = source.replace(NIX_SEPARATOR_PATTERN, WINDOWS_SEPARATOR);
  }

  serializeContext.outputMap.addMapping({
    generated: {
      line: serializeContext.line,
      column: serializeContext.column
    },
    source: storedSource,
    original: {
      line: line,
      column: column
    }
  });

  if (serializeContext.inlineSources && (originalSource in serializeContext.sourcesContent)) {
    serializeContext.outputMap.setSourceContent(
      storedSource,
      serializeContext.sourcesContent[originalSource]
    );
  }
}

function serializeStylesAndSourceMap$1(tokens, context) {
  var serializeContext = {
    column: 0,
    format: context.options.format,
    indentBy: 0,
    indentWith: '',
    inlineSources: context.options.sourceMapInlineSources,
    line: 1,
    output: [],
    outputMap: new SourceMapGenerator(),
    sourcesContent: context.sourcesContent,
    spaceAfterClosingBrace: context.options.compatibility.properties.spaceAfterClosingBrace,
    store: store,
    wrap: context.options.format.wrapAt
      ? wrap
      : function() { /* noop */ }
  };

  all(serializeContext, tokens);

  return {
    sourceMap: serializeContext.outputMap,
    styles: serializeContext.output.join('')
  };
}

var sourceMaps = serializeStylesAndSourceMap$1;

var level0Optimize = optimize$4;
var level1Optimize = optimize$3;
var level2Optimize = optimize$1;
var validator = validator_1;

var compatibilityFrom = compatibility;
var fetchFrom = fetch;
var formatFrom = format.formatFrom;
var inlineFrom = inline$1;
var inlineRequestFrom = inlineRequest;
var inlineTimeoutFrom = inlineTimeout;
var OptimizationLevel = optimizationLevel.OptimizationLevel;
var optimizationLevelFrom = optimizationLevel.optimizationLevelFrom;
var pluginsFrom = plugins;
var rebaseFrom = rebase$3;
var rebaseToFrom = rebaseTo;

var inputSourceMapTracker = inputSourceMapTracker_1;
var readSources = readSources_1;

var serializeStyles = simple;
var serializeStylesAndSourceMap = sourceMaps;

var CleanCSS$1 = clean.exports = function CleanCSS(options) {
  options = options || {};

  this.options = {
    batch: !!options.batch,
    compatibility: compatibilityFrom(options.compatibility),
    explicitRebaseTo: 'rebaseTo' in options,
    fetch: fetchFrom(options.fetch),
    format: formatFrom(options.format),
    inline: inlineFrom(options.inline),
    inlineRequest: inlineRequestFrom(options.inlineRequest),
    inlineTimeout: inlineTimeoutFrom(options.inlineTimeout),
    level: optimizationLevelFrom(options.level),
    plugins: pluginsFrom(options.plugins),
    rebase: rebaseFrom(options.rebase, options.rebaseTo),
    rebaseTo: rebaseToFrom(options.rebaseTo),
    returnPromise: !!options.returnPromise,
    sourceMap: !!options.sourceMap,
    sourceMapInlineSources: !!options.sourceMapInlineSources
  };
};

// for compatibility with optimize-css-assets-webpack-plugin
CleanCSS$1.process = function(input, opts) {
  var cleanCss;
  var optsTo = opts.to;

  delete opts.to;
  cleanCss = new CleanCSS$1(Object.assign({
    returnPromise: true, rebaseTo: optsTo
  }, opts));

  return cleanCss.minify(input)
    .then(function(output) {
      return { css: output.styles };
    });
};

CleanCSS$1.prototype.minify = function(input, maybeSourceMap, maybeCallback) {
  var options = this.options;

  if (options.returnPromise) {
    return new Promise(function(resolve, reject) {
      minifyAll(input, options, maybeSourceMap, function(errors, output) {
        return errors
          ? reject(errors)
          : resolve(output);
      });
    });
  }
  return minifyAll(input, options, maybeSourceMap, maybeCallback);
};

function minifyAll(input, options, maybeSourceMap, maybeCallback) {
  if (options.batch && Array.isArray(input)) {
    return minifyInBatchesFromArray(input, options, maybeSourceMap, maybeCallback);
  } if (options.batch && (typeof input == 'object')) {
    return minifyInBatchesFromHash(input, options, maybeSourceMap, maybeCallback);
  }
  return minify(input, options, maybeSourceMap, maybeCallback);
}

function minifyInBatchesFromArray(input, options, maybeSourceMap, maybeCallback) {
  var callback = typeof maybeCallback == 'function'
    ? maybeCallback
    : (typeof maybeSourceMap == 'function' ? maybeSourceMap : null);
  var errors = [];
  var outputAsHash = {};
  var inputValue;
  var i, l;

  function whenHashBatchDone(innerErrors, output) {
    outputAsHash = Object.assign(outputAsHash, output);

    if (innerErrors !== null) {
      errors = errors.concat(innerErrors);
    }
  }

  for (i = 0, l = input.length; i < l; i++) {
    if (typeof input[i] == 'object') {
      minifyInBatchesFromHash(input[i], options, whenHashBatchDone);
    } else {
      inputValue = input[i];

      outputAsHash[inputValue] = minify([inputValue], options);
      errors = errors.concat(outputAsHash[inputValue].errors);
    }
  }

  return callback
    ? callback(errors.length > 0 ? errors : null, outputAsHash)
    : outputAsHash;
}

function minifyInBatchesFromHash(input, options, maybeSourceMap, maybeCallback) {
  var callback = typeof maybeCallback == 'function'
    ? maybeCallback
    : (typeof maybeSourceMap == 'function' ? maybeSourceMap : null);
  var errors = [];
  var outputAsHash = {};
  var inputKey;
  var inputValue;

  for (inputKey in input) {
    inputValue = input[inputKey];

    outputAsHash[inputKey] = minify(inputValue.styles, options, inputValue.sourceMap);
    errors = errors.concat(outputAsHash[inputKey].errors);
  }

  return callback
    ? callback(errors.length > 0 ? errors : null, outputAsHash)
    : outputAsHash;
}

function minify(input, options, maybeSourceMap, maybeCallback) {
  var sourceMap = typeof maybeSourceMap != 'function'
    ? maybeSourceMap
    : null;
  var callback = typeof maybeCallback == 'function'
    ? maybeCallback
    : (typeof maybeSourceMap == 'function' ? maybeSourceMap : null);
  var context = {
    stats: {
      efficiency: 0,
      minifiedSize: 0,
      originalSize: 0,
      startedAt: Date.now(),
      timeSpent: 0
    },
    cache: { specificity: {} },
    errors: [],
    inlinedStylesheets: [],
    inputSourceMapTracker: inputSourceMapTracker(),
    localOnly: !callback,
    options: options,
    source: null,
    sourcesContent: {},
    validator: validator(options.compatibility),
    warnings: []
  };
  var implicitRebaseToWarning;

  if (sourceMap) {
    context.inputSourceMapTracker.track(undefined, sourceMap);
  }

  if (options.rebase && !options.explicitRebaseTo) {
    implicitRebaseToWarning = 'You have set `rebase: true` without giving `rebaseTo` option, which, in this case, defaults to the current working directory. '
      + 'You are then warned this can lead to unexpected URL rebasing (aka here be dragons)! '
      + 'If you are OK with the clean-css output, then you can get rid of this warning by giving clean-css a `rebaseTo: process.cwd()` option.';
    context.warnings.push(implicitRebaseToWarning);
  }

  return runner(context.localOnly)(function() {
    return readSources(input, context, function(tokens) {
      var serialize = context.options.sourceMap
        ? serializeStylesAndSourceMap
        : serializeStyles;

      var optimizedTokens = optimize(tokens, context);
      var optimizedStyles = serialize(optimizedTokens, context);
      var output = withMetadata(optimizedStyles, context);

      return callback
        ? callback(context.errors.length > 0 ? context.errors : null, output)
        : output;
    });
  });
}

function runner(localOnly) {
  // to always execute code asynchronously when a callback is given
  // more at blog.izs.me/post/59142742143/designing-apis-for-asynchrony
  return localOnly
    ? function(callback) { return callback(); }
    : dist.process.nextTick;
}

function optimize(tokens, context) {
  var optimized = level0Optimize(tokens);

  optimized = OptimizationLevel.One in context.options.level
    ? level1Optimize(tokens, context)
    : tokens;
  optimized = OptimizationLevel.Two in context.options.level
    ? level2Optimize(tokens, context, true)
    : optimized;

  return optimized;
}

function withMetadata(output, context) {
  output.stats = calculateStatsFrom(output.styles, context);
  output.errors = context.errors;
  output.inlinedStylesheets = context.inlinedStylesheets;
  output.warnings = context.warnings;

  return output;
}

function calculateStatsFrom(styles, context) {
  var finishedAt = Date.now();
  var timeSpent = finishedAt - context.stats.startedAt;

  delete context.stats.startedAt;
  context.stats.timeSpent = timeSpent;
  context.stats.efficiency = 1 - styles.length / context.stats.originalSize;
  context.stats.minifiedSize = styles.length;

  return context.stats;
}

var cleanExports = clean.exports;

var cleanCss = cleanExports;

const CleanCSS = /*@__PURE__*/getDefaultExportFromCjs(cleanCss);

export { CleanCSS as C };
