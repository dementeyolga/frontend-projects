import { LocalStorageValues, Path } from '../../../types/enums';

export type Route = {
  path: string;
  callback: () => Promise;
};

export const appRoutes: Route[] = [
  {
    path: Path.Start,
    callback: async () => {
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
    },
  },
];
