var main = function () {
    $('#foundButton').hover(function () {
        $('#found_no').fadeToggle();
        $('#found_o').fadeToggle();
    },function () {
        $('#found_no').fadeToggle();
        $('#found_o').fadeToggle();
    }
    );

    $('#lostButton').hover(function () {
        $('#lost_o').fadeToggle();
        $('#lost_no').fadeToggle();
    },function () {
        $('#lost_o').fadeToggle();
        $('#lost_no').fadeToggle();
    }
    );
}

$(document).ready(main);