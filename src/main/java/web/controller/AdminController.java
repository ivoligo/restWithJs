package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import web.model.Role;
import web.model.User;
import web.service.RoleService;
import web.service.UserService;

import java.util.*;

@Controller
@RequestMapping("/admin")
public class AdminController {
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

    @GetMapping
    public String allUsers(Model model){
        List<User> listUsers = userService.getAllUser();
        model.addAttribute("users", listUsers);
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", user);

        return "/admin";
    }

    @PostMapping
    public String allPUsers(Model model){
        List<User> listUsers = userService.getAllUser();
        model.addAttribute("users", listUsers);
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", user);

        return "/admin";
    }


    @GetMapping("/add")
    public String addUserPage(User user){
        return "/admin";
    }

    @PostMapping("/add")
    public String addUser( @ModelAttribute("user") User user) {
        Set<Role> roleSet = new HashSet<>();
        for (Role role : user.getRoleSet()){
            role = roleService.findRoleByName(role.getRolesName());
            roleSet.add(role);
        }

        user.setRoleSet(roleSet);
        if (!userService.findUserByEmail(user.getEmail()).isPresent()) {
            userService.create(user);

            return "redirect:/admin";
        } else {
            return "/userExists";
        }
    }

    @GetMapping("/edit/{id}")
    public String editUserPage(@PathVariable("id") long id, Model model){
        User user = userService.findUserById(id);
        model.addAttribute("user", user);
        return "/admin";
    }

    @PostMapping("/edit/{id}")
    public String editUser(
            @ModelAttribute("user") User user
    )
    {

        Set<Role> roleSet = new HashSet<>();
        for (Role role: user.getRoleSet()) {
            System.out.println(role);
            role = roleService.findRoleByName(role.getRolesName());
            System.out.println(role);
            roleSet.add(role);
        }
        user.setRoleSet(roleSet);
        if(!userService.findUserByEmail(user.getEmail()).isPresent()
                || userService.findUserByEmail1(user.getEmail()).getId().equals(user.getId()))
        {
            userService.update(user);
            return "redirect:/admin";
        } else {
            return "/userExists";
        }
    }

    @GetMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") long id
    ){
        User user = userService.findUserById(id);
        userService.delete(user);
        return "redirect:/admin";
    }

    @RequestMapping(value="/logout" , method = RequestMethod.POST)
    public String logoutPage(
    )
    {
        return "/login";
    }

    @GetMapping("/user")
    public String userPage(Model model ){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", user);
        return "/admin";
    }
}
