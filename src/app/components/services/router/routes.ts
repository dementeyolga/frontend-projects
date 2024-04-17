import { Pathes } from '../../../types/enums';
import BaseComponentView from '../../BaseComponent/BaseComponentView';

export type Route = {
  path: string;
  callback: () => Promise<BaseComponentView>;
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
      } catch {
        throw new Error('Module not found.');
      }
    },
  },
  {
    path: Pathes.Chat,
    callback: async () => {
      try {
        const { default: View } = await import(
          '../../pages/ChatPage/ChatPageView'
        );
        return new View();
      } catch {
        throw new Error('Module not found.');
      }
    },
  },
];
