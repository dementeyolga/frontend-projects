import { CustomEventNames } from '../../../../../types/enums';
import { Round } from '../../../../../types/types';
import shuffleStringArray from '../../../../../utils/shuffleArray';
import { div } from '../../../../../utils/tagViews';
import BaseComponentView from '../../../../BaseComponent/BaseComponentView';
import AutoCompleteButtonView from './AutoCompleteButton/AutoCompleteButtonView';
import CheckContinueButton from './CheckContinueButton/CheckContinueButtonView';
import OptionView from './OptionsField/Option/OptionView';
import OptionsFieldView from './OptionsField/OptionsFieldView';
import SentenceView from './SolutionField/Sentence/SentenceView';
import SolutionFieldView from './SolutionField/SolutionFieldView';
import classes from './GameField.module.scss';
import sentenceClasses from './SolutionField/Sentence/Sentence.module.scss';
import optionClasses from './OptionsField/Option/Option.module.scss';

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

    this.optionsField = new OptionsFieldView(
      shuffledOptions,
      round.words[0].textExample,
    );
    this.solutionField.optionsField = this.optionsField;

    this.checkContinueButton = new CheckContinueButton(round.words);
    this.optionsField.checkContinueButton = this.checkContinueButton;

    this.addChildrenComponents(
      'end',
      this.optionsField,
      div(
        classes.buttons,
        undefined,
        this.checkContinueButton,
        new AutoCompleteButtonView(),
      ),
    );

    this.initListeners();
  }

  initListeners(): void {
    this.element.addEventListener(CustomEventNames.MoveOption, (ev) => {
      if (ev instanceof CustomEvent) {
        const { target, detail } = ev;

        const lastSentence = this.getLastSentence();

        if (
          detail.source instanceof SentenceView &&
          target instanceof HTMLDivElement
        ) {
          if (!this.checkContinueButton.getElement().disabled) {
            this.checkContinueButton.getElement().disabled = true;
          }

          this.optionsField.addChildrenComponents(
            'end',
            new OptionView(
              target.textContent || '',
              lastSentence.correctSolution,
            ),
          );
        } else if (
          detail.source instanceof OptionsFieldView &&
          target instanceof HTMLDivElement
        ) {
          lastSentence.addChildrenComponents(
            'end',
            new OptionView(
              target.textContent || '',
              lastSentence.correctSolution,
            ),
          );
        }
      }
    });

    this.element.addEventListener(CustomEventNames.CheckSolution, () => {
      const lastSentence = this.getLastSentence();

      lastSentence.checkSentenceElements();

      if (lastSentence.isInRightOrder()) {
        this.checkContinueButton.transformToContinue();
      }
    });

    this.element.addEventListener(CustomEventNames.NextRound, (ev) => {
      if (ev instanceof CustomEvent) {
        const lastSentence = this.getLastSentence();
        lastSentence.getElement().onclick = () => false;
        lastSentence.getElement().style.pointerEvents = 'none';
        lastSentence.removeClass(classes.droppable);
        lastSentence.addClass(sentenceClasses.completed);
        lastSentence.children.forEach((comp) =>
          comp.addClass(optionClasses.completed),
        );

        const { detail: level } = ev;

        const words = level.textExample.split(' ');
        const shuffled: string[] = shuffleStringArray(words);
        this.optionsField.renderOptions(shuffled, level.textExample);
        this.solutionField.addChildrenComponents(
          'end',
          new SentenceView(level.textExample),
        );
      }
    });

    this.element.addEventListener(CustomEventNames.EnableCheckButton, () => {
      this.checkContinueButton.getElement().disabled = false;
    });

    this.element.addEventListener(CustomEventNames.AutoComplete, async () => {
      const lastSentence = this.getLastSentence();
      const options = [...this.optionsField.children];
      await this.optionsField.removeChildrenComponents();
      await lastSentence.addChildrenComponents('end', ...options);
      lastSentence.showCorrectOrder();
      lastSentence.getElement().style.pointerEvents = 'none';
      this.checkContinueButton.transformToContinue();
    });

    this.element.addEventListener(CustomEventNames.DropOption, (ev) => {
      if (ev instanceof CustomEvent) {
        const { target, detail } = ev;

        if (detail && target instanceof HTMLElement) {
          const lastSentence = this.getLastSentence();

          if (detail === lastSentence.getElement()) {
            this.optionsField.removeChildComponent(target);

            lastSentence.addChildrenComponents(
              'end',
              new OptionView(
                target.textContent || '',
                lastSentence.correctSolution,
              ),
            );
          } else if (detail === this.optionsField.getElement()) {
            lastSentence.removeChildComponent(target);

            this.optionsField.addChildrenComponents(
              'end',
              new OptionView(
                target.textContent || '',
                lastSentence.correctSolution,
              ),
            );
          }
        }
      }
    });

    this.element.addEventListener(CustomEventNames.OptionsDefaultStyle, () => {
      const lastSentence = this.getLastSentence();
      lastSentence.children.forEach((comp) => {
        comp.removeClass(optionClasses.wrong);
        comp.removeClass(optionClasses.correct);
      });
    });
  }

  private getLastSentence(): SentenceView {
    return this.solutionField.children[this.solutionField.children.length - 1];
  }
}
