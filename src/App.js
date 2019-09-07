import React from 'react';
import Typography from '@material-ui/core/Typography';
import GuestTable from './GuestTable';
import Grid from '@material-ui/core/Grid';
import { ReactComponent as FlightIcon } from './flight-icon.svg';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import Papa from 'papaparse';

const guestList = [];

function loadGuests() {
  return fetch('/guests.csv').then(function (response) {
    let reader = response.body.getReader();
    let decoder = new TextDecoder('utf-8');

    return reader.read().then(function (result) {
        return decoder.decode(result.value);
    });
  });
}


function createData(lastName, firstName, from, destination) {
  return { lastName, firstName, from, destination };
}

function Header() {
  return (
    <div style={{
      margin: 12,
      paddingLeft: 50,
    }}>
      <FlightIcon fill="white" width={55} height={55} style={{
        top: ".47em",
        position: "relative"
      }} />
      <Typography variant="h2" component="body1" align="left" style={{paddingLeft: 20}}>
        {'ARRIVALS'}
      </Typography>
    </div>

  );
}


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      guestList: [],
      page: 0,
      rowsPerPage: 32
    }
  };

  async loadData() {
    const csvData = await loadGuests();

    Papa.parse(csvData, {
        complete: (result) => {
          const guestList = [];
          result.data.forEach(guest => {
            guestList.push(createData(guest[2], guest[3], guest[7], guest[9]))
          });
          this.setState({ guestList })
        }
    });
  };

  componentWillMount() {
    this.loadData();
    setInterval(() => {
      const maxPage = Math.ceil(this.state.guestList.length / this.state.rowsPerPage);

      this.setState({ page: (this.state.page + 1) % maxPage })
    }, 10000);
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        type: 'dark',
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <div>
          <CssBaseline />

          <Header />

          <Grid container spacing={0}>
            <Grid item xs>
              <GuestTable rows={this.state.guestList} rowsPP={this.state.rowsPerPage} pageNum={this.state.page} />
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;