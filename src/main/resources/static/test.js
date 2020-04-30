
$.ajax({
    type: 'GET',
    url: "/rest/allUsers",
    contentType: 'application/json;',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    async: true,
    cache: false,
    dataType: 'JSON',
    success: function (listUsers) {
        var htmlTable = "";
        // $("#all-user-table tbody").empty();
        for (var i = 0; i < listUsers.length; i++) {
            // var $dataId = listUsers[i].id;
            htmlTable += ('<tr id="#list">')
            htmlTable += ('<td id="#tableId">' + listUsers[i].id + '</td>');

            htmlTable += ('<td id="#tableEmail">' + listUsers[i].email + '</td>');
            htmlTable += ('<td id="#tableName">' + listUsers[i].name + '</td>');
            htmlTable += ('<td id="#tableSurname">' + listUsers[i].surname + '</td>');
            htmlTable += ('<td id="#tableCity">' + listUsers[i].city + '</td>');
            htmlTable += ('<td id="#tableAge">' + listUsers[i].age + '</td>');
            htmlTable += ('<td>');
            for ( var role of listUsers[i].roleSet){
                htmlTable += ('<li >' + role.rolesName + '</li>')
            }
            htmlTable += ( '</td>');
            htmlTable+= ('<td>');
            htmlTable += ('<button id ="button-edit-user" type="button" class="btn btn-primary editUser" data-toggle="modal" data-target="#modalEdit"    \n' +
                '            value="Изменить" style="float:left" data-id="'+ listUsers[i].id +'" >изменить</button> ');

            htmlTable += ('<button id ="button-deleteModal-user" type="button" class="btn btn-secondary deleteUser" data-toggle="modal" data-target="#modalDelete"\n' +
                '            value="Удалить" style="float:left" data-id="'+ listUsers[i].id +'">Удалить</button>');
            htmlTable+= ('<td>');
            htmlTable += ('</tr>');

        }
        $("#all-user-table tbody").html(htmlTable);

    }

});


// $(document).on('click', '#btn-login', function () {


$.ajax({
    type: 'GET',
    // url: "/rest/getUser?id="+id,
    url: "rest/getUserLogin",
    contentType: 'application/json',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    async: true,
    cache: false,
    dataType: 'JSON',
    success: function (data) {
        var getUser = data;
        var htmlUserTable = "";
        htmlUserTable += ('<tr>');
        htmlUserTable += ('<td >' + getUser.id + '</td>');
        htmlUserTable += ('<td >' + getUser.email + '</td>');
        htmlUserTable += ('<td >' + getUser.name + '</td>');
        htmlUserTable += ('<td >' + getUser.surname + '</td>');
        htmlUserTable += ('<td >' + getUser.city + '</td>');
        htmlUserTable += ('<td >' + getUser.age + '</td>');
        htmlUserTable += ('<td>');
        // for (var role of Object.entries( getUser.roleSet)) {
        for ( var role of getUser.roleSet){
                htmlUserTable += ('<li >' + role.rolesName + '</li>')
        }
        htmlUserTable += ( '</td>');
        htmlUserTable +=('</tr>');
        $("#user-table tbody").html(htmlUserTable);

    }
});
// });

var $name= $('#name1');
var $surname = $('#surname');
var $email = $('#email');
var test = $('#test');
var $password = $('#password');
var $city = $('#city');
var $age = $('#age');
var $roleSet = $('#roleSet');



// $('#newuser-add').on('click', function() {
$(document).on('click', '#newuser-add', function () {

    var user = {
        name: $name.val(),
        surname: $surname.val(),
        email: $email.val(),
        password: $password.val(),
        city: $city.val(),
        age: $age.val(),
        roleSet: $roleSet.val()
    }
    // let user = null
    $.ajax({
    url: '/rest/createUser',
    type: "POST",
    async: true,
    cache: false,
    contentType: 'application/json',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    // dataType: 'JSON',
    data:JSON.stringify(user),
    success: function () {

        $("#create-user-table tbody").html(user);


    }

})

});

