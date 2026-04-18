// Welcome.jsx — empty / first-run state.
function Welcome({ onInvite, onCreate }) {
  return (
    <div className="wd-welcome">
      <div className="wd-welcome-mark">W</div>
      <h2 className="wd-welcome-title">Welcome to your workspace</h2>
      <p className="wd-welcome-sub">Start by inviting your team, then create your first project. You can always change these later.</p>
      <div className="wd-welcome-actions">
        <button className="wd-btn wd-btn-primary" onClick={onInvite}>Invite teammates</button>
        <button className="wd-btn wd-btn-secondary" onClick={onCreate}>Create project</button>
      </div>
    </div>
  );
}
window.Welcome = Welcome;
