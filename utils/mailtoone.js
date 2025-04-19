function getEmailMessageForIndividualUser(message) {
  return `
    <div style="font-family: 'Quicksand', 'Segoe UI', Roboto, sans-serif; background-color: #0f172a; color: #ffffff; padding: 30px 20px; border-radius: 12px; max-width: 620px; margin: auto; box-shadow: 0 0 20px rgba(129, 140, 248, 0.2);">
      
      <div style="text-align: center; margin-bottom: 25px;">
        <h2 style="font-size: 28px; color: #60a5fa; margin: 0;">
          📩 You've Got a Message from UniqueBlog
        </h2>
        <p style="font-size: 14px; color: #cbd5e1; margin-top: 5px;">Sent via our admin panel</p>
      </div>

      <div style="background-color: #1e293b; padding: 25px; border-radius: 10px; margin-bottom: 30px;">
        <p style="font-size: 16px; color: #f1f5f9; margin-bottom: 10px;">
          <strong>Hello there,</strong>
        </p>
        <p style="color: #d1d5db; line-height: 1.7; font-size: 15px;">
          ${message}
        </p>
        <p style="margin-top: 20px; color: #a5b4fc; font-size: 14px;">
          💡 If you have more questions or need further assistance, feel free to reply to this email.
        </p>
      </div>

      <div style="text-align: center; font-size: 13px; color: #94a3b8;">
        <p>&copy; 2025 UniqueBlog. All rights reserved.</p>
        <a href="https://uniqueblogs.onrender.com/" style="color: #818cf8; text-decoration: underline;">Visit UniqueBlog</a>
      </div>
    </div>
  `;
}

module.exports = getEmailMessageForIndividualUser;
