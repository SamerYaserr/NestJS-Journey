import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { PolicyHandler } from 'src/casl/policy-handler.interface';
import { CHECK_POLICIES_KEY } from '../decorators/checkPolicies.decorator';
import { User } from 'src/users/user.class';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest<{ user?: User }>();
    if (!request.user) {
      throw new Error('User not found in request');
    }
    const ability = this.caslAbilityFactory.createForUser(request.user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability as AppAbility),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
