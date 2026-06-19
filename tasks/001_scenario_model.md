# Task 001 - Scenario Model

**Status: COMPLETE**

## Goal
Create scenario CRUD structure (no auth dependency)

## Scope
- Create scenario table integration (Supabase)
- Create API:
  - POST /scenario
  - GET /scenario/:id
  - GET /scenarios (list)

## Data Model
Use mock user_id = "demo-user"

## Scenario fields
- name
- country_id
- annual_salary
- monthly_salary
- bonus
- raise_rate
- pension_rate
- living_cost
- rent_cost

## UI
- Simple form page:
  /scenario/new

## Output
User can create scenario and view it in list page

## Do NOT
- Do not implement auth
- Do not calculate tax yet