# Cursor Task System Rules

## Execution Rules
- Each task = 1 feature = 1 PR
- Do not jump ahead to other tasks
- Always follow DB_SCHEMA.md
- Always follow CALCULATION_ENGINE.md

## Important Constraint
- NO AUTH until Task 008
- Use mock user_id = "demo-user" before auth exists

## Data Rule
- MVP does NOT store calculation results
- Everything is computed on demand