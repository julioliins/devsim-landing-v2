import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetUrl: string
): Promise<void> {
  try {
    if (!resend) {
      console.log(`[EMAIL] Password reset email (DEMO MODE) sent to ${email}`);
      console.log(`[EMAIL] Reset URL: ${resetUrl}`);
      return;
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@devsim.com",
      to: email,
      subject: "Redefinir sua senha - DevSim Studios",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
              .content { background: #f9fafb; padding: 20px; border-radius: 8px; }
              .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">DevSim Studios</div>
              </div>
              
              <div class="content">
                <h2>Redefinir Senha</h2>
                <p>Olá ${name}!</p>
                <p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para continuar:</p>
                
                <a href="${resetUrl}" class="button">Redefinir Senha</a>
                
                <p>Ou copie e cole este link no seu navegador:</p>
                <p style="word-break: break-all; background: white; padding: 10px; border-radius: 4px;">
                  ${resetUrl}
                </p>
                
                <p style="margin-top: 20px; font-size: 14px; color: #666;">
                  Este link expira em 24 horas. Se você não solicitou uma redefinição de senha, ignore este email.
                </p>
              </div>
              
              <div class="footer">
                <p>&copy; 2026 DevSim Studios. Todos os direitos reservados.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`[EMAIL] Password reset email sent to ${email}`);
  } catch (error) {
    console.error(`[EMAIL] Failed to send password reset email to ${email}:`, error);
    throw error;
  }
}

export async function sendConfirmationEmail(
  email: string,
  name: string,
  confirmationUrl: string
): Promise<void> {
  try {
    if (!resend) {
      console.log(`[EMAIL] Confirmation email (DEMO MODE) sent to ${email}`);
      console.log(`[EMAIL] Confirmation URL: ${confirmationUrl}`);
      return;
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@devsim.com",
      to: email,
      subject: "Confirme seu email - DevSim Studios",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
              .content { background: #f9fafb; padding: 20px; border-radius: 8px; }
              .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">DevSim Studios</div>
              </div>
              
              <div class="content">
                <h2>Confirme seu Email</h2>
                <p>Olá ${name}!</p>
                <p>Clique no botão abaixo para confirmar seu endereço de email:</p>
                
                <a href="${confirmationUrl}" class="button">Confirmar Email</a>
              </div>
              
              <div class="footer">
                <p>&copy; 2026 DevSim Studios. Todos os direitos reservados.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`[EMAIL] Confirmation email sent to ${email}`);
  } catch (error) {
    console.error(`[EMAIL] Failed to send confirmation email to ${email}:`, error);
    throw error;
  }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  try {
    if (!resend) {
      console.log(`[EMAIL] Welcome email (DEMO MODE) sent to ${email}`);
      return;
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@devsim.com",
      to: email,
      subject: "Bem-vindo à DevSim Studios!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
              .content { background: #f9fafb; padding: 20px; border-radius: 8px; }
              .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">DevSim Studios</div>
              </div>
              
              <div class="content">
                <h2>Bem-vindo!</h2>
                <p>Olá ${name}!</p>
                <p>Sua conta foi criada com sucesso. Agora você pode acessar nossos simuladores de carreiras e começar sua jornada de aprendizado.</p>
                
                <p style="margin-top: 20px;">Explore nossas carreiras:</p>
                <ul>
                  <li>Desenvolvedor de Software</li>
                  <li>Testador de Software</li>
                  <li>Analista de Sistemas</li>
                  <li>DevOps Engineer</li>
                </ul>
              </div>
              
              <div class="footer">
                <p>&copy; 2026 DevSim Studios. Todos os direitos reservados.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`[EMAIL] Welcome email sent to ${email}`);
  } catch (error) {
    console.error(`[EMAIL] Failed to send welcome email to ${email}:`, error);
    throw error;
  }
}

export async function sendNotificationEmail(
  email: string,
  subject: string,
  content: string
): Promise<void> {
  try {
    if (!resend) {
      console.log(`[EMAIL] Notification email (DEMO MODE) sent to ${email}`);
      console.log(`[EMAIL] Subject: ${subject}`);
      return;
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@devsim.com",
      to: email,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
              .content { background: #f9fafb; padding: 20px; border-radius: 8px; }
              .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">DevSim Studios</div>
              </div>
              
              <div class="content">
                ${content}
              </div>
              
              <div class="footer">
                <p>&copy; 2026 DevSim Studios. Todos os direitos reservados.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`[EMAIL] Notification email sent to ${email}`);
  } catch (error) {
    console.error(`[EMAIL] Failed to send notification email to ${email}:`, error);
    throw error;
  }
}
