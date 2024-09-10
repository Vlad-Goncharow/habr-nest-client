export type categoriesType = {
  categoryI18n: string
  categoryRu: string
  categoryEng: string
}

export const postCategories: categoriesType[] = [
  {
    categoryI18n: 'categoryDev',
    categoryRu: 'Разработка',
    categoryEng: 'develop',
  },
  {
    categoryI18n: 'categoryAdmin',
    categoryRu: 'Администрирование',
    categoryEng: 'admin',
  },
  {
    categoryI18n: 'categoryDesign',
    categoryRu: 'Дизайн',
    categoryEng: 'design',
  },
  {
    categoryI18n: 'categoryManagment',
    categoryRu: 'Менеджмент',
    categoryEng: 'management',
  },
  {
    categoryI18n: 'categoryMarketing',
    categoryRu: 'Маркетинг',
    categoryEng: 'marketing',
  },
  {
    categoryI18n: 'categoryPopsci',
    categoryRu: 'Научпоп',
    categoryEng: 'popsci',
  },
]

export const postTypeOne = [
  {
    typeI18n: 'postTypeArticle',
    typeEng: 'articles',
    typeRu: 'Статья',
  },
  {
    typeI18n: 'postTypePost',
    typeEng: 'posts',
    typeRu: 'Пост',
  },
  {
    typeI18n: 'postTypeNews',
    typeEng: 'news',
    typeRu: 'Новость',
  },
]

export type subCategoriesType = {
  subCategoryI18n: string
  subCategoryRu: string
  subCategoryEng: string
}

export const subCategories: subCategoriesType[] = [
  {
    subCategoryI18n: 'navPublications',
    subCategoryRu: 'Статьи',
    subCategoryEng: 'articles',
  },
  {
    subCategoryI18n: 'navPosts',
    subCategoryRu: 'Посты',
    subCategoryEng: 'posts',
  },
  {
    subCategoryI18n: 'navNews',
    subCategoryRu: 'Новости',
    subCategoryEng: 'news',
  },
  {
    subCategoryI18n: 'navHabs',
    subCategoryRu: 'Хабы',
    subCategoryEng: 'habs',
  },
  {
    subCategoryI18n: 'navAuthors',
    subCategoryRu: 'Авторы',
    subCategoryEng: 'authors',
  },
]
