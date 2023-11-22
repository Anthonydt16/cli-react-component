#!/usr/bin/env node
const { spawnSync } = require("child_process");
const path = require("path");

console.log("Creating component...");

// Les arguments que vous souhaitez passer
const args = ["create", "test"]; // Remplacez "test" par les valeurs réelles que vous souhaitez passer

const result = spawnSync(
  "node",
  [path.join(__dirname, "createComponent.js"), ...args],
  {
    stdio: "inherit",
  }
);
