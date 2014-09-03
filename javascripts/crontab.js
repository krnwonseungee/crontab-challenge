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
        console.log(chosenMonths)
    }

}

View.prototype = {
    renderCronString: function(){
        $('#cronstring').innerHTML('')
    }
}

controller = new Controller();
view = new View();
