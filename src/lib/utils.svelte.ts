export function isActiveLink(currentPath: string, targetPath: string) {
  return currentPath.includes(targetPath) || (currentPath === '/' && targetPath === '');
}
