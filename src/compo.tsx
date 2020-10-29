export interface Entry {
    title: string,
    author: string,
    comment: string,
}

export interface Compo {
    directory_name: string,
    entries: Entry[],
}
