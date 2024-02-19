import { DatabaseFileManagerClient } from './router.js';

document.addEventListener("DOMContentLoaded", function () {
    const dbFileManagerClient = new DatabaseFileManagerClient();

    // Fetch user stats and render on success
    dbFileManagerClient.getUserStats();
});

// Helper function to generate color based on user rank

