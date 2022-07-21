# Order Book App

## Overview

A simple app built using React.js, TypeScript, and TailwindCSS to track order book changes. Order book quotes data are provided by [BTSEcom](https://btsecom.github.io/docs/futures/en/#orderbook-incremental-updates) using Websocket.

## Technologies
* [TypeScript](https://www.typescriptlang.org/)
* [React.js](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)


## Usage

**Install packages**
```bash
yarn
```
or
```bash
npm install
```

**Run in Development Mode (Site will run in localhost:3000)**
```bash
yarn start
```
or
```bash
npm start
```

## Directory Structure
Using features-based directory structure. Features-based directories separate specific features related components from generic UI components.

```
.
├── public/ React.js public dir, used for storing static assets.
└── src/
    ├── apps/ contains Redux store
    │   └── store.ts
    ├── components contains global components like layout
    ├── features/ contains every features on the app
    │   ├── quotes/
    │   │   ├── components
    │   │   ├── helpers
    │   │   ├── slices
    │   │   └── constants.ts
    │   └── trade-history/
    │       ├── components
    │       ├── slices
    │       └── constants.ts
    ├── helpers contains global helper functions
    ├── hooks contains global hooks
    ├── App.tsx
    ├── index.ts
    └── index.css
```
