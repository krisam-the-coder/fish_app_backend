import { Request, Response, NextFunction } from 'express';

interface Pagination {
  skip: number;
  take: number;
}

declare global {
  namespace Express {
    interface Request {
      pagination: Pagination;
    }
  }
}

export function paginationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const defaultLimit = 10;

  const adjustedPage = page < 0 ? 1 : page;
  const adjustedLimit = limit < 0 ? defaultLimit : limit;

  req.pagination = {
    skip: (adjustedPage - 1) * adjustedLimit,
    take: adjustedLimit,
  };

  next();
}

