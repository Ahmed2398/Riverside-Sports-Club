import { TextInput } from '../../../shared/components'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useTranslation } from '../../../shared/i18n'
import { setSearch, setTier, setStatus } from '../membersSlice'
import styles from './MemberFilterBar.module.scss'

export function MemberFilterBar() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const params = useAppSelector((s) => s.members.params)

  return (
    <div className={styles.bar}>
      <div className={styles.search}>
        <TextInput
          name="search"
          type="search"
          label={t('members.searchLabel')}
          placeholder={t('members.searchPlaceholder')}
          value={params.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>
      <div className={styles.filters}>
        <label className={styles.selectField}>
          <span className={styles.selectLabel}>{t('members.tier')}</span>
          <select
            className={styles.select}
            value={params.tier ?? ''}
            onChange={(e) =>
              dispatch(setTier(e.target.value === '' ? undefined : e.target.value as 'basic' | 'standard' | 'premium'))
            }
          >
            <option value="">{t('members.allTiers')}</option>
            <option value="basic">{t('members.tierBasic')}</option>
            <option value="standard">{t('members.tierStandard')}</option>
            <option value="premium">{t('members.tierPremium')}</option>
          </select>
        </label>
        <label className={styles.selectField}>
          <span className={styles.selectLabel}>{t('members.status')}</span>
          <select
            className={styles.select}
            value={params.status ?? ''}
            onChange={(e) =>
              dispatch(setStatus(e.target.value === '' ? undefined : e.target.value as 'active' | 'paused' | 'expired'))
            }
          >
            <option value="">{t('members.allStatuses')}</option>
            <option value="active">{t('members.statusActive')}</option>
            <option value="paused">{t('members.statusPaused')}</option>
            <option value="expired">{t('members.statusExpired')}</option>
          </select>
        </label>
      </div>
    </div>
  )
}
