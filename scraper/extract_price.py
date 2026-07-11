import requests

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "qwen2.5:7b"


def extract_price(raw_text: str) -> str:
    if not raw_text.strip():
        return "See venue for details"

    prompt = (
        "This is raw text from a Japanese live house ticket info box. "
        "It may contain a real ticket price (often marked ADV/DOOR/前売/当日), "
        "extra fees (e.g. drink charge), a seating note, or a combination of these.\n\n"
        f"Raw text: {raw_text}\n\n"
        "Translate and reformat this into ONE short, clean line, entirely in English. "
        "The output must contain NO Japanese characters at all — every word, "
        "including things like 当日 (day of show), DRINK代 (drink charge), "
        "must be fully translated.\n\n"
        "Guidelines:\n"
        "- If there's a real price, format it like 'Advance ¥3000 / Door ¥3500'.\n"
        "- If there's an extra charge (e.g. a required drink fee), add it clearly, "
        "e.g. '+ ¥600 drink charge'.\n"
        "- For seating, use only these exact English terms: 'Standing', 'Seated', "
        "'Reserved seating', 'Free seating'.\n"
        "- If there's only a seating note and no fixed price, reply "
        "'Free seating, no fixed price'.\n"
        "- If genuinely nothing useful is present, reply 'See venue for details'.\n\n"
        "Double-check that your entire reply is in English with correct spelling, "
        "and contains zero Japanese characters. "
        "Reply with ONLY that one line, nothing else."
    )

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL,
                "messages": [{"role": "user", "content": prompt}],
                "stream": False,
            },
            timeout=120,
        )
        response.raise_for_status()
        return response.json()["message"]["content"].strip()
    except Exception as error:
        print(f"  Price extraction failed: {error}")
        return "See venue for details"