import { Path } from '../../../types/enums';
import BaseComponentView from '../../BaseComponent/BaseComponentView';

export type Route = {
  path: string;
  callback: () => Promise<BaseComponentView>;
};

export const appRoutes: Route[] = [
  {
    path: Path.Garage,
    callback: async () => {
      try {
        const { default: View } = await import(
          '../../pages/GaragePage/GaragePageView'
        );

        return new View();
      } catch {
        throw new Error('Module not found.');
      }
    },
  },
  {
    path: Path.Winners,
    callback: async () => {
      try {
        const { default: View } = await import(
          '../../pages/WinnersPage/WinnersPageView'
        );

        return new View();
      } catch {
        throw new Error('Module not found.');
      }
    },
  },
];
