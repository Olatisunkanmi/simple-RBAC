import { PureAbility } from '@casl/ability';
import { Actions, RESOURCES } from 'src/common';

export type AppAbility = PureAbility<[Actions, RESOURCES]>;

export interface RequiredRule {
  action: Actions;
  subject: RESOURCES;
}

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

export type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
