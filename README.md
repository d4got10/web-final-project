# Steam Investment Tracker

Steam Investment Tracker is an attempt to build a website for tracking your investments in steam marketplace items. Currently, it allows you to

- Register your account
- Authorize using login and password
- Create new investments
- Track your investment's profits
- Delete investments

The next step is implementing search and sort.

This app is a Single Page Application (SPA). Under the hood it uses Express.js, React and MongoDB. You could check working app [here](http://139.59.124.184/).

# Running in your environment

## Prerequisites

To run Steam Investments Tracker you have to install **_Node.js_** (tested on v16.13.x) and **_NPM_** (tested on v8.1.x). See https://nodejs.org/en/download.

Also, app uses **_MongoDB_** so make sure you have created it too (see https://www.mongodb.com/).

## Installation

1. Clone repo:

```text
git clone https://github.com/d4got10/web-final-project.git
```

2. Install node packages for server and client, i.e.

```bash
npm install
npm run client:install
```

3. Build client's React app, i.e.

```bash
npm run client:build
```

Here you are able to run a dev server.

4. Configure the config file in the `SERVER_NAME` value in the **_config_** folder, i.e.

```bash
cd config
nano production.json
```
```text
port: "your_port"
mongoUri: "your_mongodb_connection_string"
baseUrl: "your_servers_url"
```

5. Start web server by running a command in root folder

```bash
cd ..
npm run start
```