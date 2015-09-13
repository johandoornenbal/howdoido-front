var app = angular.module("howdoidoApp", ['howdoidoServices']);

app.controller('AppController', ['$scope',
    'restService',
    'getProfileService',
    'newProfileService',
    'updateProfileService',
    'newEducationService',
    'newMediaService',
    'newPositionService',
    'newRecommendationService',
    function($scope,
        restService,
        getProfileService,
        newProfileService,
        updateProfileService,
        newEducationService,
        newMediaService,
        newPositionService,
        newRecommendationService) {

        console.log("AppController");

        var myMode = location.search.split('mode=')[1]
        var myId = location.search.split('id=')[1]

        console.log(myMode);
        console.log(myId);
        
        // default profile if no id is given
        if (typeof myId == 'undefined') {myId = 92; }
        
        console.log(myId);
        
        $scope.profile={};
        $scope.profile.id = myId;

        getProfileService($scope.profile.id).then(function(data) {
            $scope.profile = data;
            $scope.profile.post_title = data.fullname + ' - ' + data.profilegoal;
        });

        $scope.master = {};
        $scope.profileToSave = {};

        //   FUNCTION /////////////////////////////////////////////////////

        $scope.update = function(profile) {
            $scope.master = angular.copy(profile);
            $scope.profileToSave = angular.copy(profile);
            /*
            copy and 
            unset all collections
            to save
            [Collections are saved when field is added]
            */
            delete $scope.profileToSave['educations'];
            delete $scope.profileToSave['positions'];
            delete $scope.profileToSave['recommendations'];
            delete $scope.profileToSave['media'];
            updateProfileService($scope.profile.id, $scope.profileToSave).then(function(data) {
                $scope.saved = profile.fullname + ' -- PROFILE JUST SAVED';
            });

        };

        //   END FUNCTION /////////////////////////////////////////////////////

        //   FUNCTION /////////////////////////////////////////////////////

        $scope.reset = function() {
            $scope.profile = angular.copy($scope.master);
        };

        //   END FUNCTION /////////////////////////////////////////////////////

        //   FUNCTION /////////////////////////////////////////////////////
        $scope.updatePosition = function() {
            var postData = {
                "post_status": "publish"
            };
            postData['profile'] = $scope.profile.id;
            postData['companyname'] = $scope.companynameNew;
            postData['yearstart'] = $scope.positionyearstartNew;
            postData['yearend'] = $scope.positionyearendNew;
            postData['function'] = $scope.functionNew;
            postData['activities'] = $scope.activitiesNew;
            newPositionService(postData).then(function(data) {
                getProfileService($scope.profile.id).then(function(data) {
                    $scope.profile = data;
                    /*
                    clear the form
                    */
                    $scope.companynameNew = '';
                    $scope.positionyearstartNew = '';
                    $scope.positionyearendNew = '';
                    $scope.functionNew = '';
                    $scope.activitiesNew = '';
                });
            });
        };

        //   END FUNCTION /////////////////////////////////////////////////////


        //   FUNCTION /////////////////////////////////////////////////////
        $scope.updateEducation = function() {
            var postData = {
                "post_status": "publish"
            };
            postData['profile'] = $scope.profile.id;
            postData['institute'] = $scope.instituteNew;
            postData['yearstart'] = $scope.yearstartNew;
            postData['yearend'] = $scope.yearendNew;
            postData['program'] = $scope.programNew;
            postData['programdescription'] = $scope.programdescriptionNew;
            newEducationService(postData).then(function(data) {
                getProfileService($scope.profile.id).then(function(data) {
                    $scope.profile = data;
                    /*
                    clear the form
                    */
                    $scope.instituteNew = '';
                    $scope.yearstartNew = '';
                    $scope.yearendNew = '';
                    $scope.programNew = '';
                    $scope.programdescriptionNew = '';
                });
            });
        };

        //   END FUNCTION /////////////////////////////////////////////////////

        //   FUNCTION /////////////////////////////////////////////////////
        $scope.updateMedia = function() {
            var postData = {
                "post_status": "publish"
            };
            postData['profile'] = $scope.profile.id;
            postData['mediumtype'] = 'photo';
            postData['description'] = $scope.mediumdescriptionNew;
            postData['medium'] = $scope.mediumNew;
            newMediaService(postData).then(function(data) {
                getProfileService($scope.profile.id).then(function(data) {
                    $scope.profile = data;
                    /*
                    clear the form
                    */
                    $scope.mediumdescriptionNew = '';
                    $scope.mediumNew = '';
                });
            });
        };

        //   END FUNCTION /////////////////////////////////////////////////////

        //   FUNCTION /////////////////////////////////////////////////////
        $scope.updateRecommendation = function() {
            var postData = {
                "post_status": "publish"
            };
            postData['profile'] = $scope.profile.id;
            postData['fullname'] = $scope.recfullnameNew;
            postData['function'] = $scope.recfunctionNew;
            postData['recommendationtext'] = $scope.recommendationtextNew;
            newRecommendationService(postData).then(function(data) {
                getProfileService($scope.profile.id).then(function(data) {
                    $scope.profile = data;
                    /*
                    clear the form
                    */
                    $scope.recfullnameNew = '';
                    $scope.recfunctionNew = '';
                    $scope.recommendationtextNew = '';
                });
            });
        };

        //   END FUNCTION /////////////////////////////////////////////////////


        //        CONVENIENCE FUNCTION /////////////////////////////////////////////
        $scope.objectToArray = function(inputObj) {
            console.log('start objectToArray');
            var output = [];
            for (var key in inputObj) {
                //                console.log(key);
                output.push(inputObj[key]);
                //                console.log(output);
            }
            console.log('end objectToArray');
            return output;
        };

        //        END CONVENIENCE FUNCTION /////////////////////////////////////////////

        $scope.labelclass = "active";

        $scope.reset();
    }

]);