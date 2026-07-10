import requests

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "qwen2.5:7b"

ALLOWED_GENRES = [
    "Punk",
    "Hardcore",
    "Rock",
    "Indie",
    "Jazz",
    "Pop",
    "Idol",
    "Experimental",
    "Folk",
    "Metal",
    "Other",
    "Metalcore",
    "Deathcore",
    "Industrial",
    "Electronic",
    "Hip Hop",
    "EDM",
    "Techno",
    "House",
    "Trance",
    "Drum and Bass",
    "Dubstep",
    "Hardstyle",
]


def classify_genre(title: str, artists: list[str]) -> str:
    artist_list = ", ".join(artists) if artists else "unknown"

    prompt = (
        "You are classifying a Japanese live house concert into exactly one genre.\n"
        f"Allowed genres: {', '.join(ALLOWED_GENRES)}\n"
        f"Event title: {title}\n"
        f"Performing artists: {artist_list}\n"
        "Reply with ONLY the single genre word from the allowed list, nothing else."
    )

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "stream": False,
        },
        timeout=300,
    )
    response.raise_for_status()

    reply = response.json()["message"]["content"].strip()

    # Guard against the model replying with something outside our allowed list.
    for genre in ALLOWED_GENRES:
        if genre.lower() in reply.lower():
            return genre

    return "Other"