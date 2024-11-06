export interface Laboratory {
    id: string;
    name: string;
    city: string;
    cluster: string;
    availableEquipment: string;
    fuelOilTestingParameters: string;
    status: 'Live' | 'Under Maintenance';
}
