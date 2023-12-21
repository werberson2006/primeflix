import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./filme.css";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "e8c3415a23286844c9434f9798eeb317",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigation("/", { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {};
  }, [navigation, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Esse filme já está na sua lista.");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h4>Carregando detalhes...</h4>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1 className="titulo">{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
        className="img"
      />

      <h3 className="sinopse-title">Sinopse:</h3>
      <span className="sinopse">{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="areaBtn">
        <button className="salvarBtn" onClick={salvarFilme}>
          Salvar
        </button>
        <button className="linkBtn">
          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
