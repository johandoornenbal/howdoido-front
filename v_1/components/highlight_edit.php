<p>Beschrijf hier een project waar je trots op bent en wat je aan je nieuwe werkgever wilt laten zien. Deze 'showcase' onderstreept jouw kwaliteiten en geschiktheid voor de functie.</p>


<!--            EXAMPLE-->
<ul class="collapsible" data-collapsible="accordion">
    <li>
        <div class="collapsible-header grey grey-text lighten-5">
            <b>Voorbeeld<i class="material-icons blue-text">info</i><i class="material-icons">keyboard_arrow_down</i></b>
        </div>
        <div class="collapsible-body row">
            <div class="col s2"><i class="material-icons grey-text" style="font-size: 45px;">keyboard_arrow_left</i></div>
            <div class="col s8">
                <b>Communicatiestrategie bij Albert Heijn</b>
                <br /> Albert Heijn is the oldest bla bla bla bla...
            </div>
            <div class="col s2"><i class="material-icons grey-text" style="font-size: 45px;">keyboard_arrow_right</i></div>
        </div>
    </li>
</ul>
<!--            END EXAMPLE-->
<p>Schrijf hier jouw eigen project kernachtig in 50 woorden.</p>
<div class="row">


    <!--                FORM-->
    <form class="col s12" id="highlightForm">

        <div class="row grey lighten-3" style="padding-bottom: 12px;">
            <div class="input-field col s9">
                <input id="company" type="text" class="" ng-model="profile.highlightcompany">
                <label for="company">Bedrijf</label>
            </div>
            <div class="input-field col s3">
                <input id="highlightyear" type="tel" class="" ng-model="profile.highlightyear">
                <label for="highlightyear">Jaar</label>
            </div>
        </div>
        <div class="row grey lighten-3" style="padding-bottom: 12px;">
            <div class="input-field col s12">
                <textarea id="highlightdescription" class="materialize-textarea" length="300" ng-model="profile.highlightdescription" placeholder="Schrijf hier jouw eigen opdracht / project"></textarea>
                <label for="highlightdescription">Project beschrijving</label>
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

<h5 class="grey-text darken-3"><b>Aanbeveling</b></h5>
<p>Het maakt het extra krachtig als je een aanbeveling toevoegt aan jouw project. Stuur een verzoek naar degene die jouw kwaliteiten en inbreng in dit project kan onderschrijven.</p>
<div class="row">
    <!--                FORM-->
    <form class="col s12" id="recommendationEmailForm">

        <!--                    EMAIL-->
        <div class="row grey lighten-3" style="padding-bottom: 12px;">
            <div class="input-field col s12">
                <i class="material-icons prefix">email</i>
                <input id="rec_email" type="email" class="">
                <label for="rec_email">Email</label>
            </div>
        </div>

    </form>
    <!--          END      FORM-->
</div>
<div class="divider"></div>
<p>Test formulier - zoiets krijgt aanbeveler te zien</p>
<div class="row">
    <!--                FORM-->
    <form class="col s12" id="recommendationMockForm">

        <div class="row grey lighten-3" style="padding-bottom: 12px;">

            <div class="input-field col s12">
                <i class="material-icons prefix">text</i>
                <input id="recfullnameNew" type="text" class="" ng-model="recfullnameNew">
                <label for="recfullnameNew">Naam</label>
            </div>

        </div>


        <div class="row grey lighten-3" style="padding-bottom: 12px;">

            <div class="input-field col s12">
                <i class="material-icons prefix">text</i>
                <input id="recfunctionNew" type="text" class="" ng-model="recfunctionNew">
                <label for="recfunctionNew">Function</label>
            </div>
        </div>

        <div class="row grey lighten-3" style="padding-bottom: 12px;">

            <div class="input-field col s12">
                <textarea id="recommendationtextNew" class="materialize-textarea" length="300" ng-model="recommendationtextNew" placeholder="Dit is voor testing (gebeurt normaal niet in de app)"></textarea>
                <label for="recommendationtextNew">Aanbeveling tekst</label>
            </div>

        </div>

        <div class="input-field col s12">
            <button class="btn waves-effect waves-light grey" type="submit" name="action" ng-click="updateRecommendation()"><i class="material-icons">add</i>&nbsp;aanbeveling
            </button>
        </div>




    </form>
    <!--          END      FORM-->
</div>

<!--            EXAMPLE-->
<ul class="collapsible" data-collapsible="accordion">
    <li>
        <div class="collapsible-header grey grey-text lighten-5">
            <b>Voorbeeld<i class="material-icons blue-text">info</i><i class="material-icons">keyboard_arrow_down</i></b>
        </div>
        <div class="collapsible-body row">
            <div class="col s2"><i class="material-icons grey-text" style="font-size: 45px;">keyboard_arrow_left</i></div>
            <div class="col s8">"Siemon is een hardwerkende jongen en door hem is dit project ongekend succesvol geworden"</div>
            <div class="col s2"><i class="material-icons grey-text" style="font-size: 45px;">keyboard_arrow_right</i></div>
        </div>
    </li>
</ul>
<!--            END EXAMPLE-->