import json
import os
import re
import requests
from dotenv import load_dotenv
from classify_genre import classify_genre

load_dotenv()

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_SERVICE_KEY = os.environ["SUPABASE_SERVICE_KEY"]
DEEPL_API_KEY = os.environ["DEEPL_API_KEY"]

HEADERS = {
    "apikey": SUPABASE_SERVICE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates",  # this makes it an upsert
}

import deepl

translator = deepl.Translator(DEEPL_API_KEY)


def extract_id(source_url: str) -> str:
    match = re.search(r"/(\d+)$", source_url)
    return match.group(1) if match else source_url


def translate_title(title: str) -> str:
    try:
        result = translator.translate_text(
            title, source_lang="JA", target_lang="EN-US"
        )
        return result.text
    except Exception as error:
        print(f"  Translation failed for '{title}': {error}")
        return title  # fall back to the original if translation fails


def transform(event: dict) -> dict:
    title_en = translate_title(event["title"])
    genre = classify_genre(event["title"], event.get("artists", []))

    return {
        "id": extract_id(event["source_url"]),
        "title": event["title"],
        "title_en": title_en,
        "venue": event["venue"],
        "city": event["city"],
        "date": event["date"],
        "genre": genre,
        "price": event.get("price") or "See venue for details",
        "image_url": event.get("image_url"),
        "ticket_url": event.get("ticket_url"),
    }


def main():
    with open("output/concerts.json", "r", encoding="utf-8") as f:
        raw_events = json.load(f)

    print(f"Translating, classifying genre, and preparing {len(raw_events)} events...")
    rows = [transform(event) for event in raw_events]

    response = requests.post(
        f"{SUPABASE_URL}/rest/v1/concerts",
        headers=HEADERS,
        json=rows,
        timeout=30,
    )
    response.raise_for_status()

    print(f"Uploaded {len(rows)} concerts to Supabase.")


if __name__ == "__main__":
    main()