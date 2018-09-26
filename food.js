
var budget = 50;
var remaining = 50;
var listTotal = 0;

$(function(){
    $(".budget").text("$" + budget);
})


$(function(){

   sum();

})

function sum(){
    var listItems = $("#grocery_list li");
    listTotal = 0;
    console.log("list:" + listItems);
    listItems.each(function(i, li) {
        console.log(li);
        var cost = parseFloat(($(li).find(".cost").text()).substring(1));
        listTotal += cost;

    });

    $(".sum").text("$" + listTotal.toFixed(2));
    $(".remaining").text("$" + (budget - listTotal));
}


function deleteCost(x){
    listTotal -= x;
     $(".sum").text("$" + listTotal.toFixed(2));
     $(".remaining").text("$" + (budget - listTotal).toFixed(2));
}


var delete_item = null;
/*For recipe ist  */
function recipeList() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

$(document).ready(function () {
        $('#grocery_form').bind('submit', function (e) {
            e.preventDefault();

            console.log("in");
            var $puts = $('#grocery_form :input');

            var vals = {};

            $puts.each(function() {
                vals[this.name] = $(this).val();
                console.log(vals[this.name]);
            });

            if( vals['item_category'] !== 'vegetarian' && vals['item_category'] !== 'vegan'){
                console.log( vals['item_category']);
                $li = $('<li class="meat"></li>');
                $a = $('<a href=""></a>');
                $a.append(vals["item_name"]);
                $a.append($('<span class="ui-btn ui-btn-inline ui-icon-recycle ui-btn-icon-notext">Icon only</span>'));
                $a.append($('<span class="ui-li-aside cost">$' + vals['price'] + '</span>'));
                $li.append($a);
                $li.append( $('<a href=""></a>').addClass("delete"));
            }

            else{
                $li = $('<li></li>');
                $a = $('<a href=""></a>')
                $a.append(vals["item_name"]);
                $a.append($('<span class="ui-li-aside cost">$' + vals['price'] + '</span>'));
                $li.append($a);
                $li.append($('<a href=""></a>').addClass("delete"));
            }

            $('#grocery_list').append($li).listview("refresh");

            sum();

            $.mobile.changePage('#list', {transition: 'slide'});


    });

});

$(document).ready(function () {
        $('#create_goal').bind('submit', function (e) {
            e.preventDefault();
            console.log("hello");

            var $inputs = $('#create_goal :input');

            var values = {};

            $inputs.each(function() {
                values[this.name] = $(this).val();
            });

            $li = $('<li></li>');
            $a = $('<a href="#goal3" class="ui-link-inherit"></a>');
            $a.append('<img src="newgoal.png" >')
            $a.append("<h3 class='ui-li-heading'>" + values['goal_title'] + "</h3>");
            $a.append('<p class="ui-li-desc"><img src="leaficon.png" height=17px width=17px>10</p>');

            $li.append($a);

            $('#myUL').append($li).listview("refresh");
            $.mobile.changePage('#goals', {transition: 'slide'});
    
        });
});


$("#swap_list").on('click', 'li', function(){

    var item = $(this).find('h3').text();
    var cost = $(this).find('span').text().substring(1);

    console.log($(this));

    console.log(item);
    $li = $('<li></li>');
    $a = $('<a href=""></a>')
    $a.append(item);
    $a.append($('<span class="ui-li-aside cost">$' + cost + '</span>'));
    $li.append($a);
    $li.append($('<a href=""></a>').addClass("delete"));
    $('#grocery_list').append($li).listview("refresh");
    sum();
 
    delete_item.remove();

});


$("#grocery_list").on('click', 'li span', function(){

    if( $(this).attr('class').includes('ui-icon-recycle') ){
        delete_item = $(this).parent().parent();
        $.mobile.changePage('#swap', {transition: 'slide'});
    }
    console.log(delete_item);

});


$("#grocery_list").on('click', 'li a', function(){

    if( $(this).attr('class').includes('delete') ){
        var x = parseFloat(($(this).parent().find(".cost").text()).substring(1));
        deleteCost(x);
        $(this).parent().remove();
    }
        
});



/*Use for filter bar  */
function animation(x) {
    x.classList.toggle("change");
    openNav();
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
