import { TextInput } from '../../../shared/components'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setSearch, setTier, setStatus } from '../membersSlice'
import styles from './MemberFilterBar.module.scss'

export function MemberFilterBar() {
  const dispatch = useAppDispatch()
  const params = useAppSelector((s) => s.members.params)

  return (
    <div className={styles.bar}>
      <div className={styles.search}>
        <TextInput
          name="search"
          type="search"
          label="Search"
          placeholder="Search by name, member number, or email…"
          value={params.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>
      <div className={styles.filters}>
        <label className={styles.selectField}>
          <span className={styles.selectLabel}>Tier</span>
          <select
            className={styles.select}
            value={params.tier ?? ''}
            onChange={(e) =>
              dispatch(setTier(e.target.value === '' ? undefined : e.target.value as 'basic' | 'standard' | 'premium'))
            }
          >
            <option value="">All tiers</option>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </label>
        <label className={styles.selectField}>
          <span className={styles.selectLabel}>Status</span>
          <select
            className={styles.select}
            value={params.status ?? ''}
            onChange={(e) =>
              dispatch(setStatus(e.target.value === '' ? undefined : e.target.value as 'active' | 'paused' | 'expired'))
            }
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="expired">Expired</option>
          </select>
        </label>
      </div>
    </div>
  )
}
