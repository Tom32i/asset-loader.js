/**
 * Asset
 */
class Asset {
    /**
     * @param {string} source Source asset URL
     * @param {Function} callback Success callback
     * @param {Boolean} load Start loading on construction (default false)
     */
    constructor(source, callback, load = false) {
        this.source = source;
        this.element = new Image();

        this.element.asset = this;
        this.element.addEventListener('load', callback);

        if (load) {
            this.load();
        }
    }

    /**
     * Set source
     *
     * @param {String} source
     */
    setSource(source) {
        this.source = source;
    }

    /**
     * Load
     */
    load() {
        this.element.src = this.source;
    }

    /**
     * Get image
     *
     * @return {Image}
     */
    getImage() {
        return this.element;
    }

    /**
     * Get image width
     *
     * @return {Number}
     */
    getWidth() {
        return this.element.width;
    }

    /**
     * Get image height
     *
     * @return {Number}
     */
    getHeight() {
        return this.element.height;
    }
}

export default Asset;
