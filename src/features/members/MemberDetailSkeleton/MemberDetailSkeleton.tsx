import styles from './MemberDetailSkeleton.module.scss'

export function MemberDetailSkeleton() {
  return (
    <>
      {/* Header skeleton */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.avatarSkeleton} />
          <div className={styles.headerInfo}>
            <div className={styles.nameSkeleton} />
            <div className={styles.numberSkeleton} />
            <div className={styles.badgesRow}>
              <div className={styles.badgeSkeleton} />
              <div className={styles.badgeSkeleton} />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className={styles.content}>
        {/* Sessions section */}
        <div className={styles.section}>
          <div className={styles.sessionsBox}>
            <div className={styles.sectionTitleSkeleton} />
            <div className={styles.progressSkeleton} />
            <div className={styles.textSkeleton} />
          </div>
        </div>

        {/* Membership section */}
        <div className={styles.section}>
          <div className={styles.sectionTitleSkeleton} />
          <div className={styles.grid}>
            <div className={styles.field}>
              <div className={styles.labelSkeleton} />
              <div className={styles.valueSkeleton} />
            </div>
            <div className={styles.field}>
              <div className={styles.labelSkeleton} />
              <div className={styles.valueSkeleton} />
            </div>
            <div className={styles.field}>
              <div className={styles.labelSkeleton} />
              <div className={styles.valueSkeleton} />
            </div>
          </div>
        </div>

        {/* Confidential section */}
        <div className={styles.section}>
          <div className={styles.sectionTitleSkeleton} />
          <div className={styles.grid}>
            <div className={styles.field}>
              <div className={styles.labelSkeleton} />
              <div className={styles.valueBoxSkeleton} />
            </div>
            <div className={styles.field}>
              <div className={styles.labelSkeleton} />
              <div className={styles.valueBoxSkeleton} />
            </div>
          </div>
          <div className={styles.fieldFull}>
            <div className={styles.labelSkeleton} />
            <div className={styles.valueBoxSkeleton} />
          </div>
        </div>

        {/* Recent sessions section */}
        <div className={styles.section}>
          <div className={styles.sectionTitleSkeleton} />
          <div className={styles.sessionList}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.sessionItemSkeleton} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
