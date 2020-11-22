import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
import { paginate } from '../utils/paginate';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Movie extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' },
        searchQuery: '',
        selectedGenre: null,
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ _id: '', name: 'All Genres' }, ...data];
        const { data: movies } = await getMovies();
        this.setState({ genres, movies });
    }

    handleDelete = async (movie) => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter((m) => m._id !== movie._id);
        this.setState({ movies });

        try {
            await deleteMovie(movie._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error('this movie has already been deleted');
            this.setState({ movies: originalMovies });
        }
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movie };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = (genre) => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1,
            searchQuery: '',
        });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };
    getPageData() {
        const {
            pageSize,
            currentPage,
            selectedGenre,
            movies: allMovies,
            sortColumn,
            searchQuery,
        } = this.state;

        let filtered = allMovies;
        if (searchQuery)
            filtered = allMovies.filter((m) =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(
                (m) => m.genre._id === selectedGenre._id
            );

        const sorted = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]
        );

        const movies = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: movies };
    }

    handleSearch = (query) => {
        this.setState({
            searchQuery: query,
            currentPage: 1,
            selectedGenre: null,
        });
    };

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
        const { user } = this.props;

        if (count === 0) return <p>There are no movies in database!</p>;

        const { totalCount, data: movies } = this.getPageData();

        return (
            <div className='row'>
                <div className='col-3'>
                    <ListGroup
                        items={this.state.genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={this.state.selectedGenre}
                    />
                </div>
                <div className='col'>
                    {user && (
                        <Link
                            to='/movies/new'
                            className='btn btn-primary'
                            style={{ marginBottom: 20 }}
                        >
                            New Movie
                        </Link>
                    )}
                    <SearchBox
                        value={searchQuery}
                        onChange={this.handleSearch}
                    />
                    <p>Showing {totalCount} movies in the database.</p>
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        );
    }
}

export default Movie;
