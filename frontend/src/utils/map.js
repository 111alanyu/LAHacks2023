import React, { useEffect, useRef } from 'react';
import * as atlas from 'azure-maps-control';



const Map = (props) => {
    const mapRef = useRef(null);

    useEffect(() => {

        // Initialize map
        const map = new atlas.Map(mapRef.current, {
            center: [-118.44, 34.07],
            zoom: 12,
            view: 'Auto',
            renderWorldCopies: false, // disable accessibility
            enableAccessibility: false,
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: 'ConDhmy9Ox3dYVygeu3nDG_8GhtX2Kaz05JrmQjHEj8', //invalid
            },
        });

        // Add zoom control


        // Wait until the map resources are ready.
        map.events.add('ready', function () {
            /*Create a data source and add it to the map*/
            var dataSource = new atlas.source.DataSource();
            map.sources.add(dataSource);
            console.log("ass")
            // console.log(props)
            for (const coord of props.props) {
                console.log("tits")
                console.log(coord)
                var point = new atlas.Shape(new atlas.data.Point(coord));
                //Add the symbol to the data source.
                dataSource.add([point]);
            }

            //Create a symbol layer using the data source and add it to the map
            map.layers.add(new atlas.layer.SymbolLayer(dataSource, null));
        });

        return () => {
            // Clean up the map control
            map.dispose();
        };
    }, []);

    return <div ref={mapRef} style={{ height: '500px', width: '40%' }}></div>;
};

export default Map;
