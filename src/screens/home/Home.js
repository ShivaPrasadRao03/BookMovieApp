import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Home.css';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});

//Class home
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upcomingMovies: [],
            releasedMovies: [],
            genres: [],
            artists: [],
            genresList: [],
            artistsList: [],
            releaseDateStart: "",
            releaseDateEnd: ""
        };
    }

    componentDidMount() {
        //To fetch all the movies which are published
            fetch(this.props.baseUrl +'movies?status=PUBLISHED',{
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => { this.setState({ upcomingMovies: JSON.parse(JSON.stringify(data)).movies }); })

            .catch(err => {
                console.log("fetch error" + err);
            });



        //To fetch all the movies which are released 
            fetch(this.props.baseUrl +'movies?status=RELEASED',{

            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => { this.setState({ releasedMovies: JSON.parse(JSON.stringify(data)).movies }); })

            .catch(err => {
                console.log("fetch error" + err);
            });


        //To fetch all the genres 
            fetch(this.props.baseUrl +'genres',{
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => { this.setState({ genresList: JSON.parse(JSON.stringify(data)).genres }); })

            .catch(err => {
                console.log("fetch error" + err);
            });

        //To fetch all the artists
            fetch(this.props.baseUrl +'artists',{
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => { this.setState({ artistsList: JSON.parse(JSON.stringify(data)).artists }); })

            .catch(err => {
                console.log("fetch error" + err);
            });

    }

    //On Movie change handler
    changeMovieNameHandler = event => {
        this.setState({ movieName: event.target.value });
        console.log('Movie change called')
    }

    //On Genre change handler
    selectGenreHandler = event => {
        this.setState({ genres: event.target.value });
        console.log('Genres change called')
    }

    //On Artist change handler
    selectArtistHandler = event => {
        this.setState({ artists: event.target.value });
        console.log('Artist selector called')
    }

    //On Release Date Start handler
    startDateReleaseHandler = event => {
        this.setState({ releaseDateStart: event.target.value });
        console.log('Release Date Start called')
    }

    //On Release Date End  handler
    endDateReleaseHandler = event => {
        this.setState({ releaseDateEnd: event.target.value });
        console.log('Release Date End called')

    }

    //On click of movie id handler
    clickMovieHandler = (movieId) => {
        this.props.history.push('/movie/' + movieId);
        console.log('Movie click called')

    }

    //On click of Filter 
    applyFilterHandler = () => {
        let queryString = "?status=RELEASED";
        if (this.state.movieName !== "") {
            queryString += "&title=" + this.state.movieName;
        }
        if (this.state.genres.length > 0) {
            queryString += "&genres=" + this.state.genres.toString();
        }
        if (this.state.artists.length > 0) {
            queryString += "&artists=" + this.state.artists.toString();
        }
        if (this.state.releaseDateStart !== "") {
            queryString += "&start_date=" + this.state.releaseDateStart;
        }
        if (this.state.releaseDateEnd !== "") {
            queryString += "&end_date=" + this.state.releaseDateEnd;
        }

        //Get movies based on the filters applied in the given form
        fetch(this.props.baseUrl +'movies'+  encodeURI(queryString),{
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => { this.setState({ releasedMovies: JSON.parse(JSON.stringify(data)).movies }); })

            .catch(err => {
                console.log("fetch error" + err);
            });


    }
    render() {
        const { classes } = this.props;
        return (

            <div className='container'>
                {/* Header goes here */}
                <div>
                    <Header baseUrl={this.props.baseUrl}/>
                </div>

                {/* Upcoming movies header goes here */}
                <div className={classes.upcomingMoviesHeading}>
                    <span>Upcoming Movies</span>
                </div>

                {/* List of movies goes here */}
                <GridList cellHeight={250} cols={5} className={classes.gridListUpcomingMovies} >
                    {this.state.upcomingMovies.map(movie => (
                        <GridListTile key={"upcoming" + movie.id}>
                            <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>

                {/* List of released movies goes here*/}
                <div className="flex-container">
                    <div className="left">
                        <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                            {this.state.releasedMovies.map(movie => (
                                <GridListTile onClick={() => this.clickMovieHandler(movie.id)} className="released-movie-grid-item" key={"grid" + movie.id}>
                                    <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>

                    {/* Form to select the movies based on the filters */}
                    <div className="right">
                        <Card>
                            <CardContent>
                                <FormControl className={classes.formControl}>
                                    <Typography className={classes.title} color="textSecondary">
                                        FIND MOVIES BY:
                                    </Typography>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                    <Input id="movieName" onChange={this.changeMovieNameHandler} />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox-genre" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.selectGenreHandler}
                                    >
                                        {this.state.genresList.map(genre => (
                                            <MenuItem key={genre.id} value={genre.genre}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.genre) > -1} />
                                                <ListItemText primary={genre.genre} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.artists}
                                        onChange={this.selectArtistHandler}
                                    >
                                        {this.state.artistsList.map(artist => (
                                            <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                                <Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                                <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="releaseDateStart"
                                        label="Release Date Start"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.startDateReleaseHandler}
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="releaseDateEnd"
                                        label="Release Date End"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.endDateReleaseHandler}
                                    />
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <Button onClick={() => this.applyFilterHandler()} variant="contained" color="primary">
                                        APPLY
                                    </Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </div>



                </div>

            </div>


        )
    }


}
export default withStyles(styles)(Home);