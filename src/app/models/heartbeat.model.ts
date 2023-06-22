export class Heartbeat {
   id : number;
  data1 : string; 
  data2 : string;    
  data3 : string;  
  data4 : string;
  date_prelevement : Date;
  
    constructor(
      id: number = 0,
      data1 : string = '',
      data2: string = '',
      data3: string = '',
      data4: string = '',
      date_prelevement: Date 
    ) {
      this.id = id;
      this.data1 = data1;
      this.data2 = data2;
      this.data3 = data3;
      this.data4 = data4;
      this.date_prelevement = date_prelevement;
      
    }
  }