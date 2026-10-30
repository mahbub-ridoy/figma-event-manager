/**
 * Color utility functions for dynamic brand theming
 */

/**
 * Converts hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Adjusts color brightness (positive values lighten, negative values darken)
 */
export function adjustBrightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const adjust = (value: number) => {
    const adjusted = Math.round(value + (255 - value) * (percent / 100));
    return Math.min(255, Math.max(0, adjusted));
  };

  if (percent < 0) {
    // Darken
    const darken = (value: number) => {
      const adjusted = Math.round(value * (1 + percent / 100));
      return Math.min(255, Math.max(0, adjusted));
    };
    return `#${darken(rgb.r).toString(16).padStart(2, '0')}${darken(rgb.g).toString(16).padStart(2, '0')}${darken(rgb.b).toString(16).padStart(2, '0')}`;
  }

  return `#${adjust(rgb.r).toString(16).padStart(2, '0')}${adjust(rgb.g).toString(16).padStart(2, '0')}${adjust(rgb.b).toString(16).padStart(2, '0')}`;
}

/**
 * Generates gradient-friendly darker shade
 */
export function getDarkerShade(hex: string): string {
  return adjustBrightness(hex, -15);
}

/**
 * Generates gradient-friendly lighter shade
 */
export function getLighterShade(hex: string): string {
  return adjustBrightness(hex, 10);
}

/**
 * Generates hover state color (slightly darker)
 */
export function getHoverColor(hex: string): string {
  return adjustBrightness(hex, -10);
}
