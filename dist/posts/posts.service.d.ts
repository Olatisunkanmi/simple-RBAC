import { PrismaService } from '../prisma/prisma.service';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        title: string;
        content: string | null;
        authorId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        content: string | null;
        authorId: number;
    }>;
    create(data: any): Promise<{
        id: number;
        title: string;
        content: string | null;
        authorId: number;
    }>;
    update(id: number, data: any): Promise<{
        id: number;
        title: string;
        content: string | null;
        authorId: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        title: string;
        content: string | null;
        authorId: number;
    }>;
}
