#!/usr/bin/env node
const { spawnSync } = require("child_process");
const path = require("path");

const result = spawnSync("node", [path.join(__dirname, "createComponent.js")], {
  stdio: "inherit",
});

process.exit(result.status);
