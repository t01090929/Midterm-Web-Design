var main = function () {
    $('#lostButton').click(function () {
        $('#left_page').animate({
            left: "0px"
        }, 200);
    });

    $('#text_in_left').click(function () {
        $('#left_page').animate({
            left: "-100%"
        }, 200);
    });

    $('#foundButton').click(function () {
        $('#right_page').animate({
            right: "0px"
        }, 200);
    });

    $('#text_in_right').click(function () {
        $('#right_page').animate({
            right: "-100%"
        }, 200);
    });

}

$(document).ready(main);