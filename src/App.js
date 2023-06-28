import React, { useState } from "react";
import api from './config/configApi';


function App() {
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const uploadImage = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    const headers = {
      'headers': {
        'Content-Type': 'application/json'
      }
    }

    await api.post("/upload-image", formData, headers)
    .then((response) => {
      setStatus({
        type: 'success',
        mensagem: response.data.mensagem
      });
    }).catch((err) => {
      if(err.response){
        setStatus({
          type: 'error',
          mensagem: err.response.data.mensagem
        });
      }else{
        setStatus({
          type: 'error',
          mensagem: "Erro: Tente mais tarde!"
        });
      }
    });

  }

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImageName(selectedFile.name);
  }

  return (
    <div className="container">
      <h1 className="up">Upload</h1>

      {status.type === 'success' ? <p className="success">{status.mensagem}</p> : ""}
      {status.type === 'error' ? <p className="error">{status.mensagem}</p> : ""}

      <form onSubmit={uploadImage}>
        <label className="custom-file-upload">
          {imageName ? imageName : "Escolher Arquivo"}
          <input type="file" name="image" onChange={handleFileChange} />
        </label>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default App;
