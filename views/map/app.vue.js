const AppTemplate = `

<div class="control-section" style="margin-top: 5%">
    <div>
        <ejs-maps id='container' :titleSettings='titleSettings' :zoomSettings='zoomSettings' :annotations='annotations'>
            <e-layers>
                <e-layer layerType='OSM'></e-layer>
                <e-layer type='Sublayer' :animationDuration='animationDuration' :shapeData='shapeData' :shapeSettings='shapeSettings'></e-layer>
            </e-layers>
        </ejs-maps>
    </div> 
</div>

`;

Vue.component("AppVue", {
    template: AppTemplate,
    data() {
        return {
            titleSettings: {
                text: 'Location of Africa continetn in the World map',
                textStyle: {
                    size: '16px',
                    fontFamily: 'Segoe UI'
                }
            },
            zoomSettings: {
                enable: true
            },
            annotations: [{
                content: '<div style="height:18px;width:170px;background:white;text-align:center">' +
                    '<a href="https://www.openstreetmap.org/copyright"  target = "_blank" > © OpenStreetMap contributors </a></div > ',
                verticalAlignment: 'Far',
                zIndex: '1',
                x: '-40',
                y: '-20',
                horizontalAlignment: 'Far'
            }],
            animationDuration: 0,
            shapeSettings: {
                fill: '#5100A3',
                opacity: 0.4
            }
        }
    },
    methods: {}
});