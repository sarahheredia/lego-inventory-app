export type LegoSet = {
  series: string;
  year: number;
  number: number;
  numInstructionManuals: number;
  name: string;
  pieces: number;
  minifigs: number;
  bagged: boolean;
  displayed: boolean;
  complete: boolean;
  notes?: string;
  boxImage: string;
  setImage: string;
  searchText: string;
  missingParts: Array<MissingPart>;
}

type MissingPart = {
  setNumber: number;
  partNumber: number;
  color: string;
  description: string;
  quantityMissing: number;
  instructionManualPage: number;
  notes?: string;
  partImage: string;
}
