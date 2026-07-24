#!/usr/bin/env python3
"""Build a static productive-time SVG from public GitHub events (PT / UTC-7)."""
from __future__ import annotations

import json
import subprocess
import sys
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path


def main() -> None:
    out = Path(sys.argv[1] if len(sys.argv) > 1 else "4-productive-time.svg")
    token = subprocess.check_output(["gh", "auth", "token"], text=True).strip()
    req = urllib.request.Request(
        "https://api.github.com/users/ml-lubich/events?per_page=100",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "User-Agent": "ml-lubich-profile",
        },
    )
    events = json.load(urllib.request.urlopen(req))
    hours = [0] * 24
    pt = timezone(timedelta(hours=-7))
    for event in events:
        ts = event.get("created_at")
        if not ts:
            continue
        dt = datetime.fromisoformat(ts.replace("Z", "+00:00")).astimezone(pt)
        hours[dt.hour] += 1
    max_h = max(hours) or 1

    width, height = 850, 350
    margin_l, margin_r, margin_t, margin_b = 60, 30, 60, 50
    plot_w = width - margin_l - margin_r
    plot_h = height - margin_t - margin_b
    bar_gap = 4.0
    bar_w = plot_w / 24 - bar_gap

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
        f'viewBox="0 0 {width} {height}">',
        '<rect width="100%" height="100%" rx="5" ry="5" fill="#0d1117" stroke="#2e343b"/>',
        '<text x="30" y="40" fill="#58a6ff" font-family="Segoe UI, Ubuntu, Sans-Serif" '
        'font-size="18" font-weight="600">Productive Time (PT / UTC-7)</text>',
        '<text x="30" y="58" fill="#8b949e" font-family="Segoe UI, Ubuntu, Sans-Serif" '
        'font-size="12">from recent public activity · static (no Vercel rate limits)</text>',
    ]
    for i, count in enumerate(hours):
        h = (count / max_h) * plot_h
        x = margin_l + i * (bar_w + bar_gap)
        y = margin_t + plot_h - h
        parts.append(
            f'<rect x="{x:.1f}" y="{y:.1f}" width="{bar_w:.1f}" height="{h:.1f}" '
            f'fill="#58a6ff" rx="2"/>'
        )
        if i % 3 == 0:
            parts.append(
                f'<text x="{x + bar_w / 2:.1f}" y="{height - 20}" text-anchor="middle" '
                f'fill="#8b949e" font-size="11" '
                f'font-family="Segoe UI, Ubuntu, Sans-Serif">{i}:00</text>'
            )
    parts.append("</svg>")
    out.write_text("\n".join(parts) + "\n", encoding="utf-8")
    print(f"wrote {out} from {sum(hours)} events")


if __name__ == "__main__":
    main()
