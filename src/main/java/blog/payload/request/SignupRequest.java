package blog.payload.request;

import lombok.*;
import javax.validation.constraints.*;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
    @NotBlank
    @Size(min=3, max=20)
    private String username;

    @NotBlank
    @Size(max=50)
    @Email
    private String email;

    @NotBlank
    @Size(min=6, max=40)
    private String password;

    private Set<String> roles;
}
