import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Paginations from 'react-js-pagination'
import s from './Pagination.module.scss'
import { useTranslation } from 'react-i18next'

interface PaginationProps {
  length: number
  navigatePath: string
  pageSize: number
}

const Pagination: React.FC<PaginationProps> = ({
  navigatePath,
  length,
  pageSize,
}) => {
  const {t} = useTranslation()
  const { page } = useParams()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const sort = searchParams.get('sort')
  const order = searchParams.get('order')
  const query = searchParams.get('q')
  const queryString = query ? `&q=${query}` : ''

  const handlePageClick = (pageNumber: number) => {
    navigate(
      `${navigatePath}/${pageNumber}/?sort=${sort}&order=${order}${queryString}`
    )
  }

  return (
    <Paginations
      activePage={Number(page)}
      itemsCountPerPage={pageSize}
      totalItemsCount={Number(length)}
      pageRangeDisplayed={3}
      onChange={handlePageClick}
      prevPageText={t('paginationPrev')}
      nextPageText={t('paginationNext')}
      hideFirstLastPages={true}
      innerClass={s.pagination}
      linkClass={s.pagination__item}
      activeLinkClass={s.pagination__item_active}
      activeClass={s.pagination__item_selected}
      linkClassPrev={s.pagination__controlos}
      linkClassNext={s.pagination__controlos}
    />
  )
}

export default Pagination
