(function() {
    'use strict';

    angular
        .module('app')
        .controller('FeedbackController', FeedbackController);

    FeedbackController.$inject = ['$location', '$routeParams', 'IsisObjectService', '$http'];

    function FeedbackController($location, $routeParams, IsisObjectService, $http) {

        var vm = this;
        vm.answers = [];
        vm.id = $routeParams.feedbackUrl.replace("L_", "");

        initController();

        function initController() {
            getQuestionsFromRequest();
            //            submitFeedbackFormForRatingExplanation("Good", "Dit is de uitleg");
        }

        /*
            Following pattern of http://solutionoptimist.com/2013/12/27/javascript-promise-chains-2/
            Refactoring Step1 and step2 below
        */
        function getQuestionsFromRequest() {

            var loadBasicRequest = function(requestUrl) {
                return IsisObjectService
                    .GetObjectDataPromise(requestUrl) // request 1
                    .then(
                        function(data) {
                            console.log(data.data.members.basicTemplate.links[0].href); // response handler 1
                            return data.data.members.basicTemplate.links[0].href;
                        });
            };
            var loadBasicTemplate = function(templateUrl) {
                return $http
                    .get(templateUrl) // request 2
                    .then(
                        function(data) {
                            console.log(data.data.value.href); // response handler 2
                            return data.data.value.href;
                        });
            };
            var loadBasicQuestionArray = function(questionsUrl) {
                return $http
                    .get(questionsUrl) //request 3
                    .then(
                        function(data) {
                            console.log(data.data.members.basicQuestions.links); // response handler 3
                            return data.data.members.basicQuestions.links;
                        }
                    );
            };
            var loadQuestionDetails = function(questionUrl) {
                return $http
                    .get(questionUrl)
                    .then(function(data) {
//                        console.log(data.data);
                        console.log("title: " + data.data.value[0].title);
                        console.log("title: " + data.data.value[0].href);
                    });
            };

            loadBasicRequest("objects/info.matchingservice.dom.Howdoido.BasicRequest/" + +vm.id)
                .then(loadBasicTemplate)
                .then(loadBasicQuestionArray)
                .then(function(data) {
                    data.forEach(
                        function(entry) {
//                            console.log(entry.href);  
                            loadQuestionDetails(entry.href);
                        }

                    )
                });

        }

        /*LEAVE AS EXAMPLE!!*/

        //        function getQuestionsFromRequestStep2() {
        //            IsisObjectService.
        //            GetObjectDataPromise("objects/info.matchingservice.dom.Howdoido.BasicRequest/" + +vm.id) // request 1
        //                .then(
        //                    function(data) {
        //                        console.log(data.data.members.basicTemplate.links[0].href);
        //                        return $http.get(data.data.members.basicTemplate.links[0].href); //request 2
        //                    })
        //                .then(
        //                    function(data) {
        //                        console.log(data.data.value.href);
        //                        return $http.get(data.data.value.href); //request 3 
        //                    })
        //                .then(
        //                    function(data) {
        //                        console.log(data.data.members.basicQuestions.links);
        //                        data.data.members.basicQuestions.links
        //                            .forEach(
        //                                function(entry) {
        //                                    console.log(entry.href);
        //                                    $http.get(entry.href)
        //                                        .then(function(data) {
        //                                            console.log(data.data);
        //                                            console.log("title: " + data.data.value[0].title);
        //                                            console.log("title: " + data.data.value[0].href);
        //                                        })
        //                                }
        //                            )
        //                    }
        //                );
        //        }
        //
        //        function getQuestionsFromRequestStep1() {
        //            IsisObjectService.GetObjectDataPromise("objects/info.matchingservice.dom.Howdoido.BasicRequest/" + +vm.id).
        //            then(
        //                function(data) {
        //                    console.log(data.data.members.basicTemplate.links[0].href);
        //                    $http.get(data.data.members.basicTemplate.links[0].href).then(
        //                        function(data) {
        //                            console.log(data.data.value.href);
        //                            $http.get(data.data.value.href).then(
        //                                function(data) {
        //                                    console.log(data.data.members.basicQuestions.links);
        //                                    data.data.members.basicQuestions.links.forEach(function(entry) {
        //                                        console.log(entry.href);
        //                                        $http.get(entry.href).then(
        //                                            function(data) {
        //                                                console.log(data.data);
        //                                                console.log("title: " + data.data.value[0].title);
        //                                                console.log("title: " + data.data.value[0].href);
        //                                            }
        //                                        )
        //                                    })
        //                                }
        //                            )
        //                        }
        //                    )
        //                }
        //            )
        //        }

        /*END - LEAVE AS EXAMPLE!! - */

        function submitFeedbackFormForRatingExplanation(rating, explanation) {
            IsisObjectService.PerformFunctionOnObjectPromise("objects/info.matchingservice.dom.Howdoido.BasicRequest/" + vm.id, "createFeedback", "", "POST")
                .then(function(data) {
                    vm.answers = data.data.result.members.answers.links;
                    vm.answers.forEach(function(entry) {
                        console.log(entry.href);
                        $http.get(entry.href).then(
                            function(data) {
                                console.log(data.data.value);
                                data.data.value.forEach(function(entry) {
                                    console.log(entry.href);
                                    $http.get(entry.href).then(
                                        function(data) {
                                            var link = data.data.members.updateRating.links[0].href;
                                            link = link + "/invoke";
                                            console.log(link);
                                            var payload = {
                                                "rating": {
                                                    "value": rating
                                                }
                                            };
                                            $http.post(link, payload).then(
                                                function(data) {
                                                    console.log(data.data);
                                                    console.log(data.data.result.members.rating.value);
                                                }
                                            )
                                            var link2 = data.data.members.updateExplanation.links[0].href;
                                            link2 = link2 + "/invoke";
                                            console.log("link2: " + link2);
                                            var payload = {
                                                "explanation": {
                                                    "value": explanation
                                                }
                                            };
                                            $http.post(link2, payload).then(
                                                function(data) {
                                                    console.log(data.data);
                                                    console.log(data.data.result.members.explanation.value);
                                                }
                                            )
                                        }
                                    )
                                })
                            }
                        )
                    });
                });
        }

    }

})();