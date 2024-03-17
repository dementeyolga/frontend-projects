import { Round } from '../../../../../types/types';
import shuffleStringArray from '../../../../../utils/shuffleArray';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import classes from './GameField.module.scss';
import OptionsFieldView from './OptionsField/OptionsFieldView';
import SolutionFieldView from './SolutionField/SolutionFieldView';

export default class GameFieldView extends BaseComponentView<HTMLDivElement> {
  constructor(round: Round) {
    const solutionField = new SolutionFieldView();

    super(
      {
        tagName: 'div',
        className: classes.field,
      },
      undefined,
      solutionField,
    );

    const options = round.words[0].textExample.split(' ');
    const shuffledOptions: string[] = shuffleStringArray(options);
    const optionsField = new OptionsFieldView(shuffledOptions, solutionField);
    this.addChildrenComponents('end', optionsField);
    solutionField.optionsField = optionsField;
  }
}
