---
title: Todo List
tagline: Doing one small thing completely, with as few dependencies as possible
summary: A todo application covering CRUD, completion filtering, bulk actions and responsive layout. Vue is its only dependency — this was deliberate practice in getting the fundamentals right.
year: 2024
role: Frontend developer (solo)
type: Fundamentals practice
stack:
  - Vue 3
  - Vite
demo: https://lemoncat0817.github.io/Vue-TodoList/
repo: https://github.com/lemoncat0817/Vue-TodoList
cover: ../../../assets/work/todo-list.png
coverAlt: The Todo List app, showing the task list and the active/completed filter
order: 4
featured: false
stats:
  - label: Dependencies
    value: '0'
  - label: Core features
    value: '5'
  - label: Focus
    value: Fundamentals
---

## What it is

A todo application. The features are not complex: create, delete, edit and read tasks; filter active and completed; clear all completed in one click; select or deselect all in one click; and a responsive layout.

It is in this portfolio not because it is the hardest thing I have built — **but because it is the only one where I used nothing but Vue itself**.

## Why this one is worth including

The other three projects stand on the shoulders of libraries: Element Plus gave me components, Pinia gave me state management, VueUse gave me composables.

This project has none of that. Its `package.json` lists exactly one dependency: `vue`.

So every decision had to be made from scratch:
- Where does state live? (A component-local `ref` — the scale does not justify a store)
- How do I render the list without key problems?
- How do editing and display states swap?
- How do I build a responsive layout by hand? (No Bootstrap grid to lean on)

That constraint was **the point**. I wanted to know whether I actually understood Vue, or only understood the tools wrapped around it.

## Technical decisions

### No state management library

There is one list of state, used by a handful of components. Reaching for Pinia here would be over-engineering — another layer of abstraction that solves no real problem.

**Knowing when *not* to use a tool matters as much as knowing how to use it.**

### Bulk actions are all edge cases

"Select all / deselect all" sounds trivial until you ask: should the button currently say "select all" or "deselect all"? That depends on whether everything is already complete.

"Clear all completed" raises the same question: if nothing is completed, should the button be disabled or hidden?

**The edge cases are where the time actually goes.** The features themselves were quick.

### Responsive layout by hand

With no CSS framework, breakpoints and layout were mine to write. That gave me a much clearer picture of what Flexbox and media queries are actually doing, rather than memorising class names like `col-md-6`.

## What went wrong

**Focus management when editing.** Clicking a task should move focus straight into the input, or the user has to click twice. But Vue updates the DOM asynchronously — calling `focus()` immediately fails, because that input does not exist yet. It has to wait for `nextTick()`.

That was the first time I properly understood Vue's async update cycle, rather than just copying the pattern from the docs.

## Outcome

All five features shipped, with both desktop and mobile layouts handled.

## What I would change

1. **Persist the data.** Refreshing the page currently loses everything. `localStorage` would fix it, and it is the most obvious gap.
2. **Add keyboard support.** For a high-frequency input surface like a todo list, you should never need the mouse — Enter to add, Escape to cancel, arrows to move.
3. **Make deletion undoable.** Right now deleting is immediate and final, with no confirmation and no recovery. An undo toast would make it feel much safer.
