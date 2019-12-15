export class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;

    GetFullName() {
        return this.first_name + " " + this.last_name
    }
}
