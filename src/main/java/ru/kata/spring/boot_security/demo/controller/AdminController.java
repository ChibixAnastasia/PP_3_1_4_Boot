package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/")
public class AdminController {
    private final RoleService roleService;
    private final UserService userService;

    @Autowired
    public AdminController(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    public String currentUser (){
        return "admin";
    }

/*
    @GetMapping("/admin")
    public String getAllUsers(ModelMap model){
        User admin = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("nameAdmin",admin);
        model.addAttribute("userAll",userService.getAllUsers());
        return "admin";
    }
    @GetMapping("/adduser")
    public String addUser(Model model){
        User admin = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("roles",roleService.getAllRoles());
        model.addAttribute("user",new User());
        model.addAttribute("admin", admin);
        return "adduser";
    }
    @PostMapping("/adduser")
    public String createUser(@ModelAttribute("user")User user,
                             @RequestParam(value = "nameRoles")String[]nameRoles){
        user.setRoles(roleService.getSetOfRoles(nameRoles));
        userService.saveUser(user);
        return "redirect:/admin";
    }
    @PutMapping("/edit/{id}")
    public String updateUser(@ModelAttribute("user")User user,
                             @PathVariable("id")long id,
                             @RequestParam(value = "nameRoles")String[]nameRoles){
        user.setRoles(roleService.getSetOfRoles(nameRoles));
        userService.edit(user);
        return "redirect:/admin";
    }
    @DeleteMapping("delete/{id}")
    public String deleteUser(@PathVariable("id")long id){
        userService.removeUserById(id);
        return "redirect:/admin";
    }*/

}
