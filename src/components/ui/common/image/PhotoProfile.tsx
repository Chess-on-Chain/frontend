import { useEffect, useState } from "react";
import { getCacheFile } from "../../../../helpers/utils";

interface PhotoProfileProps {
  fileId: string | undefined;
  classSize?: string;
}

export default function PhotoProfile({ fileId, classSize }: PhotoProfileProps) {
  const [photo, setPhoto] = useState<string | undefined>();

  if (!classSize) {
    classSize = "w-20 h-20 lg:w-24 lg:h-24";
  }

  useEffect(() => {
    if (fileId) {
      getCacheFile(fileId).then((result) => {
        setPhoto(result);
      });
    }
  }, [fileId]);

  return (
    <>
      {!photo && (
        <div
          className={`${classSize} rounded-full bg-gradient-to-t from-[#614126] to-[#a47f55]`}
        />
      )}
      {photo && <img src={photo} className={`${classSize} rounded-full`}></img>}
    </>
  );
}
