<!--        CONFIG-->
<a name="config"></a>
<div class="section">
</div>

<div class="z-depth-2">
    <div class="grey lighten-5" style="width: 100%;">
        <div class="row" style="width: 100%;">

            <!-- START COLLAPSIBLE SECTION-->
            <ul class="collapsible" data-collapsible="accordion" ng-click="update(profile)" onclick="$('#configForm label').addClass('active'); $('#configForm i').addClass('active');">
                <li>
                    <!-- START HEADER-->
                    <div class="collapsible-header grey lighten-5" style="min-height: 83px;">
                        <div class="row" style="width: 100%;">
                            <div class="col s3">
                                <a class="btn-floating btn-large waves-effect waves-light circle grey lighten-1" style="top: 15px; position: relative;"><i class="material-icons" style="font-size: 45px; padding-left: 5px;">settings</i></a>
                            </div>
                            <div class="col s8">
                                <h4 class="grey-text darken-3"><b>Instellingen</b></h4>
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
                            <?php require_once( "partials/config_edit.php"); ?>
                        </div>
                    </div>
                    <!-- END BODY-->

                </li>

            </ul>
            <!--        END COLLAPSIBLE SECTION-->

            <div class="row" style="width: 100%;">
                <div class="col s12">
                    <p class="flow-text"><i class="material-icons grey-text" style="font-size: 30px; top: 10px; position: relative;">person</i> "{{profile.fullname}}"</p>
                    <p class="flow-text"><i class="material-icons grey-text" style="font-size: 30px; top: 10px; position: relative;">center_focus_strong</i> "{{profile.profilegoal}}"</p>
                </div>
            </div>


            <div class="section"></div>

        </div>
    </div>
</div>

<!--        END Config-->