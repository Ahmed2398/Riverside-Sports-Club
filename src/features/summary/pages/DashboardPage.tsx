import { useEffect } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { fetchClubSummary } from '../summarySlice'
import { StatCardGrid } from '../StatCardGrid/StatCardGrid'
import { MemberFilterBar } from '../../members/MemberFilterBar/MemberFilterBar'
import { MemberTable } from '../../members/MemberTable/MemberTable'
import { Pagination } from '../../members/Pagination/Pagination'
import styles from './DashboardPage.module.scss'

export function DashboardPage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchClubSummary())
  }, [dispatch])

  return (
    <div className={styles.page}>
      <StatCardGrid />
      <MemberFilterBar />
      <MemberTable />
      <Pagination />
    </div>
  )
}
