import javascript from './javascript-c8ef5ec6.js';
import handlebars from './handlebars-cecacf00.js';
import './html-c07fa05e.js';
import './css-fce7e72b.js';
import './yaml-b970d315.js';

const lang = Object.freeze({ "displayName": "Glimmer JS", "injections": { "L:source.gjs -comment -string": { "patterns": [{ "begin": "\\s*(<)(template)\\s*(>)", "beginCaptures": { "1": { "name": "punctuation.definition.tag.html" }, "2": { "name": "entity.name.tag.other.html" }, "3": { "name": "punctuation.definition.tag.html" } }, "end": "(</)(template)(>)", "endCaptures": { "1": { "name": "punctuation.definition.tag.html" }, "2": { "name": "entity.name.tag.other.html" }, "3": { "name": "punctuation.definition.tag.html" } }, "name": "meta.js.embeddedTemplateWithoutArgs", "patterns": [{ "include": "text.html.handlebars" }] }, { "begin": "(<)(template)", "beginCaptures": { "1": { "name": "punctuation.definition.tag.html" }, "2": { "name": "entity.name.tag.other.html" } }, "end": "(</)(template)(>)", "endCaptures": { "1": { "name": "punctuation.definition.tag.html" }, "2": { "name": "entity.name.tag.other.html" }, "3": { "name": "punctuation.definition.tag.html" } }, "name": "meta.js.embeddedTemplateWithArgs", "patterns": [{ "begin": "(?<=\\<template)", "end": "(?=\\>)", "patterns": [{ "include": "text.html.handlebars#tag-stuff" }] }, { "begin": "(>)", "beginCaptures": { "1": { "name": "punctuation.definition.tag.end.js" } }, "contentName": "meta.html.embedded.block", "end": "(?=</template>)", "patterns": [{ "include": "text.html.handlebars" }] }] }] } }, "name": "glimmer-js", "patterns": [{ "include": "source.js" }], "scopeName": "source.gjs", "embeddedLangs": ["javascript", "handlebars"], "aliases": ["gjs"] });
var glimmerJs = [
  ...javascript,
  ...handlebars,
  lang
];

export { glimmerJs as default };
