import Symbols from './Symbols.js';

/**
 * @module Draft
 * @submodule BoundingBox
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */
export default class BoundingBox {

    /**
     * @constructor
     * @param {Middleman} middleman
     * @return {BoundingBox}
     */
    constructor(middleman) {
        this[Symbols.MIDDLEMAN] = middleman;
    }

    /**
     * @method handleClick
     * @return {void}
     */
    handleClick() {

        const middleman = this[Symbols.MIDDLEMAN];
        d3.event.stopPropagation();

        if (middleman.preventDeselect()) {
            middleman.preventDeselect(false);
            return;
        }

        const mouseX = d3.event.pageX;
        const mouseY = d3.event.pageY;

        this.bBox.attr('pointer-events', 'none');
        const element = document.elementFromPoint(mouseX, mouseY);
        this.bBox.attr('pointer-events', 'all');

        if (middleman.fromElement(element)) {
            const event = new MouseEvent('click', { bubbles: true, cancelable: false });
            element.dispatchEvent(event);
        }
    }

    /**
     * @method drawBoundingBox
     * @param {Array} selected
     * @param {Object} layer
     * @return {void}
     */
    drawBoundingBox(selected, layer) {

        if (this.bBox) {
            this.bBox.remove();
        }

        if (selected.length === 0) {
            return;
        }

        const model = { minX: Number.MAX_VALUE, minY: Number.MAX_VALUE,
                        maxX: Number.MIN_VALUE, maxY: Number.MIN_VALUE };

        /**
         * Responsible for computing the collective bounding box, based on all of the bounding boxes
         * from the current selected shapes.
         *
         * @method compute
         * @param {Array} bBoxes
         * @return {void}
         */
        const compute = (bBoxes) => {
            model.minX = Math.min(...bBoxes.map((d) => d.x));
            model.minY = Math.min(...bBoxes.map((d) => d.y));
            model.maxX = Math.max(...bBoxes.map((d) => d.x + d.width));
            model.maxY = Math.max(...bBoxes.map((d) => d.y + d.height));
        };

        // Compute the collective bounding box.
        compute(selected.map((shape) => shape.boundingBox()));

        this.bBox = layer.append('rect')
                         .datum(model)
                         .classed('drag-box', true)
                         .attr('x',      ((d) => d.minX))
                         .attr('y',      ((d) => d.minY))
                         .attr('width',  ((d) => d.maxX - d.minX))
                         .attr('height', ((d) => d.maxY - d.minY))
                         .on('click', this.handleClick.bind(this));

        const dragStart = ['dragstart', () => this.dragStart()];
        const drag      = ['drag',      () => this.drag()];
        const dragEnd   = ['dragend',   () => this.dragEnd()];

        this.bBox.call(d3.behavior.drag().on(...dragStart).on(...drag).on(...dragEnd));

    }

    /**
     * @method drag
     * @return {void}
     */
    drag() {
        this[Symbols.MIDDLEMAN].preventDeselect(true);
    }

    /**
     * @method dragStart
     * @return {void}
     */
    dragStart() {

    }

    /**
     * @method dragEnd
     * @return {void}
     */
    dragEnd() {

    }

}