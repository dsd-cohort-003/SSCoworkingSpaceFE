const BASE_URL = 'http://localhost:8080/api/image';

export async function uploadImage(file: File): Promise<string> {
  const filename = `${Date.now()}-${encodeURIComponent(file.name)}`;
  const contentType = file.type;

  // Allow only PNG or JPEG
  if (!['image/png', 'image/jpeg'].includes(contentType)) {
    throw new Error('Only PNG and JPEG files are supported.');
  }

  // Step 1: Request signed URL
  const res = await fetch(
    `${BASE_URL}/upload-url?filename=${filename}&contentType=${contentType}`,
  );
  if (!res.ok) throw new Error('Failed to get signed upload URL');
  const uploadUrl = await res.text();

  // Step 2: Upload to S3 directly
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: file,
  });

  if (!uploadRes.ok) throw new Error('Upload to S3 failed');

  // Step 3: Return the final S3 file URL (assuming public access or signed retrieval separately)
  const publicUrl = `https://cohort-image-bucket.s3.amazonaws.com/${filename}`;
  return publicUrl;
}
