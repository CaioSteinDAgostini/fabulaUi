import { User } from "src/app/auth/user";
import { Domain } from "src/app/domain/domain";

export interface Account {
    user: User;
    domain: Domain;
}