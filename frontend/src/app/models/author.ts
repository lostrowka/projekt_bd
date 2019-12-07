export class Author {
    id: number;
    first_name: string;
    last_name: string;
    origin: string;

    GetFullName() {
        return this.first_name + " " + this.last_name
    }
}
