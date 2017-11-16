"use strict";

app.controller("SearchCtrl", function($location, $rootScope, $scope, MovieService, tmdbService){
    $scope.movies = [];

    const createMovie = (movie) => {
        return {
            "title": movie.title,
            "overview": movie.overview,
            "poster_path": movie.poster_path,
            "rating": 0,
            "isWatched": true,
            "uid": $rootScope.uid
        };
    };

    $scope.enterPush = (event) => {
        if(event.keyCode === 13){
            console.log("event", event.target.value);
            tmdbService.searchMovies(event.target.value).then((results) => {
                console.log(results.data.results);
                $scope.movies = results.data.results;
            }).catch((err) => {
                console.log("error in searchMovies", err);
            });
        }
    };

$scope.saveRated = (tmdbMovie) => {
    let newMovie = createMovie(tmdbMovie);
    MovieService.postNewMovie(newMovie).then(() => {
        $location.path('/rated');
    }).catch((err) => {
        console.log("error in postNewMovie", err);
    });
};

});