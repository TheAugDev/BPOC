// This file holds all the questions for the review application.

const allReviewData = {
    generalOrders: {
        // Data will be loaded from generalOrders.json
    },
    tcole: [
        // Data will be loaded from tcole.json as an array
    ],
    texasConstitutions: {
        // Data will be loaded from texasConstitutions.json
    },
    texasStatutes: {
        // Data will be loaded from texasStatutes.json
    },
    tpcaBestPractices: {
        // Data will be loaded from tpcaBestPractices.json
    },
    BPOC: {
        // Data will be loaded from BPOC.json
    }
};

// Function to fetch and integrate external JSON data
async function loadExternalData() {
    const dataFiles = [
        { key: 'BPOC', filename: 'BPOC.json' },
        { key: 'generalOrders', filename: 'generalOrders.json' },
        { key: 'tcole', filename: 'tcole.json' },
        { key: 'texasConstitutions', filename: 'texasConstitutions.json' },
        { key: 'texasStatutes', filename: 'texasStatutes.json' },
        { key: 'tpcaBestPractices', filename: 'tpcaBestPractices.json' }
    ];

    for (const { key, filename } of dataFiles) {
        try {
            console.log(`Loading ${filename}...`);
            const response = await fetch(`data/${filename}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            if (key === 'tcole') {
                // TCOLE is an array of questions
                allReviewData.tcole = data;
            } else {
                // Other files are objects with subcategories/units
                allReviewData[key] = data;
            }
            
            console.log(`${filename} loaded successfully: ${key}`);
            if (key === 'BPOC') {
                console.log('BPOC weeks loaded:', Object.keys(data).length);
            } else if (key === 'tcole') {
                console.log('TCOLE questions loaded:', data.length);
            } else {
                console.log(`${key} categories loaded:`, Object.keys(data).length);
            }
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            // Initialize with empty structure if loading fails
            if (key === 'BPOC' && !allReviewData.BPOC) {
                allReviewData.BPOC = {};
                // Initialize empty weeks for BPOC
                for (let i = 1; i <= 21; i++) {
                    if (!allReviewData.BPOC[`week${i}`]) {
                        allReviewData.BPOC[`week${i}`] = [];
                    }
                }
                console.log("BPOC initialized with empty weeks due to loading error.");
            } else if (key === 'tcole') {
                allReviewData.tcole = [];
                console.log("TCOLE initialized as empty array due to loading error.");
            } else {
                allReviewData[key] = {};
                console.log(`${key} initialized as empty object due to loading error.`);
            }
        }
    }
}

// Call this function when the application initializes or when data is needed.
// For example, at the beginning of your script or before starting a quiz.
loadExternalData().then(() => {
    // You can now access allReviewData.BPOC with the loaded data
    console.log("All external data loaded successfully");
    console.log("Data summary:");
    console.log("- BPOC weeks:", Object.keys(allReviewData.BPOC).length);
    console.log("- TCOLE questions:", allReviewData.tcole.length);
    console.log("- General Orders units:", Object.keys(allReviewData.generalOrders).length);
    console.log("- Texas Constitutions articles:", Object.keys(allReviewData.texasConstitutions).length);
    console.log("- Texas Statutes codes:", Object.keys(allReviewData.texasStatutes).length);
    console.log("- TPCA Best Practices areas:", Object.keys(allReviewData.tpcaBestPractices).length);
}).catch(error => {
    console.error("Failed to load external data:", error);
});
