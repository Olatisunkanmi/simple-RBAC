import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        name: string | null;
        id: number;
        email: string;
        password: string;
    }[]>;
    findOne(id: number): Promise<{
        name: string | null;
        id: number;
        email: string;
        password: string;
    }>;
    create(data: any): Promise<{
        name: string | null;
        id: number;
        email: string;
        password: string;
    }>;
    update(id: number, data: any): Promise<{
        name: string | null;
        id: number;
        email: string;
        password: string;
    }>;
    delete(id: number): Promise<{
        name: string | null;
        id: number;
        email: string;
        password: string;
    }>;
}
