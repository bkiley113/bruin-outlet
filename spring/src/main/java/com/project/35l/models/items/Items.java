package com.finalproject.mangasite.items;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table
public class Items {

    @Id
    @SequenceGenerator(
            name = "item_sequence",
            sequenceName = "item_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "item_sequence"
    )
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "publication")
    private LocalDate publication;

    @Column(name = "poster")
    private String poster;

    @Column(name = "description")
    private String description;

    @Column(name = "view")
    private int view;

    public Items() {
    }

    public Items(int id, String name, String type, LocalDate publication, String poster, String description, int view) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.publication = publication;
        this.poster = poster;
        this.description = description;
        this.view = view;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getPublication() {
        return publication;
    }

    public void setPublication(LocalDate publication) {
        this.publication = publication;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getView() {
        return view;
    }

    public void setView(int view) {
        this.view = view;
    }

    @Override
    public String toString() {
        return "Items{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", publication=" + publication +
                ", poster='" + poster + '\'' +
                ", description='" + description + '\'' +
                ", view=" + view +
                '}';
    }
}
