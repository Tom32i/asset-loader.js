/**
 * Asset
 *
 * @param {string} source
 * @param {Function} callback
 */
function Asset(source, callback)
{
    this.element = new Image();
    this.source  = source;

    this.element.asset = this;
    this.element.addEventListener('load', callback);
}

/**
 * Set source
 *
 * @param {string} source
 */
Asset.prototype.setSource = function (source)
{
    this.source = source;
};

/**
 * Load
 */
Asset.prototype.load = function ()
{
    this.element.src = this.source;
};

/**
 * Get image
 *
 * @return {Image}
 */
Asset.prototype.getImage = function ()
{
    return this.element;
};

/**
 * Get image width
 *
 * @return {Number}
 */
Asset.prototype.getWidth = function ()
{
    return this.element.width;
};

/**
 * Get image height
 *
 * @return {Number}
 */
Asset.prototype.getHeight = function ()
{
    return this.element.height;
};