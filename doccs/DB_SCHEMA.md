# Database Schema

## users
- id (uuid)
- email
- name
- birth_year
- education
- prefered_currency
- created_at
- updated_at

## countries
- id
- name
- currency_code

## country_tax_bands
- id
- country_id
- tax_year
- min_amount
- max_amount
- rate
- base_add_on

## country_salary_benchmarks
- id
- country_id
- record_year
- age_min
- age_max
- percentile
- annual_salary

## exchange_rates
- id
- from_country_id
- to_country_id
- exchange_rate
- effective_date

## scenarios
- id
- user_id
- name
- country_id
- salary_mode
- annual_salary
- monthly_salary
- bonus
- raise_rate
- insurance_rate
- pension_rate
- living_cost
- rent_cost
- created_at