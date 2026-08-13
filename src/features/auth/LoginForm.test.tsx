import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer, { type AuthState } from './authSlice'
import { LoginForm } from './components/LoginForm'

function makeTestStore() {
  const preloadedState: { auth: AuthState } = {
    auth: { user: null, token: null, status: 'idle', error: null },
  }
  return configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  })
}

function renderWithStore() {
  const store = makeTestStore()
  return {
    store,
    ...render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    ),
  }
}

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    renderWithStore()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('renders a submit button', () => {
    renderWithStore()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows validation error when email is empty', async () => {
    const user = userEvent.setup()
    renderWithStore()
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  it('shows validation error for invalid email format', async () => {
    const user = userEvent.setup()
    renderWithStore()
    await user.type(screen.getByLabelText('Email'), 'notanemail')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument()
  })

  it('shows validation error when password is too short', async () => {
    const user = userEvent.setup()
    renderWithStore()
    await user.type(screen.getByLabelText('Email'), 'admin@riverside.example')
    await user.type(screen.getByLabelText('Password'), '123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
  })
})
