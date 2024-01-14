export type SignupPayload = {
    name : string,
    email : string,
    password : string
}

export type LoginPayload = {
    email : string,
    password : string
}

export type Blog = {
    title : string,
    content : string,
    authorEmail : string,
    authorName : string,
    date : Date,
    tags : string[],
    id : string
}

export type State = {
    user : {
        name : string,
        email : string,
        password : string
    }
}