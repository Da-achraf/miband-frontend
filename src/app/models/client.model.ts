export class Client {
  id: number;
  mac: string;
  nom: string;
  prenom: string;
  tel: string;
  adresse: string;
  mail: string;
  selected: boolean;

  constructor(
    id: number = 0,
    mac: string = '',
    nom: string = '',
    prenom: string = '',
    tel: string = '',
    adresse: string = '',
    mail: string = '',
    selected: boolean = false
  ) {
    this.id = id;
    this.mac = mac;
    this.nom = nom;
    this.prenom = prenom;
    this.tel = tel;
    this.adresse = adresse;
    this.mail = mail;
    this.selected = selected;
  }
}
