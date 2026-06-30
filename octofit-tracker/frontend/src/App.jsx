import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>Modern fitness tracking for ambitious teams.</h1>
        <p className="lead">
          Log workouts, build leaderboards, and keep every member engaged with a multi-tier app experience.
        </p>
        <div className="hero-actions">
          <a className="primary-link" href="http://localhost:8000/api/health">
            Check API health
          </a>
          <span className="secondary-pill">React 19 + Vite + Express + MongoDB</span>
        </div>
      </section>

      <section className="feature-grid">
        <article>
          <h2>Track activity</h2>
          <p>Capture workouts and visualize progress over time.</p>
        </article>
        <article>
          <h2>Grow teams</h2>
          <p>Create squads, assign goals, and encourage healthy competition.</p>
        </article>
        <article>
          <h2>Stay motivated</h2>
          <p>Use leaderboards and personalized suggestions to keep momentum high.</p>
        </article>
      </section>
    </main>
  )
}

export default App
