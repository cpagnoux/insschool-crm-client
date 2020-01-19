import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

interface Props {
  products: any[];
}

const ProductList: React.FC<Props> = ({ products }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Désignation</TableCell>
        <TableCell align="right">Prix unitaire</TableCell>
        <TableCell align="right">Quantité</TableCell>
        <TableCell align="right">Total</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {products.map((product: any) => (
        <TableRow key={product.product.id}>
          <TableCell component="th" scope="row">
            <Link component={RouterLink} to={`/goodies/${product.product.id}`}>
              {product.product.name}
            </Link>
          </TableCell>
          <TableCell align="right">
            {product.product.price.toFixed(2)}
            {' €'}
          </TableCell>
          <TableCell align="right">{product.quantity}</TableCell>
          <TableCell align="right">
            {(product.product.price * product.quantity).toFixed(2)}
            {' €'}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ProductList;
