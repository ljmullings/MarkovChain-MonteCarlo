export enum DistributionType {
    Discrete = 'Discrete',
    Continuous = 'Continuous',
  }
  
  export interface Distribution {
    name: string
    type: DistributionType
  }
  
  