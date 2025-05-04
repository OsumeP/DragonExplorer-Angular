import { DisplayObj } from "./display-obj";

export class PlanetModel implements DisplayObj{
    public id: number;
    public name: string;
    public isDestroyed: boolean;
    public description: string;
    public imgUrl: string;
    public type: string;

    constructor(id: number, name: string, isDestroyed: boolean, description: string, imgUrl: string){
        this.id = id;
        this.name = name;
        this.isDestroyed = isDestroyed;
        this.description = description;
        this.imgUrl = imgUrl;
        this.type = 'planet';
    }
}
