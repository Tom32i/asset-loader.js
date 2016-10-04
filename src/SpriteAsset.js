import Asset from './Asset';
import AssetCanvas from './AssetCanvas';

/**
 * Sprite Asset
 */
class SpriteAsset {
    /**
     * @param {String} source
     * @param {Number} columns
     * @param {Number} rows
     * @param {Function} callback
     * @param {Boolean} load
     */
    constructor(source, columns, rows, callback, load = false) {
        this.source = source;
        this.columns = columns;
        this.rows = rows;
        this.callback = callback;
        this.length = columns * rows;
        this.width = 0;
        this.height = 0;
        this.images = [];
        this.assets = [];
        this.loaded = 0;

        this.preLoaded = this.preLoaded.bind(this);
        this.partLoaded = this.partLoaded.bind(this);

        this.createImages();

        if (load) {
            this.load();
        }
    }

    /**
     * Load
     */
    load () {
        const sprite = new Asset(this.source, this.preLoaded.bind(this));

        this.source = sprite.getImage();

        sprite.load();
    }

    /**
     * Create images
     */
    createImages() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                const asset = new Asset(null, this.partLoaded);

                this.assets.push({ asset, row, col });
                this.images.push(asset.getImage());
            }
        }
    }

    /**
     * On sprite preloaded
     *
     * @param {Event} event
     */
    preLoaded(event) {
        this.width = this.source.width / this.columns;
        this.height = this.source.height / this.rows;
        this.canvas = new AssetCanvas(this.width, this.height);

        this.assets.forEach((assetData) => {
            const { asset } = assetData;
            const x = assetData.col * this.width;
            const y = assetData.row * this.height;

            this.canvas.clear();
            this.canvas.drawImageFromSource(this.source, x, y);

            asset.setSource(this.canvas.toString());
            asset.load();
        });

        delete this.canvas;
    }

    /**
     * On a sub image is loaded
     *
     * @param {Event} event
     */
    partLoaded(event) {
        this.loaded++;

        if (this.loaded === this.images.length) {
            this.callback.call();
        }
    }

    /**
     * Get images
     *
     * @return {Array}
     */
    getImages() {
        return this.images;
    }
}

export default SpriteAsset;
