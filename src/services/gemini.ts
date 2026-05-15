import { GoogleGenAI, Type } from "@google/genai";

const MOCK_ITINERARY = [
  { id: '1', time: '09:00 AM', activity: 'Arrival and Check-in', location: 'City Center Hotel', type: 'hotel' },
  { id: '2', time: '11:00 AM', activity: 'Historic Old Town Walk', location: 'Main Plaza', type: 'sightseeing' },
  { id: '3', time: '01:30 PM', activity: 'Traditional Lunch', location: 'Local Bistro', type: 'food' },
  { id: '4', time: '03:30 PM', activity: 'Art Museum Visit', location: 'National Gallery', type: 'sightseeing' },
  { id: '5', time: '07:00 PM', activity: 'Welcome Dinner & Sunset View', location: 'Rooftop Lounge', type: 'food' },
];

const MOCK_CHECKLIST = [
  { id: 'c1', text: 'Book Flights', completed: true },
  { id: 'c2', text: 'Hotel Reservation', completed: true },
  { id: 'c3', text: 'Pack Sunscreen', completed: false },
  { id: 'c4', text: 'Exchange Currency', completed: false },
  { id: 'c5', text: 'Travel Insurance', completed: false },
];

export async function generateItinerary(destination: string, budget: number, duration: number) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("Gemini API Key not found, using simulation.");
    await new Promise(r => setTimeout(r, 2000));
    return {
      itinerary: MOCK_ITINERARY,
      checklist: MOCK_CHECKLIST,
      description: `A wonderful ${duration}-day trip to ${destination} tailored for a $${budget} budget.`
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a detailed 1-day sample itinerary for a trip to ${destination} with a budget of $${budget}. Output as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  time: { type: Type.STRING },
                  activity: { type: Type.STRING },
                  location: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['sightseeing', 'food', 'transport', 'hotel'] }
                },
                required: ['id', 'time', 'activity', 'location', 'type']
              }
            },
            checklist: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  text: { type: Type.STRING },
                  completed: { type: Type.BOOLEAN }
                },
                required: ['id', 'text', 'completed']
              }
            },
            description: { type: Type.STRING }
          },
          required: ['itinerary', 'checklist', 'description']
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Generation failed, falling back to mock:", error);
    return {
      itinerary: MOCK_ITINERARY,
      checklist: MOCK_CHECKLIST,
      description: `Exploring ${destination} with high spirits!`
    };
  }
}
