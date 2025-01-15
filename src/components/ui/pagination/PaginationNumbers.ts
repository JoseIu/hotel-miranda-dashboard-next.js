type Props = {
  currentPage: number;
  totalPages: number;
};

export const PaginationNumbers = ({ currentPage, totalPages }: Props) => {
  // If totalPages is 7 or less, show all pages with no ellipsis
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  //If currentPage is between 3 first pages, show first 3 pages, ellipsis and the 2 last pages
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }
  //If currentPage is between last pages, show the 2 first pages, ellipsis and the last 3 pages
  if (currentPage > totalPages - 3) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  //If the currentPage is in other vases, show the first page, ellipsis, the currentPage and neighbors, ellipsis and the last page
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};
