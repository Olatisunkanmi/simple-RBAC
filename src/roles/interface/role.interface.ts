import { Actions, RESOURCES } from 'src/common';

export interface IGetRoles {
  id: string;
}

export interface ICreateRole {
  name: string;
  description?: string;
  permissions: {
    resource: RESOURCES[];
    actions?: Actions[];
    conditions?: object;
  }[];
}

export interface IAssignRole {
  roleId: string;
  actions?: Actions[];
}

export interface IUpdateRole {
  name?: string;
  permissions?: {
    resource: RESOURCES[];
    actions: Actions[];
    conditions?: object;
  }[];
}
