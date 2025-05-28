import { Filters } from "./filters";

export class FilterChar implements Filters{
    public name: string;
    public gender: string;
    public race: string;
    public affiliation: string;

    constructor(){
        this.name = '';
        this.gender = '';
        this.race = '';
        this.affiliation = '';
    }
}
