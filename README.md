# Salad designer and planner

### Technical specs:

- React JS app.
- Main dependencies (all in `package.json`):
  - react-redux
  - styled-components
  - [simple-localstorage-data-service-stub](https://github.com/mpicpus/simple-localstorage-data-service-stub) (in-house rest-like data service).
- Other:
  - [Data set](https://github.com/mpicpus/challenge-data-set-1): in order to use the provided sample initial data, clone the "data" folder from this repo in /public.

You can **fork this project** or **start your own** with the specified packages. The project doesn't require any additional services, since data is provided by the above localStorage-based solution.

### Challenge Description:

**Mel's Kitchen** is a fancy "salad subscription" company. Customers subscribe to a small, medium or large salad every x days, so we know before hand pretty much how many salads we'll need to produce next week, along with how much we can expect to turn over.

We aim to provide our salad product planners with a tool to design different salads to be produced in a given week, according to demand and product availability.

Here's a rough idea of the desired behaviour:

- Our main goal is to create "composite" salad products. The tool could look something like this draft (just a visual queue, you may go in any direction you wish):

![screenshot1.png](readme/screenshot1.png)

- Editable fields:

  - name of salad
  - type of salad
  - ingredient (name/servings)

- Each salad will be stored with the following properties:
  - **id** => integer
  - **name** => string
  - **type** => string (small/medium/large)
  - **ingredients** (products) => array of objects
    - id => integer
    - numOfServings => integer
  - **cost** => float
  - **price** => float
  - **hoursFresh** => integer (actually, the lowest value present in its ingredients, could be a function or a pre-calculated value).
  - **targetStockByWeekday** => number of these salads needed for a particular weekday.
  - **currentStock** => number of salads in stock.
- We've got a database with next week's available products, here are some notes:
  - The main working unit for salad making is a "**serving**".
  - There's also a **weight per serving** (in grams as of now).
  - Each product belongs to a specific **supplier**.
  - Here's the **product schema**:
    - **id** => integer
    - **name** => string
    - **costPerServing** => float (euros)
    - **weightPerServing** => integer (grams)
    - **hoursFresh** => integer
    - **supplierId** => integer
- There's a bit of business logic in our DataService, and more can be added if needed. The basic info present is:
  - Target **weight** per salad type.
  - Target **cost** per salad type.
  - **Price** per salad type.

The first and basic part of this project is the development of the forementioned tool.

#### Additional tasks

Optionally you may choose to engage in the following extra tasks:

- There are a handful of suppliers and a bunch of **subscriptions**:
  - (\*) We want to know how much we'll need to order from each, after the planning is done.
  - Supplier schema:
    - **id** => integer
    - **name** => string
  - Subscription schema:
    - **id** => integer
    - **name** => string
    - **type** => string
    - **weekdays** => array of integers (1-5)
  - (\*) Additionally, we might want to calculate what products to order **each day** of the week, to ensure freshness. Here are the rules for purchasing:
    - We need to **ensure freshness**.
    - We need to **cut costs** by ordering as much quantity as possible each time.
- (\*) Additionally, we can create a simple(?) **planner** for the manufacture following the design of the salads. Sorting of salad ingredients by drag and drop would be useful for this one.

<footnote>(\*) => optional.</footnote>
