const AppTemplate = `

<div class="control-section" style="margin-top: 5%">
    <div id="inline-control">
        <div class="row">
            <div id="preview" style="margin: 0 25%;">
                <img src="public/images/pen.74b986f7.png">
            </div>
        </div>
        <div id="inline-content" style="margin: 20px 25%" class="row">
            <div class="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                <h4>Inline Palette</h4>
                <ejs-colorpicker id="inline-color-palette" mode="Palette" :modeSwitcher="false" :inline="true" :showButtons="false" :change="onChange"></ejs-colorpicker>
            </div>
            <div class="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                <h4>Inline Picker</h4>
                <ejs-colorpicker id="inline-color-picker" mode="Picker" :modeSwitcher="false"  :inline="true" :showButtons="false" :change="onChange"></ejs-colorpicker>
            </div>
        </div>
    </div>
</div>

`;

Vue.component("AppVue", {
    template: AppTemplate,
    data() {
        return {}
    },
    methods: {
        onChange: function(args) {
            document.getElementById("preview").style.backgroundColor =
                args.currentValue.hex;
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            if (window.browserDetails.isDevice) {
                document.getElementById("inline-control").classList.add("e-mobile-control");
            }
        });
    }
});