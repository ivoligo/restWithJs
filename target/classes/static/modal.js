
var $id = $('#id');
var $name = $('#name3');
var $surname = $('#surname3');
var $email = $('#email3');
var test = $('#test3');
var $password = $('#password3');
var $city = $('#city3');
var $age = $('#age3');
var $roleSet = $('#roleSet3');

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
                          <form>
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
                                                                    <td><input required type="text" name="data-name" id="name3"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><label>Фамилия</label></td>
                                                                    <td><input required type="text" name="surname" id="surname3" ></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>email/login</td>
                                                                    <td><input required type="email" name="email" id="email3" ></td>
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
                                                                        <select required name="roleSet3"  multiple >
                                                                          
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


    $('#button-edit-user').on('click', function()  {
        const id = this.getAttribute('data-id');
        // const login = this.getAttribute('data-email');
        // const password = this.getAttribute('data-password');
        // const name = this.getAttribute('data-name');
        // const roles = this.getAttribute('data-role');
        document.getElementById("id").value = id;
        // document.getElementById("email3").value = login;
        // document.getElementById("password3").value = password;
        // document.getElementById("name3").value = name;
        // document.getElementById("roleSet3").value = roles;


        $.ajax({

            url: '/rest/update/id',
            type: "PUT",
            async: true,
            cache: false,
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'JSON',
            data:JSON.stringify(data),
            success: function (updateUser) {
                if ($("#btn-save-edit").on('click', function() {
                    var data = {
                        id: $id.val(),
                        name: $name.val(),
                        surname: $surname.val(),
                        email: $email.val(),
                        password: $password.val(),
                        city: $city.val(),
                        age: $age.val(),
                        roleSet: $roleSet.val()
                    }
                    $("#update-user-table ").html(data);


                }))
                    $("#update-user-table ").html(updateUser);


            }

        })


        //открыть модальное окно с id="myModal"
        $('#modalEdit').modal('show');
    });

});

// function _deleteModal(options){
//     const editModal = document.createElement('div')
//     // editModal.classList.add('modal')
//     editModal.insertAdjacentHTML('afterbegin', `
//       <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="modalDeleteTitle" aria-hidden="true"  >
//                                             <div class="modal-dialog modal-dialog-centered" role="document">
//                                                 <div class="modal-content">
//                                                     <div class="modal-header">
//                                                         <h5 class="modal-title" id="modalDeleteTitle" >Удалить пользователя?</h5>
//                                                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                                                             <span aria-hidden="true">&times;</span>
//                                                         </button>
//                                                     </div>
//                                                     <div class="modal-body">
//                                                         <table >
//                                                             <tr>
//                                                                 <td><label>ID</label></td>
//                                                                 <td><input required type="text" name="id" th:value="${user.id} " disabled></td>
//                                                             </tr>
//                                                             <tr>
//                                                                 <td><label>Имя</label></td>
//                                                                 <td><input required type="text" name="name" th:value="${user.name} " disabled></td>
//                                                             </tr>
//
//                                                             <tr>
//                                                                 <td><label>Фамилия</label></td>
//                                                                 <td><input required type="text" name="surname" th:value="${user.surname}" disabled></td>
//                                                             </tr>
//
//                                                             <tr>
//                                                                 <td>email/login</td>
//                                                                 <td><input required type="email" name="email" th:value="${user.email}" disabled></td>
//                                                             </tr>
//
//                                                             <tr>
//                                                                 <td>Город</td>
//                                                                 <td><input required type="text" name="city" th:value="${user.city}" disabled></td>
//                                                             </tr>
//
//                                                             <tr>
//                                                                 <td>Возраст</td>
//                                                                 <td><input required type="number" name="age" th:value="${user.age}" disabled></td>
//                                                             </tr>
//
//                                                             <tr>
//                                                                 <td>Роли</td>
//                                                                 <td>
//                                                                     <select required name="roleSet" multiple >
//                                                                         <option th:each="role : ${user.roleSet}" th:text="${role.rolesName}" disabled>
//                                                                         </option>
//                                                                     </select>
//                                                                 </td>
//                                                             </tr>
//                                                         </table>
//
//
//                                                     </div>
//
//                                                     <div class="modal-footer" >
//                                                         <form th:action="@{/admin/delete/{id}(id=${user.id})}" method="get">
//                                                             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//                                                             <input type="submit" class="btn btn-primary"   value="Delete">
//                                                         </form>
//                                                     </div>
//
//                                                 </div>
//
//                                             </div>
//                                         </div>
//                                         <!--  // modal-->
//     `)
//     document.body.appendChild(editModal)
//     return editModal
// }
// //
// $(_deleteModal()).ready(function(){
//     //при нажатию на любую кнопку, имеющую класс .btn
//     $('.deleteUser').click(function() {
//         //открыть модальное окно с id="myModal"
//         $('#deleteEdit').modal('show');
//     });
// });