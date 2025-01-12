import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
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
