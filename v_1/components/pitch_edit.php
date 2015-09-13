<p>Het is belangrijk om jezelf kernachtig te beschrijven zodat de werkgever in één opslag jouw profiel goed kan inschatten.</p>
<p>Deze pagina helpen we je met het kernachtig omschrijven van jezelf.</p>

<!--            EXAMPLE-->
<ul class="collapsible" data-collapsible="accordion">
    <li>
        <div class="collapsible-header grey grey-text lighten-5">
            <b>Voorbeeld<i class="material-icons orange-text">info</i><i class="material-icons">keyboard_arrow_down</i></b>
        </div>
        <div class="collapsible-body row">
            <div class="col s2"><i class="material-icons grey-text" style="font-size: 45px;">keyboard_arrow_left</i></div>
            <div class="col s8">"Ik ben een geweldige teamspeler met een fantastisch nuchtere blik en daarom ben ik ervan overtuigd dat ik de juiste persoon ben."</div>
            <div class="col s2"><i class="material-icons grey-text" style="font-size: 45px;">keyboard_arrow_right</i></div>
        </div>
    </li>
</ul>
<!--            END EXAMPLE-->

<div class="section">

    <!--                FORM-->
    <form class="col s12" id="pitchForm">

        <div class="row grey lighten-3" style="padding-bottom: 12px;">
            <div class="col s12 grey-text">Mijn Pitch</div>
            <div class="input-field col s12" style="padding: 5px;">
                <textarea id="pitch" class="materialize-textarea" length="120" ng-model="profile.pitch" placeholder="Schrijf hier jouw eigen pitch"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col s12">Maak jouw pitch extra krachtig door een goede zakelijke foto te plaatsen.</div>
            <div class="file-field input-field col s6">
                <!--                            <input class="file-path validate" type="text" ng-model="profile.homepicture.guid" />-->
                <div class="btn orange">
                    <span>Foto</span>
                    <input type="file" />
                </div>
            </div>
            <div class="col s6">
                <img src="{{profile.homepicture.guid}}" class="responsive-img">
            </div>
        </div>
        <div class="section"></div>
        <div class="row">
            <div class="col s12">
                <a class="btn-floating btn-large waves-effect waves-light green" ng-click="update(profile)"><i class="material-icons">save</i></a>
            </div>
        </div>

    </form>

    <!--          END      FORM-->


</div>