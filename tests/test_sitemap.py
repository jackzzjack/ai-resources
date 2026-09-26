from pathlib import Path
import unittest
import xml.etree.ElementTree as ET


REPO_ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://jackzzjack.github.io/ai-resources/"
SITEMAP_URL = f"{BASE_URL}sitemap.xml"
SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def page_url(path: Path) -> str:
    relative = path.relative_to(REPO_ROOT).as_posix()
    if relative == "index.html":
        return BASE_URL
    if relative.endswith("/index.html"):
        return f"{BASE_URL}{relative.removesuffix('index.html')}"
    return f"{BASE_URL}{relative}"


class SitemapTests(unittest.TestCase):
    def test_sitemap_contains_every_html_page_exactly_once(self):
        expected = {
            page_url(path)
            for path in REPO_ROOT.rglob("*.html")
            if ".git" not in path.parts
        }

        root = ET.parse(REPO_ROOT / "sitemap.xml").getroot()
        actual_list = [
            element.text
            for element in root.findall("sm:url/sm:loc", SITEMAP_NS)
        ]

        self.assertEqual(len(actual_list), len(set(actual_list)), "sitemap has duplicate URLs")
        self.assertSetEqual(set(actual_list), expected)

    def test_robots_declares_public_sitemap_url(self):
        robots = (REPO_ROOT / "robots.txt").read_text(encoding="utf-8")
        self.assertIn(f"Sitemap: {SITEMAP_URL}", robots.splitlines())


if __name__ == "__main__":
    unittest.main()
