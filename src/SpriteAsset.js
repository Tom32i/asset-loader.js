/**
 * Sprite Asset
 *
 * @param {String} source
 * @param {Number} columns
 * @param {Number} rows
 * @param {Function} callback
 */
function SpriteAsset (source, columns, rows, callback)
{
    this.source   = source;
    this.columns  = columns;
    this.rows     = rows;
    this.callback = callback;
    this.length   = columns * rows;

    this.width  = 0;
    this.height = 0;
    this.images = [];
    this.assets = [];
    this.loaded = 0;
    this.total  = 0;

    this.createImages();
}

/**
 * Load
 */
SpriteAsset.prototype.load = function ()
{
    var sprite = new Asset(this.source, this.preLoaded.bind(this));

    this.source = sprite.getImage();

    sprite.load();
};

/**
 * Create images
 */
SpriteAsset.prototype.createImages = function()
{
    for (var row = 0; row < this.rows; row++) {
        for (var col = 0; col < this.columns; col++) {
            var asset = new Asset(null, this.callback);
            this.assets.push({asset: asset, row: row, col: col});
            this.images.push(asset.getImage());
        }
    }
};

/**
 * On sprite preloaded
 *
 * @param {Event} e
 */
SpriteAsset.prototype.preLoaded = function (e)
{
    this.width  = this.source.width/this.columns;
    this.height = this.source.height/this.rows;
    this.canvas = new AssetCanvas(this.width, this.height);

    var i, assetData, asset, x ,y;

    for (i = this.assets.length - 1; i >= 0; i--) {
        assetData = this.assets[i];
        asset     = assetData.asset;
        x         = assetData.col * this.width;
        y         = assetData.row * this.height;

        this.canvas.clear();
        this.canvas.drawImageFullFrom(this.source, x, y);

        asset.setSource(this.canvas.toString());
        asset.load();
    }

    delete this.canvas;
};

/**
 * Get images
 *
 * @return {Array}
 */
SpriteAsset.prototype.getImages = function ()
{
    return this.images;
};