# inky-fgcg

inky's Fighting Game Character Generator - broadcast graphics for FGC events. The `main` branch of this repository 
contains graphics branded for events from [Yo Mana](https://yomana.ee/).

## Setup

- Clone this repository to `[nodecg]/bundles/inky-fgcg`
- Install dependencies: `npm i`
- Run build: `npm run build`

### Configuration

To configure this bundle, create the file `<nodecg>/cfg/inky-fgcg.json` with the following contents:

```json
{
  "event": {
    "timezone": "Europe/Tallinn",
    "location": ["Tallinn, Estonia"]
  },
  "startgg": {
    "apiKey": "start.gg API key"
  }
}
```

Find a list of time zones [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List).

#### Other npm commands

- `build`: Create a production-ready build.
- `build:dev`: Create a development build with better debugging options.
- `build:clean`: Combines `build` and `clean` tasks.
- `clean`: Removes built files.
- `start`: Starts NodeCG.
- `watch`: Runs a build and rebuilds when changes are found.
- `schema-types`: Create or update type definitions for replicant schemas found in the `schemas` directory
