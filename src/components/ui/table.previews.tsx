import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table';

const meta = { component: Table };
export default meta;

export const Default = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead style={{ textAlign: 'right' }}>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell style={{ textAlign: 'right' }}>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell style={{ textAlign: 'right' }}>$150.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
