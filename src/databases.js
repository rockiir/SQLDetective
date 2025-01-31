export const databases = {
  cities: [
    { id: 1, name: "Tokyo", country: "Japan", last_sighting: "2024-03-15", population: 37400068 },
    { id: 2, name: "Istanbul", country: "Turkey", last_sighting: "2024-03-14", population: 15462452 },
    { id: 3, name: "Cairo", country: "Egypt", last_sighting: "2024-03-13", population: 10230350 },
    { id: 4, name: "Rio de Janeiro", country: "Brazil", last_sighting: "2024-03-12", population: 6747815 },
    { id: 5, name: "New York", country: "USA", last_sighting: "2024-03-11", population: 8419600 },
    { id: 6, name: "Paris", country: "France", last_sighting: "2024-03-10", population: 2148327 },
    { id: 7, name: "London", country: "UK", last_sighting: "2024-03-09", population: 8982000 }
  ],
  witnesses: [
    { id: 1, name: "Akira Tanaka", city_id: 1, testimony: "Saw a woman in red coat near Shibuya", credibility: 90 },
    { id: 2, name: "Maria Silva", city_id: 4, testimony: "Glimpsed a suspect at Copacabana", credibility: 85 },
    { id: 3, name: "Ahmed Hassan", city_id: 3, testimony: "Overheard conversation about a heist", credibility: 75 },
    { id: 4, name: "Elena Yilmaz", city_id: 2, testimony: "Saw someone suspicious near the Grand Bazaar", credibility: 95 },
    { id: 5, name: "John Smith", city_id: 5, testimony: "Noticed a suspicious van near Central Park", credibility: 80 },
    { id: 6, name: "Sophie Dubois", city_id: 6, testimony: "Saw a woman matching Carmen's description near the Louvre", credibility: 88 },
    { id: 7, name: "James Brown", city_id: 7, testimony: "Heard rumors of a planned theft at the British Museum", credibility: 70 }
  ],
  clues: [
    { id: 1, city_id: 1, description: "Red high-heel shoe print", timestamp: "2024-03-15" },
    { id: 2, city_id: 2, description: "Torn map fragment", timestamp: "2024-03-14" },
    { id: 3, city_id: 3, description: "Encrypted message", timestamp: "2024-03-13" },
    { id: 4, city_id: 4, description: "Stolen museum artifact tag", timestamp: "2024-03-12" },
    { id: 5, city_id: 5, description: "Fingerprint on a stolen painting", timestamp: "2024-03-11" },
    { id: 6, city_id: 6, description: "Broken lock from a jewelry store", timestamp: "2024-03-10" },
    { id: 7, city_id: 7, description: "Anonymous tip about a heist", timestamp: "2024-03-09" }
  ],
  artifacts: [
    { id: 1, name: "Golden Mask", city_id: 3, stolen: true },
    { id: 2, name: "Diamond Necklace", city_id: 6, stolen: true },
    { id: 3, name: "Ancient Scroll", city_id: 1, stolen: false },
    { id: 4, name: "Renaissance Painting", city_id: 5, stolen: true },
    { id: 5, name: "Jade Statue", city_id: 2, stolen: false }
  ]
};