/**
 * Helper to call the Google Gemini API directly from React.
 * Gemini provides a generous free tier (up to 15 RPM) with zero credit cards required.
 * Equips callGemini with automatic retry handling for 429 quota/rate limits.
 */
export async function callGemini(prompt, systemInstruction, maxTokens = 1500, history = [], retries = 3, delayMs = 3000) {
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

  for (let attempt = 1; attempt <= retries; attempt++) {
    const currentDelay = attempt === 1 ? 5000 : 16000;
    
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
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

      // If Rate Limit hit (HTTP 429), trigger backoff retry
      if (res.status === 429) {
        if (attempt < retries) {
          console.warn(`Gemini 429 Rate Limit. Retrying in ${currentDelay}ms (Attempt ${attempt}/${retries})...`);
          await new Promise(resolve => setTimeout(resolve, currentDelay));
          continue;
        }
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `Gemini API Request Failed (Status ${res.status})`;
        
        // If error message indicates rate/quota issues, retry
        const errLower = errorMessage.toLowerCase();
        if (errLower.includes("quota") || errLower.includes("rate limit") || errLower.includes("limit") || errLower.includes("429")) {
          if (attempt < retries) {
            console.warn(`Gemini Quota Error: "${errorMessage}". Retrying in ${currentDelay}ms (Attempt ${attempt}/${retries})...`);
            await new Promise(resolve => setTimeout(resolve, currentDelay));
            continue;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("Empty response received from Gemini.");
      }
      return text;
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
      console.warn(`Attempt ${attempt} failed: ${err.message}. Retrying in ${currentDelay}ms...`);
      await new Promise(resolve => setTimeout(resolve, currentDelay));
    }
  }
}
