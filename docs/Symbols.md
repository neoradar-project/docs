# Symbols

NeoRadar makes extensive use of symbols, which are just images bundled into a sprite. This is a very efficient way to render many sub-types of symbols, and gives you unlimited flexibility in what to display.

The spritesheet is placed in the images folder of your package, with a file named symbols.png. You also need to provide the spritesheet metadata in an adjacent file named symbols.json. The format for the spritesheet metadata is that required by [Pixi.js](https://pixijs.com/).

Symbols are used for the map background, as well well as for the targets and history trails. Symbols are rendered using 1-1 size, meaning if your symbol is 32px*32px, it will render as such.

## Generating your sprite sheet

To generate your spritesheet, you can use the following free online tool: https://free-tex-packer.com/app/

To begin, dump all your PNG files in the tool, you can even dump an entire folder with subfolders, and the tool with automatically prefix the sprite name with the folder that it is in.

You must use the following settings to ensure proper functioning:

- **Tinify** to Off
- **Format** to pixi.js
- **Fixed size** to off
- **Power of two** to off
- **Allow rotation** to off
- **Allow trim** to off
- **Detect identical** to off
- **Width & Height** to a size that is at least equal to the sum of the size of all your symbols

**Ensure the background of each of your sprite is transparent!**

## Example

See below an example of a sprite sheet:

![Example of a sprite sheet with various radar symbols](/symbols_example.png "NeoRadar sprite sheet example")