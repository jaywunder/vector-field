(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

class VectorField {
  constructor() {
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
      backgroundColor: 0xffffff,
      view: document.getElementById('pixi-render'),
      preserveDrawingBuffer: true
    });
    this.view = this.renderer.view;
    this.graphics = new PIXI.Graphics();
    this.createUI();
    this.stage.addChild(this.graphics);
    this.settings = {
      dydx: 'x',
      'x-min': -10,
      'x-max': 10,
      'y-min': -10,
      'y-max': 10,
      'Show Slope': true
    };
    this.display();
  }

  createUI() {
    this.graphics.beginFill(0x535353);
    this.graphics.drawRect(this.view.width / 2 - 2, 0, 4, this.view.height);
    this.graphics.drawRect(0, this.view.height / 2 - 2, this.view.width, 4);
    this.graphics.endFill();
  }

  display() {
    this.graphics.clear();
    this.createUI();
    this.graphics.lineStyle(4, 0x000000, 1);
    this.stage.children = [this.graphics];

    let [xMax, xMin, yMax, yMin] = [this.settings['x-max'], this.settings['x-min'], this.settings['y-max'], this.settings['y-min']];

    let numSamples = 10;
    let xInc = this.view.width / numSamples;
    let yInc = this.view.width / numSamples;
    let length = 10;

    for (let x = xMin; x < xMax; x += 0.5) {
      for (let y = yMin; y < yMax; y += 0.5) {

        let slope = math.eval(this.settings.dydx, { x, y });

        if (this.settings['Show Slope']) {
          this.displaySlope(x * xInc - length / 2 + this.view.width / 2, y * yInc - length / 2 + this.view.height / 2, slope);
        }

        this.graphics.moveTo(x * xInc - length / 2 + this.view.width / 2, y * yInc - length / 2 * -slope + this.view.height / 2);
        this.graphics.lineTo(x * xInc + length / 2 + this.view.width / 2, y * yInc + length / 2 * -slope + this.view.height / 2);
      }
    }
  }

  displaySlope(x, y, slope) {
    let text = new PIXI.Text(slope, { font: '16px monospace', fill: 'red', align: 'left' });
    text.position.x = x;
    text.position.y = y;
    this.stage.addChild(text);
  }
}
let v = new VectorField();
let gui = new dat.GUI();
let dydx = gui.add(v.settings, 'dydx');
// let xMin = gui.add(v.settings, 'x-min')
// let xMax = gui.add(v.settings, 'x-max')
// let yMin = gui.add(v.settings, 'x-min')
// let yMax = gui.add(v.settings, 'x-max')
let showSlope = gui.add(v.settings, 'Show Slope');

let onChange = value => v.display();
dydx.onFinishChange(onChange);
// xMin.onFinishChange(onChange)
// xMax.onFinishChange(onChange)
// yMin.onFinishChange(onChange)
// yMax.onFinishChange(onChange)
showSlope.onFinishChange(onChange);(function animate() {
  v.renderer.render(v.stage);
  requestAnimationFrame(animate);
})();

},{}]},{},[1]);
