import { Input } from '../../Forms/Input'
import { ButtonForm } from '../../Forms/Button'
import { useForm } from '../../../Hooks/useForm'
import { useFetch } from '../../../Hooks/useFetch'
import { PHOTO_POST } from '../../../api'
import { useContext, useEffect, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../UserContext'

export const Post = () => {
  const nome = useForm();
  const status_do_imovel = useForm();
  const preco = useForm();
  const titulo = useForm();
  const localidade = useForm();
  const breve_descricao = useForm();
  const cidade = useForm();
  const bairro = useForm();
  const descricao_completa = useForm();
  const [imgs, setImgs] = useState([]);
  const [features, setFeatures] = useState([]);
  const { data, error, loading, request } = useFetch()
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('');
  const [status, setStatus] = useState('');
  const [locacaoOuVenda, setLocacaoOuVenda] = useState('');
  const tipos = ['Apartamento', 'Casa', 'Sobrado', 'Kitnet', 'Chalé', 'Loft', 'Duplex', 'Triplex', 'Flat', 'Cobertura'];
  const statusOptions = ['Vendido', 'Disponivel'];
  const locacaOuVenda = ['Locacao', 'Venda'];
  const { filterPosts } = useContext(UserContext)

  useEffect(() => {
    if(data) navigate('/account');
  }, [data, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', nome.value);
    formData.append('cidade', cidade.value);
    formData.append('bairro', bairro.value);
    formData.append('tipo', tipo);
    formData.append('status_do_imovel', status);
    formData.append('locacao_ou_venda', locacaoOuVenda);
    formData.append('preco', preco.value);
    formData.append('titulo', titulo.value);
    formData.append('localidade', localidade.value);
    formData.append('breve_descricao', breve_descricao.value);
    formData.append('descricao_completa', descricao_completa.value);
  
    // Enviar features como um array
    formData.append('features', features.join(','));
  
    imgs.forEach((img, index) => {
      formData.append(`img${index + 1}`, img);
    });
  
    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options)
    .then(() => {
      filterPosts(tipo, cidade.value, bairro.value);
    })
  };
  
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
        <Input
          label="Coloque as caracteristicas da casa separadas por virgula"
          name="features"
          type="text"
          value={features.join(',')} // Mostrar as features separadas por vírgula
          onChange={(e) => setFeatures(e.target.value.split(','))}
        />
        <Input label="Descrição completa" name="descricao_completa" type="textarea" {...descricao_completa}/>
        <Input label="Cidade" name="cidade" type="text" {...cidade}/>
        <Input label="Bairro" name="bairro" type="text" {...bairro}/>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Selecione o tipo</option>
          {tipos.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Selecione o status</option>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select value={locacaoOuVenda} onChange={(e) => setLocacaoOuVenda(e.target.value)}>
          <option value="">Locação ou Venda?</option>
          {locacaOuVenda.map((locv) => (
            <option key={locv} value={locv}>
              {locv}
            </option>
          ))}
        </select>
        <div id="arquivos">
          <label for="arquivo">Enviar arquivos</label>
          <input type="file" multiple onChange={handleImgChange} name="arquivo" id="arquivo"/>
        </div>
        {
          loading ?
          (<ButtonForm inner="Enviando post" disabled/>)
          :
          (
          <ButtonForm inner="Fazer postagem" />)
        }
        {
          <p id="error">{error}</p>
        }
      </form>
    </div>
  )
}