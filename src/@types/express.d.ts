/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  namespace Multer {
    interface File {
      metadata?: import('sharp').Metadata;
    }
  }
  interface Request {
    ability?: App.Permission.TAppAbility;
    filterBy?: (builder: import('objection').QueryBuilderType) => import('objection').QueryBuilderType;
    orderBy?: (builder: import('objection').QueryBuilderType) => import('objection').QueryBuilderType;
    token?: string;
    pagination?: {
      page: number;
      limit: number;
      offset: number;
    };
  }
}
