import React, { useState } from 'react';
import VideoList from './VideoList';

function VideoRecommendations() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [videos, setVideos] = useState([]);

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

    const handleCategoryChange = async (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        
        // Fetch videos based on the selected category
        if (category) {
            const response = await fetch(`http://localhost:8888/api/videos?query=${category}`);
            const data = await response.json();
            setVideos(data);
        } else {
            setVideos([]);
        }
    };

    return (
        <div>
            <h1>YouTube Video Recommendations</h1>
            <div className="checkbox-container">
                {categories.map(category => (
                    <label key={category}>
                        <input
                            type="radio"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={handleCategoryChange}
                        />
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                ))}
            </div>
            <VideoList videos={videos} />
        </div>
    );
}

export default VideoRecommendations;
