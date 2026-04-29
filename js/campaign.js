import { $id, $all, toggleClasses } from './utils.js';
import { showView, closeSidebar } from './ui.js';

/**
 * Campaign Workflow Manager
 * Handles the state and UI updates specifically for the campaign creation process.
 */

// Internal state for the campaign module
const state = {
    currentWorkflow: 'adv',
    currentMethod: null,
    isSectionOpen: true
};

/**
 * Modal and Workflow Selection
 */
export function openModal() {
    $id("modal").classList.remove("hidden");
}

export function closeModal() {
    $id("modal").classList.add("hidden");
}

/**
 * Pick a workflow (Advanced or Standard)
 * @param {'adv' | 'std'} type 
 */
export function pickWorkflow(type) {
    state.currentWorkflow = type;
    
    ["adv", "std"].forEach(opt => {
        const idSuffix = opt.charAt(0).toUpperCase() + opt.slice(1);
        const el = $id(`wf${idSuffix}`);
        const radio = el.querySelector(".wf-radio");
        const dot = el.querySelector(".radio-dot");
        
        const isSelected = opt === type;
        el.classList.toggle("sel", isSelected);
        
        if (isSelected) {
            radio.style.cssText = "border-color:#4361ee;background:#4361ee";
            dot.style.display = "block";
        } else {
            radio.style.cssText = "border-color:#d1d5db;background:#fff";
            dot.style.display = "none";
        }
    });
}

/**
 * Transition from Modal to Campaign View
 */
export function proceedToCampaign() {
    closeModal();
    resetCampaignState();
    showView("vCampaign");
}

function resetCampaignState() {
    state.currentMethod = null;
    
    // Clear selections
    $all(".imp-card").forEach(c => c.classList.remove("selected", "dimmed"));
    $all(".sub-sec").forEach(s => s.classList.remove("show"));
    
    // Reset visual indicators
    const dot = $id("impDot");
    dot.className = "step-dot active";
    dot.innerHTML = "";
    
    $id("impBadge").textContent = "";
    $id("llCardTitle").textContent = "Lead Lists";
    $id("llCardDesc").textContent = "Use Lead Finder to find audience.";
}

/**
 * Section Toggling
 */
export function toggleSection() {
    state.isSectionOpen = !state.isSectionOpen;
    const body = $id("impBody");
    const chev = $id("impChev");
    
    body.style.display = state.isSectionOpen ? "" : "none";
    chev.className = `chev ${state.isSectionOpen ? "up" : "down"}`;
}

/**
 * Import Method Selection
 */
export function pickImportMethod(method) {
    state.currentMethod = method;

    // Handle card highlighting
    const cardMap = { li: "cLI", csv: "cCSV", ll: "cLL", wh: "cWH" };
    Object.keys(cardMap).forEach(key => {
        const el = $id(cardMap[key]);
        toggleClasses(el, {
            "selected": key === method,
            "dimmed": key !== method
        });
    });

    updateStepIndicators(method);

    // Show relevant sub-section
    const subMap = { li: "sLI", csv: "sCSV", ll: "sLL", wh: "sWH" };
    $all(".sub-sec").forEach(s => s.classList.remove("show"));
    $id(subMap[method]).classList.add("show");

    if (method === "ll") {
        $id("llSubName").textContent = "Lookalike Audience";
    }
}

/**
 * Updates the step dot and badge based on chosen method
 */
function updateStepIndicators(method) {
    const dot = $id("impDot");
    const badge = $id("impBadge");

    if (method === "li") {
        dot.className = "step-dot done";
        dot.innerHTML = '<svg fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
        badge.textContent = "";
        
        $id("llCardTitle").textContent = "Lookalike Audience";
        $id("llCardDesc").textContent = "Use Lead Finder to find audience.";
    } else if (method === "csv") {
        dot.className = "step-dot active";
        dot.innerHTML = "";
        badge.textContent = "Step 1 of 2";
        
        $id("llCardTitle").textContent = "Lookalike Audience";
        $id("llCardDesc").textContent = "Upload your best profiles, let AI find their lookalikes.";
    } else {
        dot.className = "step-dot active";
        dot.innerHTML = "";
        badge.textContent = "";
    }
}
