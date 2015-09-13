<!--HIGHLIGHT-->

<a name="uitgelicht"></a>
<div class="section">
</div>

<div class="z-depth-2">
    <img src="../images/Uitgelicht.jpg" class="responsive-img">
    <div class="grey lighten-5" style="width: 100%;">
        <div class="row" style="width: 100%;">
        </div>
        
        <!-- START COLLAPSIBLE SECTION-->
        <ul class="collapsible" data-collapsible="accordion" ng-click="update(profile)" onclick="$('#highlightForm label').addClass('active'); $('#highlightForm i').addClass('active');">
            <li>
                <!-- START HEADER-->
                <div class="collapsible-header grey lighten-5" style="min-height: 83px;">
                    <div class="row" style="width: 100%;">
                        <div class="col s3">
                            <a class="btn-floating btn-large waves-effect waves-light circle blue lighten-2" style="top: 15px; position: relative;"><i class="material-icons" style="font-size: 45px; padding-left: 5px;">search</i></a>
                        </div>
                        <div class="col s8">
                            <h4 class="grey-text darken-3"><b>Uitgelicht</b></h4>
                        </div>
                        <div class="col s1">
                            <i class="material-icons grey-text" style="font-size: 25px;">keyboard_arrow_down</i>
                        </div>
                    </div>
                </div>
                <!-- END HEADER-->

                <!-- START BODY-->
                <div class="collapsible-body">
                    <div class="row flow-text" style="width: 100%;">
                        <?php require_once( "partials/highlight_edit.php"); ?>
                    </div>
                </div>
                <!-- END BODY-->

            </li>

        </ul>
        <!--        END COLLAPSIBLE SECTION-->
        
        <div class="row" style="width: 100%;">
            <div class="col s3">
                &nbsp;
            </div>
            <div class="col s9">
                <h6><b><br />{{profile.highlightproject}}</b></h6>
                <p>{{profile.highlightcompany}} {{profile.highlightyear}}</p>
                <p>"{{profile.highlightdescription}}"</p>
            </div>
        </div>
        <div class="section"></div>

        <div class="row" style="width: 100%;">
            <div class="col s3">
                <img src="../images/johan.png" class="responsive-img" style="top: 45px; position: relative;">
            </div>
            <div class="col s9">
                <h5 class="grey-text darken-3"><b>Aanbeveling</b></h5>
                <h6>Johan de Vries - ABC.B.V.</h6>
                <p><i>"Dit project is een perfect voorbeeld van een zeer succesvolle campagne die veel potentie heeft."</i></p>
            </div>
        </div>
        
        <div class="section"></div>
        
    </div>
</div>



<!--END HIGHLIGHT-->