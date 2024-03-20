import BaseComponentView from '../../../../../BaseComponent/BaseComponentView';
import SentenceView from './Sentence/SentenceView';
import classes from './SolutionField.module.scss';

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
