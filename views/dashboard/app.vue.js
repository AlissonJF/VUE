const AppTemplate = `

<div class="control-section">
    <div>
        <div class="control-section dashboard-default">
            <div style="padding:5px;text-align: right;">
                <ejs-button id="add" class="e-btn e-info"  v-on:click.native="addPanel"> Adicionar mais Paineis </ejs-button>
            </div>
                <ejs-dashboardlayout ref="DashbordInstance" :columns="5" id='defaultLayout' :allowResizing="true" :cellSpacing="spacing">
                    <div id="one" class="e-panel" data-row="0" data-col="0" data-sizeX="1" data-sizeY="1">
                        <span id="close" class="e-template-icon e-clear-icon"></span>
                        <div class="e-panel-container">              
                            <div class="text-align">
                                <div>0</div>
                            </div>
                        </div>
                    </div>
                    <div id="two" class="e-panel" data-row="1" data-col="0" data-sizeX="1" data-sizeY="2">
                        <span id="close" class="e-template-icon e-clear-icon"></span>
                        <div class="e-panel-container">
                            <div class="text-align">
                            <div>1</div>
                            </div>
                        </div>
                    </div>
                    <div id="three" class="e-panel" data-row="0" data-col="1" data-sizeX="2" data-sizeY="2">
                        <span id="close" class="e-template-icon e-clear-icon"></span>
                        <div class="e-panel-container">
                            <div class="text-align">
                            <div>2</div>
                            </div>
                        </div>
                    </div>
                    <div id="four" class="e-panel" data-row="2" data-col="1" data-sizeX="1" data-sizeY="1">
                        <span id="close" class="e-template-icon e-clear-icon"></span>
                        <div class="e-panel-container">
                            <div class="text-align">
                            <div>3</div>
                            </div>
                        </div>
                    </div>
                    <div id="five" class="e-panel" data-row="2" data-col="2" data-sizeX="2" data-sizeY="1">
                        <span id="close" class="e-template-icon e-clear-icon"></span>
                        <div class="e-panel-container">
                            <div class="text-align">
                            <div>4</div>
                            </div>
                        </div>
                    </div>
                    <div id="six" class="e-panel" data-row="0" data-col="3" data-sizeX="1" data-sizeY="1">
                        <span id="close" class="e-template-icon e-clear-icon"></span>
                        <div class="e-panel-container">
                            <div class="text-align">
                            <div>5</div>
                            </div>
                        </div>
                    </div>
                    <div id="seven" class="e-panel" data-row="1" data-col="3" data-sizeX="1" data-sizeY="1">
                        <span id="close" class="e-template-icon e-clear-icon"></span>
                        <div class="e-panel-container">
                            <div class="text-align">
                                <div>6</div>
                            </div>
                        </div>
                    </div>
                    <div id="eight" class="e-panel" data-row="0" data-col="4" data-sizeX="1" data-sizeY="3">
                        <span id="close" class="e-template-icon e-clear-icon"></span>
                        <div class="e-panel-container">
                            <div class="text-align">
                            <div>7</div>
                            </div>
                        </div>
                    </div>
                </ejs-dashboardlayout>   
            <div id="content"></div>
        </div>
    </div>
</div>

`;

Vue.component("AppVue", {
    template: AppTemplate,
    data() {
        return {
            count: 8,
            spacing: [10, 10]
        };
    },
    methods: {
        addPanel: function(args) {
            var panel = [{
                'id': this.count.toString() + '_layout',
                'sizeX': 1,
                "row": 0,
                'col': 0,
                content: '<span id="close" class="e-template-icon e-clear-icon"></span><div class="text-align">' + this.count.toString() + '</div>'
            }];
            this.$refs.DashbordInstance.addPanel(panel[0]);
            var closeIcon = document.getElementById(this.count.toString() + '_layout').querySelector('.e-clear-icon');
            closeIcon.addEventListener('click', this.onCloseIconHandler);
            this.count = this.count + 1;
        },
        onCloseIconHandler: function(event) {
            if (event.target.offsetParent) {
                this.$refs.DashbordInstance.removePanel(event.target.offsetParent.id);
            }
        }
    },
    mounted() {
        var closeElement = document.querySelectorAll('.e-clear-icon');
        for (var i = 0; i < closeElement.length; i++) {
            closeElement[i].addEventListener('click', this.onCloseIconHandler);
        }
    }
});