import { Laboratory } from "./interface";

const laboratories: Laboratory[] = [];

export const fetchLaboratories = async (): Promise<Laboratory[]> => {
  return Promise.resolve(laboratories);
};

// Create a new laboratory
export const createLaboratory = async (
  laboratory: Laboratory
): Promise<Laboratory> => {
  laboratories.push(laboratory);
  return Promise.resolve(laboratory);
};

// Update an existing laboratory by ID
export const updateLaboratory = async (
  id: string,
  updatedData: Partial<Laboratory>
): Promise<Laboratory | null> => {
  const index = laboratories.findIndex((lab) => lab.id === id);
  if (index === -1) return null;

  laboratories[index] = { ...laboratories[index], ...updatedData };
  return Promise.resolve(laboratories[index]);
};

// Delete a laboratory by ID
export const deleteLaboratory = async (id: string): Promise<boolean> => {
  const index = laboratories.findIndex((lab) => lab.id === id);
  if (index === -1) return false;

  laboratories.splice(index, 1);
  return Promise.resolve(true);
};

// Fetch a single laboratory by ID
export const fetchLaboratoryById = async (
  id: string
): Promise<Laboratory | null> => {
  const laboratory = laboratories.find((lab) => lab.id === id);
  return Promise.resolve(laboratory || null);
};
