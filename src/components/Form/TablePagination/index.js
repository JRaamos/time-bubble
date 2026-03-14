import React, { useEffect, useState } from 'react';
import { Content, PageButton, PageButtonText, PaginationContainer, Rotate } from './styled';
 
import Icon from '@assets/icons'   
import { Colors } from '@ui/themes/default';

export default function CustomTablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
}) {
  const [displayedRows, setDisplayedRows] = useState(0);

  const totalPages = Math.ceil(count / rowsPerPage);

  useEffect(() => {
    const start = page * rowsPerPage;
    const end = Math.min(count, start + rowsPerPage);
    setDisplayedRows(end - start);
  }, [page, rowsPerPage, count]);

  return (
    <PaginationContainer>
      <Content>
        {/* Botão anterior */}
        <PageButton
          link
          disabled={page === 0}
          onPress={() => onPageChange(null, page - 1)}
        >
          {/* <PageButtonText disabled={page === 0}>{'<'}</PageButtonText> */}
          <Icon icon={"chevron"} fill={Colors.secondary} height={12} />
        </PageButton>

        {/* Botões de página */}
        {Array.from({ length: totalPages }).map((_, pageNumber) => (
          <PageButton
            key={pageNumber}
            active={page === pageNumber}
            outline={page !== pageNumber}
            onPress={() => onPageChange(null, pageNumber)}
          >
            <PageButtonText active={page === pageNumber}>
              {pageNumber + 1}
            </PageButtonText>
          </PageButton>
        ))}

        {/* Botão próximo */}
        <PageButton
          link
          disabled={page >= totalPages - 1}
          onPress={() => onPageChange(null, page + 1)}
        >
          {/* <PageButtonText disabled={page >= totalPages - 1}>
            {'>'}
          </PageButtonText> */}
          <Rotate>
            <Icon icon={"chevron"} fill={Colors.secondary} height={12} />
          </Rotate>
        </PageButton>
      </Content>
    </PaginationContainer>
  );
}
