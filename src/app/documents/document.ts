import { Domain } from "../domain/domain";

export interface Document{
    id: string;
    domain: Domain;
    title: string;
    subtitle: string;
    contents: string | null;
    titleImage: string | null;
    thumbnailImageUrl: string | ArrayBuffer | null;
}