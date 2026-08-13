import styles from './Pagination.module.scss'

interface PaginationProps {
  rangeStart?: number
  rangeEnd?: number
  total?: number
}

export function Pagination({
  rangeStart = 1,
  rangeEnd = 25,
  total = 2000,
}: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <span className={styles.rangeLabel}>
        {rangeStart}–{rangeEnd} of {total.toLocaleString()}
      </span>
      <div className={styles.controls}>
        <button className={styles.pageBtn} type="button" disabled>
          {'\u2039'}
        </button>
        <button className={`${styles.pageBtn} ${styles.active}`} type="button">
          1
        </button>
        <button className={styles.pageBtn} type="button">2</button>
        <button className={styles.pageBtn} type="button">3</button>
        <button className={styles.pageBtn} type="button">
          {'\u203A'}
        </button>
      </div>
    </div>
  )
}
