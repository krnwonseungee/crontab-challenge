$(document).ready(function(){
    controller.bindEvents();
})

Controller = function(){};
View = function(){};

Controller.prototype = {

    bindEvents: function(){
        this.bindButtons();
        this.bindCheckboxes();
    },

    bindButtons: function(){
        $('label').mouseup(function(){
            var chosenBtn = this;
            setTimeout(function(){
                controller.recordClickedButtonChange(chosenBtn);
            }, 50)
        })
    },

    bindCheckboxes: function(){
        controller.linkDailyCheckboxes();

        $('input[type="checkbox"]').click(function(){
            var checkbox = this;
            var parentDiv = $(this).parents()[1]
            var changedCategory = $(parentDiv).find('.btn-group')[0].classList[1]
            controller.updateWidgetAfterCheckboxChange(checkbox, parentDiv, changedCategory);

            view.renderCronString(controller.createCronVarArr())
        })
    },

    linkDailyCheckboxes: function(){
        $('.daily1 input').click(function(){
            $('.daily2 input').click()
        })
    },

    updateWidgetAfterCheckboxChange: function(checkbox, parentDiv, changedCategory){
            var allLabelsArr = $(parentDiv).find('.btn-primary')
            controller.clickAllOrNoButtons(checkbox, allLabelsArr);
            checkbox.checked == true ? controller.cronVars[changedCategory] = ['*'] : controller.cronVars[changedCategory] = ['?']
            // controller.cronVars[changedCategory] = ['*']
    },

    clickAllOrNoButtons: function(checkbox, allLabelsArr){
        console.log(allLabelsArr.length)
        for (var i=0; i < allLabelsArr.length; i++){
            if ( (allLabelsArr[i].classList.length == 2) == checkbox.checked ){
                allLabelsArr[i].click();
            }
        }
    },

    cronVars: { 'months': [], 'days-wk': [], 'days-month': [], 'hours': [], 'minutes': [], 'seconds': [] },

    createCronVarArr: function(){
        var cronVars = this.cronVars
        console.log(cronVars)
        var cronVarArr = [ cronVars['seconds'], cronVars['minutes'], cronVars['hours'], cronVars['days-month'], cronVars['months'], cronVars['days-wk'] ]
        var cronStr = ""
        for (var i=0; i < cronVarArr.length; i++){
            (cronVarArr[i].length == 0) ? (cronVarArr[i] = "?") : (cronVarArr[i] = cronVarArr[i].sort(function(a,b) { return a - b; }).toString())
            cronStr += cronVarArr[i] + " "
        }
        return cronStr;
    },

    recordClickedButtonChange: function(chosenBtn){
        var inputVal = $(chosenBtn.children[0]).attr('value')
        var changedCategory = this.cronVars[ chosenBtn.parentElement.classList[1] ]

        if ($(chosenBtn).hasClass('active')) {
            if (changedCategory.indexOf('*') != -1){
                changedCategory.splice(changedCategory.indexOf('*'), 1)
            }
            changedCategory.push(inputVal)
        }
        else {
            changedCategory.splice(changedCategory.indexOf(inputVal), 1)
        }
        view.renderCronString(this.createCronVarArr())
    }

}

View.prototype = {
    renderCronString: function(cronVarArr){
        cronstringInput = $('input[name="cronstr"]')[0]
        cronstringInput.value = cronVarArr.toString()
    }
}

controller = new Controller();
view = new View();
