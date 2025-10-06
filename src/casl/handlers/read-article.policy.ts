import { Action } from 'src/common/enums/action.enum';
import { AppAbility } from '../casl-ability.factory';
import { Article } from 'src/articles/article.class/article.class';
import { IPolicyHandler } from '../policy-handler.interface';

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Article);
  }
}
