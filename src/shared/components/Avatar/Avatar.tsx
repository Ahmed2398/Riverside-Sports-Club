import styles from './Avatar.module.scss'

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP = {
  sm: 40,
  md: 72,
  lg: 96,
}

const FONT_SIZE_MAP = {
  sm: 18,
  md: 32,
  lg: 42,
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase()
  const sizeClass = styles[size]

  return (
    <div 
      className={`${styles.avatar} ${sizeClass}`}
      aria-hidden="true"
      style={{
        width: `${SIZE_MAP[size]}px`,
        height: `${SIZE_MAP[size]}px`,
        fontSize: `${FONT_SIZE_MAP[size]}px`,
      }}
    >
      {initial}
    </div>
  )
}
