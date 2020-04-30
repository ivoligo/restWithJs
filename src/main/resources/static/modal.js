
function _createModal(options){
    const editModal = document.createElement('div')
    // editModal.classList.add('modal')
    editModal.insertAdjacentHTML('afterbegin', `
     <div class="modal fade " tabindex="-1" role="dialog" aria-labelledby="modalEditTitle" aria-hidden="true" id = "modalEdit" >
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content" >

                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="modalEditTitle" >Изменение данных пользователя</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                          <form >
                                                 <div class = "modal-body">
                                                 <p>здесь будет форма изменения пользователя</p>
                                              
                                                 <table id="update-user-table">
                                                         <thead class="thead-dark">
                                                            <div class="alert alert-dark">Редактирование</div>
                                                          </thead>
                                                 <tbody>
                                                        
                                                                <tr>
                                                                    <td><label>ID</label></td>
                                                                    <td> <input required type="text" name="id" id="id" disabled ></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><label>Имя</label></td>
                                                                    <td><input required type="text" name="name" id="name3"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><label>Фамилия</label></td>
                                                                    <td><input required type="text" name="surname" id="surname3" ></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>email/login</td>
                                                                    <td><input required type="email" name="email3" id="email3" ></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Пароль</td>
                                                                    <td><input required type="password" name="password" id="password3" ></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Город</td>
                                                                    <td><input required type="text" name="city" id="city3" ></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Возраст</td>
                                                                    <td><input required type="number" name="age" id="age3" ></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Роли</td>
                                                                    <td>
                                                                        <select required name="roleSet3"  multiple id="roleSet3">
                                                               
                                                                            <option value="user">user</option>
                                                                            <option value="admin">admin</option>
                                                                            <option value="otherUser">otherUser</option>
                                                                            <option value="webUser">webUser</option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
 
    
                                                     </tbody>
                                                       
                                                                
                                                  </table>
                                                </div>
                                                <div class="modal-footer">
                                                  <button type="button" class="btn btn-secondary editSave" data-dismiss="modal">Close</button>
                                                   <input type="submit" class="btn btn-primary" id="btn-save-edit" value="Save Change">
                                                </div>
</form>
                                            </div>
                                        </div>
    `)
    document.body.appendChild(editModal)
    return editModal
}
//
$(_createModal()).ready(function(){

    // $('.editUser').on('click', function()  {
        $(document).on('click', '#button-edit-user', function () {
        const id = this.getAttribute('data-id');
        document.getElementById("id").value = id;

        // get
        let user = null
        $.ajax({
            type: 'GET',
            url: "/rest/getUser?id="+id,
            // url:'/rest/getUser?id="+${id}',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // data:JSON.stringify(data),
            async: true,
            cache: false,
            dataType: 'JSON',

            success: function (data) {
                user = data;
                document.getElementById("email3").value = user.email;
                document.getElementById("name3").value = user.name;
                document.getElementById("surname3").value = user.surname;
                document.getElementById("password3").value = user.password;
                document.getElementById("city3").value = user.city;
                document.getElementById("age3").value = user.age;
                document.getElementById("roleSet3").value = user.roleSet;
                for ( var role of user.roleSet){
                        // document.getElementById("roleSet3").value = role.rolesName;
                    if (role.rolesName === "admin"){
                        roleSet3.options[1].selected = true;
                    }
                    if (role.rolesName === "user"){
                        roleSet3.options[0].selected = true;
                    }
                    if (role.rolesName === "otherUser"){
                        roleSet3.options[2].selected = true;
                    }
                    if (role.rolesName === "webUser"){
                        roleSet3.options[3].selected = true;
                    }
                }
            }});

        $('#modalEdit').modal('show');
    });

});




$(document).on('click', '#btn-save-edit', function () {
    const id = document.getElementById("id").value;
    const email =   document.getElementById("email3").value;
    const name = document.getElementById("name3").value;
    const surname = document.getElementById("surname3").value;
    const password = document.getElementById("password3").value;
    const city = document.getElementById("city3").value;
    const age = document.getElementById("age3").value;
    // let roleSet = [ document.getElementById("roleSet3") ]
    var $roleSet3 = $('#roleSet3');
    var user = {
        id : id,
        email : email,
        name : name,
        surname : surname,
        password : password,
        city: city,
        age : age,
        roleSet: $roleSet3.val()
        // roleSet: [roleSet]

    }

    $.ajax({
        url: '/rest/update',
        type: "PUT",
        async: true,
        cache: false,
        contentType: 'application/json',

        dataType: 'JSON',
        data:JSON.stringify(user),
        success: function (data) {
            user = data;
            getAllUsers();
        }
    })

})

$(document).on('click', '#button-deleteModal-user', function () {
    const id = this.getAttribute('data-id');
    $.ajax({
        url: "/rest/delete?id="+id,
        type: "DELETE",
        async: true,
        cache: false,
        contentType: 'application/json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'JSON',
        // data:JSON.stringify(user),
        success: function (data) {

            getAllUsers();
            alert("Пользователь c (id: "  + id +") удален");
        }

    })



})

function getAllUsers(){

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
            for (var i = 0; i < listUsers.length; i++) {
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
                htmlTable += ('<button id ="button-edit-user" type="button" class="btn btn-primary editUser" data-toggle="modal" data-target="#modalEdit"\n' +
                    '            value="Изменить" style="float:left" data-id="'+ listUsers[i].id +'" >изменить</button> ');

                htmlTable += ('<button id ="button-deleteModal-user" type="button" class="btn btn-secondary deleteUser" data-toggle="modal" data-target="#modalDelete"\n' +
                    '            value="Удалить" style="float:left" data-id="'+ listUsers[i].id +'">Удалить</button>');
                htmlTable+= ('<td>');
                htmlTable += ('</tr>');

            }
            $("#all-user-table tbody").html(htmlTable);

        }

    });
}
