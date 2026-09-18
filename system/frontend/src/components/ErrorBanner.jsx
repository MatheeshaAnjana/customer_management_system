export default function ErrorBanner({ message, onRetry }) {
  if (!message) return null

  return (
    <div className="error-banner" role="alert">
      <strong>Could not complete that request.</strong>
      <span>{message}</span>
      <button type="button" onClick={onRetry}>Try again</button>
    </div>
  )
}
