import { type ActionFunctionArgs, redirect } from "react-router";
import { login } from "@carveri/shared/data/api.ts";
import { auth } from "@carveri/shared/lib/auth.ts";

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email ||
    !password
  ) {
    return { error: "Correo y contraseña son requeridos." };
  }

  try {
    const { token } = await login(email, password);
    auth.setToken(token);
    return redirect("/");
  } catch (err) {
    const isCredentialError =
      err instanceof Error && err.message === "Invalid credentials";
    return {
      error: isCredentialError
        ? "Correo o contraseña incorrectos."
        : "Error de conexión. Intente nuevamente.",
    };
  }
}