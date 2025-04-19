const PRODUCT_WEIGHT = 0.5; // kg
const FUEL_COST_PER_KM_PER_KG = 2;

const DISTANCE_MATRIX = {
    'C1': {
        'L1': 10,
        'C2': 12,
        'C3': 8
    },
    'C2': {
        'L1': 20,
        'C1': 12,
        'C3': 10
    },
    'C3': {
        'L1': 15,
        'C1': 8,
        'C2': 10
    }
};

const WAREHOUSE_INVENTORY = {
    'C1': ['A', 'B', 'C'],
    'C2': ['D', 'E', 'F'],
    'C3': ['G', 'H', 'I']
};

module.exports = {
    PRODUCT_WEIGHT,
    FUEL_COST_PER_KM_PER_KG,
    DISTANCE_MATRIX,
    WAREHOUSE_INVENTORY
}; 