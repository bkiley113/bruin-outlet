package com.finalproject.mangasite.service;

import com.finalproject.mangasite.items.Items;
import com.finalproject.mangasite.repository.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImplementation implements com.finalproject.mangasite.service.ItemService { // Interface name changed

    @Autowired
    private ItemRepo repo;

    @Override
    public Items saveItem(Items item) { // Method name and type changed
        return repo.save(item);
    }

    @Override
    public List<Items> findAllItems() { // Method name and type changed
        return repo.findAll();
    }

    @Override
    public Optional<Items> findById(int id) {
        return repo.findById(id);
    }

    @Override
    public Items updateItem(Items item) { // Method name and type changed
        return repo.save(item);
    }

    @Override
    public void deleteItem(Items item) { // Method name and type changed
        repo.delete(item);
    }

    @Override
    public List<Items> findByName(String name) { // Method names updated
        return repo.findByName(name);
    }

    @Override
    public List<Items> findByType(String type) { // Method names updated
        return repo.findByType(type); // Note the method name change in the repository
    }

}
