import React, { useContext, useEffect, useState } from "react";
import './style.css';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../../Hooks/useForm";
import { useFetch } from "../../../Hooks/useFetch";
import { Input } from "../../Forms/Input";
import { UserContext } from "../../../UserContext";
import { PHOTO_EDIT } from '../../../api';
import { ButtonForm } from '../../Forms/Button';

export const EditPost = () => {
  const { id } = useParams();
  const { posts } = useContext(UserContext);

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
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('');
  const [status, setStatus] = useState('');
  const [locacaoOuVenda, setLocacaoOuVenda] = useState('');
  const tipos = ['Apartamento', 'Casa', 'Sobrado', 'Kitnet', 'Chalé', 'Loft', 'Duplex', 'Triplex', 'Flat', 'Cobertura'];
  const statusOptions = ['Vendido', 'Disponivel'];
  const locacaoOuVendaOptions = ['Locacao', 'Venda'];

  const handleSubmit = async (e) => {
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

    formData.append('features', features.join(','));

    imgs.forEach((img, index) => {
      formData.append(`img${index + 1}`, img);
    });

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_EDIT(formData, token, id);

    try {
      const response = await request(url, options);
  
      if (response.ok) {
        console.log('Post atualizado com sucesso:', data);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleImgChange = (e) => {
    const selectedImgs = Array.from(e.target.files);
    setImgs(selectedImgs);
  };

  const getFilterPost = () => {
    if (posts) {
      const filteredPost = posts.find(post => post.id == id);

      if (filteredPost) {
        nome.setValue(filteredPost.author);
        status_do_imovel.setValue(filteredPost.status_do_imovel);
        preco.setValue(filteredPost.preco);
        titulo.setValue(filteredPost.title);
        localidade.setValue(filteredPost.localidade);
        breve_descricao.setValue(filteredPost.breve_descricao);
        descricao_completa.setValue(filteredPost.descricao_completa);
        cidade.setValue(filteredPost.cidade);
        bairro.setValue(filteredPost.bairro);
        setFeatures(filteredPost.features.split(','));

        setTipo(filteredPost.tipo);
        setStatus(filteredPost.status);
        setLocacaoOuVenda(filteredPost.locacao_ou_venda);
      }
    }
  };

  useEffect(() => {
    getFilterPost();
  }, [id]);

  return (
    <div className="post-edit__container">
      <form onSubmit={handleSubmit}>
        <Input label="Nome" name="nome" type="text" {...nome} />
        <Input label="Status do imóvel" name="status_do_imovel" type="text" {...status_do_imovel} />
        <Input label="Preço" name="preco" type="number" {...preco} />
        <Input label="Titulo" name="titulo" type="text" {...titulo} />
        <Input label="Localidade" name="localidade" type="text" {...localidade} />
        <Input label="Breve descricão" name="breve_descricao" type="text" {...breve_descricao} />
        <Input
          label="Coloque as caracteristicas da casa separadas por virgula"
          name="features"
          type="text"
          value={features.join(',')} // Mostrar as features separadas por vírgula
          onChange={(e) => setFeatures(e.target.value.split(','))}
        />
        <Input label="Descrição completa" name="descricao_completa" type="textarea" {...descricao_completa} />
        <Input label="Cidade" name="cidade" type="text" {...cidade} />
        <Input label="Bairro" name="bairro" type="text" {...bairro} />
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
          {locacaoOuVendaOptions.map((locv) => (
            <option key={locv} value={locv}>
              {locv}
            </option>
          ))}
        </select>
        <div id="arquivos">
          <label htmlFor="arquivo">Enviar arquivos</label>
          <input type="file" multiple onChange={handleImgChange} name="arquivo" id="arquivo" />
        </div>
        {loading ? (
          <ButtonForm inner="Enviando post" disabled />
        ) : (
          <ButtonForm inner="Fazer postagem" />
        )}
        {<p id="error">{error}</p>}
      </form>
    </div>
  );
};
