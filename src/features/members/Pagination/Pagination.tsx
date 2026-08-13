import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setPage } from '../membersSlice'
import styles from './Pagination.module.scss'

export function Pagination() {
  const dispatch = useAppDispatch()
  const meta = useAppSelector((s) => s.members.meta)
  const currentPage = useAppSelector((s) => s.members.params.page) ?? 1

  if (!meta) {
    return (
      <div className={styles.pagination}>
        <span className={styles.rangeLabel}>—</span>
      </div>
    )
  }

  const rangeStart = (meta.page - 1) * meta.per_page + 1
  const rangeEnd = Math.min(meta.page * meta.per_page, meta.total)
  const totalPages = meta.last_page

  function goToPage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return
    dispatch(setPage(page))
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages)

  return (
    <div className={styles.pagination}>
      <span className={styles.rangeLabel}>
        {rangeStart}–{rangeEnd} of {meta.total.toLocaleString()}
      </span>
      <div className={styles.controls}>
        <button
          className={styles.pageBtn}
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          {'\u2039'}
        </button>
        {pageNumbers.map((p, i) =>
          p === null ? (
            <span key={`gap-${i}`} className={styles.ellipsis}>…</span>
          ) : (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === currentPage ? styles.active : ''}`}
              type="button"
              onClick={() => goToPage(p)}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </button>
          ),
        )}
        <button
          className={styles.pageBtn}
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          {'\u203A'}
        </button>
      </div>
    </div>
  )
}

function getPageNumbers(current: number, total: number): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | null)[] = [1]

  if (current > 3) pages.push(null)

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) pages.push(null)

  pages.push(total)

  return pages
}
