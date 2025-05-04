export class TransformationModel {
    public id: number;
    public name: string;
    public img: string;
    public ki: string;

    constructor(id: number, name: string, img: string, ki: string){
        this.id = id;
        this.name = name;
        this.img = img;
        this.ki = ki;
    }
}
