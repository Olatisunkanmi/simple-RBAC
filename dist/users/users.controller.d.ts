import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
    }>;
    create(data: any): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
    }>;
}
