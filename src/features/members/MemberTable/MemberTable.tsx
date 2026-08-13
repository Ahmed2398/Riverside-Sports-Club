import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useLocale } from '../../../shared/contexts/LocaleContext'
import { setSort, resetFilters } from '../membersSlice'
import { openMemberDetail } from '../memberDetailSlice'
import { StatusBadge, TierBadge, Button } from '../../../shared/components'
import type { MemberListParams } from '../../../shared/api/types'
import styles from './MemberTable.module.scss'

const SKELETON_ROWS = 8

type SortColumn = NonNullable<MemberListParams['sort']>

export function MemberTable() {
  const dispatch = useAppDispatch()
  const { locale } = useLocale()
  const { data, status, params } = useAppSelector((s) => s.members)
  const isLoading = status === 'loading' || status === 'idle'

  function renderSortIcon(col: SortColumn) {
    if (params.sort !== col) return null
    return (
      <span className={styles.sortIcon} aria-hidden="true">
        {params.dir === 'asc' ? '\u2191' : '\u2193'}
      </span>
    )
  }

  return (
    // Mobile strategy: horizontal scroll within this container rather than
    // row-to-card collapse. This preserves column alignment and makes sort
    // indicators meaningful across all viewport sizes. The min-width on the
    // table ensures columns don't compress below readability.
    <div className={styles.scrollWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.colMember}>
              <button
                type="button"
                className={styles.sortBtn}
                onClick={() => dispatch(setSort('name'))}
              >
                Member
                {renderSortIcon('name')}
              </button>
            </th>
            <th className={styles.colTier}>Tier</th>
            <th className={styles.colStatus}>Status</th>
            <th className={styles.colSessions}>
              <button
                type="button"
                className={styles.sortBtn}
                onClick={() => dispatch(setSort('sessionsThisMonth'))}
              >
                Sessions
                {renderSortIcon('sessionsThisMonth')}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: SKELETON_ROWS }, (_, i) => (
                <tr key={i}>
                  <td><div className={styles.skeleton} /></td>
                  <td><div className={`${styles.skeleton} ${styles.skeletonSmall}`} /></td>
                  <td><div className={`${styles.skeleton} ${styles.skeletonSmall}`} /></td>
                  <td><div className={`${styles.skeleton} ${styles.skeletonSmall}`} /></td>
                </tr>
              ))
            : data.length === 0
              ? (
                <tr>
                  <td colSpan={4} className={styles.emptyState}>
                    <div className={styles.emptyContent}>
                      <span className={styles.emptyIcon} aria-hidden="true">{'\u{1F50D}'}</span>
                      <p className={styles.emptyText}>No members found</p>
                      <p className={styles.emptyHint}>Try adjusting your search or filters.</p>
                      <Button variant="secondary" size="sm" onClick={() => dispatch(resetFilters())}>
                        Reset filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )
              : data.map((m) => (
                <tr
                  key={m.id}
                  className={styles.clickableRow}
                  onClick={() => dispatch(openMemberDetail(m.id))}
                >
                  <td>
                    <div className={styles.memberCell}>
                      <span className={styles.memberName}>{m.name[locale]}</span>
                      <span className={styles.memberNumber}>{m.memberNumber}</span>
                    </div>
                  </td>
                  <td><TierBadge tier={m.tier} /></td>
                  <td><StatusBadge status={m.status} /></td>
                  <td className={styles.sessionsCell}>{m.sessionsThisMonth}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
