const AppTemplate = `

<div class="control-section" style="margin-top: 5%">
    <div align='center'>
        <div class="row" style="display: flex;justify-content: center;">
            <div class="col-md-4">
                <ejs-textbox ref="texto" cssClass="e-outline" floatLabelType="Auto" v-model="valorTexto" placeholder="Escreva seu Texto aqui"></ejs-textbox>
            </div>
        </div>
        <div class="row" style="margin-top: 20px; display: flex;justify-content: center;">
            <div class="col-md-4">
                <ejs-button v-on:click.native="reqChamaDadosBoletim" cssClass="e-outline">Chamar Infos</ejs-button>
            </div>
        </div>
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-12">
                <ejs-grid
                    ref="grid"
                    :dataSource="dataSource"
                    :allowPaging="true"
                    :allowSorting="true"
                    :pageSettings="{ pageSizes: true, pageSize: 12 }"
                    :searchSettings="{ ignoreCase: true, ignoreAccent: true }">
                    <e-columns>
                        <e-column field="CODIGO" headerText="Sequência"></e-column>
                        <e-column field="NOME" headerText="Nomes"></e-column>
                    </e-columns>
                </ejs-grid>
            </div>
        </div>
    </div>
</div>

`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            valorTexto: null,
            dataSource: []
        }
    },
    computed: {},
    methods: {
        reqChamaDadosBoletim: function () {
            axios.post(BASE + "/cadastro/getBoletim", {"testeEnvio": this.valorTexto}).then(res => {
                if (res.data.code == 1) {
                    alert(res.data.msg);
                    alert(res.data.textoDigitado);
                    this.dataSource = res.data.dados;
                } else if (res.data.code == 0) {
                    alert(res.data.msg);
                    alert(res.data.textoDigitado);
                } else {
                    alert("Não foi possível realizar a ação.");
                }
            });
        }
    }
})
