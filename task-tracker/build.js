#!/usr/bin/env node
/*
 * Build step for index.html.
 *
 * Chronologe can synchronize itself across devices using the Claude Artifact
 * "artifact" runtime capability: when the app's data changes, it republishes
 * a COMPLETE replacement document (doctype, head, body, script) to the same
 * artifact URL, and every open view (this one included) reloads to it.
 *
 * That replacement document must be self-sufficient: it cannot read its own
 * source from the live DOM (which may contain viewer-session / platform
 * injected content), so the page carries its own static head/body markup as
 * JS template-literal constants (HEAD_EXTRA_TEMPLATE, BODY_SKELETON_TEMPLATE),
 * and its own script logic via `boot.toString()` (a JS function always
 * stringifies back to its exact source, so that part needs no duplication).
 *
 * This script extracts the current <title>/<link>/<style> block and the
 * current <div class="wrap">...<div class="modal-backdrop">...</div> body
 * skeleton straight out of index.html, and writes them into the two
 * placeholder constants inside the <script> block. Run it after any edit to
 * the CSS or to the static HTML skeleton (nav, forms, modal, panel
 * structure) — anything that is NOT inside the dynamically rendered
 * containers (#list, #dash-*, #history-list), which stay empty in the
 * source and are filled in by JS at runtime either way.
 *
 * Usage: node build.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "index.html");
const src = fs.readFileSync(FILE, "utf8");
const lines = src.split("\n");

function findLine(re, fromIndex) {
  for (let i = fromIndex || 0; i < lines.length; i++) {
    if (re.test(lines[i])) return i;
  }
  throw new Error("Marker not found: " + re);
}

// Head material: everything from the top through the closing </style> tag.
const styleEndIdx = findLine(/^<\/style>/);
const headExtra = lines.slice(0, styleEndIdx + 1).join("\n");

// Body skeleton: from <div class="wrap"> through the modal-backdrop's closing </div>,
// i.e. everything up to (not including) the embedded state <script> tag.
const wrapStartIdx = findLine(/^<div class="wrap">/);
const stateScriptIdx = findLine(/^<script id="chronologe-state"/);
// The line right before the state script is a blank separator; stop before it.
const bodySkeleton = lines.slice(wrapStartIdx, stateScriptIdx - 1).join("\n");

for (const [name, text] of [["HEAD_EXTRA_TEMPLATE", headExtra], ["BODY_SKELETON_TEMPLATE", bodySkeleton]]) {
  if (text.indexOf("`") !== -1) {
    throw new Error(name + " extraction contains a backtick — cannot safely embed as a template literal. Fix the source or this build script.");
  }
  if (/\$\{/.test(text)) {
    throw new Error(name + " extraction contains a '${' sequence — cannot safely embed as a template literal.");
  }
  if (/<\/script/i.test(text)) {
    throw new Error(name + " extraction contains a literal </script> — would break the HTML parser when embedded.");
  }
}

// Matches either the untouched placeholder or a previously-generated template
// literal, so this script is safe to re-run after any future edit.
const assignmentsRe = /var HEAD_EXTRA_TEMPLATE = [\s\S]*?;\n(\s*)var BODY_SKELETON_TEMPLATE = [\s\S]*?;\n/;
if (!assignmentsRe.test(src)) {
  throw new Error("Could not find the HEAD_EXTRA_TEMPLATE / BODY_SKELETON_TEMPLATE assignments in index.html — check the file.");
}

const out = src.replace(
  assignmentsRe,
  function (match, indent) {
    return "var HEAD_EXTRA_TEMPLATE = `" + headExtra + "`;\n" +
      indent + "var BODY_SKELETON_TEMPLATE = `" + bodySkeleton + "`;\n";
  }
);

fs.writeFileSync(FILE, out, "utf8");
console.log("Rebuilt HEAD_EXTRA_TEMPLATE (" + headExtra.length + " chars) and BODY_SKELETON_TEMPLATE (" + bodySkeleton.length + " chars) into index.html");
