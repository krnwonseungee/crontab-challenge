$(document).ready(function(){
    controller.bindEvents();
})

Controller = function(){};
View = function(){};

Controller.prototype = {

    bindEvents: function(){
        var chosenMonths = [];
        $('label').mouseup(function(){
            var chosenBtn = this;
            setTimeout(function(){
                controller.recordChange(chosenBtn);
            }, 50)
        })
    },

    cronVars: { 'months': [], 'days-wk': [] },

    createCronVarArr: function(){
        var cronVars = this.cronVars
        var cronVarArr = [ cronVars['months'], cronVars['days-wk'] ]
        var cronStr = ""
        for (var i=0; i < cronVarArr.length; i++){
            if(cronVarArr[i].length == 0) {
                cronVarArr[i] = "*"
            }
            else {
                cronVarArr[i] = cronVarArr[i].toString();
            }
            cronStr += cronVarArr[i] + " "
        }
        return cronStr;
    },

    recordChange: function(chosenBtn){
        var inputVal = $(chosenBtn.children[0]).attr('value')
        var changedCategory = this.cronVars[ chosenBtn.parentElement.classList[1] ]

        if ($(chosenBtn).hasClass('active')) {
            changedCategory.push(inputVal)
        }
        else {
            changedCategory.splice(changedCategory.indexOf(inputVal), 1)
        }
        view.renderCronString(this.createCronVarArr())
    },


}

View.prototype = {
    renderCronString: function(cronVarArr){
        cronstringSpan = $('#cronstring')[0]
        cronstringSpan.innerHTML = cronVarArr.toString()
    }
}

controller = new Controller();
view = new View();
