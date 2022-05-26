const AppTemplate = `

<div class="col-lg-12 control-section card-control-section flip_card_layout" style="margin-top: 5%;">
    <div class="e-card-resize-container">
        <div class="row">
            <div class="row card-layout">
                <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <!-- Flip Card Layout  -->
                    <div tabindex="0" class="e-card e-business e-flip" id="card_flip" title="Clicar para virar">
                        <div class="e-card-header e-front">
                            <div class="e-card-header-caption">
                                <div class="e-card-header-title">Iphone 13 Pro</div>
                                <div class="e-card-sub-title">Marketing Representative</div>
                            </div>
                        </div>
                        <div class="e-card-actions e-front">
                            <button class="e-card-btn">
                                <div class="e-email e-card-btn-txt"> 64 </div>
                            </button>
                            <button class="e-card-btn">
                                <div class="e-email e-card-btn-txt"> 128 </div>
                            </button>
                            <button class="e-card-btn">
                                <div class="e-email e-card-btn-txt"> 256 </div>
                            </button>
                        </div>
                        <div class="e-card-header e-back">
                            <div class="e-card-header-caption">
                                <div class="e-card-header-title">Address</div>
                                <div class="e-card-sub-title">P.O. Box 78934
                                    <br> New Orleans
                                    <br>Los Angeles
                                    <br> Postal Code: 70117
                                    <br> USA</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div tabindex="0" class="e-card e-business e-flip" id="card_flip_profile" title="Clicar para virar">
                        <div class="e-card-header e-back">
                            <div class="e-card-header-caption">
                                <div class="e-card-header-title">Address</div>
                                <div class="e-card-sub-title">970 Drummond Street
                                    <br> New York
                                    <br>New Jersey
                                    <br> Postal Code: 07102
                                    <br> USA
                                </div>
                            </div>
                        </div>
                        <div class="e-card-front e-front">
                            <div class="e-card-header e-card-right" style="justify-content:flex-end">
                                <div class="e-card-header-image"></div>
                            </div>
                            <div class="e-card-header e-card-right" style="text-align:right;">
                                <div class="e-card-header-caption">
                                    <div class="e-card-header-title">Creative One</div>
                                </div>
                            </div>
                            <div class="e-card-header e-card-left" style="text-align:left">
                                <div class="e-card-header-caption">
                                    <div class="e-card-header-title">John Doe</div>
                                    <div class="e-card-sub-title">Architecture</div>
                                </div>
                            </div>
                            <div class="e-card-separator e-card-left"></div>
                            <div class="e-card-content e-card-left" style="text-align:left">
                                <table>
                                    <tbody><tr>
                                        <td>johndoe@mail.com</td>
                                    </tr>
                                    <tr>
                                        <td>011-141-221</td>
                                    </tr>
                                    <tr>
                                        <td>www.johndoe.com</td>
                                    </tr>
                                </tbody></table>
                            </div>
                        </div>
                    </div>
                </div>
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
    methods: {},
    mounted: function() {
        document.getElementById('card_flip').onclick = function(e) {
            var cardEle = e.currentTarget;
            if (cardEle.classList.contains('e-flipped')) {
                cardEle.classList.remove('e-flipped');
            } else {
                cardEle.classList.add('e-flipped');
            }
        };
        document.getElementById('card_flip').onblur = function(e) {
            var cardEle = e.currentTarget;
            cardEle.classList.remove('e-flipped');
        };
        document.getElementById('card_flip_profile').onclick = function(e) {
            var cardEle = e.currentTarget;
            if (cardEle.classList.contains('e-flipped')) {
                cardEle.classList.remove('e-flipped');
            } else {
                cardEle.classList.add('e-flipped');
            }
        };
        document.getElementById('card_flip_profile').onblur = function(e) {
            var cardEle = e.currentTarget;
            cardEle.classList.remove('e-flipped');
        };
    }
});