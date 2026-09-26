#!/usr/bin/env python3
"""Generate or verify sitemap.xml for the static GitHub Pages site."""

from __future__ import annotations

import argparse
from pathlib import Path
import sys
import xml.etree.ElementTree as ET


BASE_URL = "https://jackzzjack.github.io/ai-resources/"
REPO_ROOT = Path(__file__).resolve().parents[1]
SITEMAP_PATH = REPO_ROOT / "sitemap.xml"


def page_url(path: Path) -> str:
    relative = path.relative_to(REPO_ROOT).as_posix()
    if relative == "index.html":
        return BASE_URL
    if relative.endswith("/index.html"):
        return f"{BASE_URL}{relative.removesuffix('index.html')}"
    return f"{BASE_URL}{relative}"


def discover_urls() -> list[str]:
    pages = (
        path
        for path in REPO_ROOT.rglob("*.html")
        if ".git" not in path.parts
    )
    return sorted(page_url(path) for path in pages)


def render_sitemap(urls: list[str]) -> str:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    lines.extend(f"  <url><loc>{url}</loc></url>" for url in urls)
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def validate_xml(content: str) -> None:
    ET.fromstring(content)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--check",
        action="store_true",
        help="fail if sitemap.xml does not match the discovered HTML pages",
    )
    args = parser.parse_args()

    expected = render_sitemap(discover_urls())
    validate_xml(expected)

    if args.check:
        actual = SITEMAP_PATH.read_text(encoding="utf-8")
        if actual != expected:
            print(
                "sitemap.xml is stale; run: python3 scripts/generate_sitemap.py",
                file=sys.stderr,
            )
            return 1
        print(f"sitemap.xml is current ({len(discover_urls())} URLs)")
        return 0

    SITEMAP_PATH.write_text(expected, encoding="utf-8")
    print(f"wrote {SITEMAP_PATH.relative_to(REPO_ROOT)} ({len(discover_urls())} URLs)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
