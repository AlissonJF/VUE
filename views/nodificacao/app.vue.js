const AppTemplate = `

<div class="control-section" style="margin-left: 25%">
    <div class="control-section toast-type-section">
        <div class="e-sample-resize-container">
            <ejs-toast ref='toastRef' id='toast_type' :position='position' :created='created' :close='onclose' :beforeOpen='onbeforeOpen'>
            </ejs-toast>
        </div>
        <div id="toast_types">
            <div>
                <ejs-button ref='infoRef' class="e-btn e-control e-info" id="info_Toast" v-on:click.native="infoClick"> Info Message </ejs-button>
                <ejs-button ref='successRef' class="e-btn e-control e-success" id="success_Toast" v-on:click.native='successClick'> Success Message </ejs-button>
                <ejs-button ref='warningRef' class="e-btn e-control e-warning" id="warning_Toast" v-on:click.native="warningClick"> Warning Message </ejs-button>
                <ejs-button ref='errorRef' class="e-btn e-control e-danger" id="error_Toast" v-on:click.native="errorClick">Danger Message</ejs-button>
            </div>
            <div style="padding-top: 15px; margin-left: 24%;">
                <ejs-button ref='hideButtonRef' v-if="ShowBtn" class="e-btn e-control" id="hideToast" v-on:click.native="hideClick"> Hide All </ejs-button>
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
        this.toasts = [
            { title: 'Warning!', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
            { title: 'Success!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
            { title: 'Error!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
            { title: 'Information!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }
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
                if (!isNullOrUndefined(this.$refs.toastRef) && !isNullOrUndefined(this.$refs.successRef) && !isNullOrUndefined(this.$refs.errorRef) && !isNullOrUndefined(this.$refs.infoRef) && !isNullOrUndefined(this.$refs.warningRef) && event.target !== this.$refs.infoRef.$el && event.target !== this.$refs.warningRef.$el && event.target !== this.$refs.successRef.$el && event.target !== this.$refs.errorRef.$el) {
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