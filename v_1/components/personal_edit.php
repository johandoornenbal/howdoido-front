<p>Uit onderzoek blijkt dat veel kandidaten niet worden gekozen alleen van prestaties of verleden, maar dat het persoonlijke aspect minstens net zo belangrijk is. Omschrijf wie je bent, maar ook vooral welke dingen je in jouw vrije tijd doet.</p>

<!--            EXAMPLE-->
<ul class="collapsible" data-collapsible="accordion">
    <li>
        <div class="collapsible-header grey grey-text lighten-5">
            <b>Voorbeeld<i class="material-icons light-green-text">info</i><i class="material-icons">keyboard_arrow_down</i></b>
        </div>
        <div class="collapsible-body row">
            <div class="col s2"><i class="material-icons grey-text" style="font-size: 45px;">keyboard_arrow_left</i></div>
            <div class="col s8">"Ik ben opgegroeid in Friesland en ik hou dan ook ontzettend van zeilen en fierljeppen. In mijn vrije tijd schilder ik ook graag de prachtige Friese landschappen."</div>
            <div class="col s2"><i class="material-icons grey-text" style="font-size: 45px;">keyboard_arrow_right</i></div>
        </div>
    </li>
</ul>
<!--            END EXAMPLE-->

<div class="section">

    <!--                FORM-->
    <form class="col s12" id="personalForm">

        <div class="row grey lighten-3" style="padding-bottom: 12px;">
            <div class="col s12 grey-text">Mijn persoonlijke verhaal</div>
            <div class="input-field col s12">
                <textarea id="passion" class="materialize-textarea" length="300" ng-model="profile.passion" placeholder="Vertel hier over jouw vrije tijd, passies, vakanties, hobby's, familie, achtergrond etc..."></textarea>
            </div>

            <!--                        TIP-->
            <div class="col s12">
                <div class="col s2"><i class="material-icons grey-text">keyboard_arrow_left</i></div>
                <div class="col s8" style="font-size: 10px;">
                    Tip: Is een rijbewijs belangrijk? Vermeld dat dan hier.
                </div>
                <div class="col s2"><i class="material-icons grey-text">keyboard_arrow_right</i></div>
            </div>
            <!--                        END TIP-->

        </div>

        <div class="row">
            <div class="col s12">
                <a class="btn-floating btn-large waves-effect waves-light green" ng-click="update(profile)"><i class="material-icons">save</i></a>
            </div>
        </div>


        <div class="row grey lighten-3" style="padding-bottom: 12px;">

            <p>Het toevoegen van een aantal foto's kan het persoonlijke aspect enorm vergroten. Denk hierbij aan foto's van jou in een persoonlijke sfeer. Bijvoorbeeld een vakantiefoto of een foto van je sport.</p>

            <div ng-repeat-start="medium in objectToArray(profile.media)"></div>
            <div class="row">
                <div class="col s12"><img src="{{medium.medium.guid}}"></div>
                <!--                            <div class="col s12">{{medium.mediumtype}}</div>-->
                <div class="col s8"><i>{{medium.description}}</i></div>
                <div class="col s4"><img src="../images/PetraJordanie.jpg" class="responsive-img"></div>
            </div>
            <div ng-repeat-end></div>

            <div class="file-field input-field col s12">
                <!--                <input class="file-path validate" type="text" ng-model="mediumNew" />-->
                <div class="btn light-green">
                    <span>Foto</span>
                    <input type="file" />
                </div>
            </div>

            <div class="input-field col s12">
                <i class="material-icons prefix">computer</i>
                <input id="mediumdescriptionNew" type="text" class="" ng-model="mediumdescriptionNew">
                <label for="mediumdescriptionNew">Beschrijving</label>
            </div>


            <div class="input-field col s12">
                <button class="btn waves-effect waves-light grey" type="submit" name="action" ng-click="updateMedia()"><i class="material-icons">add</i>Voeg foto toe
                </button>
            </div>

        </div>

    </form>

    <!--          END      FORM-->

</div>