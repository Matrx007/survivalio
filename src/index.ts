import { Test } from "./test";
import { WebGLEngine } from "./WebGLEngine";
import { WebGLTest } from "./WebGLTest";

var testGame : Test;

function setup() {
    testGame = new Test();

    testGame.initialize();
    testGame.run();
}

function unload() {
    testGame.cleanup();
}

window.onload = setup;
window.onunload = unload;