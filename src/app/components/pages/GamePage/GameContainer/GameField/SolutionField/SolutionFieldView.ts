import BaseComponentView from '../../../../../BaseComponent/BaseComponentView';
import classes from './SolutionField.module.scss';
import SentenceView from './Sentence/SentenceView';

export default class SolutionFieldView extends BaseComponentView<HTMLDivElement> {
  optionsField?: BaseComponentView;

  declare children: SentenceView[];

  constructor(correctSolution: string) {
    super(
      {
        tagName: 'div',
        className: classes.field,
      },
      undefined,
      new SentenceView(correctSolution),
    );
  }
}
