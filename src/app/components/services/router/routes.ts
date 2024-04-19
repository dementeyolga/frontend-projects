import { Pathes } from '../../../types/enums';
import BaseComponentView from '../../BaseComponent/BaseComponentView';

export type Route = {
  path: string;
  callback: () => Promise<BaseComponentView | null>;
};

export const appRoutes: Route[] = [
  {
    path: Pathes.Login,
    callback: async () => {
      try {
        const { default: View } = await import(
          '../../pages/LoginPage/LoginPageView'
        );
        return new View();
      } catch (e) {
        console.log('Error loading module', e);

        return null;
      }
    },
  },
  // {
  //   path: Pathes.Chat,
  //   callback: async () => {
  //     try {
  //       const { default: View } = await import(
  //         '../../pages/ChatPage/ChatPageView'
  //       );
  //       return new View();
  //     } catch (e) {
  //       console.log('Error loading module', e);

  //       return null;
  //     }
  //   },
  // },
];
