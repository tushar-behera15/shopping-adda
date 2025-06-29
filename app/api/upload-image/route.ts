import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function bufferToStream(buffer: Buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

export async function POST(req: Request): Promise<Response> {
    const data = await req.formData();
    const file: File | null = data.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    return await new Promise<Response>((resolve) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
                if (error) {
                    console.error(error);
                    return resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
                }
                return resolve(NextResponse.json({ url: result?.secure_url }));
            }
        );

        bufferToStream(buffer).pipe(uploadStream);
    });
}

