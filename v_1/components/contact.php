<!--Contact-->

<a name="contact"></a>
<div class="section">
</div>

<div class="z-depth-2">
    <div class="grey lighten-5" style="width: 100%;">
        <div class="row" style="width: 100%;">

            <!-- START COLLAPSIBLE SECTION-->
            <ul class="collapsible" data-collapsible="accordion" ng-click="update(profile)" onclick="$('#contactForm label').addClass('active'); $('#contactForm i').addClass('active');">
                <li>
                    <!-- START HEADER-->
                    <div class="collapsible-header grey lighten-5" style="min-height: 83px;">
                        <div class="row" style="width: 100%;">
                            <div class="col s3">
                                <a class="btn-floating btn-large waves-effect waves-light circle yellow darken-1" style="top: 15px; position: relative;"><i class="material-icons" style="font-size: 45px; padding-left: 5px;">phone_iphone</i></a>
                            </div>
                            <div class="col s8">
                                <h4 class="grey-text darken-3"><b>Contact</b></h4>
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
                            <?php require_once( "partials/contact_edit.php"); ?>
                        </div>
                    </div>
                    <!-- END BODY-->

                </li>

            </ul>
            <!--        END COLLAPSIBLE SECTION-->
        </div>
        <div class="row" style="width: 100%;">
            <div class="col s12 offset-s1">
                <div class="valign-wrapper">
                    <p class="valign"><i class="material-icons" style="font-size: 18px;">phone</i>&nbsp;&nbsp;&nbsp;&nbsp;{{profile.phone}}</p>
                </div>
                <div class="valign-wrapper">
                    <p><i class="material-icons" style="font-size: 18px;">mail</i>&nbsp;&nbsp;&nbsp;&nbsp;{{profile.email}}</p>
                </div>
                <div class="valign-wrapper">
                    <p><i class="material-icons" style="font-size: 18px;">laptop</i>&nbsp;&nbsp;&nbsp;&nbsp;{{profile.website}}</p>
                </div>
                <div class="valign-wrapper">
                    <p><i class="material-icons" style="font-size: 18px;">person_add</i>&nbsp;&nbsp;&nbsp;&nbsp;{{profile.linkedin}}</p>
                </div>
            </div>
        </div>
        <div class="section"></div>
    </div>
</div>

<!--end Contact-->