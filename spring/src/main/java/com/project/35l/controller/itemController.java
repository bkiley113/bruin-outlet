package com.finalproject.mangasite.controller;

import com.finalproject.mangasite.items.Items;
import com.finalproject.mangasite.service.ItemService;
import com.finalproject.mangasite.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;



import java.util.List;
import java.util.Optional;

@Controller
public class itemController { // Controller name changed to match naming convention

    @Autowired
    private ItemService service; // Service type updated

    @RequestMapping("/")
    public String welcome() {
        return "home";
    }

    @RequestMapping("/view")
    public String view() {
        return "i";
    }

    @ResponseBody
    @RequestMapping("/all")
    public List<Items> getAll() {
        return service.findAllItems(); //return all objects
    }

    @RequestMapping("/post")
    public String post() {
        return "post";
    }

    @ResponseBody
    @PostMapping("/a/add")
    public Items addItem(@RequestBody Items item) {
        return service.saveItem(item);
    }

    //individual page for each item
    @GetMapping("/item/{id}")
    public ResponseEntity<Items> getItem(@PathVariable int id){
        Optional<Items> item = service.findById(id);
        if(item.isEmpty()) return ResponseEntity.notFound().build(); //return 404 error better be done with front end team
        return ResponseEntity.ok(item.get()); //send response to i.html
    }

    @RequestMapping("/item/i/{id}")
    public String i(){
        return "i";
    }


    //aws s3 controller
    @RestController
    public class FileUploadController {

        private final StorageService storageService;

        public FileUploadController(StorageService storageService) {
            this.storageService = storageService;
        }

        @PostMapping("/upload")
        public String uploadFile(@RequestParam("file") MultipartFile file) {
            storageService.uploadFile(file);
            return "File uploaded successfully";
        }
    }



}
