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

# Keywords that indicate a non-concert event (talk shows, salons, screenings, etc.)
# rather than an actual live music performance.
NON_CONCERT_KEYWORDS = [
    "トーク",
    "レポートイベント",
    "サロン",
    "salon",
    "上映会",
    "トークショー",
]


def is_likely_concert(title: str) -> bool:
    lowered = title.lower()
    return not any(keyword.lower() in lowered for keyword in NON_CONCERT_KEYWORDS)


def fetch_page(slug: str) -> str:
    url = BASE_URL.format(slug=slug)
    response = requests.get(url, headers=HEADERS, timeout=10)
    response.raise_for_status()  # raises an error if the request failed
    return response.text

def fetch_page_raw(url: str) -> str:
    response = requests.get(url, headers=HEADERS, timeout=10)
    response.raise_for_status()
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
        image_el = block.select_one(".img_wrap .bg")

        if not title_el or not year_el:
            continue

        title_text = title_el.get_text(strip=True)

        if not is_likely_concert(title_text):
            continue

        date_str = f"{year_el.get_text(strip=True)}-{month_el.get_text(strip=True)}-{day_el.get_text(strip=True)}"
        artists = [a.get_text(strip=True) for a in artist_els]
        image_url = image_el.get("data-bg") if image_el else None

        events.append(
            {
                "title": title_text,
                "date": date_str,
                "open_start": open_el.get_text(strip=True) if open_el else None,
                "artists": artists,
                "venue": venue_name,
                "city": city,
                "source_url": block.get("href"),
                "image_url": image_url,
            }
        )

    return events

def parse_event_detail(html: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")

    ticket_box = soup.select_one(".ticket_detail_box")
    if not ticket_box:
        return {"price": None, "ticket_url": None}

    # The price is the first plain text directly inside the box,
    # before any nested tags like <br> or <a>.
    price_text = ticket_box.find(string=True, recursive=False)
    price = price_text.strip() if price_text else None

    link_el = ticket_box.select_one("a")
    ticket_url = link_el.get("href") if link_el else None

    return {"price": price, "ticket_url": ticket_url}
def main():
    all_events = []

    for venue in VENUES:
        print(f"Scraping {venue['name']}...")
        html = fetch_page(venue["slug"])
        events = parse_events(html, venue["name"], venue["city"])
        print(f"  Found {len(events)} events")

        for event in events:
            detail_html = fetch_page_raw(event["source_url"])
            details = parse_event_detail(detail_html)
            event["price"] = details["price"]
            event["ticket_url"] = details["ticket_url"]
            time.sleep(0.5)  # be polite between individual event page requests

        all_events.extend(events)
        time.sleep(1)  # be polite between venues

    with open("output/concerts.json", "w", encoding="utf-8") as f:
        json.dump(all_events, f, ensure_ascii=False, indent=2)

    print(f"\nSaved {len(all_events)} total events to output/concerts.json")
if __name__ == "__main__":
    main()