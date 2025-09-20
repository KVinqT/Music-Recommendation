// Music Recommendation System JavaScript

class MusicRecommendationSystem {
    constructor() {
        this.searchInput = document.getElementById('lyricsInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.loadingSection = document.getElementById('loadingSection');
        this.resultsSection = document.getElementById('resultsSection');
        this.errorSection = document.getElementById('errorSection');
        this.musicGrid = document.getElementById('musicGrid');
        this.errorText = document.getElementById('errorText');
        
        this.init();
    }

    init() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        
        // Add input validation
        this.searchInput.addEventListener('input', () => {
            this.searchBtn.disabled = this.searchInput.value.trim().length < 3;
        });
    }

    async handleSearch() {
        const query = this.searchInput.value.trim();
        
        if (query.length < 3) {
            this.showError('Please enter at least 3 characters to search.');
            return;
        }

        this.showLoading();
        
        try {
            // Simulate API call with mock data
            const recommendations = await this.searchLyricsAndGetRecommendations(query);
            this.displayRecommendations(recommendations);
        } catch (error) {
            console.error('Search error:', error);
            this.showError('Failed to search for music. Please try again.');
        }
    }

    async searchLyricsAndGetRecommendations(query) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data - In a real application, this would be an API call
        const mockRecommendations = this.generateMockRecommendations(query);
        return mockRecommendations;
    }

    generateMockRecommendations(query) {
        // Sample music database
        const musicDatabase = [
            {
                title: "Bohemian Rhapsody",
                artist: "Queen",
                album: "A Night at the Opera",
                year: 1975,
                genre: "Rock",
                lyrics: "Is this the real life? Is this just fantasy?",
                popularity: 95
            },
            {
                title: "Imagine",
                artist: "John Lennon",
                album: "Imagine",
                year: 1971,
                genre: "Soft Rock",
                lyrics: "Imagine there's no heaven, it's easy if you try",
                popularity: 92
            },
            {
                title: "Hotel California",
                artist: "Eagles",
                album: "Hotel California",
                year: 1976,
                genre: "Rock",
                lyrics: "On a dark desert highway, cool wind in my hair",
                popularity: 90
            },
            {
                title: "Stairway to Heaven",
                artist: "Led Zeppelin",
                album: "Led Zeppelin IV",
                year: 1971,
                genre: "Rock",
                lyrics: "There's a lady who's sure all that glitters is gold",
                popularity: 88
            },
            {
                title: "Sweet Child O' Mine",
                artist: "Guns N' Roses",
                album: "Appetite for Destruction",
                year: 1987,
                genre: "Hard Rock",
                lyrics: "She's got a smile that it seems to me",
                popularity: 87
            },
            {
                title: "Billie Jean",
                artist: "Michael Jackson",
                album: "Thriller",
                year: 1982,
                genre: "Pop",
                lyrics: "She was more like a beauty queen from a movie scene",
                popularity: 94
            },
            {
                title: "Like a Rolling Stone",
                artist: "Bob Dylan",
                album: "Highway 61 Revisited",
                year: 1965,
                genre: "Folk Rock",
                lyrics: "How does it feel to be on your own",
                popularity: 89
            },
            {
                title: "Smells Like Teen Spirit",
                artist: "Nirvana",
                album: "Nevermind",
                year: 1991,
                genre: "Grunge",
                lyrics: "Load up on guns, bring your friends",
                popularity: 91
            },
            {
                title: "Yesterday",
                artist: "The Beatles",
                album: "Help!",
                year: 1965,
                genre: "Pop Rock",
                lyrics: "Yesterday, all my troubles seemed so far away",
                popularity: 93
            },
            {
                title: "Purple Rain",
                artist: "Prince",
                album: "Purple Rain",
                year: 1984,
                genre: "Pop Rock",
                lyrics: "I never meant to cause you any sorrow",
                popularity: 86
            }
        ];

        // Simple recommendation algorithm based on query matching
        const recommendations = musicDatabase
            .filter(song => 
                song.title.toLowerCase().includes(query.toLowerCase()) ||
                song.artist.toLowerCase().includes(query.toLowerCase()) ||
                song.lyrics.toLowerCase().includes(query.toLowerCase()) ||
                song.genre.toLowerCase().includes(query.toLowerCase())
            )
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 5);

        // If no exact matches, return top 5 popular songs
        if (recommendations.length === 0) {
            return musicDatabase
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 5);
        }

        return recommendations;
    }

    displayRecommendations(recommendations) {
        this.hideAllSections();
        this.resultsSection.style.display = 'block';
        
        this.musicGrid.innerHTML = '';
        
        recommendations.forEach((song, index) => {
            const musicCard = this.createMusicCard(song, index);
            this.musicGrid.appendChild(musicCard);
        });
    }

    createMusicCard(song, index) {
        const card = document.createElement('div');
        card.className = 'music-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="music-card-header">
                <div class="music-icon">
                    <i class="fas fa-music"></i>
                </div>
                <div class="music-info">
                    <h3>${song.title}</h3>
                    <p>by ${song.artist}</p>
                </div>
            </div>
            <div class="music-details">
                <div class="detail-item">
                    <span class="detail-label">Album:</span>
                    <span class="detail-value">${song.album}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Year:</span>
                    <span class="detail-value">${song.year}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Genre:</span>
                    <span class="detail-value">${song.genre}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Popularity:</span>
                    <span class="detail-value">${song.popularity}/100</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Sample Lyrics:</span>
                    <span class="detail-value">"${song.lyrics}"</span>
                </div>
            </div>
        `;
        
        return card;
    }

    showLoading() {
        this.hideAllSections();
        this.loadingSection.style.display = 'block';
    }

    showError(message) {
        this.hideAllSections();
        this.errorText.textContent = message;
        this.errorSection.style.display = 'block';
    }

    hideAllSections() {
        this.loadingSection.style.display = 'none';
        this.resultsSection.style.display = 'none';
        this.errorSection.style.display = 'none';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MusicRecommendationSystem();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('lyricsInput').focus();
        }
    });
    
    // Add search suggestions (basic implementation)
    const searchInput = document.getElementById('lyricsInput');
    const suggestions = [
        'love', 'heart', 'dream', 'night', 'time', 'life', 'world', 'music',
        'rock', 'pop', 'jazz', 'blues', 'country', 'classical'
    ];
    
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length === 0) {
            searchInput.placeholder = 'Try: love, dream, night, music...';
        }
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.placeholder = 'Enter lyrics or song name to search...';
    });
});
