import React from 'react';
import './VideoList.css'; // Ensure this file includes your CSS

function VideoList({ videos }) {
    return (
        <div className="video-list">
            {videos.map(video => (
                <div key={video.id.videoId} className="video-item">
                    <a
                        href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="video-link"
                    >
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="video-thumbnail"
                        />
                        <div className="video-info">
                            <h3 className="video-title">{video.snippet.title}</h3>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default VideoList;
