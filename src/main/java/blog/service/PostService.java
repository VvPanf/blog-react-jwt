package blog.service;

import blog.model.Post;
import blog.repo.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepo postRepo;

    public List<Post> allPosts() {
        return postRepo.findAll();
    }

    public List<Post> getByTag(String tag) {
        return postRepo.findByTag(tag);
    }

    public Post save(Post post) {
        return postRepo.save(post);
    }

    public String delete(Long id) {
        postRepo.deleteById(id);
        return "success";
    }

    public Post getById(Long id) {
        return postRepo.findById(id).get();
    }
}
