export type SubPart = {
  id: string;
  name: string;
  reference: string;
  description: string;
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
  arrowX: number;
  arrowY: number;
  price?: number;
};

export type Part = {
  id: string;
  name: string;
  reference: string;
  description: string;
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
  arrowX: number;
  arrowY: number;
  subParts?: SubPart[];
  price?: number;
};

export type MachineResult = {
  id: number;
  name: string;
  serialNumber: string;
  installationDate: string;
  lastMaintenance: string;
  image: string;
  status: string;
  parkName: string;
};

export type CartItem = {
  id: string;
  name: string;
  reference?: string;
  description?: string;
  image: string;
  price?: number;
  quantity: number;
};

export type SubCategory = {
  name: string;
  path: string;
};

export type Category = {
  name: string;
  icon: JSX.Element;
  subCategories: SubCategory[];
};