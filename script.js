class MusicRecommendationSystem {
  constructor() {
    this.searchInput = document.getElementById("lyricsInput");
    this.searchBtn = document.getElementById("searchBtn");
    this.loadingSection = document.getElementById("loadingSection");
    this.resultsSection = document.getElementById("resultsSection");
    this.errorSection = document.getElementById("errorSection");
    this.musicGrid = document.getElementById("musicGrid");
    this.errorText = document.getElementById("errorText");

    this.init();
  }

  init() {
    this.searchBtn.addEventListener("click", () => this.handleSearch());
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleSearch();
      }
    });

    // Add input validation
    this.searchInput.addEventListener("input", () => {
      this.searchBtn.disabled = this.searchInput.value.trim().length < 3;
    });
  }

  async handleSearch() {
    const query = this.searchInput.value.trim();

    if (query.length < 3) {
      this.showError("Please enter at least 3 characters to search.");
      return;
    }

    this.showLoading();

    try {
      // Call the real API instead of mock data
      const recommendations = await this.searchLyricsAndGetRecommendations(
        query
      );
      this.displayRecommendations(recommendations);
    } catch (error) {
      console.error("Search error:", error);
      this.showError("Failed to search for music. Please try again.");
    }
  }

  async searchLyricsAndGetRecommendations(query) {
    // Call the real API
    const response = await fetch("https://lyrics-yai.duckdns.org/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lyric: query }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    // Ensure data is always an array
    if (!Array.isArray(data.recommendations)) {
      throw new Error("Invalid API response");
    }
    return data.recommendations;
  }

  displayRecommendations(recommendations) {
    this.hideAllSections();
    this.resultsSection.style.display = "block";

    this.musicGrid.innerHTML = "";

    recommendations.forEach((song, index) => {
      const musicCard = this.createMusicCard(song, index);
      this.musicGrid.appendChild(musicCard);
    });
  }

  createMusicCard(song, index) {
    const card = document.createElement("div");
    card.className = "music-card";
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
            <div class="music-card-header">
                <div class="music-icon">
                    <i class="fas fa-music"></i>
                </div>
                <div class="music-info">
                    <h3>${song.track}</h3>
                    <p>${song.artist}</p>
                </div>
            </div>
            <div class="music-details">
                <div class="detail-item">
                    <span class="detail-label">Genre:</span>
                    <span class="detail-value">${song.genre}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Release:</span>
                    <span class="detail-value">${song.release_date}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Score:</span>
                    <span class="detail-value">${
                      Math.round(song.score * 10) / 10
                    }</span>
                </div>
            </div>
            <div class="music-lyrics" style="margin-top:12px;">
                <strong>Lyrics:</strong>
                <div style="font-size:0.95em;color:#666;margin-top:4px;">${
                  song.ly
                }</div>
            </div>
        `;

    return card;
  }

  showLoading() {
    this.hideAllSections();
    this.loadingSection.style.display = "block";
  }

  showError(message) {
    this.hideAllSections();
    this.errorText.textContent = message;
    this.errorSection.style.display = "block";
  }

  hideAllSections() {
    this.loadingSection.style.display = "none";
    this.resultsSection.style.display = "none";
    this.errorSection.style.display = "none";
  }
}

// ...existing code...
// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MusicRecommendationSystem();
});

// Add some interactive features
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = "smooth";

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      document.getElementById("lyricsInput").focus();
    }
  });

  // Add search suggestions (basic implementation)
  const searchInput = document.getElementById("lyricsInput");
  const suggestions = [
    "love",
    "heart",
    "dream",
    "night",
    "time",
    "life",
    "world",
    "music",
    "rock",
    "pop",
    "jazz",
    "blues",
    "country",
    "classical",
  ];

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.length === 0) {
      searchInput.placeholder = "Try: love, dream, night, music...";
    }
  });

  searchInput.addEventListener("blur", () => {
    searchInput.placeholder = "Enter lyrics or song name to search...";
  });
});
