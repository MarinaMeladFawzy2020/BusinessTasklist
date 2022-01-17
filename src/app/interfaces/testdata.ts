export interface Testdata {
    date: Date;
    id?:string;
    code?:string;
    name?:string;
    description?:string;
    price?:number;
    quantity?:number;
    inventoryStatus?:string;
    category?:string;
    image?:string;
    rating?:number;
}


export interface Country {
    name?: string;
    code?: string;
  }
  
  export interface Representative {
    name?: string;
    image?: string;
  }
  
  export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: boolean;
  }
  