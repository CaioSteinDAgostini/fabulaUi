import { Domain } from "src/app/domain/domain";

export interface Claims {
    sub: string,
    domains: Domain[],
    domain: Domain,
    exp: number,
    iat: number;
}

// {"sub":"root@domain.com","domains":[{"id":"637a11a0-7674-4cf4-a5ca-c77afaacd3e3","name":"Fabula","restricted":false}],"exp":1649389473574,"iat":1649371473574}