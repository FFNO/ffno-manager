import { supabase } from '@/api';
import { Image, LoadingOverlay, SimpleGrid, Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

interface Props {
  setUrls: (urls: string[]) => void;
}

export const ImageUpload = ({ setUrls }: Props) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [uploading, setUploading] = useState(false);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  useEffect(() => {
    async function uploadAvatar() {
      try {
        setUploading(true);

        if (!files.length) {
          return;
        }

        const urls = await Promise.all(
          files.map(async (file) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `${v4()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error: uploadError } = await supabase.storage
              .from('Image')
              .upload(filePath, file);

            if (uploadError) {
              throw uploadError;
            }
            return supabase.storage.from('Image').getPublicUrl(data.path).data
              .publicUrl;
          }),
        );

        setUrls(urls);
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    }

    void uploadAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <div>
      <LoadingOverlay
        visible={uploading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text ta="center">Thả ảnh vào đây</Text>
      </Dropzone>

      <SimpleGrid cols={{ base: 1, sm: 3 }} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
    </div>
  );
};
