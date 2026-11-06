import * as yaml from "js-yaml";
import { HtmlBasePlugin } from "@11ty/eleventy";

// ─────────────────────────────────────────────────────────────
//  사이트 주소 경로 (pathPrefix)
//  - 현재 주소(panda.hanyang.ac.kr)는 도메인 루트이므로 기본값 "/"
//  - GitHub Actions 배포 시에는 Pages 설정에 맞춰 자동으로 지정됩니다.
// ─────────────────────────────────────────────────────────────
const PATH_PREFIX = process.env.PATH_PREFIX || "/";

const esc = (s) =>
  String(s ?? "").replace(/&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  const isBilingual = (v) => v && typeof v === "object" && ("ko" in v || "en" in v);

  // {{ value | t | safe }}  → 한/영 두 언어를 함께 출력 (KO/EN 버튼으로 전환)
  // 값이 그냥 문자열이면 그대로 출력합니다. (HTML 태그 사용 가능)
  eleventyConfig.addFilter("t", (v) => {
    if (!isBilingual(v)) return v ?? "";
    const ko = v.ko ?? v.en ?? "";
    const en = v.en ?? v.ko ?? "";
    if (ko === en) return ko;
    return `<span class="l-ko">${ko}</span><span class="l-en">${en}</span>`;
  });

  // {{ value | tk("en") }} → 한 언어만 (alt 속성, <title> 등)
  eleventyConfig.addFilter("tk", (v, lang = "en") => {
    if (!isBilingual(v)) return v ?? "";
    return (v[lang] ?? v.en ?? v.ko ?? "").replace(/<[^>]+>/g, "");
  });

  // 저자 목록에서 지정한 이름을 굵게
  eleventyConfig.addFilter("hl", (authors, names = []) => {
    let out = esc(authors);
    for (const n of names || []) out = out.split(esc(n)).join(`<strong>${esc(n)}</strong>`);
    return out;
  });

  eleventyConfig.addFilter("sortNews", (items = []) =>
    [...items].sort((a, b) => new Date(b.date) - new Date(a.date))
  );

  eleventyConfig.addFilter("fmtDate", (d) => {
    const dt = new Date(d);
    if (isNaN(dt)) return d;
    return `${dt.getUTCFullYear()}.${String(dt.getUTCMonth() + 1).padStart(2, "0")}`;
  });

  eleventyConfig.addFilter("isoDate", (d) => {
    const dt = new Date(d);
    return isNaN(dt) ? "" : dt.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("sortPubs", (pubs = []) =>
    [...pubs].sort((a, b) => (b.year || 0) - (a.year || 0))
  );

  eleventyConfig.addFilter("pubYears", (pubs = []) =>
    [...new Set(pubs.map((p) => p.year))].sort((a, b) => b - a)
  );

  eleventyConfig.addFilter("byYear", (pubs = [], y) => pubs.filter((p) => p.year === y));

  eleventyConfig.addFilter("byTopic", (pubs = [], id) =>
    pubs.filter((p) => (p.topics || []).includes(id))
  );

  eleventyConfig.addFilter("whereStatus", (topics = [], s) =>
    topics.filter((t) => (t.status || "ongoing") === s)
  );

  eleventyConfig.addFilter("findTopic", (topics = [], id) => topics.find((t) => t.id === id));

  eleventyConfig.addFilter("initials", (name) => {
    const n = typeof name === "object" ? name.en || name.ko : name;
    return String(n || "?")
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  });

  eleventyConfig.addFilter("memberCount", (groups = []) =>
    groups.reduce((n, g) => n + (g.members || []).length, 0)
  );

  eleventyConfig.addGlobalData("buildYear", new Date().getFullYear());
}

export const config = {
  dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
  pathPrefix: PATH_PREFIX,
  templateFormats: ["njk", "md"],
  htmlTemplateEngine: "njk",
  markdownTemplateEngine: "njk",
};
