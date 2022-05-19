const AppTemplate = `

<div class="control-section">
    <div>
        <ejs-stockchart
            style="display: block"
            id="stockchartContainerDefault"
            :primaryXAxis="primaryXAxis"
            :primaryYAxis="primaryYAxis"
            chartArea="chartArea"
            :tooltip="tooltip"
            :crosshair="crosshair"
            :tooltipRender="tooltipRender"
            :title="title"
            :border="border"
            :enablePeroiSelector="enablePeroiSelector"
            :theme="theme"
            >
            <e-stockchart-series-collection>
                <e-stockchart-series  :dataSource="seriesData" type="Candle"  volume='volume' xName='x' low='low' high='high' open='open' close='close'></e-stockchart-series>
            </e-stockchart-series-collection>
        </ejs-stockchart>
    </div>
</div>

`;

Vue.component('AppVue', {
    template: AppTemplate, data: function () {
        return {}
    }, methods: {}
})