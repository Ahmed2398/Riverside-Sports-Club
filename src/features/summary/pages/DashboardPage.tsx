import { StatCardGrid } from '../StatCardGrid/StatCardGrid'
import { MemberFilterBar } from '../../members/MemberFilterBar/MemberFilterBar'
import { MemberTable } from '../../members/MemberTable/MemberTable'
import { Pagination } from '../../members/Pagination/Pagination'
import styles from './DashboardPage.module.scss'

export function DashboardPage() {
  return (
    <div className={styles.page}>
      <StatCardGrid />
      <MemberFilterBar />
      <MemberTable />
      <Pagination />
    </div>
  )
}
