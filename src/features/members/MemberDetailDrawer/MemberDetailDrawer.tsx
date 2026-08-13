import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { closeMemberDetail, fetchMemberDetailData } from '../memberDetailSlice'
import {
  StatusBadge,
  TierBadge,
  ProgressBar,
  ConfidentialField,
  Spinner,
  Button,
} from '../../../shared/components'
import styles from './MemberDetailDrawer.module.scss'

export function MemberDetailDrawer() {
  const dispatch = useAppDispatch()
  const { isOpen, member, sessions, status, selectedMemberId } = useAppSelector((s) => s.memberDetail)

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
        <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Member details" onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2 className={styles.title}>Member Detail</h2>
            <button
              className={styles.closeBtn}
              onClick={handleClose}
              aria-label="Close"
            >
              {'\u00D7'}
            </button>
          </div>

        <div className={styles.content}>
          {status === 'loading' && (
            <div className={styles.loading}>
              <Spinner size="md" />
            </div>
          )}

          {status === 'succeeded' && member && (
            <>
              <div className={styles.profile}>
                <div className={styles.avatar} aria-hidden="true">
                  {member.name.en.charAt(0)}
                </div>
                <div className={styles.profileInfo}>
                  <h3 className={styles.memberName}>{member.name.en}</h3>
                  <span className={styles.memberNumber}>{member.memberNumber}</span>
                </div>
                <div className={styles.badges}>
                  <TierBadge tier={member.tier} />
                  <StatusBadge status={member.status} />
                </div>
              </div>

              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Sessions This Month</h4>
                <div className={styles.sessionsBox}>
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
                <h4 className={styles.sectionTitle}>Confidential</h4>
                <div className={styles.confidentialGrid}>
                  <ConfidentialField label="Phone" value={member.phone} />
                  <ConfidentialField
                    label="Emergency Contact"
                    value={`${member.emergencyContact.name} · ${member.emergencyContact.phone}`}
                  />
                </div>
                <div className={styles.confidentialFull}>
                  <ConfidentialField label="Medical Notes" value={member.medicalNotes} />
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
                        <span className={styles.sessionClass}>{s.className.en}</span>
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
