import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';

import { Dictionary } from '../types';

type Order = 'asc' | 'desc';

export interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
}

interface DataTableHeadProps {
  headCells: HeadCell[];
  order: Order;
  orderBy: string;
  onRequestSort: (event: MouseEvent<HTMLSpanElement>, property: string) => void;
}

const DataTableHead: React.FC<DataTableHeadProps> = ({
  headCells,
  order,
  orderBy,
  onRequestSort,
}) => {
  const createSortHandler = (
    property: string,
  ) => (event: MouseEvent<HTMLSpanElement>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

interface Props {
  data: Dictionary<any>[];
  headCells: HeadCell[];
  defaultOrder: Order;
  defaultOrderBy: string;
}

const DataTable: React.FC<Props> = ({
  data,
  headCells,
  defaultOrder,
  defaultOrderBy,
}) => {
  const [order, setOrder] = useState(defaultOrder);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event: unknown, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const compare = (a: any, b: any) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }

    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }

    return 0;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <Table>
        <DataTableHead
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {data
            .sort(compare)
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((item) => (
              <TableRow key={item.id}>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                  >
                    {item[headCell.id]}
                  </TableCell>
                ))}
                <TableCell>
                  <Button component={RouterLink} to={item.url}>Voir</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
