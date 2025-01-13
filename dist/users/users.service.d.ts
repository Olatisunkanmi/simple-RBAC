import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
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
