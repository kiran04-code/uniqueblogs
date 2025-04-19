function getEmailMessageForIndividualUser(name, message) {
    return `
      <div style="font-family: 'Quicksand', sans-serif; background-color: #0f172a; color: #ffffff; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #818cf8; font-size: 24px; margin-bottom: 10px;">
            <i class="fas fa-envelope-open-text" style="color: #38bdf8;"></i> Message from UniqueBlog
          </h1>
          <p style="color: #cbd5e1;">Hey ${name}, thanks for connecting with us!</p>
        </div>
        <div style="background-color: #1e293b; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(129, 140, 248, 0.3);">
          <p style="color: #e0e7ff; font-size: 16px; margin-bottom: 10px;">
            <strong>We've reviewed your message.</strong>
          </p>
          <p style="color: #d1d5db; line-height: 1.6;">
            ${message}
          </p>
          <p style="margin-top: 20px; color: #a5b4fc;">
            💡 Feel free to reply if you need more help or have additional questions.
          </p>
        </div>
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #94a3b8;">
          <p>&copy; 2025 UniqueBlog — All rights reserved.</p>
          <a href="https://uniqueblogs.onrender.com/" style="color: #818cf8; text-decoration: none;">Visit UniqueBlog</a>
        </div>
      </div>
    `;
  }
  
  module.exports = getEmailMessageForIndividualUser;
  