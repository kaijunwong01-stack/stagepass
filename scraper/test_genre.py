from classify_genre import classify_genre

test_cases = [
    ("locofrank x GOOD4NOTHING presents HANGOVER TOUR", ["locofrank", "GOOD4NOTHING"]),
    ("SHELTER 35th Anniversary IGNITION GIGS 魔境集会 その4", ["荒井岳史", "フルカワユタカ", "安野幽汰"]),
    ("Midnight Jazz Session", ["Blue Note Trio"]),
]

for title, artists in test_cases:
    result = classify_genre(title, artists)
    print(f"{title[:40]}... -> {result}")