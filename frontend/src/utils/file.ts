export function generatePreviewUrl(file: File) {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error('Error reading file.'));
    };

    reader.readAsDataURL(file);
  });
}
