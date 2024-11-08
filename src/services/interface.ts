export interface FuelOilParameters {
    viscosity: string;
    sulfurContent: string;
    waterContent: string;
    flashPoint: string;
}

export interface Laboratory {
    id: string;
    name: string;
    city: string;
    cluster: string;
    availableEquipment: string[];
    fuelOilTestingParameters: FuelOilParameters;
    status: 'Live' | 'Under Maintenance';
}
