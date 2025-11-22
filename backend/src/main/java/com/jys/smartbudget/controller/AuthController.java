@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody UserDTO user) {
        UserDTO loginUser = userService.login(user.getUserId(), user.getPassword());
        if (loginUser != null) {
            String token = JwtUtil.generateToken(loginUser.getUserId());
            return ResponseEntity.ok(new ApiResponse(true, "로그인 성공", token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse(false, "아이디 또는 비밀번호가 틀렸습니다.", null));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody UserDTO user) {
        try {
            userService.register(user);
            return ResponseEntity.ok(new ApiResponse(true, "회원가입 성공", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "회원가입 실패: " + e.getMessage(), null));
        }
    }
}
