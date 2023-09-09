import { FileButton, Image } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { generatePreviewUrl } from '@/utils/file';
import { storage } from '@/config/firebase';

interface Props {
  alt: string;
  form: UseFormReturnType<object, (values: object) => object>;
  url: string;
}

function ImagePicker({ alt, url, form }: Props) {
  const [previewUrl, setPreviewUrl] = useState(url);
  const [loading, setLoading] = useState(false);

  const handleUploadFile = (imageFile: File) => {
    const name = imageFile.name;
    const storageRef = ref(storage, `image/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        notifications.show({
          title: 'File Upload Error',
          message: error.message,
          color: 'red'
        });
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //url is download url of file
          setPreviewUrl(url);
          form.setValues({ image: url });
          setLoading(false);
        });
      }
    );
  };

  const handleFileSelect = async (file: File) => {
    try {
      setLoading(true);
      handleUploadFile(file);
      form.setValues({ image: 'Adee' });
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'File Upload failed. Try Again',
        color: 'red'
      });
    }
  };

  return (
    <FileButton
      disabled={loading}
      onChange={handleFileSelect}
      accept="image/png,image/jpeg"
    >
      {(props) => (
        <Image
          className="cursor-pointer"
          {...props}
          width={120}
          height={120}
          radius="lg"
          src={
            loading
              ? 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921'
              : previewUrl || ''
          }
          alt={alt}
          onError={() => setPreviewUrl('https://placehold.co/120x120')}
        />
      )}
    </FileButton>
  );
}

export default ImagePicker;
