import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        name: string | null;
        id: number;
        email: string;
        password: string;
    }>;
}
