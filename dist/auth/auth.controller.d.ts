import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
    }>;
}
