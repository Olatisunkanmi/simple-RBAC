import { PrismaService } from 'src/prisma/prisma.service';
export declare class PermissionsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        name: string;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
    }>;
    create(data: any): Promise<{
        name: string;
        id: number;
    }>;
    update(id: number, data: any): Promise<{
        name: string;
        id: number;
    }>;
    delete(id: number): Promise<{
        name: string;
        id: number;
    }>;
}
