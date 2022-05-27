const AppTemplate = `

<div class="control-section" style="margin: 5% 30%">
    <div class="control-section toast-type-section">
        <div class="e-sample-resize-container">
            <ejs-toast ref='toastRef' id='toast_type' :position='position' :created='created' :close='onclose' :beforeOpen='onbeforeOpen'>
            </ejs-toast>
        </div>
        <div id="toast_types">
            <div>
                <ejs-button
                    ref='infoRef'
                    class="e-btn e-control e-info"
                    id="info_Toast"
                    v-on:click.native="infoClick"> Mensagem de Informações </ejs-button>
                <ejs-button
                    ref='successRef'
                    class="e-btn e-control e-success"
                    id="success_Toast"
                    v-on:click.native='successClick'> Mensagem de Sucesso </ejs-button>
                <ejs-button
                    ref='warningRef'
                    class="e-btn e-control e-warning"
                    id="warning_Toast"
                    v-on:click.native="warningClick"> Mensagem de Cuidado </ejs-button>
                <ejs-button
                    ref='errorRef'
                    class="e-btn e-control e-danger"
                    id="error_Toast"
                    v-on:click.native="errorClick"> Mensagem de Perigo </ejs-button>
            </div>
            <div style="margin: 30px 22%;">
                <ejs-button
                    ref='hideButtonRef'
                    v-if="ShowBtn"
                    class="e-btn e-control"
                    id="hideToast"
                    v-on:click.native="hideClick"> Apagar Todos </ejs-button>
            </div>
        </div>
    </div>
</div>

`;

Vue.component("AppVue", {
    template: AppTemplate,
    data() {
        return {
            position: { X: 'Right' },
            ShowBtn: false
        }
    },
    mounted: function() {
        this.toasts = [{
                title: 'Cuidado!',
                content: 'Houve um problema com sua conexão de rede.',
                cssClass: 'e-toast-warning',
                icon: 'e-warning toast-icons'
            },
            {
                title: 'Sucesso!',
                content: 'Sua mensagem foi enviada com sucesso.',
                cssClass: 'e-toast-success',
                icon: 'e-success toast-icons'
            },
            {
                title: 'Erro!',
                content: 'Um problema ocorreu durante o envio de seus dados.',
                cssClass: 'e-toast-danger',
                icon: 'e-error toast-icons'
            },
            {
                title: 'Informação!',
                content: 'Por favor, leia os comentários com atenção.',
                cssClass: 'e-toast-info',
                icon: 'e-info toast-icons'
            }
        ];
        setTimeout(() => {
            this.$refs.toastRef.show(this.toasts[3]);
        }, 200);
    },
    methods: {
        hideClick: function(args) {
            this.$refs.toastRef.hide('All');
        },
        infoClick: function(args) {
            this.$refs.toastRef.show(this.toasts[3]);
        },
        warningClick: function(args) {
            this.$refs.toastRef.show(this.toasts[0]);
        },
        successClick: function(args) {
            this.$refs.toastRef.show(this.toasts[1]);
        },
        errorClick: function(args) {
            this.$refs.toastRef.show(this.toasts[2]);
        },
        created: function(args) {
            document.addEventListener('click', function() {
                if (!isNullOrUndefined(this.$refs.toastRef) &&
                    !isNullOrUndefined(this.$refs.successRef) &&
                    !isNullOrUndefined(this.$refs.errorRef) &&
                    !isNullOrUndefined(this.$refs.infoRef) &&
                    !isNullOrUndefined(this.$refs.warningRef) &&
                    event.target !== this.$refs.infoRef.$el &&
                    event.target !== this.$refs.warningRef.$el &&
                    event.target !== this.$refs.successRef.$el &&
                    event.target !== this.$refs.errorRef.$el) {
                    this.$refs.toastRef.hide('All');
                }
            }.bind(this));
        },
        onclose: function(e) {
            if (this.$refs.toastRef.$el.childElementCount === 0) {
                this.ShowBtn = false;
            }
        },
        onbeforeOpen: function(e) {
            this.ShowBtn = true;
        }
    }
});