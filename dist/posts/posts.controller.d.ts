import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<{
        id: number;
        title: string;
        content: string | null;
        authorId: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        content: string | null;
        authorId: string;
    }>;
    create(data: any): Promise<{
        id: number;
        title: string;
        content: string | null;
        authorId: string;
    }>;
    update(id: number, data: any): Promise<{
        id: number;
        title: string;
        content: string | null;
        authorId: string;
    }>;
    delete(id: number): Promise<{
        id: number;
        title: string;
        content: string | null;
        authorId: string;
    }>;
}
