// Dialog.jsx — modal with overlay, title, body, footer actions.
function Dialog({ open, title, children, onClose, actions }) {
  if (!open) return null;
  return (
    <div className="wd-overlay" onClick={onClose}>
      <div className="wd-dialog" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        {title && <h3 className="wd-dialog-title">{title}</h3>}
        <div className="wd-dialog-body">{children}</div>
        <div className="wd-dialog-actions">{actions}</div>
      </div>
    </div>
  );
}
window.Dialog = Dialog;
