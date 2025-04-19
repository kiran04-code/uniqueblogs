function getEmailMessage(message) {
    return `
      <div style="font-family: 'Quicksand', sans-serif; background-color: #0f172a; color: #ffffff; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #818cf8; font-size: 24px; margin-bottom: 10px;">
            <i class="fas fa-envelope-circle-check" style="color: #22c55e;"></i> UniqueBlog Response
          </h1>
          <p style="color: #cbd5e1;">Thank you for contacting us.</p>
        </div>
        <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(129, 140, 248, 0.3);">
          <p style="color: #e0e7ff; font-size: 16px; margin-bottom: 10px;">
            <strong>Hello from UniqueBlog!</strong>
          </p>
          <p style="color: #d1d5db; line-height: 1.6;">
            ${message}
          </p>
          <p style="margin-top: 20px; color: #a5b4fc;">
            ✨ Your query has been resolved. If you have further questions, feel free to reach out again at any time.
          </p>
        </div>
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #94a3b8;">
          <p>&copy; 2025 UniqueBlog — All rights reserved.</p>
          <a href="https://uniqueblogs.onrender.com/" style="color: #818cf8; text-decoration: none;">Visit our website</a>
        </div>
      </div>
    `;
  }

  module.exports =  getEmailMessage
  