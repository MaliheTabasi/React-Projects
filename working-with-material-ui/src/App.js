import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import {
    makeStyles,
    ThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: orange[500],
        },
    },
});
const useStyles = makeStyles({
    root: {
        border: 0,
        borderRadius: 15,
        color: 'white',
        padding: '0 30px',
        background: 'linear-gradient(45deg, #Fe6b8b, #ff8e53)',
    },
});

function ButtonStyled() {
    const classes = useStyles();
    return <Button className={classes.root}>tested styled button</Button>;
}

function CheckboxExample() {
    const [checked, setChecked] = React.useState(true);
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    icon={<DeleteIcon />}
                    checkedIcon={<SaveIcon />}
                    onChange={(e) => setChecked(e.target.checked)}
                    inputProps={{
                        'aria-label': 'secondary checkbox',
                    }}
                />
            }
            label='test checkbox'
        />
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <ButtonStyled />
                    <TextField
                        variant='outlined'
                        type='email'
                        label='email'
                        placeholder='test@test.com'
                    />
                    <CheckboxExample />
                    <ButtonGroup
                        variant='contained'
                        color='primary'
                        size='large'
                    >
                        <Button startIcon={<SaveIcon />}>Save</Button>
                        <Button startIcon={<DeleteIcon />}>Discord</Button>
                    </ButtonGroup>
                </header>
            </div>
        </ThemeProvider>
    );
}

export default App;
