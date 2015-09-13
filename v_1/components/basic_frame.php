<!-- ****************** EDIT VERSION ************************************************************************ -->
<div id="editVersion">

    <a name="home"></a>

    <!-- Navigation -->
    <div class="navbar-fixed">
        <nav style="font-weight: bold;" class="grey">
            <ul class="right">
                <div class="row" style="padding-right: 5px;">
                    <font style="font-size: 10px; color: grey; font-weight: normal;">[je bent nu in de bewerking modus]&nbsp;</font>
                    <a class="btn-floating btn-medium waves-effect waves-light circle grey lighten-1" href="?mode=preview&id={{profile.id}}" ng-click="update(profile)"><i class="material-icons" ng-click="update(profile)">play_circle_outline</i></a>
                    <a class="btn-floating btn-medium waves-effect waves-light circle grey lighten-1" href="#config"><i class="material-icons">settings</i></a>
                </div>
            </ul>
            <ul id="slide-out" class="side-nav">
                <li><a href="#home">Home</a></li>
                <li>
                    <a href="#pitchAnchor">
                        <i class="material-icons btn-floating btn-large circle orange " style="font-size: 50px;">star_border</i> &nbsp;Pitch
                    </a>
                </li>
                <li>
                    <a href="#ambitie">
                        <i class="material-icons btn-floating btn-large circle red darken-3" style="font-size: 50px;">trending_up</i> &nbsp;Ambitie
                    </a>
                </li>
                <li>
                    <a href="#ervaring">
                        <i class="material-icons btn-floating btn-large circle blue darken-4" style="font-size: 50px;">domain</i> &nbsp;Ervaring
                    </a>
                </li>
                <li>
                    <a href="#uitgelicht">
                        <i class="material-icons btn-floating btn-large circle blue lighten-2" style="font-size: 50px;">search</i> &nbsp;Uitgelicht
                    </a>
                </li>
                <li>
                    <a href="#persoonlijk">
                        <i class="material-icons btn-floating btn-large circle green" style="font-size: 50px;">person</i> &nbsp;Persoonlijk</a>
                </li>
                <li>
                    <a href="#contact">
                        <i class="material-icons btn-floating btn-large circle yellow darken-1" style="font-size: 50px;">phone_iphone</i> &nbsp;Contact</a>
                </li>
                <li>
                    <a href="#config">
                        <i class="material-icons btn-floating btn-large circle grey" style="font-size: 50px;">settings</i> &nbsp;Stel in</a>
                </li>
            </ul>
            <a href="#" data-activates="slide-out" class="button-collapse show-on-large"><i class="mdi-navigation-menu"></i></a>
        </nav>
    </div>

    <!-- End Navigation -->


    <div class="">

        <?php require_once( "partials/pitch.php"); require_once( "partials/ambition.php"); require_once( "partials/experience.php"); require_once( "partials/highlight.php"); require_once( "partials/personal.php"); require_once( "partials/contact.php"); require_once( "partials/config.php");?>

        <div class="section" style="min-height: 200px;">
            <br />
        </div>

    </div>

</div>
<!--  END  *************** EDIT VERSION *********************************************************************** -->