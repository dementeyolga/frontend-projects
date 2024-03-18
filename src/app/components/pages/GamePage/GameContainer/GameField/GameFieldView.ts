import { Round, Word } from '../../../../../types/types';
import shuffleStringArray from '../../../../../utils/shuffleArray';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import ContinueButtonView from './ContinueButton/ContinueButtonView';
import classes from './GameField.module.scss';
import OptionsFieldView from './OptionsField/OptionsFieldView';
import SentenceView from './SolutionField/Sentence/SentenceView';
import SolutionFieldView from './SolutionField/SolutionFieldView';

export default class GameFieldView extends BaseComponentView<HTMLDivElement> {
  constructor(round: Round) {
    const solutionField = new SolutionFieldView(round.words[0].textExample);
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
    solutionField.optionsField = optionsField;

    const appendNewLevel = (level: Word) => {
      const words = level.textExample.split(' ');
      const shuffled: string[] = shuffleStringArray(words);
      optionsField.renderOptions(shuffled);
      solutionField.addChildrenComponents(
        'end',
        new SentenceView(level.textExample),
      );
    };

    const continueButton = new ContinueButtonView(round.words, appendNewLevel);
    optionsField.continueButton = continueButton;

    this.addChildrenComponents('end', optionsField, continueButton);
  }
}
