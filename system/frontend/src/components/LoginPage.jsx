import { useState } from 'react'

const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = '0000'

export default function LoginPage({ theme, onToggleTheme, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError('The email or password is incorrect.')
      return
    }

    onLogin()
  }

  return (
    <main className="login-page">
      <div className="login-background" aria-hidden="true" />
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-card-header">
          <a className="brand" href="/" aria-label="Clientory home">
            <span className="brand-mark">C</span>
            <span>clientory</span>
          </a>
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? 'Dark' : 'Light'} mode
          </button>
        </div>

        <div className="login-copy">
          <p className="eyebrow">Admin workspace</p>
          <h1 id="login-title">Welcome back</h1>
          <p>Sign in to manage your customer relationships.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Email address</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@gmail.com"
              autoComplete="username"
              autoFocus
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="button button-primary login-submit" type="submit">Sign in</button>
        </form>

        <p className="login-footer">Secure access for administrators</p>
      </section>
    </main>
  )
}
