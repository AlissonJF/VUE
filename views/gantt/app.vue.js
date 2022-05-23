const AppTemplate = `

<div class="control-section" style="margin-top: 5%">
    <div class="col-lg-12 control-section">
        <div>
            <ejs-gantt ref='gantt' id="GanttContainer" 
            :dataSource= "data"        
            :height = "height"       
            :highlightWeekends= 'true'         
            :taskFields= "taskFields"
            :treeColumnIndex= "1"
            :labelSettings= "labelSettings"
            :projectStartDate= "projectStartDate"
            :projectEndDate= "projectEndDate"
            >
            </ejs-gantt>
        </div>
    </div>
</div>

`;

Vue.component("AppVue", {
    template: AppTemplate,
    data() {
        return {
            data: projectNewData,
            height: '450px',
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks'
            },
            labelSettings: {
                leftLabel: 'TaskName'
            },
            projectStartDate: new Date('30/24/2019'),
            projectEndDate: new Date('07/06/2019')
        };
    },
    methods: {}
});