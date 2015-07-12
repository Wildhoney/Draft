(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _helpersMiddleman = require('./helpers/Middleman');

var _helpersMiddleman2 = _interopRequireDefault(_helpersMiddleman);

var _helpersSymbols = require('./helpers/Symbols');

var _helpersSymbols2 = _interopRequireDefault(_helpersSymbols);

var _helpersBoundingBox = require('./helpers/BoundingBox');

var _helpersBoundingBox2 = _interopRequireDefault(_helpersBoundingBox);

var _helpersPolyfills = require('./helpers/Polyfills');

var _helpersInvocator = require('./helpers/Invocator');

var _helpersInvocator2 = _interopRequireDefault(_helpersInvocator);

var _helpersMapper = require('./helpers/Mapper');

var _helpersMapper2 = _interopRequireDefault(_helpersMapper);

/**
 * @module Draft
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

var Draft = (function () {

    /**
     * @constructor
     * @param {HTMLElement} element
     * @param {Object} [options={}]
     * @return {Draft}
     */

    function Draft(element) {
        var _this = this;

        var options = arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Draft);

        this[_helpersSymbols2['default'].SHAPES] = [];
        this[_helpersSymbols2['default'].OPTIONS] = (Object.assign || _helpersPolyfills.objectAssign)(this.options(), options);
        var middleman = this[_helpersSymbols2['default'].MIDDLEMAN] = new _helpersMiddleman2['default'](this);
        this[_helpersSymbols2['default'].BOUNDING_BOX] = new _helpersBoundingBox2['default'](middleman);

        // Render the SVG component using the defined options.
        var width = this[_helpersSymbols2['default'].OPTIONS].documentWidth;
        var height = this[_helpersSymbols2['default'].OPTIONS].documentHeight;
        var svg = this[_helpersSymbols2['default'].SVG] = d3.select(element).attr('width', width).attr('height', height);

        var stopPropagation = function stopPropagation() {
            return d3.event.stopPropagation();
        };
        this[_helpersSymbols2['default'].LAYERS] = {
            shapes: svg.append('g').attr('class', 'shapes').on('click', stopPropagation),
            markers: svg.append('g').attr('class', 'markers').on('click', stopPropagation)
        };

        // Deselect all shapes when the canvas is clicked.
        svg.on('click', function () {

            if (!middleman.preventDeselect()) {
                _this.deselect();
            }

            middleman.preventDeselect(false);
        });
    }

    _createClass(Draft, [{
        key: 'add',

        /**
         * @method add
         * @param {Shape|String} shape
         * @return {Shape}
         */
        value: function add(shape) {

            // Resolve the shape name to the shape object, if the user has passed the shape
            // as a string.
            shape = typeof shape === 'string' ? (0, _helpersMapper2['default'])(shape) : shape;

            var shapes = this[_helpersSymbols2['default'].SHAPES];
            shapes.push(shape);

            // Put the interface for interacting with Draft into the shape object.
            shape[_helpersSymbols2['default'].MIDDLEMAN] = this[_helpersSymbols2['default'].MIDDLEMAN];
            _helpersInvocator2['default'].did('add', shape);

            return shape;
        }
    }, {
        key: 'remove',

        /**
         * @method remove
         * @param {Shape} shape
         * @return {Number}
         */
        value: function remove(shape) {

            var shapes = this[_helpersSymbols2['default'].SHAPES];
            var index = shapes.indexOf(shape);

            shapes.splice(index, 1);
            _helpersInvocator2['default'].did('remove', shape);

            return shapes.length;
        }
    }, {
        key: 'clear',

        /**
         * @method clear
         * @return {Number}
         */
        value: function clear() {

            var shapes = this[_helpersSymbols2['default'].SHAPES];
            _helpersInvocator2['default'].did('remove', shapes);
            shapes.length = 0;

            return shapes.length;
        }
    }, {
        key: 'all',

        /**
         * @method all
         * @return {Array}
         */
        value: function all() {
            return this[_helpersSymbols2['default'].SHAPES];
        }
    }, {
        key: 'select',

        /**
         * @method select
         * @param {Array} [shapes=this.all()]
         * @return {void}
         */
        value: function select() {
            var shapes = arguments[0] === undefined ? this.all() : arguments[0];

            _helpersInvocator2['default'].did('select', shapes);
            this[_helpersSymbols2['default'].BOUNDING_BOX].drawBoundingBox(this.selected(), this[_helpersSymbols2['default'].LAYERS].markers);
        }
    }, {
        key: 'deselect',

        /**
         * @method deselect
         * @param {Array} [shapes=this.all()]
         * @return {void}
         */
        value: function deselect() {
            var shapes = arguments[0] === undefined ? this.all() : arguments[0];

            _helpersInvocator2['default'].did('deselect', shapes);
            this[_helpersSymbols2['default'].BOUNDING_BOX].drawBoundingBox(this.selected(), this[_helpersSymbols2['default'].LAYERS].markers);
        }
    }, {
        key: 'selected',

        /**
         * @method selected
         * @return {Array}
         */
        value: function selected() {
            return this.all().filter(function (shape) {
                return shape.isSelected();
            });
        }
    }, {
        key: 'options',

        /**
         * @method options
         * @return {Object}
         */
        value: function options() {

            return this[_helpersSymbols2['default'].OPTIONS] || {
                documentHeight: '100%',
                documentWidth: '100%',
                gridSize: 10
            };
        }
    }]);

    return Draft;
})();

(function ($window) {

    'use strict';

    if ($window) {

        // Export draft if the `window` object is available.
        $window.Draft = Draft;
    }
})(window);

// Export for use in ES6 applications.
exports['default'] = Draft;
module.exports = exports['default'];

},{"./helpers/BoundingBox":6,"./helpers/Invocator":7,"./helpers/Mapper":9,"./helpers/Middleman":10,"./helpers/Polyfills":11,"./helpers/Symbols":12}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _helpersSymbols = require('../helpers/Symbols');

var _helpersSymbols2 = _interopRequireDefault(_helpersSymbols);

/**
 * @module Draft
 * @submodule Selectable
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

var Ability = (function () {
  function Ability() {
    _classCallCheck(this, Ability);
  }

  _createClass(Ability, [{
    key: 'shape',

    /**
     * @method shape
     * @return {Ability}
     */
    value: function shape() {
      return this[_helpersSymbols2['default'].SHAPE];
    }
  }, {
    key: 'middleman',

    /**
     * @method middleman
     * @return {Middleman}
     */
    value: function middleman() {
      return this.shape()[_helpersSymbols2['default'].MIDDLEMAN];
    }
  }]);

  return Ability;
})();

exports['default'] = Ability;
module.exports = exports['default'];

},{"../helpers/Symbols":12}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Ability2 = require('./Ability');

var _Ability3 = _interopRequireDefault(_Ability2);

/**
 * @module Draft
 * @submodule Resizable
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

var Resizable = (function (_Ability) {

    /**
     * @constructor
     * @return {Resizable}
     */

    function Resizable() {
        _classCallCheck(this, Resizable);

        _get(Object.getPrototypeOf(Resizable.prototype), 'constructor', this).call(this);
        this.RADIUS = 22;
        this.edges = {};
    }

    _inherits(Resizable, _Ability);

    _createClass(Resizable, [{
        key: 'didSelect',

        /**
         * @method didSelect
         * @return {void}
         */
        value: function didSelect() {
            this.reattachHandles();
        }
    }, {
        key: 'didDeselect',

        /**
         * @method didDeselect
         * @return {void}
         */
        value: function didDeselect() {
            this.detachHandles();
        }
    }, {
        key: 'reattachHandles',

        /**
         * @method reattachHandles
         * @return {void}
         */
        value: function reattachHandles() {
            this.detachHandles();
            this.attachHandles();
        }
    }, {
        key: 'attachHandles',

        /**
         * @method attachHandles
         * @return {void}
         */
        value: function attachHandles() {
            var _this = this;

            var shape = this.shape();
            var layer = this.middleman().layers().markers;
            this.handles = layer.append('g').attr('class', 'resize-handles');

            var x = shape.attr('x');
            var y = shape.attr('y');
            var width = shape.attr('width');
            var height = shape.attr('height');

            var edgeMap = {
                topLeft: { x: x, y: y },
                topMiddle: { x: x + width / 2, y: y },
                topRight: { x: x + width, y: y },
                leftMiddle: { x: x, y: y + height / 2 },
                bottomLeft: { x: x, y: y + height },
                bottomMiddle: { x: x + width / 2, y: y + height },
                bottomRight: { x: x + width, y: y + height },
                rightMiddle: { x: x + width, y: y + height / 2 }
            };

            Object.keys(edgeMap).forEach(function (key) {

                var edge = edgeMap[key];
                var dragBehaviour = _this.drag(shape, key);

                _this.edges[key] = _this.handles.append('image').attr('xlink:href', 'images/handle-main.png').attr('x', edge.x - _this.RADIUS / 2).attr('y', edge.y - _this.RADIUS / 2).attr('stroke', 'red').attr('stroke-width', 3).attr('width', _this.RADIUS).attr('height', _this.RADIUS).on('click', function () {
                    return d3.event.stopPropagation();
                }).call(d3.behavior.drag().on('dragstart', dragBehaviour.start).on('drag', dragBehaviour.drag).on('dragend', dragBehaviour.end));
            });
        }
    }, {
        key: 'detachHandles',

        /**
         * @method detachHandles
         * @return {void}
         */
        value: function detachHandles() {

            if (this.handles) {
                this.handles.remove();
            }
        }
    }, {
        key: 'popUnique',

        /**
         * @method popUnique
         * @param {Array} items
         * @return {Number}
         */
        value: function popUnique(items) {

            var counts = {};

            for (var index = 0; index < items.length; index++) {
                var num = items[index];
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }

            var unique = Object.keys(counts).filter(function (key) {
                return counts[key] === 1;
            });

            return unique.length ? Number(unique[0]) : items[0];
        }
    }, {
        key: 'shiftHandles',

        /**
         * @method shiftHandles
         * @param {String} currentKey
         * @return {void}
         */
        value: function shiftHandles(currentKey) {
            var _this2 = this;

            console.time('x');

            var coords = [];
            var regExp = /(?=[A-Z])/;

            Object.keys(this.edges).forEach(function (key) {

                // Package all of the coordinates up into a more simple `coords` object for brevity.
                var edge = _this2.edges[key];
                coords[key] = { x: Number(edge.attr('x')), y: Number(edge.attr('y')) };
            });

            /**
             * @property cornerPositions
             * @type {{top: Number, right: Number, bottom: Number, left: Number}}
             */
            var cornerPositions = {

                // Find the coordinate that doesn't match the others, which means that is the coordinate that is currently
                // being modified without any conditional statements.
                top: this.popUnique([coords.topLeft.y, coords.topMiddle.y, coords.topRight.y]),
                right: this.popUnique([coords.topRight.x, coords.rightMiddle.x, coords.bottomRight.x]),
                bottom: this.popUnique([coords.bottomLeft.y, coords.bottomMiddle.y, coords.bottomRight.y]),
                left: this.popUnique([coords.topLeft.x, coords.leftMiddle.x, coords.bottomLeft.x])

            };

            /**
             * @constant middlePositions
             * @type {{topMiddle: number, rightMiddle: number, bottomMiddle: number, leftMiddle: number}}
             */
            var middlePositions = {

                // All of these middle positions are relative to the corner positions above.
                topMiddle: (cornerPositions.left + cornerPositions.right) / 2,
                rightMiddle: (cornerPositions.top + cornerPositions.bottom) / 2,
                bottomMiddle: (cornerPositions.left + cornerPositions.right) / 2,
                leftMiddle: (cornerPositions.top + cornerPositions.bottom) / 2

            };

            ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'].forEach(function (key) {

                if (currentKey !== key) {

                    // First we need to reposition all of the corner handles, so that the handles in the middle can be
                    // positioned relative to these.
                    var parts = key.split(regExp).map(function (key) {
                        return key.toLowerCase();
                    });
                    _this2.edges[key].attr('y', cornerPositions[parts[0]]);
                    _this2.edges[key].attr('x', cornerPositions[parts[1]]);
                }
            });

            ['topMiddle', 'bottomMiddle', 'leftMiddle', 'rightMiddle'].forEach(function (key) {

                if (currentKey !== key) {

                    // Lastly we modify the position handles to be relative to the aforementioned corner handles.
                    var parts = key.split(regExp).map(function (key) {
                        return key.toLowerCase();
                    });

                    if (key === 'topMiddle' || key === 'bottomMiddle') {
                        _this2.edges[key].attr('y', cornerPositions[parts[0]]);
                        _this2.edges[key].attr('x', middlePositions[key]);
                        return;
                    }

                    // Lastly we modify the position handles to be relative to the aforementioned corner handles.
                    _this2.edges[key].attr('y', middlePositions[key]);
                    _this2.edges[key].attr('x', cornerPositions[parts[0]]);
                }
            });

            console.timeEnd('x');
        }
    }, {
        key: 'drag',

        /**
         * @method drag
         * @param {Shape} shape
         * @param {String} key
         * @return {{start: Function, drag: Function, end: Function}}
         */
        value: function drag(shape, key) {

            var middleman = this.middleman();
            var handles = this.handles;
            var radius = this.RADIUS;
            var reattachHandles = this.reattachHandles.bind(this);
            var shiftHandles = this.shiftHandles.bind(this);
            var startX = undefined,
                startY = undefined,
                ratio = undefined;

            return {

                /**
                 * @method start
                 * @return {{x: Number, y: Number}}
                 */
                start: function start() {

                    middleman.preventDeselect(true);

                    var handle = d3.select(this).classed('dragging', true);
                    ratio = shape.attr('width') / shape.attr('height');

                    startX = d3.event.sourceEvent.pageX - parseInt(handle.attr('x'));
                    startY = d3.event.sourceEvent.pageY - parseInt(handle.attr('y'));

                    return { x: startX, y: startY };
                },

                /**
                 * @method drag
                 * @return {{x: Number, y: Number}}
                 */
                drag: function drag() {

                    var options = middleman.options();
                    var handle = d3.select(this);
                    var moveX = d3.event.sourceEvent.pageX - startX;
                    var moveY = d3.event.sourceEvent.pageY - startY;
                    var finalX = Math.ceil(moveX / options.gridSize) * options.gridSize;
                    var finalY = Math.ceil(moveY / options.gridSize) * options.gridSize;
                    var bBox = handles.node().getBBox();

                    handle.attr('x', finalX).attr('y', finalY);
                    shiftHandles(key);

                    shape.attr('x', bBox.x + radius / 2).attr('y', bBox.y + radius / 2).attr('height', bBox.height - radius).attr('width', bBox.width - radius);

                    return { x: finalX, y: finalY };
                },

                /**
                 * @method end
                 * @return {void}
                 */
                end: function end() {
                    middleman.select([shape]);
                    reattachHandles();
                }

            };
        }
    }]);

    return Resizable;
})(_Ability3['default']);

