<p>Vermeld hier de contactgegevens zodat jouw nieuwe werkgever je kan bereiken.</p>
<div class="row grey lighten-3" style="padding-bottom: 12px;">

    <!--                FORM-->
    <form class="col s12" id="contactForm">

        <!--                    PHONE-->
        <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix">phone</i>
                <input id="icon_telephone" type="tel" class="" ng-model="profile.phone">
                <label for="icon_telephone">Telefoonnummer</label>
            </div>
        </div>
        <!--                    EMAIL-->
        <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix">email</i>
                <input id="icon_email" type="email" class="" ng-model="profile.email">
                <label for="icon_email">Email</label>
            </div>
        </div>

        <!--                    WEBSITE-->

        <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix">computer</i>
                <input id="icon_website" type="text" class="" ng-model="profile.website">
                <label for="icon_website">Website / social media</label>
            </div>
        </div>

        <!--                    LINKED IN-->

        <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix">contacts</i>
                <input id="icon_linkedin" type="text" class="" ng-model="profile.linkedin">
                <label for="icon_linkedin">LinkedIn</label>
            </div>
        </div>
        
        <div class="row">
            <div class="col s12">
                <a class="btn-floating btn-large waves-effect waves-light green" ng-click="update(profile)"><i class="material-icons">save</i></a>
            </div>
        </div>

    </form>

    <!--          END      FORM-->

</div>