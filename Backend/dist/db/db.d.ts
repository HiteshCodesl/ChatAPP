import mongoose from "mongoose";
export declare const userModel: mongoose.Model<{
    email?: string | null;
    name?: string | null;
    password?: string | null;
    profileUrl?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    email?: string | null;
    name?: string | null;
    password?: string | null;
    profileUrl?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    email?: string | null;
    name?: string | null;
    password?: string | null;
    profileUrl?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email?: string | null;
    name?: string | null;
    password?: string | null;
    profileUrl?: string | null;
}, mongoose.Document<unknown, {}, {
    email?: string | null;
    name?: string | null;
    password?: string | null;
    profileUrl?: string | null;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    email?: string | null;
    name?: string | null;
    password?: string | null;
    profileUrl?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        email?: string | null;
        name?: string | null;
        password?: string | null;
        profileUrl?: string | null;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        email?: string | null;
        name?: string | null;
        password?: string | null;
        profileUrl?: string | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    email?: string | null;
    name?: string | null;
    password?: string | null;
    profileUrl?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    email?: string | null;
    name?: string | null;
    password?: string | null;
    profileUrl?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const chatModel: mongoose.Model<{
    message: string;
    user: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    message: string;
    user: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    message: string;
    user: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    message: string;
    user: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    message: string;
    user: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    message: string;
    user: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        message: string;
        user: mongoose.Types.ObjectId;
        room: mongoose.Types.ObjectId;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        message: string;
        user: mongoose.Types.ObjectId;
        room: mongoose.Types.ObjectId;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    message: string;
    user: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    message: string;
    user: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const roomModel: mongoose.Model<{
    users: mongoose.Types.ObjectId[];
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    users: mongoose.Types.ObjectId[];
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    users: mongoose.Types.ObjectId[];
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    users: mongoose.Types.ObjectId[];
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, {
    users: mongoose.Types.ObjectId[];
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    users: mongoose.Types.ObjectId[];
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        users: mongoose.Types.ObjectId[];
        roomName?: string | null;
        host?: mongoose.Types.ObjectId | null;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        users: mongoose.Types.ObjectId[];
        roomName?: string | null;
        host?: mongoose.Types.ObjectId | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    users: mongoose.Types.ObjectId[];
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    users: mongoose.Types.ObjectId[];
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=db.d.ts.map