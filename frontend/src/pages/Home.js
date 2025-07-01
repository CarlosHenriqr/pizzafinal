import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pizzaAPI } from "../services/api";
import pizzaIlustrativa from '../imgs/pizza-ilustrativa.jpg';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true);
        const data = await pizzaAPI.getAll();
        setPizzas(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar pizzas:', err);
        setError('Erro ao carregar pizzas. Verifique se o backend está rodando.');
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  // Pizzas populares (primeiras 3 do banco ou pizzas padrão se não houver dados)
  const pizzasPopulares = pizzas.slice(0, 3);

  return (
    <div className="home-container">
      <div className="container">
        <h1>Bem-vindo à Pizzaria Deliciosa</h1>
        <p>
          Descubra as melhores pizzas artesanais feitas com ingredientes frescos e 
          receitas tradicionais que vão surpreender seu paladar.
        </p>
        
        <div className="cta-buttons">
          <Link to="/pizzas" className="btn btn-primary">
            Ver Cardápio
          </Link>
          <Link to="/carrinho" className="btn btn-secondary">
            Ver Carrinho
          </Link>
        </div>

        <div className="popular-pizzas">
          <h2>Pizzas Mais Populares</h2>
          
          {loading ? (
            <div className="loading">Carregando pizzas...</div>
          ) : error ? (
            <div className="alert alert-danger">
              {error}
              <br />
              <small>Certifique-se de que o backend está rodando na porta 8080</small>
            </div>
          ) : pizzasPopulares.length > 0 ? (
            <div className="pizza-grid">
              {pizzasPopulares.map((pizza) => (
                <div key={pizza.id} className="pizza-card">
                  <img src={pizzaIlustrativa} alt="Pizza" className="pizza-image" style={{width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px'}} />
                  <h3>{pizza.nome}</h3>
                  <p>{pizza.descricao}</p>
                  <span className="price">R$ {Number(pizza.preco).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="pizza-grid">
              <div className="pizza-card">
                <img src={pizzaIlustrativa} alt="Pizza" className="pizza-image" style={{width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px'}} />
                <h3>Margherita</h3>
                <p>Molho de tomate, mussarela fresca, manjericão e azeite</p>
                <span className="price">R$ 25,90</span>
              </div>
              <div className="pizza-card">
                <img src={pizzaIlustrativa} alt="Pizza" className="pizza-image" style={{width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px'}} />
                <h3>Pepperoni</h3>
                <p>Molho de tomate, mussarela e pepperoni picante</p>
                <span className="price">R$ 32,90</span>
              </div>
              <div className="pizza-card">
                <img src={pizzaIlustrativa} alt="Pizza" className="pizza-image" style={{width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px'}} />
                <h3>Calabresa</h3>
                <p>Molho de tomate, mussarela, calabresa e cebola</p>
                <span className="price">R$ 28,90</span>
              </div>
            </div>
          )}
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>🍕 Ingredientes Frescos</h3>
            <p>
              Utilizamos apenas ingredientes frescos e de alta qualidade, 
              selecionados cuidadosamente para garantir o melhor sabor.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>⚡ Entrega Rápida</h3>
            <p>
              Entregamos em até 30 minutos ou sua pizza é grátis! 
              Garantimos que sua pizza chegue quentinha e saborosa.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>🎯 Qualidade Garantida</h3>
            <p>
              Nossas pizzas são feitas artesanalmente por pizzaiolos 
              experientes, seguindo receitas tradicionais italianas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
