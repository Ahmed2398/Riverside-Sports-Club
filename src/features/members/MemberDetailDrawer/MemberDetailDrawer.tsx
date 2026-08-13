import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useLocale } from '../../../shared/contexts/LocaleContext'
import { closeMemberDetail, fetchMemberDetailData } from '../memberDetailSlice'
import {
  StatusBadge,
  TierBadge,
  ProgressBar,
  ConfidentialField,
  Button,
  Avatar,
} from '../../../shared/components'
import { MemberDetailSkeleton } from '../MemberDetailSkeleton/MemberDetailSkeleton'
import styles from './MemberDetailDrawer.module.scss'

export function MemberDetailDrawer() {
  const dispatch = useAppDispatch()
  const { locale } = useLocale()
  const { isOpen, member, sessions, status, selectedMemberId } = useAppSelector((s) => s.memberDetail)
  const [showConfidential, setShowConfidential] = useState(false)

  useEffect(() => {
    if (isOpen && selectedMemberId) {
      dispatch(fetchMemberDetailData(selectedMemberId))
    }
  }, [dispatch, isOpen, selectedMemberId])

  if (!isOpen) return null

  const handleClose = () => dispatch(closeMemberDetail())

  return (
    <>
      <div className={styles.overlay} onClick={handleClose}>
        <div 
          className={styles.drawer} 
          role="dialog" 
          aria-modal="true" 
          aria-label="Member details" 
          onClick={(e) => e.stopPropagation()}
          key={selectedMemberId} // Reset component state when member changes
        >
          {status === 'succeeded' && member && (
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <Avatar name={member.name[locale]} size="sm" />
                <div className={styles.headerInfo}>
                  <h2 className={styles.memberName}>{member.name[locale]}</h2>
                  <span className={styles.memberNumber}>{member.memberNumber}</span>
                  <div className={styles.badges}>
                    <TierBadge tier={member.tier} />
                    <StatusBadge status={member.status} />
                  </div>
                </div>
              </div>
              <button
                className={styles.closeBtn}
                onClick={handleClose}
                aria-label="Close"
              >
                {'\u00D7'}
              </button>
            </div>
          )}

          {status === 'loading' && (
            <div className={styles.header}>
              <button
                className={styles.closeBtn}
                onClick={handleClose}
                aria-label="Close"
              >
                {'\u00D7'}
              </button>
            </div>
          )}

        <div className={styles.content}>
          {status === 'loading' && <MemberDetailSkeleton />}

          {status === 'succeeded' && member && (
            <>

              <div className={styles.section}>
                <div className={styles.sessionsBox}>
                  <h4 className={styles.sectionTitle}>Sessions This Month</h4>
                  <ProgressBar
                    current={member.sessionsThisMonth}
                    goal={member.monthlyGoal}
                    label="Monthly Goal"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Membership</h4>
                <div className={styles.membershipGrid}>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Joined</span>
                    <span className={styles.fieldValue}>
                      {new Date(member.joinedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Email</span>
                    <span className={styles.fieldValue}>{member.email}</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Total Sessions</span>
                    <span className={styles.fieldValue}>{member.totalSessions}</span>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h4 className={styles.sectionTitle}>Confidential</h4>
                  <button
                    className={styles.toggleBtn}
                    onClick={() => setShowConfidential(!showConfidential)}
                    aria-pressed={showConfidential}
                    aria-label={showConfidential ? 'Hide confidential details' : 'Show confidential details'}
                  >
                    {showConfidential ? 'Hide' : 'Show'} confidential details
                  </button>
                </div>
                <div className={styles.confidentialGrid}>
                  <ConfidentialField label="Phone" value={member.phone} revealed={showConfidential} />
                  <ConfidentialField
                    label="Emergency Contact"
                    value={`${member.emergencyContact.name} · ${member.emergencyContact.phone}`}
                    revealed={showConfidential}
                  />
                </div>
                <div className={styles.confidentialFull}>
                  <ConfidentialField label="Medical Notes" value={member.medicalNotes} revealed={showConfidential} />
                </div>
              </div>

              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Recent Sessions</h4>
                {sessions.length === 0 ? (
                  <p className={styles.empty}>No sessions yet</p>
                ) : (
                  <div className={styles.sessionList}>
                    {sessions.map((s) => (
                      <div key={s.id} className={styles.sessionItem}>
                        <span className={styles.sessionDate}>
                          {new Date(s.date).toLocaleDateString()}
                        </span>
                        <span className={styles.sessionClass}>{s.className[locale]}</span>
                        <span className={styles.sessionDuration}>{s.durationMinutes} min</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {status === 'failed' && (
            <div className={styles.error}>
              <p>Failed to load member details.</p>
              <Button variant="secondary" size="sm" onClick={handleClose}>
                Close
              </Button>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  )
}
