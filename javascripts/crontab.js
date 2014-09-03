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

        $('.days-wk label').mouseup(function(){
            var chosenDayOfWkBtn = this;
            setTimeout(function(){
                controller.recordDayOfWeek(chosenDayOfWkBtn);
            }, 50)
        })
    },

    cronVars: { chosenMonths: [], chosenDayOfWeek: [] },

    createCronVarArr: function(){
        var cronVars = this.cronVars
        var cronVarArr = [ cronVars.chosenMonths, cronVars.chosenDayOfWeek ]
        for (var i=0; i < cronVarArr.length; i++){
            // debugger
            if(cronVarArr[i].length == 0) {
                cronVarArr[i] = "*"
            }
            else {
                cronVarArr[i] = cronVarArr[i].toString();
            }
        }
        return cronVarArr;
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
    },

    recordDayOfWeek: function(chosenDayOfWkBtn){
        var input = $(chosenDayOfWkBtn).find('input')
        var inputVal = $(input).attr('value')
        var chosenDayOfWeek = this.cronVars.chosenDayOfWeek

        if ($(chosenDayOfWkBtn).hasClass('active')) {
            chosenDayOfWeek.push(inputVal)
        }
        else {
            chosenDayOfWeek.splice(chosenDayOfWeek.indexOf(inputVal), 1)
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
