(function() {
    'use strict';

    angular
        .module('app')
        .controller('TemplatesController', TemplatesController);

    TemplatesController.$inject = ['$location', '$routeParams', 'CurrentUserService', 'ROService', '$http', '$rootScope'];

    function TemplatesController($location, $routeParams, CurrentUserService, ROService, $http, $rootScope) {

        var vm = this;
        vm.userdata = $rootScope.userdata;
        vm.resetNewTemplate = function resetNewTemplate() {
            vm.createTemplate = false;
            vm.numberOfNewQuestions = [0];
            vm.newTemplate = {};
            vm.newTemplate.question = {};
            vm.newTemplate.formType = {};
            vm.newTemplate.question[0] = "";
            vm.newTemplate.formType[0] = "";
            vm.subCategoriesList = [];
            vm.newSubCategoriesList = [];
        }

        allTopCategories().then(
            function(data) {
                vm.allTopCategories = data;
                // console.log(vm.allCategories);
            }
        );

        initController();

        /****************************************************************************************************************************/
        /****************************************************************************************************************************/
        /****************************************************************************************************************************/


        function initController() {
            // get userdata from rootScope if available
            vm.userdata = $rootScope.globals.currentUser.userdata;
            // else get them through CurrentUserService
            if (vm.userdata == null) {
                CurrentUserService.GetData()
                    .then(
                        function(data) {
                            vm.userdata = data.data.user;
                            $rootScope.globals.currentUser.userdata = data.data.user;
                        }
                    );
            }
            vm.resetNewTemplate();
        }

        function resetUserData() {
            CurrentUserService.GetData()
                .then(
                    function(data) {
                        vm.userdata = data.data.user;
                        $rootScope.globals.currentUser.userdata = data.data.user;
                        return data.data.user;
                    },
                    function(data) {
                        vm.userdata = data.data.user;
                        $rootScope.globals.currentUser.userdata = data.data.user;
                        return data.data.user;
                    }
                );
        }

        function allTopCategories() {
            return $http.post("http://localhost:8080/restful/services/Api/actions/allTopCategories/invoke")
                .then(function(data) {
                    //                console.log(data.data.result.value);
                    return data.data.result.value;
                });
        }

        vm.addNewQuestion = function addNewQuestion() {
            vm.newTemplate.question[vm.numberOfNewQuestions.length] = "";
            vm.numberOfNewQuestions.push(vm.numberOfNewQuestions.length);
        }

        vm.deleteLastQuestion = function deleteLastQuestion() {
            vm.newTemplate.question[vm.numberOfNewQuestions.length - 1] = "";
            vm.newTemplate.formType[vm.numberOfNewQuestions.length - 1] = "";
            vm.numberOfNewQuestions.pop(vm.numberOfNewQuestions.length - 1);
        }

        vm.copyTemplate = function copyTemplate(URI) {
            ROService.PerformFunction(URI + "/actions/duplicateBasicTemplate", "", "POST")
                .then(function(data) {
                    resetUserData();
                });
        }

        vm.subCategories = function subCategories(categoryHref) {
            vm.subCategoriesList = [];
            ROService.GetCollection(categoryHref + "/collections/allDescendantCategories")
                .then(function(data) {
                    data.forEach(
                        function(element) {
                            ROService.GetRO(element)
                                .then(
                                    function(data) {
                                        var subCat = {
                                            "title": data.title,
                                            "href": element
                                        };
                                        vm.subCategoriesList.push(subCat);
                                        return data.title;
                                    }
                                );
                        }
                    );
                });
        }

        vm.newSubCategories = function subCategories(categoryHref) {
            vm.newSubCategoriesList = [];
            ROService.GetCollection(categoryHref + "/collections/allDescendantCategories")
                .then(function(data) {
                    data.forEach(
                        function(element) {
                            ROService.GetRO(element)
                                .then(
                                    function(data) {
                                        var subCat = {
                                            "title": data.title,
                                            "href": element
                                        };
                                        vm.newSubCategoriesList.push(subCat);
                                        return data.title;
                                    }
                                );
                        }
                    );
                });
        }

        /****************************************************************************************************************************/
        /****************************************************************************************************************************/
        /****************************************************************************************************************************/



        vm.submitTemplatesForm = function submitTemplatesForm() {
                vm.userdata.templates.forEach(
                    function(template) {

                        //Prepare function vars
                        var deleteTemplate = function() {
                            var payLoadConfirm = {
                                "boolean": "true"
                            };
                            return ROService.PerformFunction(template.URI + "/actions/deleteBasicTemplate", payLoadConfirm, "POST")
                                .then(function(data) {
                                    if (data.success == false) {
                                        alert("Problem deleting template; please try again");
                                    }
                                    resetUserData();
                                });
                        };

                        var updateName = function() {
                            var payLoadName = {
                                "string": template.newName
                            };
                            return ROService.PerformFunction(template.URI + "/actions/updateName", payLoadName, "POST")
                                .then(
                                    function(data) {
                                        if (data.success == false) {
                                            alert("Problem updating name; please try again");
                                        }
                                        template.newName = "";
                                        resetUserData();
                                    }
                                );
                        };

                        var updateCategory = function() {
                            var payLoadCategory = {
                                "basicCategory": {
                                    "href": template.newCategory
                                }
                            };
                            return ROService.PerformFunction(template.URI + "/actions/updateCategory", payLoadCategory, "POST")
                                .then(
                                    function(data) {
                                        if (data.success == false) {
                                            alert("Problem updating category; please try again");
                                        }
                                        template.newCategory = null;
                                        resetUserData();
                                    }
                                );
                        };

                        var updateCategoryWithSubCategory = function() {
                            var payLoadCategory = {
                                "basicCategory": {
                                    "href": template.newSubCategory.href
                                }
                            };
                            return ROService.PerformFunction(template.URI + "/actions/updateCategory", payLoadCategory, "POST")
                                .then(
                                    function(data) {
                                        if (data.success == false) {
                                            alert("Problem updating sub category; please try again");
                                        }
                                        template.newSubCategory = null;
                                        resetUserData();
                                    }
                                );
                        };

                        var updateQuestion = function(href, payload) {
                            ROService.PerformFunction(href, payload, "POST")
                                .then(
                                    function(data) {
                                        if (data.success == false) {
                                            alert("Problem updating question; please try again");
                                        }
                                    }
                                );
                        };

                        var updateFormType = function(href, payload) {
                            ROService.PerformFunction(href, payload, "POST")
                                .then(
                                    function(data) {
                                        if (data.success == false) {
                                            alert("Problem updating formType; please try again");
                                        }
                                        resetUserData();
                                    }
                                );
                        };

                        var deleteQuestion = function(href) {
                            var payload = {
                                "boolean": "true"
                            };
                            ROService.PerformFunction(href, payload, "POST")
                                .then(
                                    function(data) {
                                        if (data.success == false) {
                                            alert("Problem deleting question; please try again");
                                        }
                                        resetUserData();
                                    }
                                );
                        }

                        var addQuestion = function() {
                            var payLoad = {
                                "question": template.newQuestion.question,
                                "formType": template.newQuestion.newFormType
                            };
                            return ROService.PerformFunction(template.URI + "/actions/createBasicQuestion", payLoad, "POST")
                                .then(
                                    function(data) {
                                        if (data.success == false) {
                                            alert("Problem adding question; please try again");
                                        }
                                        template.newQuestion = "";
                                        resetUserData();
                                    }
                                );
                        };

                        // Actual performing of actions for DELETE
                        if (template.delete) {
                            deleteTemplate();
                        }

                        // Actual performing of actions for EDIT
                        if (template.edit) {

                            updateName();

                            if (template.hasOwnProperty("newSubCategory") && template.newSubCategory != null) {
                                if (template.newSubCategory.hasOwnProperty("href")) {
                                    updateCategoryWithSubCategory();
                                }
                            } else {
                                if (template.hasOwnProperty("newCategory") && template.newCategory != null) {
                                    updateCategory();
                                }
                            }

                            if (template.addQuestion && template.newQuestion.question != "" && template.newQuestion.newFormType != "") {
                                addQuestion();
                            }

                            //check if not all question are deleted
                            var noQuestionsLeft = true;
                            template.questions.forEach(
                                function(question) {
                                    if (!question.delete) {
                                        noQuestionsLeft = false;
                                    }
                                }
                            );
                            if (noQuestionsLeft && !template.addQuestion) {
                                alert("You have deleted all questions of the template. Unless you add one the template is quite useless....");
                            }

                            template.questions.forEach(
                                function(question) {
                                    console.log(question);
                                    //////////////////////////////////////////////////////////
                                    // Delete question if flagged with question.delete == true
                                    if (question.delete) {
                                        deleteQuestion("objects/info.matchingservice.dom.Howdoido.BasicQuestion/" + question.id + "/actions/deleteQuestion");
                                    } else
                                    /////////////////////////////////////////////////////////    
                                    // Else update Question    
                                    {
                                        /////////////////////////////////////////////////////
                                        // Update question text
                                        var payLoadQuestion = {
                                            "question": question.question
                                        };
                                        updateQuestion("objects/info.matchingservice.dom.Howdoido.BasicQuestion/" + question.id + "/actions/updateQuestion", payLoadQuestion);
                                        ////////////////////////////////////////////////////
                                        // Update formType if altered (not "")
                                        if (question.newFormType != "") {
                                            var payLoadFormType = {
                                                "formType": question.newFormType
                                            };
                                            updateFormType("objects/info.matchingservice.dom.Howdoido.BasicQuestion/" + question.id + "/actions/updateBasicFormType", payLoadFormType);
                                        }
                                    }
                                }
                            );
                        }
                    }
                );
            }
            /****************************************************************************************************************************/
            /****************************************************************************************************************************/
            /****************************************************************************************************************************/

        vm.submitNewTemplateForm = function submitNewTemplateForm() {
            console.log("submitNewTemplateForm: ");

            //Prepare function vars
            if (vm.newTemplate.subCategory != null) {
                var payLoad = {
                    "name": vm.newTemplate.name,
                    "category": {
                        "href": vm.newTemplate.subCategory.href
                    }
                };
            } else {
                var payLoad = {
                    "name": vm.newTemplate.name,
                    "category": {
                        "href": vm.newTemplate.category.href
                    }
                };
            }


            var createNewTemplate = function() {
                return ROService
                    .PerformFunction(
                        "http://localhost:8080/restful/objects/info.matchingservice.dom.Howdoido.BasicUser/0/actions/createTemplate",
                        payLoad, "POST")
                    .then(
                        function(data) {
                            //                            console.log("create new template ");
                            //                            console.log(data);
                            if (data.success == false) {
                                alert("Problem creating new template; please try again");
                            }
                            return data;
                        }
                    );
            };

            var createNewQuestion = function(templateHref, question, formType) {
                var payLoad = {
                    "question": question,
                    "formType": formType
                };
                return ROService
                    .PerformFunction(templateHref + "/actions/createBasicQuestion", payLoad, "POST")
                    .then(function(data) {
                        if (data.success == false) {
                            alert("Problem creating a question; please check and edit your template");
                        }
                        return data;
                    });
            }

            // Actual performing of actions for CREATE
            createNewTemplate()
                .then(
                    function(data) {
                        //                    console.log("after create new template");
                        //                    console.log(data.data.result.links[0].href);
                        var hrefToNewTemplate = data.data.result.links[0].href;
                        var questions = vm.newTemplate.question;
                        var formTypes = vm.newTemplate.formType;
                        var noQuestionRequestMade = true;
                        for (var key in vm.newTemplate.question) {
                            console.log(key);
                            //Test if questions can be made and if so send request to backend
                            if (questions[key] != "" && formTypes[key] != "") {
                                createNewQuestion(hrefToNewTemplate, questions[key], formTypes[key])
                                    .then(function() {
                                        //reset userdata
                                        resetUserData();
                                    });
                                noQuestionRequestMade = false;
                            }

                            //Test if there are questions made for this template. Otherwise alert user
                            if (noQuestionRequestMade) {
                                resetUserData();
                                alert("No question was made; please edit your template.");
                            }
                        }
                        //reset form
                        vm.resetNewTemplate();
                    });
        }
    }

})();