export class User {
    _id: string;
    name: string;
    email: string;
    phone: string;

    level: string;
    verified: boolean;

    permissions: Array<string>;
}
