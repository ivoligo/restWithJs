package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import web.Dto.RoleDto;
import web.Dto.UserDto;
import web.mappers.UserMapper;
import web.model.Role;
import web.model.User;
import web.service.RoleService;
import web.service.UserService;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
//
    @GetMapping("/getUserLogin")
    public User getUser(
//            @PathVariable(value = "id") Long id
            ){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long id = user.getId();
        return userService.findUserById(id);
    }

    @GetMapping("/getUser")
    public User getUserId(@RequestParam("id") Long id){

        return userService.findUserById(id);
    }

    @PostMapping("/createUser")
    public User createUser(@RequestBody User user){

        Set<Role> roleSet = new HashSet<>();
        for (Role role : user.getRoleSet()){
            role = roleService.findRoleByName(role.getRolesName());
            roleSet.add(role);
        }

        user.setRoleSet(roleSet);
        if (!userService.findUserByEmail(user.getEmail()).isPresent()) {
           user  = userService.create(user);
        }
        return user;
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@RequestParam("id") Long id){
        User user = userService.findUserById(id);
        userService.delete(user);
    }

    @PutMapping("/update")
    public User updateUser(
            @Valid @RequestBody User user){
        Set<Role> roleSet = new HashSet<>();
        for (Role role: user.getRoleSet()) {
            role = roleService.findRoleByName(role.getRolesName());
            roleSet.add(role);
        }
        user.setRoleSet(roleSet);
        user.setPassword(user.getPassword());
        user = userService.update(user);
        return user;
    }

//    @PutMapping("/update")
//    public User updateUser (@Valid @RequestBody UserDto userDto){
//        User user = new User();
//        user.setPassword(userDto.getPassword());
//        user.setId(userDto.getId());
//        user.setName(userDto.getName());
//        user.setSurname(userDto.getSurname());
//        user.setAge(userDto.getAge());
//        user.setCity(userDto.getCity());
//        user.setEmail(userDto.getEmail());
//        Set<Role> roleSet = new HashSet<>();
//        userDto.setRole(userDto.getRole());
//        for (String role : userDto.getRole()) {
//            Role role1 = roleService.findRoleByName(role);
//            roleSet.add(role1);
//        }
//        user.setRoleSet(roleSet);
//        userService.update(user);
//        return user;
//    }
}
