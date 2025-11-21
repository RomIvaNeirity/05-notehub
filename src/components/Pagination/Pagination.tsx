import React from "react";
import ReactPaginate from "react-paginate";
import css from "../Pagination/Pagination.module.css";

interface PaginationProps {
  pageCount: number; // кількість сторінок
  currentPage: number; // поточна сторінка (0-indexed)
  onPageChange: (selectedPage: number) => void; // callback при зміні сторінки
}

function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      forcePage={currentPage}
      onPageChange={({ selected }) => onPageChange(selected)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="←"
      nextLabel="→"
    />
  );
}

export default Pagination;
