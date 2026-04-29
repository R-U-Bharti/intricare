import * as ui from './js/ui.js';
import * as campaign from './js/campaign.js';
import * as handlers from './js/handlers.js';
import { $id } from './js/utils.js';

/**
 * Main application entry point.
 * Initializes the application state and attaches all event listeners.
 * 
 * Using dynamic event listeners instead of inline 'onclick' for:
 * 1. Better separation of concerns (HTML vs JS)
 * 2. Easier debugging and maintenance
 * 3. Avoiding global namespace pollution
 */

document.addEventListener("DOMContentLoaded", () => {
    initEventListeners();
});

function initEventListeners() {
    // Navigation & Global UI
    $id("sbOverlay")?.addEventListener("click", ui.closeSidebar);
    $id("lightBtn")?.addEventListener("click", () => ui.setTheme('light'));
    $id("darkBtn")?.addEventListener("click", () => ui.setTheme('dark'));
    
    // Using event delegation for some repeated elements can be more efficient,
    // but for this scale, direct attachment is fine and often more readable.
    
    // Sidebar items
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            ui.showView("vEmpty");
            ui.closeSidebar();
        });
    });

    // Mobile menu toggle
    document.querySelectorAll(".mobile-menu").forEach(btn => {
        btn.addEventListener("click", ui.openSidebar);
    });

    // Modal triggers
    $id("newCampaignBtn")?.addEventListener("click", campaign.openModal);
    $id("closeModalX")?.addEventListener("click", campaign.closeModal);
    $id("closeModalBtn")?.addEventListener("click", campaign.closeModal);
    $id("proceedBtn")?.addEventListener("click", campaign.proceedToCampaign);

    // Workflow selection
    $id("wfAdv")?.addEventListener("click", () => campaign.pickWorkflow('adv'));
    $id("wfStd")?.addEventListener("click", () => campaign.pickWorkflow('std'));

    // Campaign view actions
    $id("impChev")?.parentElement?.addEventListener("click", campaign.toggleSection);
    
    // Import methods
    $id("cLI")?.addEventListener("click", () => campaign.pickImportMethod('li'));
    $id("cCSV")?.addEventListener("click", () => campaign.pickImportMethod('csv'));
    $id("cLL")?.addEventListener("click", () => campaign.pickImportMethod('ll'));
    $id("cWH")?.addEventListener("click", () => campaign.pickImportMethod('wh'));

    // Validation
    $id("validateLiBtn")?.addEventListener("click", handlers.validateLinkedIn);

    // File handling
    const csvDrop = $id("csvDrop");
    const csvFileInput = $id("csvFile");

    csvDrop?.addEventListener("click", () => csvFileInput?.click());
    csvDrop?.addEventListener("dragover", (e) => {
        e.preventDefault();
        csvDrop.classList.add('over');
    });
    csvDrop?.addEventListener("dragleave", () => csvDrop.classList.remove('over'));
    csvDrop?.addEventListener("drop", handlers.handleFileDrop);
    csvFileInput?.addEventListener("change", handlers.handleFileSelect);
    
    // Breadcrumb navigation
    $id("breadcrumbCampaign")?.addEventListener("click", () => ui.showView("vEmpty"));
}
