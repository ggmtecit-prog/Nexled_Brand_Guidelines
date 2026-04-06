(function () {
  var SITE_PAGES = [
    { href: "index.html", name: "Overview", description: "Landing page and quick links", tags: "home overview landing start" },
    { href: "brand.html", name: "Brand", description: "Mission, voice, values, and architecture", tags: "brand mission values voice architecture slogan" },
    { href: "logo.html", name: "Logo", description: "Logo usage, spacing, and application rules", tags: "logo wordmark clear space sizing application" },
    { href: "color_palette.html", name: "Color Palette", description: "Primary colors and semantic guidance", tags: "color palette semantic tokens usage" },
    { href: "typography.html", name: "Typography", description: "Type system, hierarchy, and application rules", tags: "typography fonts hierarchy text styles" },
    { href: "visual_elements.html", name: "Visual Elements", description: "Shapes, surfaces, and composition cues", tags: "visual elements shapes surfaces composition" },
    { href: "icons.html", name: "Icons", description: "Icon usage and application rules", tags: "icons pictograms symbols usage" },
    { href: "imagery.html", name: "Imagery", description: "Photography direction and image handling", tags: "imagery photography visuals rendering" },
    { href: "persona.html", name: "Persona", description: "Audience segments and customer profiles", tags: "persona audience customer profile users" },
    { href: "assets.html", name: "Assets", description: "Downloads, files, and applications", tags: "assets downloads files applications brand book" }
  ];

  function currentFile() {
    var pagePath = window.location.pathname || "";
    var file = pagePath.split("/").pop();
    return file || "index.html";
  }

  function cleanText(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  function sectionTags(id, heading) {
    return cleanText((id || "").replace(/[-_]+/g, " ") + " " + (heading || ""));
  }

  function getCurrentPageMeta() {
    var file = currentFile();
    for (var i = 0; i < SITE_PAGES.length; i += 1) {
      if (SITE_PAGES[i].href === file) {
        return SITE_PAGES[i];
      }
    }
    return { href: file, name: "Current Page", description: "Page section", tags: "" };
  }

  function collectCurrentSections(pageMeta) {
    var sections = [];
    var seen = {};
    var nodes = document.querySelectorAll("main section[id]");

    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      var id = node.getAttribute("id");
      var headingNode = node.querySelector("h2, h3");
      var heading = cleanText(headingNode ? headingNode.textContent : "");

      if (!id || !heading || seen[id]) {
        continue;
      }

      seen[id] = true;
      sections.push({
        href: pageMeta.href + "#" + id,
        name: heading,
        category: pageMeta.name + " section",
        description: "Jump to this section",
        tags: sectionTags(id, heading)
      });
    }

    return sections;
  }

  function buildSearchEntries() {
    var entries = [];
    var pageMeta = getCurrentPageMeta();

    for (var i = 0; i < SITE_PAGES.length; i += 1) {
      entries.push({
        href: SITE_PAGES[i].href,
        name: SITE_PAGES[i].name,
        category: "Page",
        description: SITE_PAGES[i].description,
        tags: SITE_PAGES[i].tags
      });
    }

    return entries.concat(collectCurrentSections(pageMeta));
  }

  function matchesQuery(entry, query) {
    var haystack = [entry.name, entry.category, entry.description, entry.tags].join(" ").toLowerCase();
    return haystack.indexOf(query) !== -1;
  }

  function renderResults(entries, query) {
    var resultsEl = document.getElementById("brandSearchOverlayResults");
    var listEl = document.getElementById("brandSearchOverlayList");
    var emptyEl = document.getElementById("brandSearchOverlayEmpty");

    if (!resultsEl || !listEl || !emptyEl) {
      return;
    }

    listEl.innerHTML = "";

    if (!query) {
      resultsEl.hidden = true;
      emptyEl.hidden = true;
      return;
    }

    var matches = [];

    for (var i = 0; i < entries.length; i += 1) {
      if (matchesQuery(entries[i], query)) {
        matches.push(entries[i]);
      }
    }

    if (matches.length === 0) {
      resultsEl.hidden = true;
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;

    for (var j = 0; j < Math.min(matches.length, 8); j += 1) {
      var item = matches[j];
      var link = document.createElement("a");
      var title = document.createElement("p");
      var meta = document.createElement("p");
      var wrapper = document.createElement("div");

      link.href = item.href;
      link.className = "search-overlay-item";
      link.setAttribute("role", "listitem");

      title.className = "text-body-sm font-semibold";
      title.textContent = item.name;

      meta.className = "text-body-xs text-grey-primary";
      meta.textContent = item.category + " - " + item.description;

      wrapper.appendChild(title);
      wrapper.appendChild(meta);
      link.appendChild(wrapper);
      listEl.appendChild(link);
    }

    resultsEl.hidden = false;
  }

  function initSearchOverlay() {
    var input = document.getElementById("brandSearchOverlayInput");
    var overlay = document.getElementById("brandSearchOverlay");
    var entries = buildSearchEntries();

    if (!input) {
      return;
    }

    input.addEventListener("input", function () {
      renderResults(entries, cleanText(input.value).toLowerCase());
    });

    if (overlay) {
      new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i += 1) {
          if (mutations[i].attributeName === "class" && overlay.classList.contains("is-open")) {
            input.value = "";
            renderResults(entries, "");
          }
        }
      }).observe(overlay, { attributes: true, attributeFilter: ["class"] });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearchOverlay);
  } else {
    initSearchOverlay();
  }
})();
