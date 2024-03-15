import { LocalStorageValues, Path } from '../../../types/enums';
import BaseComponentView from '../../BaseComponent/BaseComponentView';

export type Route = {
  path: string;
  callback: () => Promise<BaseComponentView>;
};

export const appRoutes: Route[] = [
  {
    path: Path.Start,
    callback: async () => {
      try {
        if (localStorage.getItem(LocalStorageValues.FormData)) {
          const { default: View } = await import(
            '../../pages/StartPage/StartPageView'
          );

          return new View();
        }

        const { default: View } = await import(
          '../../pages/LoginPage/LoginPageView'
        );

        return new View();
      } catch {
        throw new Error('Module not found.');
      }
    },
  },
  {
    path: Path.Game,
    callback: async () => {
      try {
        const { default: View } = await import(
          '../../pages/GamePage/GamePageView'
        );

        return new View();
      } catch {
        throw new Error('Module not found.');
      }
    },
  },
];
