---
layout: project.njk
title: Low Poly
pageTitle: Low Poly
pageSlug: portfolio/low-poly/
templateEngineOverride: njk,md
---
## Low Poly Collection!
A small collection of some of the low-poly models I've made.

<div class="canvas-wrapper">
  <canvas id="canvas"></canvas>
  <button id="dice-btn" src="">
    <img src="/assets/icons/dice.svg" />
  </button>

  <div class="variants" id="variants"></div>
</div>

<div class="model-list">
  {% for model in models %}
    <button data-path="{{ model.path }}" class="model-card">{{ model.model }}</button>
  {% endfor %}
</div>



<script>
{% set modelsJson = models | dump %}
window.MODELS = {{ modelsJson | safe }};
</script>

<script type="module" src="/js/low-poly.js"></script>
