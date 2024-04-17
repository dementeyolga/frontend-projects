import { UserCredentials } from '../../../types/types';

type State = {
  currentUser: UserCredentials | null;
};

const state: State = {
  currentUser: null,
};

export default state;
