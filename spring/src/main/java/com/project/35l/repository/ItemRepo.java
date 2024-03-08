package com.finalproject.mangasite.repository;

import com.finalproject.mangasite.items.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ItemRepo extends JpaRepository<Items, Integer> {
    public List<Items> findByName(String name);
    public List<Items> findByType(String type);
    public List<Items> findByPublication(LocalDate publication);
}

