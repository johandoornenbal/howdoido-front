<!--Personal-->

<a name="persoonlijk"></a>
<div class="section">
</div>

<div class="z-depth-2">
    <img src="../images/PetraJordanie.jpg" class="responsive-img">
    <div class="grey lighten-5" style="width: 100%;">
        
        <div class="row" style="width: 100%;">
            <div class="col s12">
                <div class="flow-text black-text"><p>Mijn vakantie in Petra, Jordanië</p></div>
            </div>
        </div>
        
         <!-- START COLLAPSIBLE SECTION-->
        <ul class="collapsible" data-collapsible="accordion" ng-click="update(profile)">
            <li>
                <!-- START HEADER-->
                <div class="collapsible-header grey lighten-5" style="min-height: 83px;">
                    <div class="row" style="width: 100%;">
                        <div class="col s3">
                            <a class="btn-floating btn-large waves-effect waves-light circle green" style="top: 15px; position: relative;"><i class="material-icons" style="font-size: 45px; padding-left: 5px;">person</i></a>
                        </div>
                        <div class="col s8">
                            <h4 class="grey-text darken-3"><b>Persoonlijk</b></h4>
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
                        <?php require_once( "partials/personal_edit.php"); ?>
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
                <p>"{{profile.passion}}"</p>
            </div>
        </div>
        <div class="section"></div>
    </div>
</div>

<!--end Personal-->