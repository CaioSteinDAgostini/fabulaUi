export interface Domain {
    name: string,
    id: string,
    restricted: boolean,
    parent: Domain | null,
    root: boolean

}

//{"id":"637a11a0-7674-4cf4-a5ca-c77afaacd3e3","name":"Fabula","restricted":false}