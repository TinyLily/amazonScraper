import React, { Component } from 'react';
import { fade, withStyles, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, mergeClasses } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { cpus } from 'os';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));


const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const style = {
    button: {
        margin: '20px'
    }
};

class AsinSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asin: '',
            rank: '',
            dimensions: '',
            category: ''
        };

        this._handleSearch = this._handleSearch.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    _handleSearch = async (e, value) => {
        console.log(this.props);
        const res = await fetch('./product');
        const product = await res.json();
        console.log('@@@', product);
        this.setState(product);
        console.log(this.state);
    };

    _handleChange = (e) => {
        e.preventDefault();
        this.setState({ input: e.target.value });
    }

    render() {
        // const classes = useStyles();
        return (
            <div>
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
                <Paper>
                    <Table >
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
            </div >
        )
    }

};

export default AsinSearch

