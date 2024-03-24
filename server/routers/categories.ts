import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "server/trpc";
import {
  getCategories,
  likeCategory,
  unlikeCategory,
} from "server/controllers/categories";

export const categoriesRouter = createTRPCRouter({
  getCategories: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number(),
      }),
    )
    .query(({ ctx, input }) => getCategories({ ctx, input })),

  likeCategory: protectedProcedure
    .input(
      z.object({
        categoryId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => likeCategory({ ctx, input })),

  unlikeCategory: protectedProcedure
    .input(
      z.object({
        categoryId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => unlikeCategory({ ctx, input })),
});
