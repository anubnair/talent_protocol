// utils.js

// Location language mapping
export const locationLanguageMapping = {
    "United States": ["English"],
    "United Kingdom": ["English"],
    "Canada": ["English", "French"],
    "France": ["French"],
    "Germany": ["German"],
    "Spain": ["Spanish"],
    "India": ["Hindi", "English", "Bengali", "Tamil", "Telugu"],
    "China": ["Mandarin"],
    "Japan": ["Japanese"],
    "Russia": ["Russian"],
    "Brazil": ["Portuguese"],
    "Mexico": ["Spanish"],
    "Italy": ["Italian"],
    "South Africa": ["English", "Zulu", "Afrikaans"],
    "Australia": ["English"],
    "New Zealand": ["English", "Maori"],
    "Singapore": ["English", "Mandarin", "Malay", "Tamil"],
    "Malaysia": ["Malay", "English"],
    "Switzerland": ["German", "French", "Italian"],
    "Netherlands": ["Dutch", "English"],
    "Sweden": ["Swedish"],
    "Norway": ["Norwegian"],
    "Denmark": ["Danish"],
    "Finland": ["Finnish", "Swedish"],
    "Belgium": ["Dutch", "French", "German"],
    "Argentina": ["Spanish"],
    "Chile": ["Spanish"],
    "Colombia": ["Spanish"],
    "Peru": ["Spanish"],
    "Philippines": ["Filipino", "English"],
    "Vietnam": ["Vietnamese"],
    "South Korea": ["Korean"],
    "Saudi Arabia": ["Arabic"],
    "United Arab Emirates": ["Arabic", "English"],
    "Egypt": ["Arabic"],
    "Turkey": ["Turkish"],
    "Greece": ["Greek"],
    "Poland": ["Polish"],
    "Czech Republic": ["Czech"],
    "Hungary": ["Hungarian"],
    "Portugal": ["Portuguese"],
    "Pakistan": ["Urdu", "English"],
    "Bangladesh": ["Bengali"],
    "Sri Lanka": ["Sinhala", "Tamil"],
    "Indonesia": ["Indonesian"],
    "Thailand": ["Thai"],
    "Kenya": ["English", "Swahili"],
    "Nigeria": ["English", "Hausa", "Yoruba", "Igbo"],
    "Ghana": ["English"],
    "Israel": ["Hebrew", "Arabic"],
};

// Function to get languages by location
export const getLanguagesByLocation = (location) => {
    return locationLanguageMapping[location] || ["English"]; // Default to English if location not found
};

// Bio roles mapping
export const bioRolesMapping = {
    "blockchain": ["Blockchain Engineer", "Smart Contract Developer"],
    "ai": ["AI Engineer", "Machine Learning Specialist"],
    "data": ["Data Scientist", "Data Analyst"],
    "developer": ["Software Engineer", "Full Stack Developer"],
    "manager": ["Project Manager", "Team Lead"],
    "cloud": ["Cloud Architect", "DevOps Engineer"],
    "security": ["Cybersecurity Specialist", "Security Engineer"],
    "research": ["Researcher", "R&D Specialist"],
    "product": ["Product Manager", "Product Designer"],
    "finance": ["Financial Analyst", "DeFi Specialist"],
    "marketing": ["Marketing Specialist", "Growth Hacker"],
    "design": ["UI/UX Designer", "Graphic Designer"],
};

// Function to get roles from bio
export const getRolesFromBio = (bio) => {
    const matchedRoles = [];

    // Iterate over the mapping to find keywords in the bio
    if (bio) {
        Object.keys(bioRolesMapping).forEach((keyword) => {
            if (bio.toLowerCase().includes(keyword)) {
                matchedRoles.push(...bioRolesMapping[keyword]);
            }
        });
    }

    // Default to a generic role if no match is found
    return matchedRoles.length > 0 ? matchedRoles : ["Professional"];
};
