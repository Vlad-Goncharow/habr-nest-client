export type categoriesType = {
  categoryRu: String
  categoryEng: String
}

export const postCategories = [
  {
    categoryRu: 'Разработка',
    categoryEng: 'develop',
  },
  {
    categoryRu: 'Администрирование',
    categoryEng: 'admin',
  },
  {
    categoryRu: 'Дизайн',
    categoryEng: 'design',
  },
  {
    categoryRu: 'Менеджмент',
    categoryEng: 'management',
  },
  {
    categoryRu: 'Маркетинг',
    categoryEng: 'marketing',
  },
  {
    categoryRu: 'Научпоп',
    categoryEng: 'popsci',
  },
]

export const postTypeOne = [
  {
    typeEng: 'articles',
    typeRu: 'Статья',
  },
  {
    typeEng: 'posts',
    typeRu: 'Пост',
  },
  {
    typeEng: 'news',
    typeRu: 'Новость',
  },
]

export type subCategoriesType = {
  subCategoryRu: string
  subCategoryEng: string
}

export const subCategories: subCategoriesType[] = [
  {
    subCategoryRu: 'Статьи',
    subCategoryEng: 'articles',
  },
  {
    subCategoryRu: 'Посты',
    subCategoryEng: 'posts',
  },
  {
    subCategoryRu: 'Новости',
    subCategoryEng: 'news',
  },
  {
    subCategoryRu: 'Хабы',
    subCategoryEng: 'habs',
  },
  {
    subCategoryRu: 'Авторы',
    subCategoryEng: 'authors',
  },
]
