import { Global, Module } from '@nestjs/common';
import { CaslAbilityFactory } from './ability.factory/ability.factory';

@Global()
@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class AbilityModule {}
