---
title: Weather, Explained
tagline: Turning raw meteorological open data into something an ordinary person can read
summary: A weather app built on Taiwan's Central Weather Administration open data, with current conditions, multi-day forecasts, city search, station observations and alerts, plus dark mode. My first TypeScript project.
year: 2024
role: Frontend developer (solo)
type: Data integration app
stack:
  - Vue 3
  - TypeScript
  - Vue Router
  - Pinia
  - Element Plus
  - ECharts
  - Axios
  - Sass
  - Vite
demo: https://lemoncat0817.github.io/Vue3-WeatherWeb
repo: https://github.com/lemoncat0817/Vue3-WeatherWeb
cover: ../../../assets/work/weather.png
coverAlt: The Weather app main screen, showing current conditions and a multi-day forecast
order: 2
featured: true
stats:
  - label: Core features
    value: '7'
  - label: Language
    value: TypeScript
  - label: Data source
    value: CWA open data
---

## What it is

This app consumes Taiwan's Central Weather Administration (CWA) open data and turns raw API responses into an interface people can actually read: how warm it is now, whether it will rain, what the next few days look like, and whether any alerts are in force.

It was my **first TypeScript project**, and my first time working seriously with external API data.

## The problem

Government open data is valuable, but its format is written for machines, not people.

The CWA API returns deeply nested structures — getting "today's high in Taipei" means walking through `location → weatherElement → time → parameter`, and the shape differs between endpoints (forecast, observation, alerts).

So the core work of this project was really **data transformation**: normalising three differently-shaped API responses into one format the frontend could use.

## What I did

The app breaks down into a few surfaces:

- **Current conditions** — temperature, feels-like, humidity, description
- **Multi-day forecast** — the trend over coming days
- **City search** — switching between municipalities
- **Station observations** — actual measured values
- **Weather alerts** — surfaced proactively when issued
- **Dark mode** — following the system preference

The data flow is: `Axios` fetches the response → a transformation layer normalises it → a `Pinia` store holds it → components only ever read the cleaned-up shape. Components never need to know what CWA's raw format looks like.

## Technical decisions

### Why I started using TypeScript here

The previous project (MAJI POS) was plain JavaScript. Order objects were passed between modules and I kept going back to the source to check whether a given field existed.

Working with an external API amplified that pain tenfold — the nesting is deep, the field names are unintuitive, and **you do not control any of it**. I defined interfaces for the CWA responses, which meant:

1. While unpacking nested structures, the editor told me what the next level contained
2. If the agency changed the format, type checking would fail loudly instead of `undefined` quietly appearing on screen

This was the first time I genuinely understood that types are not "extra work" — they **move runtime errors forward into compile time**.

### Isolating the API transformation layer

I deliberately did not call the API inside components and unpack data in place. Every CWA response passes through a transformation function that emits a clean object.

The benefit: if the API format changes, I change the transformation layer and not a single component. That is an extension of what I learned on the POS project — **keep the things that change in one place**.

### Dark mode follows the system

I read `prefers-color-scheme` as the default rather than forcing one theme. Checking the weather tends to happen early in the morning or last thing at night, which makes dark mode a real need rather than decoration.

## What went wrong

**Inconsistent time formats.** Different CWA endpoints return different date string formats, and Safari is stricter than Chrome about what `new Date()` will parse — dates that worked in Chrome became `Invalid Date` on iPhone. This was my first encounter with cross-browser date parsing differences; I ended up normalising everything in the transformation layer.

**The API key sits in the frontend.** That is an inherent limit of a frontend-only project: once bundled, the key is visible. I used an authorisation code with a limited quota. The correct answer is a backend proxy, which I note below.

## Outcome

All seven features shipped. You can query any municipality in Taiwan from the live demo.

## What I would change

1. **Add a backend proxy to hide the API key.** This is the clearest weakness in the current architecture, and a minimal serverless function would solve it.
2. **Add caching.** Weather data does not change by the second, but today every city switch refetches. Given CWA's update frequency, caching for a few minutes is entirely reasonable and would cut requests dramatically.
3. **Handle failure better.** Error states are currently thin. Users need to know whether it is their network or the agency's service, and whether the previously loaded data is still usable.
