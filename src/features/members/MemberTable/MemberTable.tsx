import styles from './MemberTable.module.scss'

const SKELETON_ROWS = 8

export function MemberTable() {
  return (
    // Mobile strategy: horizontal scroll within this container rather than
    // row-to-card collapse. This preserves column alignment and makes sort
    // indicators meaningful across all viewport sizes. The min-width on the
    // table ensures columns don't compress below readability.
    <div className={styles.scrollWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.colMember}>Member</th>
            <th className={styles.colTier}>Tier</th>
            <th className={styles.colStatus}>Status</th>
            <th className={styles.colSessions}>
              <span className={styles.sessionsHeader}>
                Sessions
                <span className={styles.sortIcon} aria-hidden="true">{'\u2193'}</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <tr key={i}>
              <td><div className={styles.skeleton} /></td>
              <td><div className={`${styles.skeleton} ${styles.skeletonSmall}`} /></td>
              <td><div className={`${styles.skeleton} ${styles.skeletonSmall}`} /></td>
              <td><div className={`${styles.skeleton} ${styles.skeletonSmall}`} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
