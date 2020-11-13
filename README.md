# jamviewer
Custom slideviewer for running jams written using [Solid](https://github.com/ryansolid/solid).

## Usage

1. Place visual assets in `dist`
2. Modify `src/user/slides.tsx` to match what will be streamed; the file that was used in Autum jam III is included as an example.
3. Export compo data from Wuhu into `src/user/data.json`, although only a subset of fields are actually required. See `src/compo.tsx` for what is required.
4. Modify `dist/index.css` to style visuals; the styling used for Autumn Jam III is included as an example.
   * Base all measurements off of `em`s so that they scale with the size of the screen!
5. Run the viewer
   * Option 1: Run `pnpm start` for webpack live-reloading; only useful for development!
   * Option 2: Run `pnpm build`, then open `dist/index.html` in any browser.

### Controls:
* Page Up/Down: Navigate between compos and intermissions
* Left/Right Arrow: Navigate between entries
