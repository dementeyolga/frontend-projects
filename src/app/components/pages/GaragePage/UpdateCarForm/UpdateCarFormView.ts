import CarFormView from '../CarForm/CarFormView';
import classes from './UpdateCarForm.module.scss';

export default class UpdateCarFormView extends CarFormView {
  constructor() {
    super('Update a car', classes.updateButton);
  }
}
