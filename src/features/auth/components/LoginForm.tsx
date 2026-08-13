import { useState, type FormEvent } from 'react'
import { Button, TextInput, Alert } from '../../../shared/components'
import { useAuth, useLogin } from '../hooks'
import styles from './LoginForm.module.scss'

export function LoginForm() {
  const { error, status } = useAuth()
  const { login, dismissError } = useLogin()
  const isLoading = status === 'loading'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})

  function validate(): boolean {
    const errors: { email?: string; password?: string } = {}

    if (!email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address'
    }

    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    dismissError()
    if (!validate()) return
    await login(email.trim(), password)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {error && (
        <Alert variant="error" className={styles.serverError}>
          {error}
        </Alert>
      )}

      <TextInput
        name="email"
        type="email"
        label="Email"
        placeholder="admin@riverside.example"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
        autoComplete="email"
        disabled={isLoading}
      />

      <TextInput
        name="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
        autoComplete="current-password"
        disabled={isLoading}
      />

      <Button type="submit" loading={isLoading} className={styles.submit}>
        Sign in
      </Button>
    </form>
  )
}
