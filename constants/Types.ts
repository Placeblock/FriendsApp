
export type Friend = {
    id: number,
    name: string,
}

export type Attributes = [Attribute, FriendAttribute[]][];

export type Attribute = {
    id: number,
    name: string
}

export type FriendAttribute = {
    id: number,
    friend_id: number,
    attribute_id: number,
    value: string
}