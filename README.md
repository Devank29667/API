# Delivery Cost Calculator API

A REST API that calculates the minimum delivery cost for delivering orders from warehouses to a specific location.

## Problem Description

The API calculates the minimum cost to deliver an order to location L1 from three warehouses (C1, C2, C3) with the following constraints:

- Each warehouse has specific products in stock
- Delivery must be done using one vehicle
- Vehicle can pick up items from multiple centers
- Cost is calculated based on distance × weight × cost per km per kg

## API Endpoint

### Calculate Minimum Delivery Cost

```
POST /calculate-cost
```

Request body:
```json
{
    "A": 1,
    "G": 1,
    "H": 1,
    "I": 3
}
```

Response:
```json
{
    "minimum_cost": 86
}
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running Locally

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on port 3000 by default.

## Deployment

This project can be deployed on Vercel. The `vercel.json` configuration file is already included.

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## Test Cases

The following test cases are implemented:

1. { "A": 1, "G": 1, "H": 1, "I": 3 } → 86
2. { "A": 1, "B": 1, "C": 1, "G": 1, "H": 1, "I": 1 } → 118
3. { "A": 1, "B": 1, "C": 1 } → 78
4. { "A": 1, "B": 1, "C": 1, "D": 1 } → 168

## Project Structure

```
.
├── app.js              # Main application file
├── routes/
│   └── cost.js        # Cost calculation endpoint
├── services/
│   └── deliveryService.js  # Business logic
├── utils/
│   └── constants.js   # Constants and data
├── package.json       # Dependencies
├── vercel.json        # Deployment config
└── README.md          # Documentation
``` 