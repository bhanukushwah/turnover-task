import { type Context } from "server/context";

export const getCategories = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: { page: number; pageSize: number };
}) => {
  const { page = 1, pageSize = 5 } = input;

  const categories = await ctx.db.category.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      users: {
        where: {
          userId: ctx.user?.id,
        },
      },
    },
  });

  const count = await ctx.db.category.count();

  return {
    message: "Successfully fetched categories",
    data: {
      categories,
      count,
    },
  };
};

export const likeCategory = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: { categoryId: string };
}) => {
  const userId = ctx.user?.id ?? "";

  const category = await ctx.db.userLikedCategory.create({
    data: {
      categoryId: input.categoryId,
      userId,
    },
  });

  return {
    message: "Successfully liked category",
    data: {
      category,
    },
  };
};

export const unlikeCategory = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: { categoryId: string };
}) => {
  const userId = ctx.user?.id ?? "";
  const { categoryId } = input;

  const category = await ctx.db.userLikedCategory.delete({
    where: {
      userId_categoryId: {
        userId,
        categoryId,
      },
    },
  });

  return {
    message: "Successfully liked category",
    data: {
      category,
    },
  };
};
