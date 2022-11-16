import { Collapse, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useMemo, useState } from 'react';
import { getPageCount, getPageItems, getSeq } from '../utils/function';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const initialOpens = (length) => {
  return new Array(length).fill(false);
};

const DataTable = (props) => {
  const {
    headers,
    items,
    page,
    rowsPerPage,
    onChangePage,
    sx,
    HeaderComponent,
    ItemRowComponent,
    ItemCellComponent,
    showExpand,
    expandHeaderText,
    ExpandControlComponent,
    HideControlComponent,
    CollapseContentComponent
  } = props;
  const [ opens, setOpens ] = useState(initialOpens(items.length));
  
  const emptyRows = useMemo(() => {
    return page > 0 ? Math.max(0, page * rowsPerPage - items.length) : 0;
  }, [page, rowsPerPage, items.length])

  const toggleOpen = useCallback((index) => {
    const newOpens = [...opens];
    newOpens[index] = !newOpens[index];
    setOpens(newOpens);
  }, [opens]);

  const pageCount = useMemo(() => {
    return getPageCount(items.length, rowsPerPage);
  }, [items.length, rowsPerPage]);

  const pageItems = useMemo(() => {
    return getPageItems(page, items, rowsPerPage);
  }, [page, items, rowsPerPage]);

  const DataTableCell = (({item, rowIndex, header}) => {
    if(ItemCellComponent && ItemCellComponent[header.value]) {
      const CellComponent = ItemCellComponent[header.value];
      return <CellComponent item={item} />
    } else {
      return (
        <TableCell align={header.align}>
          { header.value === "index" && header.useIndex ?
            getSeq(page, rowsPerPage, rowIndex) : item[header.value]
          }
        </TableCell>
      )
    }
  })

  const DataTableRow = ({item, index}) => {
    const arrIndex = getSeq(page, rowsPerPage, index) - 1;

    return ItemRowComponent ? 
      <ItemRowComponent item={item} index={index} />
      : (
        <TableRow>
          {headers.map(header => (
            <DataTableCell 
              key={`row-${item.id || index}-cell-${header.value || header.text}`}
              item={item}
              rowIndex={index}
              header={header}
            />
          ))}
          {showExpand && (
            <TableCell align="center">
              {opens[arrIndex] ? 
                <HideControlComponent 
                  onClick={() => toggleOpen(arrIndex)} 
                />
                : <ExpandControlComponent 
                  onClick={() => toggleOpen(arrIndex)} 
                />
              }
            </TableCell>
          )}
        </TableRow>
      );
  };
                
  const DataTableRowExpand = useCallback(({item, index}) => {
    const arrIndex = getSeq(page, rowsPerPage, index) - 1;

    return (
      <TableRow type="collapse">
        <TableCell colSpan={headers.length + 1}>
          <Collapse in={opens[arrIndex]} timeout="auto">
            <CollapseContentComponent item={item} />
          </Collapse>
        </TableCell>
      </TableRow>
    );
  }, [headers.length, showExpand, CollapseContentComponent, opens]);

  return (
    <>
      <TableContainer component={Box} sx={sx}>
        <Table>
          {HeaderComponent ? HeaderComponent : (
            <TableHead>
              <TableRow>
                {headers.map(header => (
                  <TableCell
                    key={`header-${header.value || header.text}`}
                    align={header.align} 
                    sx={header.sx}
                    width={header.width}
                  >
                    {header.text}
                  </TableCell>
                ))}
                {showExpand && (
                  <TableCell align="center">
                    {expandHeaderText}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {pageItems.map((item, index) => (
              <React.Fragment key={`row-${item.id || index}`} >
                <DataTableRow
                  item={item} 
                  index={index} 
                />
                {showExpand && (
                  <DataTableRowExpand
                    item={item} 
                    index={index} 
                  />
                )}
              </React.Fragment>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 64 * emptyRows }} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination 
        count={pageCount} 
        page={page} 
        onChange={onChangePage}
        sx={{ mt: 5 }}
      />
    </>
  );
};

DataTable.defaultProps = {
  headers: [],
  items: [],
  page: 1,
  rowsPerPage: 10,
  onChangePage: () => {},
  sx: {},
  HeaderComponent: null,
  ItemRowComponent: null,
  ItemCellComponent: null,
  showExpand: false,
  expandHeaderText: '',
  ExpandControlComponent: KeyboardArrowDownIcon,
  HideControlComponent: KeyboardArrowUpIcon,
  CollapseContentComponent: null
}

export default DataTable;