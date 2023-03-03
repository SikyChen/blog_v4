const headElement = document.querySelector('head');
const titleElement = headElement?.querySelector('title');

export const setPageTitle = (title: string) => {
  titleElement && (titleElement.innerHTML = `${title} - SIKY BLOG`);
}

export const resetPageTitle = () => {
  titleElement && (titleElement.innerHTML = 'SIKY BLOG');
}
