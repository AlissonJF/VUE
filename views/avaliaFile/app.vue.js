const AppTemplate = `
<div class="col-md-12 control-section card-control-section basic_card_layout">
    <div class="e-card-resize-container" style="margin-top: 60px">
        <div class="row">
            <div class="col-md-12 card-layout" style="padding: 0 !important;">
                <div tabindex="0" class="e-card" id="basic_card">
                    <div class="e-card-content">
                        <div class="row" style="margin-bottom: 15px;">
                            <div class="col-md-12 text-center">
                                <h2>Avaliação de Duplicidade de Arquivos</h2>
                            </div>
                        </div>
                        <div class="row" style="margin-bottom: 15px; justify-content: center;">
                            <div class="col-md-6">
                                <ejs-textbox
                                    ref="campo1"
                                    floatLabelType="Auto"
                                    cssClass="e-outline"
                                    placeholder="Arquivo para ser Avaliado"
                                    v-model="campo1">
                                </ejs-textbox>
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="col-md-12">
                                <ejs-button ref="envia" v-on:click.native="enviar">Enviar</ejs-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

Vue.component("AppVue", {
    template: AppTemplate,
    data() {
        return { //variáveis do model
            campo1: null
        }
    },
    methods: {
        enviar: function () {
            axios.post(BASE + "/avaliaFile/avaliaFile",{"file": this.campo1}).then(res => {
                if (res.data.code == 1) {
                    alert(res.data);
                } else {
                    alert(res.data);
                }
            });
        }
    },
    mounted: function () {},
    watch: {},
});
