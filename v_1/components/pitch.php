<!--        Pitch-->



<a name="pitchAnchor"></a>

<div class="z-depth-2">
    <img src="{{profile.homepicture.guid}}" class="responsive-img">
    <div class="grey lighten-5" style="width: 100%;">
        <div class="row" style="width: 100%;">
            <div class="col s12">
                <div class="flow-text black-text">
                    <h3><b>{{profile.fullname}}</b></h3></div>
            </div>
        </div>

        <!-- START COLLAPSIBLE SECTION-->
        <ul class="collapsible" data-collapsible="accordion" ng-click="update(profile)">
            <li>
                <!-- START HEADER-->
                <div class="collapsible-header grey lighten-5" style="min-height: 83px;">
                    <div class="row" style="width: 100%;">
                        <div class="col s3">
                            <a class="btn-floating btn-large waves-effect waves-light circle orange" style="top: 15px; position: relative;"><i class="material-icons" style="font-size: 45px; padding-left: 5px;">star_border</i></a>
                        </div>
                        <div class="col s8">
                            <h4 class="grey-text darken-3"><b>Pitch</b></h4>
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
                        <?php require_once( "partials/pitch_edit.php"); ?>
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
                <p class="flow-text">"{{profile.pitch}}"</p>
            </div>
        </div>


        <div class="section"></div>
    </div>
</div>

<!--        END Pitch-->