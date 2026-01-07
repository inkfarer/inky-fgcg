# User's guide

_Now that I've [installed all this](/docs/installation.md), what can I do here?_

## Preparing for an event

1. Find the folder NodeCG was installed in, and enter the `cfg` folder.
2. Open the `inky-fgcg.json` file, it'll look similar to this:
    ```json
    {
      "startgg": {
        "apiKey": "your start.gg api key"
      },
      "event": {
        "timezone": "Europe/Tallinn",
        "location": ["Riga, Latvia"],
        "greeting": "Hello from UniCon!"
      }
    }
    ```
3. Modify the event time zone, location and greeting message, if needed. The start.gg API key can be changed from here if it has expired or needs changed for any other reason.
4. Start NodeCG and head to the Setup workspace from the top left corner of the dashboard:  
   <img src="/docs/img/setup-workspace.webp" alt="Two workspaces are present in the NodeCG dashboard - &quot;Main&quot; and &quot;Setup&quot;." width="300">  
5. Use the Entrant Import panel to load in data about the players that have entered the event:  
   ![Enter the tournament's slug (included in its start.gg bracket URL) to import entrant info. The panel may ask for the specific event to import entrants for.](/docs/img/entrant-import.webp)
6. Use the Settings panel to pick the game being played:  
   <img src="/docs/img/settings.webp" alt="Options are available to pick between several fighting games." width="300">  
   The active game is shown on the intermission graphic, and may change the appearance of the in-game scoreboard graphic.
7. From the top right corner of the NodeCG dashboard, enter the "Assets" tab. From here, sponsor logos may be added, which will be shown on certain graphics.

## Intermissions

The "intermission" graphic is used for long pauses between matches. It can display a short message:

![Use the Intermission dashboard panel to change the message displayed on the intermission graphic.](/docs/img/intermission.webp)

The "bottom bar" graphic is used during on-camera segments, while gameplay isn't being shown. It has a few different modes of operation:

![The graphic may be set to display the current score, the next players or a short message.](/docs/img/bottom-bar-mode.webp)

## Starting a match

A match may be imported from a start.gg stream queue, or the players can be entered manually:

![Use the Next Match dashboard panel to input the next matchup, and the Active Match panel to start the match.](/docs/img/next-match.webp)

## The in-game scoreboard

The in-game scoreboard may be changed from the Active Match panel:

![The Active Match panel and two different modes of operation for the gameplay graphic.](/docs/img/active-match.webp)

## Brackets

Event brackets may be imported from start.gg:

![Use the Brackets dashboard panel to select a bracket to show on the stream.](/docs/img/bracket-import.webp)

## Controlling graphics using a Stream Deck

These graphics may be partially controlled with a Stream Deck by running [Bitfocus Companion](https://bitfocus.io/companion) with [companion-module-inky-fgcg](https://github.com/inkfarer/companion-module-inky-fgcg)
