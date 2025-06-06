import { parse } from "best-effort-json-parser";

export function parseJSON<T>(json: string | null | undefined, fallback: T) {
  if (!json) {
    return fallback;
  }
  try {
    const raw = json
      .trim()
      .replace(/^```json\s*/, "")
      .replace(/^```\s*/, "")
      .replace(/\s*```$/, "");
    
    // Handle potential double-encoded JSON strings
    let parsed = parse(raw);
    if (typeof parsed === 'string') {
      try {
        // Try to parse again if the result is a string
        parsed = parse(parsed);
      } catch {
        // If second parse fails, use the original string result
      }
    }
    
    return parsed as T;
  } catch (error) {
    console.warn('Failed to parse JSON:', error, 'Input:', json?.substring(0, 200));
    return fallback;
  }
}
