export const uploadImageToCloudinary = async (imageUri: string): Promise<string> => {
  const apiUrl = 'https://api.cloudinary.com/v1_1/dssczoogn/upload';
  const data = new FormData();

  data.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  } as any);

  data.append('upload_preset', 'cat3_preset');

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: data,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || 'Error al subir la imagen a Cloudinary');
  }

  return result.secure_url;
};
