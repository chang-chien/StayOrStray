# Business Rules

## Salary Input
- Whole Package
- Annual + bonus rate
- monthly + bonus rate

## Tax Calculation
- Based on country_tax_bands
- Use latest tax_year only

## Exchange Rate
- Always convert to base currency (GBP default)

## Scenario Comparison
- Always normalize to user's prefered currency before comparison

## MVP Rule
- No stored results
- Always compute on demand