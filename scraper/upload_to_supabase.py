import json
import os
import re
import requests
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_SERVICE_KEY = os.environ["SUPABASE_SERVICE_KEY"]

HEADERS = {
    "apikey": SUPABASE_SERVICE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates",  # this makes it an upsert
}


def extract_id(source_url: str) -> str:
    # Pull the numeric ID at the end of the URL, e.g. ".../shelter/356131" -> "356131"
    match = re.search(r"/(\d+)$", source_url)
    return match.group(1) if match else source_url


def transform(event: dict) -> dict:
    return {
        "id": extract_id(event["source_url"]),
        "title": event["title"],
        "venue": event["venue"],
        "city": event["city"],
        "date": event["date"],
        "genre": "Live",
        "price": "See venue for details",
    }


def main():
    with open("output/concerts.json", "r", encoding="utf-8") as f:
        raw_events = json.load(f)

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