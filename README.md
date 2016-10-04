tom32i-asset-loader.js
======================

Image, sprite, sound loader for HTML5 games.

## Install:

    npm install --save tom32i-asset-loader.js

### Import

HTML:

```html
<script src="tom32i-asset-loader.js"></script>
```

ES6:

```javascript
import AssetLoader from 'tom32i-asset-loader.js';
```

Node:

```javascript
const AssetLoader = require('tom32i-asset-loader.js');
```


## Usage:

### Asset

_To load a single image_

Arguments:

* source: (String) The url of the image
* callback: (Function) Callback called when the image is loaded
* load: (Boolean) Start loading imediately? (default false)

Example:

```javascript
const { Asset } = AssetLoader;
const image = new Asset('jeff.jpg', (event) => {
    document.appendChild(image.getImage());
});
```

### SpriteAsset

_To load an image an split it into several images according to a grid_

Arguments:

* source: (String) The url of the image
* callback: (Function) Callback called when the image is loaded and splited
* columns: number of columns in the grid
* rows: number of rows in the grid
* load: (Boolean) Start load imediately?

```javascript
const { SpriteAsset } = AssetLoader;
const sprite = new SpriteAsset('jeff.jpg', 3, 2, (event) => {
    sprite.getImages().forEach((image) => document.appendChild(image));
});
```

# Contribute

Clone the repository:

    git clone git@github.com:Tom32i/asset-loader.js.git

Install dev dependencies:

    npm install

Build dist:

    npm run build
