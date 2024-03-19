import { CustomEventNames } from '../../../../../types/enums';
import { Round } from '../../../../../types/types';
import shuffleStringArray from '../../../../../utils/shuffleArray';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import CheckContinueButton from './CheckContinueButton/CheckContinueButtonView';
import classes from './GameField.module.scss';
import OptionView from './OptionsField/Option/OptionView';
import OptionsFieldView from './OptionsField/OptionsFieldView';
import SentenceView from './SolutionField/Sentence/SentenceView';
import SolutionFieldView from './SolutionField/SolutionFieldView';

export default class GameFieldView extends BaseComponentView<HTMLDivElement> {
  private optionsField: OptionsFieldView;

  private solutionField: SolutionFieldView;

  private checkContinueButton: CheckContinueButton;

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

    this.solutionField = solutionField;

    const options = round.words[0].textExample.split(' ');
    const shuffledOptions: string[] = shuffleStringArray(options);

    this.optionsField = new OptionsFieldView(shuffledOptions);
    this.solutionField.optionsField = this.optionsField;

    // const appendNewLevelCallback = (level: Word) => {
    //   const words = level.textExample.split(' ');
    //   const shuffled: string[] = shuffleStringArray(words);
    //   this.optionsField.renderOptions(shuffled);
    //   solutionField.addChildrenComponents(
    //     'end',
    //     new SentenceView(level.textExample),
    //   );
    // };

    this.checkContinueButton = new CheckContinueButton(round.words);
    this.optionsField.checkContinueButton = this.checkContinueButton;

    this.addChildrenComponents(
      'end',
      this.optionsField,
      this.checkContinueButton,
    );

    this.initListeners();
  }

  initListeners(): void {
    this.element.addEventListener(CustomEventNames.MoveOption, (ev) => {
      if (ev instanceof CustomEvent) {
        const { target, detail } = ev;

        if (
          detail.source instanceof SentenceView &&
          target instanceof HTMLDivElement
        ) {
          if (!this.checkContinueButton.getElement().disabled) {
            this.checkContinueButton.getElement().disabled = true;
          }

          this.optionsField.addChildrenComponents(
            'end',
            new OptionView(target.textContent || ''),
          );
        } else if (
          detail.source instanceof OptionsFieldView &&
          target instanceof HTMLDivElement
        ) {
          const lastSentence =
            this.solutionField.children[this.solutionField.children.length - 1];

          lastSentence.addChildrenComponents(
            'end',
            new OptionView(target.textContent || ''),
          );
        }
      }
    });

    this.element.addEventListener(CustomEventNames.CheckSolution, () => {
      const lastSentence =
        this.solutionField.children[this.solutionField.children.length - 1];

      lastSentence.checkSentenceElements();

      if (lastSentence.isInRightOrder()) {
        this.checkContinueButton.transformToContinue();
      }
    });

    this.element.addEventListener(CustomEventNames.NextRound, (ev) => {
      if (ev instanceof CustomEvent) {
        const { detail: level } = ev;

        const words = level.textExample.split(' ');
        const shuffled: string[] = shuffleStringArray(words);
        this.optionsField.renderOptions(shuffled);
        this.solutionField.addChildrenComponents(
          'end',
          new SentenceView(level.textExample),
        );
      }
    });

    this.element.addEventListener(CustomEventNames.EnableCheckButton, () => {
      console.log('button enabled');

      this.checkContinueButton.getElement().disabled = false;
    });
  }
}
