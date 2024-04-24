import { Pathes, SessionStorageKeys } from '../../../types/enums';
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
        const userStr = sessionStorage.getItem(SessionStorageKeys.User);

        let View = null;

        if (!userStr) {
          ({ default: View } = await import(
            '../../pages/LoginPage/LoginPageView'
          ));
        } else {
          ({ default: View } = await import(
            '../../pages/ChatPage/ChatPageView'
          ));
        }

        return new View();
      } catch (e) {
        console.log('Error loading module', e);

        return null;
      }
    },
  },
  {
    path: Pathes.About,
    callback: async () => {
      try {
        const { default: View } = await import(
          '../../pages/AboutPage/AboutPageView'
        );
        return new View();
      } catch (e) {
        console.log('Error loading module', e);

        return null;
      }
    },
  },
];
