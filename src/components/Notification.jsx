import React from 'react';

function Notification({ title, message, icon: Icon, iconColor = 'blue', actionButton, children }) {
  return (
    <div>
      {/* Header area with title and optional icon */}
      <div>
        {Icon && (
          <Icon aria-hidden="true" />
        )}
        <h2>{title}</h2>
      </div>

      {/* Message text */}
      <div>
        {message}
      </div>

      {/* Child components for additional content */}
      {children && (
        <div>
          {children}
        </div>
      )}

      {/* Action button (optional) */}
      {actionButton && (
        <div>
          {actionButton}
        </div>
      )}
    </div>
  );
}

export default Notification;