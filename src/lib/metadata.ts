import { COMPANY } from "@/info";

export const createPageMetadata = (pageTitle: string) => ({
  title: `${pageTitle} | ${COMPANY.name}`,
});
