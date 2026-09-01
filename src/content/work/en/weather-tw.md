---
title: Weather, Explained
tagline: Turning raw meteorological data into a site people actually open during a typhoon
summary: A weather platform built on Nuxt 4 and deployed to Cloudflare Workers, covering forecasts, animated radar, typhoon tracks, earthquake reports and warnings for all of Taiwan. The API key and data normalisation both live on the server, with caching tiered by how fast each dataset changes.
year: 2026
role: Frontend developer (solo)
type: Edge-deployed data platform
stack:
  - Nuxt
  - TypeScript
  - Cloudflare Workers
  - MapLibre GL
  - ECharts
  - Tailwind CSS
  - VueUse
  - Vitest
demo: https://weather-tw.jimdeng0817.workers.dev
repo: https://github.com/lemoncat0817/weather-tw
cover: ../../../assets/work/weather-tw.png
coverAlt: The Weather, Explained homepage, showing county warnings, typhoon status, a recent earthquake, current conditions, a 24-hour trend chart and a radar map
order: 3
featured: true
stats:
  - label: Data sections
    value: '8'
  - label: Deployed on
    value: Cloudflare Workers
  - label: Data source
    value: Taiwan CWA
---

## What it is

The second version of Weather, Explained. The original was a lookup-style SPA — pick a city, see the forecast. This version is built for the moments people actually reach for a weather site: animated radar, typhoon tracks with an uncertainty cone, earthquake intensity maps, and warnings for every county, all in one place, deployed on Cloudflare's edge network.

## The problem

The previous version carried two clear pieces of technical debt: the CWA API key sat fully visible in the frontend bundle, and there was no caching at all — every city switch refetched from the agency's API. Both problems have the same fix: a server that actually executes code, which a pure frontend cannot provide.

Taiwan's Central Weather Administration (CWA) open data brought its own familiar problem too: forecasts, observations, typhoons and earthquakes are four differently-shaped datasets, each with its own field naming, nesting and casing conventions.

## What I did

I moved to Nuxt 4, so the same project holds both the frontend and server API routes (via Nitro), deployed to Cloudflare Workers:

- **The key lives only on the server.** The CWA key is read at request time through `useRuntimeConfig()`, and never enters the frontend bundle or any API response.
- **An anti-corruption layer normalises everything.** `server/utils/normalize/**` converts four differently-shaped CWA responses — forecast, observation, typhoon, earthquake — into the domain model defined in `shared/types`. Components only ever see their own types; they never need to know what CWA's raw JSON looks like.
- **Caching is tiered by how fast the data actually changes.** Fast-moving radar frames cache for 5 minutes, forecasts for 30, and climate normals — which barely change — for 6 hours. Each API sets its own TTL via `defineCachedEventHandler`, backed by KV on Workers, so the same data is never re-fetched from upstream more than necessary.
- **Maps and charts each do one job.** MapLibre GL handles the radar animation, station observations, and a 368-township temperature choropleth; ECharts handles time series like the 24-hour meteogram and typhoon intensity over time.

## Technical decisions

### Why move off a Vue SPA and onto Nuxt

A pure frontend cannot solve the "hide the key" problem — hiding a key needs a server that executes code, not just static files. Nuxt's Nitro meant I did not have to stand up and maintain a separate backend project; one repo and one deploy gives me both pages and API routes.

### Why Cloudflare Workers instead of conventional serverless

Weather data is read-heavy with low real-time demands — most users are checking their own city, so cache hit rates are naturally high. Cloudflare's edge network serves responses from the node closest to the user, and KV gives a cache layer shared across those nodes. That combination fits a read-heavy workload like this particularly well.

### The anti-corruption layer earns its cost

Writing a normaliser for each of the four CWA datasets is more code up front. But that cost is paid once, and in exchange components never touch nested JSON, and a field rename by the agency means changing one file instead of hunting through components. That is the same lesson from the previous version, applied more thoroughly this time.

## What went wrong

**The radar animation needed a server-side rolling window.** CWA's radar imagery is a series of static frames; handing the entire history to the frontend would make load time grow indefinitely. The server now returns only the most recent window of frames, so the client never has to decide what to discard.

**The typhoon uncertainty cone is interpolated, not provided directly by CWA.** The agency publishes discrete forecast points along the track; the 70%-probability radius has to be interpolated across the forecast horizon. That visualisation is computed entirely on the frontend, not read straight off the API.

## Outcome

CI runs type checking, linting and tests on every push to `master`, and all three have to pass before it builds and deploys to Cloudflare Workers. The live site answers weather, map and typhoon queries for any county in Taiwan.

## What I would change

1. **Add scrubbing to the radar animation.** It currently only auto-plays the latest sequence of frames; letting users drag to any point in time would make it more useful.
2. **Add push subscriptions for warnings.** Warnings are currently only visible while the site is open. A subscription model scoped to specific counties would make this feature actually actionable.
3. **Extend earthquakes into historical search.** Only recent events are shown today; a magnitude/region filterable history would round this section out.
