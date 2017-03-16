
const Application = require("spectron").Application;
const assert = require("assert");
const path = require("path");

const isWindows = process.platform === "win32";
const ext = isWindows ? ".cmd" : "";
const electronPath = path.join(__dirname, "..", "node_modules", ".bin", "electron" + ext);

const appPath = path.join(__dirname, "../_comp");

const app = new Application({
  path: electronPath,
  args: [appPath]
});

app.start().then(function () {
  return app.browserWindow.isVisible();
}).then(function (isVisible) {
  assert.equal(isVisible, true);
}).then(function () {
  console.info("\ntest passed");
  return app.stop();
}).catch(function (error) {
  console.error("\ntest failed", error.message);
  return app.stop();
});