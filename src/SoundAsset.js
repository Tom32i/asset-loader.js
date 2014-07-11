/**
 * Sound asset
 *
 * @param {String} source
 * @param {Function} callback
 */
function SoundAsset(source, callback, formats)
{
    this.source  = source;
    this.element = new Audio();
    this.formats = typeof(formats) != 'undefined' ? formats : this.formats;

    this.element.asset = this;
    this.element.addEventListener('canplaythrough', callback);

    this.attachSources();
}

/**
 * Formats
 *
 * @type {Object}
 */
SoundAsset.prototype.formats = {
    'mp3': 'audio/mpeg',
    'ogg': 'audio/ogg'
};

/**
 * Attach sources
 */
SoundAsset.prototype.attachSources = function()
{
    for (var format in this.formats) {
        var source = document.createElement('source');
        source.type = this.formats[format];
        this.element.appendChild(source);
    }
};

/**
 * Load
 */
SoundAsset.prototype.load = function ()
{
    document.body.appendChild(this.element);

    var i = 0;

    for (var format in this.formats) {
        this.element.childNodes[i].src = this.source + '.' + format;
        i++;
    }
};

/**
 * Get the audio element
 *
 * @return {Element}
 */
SoundAsset.prototype.getAudio = function ()
{
    return this.element;
};