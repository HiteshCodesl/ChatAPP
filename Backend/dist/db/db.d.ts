import mongoose from "mongoose";
export declare const userModel: mongoose.Model<{
    email?: string | null;
    name?: string | null;
    password?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    email?: string | null;
    name?: string | null;
    password?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    email?: string | null;
    name?: string | null;
    password?: string | null;
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
}, mongoose.Document<unknown, {}, {
    email?: string | null;
    name?: string | null;
    password?: string | null;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    email?: string | null;
    name?: string | null;
    password?: string | null;
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
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        email?: string | null;
        name?: string | null;
        password?: string | null;
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
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    email?: string | null;
    name?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const chatModel: mongoose.Model<{
    message?: string | null;
    user?: mongoose.Types.ObjectId | null;
    room?: mongoose.Types.ObjectId | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    message?: string | null;
    user?: mongoose.Types.ObjectId | null;
    room?: mongoose.Types.ObjectId | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    message?: string | null;
    user?: mongoose.Types.ObjectId | null;
    room?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    message?: string | null;
    user?: mongoose.Types.ObjectId | null;
    room?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, {
    message?: string | null;
    user?: mongoose.Types.ObjectId | null;
    room?: mongoose.Types.ObjectId | null;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    message?: string | null;
    user?: mongoose.Types.ObjectId | null;
    room?: mongoose.Types.ObjectId | null;
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
        message?: string | null;
        user?: mongoose.Types.ObjectId | null;
        room?: mongoose.Types.ObjectId | null;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        message?: string | null;
        user?: mongoose.Types.ObjectId | null;
        room?: mongoose.Types.ObjectId | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    message?: string | null;
    user?: mongoose.Types.ObjectId | null;
    room?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    message?: string | null;
    user?: mongoose.Types.ObjectId | null;
    room?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const roomModel: mongoose.Model<{
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
    messages?: mongoose.Types.ObjectId | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
    messages?: mongoose.Types.ObjectId | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
    messages?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
    messages?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, {
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
    messages?: mongoose.Types.ObjectId | null;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
    messages?: mongoose.Types.ObjectId | null;
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
        roomName?: string | null;
        host?: mongoose.Types.ObjectId | null;
        messages?: mongoose.Types.ObjectId | null;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        roomName?: string | null;
        host?: mongoose.Types.ObjectId | null;
        messages?: mongoose.Types.ObjectId | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
    messages?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    roomName?: string | null;
    host?: mongoose.Types.ObjectId | null;
    messages?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=db.d.ts.map