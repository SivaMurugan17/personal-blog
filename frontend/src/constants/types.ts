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
    id : number
}

export type BlogPayload = {
    title : string,
    content : string,
    authorEmail : string
}

export type State = {
    user : {
        name : string,
        email : string,
        password : string
    }
}