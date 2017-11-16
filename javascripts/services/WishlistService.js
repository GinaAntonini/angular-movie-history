"use strict";

app.service("WishlistService", function($http, $q, FIREBASE_CONFIG){
const getWishlistMovies = (userUid) => {
		let movies = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/movies.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
				let fbMovies = results.data;
				Object.keys(fbMovies).forEach((key) =>{
					fbMovies[key].id = key;  // fbMovies["movies0"].id = "movies0"
					if(!fbMovies[key].isWatched){
						movies.push(fbMovies[key]);
					}
					resolve(movies);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	};
	return {getWishlistMovies};
});