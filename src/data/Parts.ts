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
  price: number;
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

export const parts: Part[] = [
  {
    id: "1",
    name: "Compresseur",
    reference: "COMP-001",
    description: "Compresseur haute performance.",
    image: "/images/compresseur.png",
    x: 620,
    y: 230,
    width: 170,
    height: 150,
    arrowX: 750,
    arrowY: 240,
    subParts: [
      {
        id: "1-1",
        name: "Compresseur Pièce",
        reference: "SUB-COMP-001",
        description: "Compresseur haute performance.",
        image: "/images/compresseur-piece.png",
        x: 340,
        y: 60,
        width: 100,
        height: 150,
        arrowX: 490,
        arrowY: 60,
        price: 350,
      },
      {
        id: "1-2",
        name: "Vanne 4 voies",
        reference: "SUB-COMP-002",
        description: "Vanne utilisée pour inverser le cycle de réfrigération.",
        image: "/images/vanne.png",
        x: 330,
        y: 200,
        width: 140,
        height: 100,
        arrowX: 480,

        arrowY: 250,
        price: 220,
      },
    ],
  },
  {
    id: "2",
    name: "Ventilateur",
    reference: "VENT-002",
    description: "Ventilateur pour ventilation de l'appareil.",
    image: "/images/ventilateur.png",
    x: 20,
    y: 60,
    width: 240,
    height: 300,
    arrowX: 100,
    arrowY: 130,
    price: 1100,
  },
  {
    id: "3",
    name: "Filtre",
    reference: "FILT-003",
    description: "Filtre à air haute efficacité.",
    image: "/images/filtre.png",
    x: 400,
    y: -100,
    width: 180,
    height: 430,
    arrowX: 520,
    arrowY: 30,
    price: 590,
  },
  {
    id: "4",
    name: "Circuit électrique",
    reference: "ELEC-004",
    description: "Circuit de commande électrique principal.",
    image: "/images/circuit.png",
    x: 560,
    y: 50,
    width: 120,
    height: 200,
    arrowX: 620,
    arrowY: 80,
    subParts: [
      {
        id: "4-1",
        name: "Répartiteur",
        reference: "ELEC-SUB-001",
        description: "Permet la distribution de l'alimentation électrique.",
        image: "/images/repartiteur.png",
        x: 200,
        y: 60,
        width: 150,
        height: 100,
        arrowX: 50,
        arrowY: 80,
        price: 115,
      },
      {
        id: "4-2",
        name: "Automate",
        reference: "ELEC-SUB-002",
        description: "Automate programmable pour le contrôle logique.",
        image: "/images/automate.png",
        x: 100,
        y: 200,
        width: 300,
        height: 130,
        arrowX: 50,
        arrowY: 200,
        price: 170,
      },
      {
        id: "4-3",
        name: "Disjoncteur",
        reference: "ELEC-SUB-003",
        description: "Protection contre les surintensités électriques.",
        image: "/images/disjoncteur.png",
        x: 400,
        y: 10,
        width: 120,
        height: 100,
        arrowX: 430,
        arrowY: 0,
        price: 750,
      },
      {
        id: "4-4",
        name: "Transformateur",
        reference: "ELEC-SUB-004",
        description: "Convertit la tension électrique à différents niveaux.",
        image: "/images/transformateur.png",
        x: 530,
        y: 10,
        width: 150,
        height: 100,
        arrowX: 550,
        arrowY: 0,
        price: 2050,
      },
    ],
  },
  {
    id: "5",
    name: "Manomètre",
    reference: "MANO-005",
    description: "Manomètre pour mesurer la pression du circuit.",
    image: "/images/manometre.png",
    x: 275,
    y: 285,
    width: 60,
    height: 60,
    arrowX: 360,
    arrowY: 480,
    price: 50,
  },
];
