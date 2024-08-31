import React, { useState } from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import './App.css'; // Ensure this file includes your CSS

function App() {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        'self help', 
        'reducing stress', 
        'anxiety', 
        'panic attacks', 
        'breathing exercises', 
        'stretching', 
        'calm music', 
        'meditation'
    ];

    const fetchVideos = async (query) => {
        try {
            const response = await fetch(`http://localhost:8888/api/videos?query=${query}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setVideos(data);
        } catch (err) {
            setError(err.message);
            console.error("Failed to fetch videos:", err);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchVideos(query);
    };

    const handleCategoryChange = async (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        // Fetch videos based on the selected category
        if (category) {
            fetchVideos(category);
        } else {
            setVideos([]);
        }
    };

    return (
        <div className="app-container">
            <h1>YouTube Video Recommendations</h1>
            <SearchBar onSearch={handleSearch} />
            <div className="categories-container">
                {categories.map(category => (
                    <label key={category} className="category-label">
                        <input
                            type="radio"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={handleCategoryChange}
                            className="category-input"
                        />
                        <span className="category-text">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                    </label>
                ))}
            </div>
            {error && <p className="error-message">{error}</p>}
            <VideoList videos={videos} />
        </div>
    );
}

export default App;
