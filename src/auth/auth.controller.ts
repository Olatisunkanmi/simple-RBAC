import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    // return this.authService.register(body);
  }
}
