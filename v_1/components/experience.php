<!--EXPERIENCE-->

<a name="ervaring"></a>
<div class="section">
</div>

<div class="z-depth-2">
    <img src="{{profile.highlightphoto.guid}}" class="responsive-img">
    <div class="grey lighten-5" style="width: 100%;">
        <div class="row" style="width: 100%;">
            <div class="row" style="width: 100%;">
            </div>

            <!-- START COLLAPSIBLE SECTION-->
            <ul class="collapsible" data-collapsible="accordion" ng-click="update(profile)">
                <li>
                    <!-- START HEADER-->
                    <div class="collapsible-header grey lighten-5" style="min-height: 83px;">
                        <div class="row" style="width: 100%;">

                            <div class="col s3">
                                <a class="btn-floating btn-large waves-effect waves-light circle blue darken-4" style="top: 15px; position: relative;"><i class="material-icons" style="font-size: 45px; padding-left: 5px;">domain</i></a>
                            </div>
                            <div class="col s8">
                                <h4 class="grey-text darken-3"><b>Ervaring</b></h4>
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
                            <?php require_once( "partials/experience_edit.php"); ?>
                        </div>
                    </div>
                    <!-- END BODY-->

                </li>

            </ul>


            <!--        END COLLAPSIBLE SECTION-->

            <div class="row" style="width: 100%;">

                <!--                EXPANDABLE-->

                <ul class=" z-depth-0 grey lighten-5" style="border: 0px;" data-collapsible="expandable">

                    <div ng-repeat-start="position in objectToArray(profile.positions)"></div>

                    <li>
                        <div class="grey lighten-5" style="border: 0px;">
                            <div class="row">
                                <div class="col s3">
                                    <div class="center">{{position.yearend}}</div>
                                    <div style="font-size: 10px;" class="center">{{position.yearstart}}</div>
                                </div>
                                <div class="col s6">
                                    <div class="">{{position.companyname}}</div>
                                    <div style="" class=""><b>{{position.function}}</b></div>
                                </div>
                                <div class="col s3">
                                    <i class="material-icons grey-text" style="font-size: 35px;">keyboard_arrow_down</i></a>
                                </div>
                            </div>
                        </div>
                        <div class="" style="top: -20px; position: relative; padding-left: 30px;">
                            <p>{{position.activities}}</p>
                        </div>
                    </li>

                    <div ng-repeat-end></div>

                </ul>

                <!--          END      EXPANDABLE-->

                <div class="divider"></div>

                <!--                EXPANDABLE EDUCATION-->

                <ul class=" z-depth-0 grey lighten-5" style="border: 0px;" data-collapsible="expandable">

                    <div ng-repeat-start="education in objectToArray(profile.educations)"></div>

                    <li>
                        <div class="grey lighten-5" style="border: 0px;">
                            <div class="row">
                                <div class="col s3">
                                    <div class="center">{{education.yearend}}</div>
                                    <div style="font-size: 10px;" class="center">{{education.yearstart}}</div>
                                </div>
                                <div class="col s6">
                                    <div class="">{{education.institute}}</div>
                                    <div style="" class=""><b>{{education.program}}</b></div>
                                </div>
                                <div class="col s3">
                                    <i class="material-icons grey-text" style="font-size: 35px;">keyboard_arrow_down</i></a>
                                </div>
                            </div>
                        </div>
                        <div class="" style="top: -20px; position: relative; padding-left: 30px;">
                            <p>{{education.programdescription}}</p>
                        </div>
                    </li>

                    <div ng-repeat-end></div>

                </ul>

                <!--          END      EXPANDABLE-->


            </div>



        </div>
    </div>

    <!-- 
                <li>
                    <div class="collapsible-header grey lighten-5" style="border: 0px;">
                        <div class="row">
                            <div class="col s3">
                                <div class="center">{{position.yearend}}</div>
                                <div style="font-size: 10px; top: -25px; position: relative;" class="center">{{position.yearstart}}</div>
                            </div>
                            <div class="col s6">
                                <div class="">{{position.companyname}}</div>
                                <div style="top: -25px; position: relative;" class=""><b>{{position.function}}</b></div>
                            </div>
                            <div class="col s3">
                                <i class="material-icons grey-text" style="font-size: 35px;">keyboard_arrow_down</i></a>
                            </div>
                        </div>
                    </div>
                    <div class="collapsible-body">
                        <p>{{position.activities}}</p>
                    </div>
                </li>

-->


    <!--END EXPERIENCE-->