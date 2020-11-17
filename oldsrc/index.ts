import * as PIXI from "pixi.js";
import * as Keyboard from "pixi.js-keyboard";
import * as Mouse from "pixi.js-mouse";
import { Input } from "./Input";

export var APP = new PIXI.Application({ 
    width: 800,         // default: 800
    height: 800,        // default: 600
    antialias: false,    // default: false
    transparent: false, // default: false
    resolution: 1,       // default: 1
    resizeTo: window
});

APP.renderer.backgroundColor = 0x000000;

APP.renderer.view.style.position = "absolute";
APP.renderer.view.style.display = "block";
APP.renderer.resize(window.innerWidth, window.innerHeight);

APP.view.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

import { game } from "./game/Game";

game.setup();

APP.ticker.add(delta => {
    game.input.preUpdate();
    game.update(delta);
    game.render(delta);
    game.input.postUpdate();
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(APP.view);