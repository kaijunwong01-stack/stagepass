import json
import time
import requests
from bs4 import BeautifulSoup
from venues import VENUES

BASE_URL = "https://www.loft-prj.co.jp/schedule/{slug}/schedule"

# Identify ourselves honestly in requests — good practice for any scraper.
HEADERS = {
    "User-Agent": "StagePassBot/0.1 (educational project; contact: your-email@example.com)"
}


def fetch_page(slug: str) -> str:
    url = BASE_URL.format(slug=slug)
    response = requests.get(url, headers=HEADERS, timeout=10)
    response.raise_for_status()  # raises an error if the request failed
    return response.text


def parse_events(html: str, venue_name: str, city: str) -> list[dict]:
    soup = BeautifulSoup(html, "html.parser")

    events = []

    event_blocks = soup.select("a.js-cursor-elm")

    for block in event_blocks:
        year_el = block.select_one(".year")
        month_el = block.select_one(".month")
        day_el = block.select_one(".day")
        title_el = block.select_one(".c_title span")
        open_el = block.select_one(".open")
        artist_els = block.select(".artist_tag li")

        if not title_el or not year_el:
            continue

        date_str = f"{year_el.get_text(strip=True)}-{month_el.get_text(strip=True)}-{day_el.get_text(strip=True)}"
        artists = [a.get_text(strip=True) for a in artist_els]

        events.append(
            {
                "title": title_el.get_text(strip=True),
                "date": date_str,
                "open_start": open_el.get_text(strip=True) if open_el else None,
                "artists": artists,
                "venue": venue_name,
                "city": city,
                "source_url": block.get("href"),
            }
        )

    return events
def main():
    all_events = []

    for venue in VENUES:
        print(f"Scraping {venue['name']}...")
        html = fetch_page(venue["slug"])
        events = parse_events(html, venue["name"], venue["city"])
        print(f"  Found {len(events)} events")
        all_events.extend(events)

        time.sleep(1)  # be polite between requests

    with open("output/concerts.json", "w", encoding="utf-8") as f:
        json.dump(all_events, f, ensure_ascii=False, indent=2)

    print(f"\nSaved {len(all_events)} total events to output/concerts.json")


if __name__ == "__main__":
    main()