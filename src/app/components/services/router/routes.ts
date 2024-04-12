import { Pathes } from '../../../types/enums';
import BaseComponentView from '../../BaseComponent/BaseComponentView';

export type Route = {
  path: string;
  callback: () => Promise<BaseComponentView>;
};

export const appRoutes: Route[] = [
  {
    path: Pathes.Main,
    callback: async () => {
      try {
        const { default: View } = await import(
          '../../pages/LoginPage/LoginPageView'
        );
        return new View();
      } catch {
        throw new Error('Module not found.');
      }
    },
  },
  // {
  //   path: Path.Winners,
  //   callback: async () => {
  //     try {
  //       const { default: View } = await import(
  //         '../../pages/WinnersPage/WinnersPageView'
  //       );
  //       return new View();
  //     } catch {
  //       throw new Error('Module not found.');
  //     }
  //   },
  // },
];
