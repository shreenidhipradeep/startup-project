/**
 * Helper to call the Anthropic Claude API directly from React.
 * Uses dangerous browser access mode for client-side API requests.
 */
export async function callClaude(prompt, systemPrompt, maxTokens = 1500) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  if (!apiKey || apiKey === 'your_key_here' || apiKey.trim() === '') {
    throw new Error("Missing Anthropic API Key. Please add VITE_ANTHROPIC_API_KEY to your .env file in the project root folder.");
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || `API Request Failed with Status ${res.status}`;
    throw new Error(errorMessage);
  }

  const data = await res.json();
  if (!data.content || !Array.isArray(data.content)) {
    throw new Error("Invalid API response format received from Anthropic.");
  }

  return data.content.map(c => c.text || '').join('');
}
