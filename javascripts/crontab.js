$(document).ready(function(){
    var selectedMonths = [];
    controller.bindEvents();
})

Controller = function(){};
View = function(){};

Controller.prototype = {

    bindEvents: function bindEvents(){
        $('.months label').mouseup(function(){
            var chosenMonthBtn = this;
            setTimeout(function(){
                controller.recordMonth(chosenMonthBtn);
            }, 50)
        })
    },

    recordMonth: function(chosenMonthBtn){
        if ($(chosenMonthBtn).hasClass('active')) {
            var input = $(chosenMonthBtn).find('input')
            var inputVal = $(input).attr('value')
            console.log(inputVal)
        }
        else {
            console.log('poo')
        }
    }

}


controller = new Controller();
view = new View();
