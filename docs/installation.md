# Installing inky-fgcg

1. Install [Node.js](https://nodejs.org/en/) (Using version 22 is recommended as of writing)
2. Install [Git](https://git-scm.com/)
3. Install [nodecg-cli](https://github.com/nodecg/nodecg-cli): `npm install --global nodecg@latest`
4. In a command line, create a folder for NodeCG and install it:
    ```
    mkdir nodecg
    cd nodecg
    nodecg setup
    ```
5. Download the graphics code, and build it:
    ```
    cd bundles
    git clone https://github.com/inkfarer/inky-fgcg.git
    npm install
    npm run build
    ```
6. Create the configuration file. In the folder NodeCG was installed in, create a new folder named `cfg` and inside it a file named `inky-fgcg.json`. The file should include the following info:
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
    Find a list of time zones [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) (Use the "TZ identifier" column of the table.) The time zone is used to display the local time for the event.
    The `location` property is displayed on-screen along with the local time.
    The `greeting` property is displayed during intermissions alongside a link to view the event on start.gg.
    Create an API key for start.gg by clicking on your profile photo in the bottom left corner of start.gg, selecting "Developer Settings", then "Create new token" under "Personal Access Tokens".
7. Start NodeCG by opening a command line in the folder NodeCG was installed in and running `nodecg start`.
8. Access the dashboard by opening `http://localhost:9090` in a web browser.
9. Find the "Graphics" tab along the top of the screen. The displayed graphics may be added as browser sources in your preferred streaming software, using a resolution of 1920x1080.

Find more about using the graphics in the [user's guide](/docs/users-guide.md)
