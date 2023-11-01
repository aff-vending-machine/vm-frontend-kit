// Add this function at the top of your script block
export function generateBreadcrumbItems(path: string, home: boolean) {
  const items = path.split('/').map((p: string, index: number, a: string[]) => {
    path = '';
    for (let i = 0; i < index; i++) {
      path += a[i] + '/';
    }
    path += p;
    return {
      link: path,
      text: p,
    };
  });
  items.shift();

  if (home) {
    items.unshift({
      link: '/',
      text: 'Home',
    });
  }

  return items;
}
