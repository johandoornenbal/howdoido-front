(function() {
    'use strict';

    angular
        .module('app')
        .controller('FeedbackController', FeedbackController);

    FeedbackController.$inject = ['$location', '$routeParams', 'IsisObjectService', 'ROService', '$http'];

    function FeedbackController($location, $routeParams, IsisObjectService, ROService, $http) {

        var vm = this;
        vm.questions = [];
        vm.answers = [];
        vm.id = $routeParams.feedbackUrl.replace("L_", "");

        initController();

        /****************************************************************************************************************************/
        /****************************************************************************************************************************/
        /****************************************************************************************************************************/


        function initController() {
            getQuestionsFromRequest();
        }


        /****************************************************************************************************************************/
        /****************************************************************************************************************************/
        /****************************************************************************************************************************/

        /*
            Following pattern of http://solutionoptimist.com/2013/12/27/javascript-promise-chains-2/
            Refactoring Step1 and step2 below
        */
        function getQuestionsFromRequest() {
            
            var getTemplateLinkFromRequest = function(requestURI) {
                return ROService
                    .GetRO(requestURI) // request 1 returns reference to template
                    .then(
                        function(data) {
                            // response handler 1
                            // console.log(data);
                            // console.log(data.basicTemplate.value.href); 
                            return data.basicTemplate.value.href;
                        });
            };

            var getQuestionCollectionLinkFromTemplate = function(templateUrl) {
                return ROService
                    .GetRO(templateUrl) //request 2 returns a link to question collection on template
                    .then(
                        function(data) {
                            // response handler 2
                            // console.log(data.data);
                            // console.log("handler 2: ");
                            // console.log(data.basicQuestions.href); 
                            return data.basicQuestions.href;
                        }
                    );
            };
            
            var getQuestionLinksFromQuestionCollection = function(collectionLink) {
                return ROService
                    .GetCollection(collectionLink)
                    .then(
                        function(data) {
                            // response handler 3
                            // console.log("handler 3: ");
                            // console.log(data); 
                            return data;
                        }
                    );
            };

            var getQuestionDetails = function(questionUrl) {
                return ROService
                    .GetRO(questionUrl)
                    .then(function(data) {
                        // console.log(data);
                        var formType = data.basicFormType.value;
                        var question = data.basicQuestion.value;
                        var questionId = data.questionId.value;
                        var number = vm.questions.length + 1;
                        if (formType == "Rating With Explanation") {
                            vm.questions.push({
                                "question": question,
                                "questionId": questionId,
                                "explanation": true,
                                "number": number
                            });
                        } else {
                            vm.questions.push({
                                "question": question,
                                "questionId": questionId,
                                "explanation": false,
                                "number": number
                            });
                        }

                    });
            };

            
            getTemplateLinkFromRequest("objects/info.matchingservice.dom.Howdoido.BasicRequest/" + vm.id)
                .then(getQuestionCollectionLinkFromTemplate)
                .then(getQuestionLinksFromQuestionCollection)
                .then(
                    function(data) {
                        // console.log(data.value);
                        data.forEach(
                            function(entry) {
                                // console.log(entry);  
                                getQuestionDetails(entry);
                            }

                        )
                    });

        }

        /****************************************************************************************************************************/
        /****************************************************************************************************************************/
        /****************************************************************************************************************************/


        vm.submitFeedbackFormForRatingExplanation = function submitFeedbackFormForRatingExplanation() {

            var createFeedback = function(requestURI) {
                return IsisObjectService
                    //request returns link to answer collection
                    .PerformFunctionOnObjectPromise(requestURI, "createFeedback", "", "POST")
                    .then(
                        function(data) {
                            // console.log(data.data);
                            var linkToAnswerCollection = data.data.result.members.answers.links[0].href;
                            console.log(linkToAnswerCollection);
                            return linkToAnswerCollection;
                        }
                    );
            };

            var getAnswers = function(linkToAnswerCollection) {
                return $http
                    // returns an array of objects containing links to answers
                    .get(linkToAnswerCollection)
                    .then(
                        function(data) {
                            // console.log(data.data.value);
                            var objectsContainingHrefsToAnswers = data.data.value;
                            return (objectsContainingHrefsToAnswers);
                        }
                    );
            };

            var updateRating = function(linkToAnswer, rate) {
                var link = linkToAnswer + "/actions/updateRating/invoke"
                var payLoad = {
                        "rating": {
                            "value": rate
                        }
                    }
                    // updates rating of answer and returns result
                return $http
                    .post(link, payLoad)
                    .then(
                        function(data) {
                            console.log(data.data);
                            var result = data.data.result.members.rating.value;
                            console.log(data.data.result.members.rating.value);
                            return result;
                        }
                    );
            };

            var updateExplanation = function(linkToAnswer, explanation) {
                var link = linkToAnswer + "/actions/updateExplanation/invoke"
                var payLoad = {
                        "explanation": {
                            "value": explanation
                        }
                    }
                    // updates rating of explanation and returns result
                return $http
                    .post(link, payLoad)
                    .then(
                        function(data) {
                            console.log(data.data);
                            var result = data.data.result.members.explanation.value;
                            console.log(result);
                            return result;
                        }
                    );
            };

            createFeedback("objects/info.matchingservice.dom.Howdoido.BasicRequest/" + vm.id)
                .then(getAnswers)
                .then(
                    function(data) {
                        console.log(data);
                        data
                            .forEach(
                                function(entry) {
                                    vm.questions
                                        .forEach(
                                            function(question) {
                                                //get the right question
                                                if (entry.title == question.questionId) {

                                                    updateRating(entry.href, question.ratinginput);
                                                    
                                                    //check if explanation is asked for
                                                    if (question.explanation) {
                                                        
                                                        updateExplanation(entry.href, question.explanationinput);
                                                        
                                                    }

                                                }
                                            }
                                        );
                                }
                            );
                    }
                );
        }
    }

})();