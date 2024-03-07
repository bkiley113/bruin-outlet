package com.finalproject.mangasite.service;

import com.finalproject.mangasite.items.Items;

import java.util.List;
import java.util.Optional;

public interface ItemService {

     Items saveItem(Items item);
     List<Items> findAllItems();
     Optional<Items> findById(int id);
     Items updateItem(Items item);
     void deleteItem(Items item);
     List<Items> findByName(String name);
     List<Items> findByType(String type);

}

