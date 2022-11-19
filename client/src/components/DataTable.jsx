import { Checkbox, Collapse, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
    CollapseContentComponent,
    checkboxSelection,
    checkboxReadonly,
    selected,
    onChangeSelected,
    onClickRow
  } = props;
  const [opens, setOpens] = useState(initialOpens(items.length));
  
  const emptyRows = useMemo(() => {
    return page > 0 ? Math.max(0, page * rowsPerPage - items.length) : 0;
  }, [page, rowsPerPage, items.length]);

  const selectedCount = useMemo(() => {
    return selected.length;
  }, [selected.length]);

  const rowCount = useMemo(() => {
    return items.length;
  }, [items.length]);

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
  });
  
  const isSelected = (item) => {
    return selected.indexOf(item) !== -1;
  };

  const DataTableRow = ({item, index}) => {
    const arrIndex = getSeq(page, rowsPerPage, index) - 1;
    const isItemSelected = isSelected(item);

    return ItemRowComponent ? 
      <ItemRowComponent item={item} index={index} />
      : (
        <TableRow 
          clickable={onClickRow != null ? "true" : "false"}
          onClick={(e) => onClickTableRowComponent(e, item)}
        >
          {checkboxSelection && (
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                disabled={checkboxReadonly}
                checked={isItemSelected}
                onClick={() => handleSelectRow(item)}
              />
            </TableCell>
          )}
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

  const handleSelectRow = (row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    onChangeSelected(newSelected);
  };
                
  const DataTableRowExpand = useCallback(({item, index}) => {
    const arrIndex = getSeq(page, rowsPerPage, index) - 1;

    return (
      <TableRow type="collapse">
        <TableCell colSpan={headers.length + (checkboxSelection? 2 : 1)}>
          <Collapse in={opens[arrIndex]} timeout="auto">
            <CollapseContentComponent item={item} />
          </Collapse>
        </TableCell>
      </TableRow>
    );
  }, [headers.length, showExpand, CollapseContentComponent, opens]);

  const toggleOpen = useCallback((index) => {
    const newOpens = [...opens];
    newOpens[index] = !newOpens[index];
    setOpens(newOpens);
  }, [opens]);

  const handleSelectAllClick = useCallback((event) => {
    if (event.target.checked) {
      const newSelected = items;
      onChangeSelected(newSelected);
      return;
    }

    onChangeSelected([]);
  }, []);

  const onClickTableRowComponent = useCallback((event, row) => {
    if(onClickRow == null) return;
    onClickRow(event, row);
  }, [onClickRow]);

  return (
    <>
      <TableContainer component={Box} sx={sx}>
        <Table>
          {HeaderComponent ? HeaderComponent : (
            <TableHead>
              <TableRow>
                {checkboxSelection && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      disabled={checkboxReadonly}
                      indeterminate={selectedCount > 0 && selectedCount < rowCount}
                      checked={rowCount > 0 && selectedCount === rowCount}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                )}
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
  CollapseContentComponent: null,
  checkboxSelection: false,
  checkboxReadonly: false,
  selected: [],
  onChangeSelected: () => {},
  onClickRow: null
}

export default DataTable;