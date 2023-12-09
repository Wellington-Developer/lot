import { useContext, useEffect, useState } from 'react';
import './style.css';
import { UserContext } from '../../UserContext';

export const FormSelectFilter = () => {
  const { posts, filterPosts } = useContext(UserContext);
  const [tipos, setTipos] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [tipo, setTipo] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');

  const filterData = () => {
    if (posts) {
      const tiposSet = new Set();
      const cidadesSet = new Set();
      const bairrosSet = new Set();

      posts.forEach((post) => {
        tiposSet.add(post.tipo);
        cidadesSet.add(post.cidade);
        bairrosSet.add(post.bairro);
      });

      const tiposArray = Array.from(tiposSet);
      const cidadesArray = Array.from(cidadesSet);
      const bairrosArray = Array.from(bairrosSet);

      tiposArray.unshift('');
      cidadesArray.unshift('');
      bairrosArray.unshift('');

      setTipos(tiposArray);
      setCidades(cidadesArray);
      setBairros(bairrosArray);
    }
  };

  useEffect(() => {
    filterData();
  }, [posts]);

  useEffect(() => {
    if (cidade !== '' || bairro !== '' || tipo !== '') {
      filterPosts(tipo, cidade, bairro);
    } else {
      filterPosts('', '', '');
    }
  }, [cidade, bairro, tipo, filterPosts]);

  return (
    <div>
      <div className="form-select__container">
        <div className="img-form">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagem" />
        </div>
        
        <div className="form-content__select">
          <form action="">
            <select onChange={(e) => setTipo(e.target.value)} value={tipo}>
              <option value="">Tipo</option>
              {tipos.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>

            <select onChange={(e) => setCidade(e.target.value)} value={cidade}>
              <option value="">Cidade</option>
              {cidades.map((cidade, index) => (
                <option key={index} value={cidade}>
                  {cidade}
                </option>
              ))}
            </select>

            <select onChange={(e) => setBairro(e.target.value)} value={bairro}>
              <option value="">Bairro</option>
              {bairros.map((bairro, index) => (
                <option key={index} value={bairro}>
                  {bairro}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};
