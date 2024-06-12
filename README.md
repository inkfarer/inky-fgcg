# yo-mana-fgc-overlays

Broadcast graphics for FGC tournaments from [Yo Mana](https://yomana.ee/)

## Setup

- Clone this repository to `[nodecg]/bundles/yo-mana-fgc-overlays`
- Install dependencies: `npm i`
- Run build: `npm run build`

### Configuration

To configure this bundle, create the file `<nodecg>/cfg/yo-mana-fgc-overlays.json` with the following contents:

```json
{
  "startgg": {
    "apiKey": "start.gg API key"
  }
}
```

#### Other npm commands

- `build`: Create a production-ready build.
- `build:dev`: Create a development build with better debugging options.
- `build:clean`: Combines `build` and `clean` tasks.
- `clean`: Removes built files.
- `start`: Starts NodeCG.
- `watch`: Runs a build and rebuilds when changes are found.
- `schema-types`: Create or update type definitions for replicant schemas found in the `schemas` directory
