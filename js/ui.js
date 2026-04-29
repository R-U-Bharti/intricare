import { $id, $all, toggleClasses } from "./utils.js";

/**
 * Handles general UI interactions like navigation, sidebar, and theme switching.
 * Separating this helps manage the layout independently from the business logic.
 */

/**
 * Switches between different views (SPA style)
 * @param {string} viewId - The ID of the view to show
 */
export function showView(viewId) {
  $all(".view").forEach(v => v.classList.remove("active"));
  const target = $id(viewId);
  if (target) target.classList.add("active");
}

/**
 * Sidebar controls for mobile responsiveness
 */
export function openSidebar() {
  $id("sidebar").classList.add("open");
  $id("sbOverlay").style.display = "block";
}

export function closeSidebar() {
  $id("sidebar").classList.remove("open");
  $id("sbOverlay").style.display = "none";
}

/**
 * Theme management logic
 * @param {'light' | 'dark'} theme
 */
export function setTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);

  // Update toggle button states
  toggleClasses($id("lightBtn"), { active: !isDark });
  toggleClasses($id("darkBtn"), { active: isDark });

  // Save preference if we wanted to (omitted for simplicity as per original)
}
