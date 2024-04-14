export type SignupPayload = {
    name : string,
    email : string,
    password : string
}

export type LoginPayload = {
    email : string,
    password : string
}

export type User = {
    id : string,
    name : string,
    email : string,
    password : string,
    role : string,
    blogs : Blog[],
}

export type Blog = {
    id : string,
    title : string,
    content : string,
    author : User,
    date : Date,
    tags : string[],
    likedBy : string[],
    comments : Comment[]
}

export type State = {
    user : {
        value : {
            name : string,
            email : string,
            password : string
        }
    },
    blog : {
        value : {

        },
        comments : Comment[]
    }
}

export type Tag = {
    name : string,
    blogs : string[]
}

export type Comment = {
    id : string,
    text : string,
    commentedBy : User,
    date : string
}