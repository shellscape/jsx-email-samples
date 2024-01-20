import typescript from './typescript-31ffe306.js';
import handlebars from './handlebars-cecacf00.js';
import './html-c07fa05e.js';
import './javascript-c8ef5ec6.js';
import './css-fce7e72b.js';
import './yaml-b970d315.js';

const lang = Object.freeze({ "displayName": "Glimmer TS", "injections": { "L:source.gts -comment -string": { "patterns": [{ "begin": "\\s*(<)(template)\\s*(>)", "beginCaptures": { "1": { "name": "punctuation.definition.tag.html" }, "2": { "name": "entity.name.tag.other.html" }, "3": { "name": "punctuation.definition.tag.html" } }, "end": "(</)(template)(>)", "endCaptures": { "1": { "name": "punctuation.definition.tag.html" }, "2": { "name": "entity.name.tag.other.html" }, "3": { "name": "punctuation.definition.tag.html" } }, "name": "meta.js.embeddedTemplateWithoutArgs", "patterns": [{ "include": "text.html.handlebars" }] }, { "begin": "(<)(template)", "beginCaptures": { "1": { "name": "punctuation.definition.tag.html" }, "2": { "name": "entity.name.tag.other.html" } }, "end": "(</)(template)(>)", "endCaptures": { "1": { "name": "punctuation.definition.tag.html" }, "2": { "name": "entity.name.tag.other.html" }, "3": { "name": "punctuation.definition.tag.html" } }, "name": "meta.js.embeddedTemplateWithArgs", "patterns": [{ "begin": "(?<=\\<template)", "end": "(?=\\>)", "patterns": [{ "include": "text.html.handlebars#tag-stuff" }] }, { "begin": "(>)", "beginCaptures": { "1": { "name": "punctuation.definition.tag.end.js" } }, "contentName": "meta.html.embedded.block", "end": "(?=</template>)", "patterns": [{ "include": "text.html.handlebars" }] }] }] } }, "name": "glimmer-ts", "patterns": [{ "include": "source.ts" }], "scopeName": "source.gts", "embeddedLangs": ["typescript", "handlebars"], "aliases": ["gts"] });
var glimmerTs = [
  ...typescript,
  ...handlebars,
  lang
];

export { glimmerTs as default };
