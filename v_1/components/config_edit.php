<p>Pas hier instellingen aan enzo</p>
<p class="flow-text"><i class="material-icons grey-text" style="font-size: 30px; top: 10px; position: relative;">folder_open</i> "{{profile.id}} - {{profile.post_title}}"</p>
<div class="row grey lighten-3" style="padding-bottom: 12px;">

    <!--                FORM-->
    <form class="col s12" id="configForm">

        <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix">person</i>
                <input id="fullname" type="text" class="" ng-model="profile.fullname">
                <label for="fullname">Je naam</label>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix">center_focus_strong</i>
                <input id="profileGoal" type="text" class="" ng-model="profile.profilegoal">
                <label for="profileGoal">Doel van dit profiel</label>
            </div>
        </div>

        <div class="row">
            <div class="col s12">
                <a class="btn-floating btn-large waves-effect waves-light green" ng-click="update(profile)"><i class="material-icons">save</i></a>
            </div>
        </div>

    </form>

    <!--          END      FORM-->

</div>