exports['default'] = Resizable;
module.exports = exports['default'];

},{"./Ability":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Ability2 = require('./Ability');

var _Ability3 = _interopRequireDefault(_Ability2);

var _helpersSymbols = require('./../helpers/Symbols');

var _helpersSymbols2 = _interopRequireDefault(_helpersSymbols);

/**
 * @module Draft
 * @submodule Selectable
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

var Selectable = (function (_Ability) {
    function Selectable() {
        _classCallCheck(this, Selectable);

        _get(Object.getPrototypeOf(Selectable.prototype), 'constructor', this).apply(this, arguments);
    }

    _inherits(Selectable, _Ability);

    _createClass(Selectable, [{
        key: 'didAdd',

        /**
         * @method didAdd
         * @return {void}
         */
        value: function didAdd() {
            var _this = this;

            var element = this.shape()[_helpersSymbols2['default'].ELEMENT];
            element.on('click', this.handleClick.bind(this));
            element.call(d3.behavior.drag().on('drag', function () {
                return _this.handleDrag();
            }));
        }
    }, {
        key: 'handleDrag',

        /**
         * @method handleDrag
         * @return {Object}
         */
        value: function handleDrag() {

            this.handleClick();

            var middleman = this.shape()[_helpersSymbols2['default'].MIDDLEMAN];
            middleman.preventDeselect(true);

            // Create a fake event to drag the shape with an override X and Y value.
            var event = new MouseEvent('mousedown', { bubbles: true, cancelable: false });
            event.overrideX = d3.event.sourceEvent.pageX;
            event.overrideY = d3.event.sourceEvent.pageY;

            var bBox = middleman.boundingBox().bBox.node();
            bBox.dispatchEvent(event);
            return event;
        }
    }, {
        key: 'handleClick',

        /**
         * @method handleClick
         * @return {void}
         */
        value: function handleClick() {

            var keyMap = this.middleman()[_helpersSymbols2['default'].KEY_MAP];

            if (this.shape().isSelected()) {

                if (!keyMap.multiSelect) {

                    // Deselect all others and select only the current shape.
                    return void this.middleman().deselect({ exclude: this.shape() });
                }

                // Deselect the shape if it's currently selected.
                return void this.middleman().deselect({ include: this.shape() });
            }

            if (!keyMap.multiSelect) {

                // Deselect all shapes except for the current.
                this.middleman().deselect({ exclude: this.shape() });
            }

            this.middleman().select({ include: this.shape() });
        }
    }]);

    return Selectable;
})(_Ability3['default']);

exports['default'] = Selectable;
module.exports = exports['default'];

},{"./../helpers/Symbols":12,"./Ability":2}],5:[function(require,module,exports){
/**
 * @module Draft
 * @submodule Attributes
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

/*
 * @method setAttribute
 * @param {Array} element
 * @param {String} name
 * @param {*} value
 * @return {void}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (element, name, value) {

    'use strict';

    switch (name) {

        case 'x':
            var y = element.datum().y || 0;
            return void element.attr('transform', 'translate(' + value + ', ' + y + ')');

        case 'y':
            var x = element.datum().x || 0;
            return void element.attr('transform', 'translate(' + x + ', ' + value + ')');

    }

    element.attr(name, value);
};

module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

/**
 * @module Draft
 * @submodule BoundingBox
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

var BoundingBox = (function () {

    /**
     * @constructor
     * @param {Middleman} middleman
     * @return {BoundingBox}
     */

    function BoundingBox(middleman) {
        _classCallCheck(this, BoundingBox);

        this[_Symbols2['default'].MIDDLEMAN] = middleman;
    }

    _createClass(BoundingBox, [{
        key: 'handleClick',

        /**
         * @method handleClick
         * @return {void}
         */
        value: function handleClick() {

            var middleman = this[_Symbols2['default'].MIDDLEMAN];
            d3.event.stopPropagation();

            if (middleman.preventDeselect()) {
                middleman.preventDeselect(false);
                return;
            }

            var mouseX = d3.event.pageX;
            var mouseY = d3.event.pageY;

            this.bBox.attr('pointer-events', 'none');
            var element = document.elementFromPoint(mouseX, mouseY);
            this.bBox.attr('pointer-events', 'all');

            if (middleman.fromElement(element)) {
                var _event = new MouseEvent('click', { bubbles: true, cancelable: false });
                element.dispatchEvent(_event);
            }
        }
    }, {
        key: 'drawBoundingBox',

        /**
         * @method drawBoundingBox
         * @param {Array} selected
         * @param {Object} layer
         * @return {void}
         */
        value: function drawBoundingBox(selected, layer) {
            var _d3$behavior$drag$on$on,
                _d3$behavior$drag$on,
                _d3$behavior$drag,
                _this = this;

            if (this.bBox) {
                this.bBox.remove();
            }

            if (selected.length === 0) {
                return;
            }

            var model = { minX: Number.MAX_VALUE, minY: Number.MAX_VALUE,
                maxX: Number.MIN_VALUE, maxY: Number.MIN_VALUE };

            /**
             * Responsible for computing the collective bounding box, based on all of the bounding boxes
             * from the current selected shapes.
             *
             * @method compute
             * @param {Array} bBoxes
             * @return {void}
             */
            var compute = function compute(bBoxes) {
                model.minX = Math.min.apply(Math, _toConsumableArray(bBoxes.map(function (d) {
                    return d.x;
                })));
                model.minY = Math.min.apply(Math, _toConsumableArray(bBoxes.map(function (d) {
                    return d.y;
                })));
                model.maxX = Math.max.apply(Math, _toConsumableArray(bBoxes.map(function (d) {
                    return d.x + d.width;
                })));
                model.maxY = Math.max.apply(Math, _toConsumableArray(bBoxes.map(function (d) {
                    return d.y + d.height;
                })));
            };

            // Compute the collective bounding box.
            compute(selected.map(function (shape) {
                return shape.boundingBox();
            }));

            this.bBox = layer.append('rect').datum(model).classed('drag-box', true).attr('x', function (d) {
                return d.minX;
            }).attr('y', function (d) {
                return d.minY;
            }).attr('width', function (d) {
                return d.maxX - d.minX;
            }).attr('height', function (d) {
                return d.maxY - d.minY;
            }).on('click', this.handleClick.bind(this));

            var dragStart = ['dragstart', function () {
                return _this.dragStart();
            }];
            var drag = ['drag', function () {
                return _this.drag();
            }];
            var dragEnd = ['dragend', function () {
                return _this.dragEnd();
            }];

            this.bBox.call((_d3$behavior$drag$on$on = (_d3$behavior$drag$on = (_d3$behavior$drag = d3.behavior.drag()).on.apply(_d3$behavior$drag, dragStart)).on.apply(_d3$behavior$drag$on, drag)).on.apply(_d3$behavior$drag$on$on, dragEnd));
        }
    }, {
        key: 'dragStart',

        /**
         * @method dragStart
         * @param {Number} [x=null]
         * @param {Number} [y=null]
         * @return {void}
         */
        value: function dragStart() {
            var x = arguments[0] === undefined ? null : arguments[0];
            var y = arguments[1] === undefined ? null : arguments[1];

            var sX = Number(this.bBox.attr('x'));
            var sY = Number(this.bBox.attr('y'));

            this.start = {
                x: x !== null ? x : (d3.event.sourceEvent.overrideX || d3.event.sourceEvent.pageX) - sX,
                y: y !== null ? y : (d3.event.sourceEvent.overrideY || d3.event.sourceEvent.pageY) - sY
            };

            this.move = {
                start: { x: sX, y: sY },
                end: {}
            };
        }
    }, {
        key: 'drag',

        /**
         * @method drag
         * @param {Number} [x=null]
         * @param {Number} [y=null]
         * @param {Number} [multipleOf=this[Symbols.MIDDLEMAN].options().gridSize]
         * @return {void}
         */
        value: function drag() {
            var x = arguments[0] === undefined ? null : arguments[0];
            var y = arguments[1] === undefined ? null : arguments[1];
            var multipleOf = arguments[2] === undefined ? this[_Symbols2['default'].MIDDLEMAN].options().gridSize : arguments[2];

            this[_Symbols2['default'].MIDDLEMAN].preventDeselect(true);

            x = x !== null ? x : d3.event.sourceEvent.pageX;
            y = y !== null ? y : d3.event.sourceEvent.pageY;

            var mX = x - this.start.x,
                mY = y - this.start.y,
                eX = Math.ceil(mX / multipleOf) * multipleOf,
                eY = Math.ceil(mY / multipleOf) * multipleOf;

            this.bBox.datum().x = eX;
            this.bBox.datum().y = eY;

            this.bBox.attr('x', eX);
            this.bBox.attr('y', eY);

            this.move.end = { x: eX, y: eY };
        }
    }, {
        key: 'dragEnd',

        /**
         * @method dragEnd
         * @return {void}
         */
        value: function dragEnd() {

            var eX = this.move.end.x - this.move.start.x;
            var eY = this.move.end.y - this.move.start.y;

            if (isNaN(eX) || isNaN(eY)) {
                return;
            }

            // Move each shape by the delta between the start and end points.
            this[_Symbols2['default'].MIDDLEMAN].selected().forEach(function (shape) {

                var currentX = shape.attr('x');
                var currentY = shape.attr('y');
                var moveX = currentX + eX;
                var moveY = currentY + eY;

                shape.attr('x', moveX).attr('y', moveY);
                shape.didMove();
            });
        }
    }]);

    return BoundingBox;
})();

exports['default'] = BoundingBox;
module.exports = exports['default'];

},{"./Symbols":12}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

/**
 * @method tryInvoke
 * @param {Object} context
 * @param {String} functionName
 * @param {Array} options
 * @return {Boolean}
 */
var tryInvoke = function tryInvoke(context, functionName) {

    'use strict';

    for (var _len = arguments.length, options = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        options[_key - 2] = arguments[_key];
    }

    if (typeof context[functionName] === 'function') {
        context[functionName].apply(context, options);
        return true;
    }

    return false;
};

/**
 * @method capitalize
 * @param {String} name
 * @return {string}
 */
var capitalize = function capitalize(name) {

    'use strict';

    return name.charAt(0).toUpperCase() + name.slice(1);
};

/**
 * @module Draft
 * @submodule Invocator
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

exports['default'] = (function () {

    'use strict';

    return {

        /**
         * @method did
         * @param {String} type
         * @param {Array|Shape} shapes
         * @return {Boolean}
         */
        did: function did(type, shapes) {

            shapes = Array.isArray(shapes) ? shapes : [shapes];

            return shapes.every(function (shape) {
                return tryInvoke(shape, 'did' + capitalize(type));
            });
        },

        /**
         * @method includeExclude
         * @param {Draft} draft
         * @param {Function} fn
         * @param {Object} [options={}]
         * @return {void}
         */
        includeExclude: function includeExclude(draft, fn) {
            var options = arguments[2] === undefined ? {} : arguments[2];

            var include = options.include || undefined;
            var exclude = options.exclude || undefined;
            var middleman = draft[_Symbols2['default'].MIDDLEMAN];

            /**
             * @method allExcluding
             * @param {Array} excluding
             * @return {Array}
             */
            var allExcluding = function allExcluding(excluding) {

                excluding = Array.isArray(excluding) ? excluding : [excluding];

                return middleman.all().filter(function (shape) {
                    return ! ~excluding.indexOf(shape);
                });
            };

            if (include) {
                return void fn.apply(draft, [include]);
            }

            if (!exclude) {
                return void fn.apply(draft);
            }

            fn.apply(draft, [allExcluding(exclude)]);
        }

    };
})();

module.exports = exports['default'];

},{"./Symbols":12}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

/**
 * @module Draft
 * @submodule KeyBindings
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

var KeyBindings = (function () {

    /**
     * @constructor
     * @param {Middleman} middleman
     * @return {KeyBindings}
     */

    function KeyBindings(middleman) {
        _classCallCheck(this, KeyBindings);

        var keyMap = middleman[_Symbols2['default'].KEY_MAP];
        this[_Symbols2['default'].MIDDLEMAN] = middleman;

        // Default kep mappings
        keyMap.multiSelect = false;
        keyMap.aspectRatio = false;

        // Listen for changes to the key map.
        this.attachBindings(keyMap);
    }

    _createClass(KeyBindings, [{
        key: 'attachBindings',

        /**
         * @method attachBindings
         * @param {Object} keyMap
         * @return {void}
         */
        value: function attachBindings(keyMap) {
            var _this = this;

            // Select all of the available shapes.
            Mousetrap.bind('mod+a', function () {
                return _this[_Symbols2['default'].MIDDLEMAN].select();
            });

            // Multi-selecting shapes.
            Mousetrap.bind('mod', function () {
                return keyMap.multiSelect = true;
            }, 'keydown');
            Mousetrap.bind('mod', function () {
                return keyMap.multiSelect = false;
            }, 'keyup');

            // Maintain aspect ratios when resizing.
            Mousetrap.bind('shift', function () {
                return keyMap.aspectRatio = true;
            }, 'keydown');
            Mousetrap.bind('shift', function () {
                return keyMap.aspectRatio = false;
            }, 'keyup');
        }
    }]);

    return KeyBindings;
})();

