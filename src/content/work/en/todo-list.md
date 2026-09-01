---
title: Todo List
tagline: Local-first, keyboard-first, and it doesn't lose your data
summary: A local-first todo system with natural-language quick add, recurring tasks, a command palette, saveable filters and full undo support, plus optional cross-device sync. Unit tests, E2E and accessibility scans all run in CI.
year: 2026
role: Frontend developer (solo)
type: Task management app
stack:
  - Vue 3
  - TypeScript
  - IndexedDB
  - Supabase
  - Pinia
  - Vue Router
  - Tailwind CSS
  - Vite
  - Vitest
  - Playwright
demo: https://lemoncat0817.github.io/todo-list/
repo: https://github.com/lemoncat0817/todo-list
cover: ../../../assets/work/todo-list.png
coverAlt: The Todo List app, showing the Today/Upcoming/Inbox sidebar with projects and tags, the task list, and the quick-add field
order: 2
featured: false
---

## What it is

A local-first todo list, built on the shape of mature task tools like Todoist: a Today/Upcoming/Inbox sidebar, projects and tags, saveable filters, a command palette. Data is written to the browser first and works completely on its own; configuring an account adds cross-device sync on top.

The data model and edge cases behind each feature were worked out from first principles, not copied from a template.

## The problem

A todo list is a high-frequency, low-tolerance-for-error interface — people need to be able to type, delete and refresh without hesitation. Most bare-bones todo apps handle "add a task, check it off" and stop there, without answering the questions that actually matter: does a refresh lose anything? Can a mistaken delete be undone? Does it work as well without a mouse?

So this project treats that sense of safety as the core requirement, not an afterthought — persistence, undo, offline availability and cross-device consistency shaped the entire data layer before any feature was built on top of it.

## What I did

- **Local-first.** Everything is written to the browser's IndexedDB (wrapped with `idb`) before anything else happens. No login required, nothing is lost on refresh or offline.
- **Quick add parses natural language.** Typing "tomorrow 3pm submit report p1 #work @office" fills in the due date, priority, project and tag in one line. If the whole string gets consumed by parsing (typing just "tomorrow", say), it falls back to using the raw text as the title rather than producing a nameless task.
- **One command palette for everything.** `Ctrl/Cmd+K` puts views, projects, tags, filters, tasks and actions in a single list, so nothing has to be remembered by location.
- **Undo as a first-class citizen.** Deleting, clearing completed, and bulk rescheduling can all be undone, and each batch counts as exactly one undo step — "postpone everything" is one decision, and `Ctrl/Cmd+Z` reverses it in one press, not twenty.
- **Sync is optional, not required.** Without Supabase environment variables configured, the "account and sync" entry point does not appear at all, and behaviour is identical to the pure local version. Configuring it adds one-click Google/GitHub sign-in and background polling sync.

## Technical decisions

### Why IndexedDB instead of localStorage

localStorage is synchronous, size-limited, and string-only. Task data here has nested subtasks and tag associations, and needs to support a possible offline queue later — IndexedDB's async, structured storage was worth the extra wrapper code.

### Last-write-wins sync instead of real-time collaboration

True real-time multi-user collaboration (CRDTs, operational transforms) would be disproportionate to what this app is — a personal todo list, not a team board. I chose background polling with a per-row `updatedAt` comparison instead. The trade-off is that two devices editing different fields at nearly the same moment can overwrite each other's row, but for single-user, cross-device use that trade-off is entirely acceptable, and it buys an order of magnitude less implementation complexity.

### Three independent test layers

Unit tests (Vitest) cover pure logic like the filter query language and date advancement for recurring tasks. E2E (Playwright) covers real user flows. `@axe-core/playwright` scans for accessibility violations during the same E2E run. Each layer catches a different class of bug; none of them substitutes for the others.

## Outcome

CI runs type checking, linting, unit tests, and E2E with accessibility scanning on every push, and all four have to pass. The full feature set works offline in the live demo; configuring Supabase adds cross-device sync on top.
