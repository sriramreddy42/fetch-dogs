import React, { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { fetchDogs, matchDogs } from "../services/api";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

const FavoriteDogs: React.FC = () => {
    const { favorites, clearFavorites } = useFavorites();
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

    const loadFavorites = async () => {
        if (favorites.length > 0) {
            const dogData = await fetchDogs(favorites);
            setDogs(dogData);
        }
    };

    const handleMatch = async () => {
        if (favorites.length === 0) return;
        const matchId = await matchDogs(favorites);
        const matchedDogData = await fetchDogs([matchId]);
        setMatchedDog(matchedDogData[0]);
    };

    return (
        <div className="p-4 border rounded shadow mt-6">
            <h2 className="text-xl font-bold">Your Favorite Dogs</h2>

            <button onClick={loadFavorites} className="p-2 bg-blue-500 text-white rounded mt-2">
                Load Favorites
            </button>

            <div className="grid grid-cols-3 gap-4 mt-4">
                {dogs.map((dog) => (
                    <div key={dog.id} className="border p-4 rounded shadow">
                        <img src={dog.img} alt={dog.name} className="w-full h-40 object-cover" />
                        <h2 className="text-xl font-bold">{dog.name}</h2>
                        <p>Breed: {dog.breed}</p>
                        <p>Age: {dog.age}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={handleMatch}
                disabled={favorites.length === 0}
                className="p-2 bg-green-500 text-white rounded mt-4"
            >
                Find My Match
            </button>

            {matchedDog && (
                <div className="mt-6 border p-4 rounded shadow">
                    <h2 className="text-xl font-bold text-center">Your Match!</h2>
                    <img src={matchedDog.img} alt={matchedDog.name} className="w-full h-40 object-cover" />
                    <h3 className="text-lg font-bold">{matchedDog.name}</h3>
                    <p>Breed: {matchedDog.breed}</p>
                    <p>Age: {matchedDog.age}</p>
                    <button
                        onClick={clearFavorites}
                        className="p-2 bg-red-500 text-white rounded mt-2"
                    >
                        Clear Favorites
                    </button>
                </div>
            )}
        </div>
    );
};

export default FavoriteDogs;
