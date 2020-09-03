package blog.controller;

import blog.service.PostDetails;
import blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/msg")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<PostDetails>> getAll() {
        return new ResponseEntity<>(postService.allPosts(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PostDetails> getById(@PathVariable Long id) {
        return new ResponseEntity<>(postService.getById(id), HttpStatus.OK);
    }

    @GetMapping("/tag/{tag}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<PostDetails>> getByTag(@PathVariable String tag) {
        return new ResponseEntity<>(postService.getByTag(tag), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<PostDetails> save(@RequestBody PostDetails post) {
        return new ResponseEntity<>(postService.save(post), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<PostDetails> update(@RequestBody PostDetails post) {
        return new ResponseEntity<>(postService.save(post), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        return new ResponseEntity<>(postService.delete(id), HttpStatus.OK);
    }

}
