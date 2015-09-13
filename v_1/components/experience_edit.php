<h4>Ervaring</h4>
<p>Geef hier weer bij welke organisaties jij de laatste jaren hebt gewerkt. En welke opleidingen je hebt gedaan.</p>
<p>Deze pagina is geen vervanging van je CV. Bedenk daarom goed welke functies nog relevant zijn. Het beste is om de drie meest relevante banen en opleidingen weer te geven.</p>
<div class="section">

    <!--                FORM-->

    <form class="col s12" id="experienceForm">

        <div class="row grey lighten-3" style="padding-bottom: 12px;">

<!--
            <div ng-repeat-start="position in objectToArray(profile.positions)"></div>
            <div class="row">
                <div class="col s6"><b>{{position.companyname}}</b></div>
                <div class="col s6">{{position.yearstart}} - {{position.yearend}}</div>
                <div class="col s12">{{position.function}}</div>
                <div class="col s12"><i>{{position.activities}}</i></div>
            </div>
            <div ng-repeat-end></div>
-->

            <div class="input-field col s12">
                <i class="material-icons prefix">computer</i>
                <input id="positionyearendNew" type="text" class="" ng-model="companynameNew">
                <label for="positionyearendNew">Bedrijfsnaam</label>
            </div>

            <div class="input-field col s12">
                <i class="material-icons prefix">computer</i>
                <input id="positionyearstartNew" type="tel" class="" ng-model="positionyearstartNew">
                <label for="positionyearstartNew">Start jaar</label>
            </div>

            <div class="input-field col s12">
                <i class="material-icons prefix">computer</i>
                <input id="positionyearendNew" type="tel" class="" ng-model="positionyearendNew">
                <label for="positionyearendNew">Eind jaar</label>
            </div>

            <div class="input-field col s12">
                <i class="material-icons prefix">computer</i>
                <input id="functionNew" type="text" class="" ng-model="functionNew">
                <label for="functionNew">Functie</label>
            </div>

            <div class="col s12 grey-text">Taakbeschrijving</div>
            <div class="input-field col s12">
                <textarea id="activitiesNew" class="materialize-textarea" length="180" placeholder="Taakbeschrijving" ng-model="activitiesNew"></textarea>
                <!--                            <label for="pitch"></label>-->
            </div>
            <div class="input-field col s12">
                <button class="btn waves-effect waves-light grey" type="submit" name="action" ng-click="updatePosition()"><i class="material-icons">add</i>Voeg functie toe
                </button>
            </div>

        </div>

        <div class="row grey lighten-3" style="padding-bottom: 12px;">
<!--
            <div ng-repeat-start="education in objectToArray(profile.educations)"></div>
            <div class="row">
                <div class="col s6"><b>{{education.institute}}</b></div>
                <div class="col s6">{{education.yearstart}} - {{education.yearend}}</div>
                <div class="col s12">{{education.program}}</div>
                <div class="col s12"><i>{{education.programdescription}}</i></div>
            </div>
            <div ng-repeat-end></div>
-->

            <div class="input-field col s12">
                <i class="material-icons prefix">computer</i>
                <input id="instituteNew" type="text" class="" ng-model="instituteNew">
                <label for="instituteNew">School</label>
            </div>

            <div class="input-field col s12">
                <i class="material-icons prefix">computer</i>
                <input id="yearstartNew" type="tel" class="" ng-model="yearstartNew">
                <label for="yearstartNew">Start jaar</label>
            </div>

            <div class="input-field col s12">
                <i class="material-icons prefix">computer</i>
                <input id="yearendNew" type="tel" class="" ng-model="yearendNew">
                <label for="yearendNew">Eind jaar</label>
            </div>

            <div class="input-field col s12">
                <i class="material-icons prefix">computer</i>
                <input id="programNew" type="text" class="" ng-model="programNew">
                <label for="programNew">Opleiding</label>
            </div>

            <div class="input-field col s12">
                <div class="col s12 grey-text">Opleidingsbeschrijving</div>
                <textarea id="programdescriptionNew" class="materialize-textarea" length="180" placeholder="Opleidings beschrijving" ng-model="programdescriptionNew"></textarea>
            </div>

        </div>

        <div class="input-field col s12">
            <button class="btn waves-effect waves-light grey" type="submit" name="action" ng-click="updateEducation()"><i class="material-icons">add</i>Voeg opleiding toe
            </button>
        </div>





    </form>

    <!--          END      FORM-->

</div>