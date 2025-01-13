import {  IsString } from 'class-validator';

export class AssignRoleToUser {
  @IsString()
  identity: string;

 
  role: any;
}
