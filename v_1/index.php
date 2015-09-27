<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
    <link href="../materialize/dist/css/materialize.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="../bower_components/angular-material/angular-material.min.css" />
<!--    <link rel="../bower_components/ng-materialize/dist/ng-materialize.css" />-->
    <!--    OVERRIDES-->
    <link href="../css/globalApp.css" rel="stylesheet">
    <!--    END OVERRIDES-->
</head>

<body class="" ng-app="app">

    <?php require_once( "components/navigation.php"); ?>

    <div class="jumbotron">
        <div class="container">
            <div class="col-sm-8 col-sm-offset-2">
                <div ng-class="{ 'alert': flash, 'alert-success': flash.type === 'success', 'alert-danger': flash.type === 'error' }" ng-if="flash" ng-bind="flash.message"></div>
                <div ng-view></div>
            </div>
        </div>
    </div>

    <!--        Scripts-->

    <!--    Angular and angular components-->
    <script src="../bower_components/angular/angular.min.js"></script>
    <script src="../bower_components/angular-route/angular-route.min.js"></script>
    <script src="../bower_components/angular-cookies/angular-cookies.min.js"></script>
    <script src="../bower_components/angular-animate/angular-animate.min.js"></script>
    <script src="../bower_components/angular-aria/angular-aria.min.js"></script>
    <script src="../bower_components/angular-material/angular-material.min.js"></script>
    
    <script src="app.module.js"></script>
    <script src="app-services/authentication.service.js"></script>
    <script src="app-services/flash.service.js"></script>


    <script src="app-services/currentuser.service.js"></script>
    <script src="app-services/isisobject.service.js"></script>

    <script src="components/home/home.controller.js"></script>
    <script src="components/login/login.controller.js"></script>
    <script src="components/register/register.controller.js"></script>
    <script src="components/request/request.controller.js"></script>
    
    <script src="../jquery/jquery.min.js"></script>
    <script src="../materialize/dist/js/materialize.min.js"></script>
    <script>
        $('.button-collapse').sideNav({
            menuWidth: 200, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });

        $(document).ready(function() {
            $('.parallax').parallax();
            $('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
            $('.modal-trigger').leanModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                in_duration: 900, // Transition in duration
                out_duration: 200, // Transition out duration
                ready: function() {
                    //                        alert('Ready');
                }, // Callback for Modal open
                complete: function() {
                        //                            alert('Closed');
                    } // Callback for Modal close
            });
        });
    </script>
    <!--    End    Scripts-->

</body>

</html>