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
        vm.ratingFromSlider = ratingFromSlider;
        vm.disableSubmit = disableSubmit;
        vm.formSend = false;
        vm.goHome = goHome;
        
        
        /******* Navigation ****************************************************************************************/
        function goHome(){
            $location.path("/");
        }
        
        initController();

        /******* UI helpers ****************************************************************************************/

        function ratingFromSlider(question) {
            switch (question.sliderinput) {
                case 1:
                    question.ratinginput = "BAD";
                    break;

                case 2:
                    question.ratinginput = "POOR";
                    break;

                case 3:
                    question.ratinginput = "AVERAGE";
                    break;

                case 4:
                    question.ratinginput = "GOOD";
                    break;

                case 5:
                    question.ratinginput = "EXCELLENT";
                    break;

                default:
                    question.ratinginput = "ERROR";
            };
        }
        
        function disableSubmit(){
            var disable = false;
            vm.questions.forEach(
                function(question){
                    if (!question.ratinginput){
                        disable = true;
                    }
                    if (question.explanation && !question.explanationinput) {
                        disable = true;
                    }
                }
            );
            return disable;
        }
        
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

            var updateRating = function(linkToAnswer, rate, questionTitle) {
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
                            vm.results.push(result);
                            return result;
                        },
                        function(error) {
                            var error = "Error in rating of question " + questionTitle;
                            vm.results.push(error);
                        }
                    );
            };

            var updateExplanation = function(linkToAnswer, explanation, questionTitle) {
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
                            vm.results.push(result);
                            return result;
                        },
                        function(error) {
                            var msg = "Error in explanation of question " + questionTitle;
                            var error = {
                                error : true,
                                errorMsg : msg
                            };
                            vm.results.push(error);
                        }
                    );
            };

            vm.results = [];
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

                                                    updateRating(entry.href, question.ratinginput, entry.title);

                                                    //check if explanation is asked for
                                                    if (question.explanationinput) {

                                                        updateExplanation(entry.href, question.explanationinput, entry.title);

                                                    }

                                                }
                                            }
                                        );
                                }
                            );
                    }
                )
            .then(
                function(){
                    vm.formSend = true;
                }
            );
        }
    }
    
})();