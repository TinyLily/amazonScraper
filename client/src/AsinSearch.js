import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider} from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { green } from '@material-ui/core/colors';

import axios from 'axios';

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const style = {
    button: {
        margin: '20px'
    },
    root: {
        width: '90%',
        position: 'relative',
        right: '10px',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    appbar: {
        top: '20px',
        width: '100%',
    }
};

class AsinSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asin: '',
            rank: '',
            dimensions: '',
            category: '',
            name: ''
        };

        this._handleSearch = this._handleSearch.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    _handleSearch = async (e, value) => {
        const {input} = this.state;
        const res = await axios.get(`./product?asin=${input}`);
        if (!res.data) {
            this.setState({asin: 'NOT FOUND', rank: '', dimensions: '', name: '', category: ''});
        } else {
            const product = res.data;
            delete product._id;
            this.setState(product);
        }
    };

    _handleChange = (e) => {
        e.preventDefault();
        this.setState({ input: e.target.value });
    }

    render() {
        return (
            <div style={style.appbar}>
                <AppBar position="static" color="default">
                <Toolbar>
                <Typography variant="h6" color="inherit">
            Amazon Scraper
          </Typography>
                </Toolbar>
            <div>
                <ThemeProvider theme={theme}>
                    <TextField label="ASIN" variant="outlined"
                        id="asin-input" onChange={this._handleChange} />
                </ThemeProvider>
                <Button style={style.button}variant="contained" color="primary" label="Search" onClick={this._handleSearch}>
                    Search
                </Button>
            </div>

            <div>
                <Paper style={style.root}>
                    <Table style={style.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ASIN</TableCell>
                                <TableCell align="right">Product Name</TableCell>
                                <TableCell align="right">Catagory</TableCell>
                                <TableCell align="right">Rank</TableCell>
                                <TableCell align="right">Dimension</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {this.state.asin}
                                </TableCell>
                                <TableCell align="right">{this.state.name}
                                </TableCell>
                                <TableCell align="right">{this.state.category}</TableCell>
                                <TableCell align="right">{this.state.rank}</TableCell>
                                <TableCell align="right">{this.state.dimensions}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
            </AppBar>
            </div >
        )
    }

};

export default AsinSearch

