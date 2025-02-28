import React, { useEffect, useState } from "react";
import { fetchDogs } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

const DogList: React.FC<{ dogIds: string[] }> = ({ dogIds }) => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const { favorites, toggleFavorite } =  useFavorites();

    useEffect(() => {
        async function getDogs() {
            if (dogIds.length > 0) {
                const dogData = await fetchDogs(dogIds);
                setDogs(dogData);
            }
        }
        getDogs();
    }, [dogIds]);
    
    return (
        <div className="grid grid-cols-3 gap-4 mt-4">
            {dogs.map((dog) => (
                <div key={dog.id} className="border p-4 rounded shadow">
                    <img src={dog.img} alt={dog.name} className="w-full h-40 object-cover" />
                    <h2 className="text-xl font-bold">{dog.name}</h2>
                    <p>Breed: {dog.breed}</p>
                    <p>Age: {dog.age}</p>
                    <p>Location: {dog.zip_code}</p>

                    <button
                        onClick={() => toggleFavorite(dog.id)}
                        className={`p-2 mt-2 rounded ${
                            favorites.includes(dog.id) ? "bg-red-500" : "bg-gray-500"
                        } text-white`}
                    >
                        {favorites.includes(dog.id) ? "Unfavorite" : "Favorite"}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default DogList;
