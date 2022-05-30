package ru.kata.spring.boot_security.demo.service;


import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;
import java.util.Set;

@Service
public interface RoleService {
    Role saveRole(Role role);
    Role getRoleByName(String role);
    Set<Role> getSetOfRoles(String[] roleNames);
    List<Role> getAllRoles();
}
