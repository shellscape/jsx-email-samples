import ruby from './ruby-9131b804.js';
import javascript from './javascript-78122384.js';
import sass from './sass-2f8a90c6.js';
import coffee from './coffee-c52ba301.js';
import markdown from './markdown-ed943c64.js';
import css from './css-3bffa9b0.js';
import './html-b7eb033b.js';
import './xml-2818825a.js';
import './java-b36a89bb.js';
import './sql-1d674688.js';
import './c-7bcddbf3.js';
import './shellscript-54242dab.js';
import './lua-051aa45b.js';
import './ini-bc64dff2.js';
import './make-2e432946.js';
import './perl-08c6522f.js';
import './r-b56421d0.js';
import './php-131a7018.js';
import './json-e36dbadf.js';
import './vb-0bef84f1.js';
import './xsl-47a4c68f.js';
import './yaml-a1f70f1a.js';
import './bat-1fc78d58.js';
import './clojure-21ee6759.js';
import './cpp-f375ae77.js';
import './glsl-ff21ad95.js';
import './diff-05acac23.js';
import './docker-aaa834a3.js';
import './git-commit-20f66a18.js';
import './git-rebase-d06cbd62.js';
import './go-99671c7f.js';
import './groovy-8885900c.js';
import './pug-078b05a0.js';
import './scss-abbedc35.js';
import './stylus-9e6b7c69.js';
import './jsonc-ef9dbafe.js';
import './less-d39c6032.js';
import './objective-c-9a016530.js';
import './swift-15b85260.js';
import './raku-2d15cbef.js';
import './powershell-075a0e94.js';
import './python-061aa9fe.js';
import './julia-7981d1ff.js';
import './rust-4c4b1860.js';
import './scala-0e39458f.js';
import './typescript-95afed98.js';
import './tsx-bf5a80fb.js';
import './csharp-da203bba.js';
import './fsharp-4fc27eb6.js';
import './dart-6959c1de.js';
import './handlebars-45ae059f.js';
import './erlang-a119c8e1.js';
import './elixir-a80c6cfa.js';
import './latex-4e1783a9.js';
import './tex-75615637.js';
import './haskell-69459b5c.js';
import './gnuplot-064c9701.js';
import './bibtex-dab21ee7.js';

