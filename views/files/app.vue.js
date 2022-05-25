const AppTemplate = `

<div class="control-section" style="margin-top: 5%">
    <div class="col-lg-12 control-section uploader-preload validation">
        <div class="control_wrapper">
            <ejs-uploader id='validation'
                name="UploadFiles"
                :autoUpload="autoUpload"
                :asyncSettings="path"
                ref="uploadObj"
                :allowedExtensions="extensions"
                :dropArea="dropElement"
                minFileSize=10000
                maxFileSize=4000000
                :selected="onFileSelect"
                :removing="onFileRemove"> 
            </ejs-uploader>
        </div>
    </div>
</div>

`;

Vue.component("AppVue", {
    template: AppTemplate,
    data() {
        return {
            path: {
                saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
                removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove',
            },
            dropElement: '.control-fluid',
            extensions: '.doc, .docx, .xls, .xlsx, .pdf',
            autoUpload: false
        }
    },
    methods: {
        onFileSelect: function(args) {
            args.filesData.splice(5);
            let filesData = this.$refs.uploadObj.getFilesData();
            let allFiles = filesData.concat(args.filesData);
            if (allFiles.length > 5) {
                for (let i = 0; i < allFiles.length; i++) {
                    if (allFiles.length > 5) {
                        allFiles.shift();
                    }
                }
                args.filesData = allFiles;
                args.modifiedFilesData = args.filesData;
            }
            args.isModified = true;
        },
        onFileRemove: function(args) {
            args.postRawFile = false;
        }
    }
});