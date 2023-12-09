import { Input } from '../../Forms/Input'
import { ButtonForm } from '../../Forms/Button'
import { useForm } from '../../../Hooks/useForm'
import { useFetch } from '../../../Hooks/useFetch'
import { PHOTO_POST } from '../../../api'
import { useState } from 'react'
import './style.css'

export const Post = () => {
  const nome = useForm();
  const status_do_imovel = useForm();
  const preco = useForm();
  const titulo = useForm();
  const localidade = useForm();
  const features = useForm();
  const breve_descricao = useForm();
  const descricao_completa = useForm();
  const [ imgs, setImgs ] = useState([])
  const { data, error, loading, request } = useFetch()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('nome', nome.value);
    formData.append('status_do_imovel', status_do_imovel.value);
    formData.append('preco', preco.value);
    formData.append('titulo', titulo.value);
    formData.append('localidade', localidade.value);
    formData.append('features', features.value);
    formData.append('breve_descricao', breve_descricao.value);
    formData.append('descricao_completa', descricao_completa.value);

    imgs.forEach((img, index) => {
      formData.append(`img${index + 1}`, img);
    });

    const token = window.localStorage.getItem('token')
    const { url, options } = PHOTO_POST(formData, token)
    request(url, options)
  }
  
  const handleImgChange = (e) => {
    const selectedImgs = Array.from(e.target.files);
    setImgs(selectedImgs);
  };

  return (
    <div className="animeLeft container-form__post">
      <form onSubmit={handleSubmit}>
        <Input label="Nome" name="nome" type="text" {...nome}/>
        <Input label="Status do imóvel" name="status_do_imovel" type="text" {...status_do_imovel}/>
        <Input label="Preço" name="preco" type="number" {...preco}/>
        <Input label="Titulo" name="titulo" type="text" {...titulo}/>
        <Input label="Localidade" name="localidade" type="text" {...localidade}/>
        <Input label="Breve descricão" name="breve_descricao" type="text" {...breve_descricao}/>
        <Input label="Features" name="features" type="text" {...features}/>
        <Input label="Descrição completa" name="descricao_completa" type="textarea" {...descricao_completa}/>
        <div id="arquivos">
          <label for="arquivo">Enviar arquivos</label>
          <input type="file" multiple onChange={handleImgChange} name="arquivo" id="arquivo"/>
        </div>
        <ButtonForm inner="Fazer postagem" />
      </form>
    </div>
  )
}