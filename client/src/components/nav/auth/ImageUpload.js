import React, { useRef , useState, useEffect} from "react";

function ImageUpload({id,getFile}) {
  const filePickerRef = useRef();
  const [file, setfile] = useState();
const [previewUrl, setpreviewUrl] = useState();

useEffect(() => {
    if (!file){return ;}
const fileReader= new FileReader();
fileReader.onload=()=>{setpreviewUrl(fileReader.result)};
fileReader.readAsDataURL(file);
}
// eslint-disable-next-line react-hooks/exhaustive-deps
, [file])


useEffect(() => {
 getFile(file);
}
// eslint-disable-next-line react-hooks/exhaustive-deps
, [file])



  function pickImageHandler(e) {
    e.preventDefault();
    filePickerRef.current.click();
  }
  function pickHandler(event) {
if (event.target.files && event.target.files.length===1){
    setfile(event.target.files[0])
    return;
}  

}

  return (
    <div style={{ height:'180px'}} >
      <input
        id={id}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png"
        ref={filePickerRef}
        onChange={pickHandler}
      />
      <div style={{ display:'flex', alignItems:'center'}}>
      {!previewUrl && <p>Please pick an image </p>}
      {previewUrl && <img src={previewUrl} style={{width:'120px', height:'fitContent'}} alt="Preview" />}
      <button style={{ width:'150px', margin:'10px', height:'auto'}} onClick={pickImageHandler}>Pick an image</button></div>
    </div>
  );
}

export default ImageUpload;
