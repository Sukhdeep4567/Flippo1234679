/** Fired when a visitor picks a role in "Who we help"; the enquiry form pre-selects it. */
export const SELECT_ROLE_EVENT = "flipo:select-role";

export function selectRole(role: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_ROLE_EVENT, { detail: role }));
  document.getElementById("enquiry")?.scrollIntoView({ block: "start" });
}
