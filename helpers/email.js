import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //Informacion del email

  const info = await transport.sendMail({
    from: ' "UpTask - Administrador de Proyectos" <cuentas@uptask.com> ',
    to: email,
    subject: "Uptask - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en Uptask",
    html: `<p> Hola: ${nombre} Comprueba tu cuenta en Uptask </p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}" >Comprobar cuenta</a>
        </p>

        <p>Si tu no creaste esta cuneta, puedes ignorar este mensaje</p>
        
        `,
  });
};

const emailOlvidePassword = async (datos) => {
  
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //Informacion del email

  const info = await transport.sendMail({
    from: ' "UpTask - Administrador de Proyectos" <cuentas@uptask.com> ',
    to: email,
    subject: "Uptask - Reestablece tu password",
    text: "Reestablece tu password",
    html: `<p> Hola: ${nombre} has solicitado reestablecer tu password en Uptask </p>
            <p>Sigue el siguiente enlace para generar un nuevo password:
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}" > Reestablecer password </a>
            </p>

          <p>Si tu no solicitaste este email, puedes ignorar este mensaje</p>
      `,
  });
};

export { emailRegistro, emailOlvidePassword };
