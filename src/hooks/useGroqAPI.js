/**
 * Helper to call the Groq completions API directly from React.
 * Groq offers Llama 3 models completely for free under its developer tier.
 */
export async function callGroq(prompt, systemInstruction, maxTokens = 1500, history = []) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey || apiKey === 'your_groq_key_here' || apiKey.trim() === '') {
    throw new Error("Missing Groq API Key. Please add VITE_GROQ_API_KEY to your .env file.");
  }

  // Format messages to Groq/OpenAI specification
  const formattedMessages = [];
  
  if (systemInstruction) {
    formattedMessages.push({
      role: 'system',
      content: systemInstruction
    });
  }

  if (history && history.length > 0) {
    history.forEach((msg) => {
      // Skip the initial welcome message from history to prevent context cluttering
      if (msg.role === 'assistant' && msg.content.includes("Hello! I'm your Startup Co-Founder")) {
        return;
      }
      formattedMessages.push({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      });
    });
  } else {
    formattedMessages.push({
      role: 'user',
      content: prompt
    });
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: formattedMessages,
      max_tokens: maxTokens,
      temperature: 0.7
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || `Groq API Request Failed (Status ${res.status})`;
    throw new Error(errorMessage);
  }

  const data = await res.json();
  
  try {
    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error("Empty response received from Groq.");
    }
    return text;
  } catch (err) {
    console.error("Groq parse error:", data);
    throw new Error("Failed to parse Groq response structure.");
  }
}
