import React, { useCallback, useContext, useMemo, useState } from 'react';
import { FlatList } from 'react-native';

import { EmptyMessage, HorizontalScroll, Load, LoadCenter } from '@ui/styled';
import { CoreContext } from '@context/CoreContext';
import SideFilters from '@components/SideFilters';
import TableHeader from '../TableHeader';
import CustomTablePagination from '../TablePagination';

import { 
    TableContainer,
    TableHeaderRow,
    TableHeaderCell,
    TableRow,
    TableCell,
 } from './styled';

export default function BasicTable({ columns, rows, loading, config }) {
  const { pagination, filter: filterable, search: searchable, tabs: tabsable } =
    config || {};

//   const { sideFilter, setSideFilter } = useContext(CoreContext);

  const [currentTab, setCurrentTab] = useState(0);
  const [sideFilter, setSideFilter] = useState(false);
  const [currentFilters, setCurrentFilters] = useState(null);
  const [searchExpression, setSearchExpression] = useState('');

  const filterExpression = useCallback(
    (item) =>
      !searchExpression ||
      Object.keys(item).some((k) =>
        `${item[k]}`.toLowerCase().includes(searchExpression.toLowerCase())
      ),
    [searchExpression]
  );

  const filterFilters = useCallback(
    (item) =>
      !currentFilters ||
      Object.keys(currentFilters).filter(
        (key) =>
          currentFilters[key] === item?.[key]?.documentId ||
          currentFilters[key] === item?.[key]
      ).length === Object.keys(currentFilters).length,
    [currentFilters]
  );

  const filterTab = useCallback(
    (item) =>
      !currentTab ||
      tabs?.[currentTab]?.id === (tabsable?.all || 'Todos') ||
      tabsable?.options?.[currentTab - 1]?.id === item?.[tabsable?.ref],
    [currentTab, tabsable]
  );

  const tabs = useMemo(() => {
    if (!tabsable) return null;
    return [
      { id: tabsable?.all || 'Todos', title: tabsable?.all || 'Todos' },
      ...tabsable.options,
    ];
  }, [tabsable]);

  const filterFormItems = useMemo(() => {
    const reduceId = (p, c) =>
      p.map((m) => m.id).includes(c.id) ? p : [...p, c];

    return columns
      ?.filter((f) => f?.ref && f?.ref !== 'id')
      ?.map((col) => ({
        ref: col.ref,
        label: col.title,
        placeholder: `Selecione ${col.title}`,
        full: true,
        options: rows
          ?.map((m) => ({
            id: m?.[col.ref],
            title:
              typeof col.parseFilter === 'function'
                ? col.parseFilter(m?.[col.ref])
                : m?.[col.ref],
          }))
          ?.reduce(reduceId, []),
      }));
  }, [rows, columns]);

  const filtredRows = useMemo(() => {
    return rows
      ?.filter(filterTab)
      ?.filter(filterExpression)
      ?.filter(filterFilters);
  }, [rows, filterTab, filterExpression, filterFilters]);

  const onPageChange = (_, p) => {
    pagination?.setPage?.(p);
  };

  const renderRow = ({ item }) => (
    <TableRow>
      {columns.map((col, index) => (
        <TableCell key={index} alignLeft={index === 0}>
          {col.renderCell ? col.renderCell({ row: item }) : item?.[col.ref]}
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <>
      <TableHeader
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        searchExpression={searchable && searchExpression}
        setSearchExpression={searchable && setSearchExpression}
        isActive={filterable && sideFilter}
        setIsActive={filterable && setSideFilter}
        filterLabel={filterable?.placeholder}
        searchLabel={searchable?.placeholder}
      />


      <SideFilters
        formItems={filterFormItems}
        isActive={sideFilter}
        setIsActive={setSideFilter}
        currentFilters={currentFilters}
        setCurrentFilters={setCurrentFilters}
      />
      
        <TableContainer>
            <HorizontalScroll>
                <TableContainer>
                    <TableHeaderRow>
                        {columns.map((col, index) => (
                            <TableHeaderCell key={index} alignLeft={index === 0}>
                                {col.title}
                            </TableHeaderCell>
                        ))}
                    </TableHeaderRow>
                    {!loading ? (
                        filtredRows?.length ? (
                            <FlatList
                                data={filtredRows}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={renderRow}
                            />
                        ) : (
                            <EmptyMessage>Nenhum registro encontrado</EmptyMessage>
                        )
                    ) : (
                        <LoadCenter>
                            <Load />
                        </LoadCenter>
                    )}
                </TableContainer>
            </HorizontalScroll>
        </TableContainer>

      {!pagination ||
      !filtredRows?.length ||
      pagination.pageCount < 2 ? null : (
        <CustomTablePagination
          count={pagination.total}
          page={pagination.page}
          rowsPerPage={pagination.pageSize}
          onPageChange={onPageChange}
        />
      )}

    </>
  );
}