exports['default'] = KeyBindings;
module.exports = exports['default'];

},{"./Symbols":12}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersThrow = require('../helpers/Throw');

var _helpersThrow2 = _interopRequireDefault(_helpersThrow);

var _shapesRectangle = require('../shapes/Rectangle');

var _shapesRectangle2 = _interopRequireDefault(_shapesRectangle);

/**
 * @module Draft
 * @submodule Mapper
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

exports['default'] = function (name) {

    'use strict';

    var map = {
        rectangle: _shapesRectangle2['default']
    };

    return typeof map[name] !== 'undefined' ? new map[name]() : new _helpersThrow2['default']('Cannot map "' + name + '" to a shape object');
};

module.exports = exports['default'];

},{"../helpers/Throw":13,"../shapes/Rectangle":14}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

var _KeyBindings = require('./KeyBindings');

var _KeyBindings2 = _interopRequireDefault(_KeyBindings);

var _Invocator = require('./Invocator');

var _Invocator2 = _interopRequireDefault(_Invocator);

/**
 * @module Draft
 * @submodule Middleman
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

var Middleman = (function () {

    /**
     * @constructor
     * @param {Draft} draft
     * @return {Middleman}
     */

    function Middleman(draft) {
        _classCallCheck(this, Middleman);

        this[_Symbols2['default'].DRAFT] = draft;
        this[_Symbols2['default'].KEY_MAP] = {};
        this[_Symbols2['default'].CAN_DESELECT] = false;

        new _KeyBindings2['default'](this);
    }

    _createClass(Middleman, [{
        key: 'd3',

        /**
         * @method d3
         * @return {Object}
         */
        value: function d3() {
            return this[_Symbols2['default'].DRAFT][_Symbols2['default'].SVG];
        }
    }, {
        key: 'layers',

        /**
         * @method layers
         * @return {Object}
         */
        value: function layers() {
            return this[_Symbols2['default'].DRAFT][_Symbols2['default'].LAYERS];
        }
    }, {
        key: 'options',

        /**
         * @method options
         * @return {Object}
         */
        value: function options() {
            return this[_Symbols2['default'].DRAFT].options();
        }
    }, {
        key: 'keyMap',

        /**
         * @method keyMap
         * @return {Object}
         */
        value: function keyMap() {
            return this[_Symbols2['default'].KEY_MAP];
        }
    }, {
        key: 'select',

        /**
         * @method select
         * @param {Object} options
         * @return {void}
         */
        value: function select(options) {
            _Invocator2['default'].includeExclude(this[_Symbols2['default'].DRAFT], this[_Symbols2['default'].DRAFT].select, options);
        }
    }, {
        key: 'deselect',

        /**
         * @method deselect
         * @param {Object} options
         * @return {void}
         */
        value: function deselect(options) {
            _Invocator2['default'].includeExclude(this[_Symbols2['default'].DRAFT], this[_Symbols2['default'].DRAFT].deselect, options);
        }
    }, {
        key: 'all',

        /**
         * @method all
         * @return {Array}
         */
        value: function all() {
            return this[_Symbols2['default'].DRAFT].all();
        }
    }, {
        key: 'selected',

        /**
         * @method selected
         * @return {Array}
         */
        value: function selected() {
            return this[_Symbols2['default'].DRAFT].selected();
        }
    }, {
        key: 'fromElement',

        /**
         * @method fromElement
         * @param {HTMLElement} element
         * @return {Shape}
         */
        value: function fromElement(element) {

            return this.all().filter(function (shape) {
                return element === shape[_Symbols2['default'].ELEMENT].node();
            })[0];
        }
    }, {
        key: 'preventDeselect',

        /**
         * @method preventDeselect
         * @param {Boolean} [value=undefined]
         */
        value: function preventDeselect(value) {

            if (typeof value === 'undefined') {
                return this[_Symbols2['default'].CAN_DESELECT];
            }

            this[_Symbols2['default'].CAN_DESELECT] = value;
        }
    }, {
        key: 'boundingBox',

        /**
         * @method boundingBox
         * @return {BoundingBox}
         */
        value: function boundingBox() {
            return this[_Symbols2['default'].DRAFT][_Symbols2['default'].BOUNDING_BOX];
        }
    }]);

    return Middleman;
})();

exports['default'] = Middleman;
module.exports = exports['default'];

},{"./Invocator":7,"./KeyBindings":8,"./Symbols":12}],11:[function(require,module,exports){
/**
 * @module Draft
 * @submodule Polyfills
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.objectAssign = objectAssign;

function objectAssign(target) {

    "use strict";

    if (target === undefined || target === null) {
        throw new TypeError("Cannot convert first argument to object");
    }

    var to = Object(target);

    for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
            continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));

        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
                to[nextKey] = nextSource[nextKey];
            }
        }
    }

    return to;
}

},{}],12:[function(require,module,exports){
/**
 * @module Draft
 * @submodule Symbols
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {
    DRAFT: Symbol('draft'),
    SVG: Symbol('svg'),
    ELEMENT: Symbol('element'),
    IS_SELECTED: Symbol('isSelected'),
    ATTRIBUTES: Symbol('attributes'),
    MIDDLEMAN: Symbol('middleman'),
    SHAPE: Symbol('shape'),
    SHAPES: Symbol('shapes'),
    LAYERS: Symbol('layers'),
    GROUP: Symbol('group'),
    BOUNDING_BOX: Symbol('boundingBox'),
    OPTIONS: Symbol('options'),
    ABILITIES: Symbol('abilities'),
    KEY_MAP: Symbol('keyMap'),
    CAN_DESELECT: Symbol('canDeselect')
};
module.exports = exports['default'];

},{}],13:[function(require,module,exports){
/**
 * @module Draft
 * @submodule Throw
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Throw =

/**
 * @constructor
 * @param {String} message
 * @return {Throw}
 */
function Throw(message) {
  _classCallCheck(this, Throw);

  throw new Error("Draft.js: " + message + ".");
};

exports["default"] = Throw;
module.exports = exports["default"];

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Shape2 = require('./Shape');

var _Shape3 = _interopRequireDefault(_Shape2);

/**
 * @module Draft
 * @submodule Rectangle
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

var Rectangle = (function (_Shape) {
    function Rectangle() {
        _classCallCheck(this, Rectangle);

        _get(Object.getPrototypeOf(Rectangle.prototype), 'constructor', this).apply(this, arguments);
    }

    _inherits(Rectangle, _Shape);

    _createClass(Rectangle, [{
        key: 'tagName',

        /**
         * @method tagName
         * @return {String}
         */
        value: function tagName() {
            return 'rect';
        }
    }, {
        key: 'defaultAttributes',

        /**
         * @method defaultAttributes
         * @return {Object}
         */
        value: function defaultAttributes() {

            return {
                fill: 'blue',
                height: 100,
                width: 100,
                x: 0,
                y: 0
            };
        }
    }]);

    return Rectangle;
})(_Shape3['default']);

exports['default'] = Rectangle;
module.exports = exports['default'];

},{"./Shape":15}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _helpersSymbols = require('../helpers/Symbols');

var _helpersSymbols2 = _interopRequireDefault(_helpersSymbols);

var _helpersThrow = require('../helpers/Throw');

var _helpersThrow2 = _interopRequireDefault(_helpersThrow);

var _helpersPolyfills = require('../helpers/Polyfills');

var _helpersAttributes = require('../helpers/Attributes');

var _helpersAttributes2 = _interopRequireDefault(_helpersAttributes);

var _helpersInvocator = require('../helpers/Invocator');

var _helpersInvocator2 = _interopRequireDefault(_helpersInvocator);

var _abilitiesSelectable = require('../abilities/Selectable');

var _abilitiesSelectable2 = _interopRequireDefault(_abilitiesSelectable);

var _abilitiesResizable = require('../abilities/Resizable');

var _abilitiesResizable2 = _interopRequireDefault(_abilitiesResizable);

/**
 * @module Draft
 * @submodule Shape
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */

var Shape = (function () {

    /**
     * @constructor
     * @param {Object} [attributes={}]
     * @return {Shape}
     */

    function Shape() {
        var attributes = arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Shape);

        this[_helpersSymbols2['default'].ATTRIBUTES] = attributes;
    }

    _createClass(Shape, [{
        key: 'tagName',

        /**
         * @method tagName
         * @throws {Error} Will throw an exception if the `tagName` method hasn't been defined on the child object.
         * @return {void}
         */
        value: function tagName() {
            new _helpersThrow2['default']('Tag name must be defined for a shape using the `tagName` method');
        }
    }, {
        key: 'isSelected',

        /**
         * @method isSelected
         * @return {Boolean}
         */
        value: function isSelected() {
            return this[_helpersSymbols2['default'].IS_SELECTED];
        }
    }, {
        key: 'attr',

        /**
         * @method attr
         * @param {String} name
         * @param {*} [value=undefined]
         * @return {Shape|*}
         */
        value: function attr(name, value) {

            if (typeof value === 'undefined') {
                return this[_helpersSymbols2['default'].ELEMENT].datum()[name];
            }

            this[_helpersSymbols2['default'].ELEMENT].datum()[name] = value;
            (0, _helpersAttributes2['default'])(this[_helpersSymbols2['default'].ELEMENT], name, value);

            return this;
        }
    }, {
        key: 'didAdd',

        /**
         * @method didAdd
         * @return {void}
         */
        value: function didAdd() {
            var _this = this;

            var layer = this[_helpersSymbols2['default'].MIDDLEMAN].layers().shapes;
            var attributes = (0, _helpersPolyfills.objectAssign)(this.defaultAttributes(), this[_helpersSymbols2['default'].ATTRIBUTES]);
            this[_helpersSymbols2['default'].GROUP] = layer.append('g');
            this[_helpersSymbols2['default'].ELEMENT] = this[_helpersSymbols2['default'].GROUP].append(this.tagName()).datum({});

            // Assign each attribute from the default attributes defined on the shape, as well as those defined
            // by the user when instantiating the shape.
            Object.keys(attributes).forEach(function (key) {
                return _this.attr(key, attributes[key]);
            });

            var abilities = {
                selectable: new _abilitiesSelectable2['default'](),
                resizable: new _abilitiesResizable2['default']()
            };

            Object.keys(abilities).forEach(function (key) {

                // Add the shape object into each ability instance, and invoke the `didAdd` method.
                var ability = abilities[key];
                ability[_helpersSymbols2['default'].SHAPE] = _this;
                _helpersInvocator2['default'].did('add', ability);
            });

            this[_helpersSymbols2['default'].ABILITIES] = abilities;
        }
    }, {
        key: 'didRemove',

        /**
         * @method didRemove
         * @return {void}
         */
        value: function didRemove() {}
    }, {
        key: 'didMove',

        /**
         * @method didMove
         * @return {void}
         */
        value: function didMove() {
            this[_helpersSymbols2['default'].ABILITIES].resizable.reattachHandles();
        }
    }, {
        key: 'didSelect',

        /**
         * @method didSelect
         * @return {void}
         */
        value: function didSelect() {
            this[_helpersSymbols2['default'].IS_SELECTED] = true;
            this[_helpersSymbols2['default'].ABILITIES].resizable.didSelect();
        }
    }, {
        key: 'didDeselect',

        /**
         * @method didDeselect
         * @return {void}
         */
        value: function didDeselect() {
            this[_helpersSymbols2['default'].IS_SELECTED] = false;
            this[_helpersSymbols2['default'].ABILITIES].resizable.didDeselect();
        }
    }, {
        key: 'boundingBox',

        /**
         * @method boundingBox
         * @return {Object}
         */
        value: function boundingBox() {

            var hasBBox = typeof this[_helpersSymbols2['default'].GROUP].node().getBBox === 'function';

            return hasBBox ? this[_helpersSymbols2['default'].GROUP].node().getBBox() : {
                height: this.attr('height'),
                width: this.attr('width'),
                x: this.attr('x'),
                y: this.attr('y')
            };
        }
    }, {
        key: 'defaultAttributes',

        /**
         * @method defaultAttributes
         * @return {Object}
         */
        value: function defaultAttributes() {
            return {};
        }
    }]);

    return Shape;
})();

