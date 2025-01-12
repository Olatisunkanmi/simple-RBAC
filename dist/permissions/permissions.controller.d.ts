import { PermissionsService } from './permisssions.service';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
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
