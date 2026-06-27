/**
 * Helper to call the Google Gemini API directly from React.
 * Gemini provides a generous free tier (up to 15 RPM) with zero credit cards required.
 */
export async function callGemini(prompt, systemInstruction, maxTokens = 1500, history = []) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_free_key_here' || apiKey.trim() === '') {
    throw new Error("Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  // Format history to Gemini specification: role: "user" | "model"
  const formattedContents = [];
  
  if (history && history.length > 0) {
    history.forEach((msg) => {
      // Skip the initial system/welcome greeting from history to prevent role errors
      if (msg.role === 'assistant' && msg.content.includes("Hello! I'm your Startup Co-Founder")) {
        return;
      }
      
      formattedContents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    });
  } else {
    // Single prompt request
    formattedContents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });
  }

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: formattedContents,
      systemInstruction: systemInstruction ? {
        parts: [{ text: systemInstruction }]
      } : undefined,
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 0.7
      }
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || `Gemini API Request Failed (Status ${res.status})`;
    throw new Error(errorMessage);
  }

  const data = await res.json();
  
  try {
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("Empty response received from Gemini.");
    }
    return text;
  } catch (err) {
    console.error("Gemini parse error:", data);
    throw new Error("Failed to parse Gemini response structure.");
  }
}
