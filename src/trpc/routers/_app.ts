import { createTRPCRouter } from '../init';
import { settingsRouter } from '@/modules/settings/server/procedures';

export const appRouter = createTRPCRouter({
  settings: settingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;