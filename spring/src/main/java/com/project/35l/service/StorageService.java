package com.finalproject.mangasite.service; //pkg

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;


@Service
public class StorageService {

    private final S3Client s3Client;
    private final String bucketName = "35lproject.w24.storage.ysun";

    public StorageService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        try {
            Path tempFile = Files.createTempFile(null, fileName);
            file.transferTo(tempFile.toFile());

            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(fileName)
                            .build(),
                    RequestBody.fromFile(tempFile));

            return fileName; // Or return a URL/path to access the file

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //more potential methods
}
