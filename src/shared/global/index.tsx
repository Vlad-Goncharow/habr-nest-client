export type categoriesType = {
  category: string
}

export const postCategories: categoriesType[] = [
  {
    category: 'develop',
  },
  {
    category: 'admin',
  },
  {
    category: 'design',
  },
  {
    category: 'management',
  },
  {
    category: 'marketing',
  },
  {
    category: 'popsci',
  },
]

export const postTypeOne = [
  {
    type: 'articles',
    typeSingle: 'article',
  },
  {
    type: 'posts',
    typeSingle: 'post',
  },
  {
    type: 'news',
    typeSingle: 'newsSingle',
  },
]

export type subCategoriesType = {
  subCategory: string
}

export const subCategories: subCategoriesType[] = [
  {
    subCategory: 'articles',
  },
  {
    subCategory: 'posts',
  },
  {
    subCategory: 'news',
  },
  {
    subCategory: 'habs',
  },
  {
    subCategory: 'authors',
  },
]