const lang = Object.freeze({ "fileTypes": ["haml", "html.haml"], "foldingStartMarker": "^\\s*([-%#\\:\\.\\w\\=].*)\\s$", "foldingStopMarker": "^\\s*$", "keyEquivalent": "^~H", "name": "haml", "patterns": [{ "begin": "^(\\s*)==", "contentName": "string.quoted.double.ruby", "end": "$\\n*", "patterns": [{ "include": "#interpolated_ruby" }] }, { "begin": "^(\\s*):ruby", "end": "^(?!\\1\\s+|$\\n*)", "name": "source.ruby.embedded.filter.haml", "patterns": [{ "include": "source.ruby" }] }, { "captures": { "1": { "name": "punctuation.definition.prolog.haml" } }, "match": "^(!!!)($|\\s.*)", "name": "meta.prolog.haml" }, { "begin": "^(\\s*):javascript", "end": "^(?!\\1\\s+|$\\n*)", "name": "js.haml", "patterns": [{ "include": "source.js" }] }, { "begin": "^(\\s*)%script", "end": "^(?!\\1\\s+|$\\n*)", "name": "js.inline.haml", "patterns": [{ "include": "source.js" }] }, { "begin": "^(\\s*):ruby$", "end": "^(?!\\1\\s+|$\\n*)", "name": "source.ruby.embedded.filter.haml", "patterns": [{ "include": "source.ruby" }] }, { "captures": { "1": { "name": "punctuation.section.comment.haml" } }, "match": "^(\\s*)(\\/\\[[^\\]].*?$\\n?)", "name": "comment.line.slash.haml" }, { "begin": "^(\\s*)(\\-\\#|\\/|\\-\\s*\\/\\*+)", "beginCaptures": { "2": { "name": "punctuation.section.comment.haml" } }, "end": "^(?!\\1\\s+|\\n)", "name": "comment.block.haml", "patterns": [{ "include": "text.haml" }] }, { "begin": "^\\s*(?:((%)([-\\w:]+))|(?=\\.|#))", "end": "$|(?!\\.|#|\\{|\\(|\\[|&amp;|=|-|~|!=|&=|/)", "captures": { "1": { "name": "meta.tag.haml" }, "2": { "name": "punctuation.definition.tag.haml" }, "3": { "name": "entity.name.tag.haml" } }, "patterns": [{ "begin": "==", "contentName": "string.quoted.double.ruby", "end": "$\\n?", "patterns": [{ "include": "#interpolated_ruby" }] }, { "captures": { "1": { "name": "entity.other.attribute-name.class" } }, "match": "(\\.[\\w\\-\\:]+)", "name": "meta.selector.css" }, { "captures": { "1": { "name": "entity.other.attribute-name.id" } }, "match": "(#[\\w-]+)", "name": "meta.selector.css" }, { "begin": "(?<!\\#)\\{(?=.*(,|(do)|\\{|\\}|\\||(\\#.*)|\\R)\\s*)", "end": "\\s*\\}(?!\\s*\\,)(?!\\s*\\|)(?!\\#\\{.*\\})", "name": "meta.section.attributes.haml", "patterns": [{ "include": "source.ruby" }, { "include": "#continuation" }, { "include": "#rubyline" }] }, { "begin": "\\(", "end": "\\)", "name": "meta.section.attributes.plain.haml", "patterns": [{ "match": "([\\w-]+)", "name": "constant.other.symbol.ruby" }, { "match": "\\=", "name": "punctuation" }, { "include": "#variables" }, { "begin": '"', "end": '"', "name": "string.quoted.double.ruby", "patterns": [{ "match": "\\\\(x\\h{2}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)", "name": "constant.character.escape.ruby" }, { "include": "#interpolated_ruby" }] }, { "include": "#interpolated_ruby" }] }, { "begin": "\\[(?=.+(,|\\[|\\]|\\||(\\#.*))\\s*)", "end": "\\s*\\](?!.*(?!\\#\\[)\\])", "name": "meta.section.object.haml", "patterns": [{ "include": "source.ruby" }, { "include": "#continuation" }, { "include": "#rubyline" }] }, { "include": "#interpolated_ruby_line" }, { "include": "#rubyline" }, { "match": "/", "name": "punctuation.terminator.tag.haml" }] }, { "begin": "^(\\s*):(ruby|opal)$", "end": "^(?!\\1\\s+|$\\n*)", "name": "source.ruby.embedded.filter.haml", "patterns": [{ "include": "source.ruby" }] }, { "begin": "^(\\s*):ruby$", "end": "^(?!\\1\\s+|$\\n*)", "name": "source.ruby.embedded.filter.haml", "patterns": [{ "include": "source.ruby" }] }, { "begin": "^(\\s*):(style|sass)$", "end": "^(?=\\1\\s+|$\\n*)", "name": "source.sass.embedded.filter.haml", "patterns": [{ "include": "source.sass" }] }, { "begin": "^(\\s*):coffee(script)?", "end": "^(?!\\1\\s+|$\\n*)", "name": "source.coffee.embedded.filter.haml", "patterns": [{ "include": "source.coffee" }] }, { "begin": "^(\\s*):plain$", "end": "^(?=\\1\\s+|$\\n*)", "name": "text.plain.embedded.filter.haml", "patterns": [{ "include": "text.plain" }] }, { "begin": "^(\\s*)(:ruby)", "beginCaptures": { "2": { "name": "keyword.control.filter.haml" } }, "end": "(?m:(?<=\\n)(?!\\1\\s+|$\\n*))", "name": "source.ruby.embedded.filter.haml", "patterns": [{ "include": "source.ruby" }] }, { "begin": "^(\\s*)(:sass)", "beginCaptures": { "2": { "name": "keyword.control.filter.haml" } }, "end": "^(?!\\1\\s+|$\\n*)", "name": "source.embedded.filter.sass", "patterns": [{ "include": "source.sass" }] }, { "begin": "^(\\s*):(styles|sass)$", "end": "^(?=\\1\\s+|$\\n*)", "name": "source.sass.embedded.filter.haml", "patterns": [{ "include": "source.sass" }] }, { "begin": "^(\\s*):plain$", "end": "^(?=\\1\\s+|$\\n*)", "name": "text.plain.embedded.filter.haml", "patterns": [{ "include": "text.plain" }] }, { "captures": { "1": { "name": "meta.escape.haml" } }, "match": "^\\s*(\\.)" }, { "begin": "^\\s*(?==|-|~|!=|&=)", "end": "$", "patterns": [{ "include": "#interpolated_ruby_line" }, { "include": "#rubyline" }] }, { "begin": "^(\\s*)(:php)", "end": "^(?!\\1\\s+|$\\n*)", "name": "meta.embedded.php", "captures": { "2": { "name": "entity.name.tag.haml" } }, "patterns": [{ "include": "text.html.php#language" }] }, { "begin": "^(\\s*)(:markdown)", "end": "^(?!\\1\\s+|$\\n*)", "name": "meta.embedded.markdown", "captures": { "2": { "name": "entity.name.tag.haml" } }, "patterns": [{ "include": "text.html.markdown" }] }, { "begin": "^(\\s*)(:(css|styles?))$", "end": "^(?!\\1\\s+|$\\n*)", "name": "meta.embedded.css", "captures": { "2": { "name": "entity.name.tag.haml" } }, "patterns": [{ "include": "source.css" }] }, { "begin": "^(\\s*)(:sass)$", "end": "^(?!\\1\\s+|$\\n*)", "name": "meta.embedded.sass", "captures": { "2": { "name": "entity.name.tag.haml" } }, "patterns": [{ "include": "source.sass" }] }, { "begin": "^(\\s*)(:scss)$", "end": "^(?!\\1\\s+|$\\n*)", "name": "meta.embedded.scss", "captures": { "2": { "name": "entity.name.tag.haml" } }, "patterns": [{ "include": "source.scss" }] }], "repository": { "continuation": { "captures": { "1": { "name": "punctuation.separator.continuation.haml" } }, "match": "(\\|)\\s*\\n" }, "interpolated_ruby": { "patterns": [{ "captures": { "0": { "name": "punctuation.section.embedded.ruby" }, "1": { "name": "source.ruby.embedded.source.empty" } }, "match": "#\\{(\\})", "name": "source.ruby.embedded.source" }, { "begin": "#\\{", "captures": { "0": { "name": "punctuation.section.embedded.ruby" } }, "end": "(\\})", "name": "source.ruby.embedded.source", "patterns": [{ "include": "#nest_curly_and_self" }, { "include": "source.ruby" }] }, { "include": "#variables" }] }, "interpolated_ruby_line": { "begin": "!?==", "contentName": "string.source.ruby.embedded.haml", "end": "$", "name": "meta.line.ruby.interpolated.haml", "patterns": [{ "include": "#interpolated_ruby" }, { "include": "source.ruby#escaped_char" }] }, "nest_curly_and_self": { "patterns": [{ "begin": "\\{", "captures": { "0": { "name": "punctuation.section.scope.ruby" } }, "end": "\\}", "patterns": [{ "include": "#nest_curly_and_self" }, { "include": "source.ruby" }] }] }, "variables": { "patterns": [{ "captures": { "1": { "name": "punctuation.definition.variable.ruby" } }, "match": "(#@)[a-zA-Z_]\\w*", "name": "variable.other.readwrite.instance.ruby" }, { "captures": { "1": { "name": "punctuation.definition.variable.ruby" } }, "match": "(#@@)[a-zA-Z_]\\w*", "name": "variable.other.readwrite.class.ruby" }, { "captures": { "1": { "name": "punctuation.definition.variable.ruby" } }, "match": "(#\\$)[a-zA-Z_]\\w*", "name": "variable.other.readwrite.global.ruby" }] }, "rubyline": { "begin": "(&amp|!)?(=|-|~)", "contentName": "source.ruby.embedded.haml", "end": "((do|\\{)( \\|[.*]+\\|)?)$|$|^(?!.*\\|\\s*)$\\n?", "endCaptures": { "1": { "name": "source.ruby.embedded.html" }, "2": { "name": "keyword.control.ruby.start-block" } }, "name": "meta.line.ruby.haml", "patterns": [{ "match": "\\s+((elseif|foreach|switch|declare|default|use))(?=\\s|\\()", "captures": { "1": { "name": "keyword.control.php" } } }, { "match": "\\s+(require_once|include_once)(?=\\s|\\()", "captures": { "1": { "name": "keyword.control.import.include.php" } } }, { "match": "\\s+(catch|try|throw|exception|finally|die)(?=\\s|\\(|\\n*)", "name": "keyword.control.exception.php" }, { "match": "\\s+(function\\s*)((?=\\())", "captures": { "1": { "name": "storage.type.function.php" } } }, { "match": "\\s+(use\\s*)((?=\\())", "captures": { "1": { "name": "keyword.control.php" } } }, { "match": "(\\||,|<|do|\\{)\\s*(\\#.*)?$\\n*", "name": "source.ruby", "patterns": [{ "include": "#rubyline" }] }, { "comment": "Hack to let ruby comments work in this context properly", "match": "#.*$", "name": "comment.line.number-sign.ruby" }, { "include": "source.ruby" }, { "include": "#continuation" }] } }, "scopeName": "text.haml", "uuid": "3D727049-DD05-45DF-92A5-D50EA36FD035", "displayName": "Ruby Haml", "embeddedLangs": ["ruby", "javascript", "sass", "coffee", "markdown", "css"] });
var haml = [
  ...ruby,
  ...javascript,
  ...sass,
  ...coffee,
  ...markdown,
  ...css,
  lang
];

export { haml as default };
