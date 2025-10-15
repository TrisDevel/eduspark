/**
 * Extract video URL from iframe string or return the URL if it's already a direct URL
 * @param materialUrl - Either an iframe string or a direct URL
 * @returns The extracted video URL or the original URL
 */
export function extractVideoUrl(materialUrl: string): string {
  if (!materialUrl) return '';
  
  // Check if it's an iframe string
  if (materialUrl.trim().startsWith('<iframe')) {
    // Extract src attribute from iframe - handle both single and double quotes
    const srcMatch = materialUrl.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
    
    // Alternative regex patterns for different iframe formats
    const altMatch = materialUrl.match(/src=([^>\s]+)/);
    if (altMatch && altMatch[1]) {
      return altMatch[1].replace(/["']/g, '');
    }
  }
  
  // Return as is if it's already a URL
  return materialUrl;
}

/**
 * Check if a URL is a video URL (YouTube, Vimeo, etc.)
 * @param url - The URL to check
 * @returns true if it's a recognized video platform URL
 */
export function isVideoUrl(url: string): boolean {
  const videoPatterns = [
    /youtube\.com/,
    /youtu\.be/,
    /vimeo\.com/,
    /dailymotion\.com/,
    /wistia\.com/,
    /streamable\.com/,
  ];
  
  return videoPatterns.some(pattern => pattern.test(url));
}

