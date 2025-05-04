import { DisplayObj } from "./display-obj";
import { TransformationModel } from "./transformation-model";

export class CharModel implements DisplayObj{
    public id: number;
    public name: string;
    public ki: string;
    public race: string;
    public gender: string;
    public description: string;
    public imgUrl: string;
    public affiliation: string;
    public planetId: number = -1;
    public transformations: TransformationModel[] = [];
    public type: string;

    constructor(id: number, name: string, ki: string, race: string, gender: string, description: string, imgUrl: string, affiliation: string){
        this.id = id;
        this.name = name;
        this.ki = ki;
        this.race = race;
        this.gender = gender;
        this.description = description;
        this.imgUrl = imgUrl;
        this.affiliation = affiliation;
        this.type = 'character'
    }

}
