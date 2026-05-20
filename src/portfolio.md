---
layout: base.njk
title: Portfolio
pageTitle: Portfolio
pageSlug: portfolio/
---
<div class="portfolio-grid">
  {% for project in portfolio %}
  <a href="/portfolio/{{ project.slug }}" class="portfolio-card">
    <h3 class="portfolio-card-title">{{ project.title }}</h3>
    <p class="portfolio-card-desc">{{ project.description }}</p>
  </a>
  {% endfor %}
</div>
