/**
 * Common utility functions for DOM manipulation and state helpers.
 * These are kept separate to keep the main logic clean and DRY.
 */

/**
 * Shorthand for document.getElementById
 * @param {string} id - The ID of the element
 * @returns {HTMLElement}
 */
export const $id = (id) => document.getElementById(id);

/**
 * Shorthand for document.querySelectorAll
 * @param {string} selector - The CSS selector
 * @returns {NodeList}
 */
export const $all = (selector) => document.querySelectorAll(selector);

/**
 * Toggle multiple classes on an element
 * @param {HTMLElement} el - The element
 * @param {Object} classMap - Object with class names as keys and booleans as values
 */
export const toggleClasses = (el, classMap) => {
    if (!el) return;
    Object.entries(classMap).forEach(([className, force]) => {
        el.classList.toggle(className, force);
    });
};
