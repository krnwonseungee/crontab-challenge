$(document).ready(function(){
    controller.bindEvents();
})

Controller = function(){};
View = function(){};

Controller.prototype = {

    bindEvents: function(){
        var chosenMonths = [];
        $('.months label').mouseup(function(){
            var chosenMonthBtn = this;
            setTimeout(function(){
                controller.recordMonth(chosenMonthBtn);
            }, 50)
        })
    },

    cronVars: { chosenMonths: [] },

    createCronVarArr: function(){
        var cronVars = this.cronVars
        return [ cronVars.chosenMonths ]
    },

    recordMonth: function(chosenMonthBtn){
        var input = $(chosenMonthBtn).find('input')
        var inputVal = $(input).attr('value')
        var chosenMonths = this.cronVars.chosenMonths

        if ($(chosenMonthBtn).hasClass('active')) {
            chosenMonths.push(inputVal)
        }
        else {
            chosenMonths.splice(chosenMonths.indexOf(inputVal), 1)
        }
        view.renderCronString(this.createCronVarArr())
    }

}

View.prototype = {
    renderCronString: function(cronVarArr){
        cronstringSpan = $('#cronstring')[0]
        cronstringSpan.innerHTML = cronVarArr.toString()
    }
}

controller = new Controller();
view = new View();
