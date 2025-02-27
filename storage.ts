import { bikes, type Bike, type InsertBike } from "@shared/schema";

export interface IStorage {
  getAllBikes(): Promise<Bike[]>;
  getBikeByProductCode(code: string): Promise<Bike | undefined>;
}

export class MemStorage implements IStorage {
  private bikes: Map<number, Bike>;
  currentId: number;

  constructor() {
    this.bikes = new Map();
    this.currentId = 1;
    this.initializeBikes();
  }

  private initializeBikes() {
    const bikeData = [
      { model: "CT 110 X ES", productCode: "DY08", price: 89375 },
      { model: "Platina 100 ks Drum", productCode: "PF38", price: 79073 },
      { model: "Platina 100 ES Drum 4 Speed", productCode: "PF35/PF37", price: 87209 },
      { model: "Platina 110 ES Drum 5 Speed", productCode: "JK35", price: 90741 },
      { model: "PULSAR 125 DISC SINGLE", productCode: "DH50", price: 107292 },
      { model: "PULSAR 125 CARBON DISC", productCode: "DH41", price: 113136 },
      { model: "PULSAR 125 CARBON SPLIT DISC", productCode: "DH43", price: 117494 },
      { model: "PULSAR 125 CARBON FIBER SINGL", productCode: "DH57", price: 114114 },
      { model: "PULSAR 125 SPLIT CARB FIBER", productCode: "DH49", price: 116314 },
      { model: "PULSAR N 125 MID", productCode: "JZ53", price: 116567 },
      { model: "PULSAR N 125 TOP BLUE/TH", productCode: "JZ51/56", price: 122419 },
      { model: "PULSAR-NS 125", productCode: "JF35", price: 127582 },
      { model: "PULSAR-NS125 UG NEW", productCode: "JF44", price: 133464 },
      { model: "PULSAR NS-125 WIDER TYRE", productCode: "JF50", price: 123045 },
      { model: "PULSAR NS-125 UG WIDER TYRE", productCode: "JF51", price: 128452 },
      { model: "PULSAR NS 125 UG ABS", productCode: "JF57", price: 139945 },
      { model: "PULSAR-150 WITH C&G AND USD", productCode: "DH64", price: 136181 },
      { model: "PULSAR-150 SD NEW", productCode: "DH60", price: 139641 },
      { model: "PULSAR-150 TD NEW", productCode: "DH61", price: 144107 },
      { model: "PULSAR-N 150 SD", productCode: "JR30", price: 144259 },
      { model: "PULSAR N 150 FACE 2", productCode: "JR38", price: 147474 },
      { model: "PULSAR N150 TD DUEL CHANNEL", productCode: "JR31", price: 151321 },
      { model: "PULSAR NS 160 NEW USD FORK", productCode: "JF41", price: 171957 },
      { model: "PULSAR NS 160 TWIN ABS&USB", productCode: "JF43", price: 181261 },
      { model: "PULSAR N 160 DUAL CHANNEL", productCode: "JR17", price: 162167 },
      { model: "PULSAR NEW N160", productCode: "JR37/JR45", price: 164933 },
      { model: "PULSAR N160 USD FORK", productCode: "JR21/JR33", price: 175181 },
      { model: "PULSAR N160 USD TD", productCode: "JR39", price: 152279 },
      { model: "AVENGER 160 Street BS6", productCode: "PD36/PD39", price: 148674 },
      { model: "PULSAR NS 200 NEW USD FORK", productCode: "JL22", price: 186885 },
      { model: "PULSAR NS 200 NEW UG", productCode: "JL24", price: 195543 },
      { model: "PULSAR RS 200 Twin Channel", productCode: "DT19", price: 207755 },
      { model: "PULSAR RS 200 UG", productCode: "DT22", price: 218419 },
      { model: "PULSAR 220 F UG", productCode: "DK12", price: 173597 },
      { model: "AVENGER 220 Cruise BS6", productCode: "PD35/PD38", price: 178228 },
      { model: "PULSAR 250 N DUAL CHANNEL", productCode: "JR20", price: 184718 },
      { model: "Dominar D 250-BS6", productCode: "JF36", price: 222415 },
      { model: "Dominar D 400 ug-II BS-6", productCode: "JF37", price: 282544 },
      { model: "PULSAR NS 400", productCode: "JL23", price: 230716 },
      { model: "FREEDOM 125 NG04 DISC LED", productCode: "JH27", price: 134177 },
      { model: "FREEDOM 125 NG04 DRUM LED", productCode: "JH30", price: 117700 },
      { model: "FREEDOM 125 NG04 DRUM", productCode: "JH31", price: 112201 }
    ];

    bikeData.forEach((bike) => {
      const id = this.currentId++;
      this.bikes.set(id, { ...bike, id });
    });
  }

  async getAllBikes(): Promise<Bike[]> {
    return Array.from(this.bikes.values());
  }

  async getBikeByProductCode(code: string): Promise<Bike | undefined> {
    return Array.from(this.bikes.values()).find(
      (bike) => bike.productCode === code
    );
  }
}

export const storage = new MemStorage();