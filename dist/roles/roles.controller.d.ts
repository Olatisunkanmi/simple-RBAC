import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
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
