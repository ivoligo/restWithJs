package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import web.model.Role;
import web.model.User;
import web.service.RoleService;
import web.service.UserService;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/rest")
public class AdminRestController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public void setUserService(UserService userService){
        this.userService = userService;
    }

    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping(value = "/allUsers")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> listUsers = userService.getAllUser();
        return new ResponseEntity<>(listUsers, HttpStatus.OK);
    }

    @GetMapping("/getUser")
    public User getUser(
//            @PathVariable(value = "id") Long id
            ){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long id = user.getId();
        return userService.findUserById(id);
    }

    @PostMapping("/createUser")
//    public ResponseEntity<User> createUser(@RequestBody User user){
//        User createdUser = userService.create(user);
////        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentContextPath().path("/rest/{id}").buildAndExpand(createdUser.getId()).toUri()).body(createdUser);
//    return ResponseEntity.ok().body(createdUser);
    public User createUser(@RequestBody User user){
        return userService.create(user);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable("id") long id
    ){
        User user = userService.findUserById(id);
        userService.delete(user);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@Valid @RequestBody User user, @PathVariable long id){
//        user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        user = userService.findUserById(id);
        Set<Role> roleSet = new HashSet<>();
        for (Role role: user.getRoleSet()) {
            System.out.println(role);
            role = roleService.findRoleByName(role.getRolesName());
            System.out.println(role);
            roleSet.add(role);
        }
        user.setRoleSet(roleSet);
        user = userService.update(user);
        return new ResponseEntity<>(user , HttpStatus.OK);
    }


}
