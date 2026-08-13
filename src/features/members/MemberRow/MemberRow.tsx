import { Avatar } from '../../../shared/components/Avatar/Avatar'
import styles from './MemberRow.module.scss'

export interface MemberRowProps {
  member: {
    id: number
    memberNumber: string
    name: { ar: string; en: string }
    tier: 'basic' | 'standard' | 'premium'
    status: 'active' | 'paused' | 'expired'
  }
  selected: boolean
  onSelectChange: (id: number, selected: boolean) => void
  onOpen: (id: number) => void
  locale?: 'en' | 'ar'
}

export function MemberRow({
  member,
  selected,
  onSelectChange,
  onOpen,
  locale = 'en',
}: MemberRowProps) {
  const handleRowClick = () => {
    onOpen(member.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onOpen(member.id)
    }
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectChange(member.id, e.target.checked)
  }

  const memberName = member.name[locale]

  return (
    <div
      className={styles.row}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${memberName}`}
    >
      <div className={styles.leftGroup}>
        <Avatar name={memberName} size="sm" />
        <div className={styles.textStack}>
          <span className={styles.name}>{memberName}</span>
          <span className={styles.memberNumber}>{member.memberNumber}</span>
        </div>
      </div>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={selected}
        onChange={handleCheckboxChange}
        onClick={handleCheckboxClick}
        aria-label={`Select ${memberName}`}
      />
    </div>
  )
}
