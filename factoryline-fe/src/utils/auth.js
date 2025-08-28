export function loginSuccess() {
  localStorage.setItem("isLoggedIn", "1");
}
export function logout() {
  localStorage.removeItem("isLoggedIn");
}
export function isLoggedIn() {
  return !!localStorage.getItem("isLoggedIn");
}
