# Product

<!-- impeccable:product-schema 1 -->

> Product truth inferred from the existing README, routes, data, and implementation. Confirm any missing product decisions in a future init pass.

## Platform

web

## Users

Developers, collaborators, and technically minded interviewers who want to understand the tools and frameworks behind Bookchaowalit's work.

## Product Purpose

TechSpace catalogs tools and frameworks that have actually been used, with a short MDX write-up for what each is for, why it was chosen, and what might happen next. Success means a visitor can browse by category and move from a stack entry into its evidence-rich explanation.

## Positioning

It is a working-use catalog with case notes, not a badge wall or an unqualified list of skills.

## Capabilities and Constraints

- Filterable stack grid and individual stack write-up routes.
- Local data and MDX content are the source of truth.
- The site exposes MCP and REST-style discovery routes for the catalog.
- Do not invent proficiency scores, client claims, or adoption metrics.

## Evidence on Hand

- `src/data/tech-stacks.ts`
- `src/lib/mdx.ts`
- `src/components/`
- Existing stack icons and the README.

## Product Principles

- Every listed tool earns its place through a real use note.
- Discovery should lead naturally to evidence.
- The catalog is useful to both a human reader and an API client.
