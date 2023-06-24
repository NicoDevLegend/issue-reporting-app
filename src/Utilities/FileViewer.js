export default function FileViewer({ base64Data }) {
  const generateUrlFromBase64 = (base64Data) => {
    const blob = b64toBlob(base64Data);
    return URL.createObjectURL(blob);
  };

  const b64toBlob = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: "aplication/pdf" });
  };

  const fileUrl = generateUrlFromBase64(base64Data);

  return (
    <div>
      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
        Open File
      </a>
    </div>
  );
}