exports['default'] = Shape;
module.exports = exports['default'];

},{"../abilities/Resizable":3,"../abilities/Selectable":4,"../helpers/Attributes":5,"../helpers/Invocator":7,"../helpers/Polyfills":11,"../helpers/Symbols":12,"../helpers/Throw":13}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9EcmFmdC9zcmMvRHJhZnQuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9EcmFmdC9zcmMvYWJpbGl0aWVzL0FiaWxpdHkuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9EcmFmdC9zcmMvYWJpbGl0aWVzL1Jlc2l6YWJsZS5qcyIsIi9Vc2Vycy9hdGltYmVybGFrZS9XZWJyb290L0RyYWZ0L3NyYy9hYmlsaXRpZXMvU2VsZWN0YWJsZS5qcyIsIi9Vc2Vycy9hdGltYmVybGFrZS9XZWJyb290L0RyYWZ0L3NyYy9oZWxwZXJzL0F0dHJpYnV0ZXMuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9EcmFmdC9zcmMvaGVscGVycy9Cb3VuZGluZ0JveC5qcyIsIi9Vc2Vycy9hdGltYmVybGFrZS9XZWJyb290L0RyYWZ0L3NyYy9oZWxwZXJzL0ludm9jYXRvci5qcyIsIi9Vc2Vycy9hdGltYmVybGFrZS9XZWJyb290L0RyYWZ0L3NyYy9oZWxwZXJzL0tleUJpbmRpbmdzLmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvRHJhZnQvc3JjL2hlbHBlcnMvTWFwcGVyLmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvRHJhZnQvc3JjL2hlbHBlcnMvTWlkZGxlbWFuLmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvRHJhZnQvc3JjL2hlbHBlcnMvUG9seWZpbGxzLmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvRHJhZnQvc3JjL2hlbHBlcnMvU3ltYm9scy5qcyIsIi9Vc2Vycy9hdGltYmVybGFrZS9XZWJyb290L0RyYWZ0L3NyYy9oZWxwZXJzL1Rocm93LmpzIiwiL1VzZXJzL2F0aW1iZXJsYWtlL1dlYnJvb3QvRHJhZnQvc3JjL3NoYXBlcy9SZWN0YW5nbGUuanMiLCIvVXNlcnMvYXRpbWJlcmxha2UvV2Vicm9vdC9EcmFmdC9zcmMvc2hhcGVzL1NoYXBlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O2dDQ0EyQixxQkFBcUI7Ozs7OEJBQ3JCLG1CQUFtQjs7OztrQ0FDbkIsdUJBQXVCOzs7O2dDQUN2QixxQkFBcUI7O2dDQUNyQixxQkFBcUI7Ozs7NkJBQ3JCLGtCQUFrQjs7Ozs7Ozs7OztJQU92QyxLQUFLOzs7Ozs7Ozs7QUFRSSxhQVJULEtBQUssQ0FRSyxPQUFPLEVBQWdCOzs7WUFBZCxPQUFPLGdDQUFHLEVBQUU7OzhCQVIvQixLQUFLOztBQVVILFlBQUksQ0FBQyw0QkFBUSxNQUFNLENBQUMsR0FBUyxFQUFFLENBQUM7QUFDaEMsWUFBSSxDQUFDLDRCQUFRLE9BQU8sQ0FBQyxHQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sc0JBcEIzQyxZQUFZLENBb0IrQyxDQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN0RixZQUFNLFNBQVMsR0FBYyxJQUFJLENBQUMsNEJBQVEsU0FBUyxDQUFDLEdBQU0sa0NBQWMsSUFBSSxDQUFDLENBQUM7QUFDOUUsWUFBSSxDQUFDLDRCQUFRLFlBQVksQ0FBQyxHQUFHLG9DQUFnQixTQUFTLENBQUMsQ0FBQzs7O0FBR3hELFlBQU0sS0FBSyxHQUFJLElBQUksQ0FBQyw0QkFBUSxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUM7QUFDbkQsWUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLDRCQUFRLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQztBQUNwRCxZQUFNLEdBQUcsR0FBTSxJQUFJLENBQUMsNEJBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRWxHLFlBQU0s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RXpFLG1CQUFPLE9BQU8sR0FBRyxJQUFJLENBQUMsNEJBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUc7QUFDcEQsc0JBQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUMzQixxQkFBSyxFQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzFCLGlCQUFDLEVBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDdEIsaUJBQUMsRUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUN6QixDQUFDO1NBRUw7Ozs7Ozs7O2VBTWdCLDZCQUFHO0FBQ2hCLG1CQUFPLEVBQUUsQ0FBQztTQUNiOzs7V0F2SWdCLEtBQUs7OztxQkFBTCxLQUFLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBNaWRkbGVtYW4gICAgICBmcm9tICcuL2hlbHBlcnMvTWlkZGxlbWFuJztcbmltcG9ydCBTeW1ib2xzICAgICAgICBmcm9tICcuL2hlbHBlcnMvU3ltYm9scyc7XG5pbXBvcnQgQm91bmRpbmdCb3ggICAgZnJvbSAnLi9oZWxwZXJzL0JvdW5kaW5nQm94JztcbmltcG9ydCB7b2JqZWN0QXNzaWdufSBmcm9tICcuL2hlbHBlcnMvUG9seWZpbGxzJztcbmltcG9ydCBpbnZvY2F0b3IgICAgICBmcm9tICcuL2hlbHBlcnMvSW52b2NhdG9yJztcbmltcG9ydCBtYXBwZXIgICAgICAgICBmcm9tICcuL2hlbHBlcnMvTWFwcGVyJztcblxuLyoqXG4gKiBAbW9kdWxlIERyYWZ0XG4gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9EcmFmdFxuICovXG5jbGFzcyBEcmFmdCB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICAgICAqIEByZXR1cm4ge0RyYWZ0fVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAgIHRoaXNbU3ltYm9scy5TSEFQRVNdICAgICAgID0gW107XG4gICAgICAgIHRoaXNbU3ltYm9scy5PUFRJT05TXSAgICAgID0gKE9iamVjdC5hc3NpZ24gfHwgb2JqZWN0QXNzaWduKSh0aGlzLm9wdGlvbnMoKSwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IG1pZGRsZW1hbiAgICAgICAgICAgID0gdGhpc1tTeW1ib2xzLk1JRERMRU1BTl0gICAgPSBuZXcgTWlkZGxlbWFuKHRoaXMpO1xuICAgICAgICB0aGlzW1N5bWJvbHMuQk9VTkRJTkdfQk9YXSA9IG5ldyBCb3VuZGluZ0JveChtaWRkbGVtYW4pO1xuXG4gICAgICAgIC8vIFJlbmRlciB0aGUgU1ZHIGNvbXBvbmVudCB1c2luZyB0aGUgZGVmaW5lZCBvcHRpb25zLlxuICAgICAgICBjb25zdCB3aWR0aCAgPSB0aGlzW1N5bWJvbHMuT1BUSU9OU10uZG9jdW1lbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpc1tTeW1ib2xzLk9QVElPTlNdLmRvY3VtZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCBzdmcgICAgPSB0aGlzW1N5bWJvbHMuU1ZHXSA9IGQzLnNlbGVjdChlbGVtZW50KS5hdHRyKCd3aWR0aCcsIHdpZHRoKS5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpO1xuXG4gICAgICAgIGNvbnN0IHN0b3BQcm9wYWdhdGlvbiA9ICgpID0+IGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzW1N5bWJvbHMuTEFZRVJTXSAgPSB7XG4gICAgICAgICAgICBzaGFwZXM6IHN2Zy5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdzaGFwZXMnKS5vbignY2xpY2snLCBzdG9wUHJvcGFnYXRpb24pLFxuICAgICAgICAgICAgbWFya2Vyczogc3ZnLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ21hcmtlcnMnKS5vbignY2xpY2snLCBzdG9wUHJvcGFnYXRpb24pXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gRGVzZWxlY3QgYWxsIHNoYXBlcyB3aGVuIHRoZSBjYW52YXMgaXMgY2xpY2tlZC5cbiAgICAgICAgc3ZnLm9uKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKCFtaWRkbGVtYW4ucHJldmVudERlc2VsZWN0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1pZGRsZW1hbi5wcmV2ZW50RGVzZWxlY3QoZmFsc2UpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAcGFyYW0ge1NoYXBlfFN0cmluZ30gc2hhcGVcbiAgICAgKiBAcmV0dXJuIHtTaGFwZX1cbiAgICAgKi9cbiAgICBhZGQoc2hhcGUpIHtcblxuICAgICAgICAvLyBSZXNvbHZlIHRoZSBzaGFwZSBuYW1lIHRvIHRoZSBzaGFwZSBvYmplY3QsIGlmIHRoZSB1c2VyIGhhcyBwYXNzZWQgdGhlIHNoYXBlXG4gICAgICAgIC8vIGFzIGEgc3RyaW5nLlxuICAgICAgICBzaGFwZSA9ICh0eXBlb2Ygc2hhcGUgPT09ICdzdHJpbmcnKSA/IG1hcHBlcihzaGFwZSkgOiBzaGFwZTtcblxuICAgICAgICBjb25zdCBzaGFwZXMgPSB0aGlzW1N5bWJvbHMuU0hBUEVTXTtcbiAgICAgICAgc2hhcGVzLnB1c2goc2hhcGUpO1xuXG4gICAgICAgIC8vIFB1dCB0aGUgaW50ZXJmYWNlIGZvciBpbnRlcmFjdGluZyB3aXRoIERyYWZ0IGludG8gdGhlIHNoYXBlIG9iamVjdC5cbiAgICAgICAgc2hhcGVbU3ltYm9scy5NSURETEVNQU5dID0gdGhpc1tTeW1ib2xzLk1JRERMRU1BTl07XG4gICAgICAgIGludm9jYXRvci5kaWQoJ2FkZCcsIHNoYXBlKTtcblxuICAgICAgICByZXR1cm4gc2hhcGU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHJlbW92ZVxuICAgICAqIEBwYXJhbSB7U2hhcGV9IHNoYXBlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIHJlbW92ZShzaGFwZSkge1xuXG4gICAgICAgIGNvbnN0IHNoYXBlcyA9IHRoaXNbU3ltYm9scy5TSEFQRVNdO1xuICAgICAgICBjb25zdCBpbmRleCAgPSBzaGFwZXMuaW5kZXhPZihzaGFwZSk7XG5cbiAgICAgICAgc2hhcGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGludm9jYXRvci5kaWQoJ3JlbW92ZScsIHNoYXBlKTtcblxuICAgICAgICByZXR1cm4gc2hhcGVzLmxlbmd0aDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY2xlYXJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgY2xlYXIoKSB7XG5cbiAgICAgICAgY29uc3Qgc2hhcGVzID0gdGhpc1tTeW1ib2xzLlNIQVBFU107XG4gICAgICAgIGludm9jYXRvci5kaWQoJ3JlbW92ZScsIHNoYXBlcyk7XG4gICAgICAgIHNoYXBlcy5sZW5ndGggPSAwO1xuXG4gICAgICAgIHJldHVybiBzaGFwZXMubGVuZ3RoO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBhbGxcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBhbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW1N5bWJvbHMuU0hBUEVTXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtzaGFwZXM9dGhpcy5hbGwoKV1cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdChzaGFwZXMgPSB0aGlzLmFsbCgpKSB7XG4gICAgICAgIGludm9jYXRvci5kaWQoJ3NlbGVjdCcsIHNoYXBlcyk7XG4gICAgICAgIHRoaXNbU3ltYm9scy5CT1VORElOR19CT1hdLmRyYXdCb3VuZGluZ0JveCh0aGlzLnNlbGVjdGVkKCksIHRoaXNbU3ltYm9scy5MQVlFUlNdLm1hcmtlcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZGVzZWxlY3RcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbc2hhcGVzPXRoaXMuYWxsKCldXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBkZXNlbGVjdChzaGFwZXMgPSB0aGlzLmFsbCgpKSB7XG4gICAgICAgIGludm9jYXRvci5kaWQoJ2Rlc2VsZWN0Jywgc2hhcGVzKTtcbiAgICAgICAgdGhpc1tTeW1ib2xzLkJPVU5ESU5HX0JPWF0uZHJhd0JvdW5kaW5nQm94KHRoaXMuc2VsZWN0ZWQoKSwgdGhpc1tTeW1ib2xzLkxBWUVSU10ubWFya2Vycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZWxlY3RlZFxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIHNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGwoKS5maWx0ZXIoKHNoYXBlKSA9PiBzaGFwZS5pc1NlbGVjdGVkKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBvcHRpb25zKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzW1N5bWJvbHMuT1BUSU9OU10gfHwge1xuICAgICAgICAgICAgZG9jdW1lbnRIZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIGRvY3VtZW50V2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGdyaWRTaXplOiAxMFxuICAgICAgICB9O1xuXG4gICAgfVxuXG59XG5cbigoJHdpbmRvdykgPT4ge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoJHdpbmRvdykge1xuXG4gICAgICAgIC8vIEV4cG9ydCBkcmFmdCBpZiB0aGUgYHdpbmRvd2Agb2JqZWN0IGlzIGF2YWlsYWJsZS5cbiAgICAgICAgJHdpbmRvdy5EcmFmdCA9IERyYWZ0O1xuXG4gICAgfVxuXG59KSh3aW5kb3cpO1xuXG4vLyBFeHBvcnQgZm9yIHVzZSBpbiBFUzYgYXBwbGljYXRpb25zLlxuZXhwb3J0IGRlZmF1bHQgRHJhZnQ7IiwiaW1wb3J0IFN5bWJvbHMgZnJvbSAnLi4vaGVscGVycy9TeW1ib2xzJztcblxuLyoqXG4gKiBAbW9kdWxlIERyYWZ0XG4gKiBAc3VibW9kdWxlIFNlbGVjdGFibGVcbiAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L0RyYWZ0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFiaWxpdHkge1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzaGFwZVxuICAgICAqIEByZXR1cm4ge0FiaWxpdHl9XG4gICAgICovXG4gICAgc2hhcGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW1N5bWJvbHMuU0hBUEVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgbWlkZGxlbWFuXG4gICAgICogQHJldHVybiB7TWlkZGxlbWFufVxuICAgICAqL1xuICAgIG1pZGRsZW1hbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcGUoKVtTeW1ib2xzLk1JRERMRU1BTl07XG4gICAgfVxuXG59IiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAnLi9BYmlsaXR5JztcblxuLyoqXG4gKiBAbW9kdWxlIERyYWZ0XG4gKiBAc3VibW9kdWxlIFJlc2l6YWJsZVxuICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvRHJhZnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzaXphYmxlIGV4dGVuZHMgQWJpbGl0eSB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcmV0dXJuIHtSZXNpemFibGV9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuUkFESVVTID0gMjI7XG4gICAgICAgIHRoaXMuZWRnZXMgID0ge307XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBkaWRTZWxlY3RcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGRpZFNlbGVjdCgpIHtcbiAgICAgICAgdGhpcy5yZWF0dGFjaEhhbmRsZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGRpZERlc2VsZWN0XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBkaWREZXNlbGVjdCgpIHtcbiAgICAgICAgdGhpcy5kZXRhY2hIYW5kbGVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCByZWF0dGFjaEhhbmRsZXNcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJlYXR0YWNoSGFuZGxlcygpIHtcbiAgICAgICAgdGhpcy5kZXRhY2hIYW5kbGVzKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoSGFuZGxlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgYXR0YWNoSGFuZGxlc1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgYXR0YWNoSGFuZGxlcygpIHtcblxuICAgICAgICBjb25zdCBzaGFwZSAgPSB0aGlzLnNoYXBlKCk7XG4gICAgICAgIGNvbnN0IGxheWVyICA9IHRoaXMubWlkZGxlbWFuKCkubGF5ZXJzKCkubWFya2VycztcbiAgICAgICAgdGhpcy5oYW5kbGVzID0gbGF5ZXIuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAncmVzaXplLWhhbmRsZXMnKTtcblxuICAgICAgICBjb25zdCB4ICAgICAgPSBzaGFwZS5hdHRyKCd4Jyk7XG4gICAgICAgIGNvbnN0IHkgICAgICA9IHNoYXBlLmF0dHIoJ3knKTtcbiAgICAgICAgY29uc3Qgd2lkdGggID0gc2hhcGUuYXR0cignd2lkdGgnKTtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gc2hhcGUuYXR0cignaGVpZ2h0Jyk7XG5cbiAgICAgICAgY29uc3QgZWRnZU1hcCA9IHtcbiAgICAgICAgICAgIHRvcExlZnQ6ICAgICAgeyB4LCAgICAgICAgICAgICAgICAgIHkgfSxcbiAgICAgICAgICAgIHRvcE1pZGRsZTogICAgeyB4OiB4ICsgKHdpZHRoIC8gMiksIHkgfSxcbiAgICAgICAgICAgIHRvcFJpZ2h0OiAgICAgeyB4OiB4ICsgd2lkdGgsICAgICAgIHkgfSxcbiAgICAgICAgICAgIGxlZnRNaWRkbGU6ICAgeyB4OiB4LCAgICAgICAgICAgICAgIHk6IHkgKyAoaGVpZ2h0IC8gMikgfSxcbiAgICAgICAgICAgIGJvdHRvbUxlZnQ6ICAgeyB4OiB4LCAgICAgICAgICAgICAgIHk6IHkgKyBoZWlnaHQgfSxcbiAgICAgICAgICAgIGJvdHRvbU1pZGRsZTogeyB4OiB4ICsgKHdpZHRoIC8gMiksIHk6IHkgKyBoZWlnaHQgfSxcbiAgICAgICAgICAgIGJvdHRvbVJpZ2h0OiAgeyB4OiB4ICsgd2lkdGgsICAgICAgIHk6IHkgKyBoZWlnaHQgfSxcbiAgICAgICAgICAgIHJpZ2h0TWlkZGxlOiAgeyB4OiB4ICsgd2lkdGgsICAgICAgIHk6IHkgKyAoaGVpZ2h0IC8gMikgfVxuICAgICAgICB9O1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGVkZ2VNYXApLmZvckVhY2goKGtleSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBlZGdlICAgICAgICAgID0gZWRnZU1hcFtrZXldO1xuICAgICAgICAgICAgY29uc3QgZHJhZ0JlaGF2aW91ciA9IHRoaXMuZHJhZyhzaGFwZSwga2V5KTtcblxuICAgICAgICAgICAgdGhpcy5lZGdlc1trZXldID0gdGhpcy5oYW5kbGVzLmFwcGVuZCgnaW1hZ2UnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3hsaW5rOmhyZWYnLCAnaW1hZ2VzL2hhbmRsZS1tYWluLnBuZycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIGVkZ2UueCAtICh0aGlzLlJBRElVUyAvIDIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBlZGdlLnkgLSAodGhpcy5SQURJVVMgLyAyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCAncmVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5SQURJVVMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5SQURJVVMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgKCkgPT4gZDMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChkMy5iZWhhdmlvci5kcmFnKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oJ2RyYWdzdGFydCcsIGRyYWdCZWhhdmlvdXIuc3RhcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdkcmFnJywgZHJhZ0JlaGF2aW91ci5kcmFnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbignZHJhZ2VuZCcsIGRyYWdCZWhhdmlvdXIuZW5kKSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGRldGFjaEhhbmRsZXNcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGRldGFjaEhhbmRsZXMoKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5oYW5kbGVzKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBwb3BVbmlxdWVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBpdGVtc1xuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBwb3BVbmlxdWUoaXRlbXMpIHtcblxuICAgICAgICBjb25zdCBjb3VudHMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBudW0gICA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgIGNvdW50c1tudW1dID0gY291bnRzW251bV0gPyBjb3VudHNbbnVtXSArIDEgOiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdW5pcXVlID0gT2JqZWN0LmtleXMoY291bnRzKS5maWx0ZXIoKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvdW50c1trZXldID09PSAxO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdW5pcXVlLmxlbmd0aCA/IE51bWJlcih1bmlxdWVbMF0pIDogaXRlbXNbMF07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNoaWZ0SGFuZGxlc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjdXJyZW50S2V5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzaGlmdEhhbmRsZXMoY3VycmVudEtleSkge1xuXG4gICAgICAgIGNvbnNvbGUudGltZSgneCcpO1xuXG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgICAgICBjb25zdCByZWdFeHAgPSAvKD89W0EtWl0pLztcblxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmVkZ2VzKS5mb3JFYWNoKChrZXkpID0+IHtcblxuICAgICAgICAgICAgLy8gUGFja2FnZSBhbGwgb2YgdGhlIGNvb3JkaW5hdGVzIHVwIGludG8gYSBtb3JlIHNpbXBsZSBgY29vcmRzYCBvYmplY3QgZm9yIGJyZXZpdHkuXG4gICAgICAgICAgICBjb25zdCBlZGdlICA9IHRoaXMuZWRnZXNba2V5XTtcbiAgICAgICAgICAgIGNvb3Jkc1trZXldID0geyB4OiBOdW1iZXIoZWRnZS5hdHRyKCd4JykpLCB5OiBOdW1iZXIoZWRnZS5hdHRyKCd5JykpIH07XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBjb3JuZXJQb3NpdGlvbnNcbiAgICAgICAgICogQHR5cGUge3t0b3A6IE51bWJlciwgcmlnaHQ6IE51bWJlciwgYm90dG9tOiBOdW1iZXIsIGxlZnQ6IE51bWJlcn19XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBjb3JuZXJQb3NpdGlvbnMgPSB7XG5cbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIGNvb3JkaW5hdGUgdGhhdCBkb2Vzbid0IG1hdGNoIHRoZSBvdGhlcnMsIHdoaWNoIG1lYW5zIHRoYXQgaXMgdGhlIGNvb3JkaW5hdGUgdGhhdCBpcyBjdXJyZW50bHlcbiAgICAgICAgICAgIC8vIGJlaW5nIG1vZGlmaWVkIHdpdGhvdXQgYW55IGNvbmRpdGlvbmFsIHN0YXRlbWVudHMuXG4gICAgICAgICAgICB0b3A6ICAgIHRoaXMucG9wVW5pcXVlKFtjb29yZHMudG9wTGVmdC55LCAgICBjb29yZHMudG9wTWlkZGxlLnksICAgIGNvb3Jkcy50b3BSaWdodC55XSksXG4gICAgICAgICAgICByaWdodDogIHRoaXMucG9wVW5pcXVlKFtjb29yZHMudG9wUmlnaHQueCwgICBjb29yZHMucmlnaHRNaWRkbGUueCwgIGNvb3Jkcy5ib3R0b21SaWdodC54XSksXG4gICAgICAgICAgICBib3R0b206IHRoaXMucG9wVW5pcXVlKFtjb29yZHMuYm90dG9tTGVmdC55LCBjb29yZHMuYm90dG9tTWlkZGxlLnksIGNvb3Jkcy5ib3R0b21SaWdodC55XSksXG4gICAgICAgICAgICBsZWZ0OiAgIHRoaXMucG9wVW5pcXVlKFtjb29yZHMudG9wTGVmdC54LCAgICBjb29yZHMubGVmdE1pZGRsZS54LCAgIGNvb3Jkcy5ib3R0b21MZWZ0LnhdKVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjb25zdGFudCBtaWRkbGVQb3NpdGlvbnNcbiAgICAgICAgICogQHR5cGUge3t0b3BNaWRkbGU6IG51bWJlciwgcmlnaHRNaWRkbGU6IG51bWJlciwgYm90dG9tTWlkZGxlOiBudW1iZXIsIGxlZnRNaWRkbGU6IG51bWJlcn19XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBtaWRkbGVQb3NpdGlvbnMgPSB7XG5cbiAgICAgICAgICAgIC8vIEFsbCBvZiB0aGVzZSBtaWRkbGUgcG9zaXRpb25zIGFyZSByZWxhdGl2ZSB0byB0aGUgY29ybmVyIHBvc2l0aW9ucyBhYm92ZS5cbiAgICAgICAgICAgIHRvcE1pZGRsZTogICAgKGNvcm5lclBvc2l0aW9ucy5sZWZ0ICsgY29ybmVyUG9zaXRpb25zLnJpZ2h0KSAvIDIsXG4gICAgICAgICAgICByaWdodE1pZGRsZTogIChjb3JuZXJQb3NpdGlvbnMudG9wICsgY29ybmVyUG9zaXRpb25zLmJvdHRvbSkgLyAyLFxuICAgICAgICAgICAgYm90dG9tTWlkZGxlOiAoY29ybmVyUG9zaXRpb25zLmxlZnQgKyBjb3JuZXJQb3NpdGlvbnMucmlnaHQpIC8gMixcbiAgICAgICAgICAgIGxlZnRNaWRkbGU6ICAgKGNvcm5lclBvc2l0aW9ucy50b3AgKyBjb3JuZXJQb3NpdGlvbnMuYm90dG9tKSAvIDJcblxuICAgICAgICB9O1xuXG4gICAgICAgIFsndG9wTGVmdCcsICd0b3BSaWdodCcsICdib3R0b21SaWdodCcsICdib3R0b21MZWZ0J10uZm9yRWFjaCgoa2V5KSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50S2V5ICE9PSBrZXkpIHtcblxuICAgICAgICAgICAgICAgIC8vIEZpcnN0IHdlIG5lZWQgdG8gcmVwb3NpdGlvbiBhbGwgb2YgdGhlIGNvcm5lciBoYW5kbGVzLCBzbyB0aGF0IHRoZSBoYW5kbGVzIGluIHRoZSBtaWRkbGUgY2FuIGJlXG4gICAgICAgICAgICAgICAgLy8gcG9zaXRpb25lZCByZWxhdGl2ZSB0byB0aGVzZS5cbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IGtleS5zcGxpdChyZWdFeHApLm1hcChrZXkgPT4ga2V5LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRnZXNba2V5XS5hdHRyKCd5JywgY29ybmVyUG9zaXRpb25zW3BhcnRzWzBdXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGdlc1trZXldLmF0dHIoJ3gnLCBjb3JuZXJQb3NpdGlvbnNbcGFydHNbMV1dKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFsndG9wTWlkZGxlJywgJ2JvdHRvbU1pZGRsZScsICdsZWZ0TWlkZGxlJywgJ3JpZ2h0TWlkZGxlJ10uZm9yRWFjaCgoa2V5KSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50S2V5ICE9PSBrZXkpIHtcblxuICAgICAgICAgICAgICAgIC8vIExhc3RseSB3ZSBtb2RpZnkgdGhlIHBvc2l0aW9uIGhhbmRsZXMgdG8gYmUgcmVsYXRpdmUgdG8gdGhlIGFmb3JlbWVudGlvbmVkIGNvcm5lciBoYW5kbGVzLlxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRzID0ga2V5LnNwbGl0KHJlZ0V4cCkubWFwKGtleSA9PiBrZXkudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAndG9wTWlkZGxlJyB8fCBrZXkgPT09ICdib3R0b21NaWRkbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRnZXNba2V5XS5hdHRyKCd5JywgY29ybmVyUG9zaXRpb25zW3BhcnRzWzBdXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRnZXNba2V5XS5hdHRyKCd4JywgbWlkZGxlUG9zaXRpb25zW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gTGFzdGx5IHdlIG1vZGlmeSB0aGUgcG9zaXRpb24gaGFuZGxlcyB0byBiZSByZWxhdGl2ZSB0byB0aGUgYWZvcmVtZW50aW9uZWQgY29ybmVyIGhhbmRsZXMuXG4gICAgICAgICAgICAgICAgdGhpcy5lZGdlc1trZXldLmF0dHIoJ3knLCBtaWRkbGVQb3NpdGlvbnNba2V5XSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGdlc1trZXldLmF0dHIoJ3gnLCBjb3JuZXJQb3NpdGlvbnNbcGFydHNbMF1dKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUudGltZUVuZCgneCcpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBkcmFnXG4gICAgICogQHBhcmFtIHtTaGFwZX0gc2hhcGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHJldHVybiB7e3N0YXJ0OiBGdW5jdGlvbiwgZHJhZzogRnVuY3Rpb24sIGVuZDogRnVuY3Rpb259fVxuICAgICAqL1xuICAgIGRyYWcoc2hhcGUsIGtleSkge1xuXG4gICAgICAgIGNvbnN0IG1pZGRsZW1hbiAgICAgICAgPSB0aGlzLm1pZGRsZW1hbigpO1xuICAgICAgICBjb25zdCBoYW5kbGVzICAgICAgICAgID0gdGhpcy5oYW5kbGVzO1xuICAgICAgICBjb25zdCByYWRpdXMgICAgICAgICAgID0gdGhpcy5SQURJVVM7XG4gICAgICAgIGNvbnN0IHJlYXR0YWNoSGFuZGxlcyAgPSB0aGlzLnJlYXR0YWNoSGFuZGxlcy5iaW5kKHRoaXMpO1xuICAgICAgICBjb25zdCBzaGlmdEhhbmRsZXMgPSB0aGlzLnNoaWZ0SGFuZGxlcy5iaW5kKHRoaXMpO1xuICAgICAgICBsZXQgc3RhcnRYLCBzdGFydFksIHJhdGlvO1xuXG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCBzdGFydFxuICAgICAgICAgICAgICogQHJldHVybiB7e3g6IE51bWJlciwgeTogTnVtYmVyfX1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuXG4gICAgICAgICAgICAgICAgbWlkZGxlbWFuLnByZXZlbnREZXNlbGVjdCh0cnVlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZSA9IGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKCdkcmFnZ2luZycsIHRydWUpO1xuICAgICAgICAgICAgICAgIHJhdGlvICAgICAgICA9IHNoYXBlLmF0dHIoJ3dpZHRoJykgLyBzaGFwZS5hdHRyKCdoZWlnaHQnKTtcblxuICAgICAgICAgICAgICAgIHN0YXJ0WCA9IGQzLmV2ZW50LnNvdXJjZUV2ZW50LnBhZ2VYIC0gcGFyc2VJbnQoaGFuZGxlLmF0dHIoJ3gnKSk7XG4gICAgICAgICAgICAgICAgc3RhcnRZID0gZDMuZXZlbnQuc291cmNlRXZlbnQucGFnZVkgLSBwYXJzZUludChoYW5kbGUuYXR0cigneScpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH07XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCBkcmFnXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHt7eDogTnVtYmVyLCB5OiBOdW1iZXJ9fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBkcmFnOiBmdW5jdGlvbiBkcmFnKCkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IG1pZGRsZW1hbi5vcHRpb25zKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlICA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlWCAgID0gKGQzLmV2ZW50LnNvdXJjZUV2ZW50LnBhZ2VYIC0gc3RhcnRYKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlWSAgID0gKGQzLmV2ZW50LnNvdXJjZUV2ZW50LnBhZ2VZIC0gc3RhcnRZKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5hbFggID0gTWF0aC5jZWlsKG1vdmVYIC8gb3B0aW9ucy5ncmlkU2l6ZSkgKiBvcHRpb25zLmdyaWRTaXplO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbmFsWSAgPSBNYXRoLmNlaWwobW92ZVkgLyBvcHRpb25zLmdyaWRTaXplKSAqIG9wdGlvbnMuZ3JpZFNpemU7XG4gICAgICAgICAgICAgICAgY29uc3QgYkJveCAgICA9IGhhbmRsZXMubm9kZSgpLmdldEJCb3goKTtcblxuICAgICAgICAgICAgICAgIGhhbmRsZS5hdHRyKCd4JywgZmluYWxYKS5hdHRyKCd5JywgZmluYWxZKTtcbiAgICAgICAgICAgICAgICBzaGlmdEhhbmRsZXMoa2V5KTtcblxuICAgICAgICAgICAgICAgIHNoYXBlLmF0dHIoJ3gnLCBiQm94LnggKyAocmFkaXVzIC8gMikpLmF0dHIoJ3knLCBiQm94LnkgKyAocmFkaXVzIC8gMikpXG4gICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgYkJveC5oZWlnaHQgLSByYWRpdXMpLmF0dHIoJ3dpZHRoJywgYkJveC53aWR0aCAtIHJhZGl1cyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiBmaW5hbFgsIHk6IGZpbmFsWSB9O1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZXRob2QgZW5kXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uIGVuZCgpIHtcbiAgICAgICAgICAgICAgICBtaWRkbGVtYW4uc2VsZWN0KFtzaGFwZV0pO1xuICAgICAgICAgICAgICAgIHJlYXR0YWNoSGFuZGxlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgQWJpbGl0eSBmcm9tICcuL0FiaWxpdHknO1xuaW1wb3J0IFN5bWJvbHMgZnJvbSAnLi8uLi9oZWxwZXJzL1N5bWJvbHMnO1xuXG4vKipcbiAqIEBtb2R1bGUgRHJhZnRcbiAqIEBzdWJtb2R1bGUgU2VsZWN0YWJsZVxuICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvRHJhZnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0YWJsZSBleHRlbmRzIEFiaWxpdHkge1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBkaWRBZGRcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGRpZEFkZCgpIHtcblxuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5zaGFwZSgpW1N5bWJvbHMuRUxFTUVOVF07XG4gICAgICAgIGVsZW1lbnQub24oJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgZWxlbWVudC5jYWxsKGQzLmJlaGF2aW9yLmRyYWcoKS5vbignZHJhZycsICgpID0+IHRoaXMuaGFuZGxlRHJhZygpKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGhhbmRsZURyYWdcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgaGFuZGxlRHJhZygpIHtcblxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrKCk7XG5cbiAgICAgICAgY29uc3QgbWlkZGxlbWFuID0gdGhpcy5zaGFwZSgpW1N5bWJvbHMuTUlERExFTUFOXTtcbiAgICAgICAgbWlkZGxlbWFuLnByZXZlbnREZXNlbGVjdCh0cnVlKTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBmYWtlIGV2ZW50IHRvIGRyYWcgdGhlIHNoYXBlIHdpdGggYW4gb3ZlcnJpZGUgWCBhbmQgWSB2YWx1ZS5cbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgTW91c2VFdmVudCgnbW91c2Vkb3duJywgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZSB9KTtcbiAgICAgICAgZXZlbnQub3ZlcnJpZGVYID0gZDMuZXZlbnQuc291cmNlRXZlbnQucGFnZVg7XG4gICAgICAgIGV2ZW50Lm92ZXJyaWRlWSA9IGQzLmV2ZW50LnNvdXJjZUV2ZW50LnBhZ2VZO1xuXG4gICAgICAgIGNvbnN0IGJCb3ggPSBtaWRkbGVtYW4uYm91bmRpbmdCb3goKS5iQm94Lm5vZGUoKTtcbiAgICAgICAgYkJveC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBoYW5kbGVDbGlja1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgaGFuZGxlQ2xpY2soKSB7XG5cbiAgICAgICAgY29uc3Qga2V5TWFwID0gdGhpcy5taWRkbGVtYW4oKVtTeW1ib2xzLktFWV9NQVBdO1xuXG4gICAgICAgIGlmICh0aGlzLnNoYXBlKCkuaXNTZWxlY3RlZCgpKSB7XG5cbiAgICAgICAgICAgIGlmICgha2V5TWFwLm11bHRpU2VsZWN0KSB7XG5cbiAgICAgICAgICAgICAgICAvLyBEZXNlbGVjdCBhbGwgb3RoZXJzIGFuZCBzZWxlY3Qgb25seSB0aGUgY3VycmVudCBzaGFwZS5cbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCB0aGlzLm1pZGRsZW1hbigpLmRlc2VsZWN0KHsgZXhjbHVkZTogdGhpcy5zaGFwZSgpIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERlc2VsZWN0IHRoZSBzaGFwZSBpZiBpdCdzIGN1cnJlbnRseSBzZWxlY3RlZC5cbiAgICAgICAgICAgIHJldHVybiB2b2lkIHRoaXMubWlkZGxlbWFuKCkuZGVzZWxlY3QoeyBpbmNsdWRlOiB0aGlzLnNoYXBlKCkgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgha2V5TWFwLm11bHRpU2VsZWN0KSB7XG5cbiAgICAgICAgICAgIC8vIERlc2VsZWN0IGFsbCBzaGFwZXMgZXhjZXB0IGZvciB0aGUgY3VycmVudC5cbiAgICAgICAgICAgIHRoaXMubWlkZGxlbWFuKCkuZGVzZWxlY3QoeyBleGNsdWRlOiB0aGlzLnNoYXBlKCkgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWlkZGxlbWFuKCkuc2VsZWN0KHsgaW5jbHVkZTogdGhpcy5zaGFwZSgpIH0pO1xuXG4gICAgfVxuXG59IiwiLyoqXG4gKiBAbW9kdWxlIERyYWZ0XG4gKiBAc3VibW9kdWxlIEF0dHJpYnV0ZXNcbiAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L0RyYWZ0XG4gKi9cblxuLypcbiAqIEBtZXRob2Qgc2V0QXR0cmlidXRlXG4gKiBAcGFyYW0ge0FycmF5fSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgKGVsZW1lbnQsIG5hbWUsIHZhbHVlKSA9PiB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHN3aXRjaCAobmFtZSkge1xuXG4gICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgICAgY29uc3QgeSA9IGVsZW1lbnQuZGF0dW0oKS55IHx8IDA7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCBlbGVtZW50LmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHt2YWx1ZX0sICR7eX0pYCk7XG5cbiAgICAgICAgY2FzZSAneSc6XG4gICAgICAgICAgICBjb25zdCB4ID0gZWxlbWVudC5kYXR1bSgpLnggfHwgMDtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIGVsZW1lbnQuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3h9LCAke3ZhbHVlfSlgKTtcblxuICAgIH1cblxuICAgIGVsZW1lbnQuYXR0cihuYW1lLCB2YWx1ZSk7XG5cbn07IiwiaW1wb3J0IFN5bWJvbHMgZnJvbSAnLi9TeW1ib2xzJztcblxuLyoqXG4gKiBAbW9kdWxlIERyYWZ0XG4gKiBAc3VibW9kdWxlIEJvdW5kaW5nQm94XG4gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9EcmFmdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3VuZGluZ0JveCB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge01pZGRsZW1hbn0gbWlkZGxlbWFuXG4gICAgICogQHJldHVybiB7Qm91bmRpbmdCb3h9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWlkZGxlbWFuKSB7XG4gICAgICAgIHRoaXNbU3ltYm9scy5NSURETEVNQU5dID0gbWlkZGxlbWFuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgaGFuZGxlQ2xpY2tcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGhhbmRsZUNsaWNrKCkge1xuXG4gICAgICAgIGNvbnN0IG1pZGRsZW1hbiA9IHRoaXNbU3ltYm9scy5NSURETEVNQU5dO1xuICAgICAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAobWlkZGxlbWFuLnByZXZlbnREZXNlbGVjdCgpKSB7XG4gICAgICAgICAgICBtaWRkbGVtYW4ucHJldmVudERlc2VsZWN0KGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlWCA9IGQzLmV2ZW50LnBhZ2VYO1xuICAgICAgICBjb25zdCBtb3VzZVkgPSBkMy5ldmVudC5wYWdlWTtcblxuICAgICAgICB0aGlzLmJCb3guYXR0cigncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChtb3VzZVgsIG1vdXNlWSk7XG4gICAgICAgIHRoaXMuYkJveC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdhbGwnKTtcblxuICAgICAgICBpZiAobWlkZGxlbWFuLmZyb21FbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2UgfSk7XG4gICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBkcmF3Qm91bmRpbmdCb3hcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzZWxlY3RlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBsYXllclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgZHJhd0JvdW5kaW5nQm94KHNlbGVjdGVkLCBsYXllcikge1xuXG4gICAgICAgIGlmICh0aGlzLmJCb3gpIHtcbiAgICAgICAgICAgIHRoaXMuYkJveC5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vZGVsID0geyBtaW5YOiBOdW1iZXIuTUFYX1ZBTFVFLCBtaW5ZOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4WDogTnVtYmVyLk1JTl9WQUxVRSwgbWF4WTogTnVtYmVyLk1JTl9WQUxVRSB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXNwb25zaWJsZSBmb3IgY29tcHV0aW5nIHRoZSBjb2xsZWN0aXZlIGJvdW5kaW5nIGJveCwgYmFzZWQgb24gYWxsIG9mIHRoZSBib3VuZGluZyBib3hlc1xuICAgICAgICAgKiBmcm9tIHRoZSBjdXJyZW50IHNlbGVjdGVkIHNoYXBlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjb21wdXRlXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGJCb3hlc1xuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgY29tcHV0ZSA9IChiQm94ZXMpID0+IHtcbiAgICAgICAgICAgIG1vZGVsLm1pblggPSBNYXRoLm1pbiguLi5iQm94ZXMubWFwKChkKSA9PiBkLngpKTtcbiAgICAgICAgICAgIG1vZGVsLm1pblkgPSBNYXRoLm1pbiguLi5iQm94ZXMubWFwKChkKSA9PiBkLnkpKTtcbiAgICAgICAgICAgIG1vZGVsLm1heFggPSBNYXRoLm1heCguLi5iQm94ZXMubWFwKChkKSA9PiBkLnggKyBkLndpZHRoKSk7XG4gICAgICAgICAgICBtb2RlbC5tYXhZID0gTWF0aC5tYXgoLi4uYkJveGVzLm1hcCgoZCkgPT4gZC55ICsgZC5oZWlnaHQpKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBDb21wdXRlIHRoZSBjb2xsZWN0aXZlIGJvdW5kaW5nIGJveC5cbiAgICAgICAgY29tcHV0ZShzZWxlY3RlZC5tYXAoKHNoYXBlKSA9PiBzaGFwZS5ib3VuZGluZ0JveCgpKSk7XG5cbiAgICAgICAgdGhpcy5iQm94ID0gbGF5ZXIuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0dW0obW9kZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2RyYWctYm94JywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsICAgICAgKChkKSA9PiBkLm1pblgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgICAgICAoKGQpID0+IGQubWluWSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgICgoZCkgPT4gZC5tYXhYIC0gZC5taW5YKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgKChkKSA9PiBkLm1heFkgLSBkLm1pblkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGNvbnN0IGRyYWdTdGFydCA9IFsnZHJhZ3N0YXJ0JywgKCkgPT4gdGhpcy5kcmFnU3RhcnQoKV07XG4gICAgICAgIGNvbnN0IGRyYWcgICAgICA9IFsnZHJhZycsICAgICAgKCkgPT4gdGhpcy5kcmFnKCldO1xuICAgICAgICBjb25zdCBkcmFnRW5kICAgPSBbJ2RyYWdlbmQnLCAgICgpID0+IHRoaXMuZHJhZ0VuZCgpXTtcblxuICAgICAgICB0aGlzLmJCb3guY2FsbChkMy5iZWhhdmlvci5kcmFnKCkub24oLi4uZHJhZ1N0YXJ0KS5vbiguLi5kcmFnKS5vbiguLi5kcmFnRW5kKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGRyYWdTdGFydFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeD1udWxsXVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeT1udWxsXVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgZHJhZ1N0YXJ0KHggPSBudWxsLCB5ID0gbnVsbCkge1xuXG4gICAgICAgIGNvbnN0IHNYID0gTnVtYmVyKHRoaXMuYkJveC5hdHRyKCd4JykpO1xuICAgICAgICBjb25zdCBzWSA9IE51bWJlcih0aGlzLmJCb3guYXR0cigneScpKTtcblxuICAgICAgICB0aGlzLnN0YXJ0ID0ge1xuICAgICAgICAgICAgeDogKHggIT09IG51bGwpID8geCA6IChkMy5ldmVudC5zb3VyY2VFdmVudC5vdmVycmlkZVggfHwgZDMuZXZlbnQuc291cmNlRXZlbnQucGFnZVgpIC0gc1gsXG4gICAgICAgICAgICB5OiAoeSAhPT0gbnVsbCkgPyB5IDogKGQzLmV2ZW50LnNvdXJjZUV2ZW50Lm92ZXJyaWRlWSB8fCBkMy5ldmVudC5zb3VyY2VFdmVudC5wYWdlWSkgLSBzWVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubW92ZSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiB7IHg6IHNYLCB5OiBzWSB9LFxuICAgICAgICAgICAgZW5kOiAgIHsgfVxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBkcmFnXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt4PW51bGxdXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5PW51bGxdXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFttdWx0aXBsZU9mPXRoaXNbU3ltYm9scy5NSURETEVNQU5dLm9wdGlvbnMoKS5ncmlkU2l6ZV1cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGRyYWcoeCA9IG51bGwsIHkgPSBudWxsLCBtdWx0aXBsZU9mID0gdGhpc1tTeW1ib2xzLk1JRERMRU1BTl0ub3B0aW9ucygpLmdyaWRTaXplKSB7XG5cbiAgICAgICAgdGhpc1tTeW1ib2xzLk1JRERMRU1BTl0ucHJldmVudERlc2VsZWN0KHRydWUpO1xuXG4gICAgICAgIHggPSAoeCAhPT0gbnVsbCkgPyB4IDogZDMuZXZlbnQuc291cmNlRXZlbnQucGFnZVg7XG4gICAgICAgIHkgPSAoeSAhPT0gbnVsbCkgPyB5IDogZDMuZXZlbnQuc291cmNlRXZlbnQucGFnZVk7XG5cbiAgICAgICAgY29uc3QgbVggPSAoeCAtIHRoaXMuc3RhcnQueCksXG4gICAgICAgICAgICAgIG1ZID0gKHkgLSB0aGlzLnN0YXJ0LnkpLFxuICAgICAgICAgICAgICBlWCA9IE1hdGguY2VpbChtWCAvIG11bHRpcGxlT2YpICogbXVsdGlwbGVPZixcbiAgICAgICAgICAgICAgZVkgPSBNYXRoLmNlaWwobVkgLyBtdWx0aXBsZU9mKSAqIG11bHRpcGxlT2Y7XG5cbiAgICAgICAgdGhpcy5iQm94LmRhdHVtKCkueCA9IGVYO1xuICAgICAgICB0aGlzLmJCb3guZGF0dW0oKS55ID0gZVk7XG5cbiAgICAgICAgdGhpcy5iQm94LmF0dHIoJ3gnLCBlWCk7XG4gICAgICAgIHRoaXMuYkJveC5hdHRyKCd5JywgZVkpO1xuXG4gICAgICAgIHRoaXMubW92ZS5lbmQgPSB7IHg6IGVYLCB5OiBlWSB9O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBkcmFnRW5kXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBkcmFnRW5kKCkge1xuXG4gICAgICAgIGNvbnN0IGVYICAgID0gdGhpcy5tb3ZlLmVuZC54IC0gdGhpcy5tb3ZlLnN0YXJ0Lng7XG4gICAgICAgIGNvbnN0IGVZICAgID0gdGhpcy5tb3ZlLmVuZC55IC0gdGhpcy5tb3ZlLnN0YXJ0Lnk7XG5cbiAgICAgICAgaWYgKGlzTmFOKGVYKSB8fCBpc05hTihlWSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1vdmUgZWFjaCBzaGFwZSBieSB0aGUgZGVsdGEgYmV0d2VlbiB0aGUgc3RhcnQgYW5kIGVuZCBwb2ludHMuXG4gICAgICAgIHRoaXNbU3ltYm9scy5NSURETEVNQU5dLnNlbGVjdGVkKCkuZm9yRWFjaCgoc2hhcGUpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFggPSBzaGFwZS5hdHRyKCd4Jyk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50WSA9IHNoYXBlLmF0dHIoJ3knKTtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVYICAgID0gY3VycmVudFggKyBlWDtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVZICAgID0gY3VycmVudFkgKyBlWTtcblxuICAgICAgICAgICAgc2hhcGUuYXR0cigneCcsIG1vdmVYKS5hdHRyKCd5JywgbW92ZVkpO1xuICAgICAgICAgICAgc2hhcGUuZGlkTW92ZSgpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IFN5bWJvbHMgZnJvbSAnLi9TeW1ib2xzJztcblxuLyoqXG4gKiBAbWV0aG9kIHRyeUludm9rZVxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEBwYXJhbSB7U3RyaW5nfSBmdW5jdGlvbk5hbWVcbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnNcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmNvbnN0IHRyeUludm9rZSA9IChjb250ZXh0LCBmdW5jdGlvbk5hbWUsIC4uLm9wdGlvbnMpID0+IHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZXh0W2Z1bmN0aW9uTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29udGV4dFtmdW5jdGlvbk5hbWVdKC4uLm9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbn07XG5cbi8qKlxuICogQG1ldGhvZCBjYXBpdGFsaXplXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5jb25zdCBjYXBpdGFsaXplID0gKG5hbWUpID0+IHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpO1xuXG59O1xuXG4vKipcbiAqIEBtb2R1bGUgRHJhZnRcbiAqIEBzdWJtb2R1bGUgSW52b2NhdG9yXG4gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9EcmFmdFxuICovXG5leHBvcnQgZGVmYXVsdCAoKCkgPT4ge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWV0aG9kIGRpZFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fFNoYXBlfSBzaGFwZXNcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGRpZCh0eXBlLCBzaGFwZXMpIHtcblxuICAgICAgICAgICAgc2hhcGVzID0gQXJyYXkuaXNBcnJheShzaGFwZXMpID8gc2hhcGVzIDogW3NoYXBlc107XG5cbiAgICAgICAgICAgIHJldHVybiBzaGFwZXMuZXZlcnkoKHNoYXBlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyeUludm9rZShzaGFwZSwgYGRpZCR7Y2FwaXRhbGl6ZSh0eXBlKX1gKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZXRob2QgaW5jbHVkZUV4Y2x1ZGVcbiAgICAgICAgICogQHBhcmFtIHtEcmFmdH0gZHJhZnRcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgaW5jbHVkZUV4Y2x1ZGUoZHJhZnQsIGZuLCBvcHRpb25zID0ge30pIHtcblxuICAgICAgICAgICAgY29uc3QgaW5jbHVkZSAgID0gb3B0aW9ucy5pbmNsdWRlIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IGV4Y2x1ZGUgICA9IG9wdGlvbnMuZXhjbHVkZSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBtaWRkbGVtYW4gPSBkcmFmdFtTeW1ib2xzLk1JRERMRU1BTl07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1ldGhvZCBhbGxFeGNsdWRpbmdcbiAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGV4Y2x1ZGluZ1xuICAgICAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IGFsbEV4Y2x1ZGluZyA9IChleGNsdWRpbmcpID0+IHtcblxuICAgICAgICAgICAgICAgIGV4Y2x1ZGluZyA9IEFycmF5LmlzQXJyYXkoZXhjbHVkaW5nKSA/IGV4Y2x1ZGluZyA6IFtleGNsdWRpbmddO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1pZGRsZW1hbi5hbGwoKS5maWx0ZXIoKHNoYXBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhfmV4Y2x1ZGluZy5pbmRleE9mKHNoYXBlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGluY2x1ZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCBmbi5hcHBseShkcmFmdCwgW2luY2x1ZGVdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFleGNsdWRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgZm4uYXBwbHkoZHJhZnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmbi5hcHBseShkcmFmdCwgW2FsbEV4Y2x1ZGluZyhleGNsdWRlKV0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pKCk7IiwiaW1wb3J0IFN5bWJvbHMgZnJvbSAnLi9TeW1ib2xzJztcblxuLyoqXG4gKiBAbW9kdWxlIERyYWZ0XG4gKiBAc3VibW9kdWxlIEtleUJpbmRpbmdzXG4gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9EcmFmdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlCaW5kaW5ncyB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge01pZGRsZW1hbn0gbWlkZGxlbWFuXG4gICAgICogQHJldHVybiB7S2V5QmluZGluZ3N9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWlkZGxlbWFuKSB7XG5cbiAgICAgICAgY29uc3Qga2V5TWFwICAgICAgICAgICAgPSBtaWRkbGVtYW5bU3ltYm9scy5LRVlfTUFQXTtcbiAgICAgICAgdGhpc1tTeW1ib2xzLk1JRERMRU1BTl0gPSBtaWRkbGVtYW47XG5cbiAgICAgICAgLy8gRGVmYXVsdCBrZXAgbWFwcGluZ3NcbiAgICAgICAga2V5TWFwLm11bHRpU2VsZWN0ID0gZmFsc2U7XG4gICAgICAgIGtleU1hcC5hc3BlY3RSYXRpbyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIExpc3RlbiBmb3IgY2hhbmdlcyB0byB0aGUga2V5IG1hcC5cbiAgICAgICAgdGhpcy5hdHRhY2hCaW5kaW5ncyhrZXlNYXApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBhdHRhY2hCaW5kaW5nc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXlNYXBcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGF0dGFjaEJpbmRpbmdzKGtleU1hcCkge1xuXG4gICAgICAgIC8vIFNlbGVjdCBhbGwgb2YgdGhlIGF2YWlsYWJsZSBzaGFwZXMuXG4gICAgICAgIE1vdXNldHJhcC5iaW5kKCdtb2QrYScsICgpID0+IHRoaXNbU3ltYm9scy5NSURETEVNQU5dLnNlbGVjdCgpKTtcblxuICAgICAgICAvLyBNdWx0aS1zZWxlY3Rpbmcgc2hhcGVzLlxuICAgICAgICBNb3VzZXRyYXAuYmluZCgnbW9kJywgICAoKSA9PiBrZXlNYXAubXVsdGlTZWxlY3QgPSB0cnVlLCAna2V5ZG93bicpO1xuICAgICAgICBNb3VzZXRyYXAuYmluZCgnbW9kJywgICAoKSA9PiBrZXlNYXAubXVsdGlTZWxlY3QgPSBmYWxzZSwgJ2tleXVwJyk7XG5cbiAgICAgICAgLy8gTWFpbnRhaW4gYXNwZWN0IHJhdGlvcyB3aGVuIHJlc2l6aW5nLlxuICAgICAgICBNb3VzZXRyYXAuYmluZCgnc2hpZnQnLCAoKSA9PiBrZXlNYXAuYXNwZWN0UmF0aW8gPSB0cnVlLCAna2V5ZG93bicpO1xuICAgICAgICBNb3VzZXRyYXAuYmluZCgnc2hpZnQnLCAoKSA9PiBrZXlNYXAuYXNwZWN0UmF0aW8gPSBmYWxzZSwgJ2tleXVwJyk7XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgVGhyb3cgICAgIGZyb20gJy4uL2hlbHBlcnMvVGhyb3cnO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuLi9zaGFwZXMvUmVjdGFuZ2xlJztcblxuLyoqXG4gKiBAbW9kdWxlIERyYWZ0XG4gKiBAc3VibW9kdWxlIE1hcHBlclxuICogQGF1dGhvciBBZGFtIFRpbWJlcmxha2VcbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9XaWxkaG9uZXkvRHJhZnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgKG5hbWUpID0+IHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgY29uc3QgbWFwID0ge1xuICAgICAgICByZWN0YW5nbGU6IFJlY3RhbmdsZVxuICAgIH07XG5cbiAgICByZXR1cm4gdHlwZW9mIG1hcFtuYW1lXSAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgbWFwW25hbWVdKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBuZXcgVGhyb3coYENhbm5vdCBtYXAgXCIke25hbWV9XCIgdG8gYSBzaGFwZSBvYmplY3RgKTtcblxufTsiLCJpbXBvcnQgU3ltYm9scyAgICAgZnJvbSAnLi9TeW1ib2xzJztcbmltcG9ydCBLZXlCaW5kaW5ncyBmcm9tICcuL0tleUJpbmRpbmdzJztcbmltcG9ydCBpbnZvY2F0b3IgICBmcm9tICcuL0ludm9jYXRvcic7XG5cbi8qKlxuICogQG1vZHVsZSBEcmFmdFxuICogQHN1Ym1vZHVsZSBNaWRkbGVtYW5cbiAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L0RyYWZ0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pZGRsZW1hbiB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0RyYWZ0fSBkcmFmdFxuICAgICAqIEByZXR1cm4ge01pZGRsZW1hbn1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkcmFmdCkge1xuXG4gICAgICAgIHRoaXNbU3ltYm9scy5EUkFGVF0gICAgICAgID0gZHJhZnQ7XG4gICAgICAgIHRoaXNbU3ltYm9scy5LRVlfTUFQXSAgICAgID0ge307XG4gICAgICAgIHRoaXNbU3ltYm9scy5DQU5fREVTRUxFQ1RdID0gZmFsc2U7XG5cbiAgICAgICAgbmV3IEtleUJpbmRpbmdzKHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBkM1xuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBkMygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbU3ltYm9scy5EUkFGVF1bU3ltYm9scy5TVkddO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgbGF5ZXJzXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGxheWVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbU3ltYm9scy5EUkFGVF1bU3ltYm9scy5MQVlFUlNdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tTeW1ib2xzLkRSQUZUXS5vcHRpb25zKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBrZXlNYXBcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAga2V5TWFwKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tTeW1ib2xzLktFWV9NQVBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdChvcHRpb25zKSB7XG4gICAgICAgIGludm9jYXRvci5pbmNsdWRlRXhjbHVkZSh0aGlzW1N5bWJvbHMuRFJBRlRdLCB0aGlzW1N5bWJvbHMuRFJBRlRdLnNlbGVjdCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBkZXNlbGVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBkZXNlbGVjdChvcHRpb25zKSB7XG4gICAgICAgIGludm9jYXRvci5pbmNsdWRlRXhjbHVkZSh0aGlzW1N5bWJvbHMuRFJBRlRdLCB0aGlzW1N5bWJvbHMuRFJBRlRdLmRlc2VsZWN0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGFsbFxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGFsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbU3ltYm9scy5EUkFGVF0uYWxsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZWxlY3RlZFxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIHNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tTeW1ib2xzLkRSQUZUXS5zZWxlY3RlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZnJvbUVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHJldHVybiB7U2hhcGV9XG4gICAgICovXG4gICAgZnJvbUVsZW1lbnQoZWxlbWVudCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFsbCgpLmZpbHRlcigoc2hhcGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50ID09PSBzaGFwZVtTeW1ib2xzLkVMRU1FTlRdLm5vZGUoKTtcbiAgICAgICAgfSlbMF07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHByZXZlbnREZXNlbGVjdFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3ZhbHVlPXVuZGVmaW5lZF1cbiAgICAgKi9cbiAgICBwcmV2ZW50RGVzZWxlY3QodmFsdWUpIHtcblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbU3ltYm9scy5DQU5fREVTRUxFQ1RdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpc1tTeW1ib2xzLkNBTl9ERVNFTEVDVF0gPSB2YWx1ZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgYm91bmRpbmdCb3hcbiAgICAgKiBAcmV0dXJuIHtCb3VuZGluZ0JveH1cbiAgICAgKi9cbiAgICBib3VuZGluZ0JveCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbU3ltYm9scy5EUkFGVF1bU3ltYm9scy5CT1VORElOR19CT1hdO1xuICAgIH1cblxufSIsIi8qKlxuICogQG1vZHVsZSBEcmFmdFxuICogQHN1Ym1vZHVsZSBQb2x5ZmlsbHNcbiAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L0RyYWZ0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RBc3NpZ24odGFyZ2V0KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgaWYgKG5leHRTb3VyY2UgPT09IHVuZGVmaW5lZCB8fCBuZXh0U291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0U291cmNlID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgICAgIHZhciBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpO1xuXG4gICAgICAgIGZvciAodmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBuZXh0S2V5ID0ga2V5c0FycmF5W25leHRJbmRleF07XG4gICAgICAgICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmV4dFNvdXJjZSwgbmV4dEtleSk7XG4gICAgICAgICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0bztcblxufVxuIiwiLyoqXG4gKiBAbW9kdWxlIERyYWZ0XG4gKiBAc3VibW9kdWxlIFN5bWJvbHNcbiAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L0RyYWZ0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBEUkFGVDogICAgICAgIFN5bWJvbCgnZHJhZnQnKSxcbiAgICBTVkc6ICAgICAgICAgIFN5bWJvbCgnc3ZnJyksXG4gICAgRUxFTUVOVDogICAgICBTeW1ib2woJ2VsZW1lbnQnKSxcbiAgICBJU19TRUxFQ1RFRDogIFN5bWJvbCgnaXNTZWxlY3RlZCcpLFxuICAgIEFUVFJJQlVURVM6ICAgU3ltYm9sKCdhdHRyaWJ1dGVzJyksXG4gICAgTUlERExFTUFOOiAgICBTeW1ib2woJ21pZGRsZW1hbicpLFxuICAgIFNIQVBFOiAgICAgICAgU3ltYm9sKCdzaGFwZScpLFxuICAgIFNIQVBFUzogICAgICAgU3ltYm9sKCdzaGFwZXMnKSxcbiAgICBMQVlFUlM6ICAgICAgIFN5bWJvbCgnbGF5ZXJzJyksXG4gICAgR1JPVVA6ICAgICAgICBTeW1ib2woJ2dyb3VwJyksXG4gICAgQk9VTkRJTkdfQk9YOiBTeW1ib2woJ2JvdW5kaW5nQm94JyksXG4gICAgT1BUSU9OUzogICAgICBTeW1ib2woJ29wdGlvbnMnKSxcbiAgICBBQklMSVRJRVM6ICAgIFN5bWJvbCgnYWJpbGl0aWVzJyksXG4gICAgS0VZX01BUDogICAgICBTeW1ib2woJ2tleU1hcCcpLFxuICAgIENBTl9ERVNFTEVDVDogU3ltYm9sKCdjYW5EZXNlbGVjdCcpXG59IiwiLyoqXG4gKiBAbW9kdWxlIERyYWZ0XG4gKiBAc3VibW9kdWxlIFRocm93XG4gKiBAYXV0aG9yIEFkYW0gVGltYmVybGFrZVxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL1dpbGRob25leS9EcmFmdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJvdyB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqIEByZXR1cm4ge1Rocm93fVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEcmFmdC5qczogJHttZXNzYWdlfS5gKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgU2hhcGUgZnJvbSAnLi9TaGFwZSc7XG5cbi8qKlxuICogQG1vZHVsZSBEcmFmdFxuICogQHN1Ym1vZHVsZSBSZWN0YW5nbGVcbiAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L0RyYWZ0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIFNoYXBlIHtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdGFnTmFtZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICB0YWdOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ3JlY3QnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZGVmYXVsdEF0dHJpYnV0ZXNcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZGVmYXVsdEF0dHJpYnV0ZXMoKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbGw6ICdibHVlJyxcbiAgICAgICAgICAgIGhlaWdodDogMTAwLFxuICAgICAgICAgICAgd2lkdGg6IDEwMCxcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH07XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgU3ltYm9scyAgICAgICAgZnJvbSAnLi4vaGVscGVycy9TeW1ib2xzJztcbmltcG9ydCBUaHJvdyAgICAgICAgICBmcm9tICcuLi9oZWxwZXJzL1Rocm93JztcbmltcG9ydCB7b2JqZWN0QXNzaWdufSBmcm9tICcuLi9oZWxwZXJzL1BvbHlmaWxscyc7XG5pbXBvcnQgc2V0QXR0cmlidXRlICAgZnJvbSAnLi4vaGVscGVycy9BdHRyaWJ1dGVzJztcbmltcG9ydCBpbnZvY2F0b3IgICAgICBmcm9tICcuLi9oZWxwZXJzL0ludm9jYXRvcic7XG5pbXBvcnQgU2VsZWN0YWJsZSAgICAgZnJvbSAnLi4vYWJpbGl0aWVzL1NlbGVjdGFibGUnO1xuaW1wb3J0IFJlc2l6YWJsZSAgICAgIGZyb20gJy4uL2FiaWxpdGllcy9SZXNpemFibGUnO1xuXG4vKipcbiAqIEBtb2R1bGUgRHJhZnRcbiAqIEBzdWJtb2R1bGUgU2hhcGVcbiAqIEBhdXRob3IgQWRhbSBUaW1iZXJsYWtlXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vV2lsZGhvbmV5L0RyYWZ0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbYXR0cmlidXRlcz17fV1cbiAgICAgKiBAcmV0dXJuIHtTaGFwZX1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzID0ge30pIHtcbiAgICAgICAgdGhpc1tTeW1ib2xzLkFUVFJJQlVURVNdID0gYXR0cmlidXRlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRhZ05hbWVcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gV2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgdGhlIGB0YWdOYW1lYCBtZXRob2QgaGFzbid0IGJlZW4gZGVmaW5lZCBvbiB0aGUgY2hpbGQgb2JqZWN0LlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdGFnTmFtZSgpIHtcbiAgICAgICAgbmV3IFRocm93KCdUYWcgbmFtZSBtdXN0IGJlIGRlZmluZWQgZm9yIGEgc2hhcGUgdXNpbmcgdGhlIGB0YWdOYW1lYCBtZXRob2QnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGlzU2VsZWN0ZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW1N5bWJvbHMuSVNfU0VMRUNURURdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgYXR0clxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHsqfSBbdmFsdWU9dW5kZWZpbmVkXVxuICAgICAqIEByZXR1cm4ge1NoYXBlfCp9XG4gICAgICovXG4gICAgYXR0cihuYW1lLCB2YWx1ZSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tTeW1ib2xzLkVMRU1FTlRdLmRhdHVtKClbbmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzW1N5bWJvbHMuRUxFTUVOVF0uZGF0dW0oKVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICBzZXRBdHRyaWJ1dGUodGhpc1tTeW1ib2xzLkVMRU1FTlRdLCBuYW1lLCB2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGRpZEFkZFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgZGlkQWRkKCkge1xuXG4gICAgICAgIGNvbnN0IGxheWVyICAgICAgICAgICA9IHRoaXNbU3ltYm9scy5NSURETEVNQU5dLmxheWVycygpLnNoYXBlcztcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyAgICAgID0gb2JqZWN0QXNzaWduKHRoaXMuZGVmYXVsdEF0dHJpYnV0ZXMoKSwgdGhpc1tTeW1ib2xzLkFUVFJJQlVURVNdKTtcbiAgICAgICAgdGhpc1tTeW1ib2xzLkdST1VQXSAgID0gbGF5ZXIuYXBwZW5kKCdnJyk7XG4gICAgICAgIHRoaXNbU3ltYm9scy5FTEVNRU5UXSA9IHRoaXNbU3ltYm9scy5HUk9VUF0uYXBwZW5kKHRoaXMudGFnTmFtZSgpKS5kYXR1bSh7fSk7XG5cbiAgICAgICAgLy8gQXNzaWduIGVhY2ggYXR0cmlidXRlIGZyb20gdGhlIGRlZmF1bHQgYXR0cmlidXRlcyBkZWZpbmVkIG9uIHRoZSBzaGFwZSwgYXMgd2VsbCBhcyB0aG9zZSBkZWZpbmVkXG4gICAgICAgIC8vIGJ5IHRoZSB1c2VyIHdoZW4gaW5zdGFudGlhdGluZyB0aGUgc2hhcGUuXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goKGtleSkgPT4gdGhpcy5hdHRyKGtleSwgYXR0cmlidXRlc1trZXldKSk7XG5cbiAgICAgICAgY29uc3QgYWJpbGl0aWVzICA9IHtcbiAgICAgICAgICAgIHNlbGVjdGFibGU6IG5ldyBTZWxlY3RhYmxlKCksXG4gICAgICAgICAgICByZXNpemFibGU6ICBuZXcgUmVzaXphYmxlKClcbiAgICAgICAgfTtcblxuICAgICAgICBPYmplY3Qua2V5cyhhYmlsaXRpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuXG4gICAgICAgICAgICAvLyBBZGQgdGhlIHNoYXBlIG9iamVjdCBpbnRvIGVhY2ggYWJpbGl0eSBpbnN0YW5jZSwgYW5kIGludm9rZSB0aGUgYGRpZEFkZGAgbWV0aG9kLlxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eSA9IGFiaWxpdGllc1trZXldO1xuICAgICAgICAgICAgYWJpbGl0eVtTeW1ib2xzLlNIQVBFXSA9IHRoaXM7XG4gICAgICAgICAgICBpbnZvY2F0b3IuZGlkKCdhZGQnLCBhYmlsaXR5KTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzW1N5bWJvbHMuQUJJTElUSUVTXSA9IGFiaWxpdGllcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZGlkUmVtb3ZlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBkaWRSZW1vdmUoKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZGlkTW92ZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgZGlkTW92ZSgpIHtcbiAgICAgICAgdGhpc1tTeW1ib2xzLkFCSUxJVElFU10ucmVzaXphYmxlLnJlYXR0YWNoSGFuZGxlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZGlkU2VsZWN0XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBkaWRTZWxlY3QoKSB7XG4gICAgICAgIHRoaXNbU3ltYm9scy5JU19TRUxFQ1RFRF0gPSB0cnVlO1xuICAgICAgICB0aGlzW1N5bWJvbHMuQUJJTElUSUVTXS5yZXNpemFibGUuZGlkU2VsZWN0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBkaWREZXNlbGVjdFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgZGlkRGVzZWxlY3QoKSB7XG4gICAgICAgIHRoaXNbU3ltYm9scy5JU19TRUxFQ1RFRF0gPSBmYWxzZTtcbiAgICAgICAgdGhpc1tTeW1ib2xzLkFCSUxJVElFU10ucmVzaXphYmxlLmRpZERlc2VsZWN0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBib3VuZGluZ0JveFxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBib3VuZGluZ0JveCgpIHtcblxuICAgICAgICBjb25zdCBoYXNCQm94ID0gdHlwZW9mIHRoaXNbU3ltYm9scy5HUk9VUF0ubm9kZSgpLmdldEJCb3ggPT09ICdmdW5jdGlvbic7XG5cbiAgICAgICAgcmV0dXJuIGhhc0JCb3ggPyB0aGlzW1N5bWJvbHMuR1JPVVBdLm5vZGUoKS5nZXRCQm94KCkgOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuYXR0cignaGVpZ2h0JyksXG4gICAgICAgICAgICB3aWR0aDogIHRoaXMuYXR0cignd2lkdGgnKSxcbiAgICAgICAgICAgIHg6ICAgICAgdGhpcy5hdHRyKCd4JyksXG4gICAgICAgICAgICB5OiAgICAgIHRoaXMuYXR0cigneScpXG4gICAgICAgIH07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGRlZmF1bHRBdHRyaWJ1dGVzXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGRlZmF1bHRBdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuXG59Il19
