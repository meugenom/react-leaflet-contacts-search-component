## Small project for visualistaion peoples on the map

this project base on:
- [Create React App](https://github.com/facebook/create-react-app)
- [Leaflet map's library](https://leafletjs.com)
- [leaflet-boundary-canvas plugin](https://github.com/aparshin/leaflet-boundary-canvas)
- [leaflet.markercluster plugin](https://github.com/Leaflet/Leaflet.markercluster)

## How can use
1. Runs the app in the development mode.
    in the terminal - `yarn start`
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

    The page will reload if you make edits.\
    You will also see any lint errors in the console.

2.  Builds the app for production to the `build` folder and build is minified and the filenames 
    include the     hashes.\

    in the terminal  - `yarn build`

## How copy it in your project
1. Add to the ./public/index.html
`
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"/>
    
`
2.  in the terminal install npm packages
    `yarn add json-loader leaflet leaflet-boundary-canvas leaflet.markercluster props-types react-scripts react-dom`   

3. in to package.json add `"homepage": "./",`
it's very important to making bundle files with right paths

4. copy files from src/data, src/img and components ContactMap, SearchControl, Services, Utils

5. in your's App.js hljs-addition
`import ContactMap from '../ContactMap/Contactmap';`
and
`
     render() {
        return (
            <div>
                <ContactMap/>
            </div>
    );
  }
`
6. your's index.js has 
`ReactDOM.render(
    <App />,
  document.getElementById('root')
);
`
7. app.css has 
`
.leaflet-container {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(0deg,#fff1eb 0,#ace0f9);
}
`

8. How to use the call(GET) to download you data please open ./src/components/Services/Config.js
and read instructions.


