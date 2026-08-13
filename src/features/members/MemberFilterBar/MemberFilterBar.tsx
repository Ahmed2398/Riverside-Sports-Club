import { TextInput } from '../../../shared/components'
import styles from './MemberFilterBar.module.scss'

export function MemberFilterBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.search}>
        <TextInput
          name="search"
          type="search"
          label="Search"
          placeholder="Search by name or member number…"
        />
      </div>
      <div className={styles.filters}>
        <label className={styles.selectField}>
          <span className={styles.selectLabel}>Tier</span>
          <select className={styles.select} defaultValue="">
            <option value="" disabled>All tiers</option>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </label>
        <label className={styles.selectField}>
          <span className={styles.selectLabel}>Status</span>
          <select className={styles.select} defaultValue="">
            <option value="" disabled>All statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="expired">Expired</option>
          </select>
        </label>
      </div>
    </div>
  )
}
