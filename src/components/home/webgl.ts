/**
 * Prüft, ob der Browser WebGL2 kann. three.js (ab r163) setzt WebGL2 voraus,
 * ein reiner WebGL1-Browser würde sonst beim Erzeugen des Renderers abbrechen.
 * Der Test-Kontext wird sofort wieder freigegeben.
 */
export function supportsWebGL2() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

/** Datensparmodus oder sehr langsame Verbindung: dann keine 3D-Szenen laden */
export function prefersLightweight() {
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  return connection?.saveData === true || /(^|-)2g$/.test(connection?.effectiveType ?? '');
}
