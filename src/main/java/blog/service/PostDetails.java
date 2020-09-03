package blog.service;

import blog.model.Post;
import lombok.*;

@Data
@NoArgsConstructor
public class PostDetails {
    private Long id;
    private String text;
    private String authorName;
    private String tag;
    private String image;

    public PostDetails(Post post){
        this.id = post.getId();
        this.text = post.getText();
        this.authorName = post.getAuthor().getUsername();
        this.tag = post.getTag();
        this.image = post.getImage();
    }
}
