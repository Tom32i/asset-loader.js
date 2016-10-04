/**
 * Sound asset
 */
class SoundAsset {
    /**
     * Formats / Mime-Types
     *
     * @type {Object}
     */
    static formats = {
        'mp3': 'audio/mpeg',
        'ogg': 'audio/ogg'
    }

    /**
     * @param {String} source
     * @param {Function} callback
     * @param {Boolean} load
     * @param {Object} formats
     */
    constructor(source, callback, load = false, formats = SoundAsset.formats) {
        this.source = source;
        this.formats = formats;
        this.element = new Audio();

        this.element.asset = this;
        this.element.addEventListener('canplaythrough', callback);

        this.attachSources();

        if (load) {
            this.load();
        }
    }

    /**
     * Attach sources
     */
    attachSources() {
        for (var format in this.formats) {
            var source = document.createElement('source');
            source.type = this.formats[format];
            this.element.appendChild(source);
        }
    }

    /**
     * Load
     */
    load () {
        document.body.appendChild(this.element);

        this.formats.forEach((format, index) => {
            this.element.childNodes[index].src = this.source + '.' + format;
        });
    }

    /**
     * Get the audio element
     *
     * @return {Element}
     */
    getAudio() {
        return this.element;
    }
}

export default SoundAsset;
