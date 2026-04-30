import { type ActionFunctionArgs, redirect } from "react-router";
import { auth } from "@carveri/shared/lib/auth.ts";

export function logoutAction() {
  auth.clearToken();
  return redirect("/");
}

export async function updateProfileAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "dashboard.profile.errorNameRequired" };
  }

  return { success: true };
}

export async function changePasswordAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "dashboard.security.errorFieldsRequired" };
  }

  if (newPassword !== confirmPassword) {
    return { error: "dashboard.security.errorPasswordsMismatch" };
  }

  return { success: true };
}

export function deleteAccountAction() {
  auth.clearToken();
  return redirect("/");
}
