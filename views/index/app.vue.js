const AppTemplate = `

<div class="control-section">
    <div align='center'>
        <ejs-chart
        style="display: block"
        :theme="theme"
        align="center"
        id="chartcontainer"
        :title="title"
        :primaryXAxis="primaryXAxis"
        :primaryYAxis="primaryYAxis"
        :tooltip="tooltip"
        :chartArea="chartArea"
        :width="width">
            <e-series-collection>
                <e-series
                :dataSource="seriesData"
                type="Line"
                xName="x"
                yName="y"
                name="Germany"
                width=2
                :marker="marker"
                ></e-series>
                <e-series
                :dataSource="seriesData1"
                type="Line"
                xName="x"
                yName="y"
                name="England"
                width=2
                :marker="marker"
                ></e-series>
            </e-series-collection>
        </ejs-chart> 
    </div>
</div>

`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {}
    },
    methods: {}
})