var map;
var apiKey = "AAPK30c5caef7afa4d528809ae4f4e9dc063VrP4Njl_FOdCNOGPgjDL9k8yd0A_P8VIWENPzdx7bkF5NkuCsurfGTIhoi-KmLgR";

function mapInit()
{

    loadRegularMap()

    $('#reloadMap').on('click', function () {
        loadRegularMap()
    })
}

function destroyMap()
{
    $('#reloadMap').off()
}

function loadHeatMap()
{
    require([
        "esri/WebMap",
        "esri/layers/FeatureLayer",
        "esri/views/MapView",
        "esri/widgets/Legend"
    ], (WebMap, FeatureLayer, MapView, Legend) =>
    {

        const url = "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/FatalAccidents2017/FeatureServer";

        const layer = new FeatureLayer({
            title: "Fatal car accidents (2017)",
            url
        });


        const colors = ["rgba(115, 0, 115, 0)", "#820082", "#910091", "#a000a0", "#af00af", "#c300c3", "#d700d7", "#eb00eb", "#ff00ff", "#ff58a0", "#ff896b", "#ffb935", "#ffea00"];

        layer.renderer = {
            type: "heatmap",
            colorStops: [
                { color: colors[0], ratio: 0 },
                { color: colors[1], ratio: 0.083 },
                { color: colors[2], ratio: 0.166 },
                { color: colors[3], ratio: 0.249 },
                { color: colors[4], ratio: 0.332 },
                { color: colors[5], ratio: 0.415 },
                { color: colors[6], ratio: 0.498 },
                { color: colors[7], ratio: 0.581 },
                { color: colors[8], ratio: 0.664 },
                { color: colors[9], ratio: 0.747 },
                { color: colors[10], ratio: 0.83 },
                { color: colors[11], ratio: 0.913 },
                { color: colors[12], ratio: 1 }
            ],
            radius: 18,
            maxDensity: 0.04625,
            minDensity: 0
        };


        const map = new WebMap({
            basemap: {
                portalItem: {
                    id: "466f3f43c231453c938c6776777b89e2"
                }
            },
            layers: [layer]
        });

        const view = new MapView({
            container: "viewDiv",
            center: [-117.79621, 33.91474],
            scale: 1155581,
            constraints: {
                snapToZoom: false,
                minScale: 4622324,
                maxScale: 1155500
            },
            map
        });

        view.ui.add(
            new Legend({
                view
            }),
            "top-right");

    });
}

function loadRegularMap()
{
    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer"
    ], (esriConfig, Map, MapView, Graphic, GraphicsLayer) =>
    {

        esriConfig.apiKey = apiKey;
        const map = new Map({
            basemap: "osm-standard-relief"
        });

        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-51.12284, -30.0330675],
            zoom: 19,
            constraints: {
                snapToZoom: false
            }
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        try
        {
            $('#loader').removeClass('hide-loader');

            $.get('api/dispenser/list/1', function (data)
            {
                // var iconPath = "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z";
                // var initColor = "#0095ff";

                $('#loader').addClass('hide-loader')

                if (data !== [] && data !== undefined)
                {
                    data.dispensers.forEach(element =>
                    {

                        color = element.current_capacity >= 15 ? [0, 123, 255] : [201, 46, 46];

                        const point = {
                            type: "point",
                            longitude: element.lat,
                            latitude: element.lng
                        };

                        const simpleMarkerSymbol = {
                            type: "simple-marker",
                            color: color,
                            outline: {
                                color: [255, 255, 255],
                                width: 1
                            }
                        };

                        let dispenserInfo = '';

                        dispenserInfo += '<b>Capacidade: </b>' + element.current_capacity + '%<br>'
                        dispenserInfo += '<b>Longitude: </b>' + element.lng + '<br>'
                        dispenserInfo += '<b>Latitude: </b>' + element.lat + '<br>'
                        dispenserInfo += '<b>Total utilizações: </b>' + element.uses + '<br>'
                        dispenserInfo += '<b>Total entradas: </b>' + element.entries + '<br>'
                        dispenserInfo += '<b>Total reabastecimentos: </b>' + element.recharges + '<br>'
                        dispenserInfo += '<b>Atualizado em: </b>' + moment(element.updated_at).format('LLLL') + '<br>'
                        dispenserInfo += '<b>Registrado em: </b>' + moment(element.created_at).format('LLLL') + '<br>'
                        dispenserInfo += '<b>Complemento: </b>' + element.complement + '<br>'
                        dispenserInfo += '<b>Endereço: </b>' + element.address + '</p>'

                        const attributes = {
                            name: '#' + element.token,
                            description: dispenserInfo
                        }

                        const pointGraphic = new Graphic({
                            geometry: point,
                            symbol: simpleMarkerSymbol,
                            attributes: attributes,
                            popupTemplate: {
                                title: attributes.name,
                                content: attributes.description
                            }
                        });

                        graphicsLayer.add(pointGraphic);
                    })
                }

            }).fail(function (e)
            {
                $('#loader').addClass('hide-loader')
            })
        } catch (e) { }
    });
}