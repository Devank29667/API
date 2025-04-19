const { PRODUCT_WEIGHT, FUEL_COST_PER_KM_PER_KG, DISTANCE_MATRIX, WAREHOUSE_INVENTORY } = require('../utils/constants');

class DeliveryService {
    constructor() {
        this.warehouses = Object.keys(WAREHOUSE_INVENTORY);
    }

    calculateCost(order) {
        // Get required warehouses based on order
        const requiredWarehouses = this.getRequiredWarehouses(order);
        
        // If no items in order, return 0
        if (requiredWarehouses.length === 0) {
            return 0;
        }

        // If only one warehouse is needed, calculate direct cost
        if (requiredWarehouses.length === 1) {
            const warehouse = requiredWarehouses[0];
            const weight = this.calculateTotalWeight(order);
            return this.calculateLegCost(warehouse, 'L1', weight);
        }

        // For multiple warehouses, find the optimal route
        return this.findOptimalRoute(requiredWarehouses, order);
    }

    getRequiredWarehouses(order) {
        return this.warehouses.filter(warehouse => 
            WAREHOUSE_INVENTORY[warehouse].some(product => order[product] > 0)
        );
    }

    calculateTotalWeight(order) {
        return Object.values(order).reduce((sum, quantity) => 
            sum + (quantity * PRODUCT_WEIGHT), 0
        );
    }

    calculateLegCost(from, to, weight) {
        const distance = DISTANCE_MATRIX[from][to];
        return distance * weight * FUEL_COST_PER_KM_PER_KG;
    }

    findOptimalRoute(warehouses, order) {
        let minCost = Infinity;
        
        // Try each warehouse as starting point
        for (const startWarehouse of warehouses) {
            const visited = new Set([startWarehouse]);
            const remaining = new Set(warehouses.filter(w => w !== startWarehouse));
            
            // Calculate cost for this starting point
            const cost = this.calculateRouteCost(startWarehouse, remaining, visited, order);
            minCost = Math.min(minCost, cost);
        }

        return minCost;
    }

    calculateRouteCost(current, remaining, visited, order) {
        if (remaining.size === 0) {
            // Return to L1 from last warehouse
            const weight = this.calculateTotalWeight(order);
            return this.calculateLegCost(current, 'L1', weight);
        }

        let minCost = Infinity;

        for (const next of remaining) {
            const newRemaining = new Set(remaining);
            newRemaining.delete(next);
            
            const newVisited = new Set(visited);
            newVisited.add(next);

            // Calculate cost to next warehouse
            const weight = this.calculateTotalWeight(
                Object.fromEntries(
                    Object.entries(order).filter(([product]) => 
                        WAREHOUSE_INVENTORY[current].includes(product)
                    )
                )
            );
            
            const legCost = this.calculateLegCost(current, next, weight);
            const remainingCost = this.calculateRouteCost(next, newRemaining, newVisited, order);
            
            minCost = Math.min(minCost, legCost + remainingCost);
        }

        return minCost;
    }
}

module.exports = new DeliveryService(); 