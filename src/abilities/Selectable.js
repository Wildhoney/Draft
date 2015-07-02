import Ability from './Ability';
import Symbols from './../helpers/Symbols';

/**
 * @module Draft
 * @submodule Selectable
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Draft
 */
export default class Selectable extends Ability {

    /**
     * @method didAdd
     * @return {void}
     */
    didAdd() {

        const element = this.shape()[Symbols.ELEMENT];
        element.on('click', this.handleClick.bind(this));

    }

    /**
     * @method handleClick
     * @return {void}
     */
    handleClick() {

        const keyMap = this.middleman()[Symbols.KEY_MAP];

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

}