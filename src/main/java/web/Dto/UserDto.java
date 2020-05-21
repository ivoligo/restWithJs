package web.Dto;

//import lombok.Getter;
//import lombok.Setter;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import web.model.Role;

import java.util.ArrayList;
import java.util.Set;


//@Getter в 8 java нельзя так? в других могу так делать? или нужен lombok отдельно?
//@Setter
//@Builder - что добавить?
public class UserDto {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String password;
    private String city;
    private Integer age;
//    private Set<Role> roleSet;
    private ArrayList<Role> role ;

    public UserDto(){
        
    }
    public UserDto(Long id, String name, String surname, String email, String password, String city, Integer age, ArrayList<Role> role) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.city = city;
        this.age = age;
        this.role = role;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public ArrayList<Role> getRole() {
        return role;
    }

    public void setRole(ArrayList<Role> role) {
        this.role = role;
    }
    public void addRole(Role roles){
        role.add(roles);
    }


//    public void setRole(ArrayList<String> role) {
//        this.role = role;
//    }
//
//    public ArrayList<String> getRole() {
//        return role;
//    }
}
