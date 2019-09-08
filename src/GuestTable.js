import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  flatCell: {
    padding: "2px 20px 2px 16px"
  },
}));


function getFlag(location) {
  if (location.toLowerCase() == "toronto") {
    return <img src="/canada.png" />;
  } else if (location.toLowerCase() == "hong kong") {
    return <img src="/hk.png" />; //"🇭🇰";
  } else if (location.toLowerCase() == "sydney") {
    return <img src="/aussie.png" />; //"🇦🇺";
  } else if (location.toLowerCase() == "new york" || location.toLowerCase() == "san francisco") {
    return <img src="/usa.png" />; //"🇺🇸";
  } else if (location.toLowerCase() == "kota kinabalu") {
    return <img src="/malay.png" />; //"🇲🇾";
  } else if (location.toLowerCase() == "paris") {
    return <img src="/france.png" />; //"🇫🇷";
  }
}
export default function GuestTable({ rows = [], initialPage = 0, rowsPP = 24, pageNum = 0 }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPP);

  return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow style={{paddingLeft: 20}}>
            <TableCell style={{paddingLeft: 70}} width={150} className={classes.flatCell}>TIME</TableCell>
            <TableCell width={220} className={classes.flatCell}>PASSENGER</TableCell>
            <TableCell width={220} className={classes.flatCell}></TableCell>
            <TableCell width={150} className={classes.flatCell}>FLIGHT</TableCell>
            <TableCell width={25} style={{ paddingRight: 0 }} className={classes.flatCell}></TableCell>
            <TableCell width={200} className={classes.flatCell}>FROM</TableCell>
            <TableCell className={classes.flatCell}>DESTINATION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.slice(pageNum * rowsPerPage, pageNum * rowsPerPage + rowsPerPage).map(
              row => {
                return (
                  <TableRow height={row.lastName && 25 || 16} style={{paddingLeft: 20}} key={row.name}>
                    <TableCell style={{ borderBottom: 0, paddingLeft: 70, fontWeight: "bold" }} className={classes.flatCell}>{row.lastName && "7:00PM" || ""}</TableCell>
                    <TableCell style={{ borderBottom: 0}} className={classes.flatCell}>{row.lastName && row.lastName.toUpperCase()}</TableCell>
                    <TableCell style={{ borderBottom: 0}} className={classes.flatCell}>{row.firstName && row.firstName.toUpperCase()}</TableCell>
                    <TableCell style={{ borderBottom: 0, fontWeight: "bold", color: "rgb(255,192,0)" }} className={classes.flatCell}>{row.lastName && "KK 0908" }</TableCell>
                    <TableCell style={{ borderBottom: 0, paddingRight: 0 }} className={classes.flatCell}>{row.from && row.from && getFlag(row.from.toUpperCase()) }</TableCell>
                    <TableCell style={{ borderBottom: 0, fontWeight: "bold" }} className={classes.flatCell}>{row.from && row.from.toUpperCase()}</TableCell>
                    <TableCell style={{ borderBottom: 0}} className={classes.flatCell}>{row.destination && row.destination.toUpperCase()}</TableCell>
                  </TableRow>
                );
            })
          }
        </TableBody>
      </Table>
  );
};
