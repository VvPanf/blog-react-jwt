package blog.service;

import blog.model.Post;
import blog.model.User;
import blog.repo.PostRepo;
import blog.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    public List<PostDetails> allPosts() {
        return postRepo.findAll().stream().map(post -> new PostDetails(post)).collect(Collectors.toList());
    }

    public List<PostDetails> getByTag(String tag) {
        return postRepo.findByTag(tag).stream().map(post -> new PostDetails(post)).collect(Collectors.toList());
    }

    public PostDetails save(PostDetails postDetails) {
        User user = userRepo.findByUsername(postDetails.getAuthorName())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + postDetails.getAuthorName()));
        Post post = new Post(postDetails.getId(),postDetails.getText(),user,postDetails.getTag(),postDetails.getImage());
        postRepo.save(post);
        return postDetails;
    }

    public String delete(Long id) {
        postRepo.deleteById(id);
        return "success";
    }

    public PostDetails getById(Long id) {
        return new PostDetails(postRepo.findById(id).get());
    }
}
