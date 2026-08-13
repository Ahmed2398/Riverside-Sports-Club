import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useDebouncedValue } from '../../../shared/hooks'
import { useTranslation } from '../../../shared/i18n'
import { fetchMemberList } from '../membersSlice'
import { MemberFilterBar } from '../MemberFilterBar/MemberFilterBar'
import { MemberTable } from '../MemberTable/MemberTable'
import { Pagination } from '../Pagination/Pagination'
import { MemberDetailDrawer } from '../MemberDetailDrawer/MemberDetailDrawer'
import styles from './MembersPage.module.scss'

const SEARCH_DEBOUNCE_MS = 300

export function MembersPage() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const memberParams = useAppSelector((s) => s.members.params)
  const debouncedSearch = useDebouncedValue(memberParams.search, SEARCH_DEBOUNCE_MS)

  // Fetch members when filters/sort/page change
  useEffect(() => {
    dispatch(
      fetchMemberList({
        ...memberParams,
        search: debouncedSearch,
      }),
    )
  }, [dispatch, debouncedSearch, memberParams.tier, memberParams.status, memberParams.sort, memberParams.dir, memberParams.page])

  return (
    <>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('members.title')}</h1>
        </div>
        <MemberFilterBar />
        <MemberTable />
        <Pagination />
      </div>
      <MemberDetailDrawer />
    </>
  )
}
