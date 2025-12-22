import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Wrench, 
  Package, 
  Settings, 
  PlusCircle,
  Trash2,
  Save,
  AlertTriangle,
  Search,
  RefreshCcw
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- DADOS COMPLETOS DA SUA PLANILHA ---
const INITIAL_DATA = {
  "config": {
    "valorHora": 25.0,
    "metaLucro": 50.0,
    "proLabore": 2000.0,
    "formaPagamento": "PIX"
  },
  "fixos": [
    { "id": 1, "nome": "Água", "valor": 200.0 },
    { "id": 2, "nome": "Luz", "valor": 200.0 },
    { "id": 3, "nome": "Internet", "valor": 100.0 },
    { "id": 4, "nome": "Crédito Celular", "valor": 30.0 },
    { "id": 5, "nome": "Pró-Labore (Futuro)", "valor": 0.0 }
  ],
  "estoque": [
    { "id": 1, "nome": "Snow Foam", "categoria": "Equipamento", "qtd": 1.0, "custo": 200.0 },
    { "id": 2, "nome": "Mangueira", "categoria": "Equipamento", "qtd": 1.0, "custo": 200.0 },
    { "id": 3, "nome": "Aspirador", "categoria": "Equipamento", "qtd": 1.0, "custo": 280.0 },
    { "id": 4, "nome": "Politriz", "categoria": "Equipamento", "qtd": 1.0, "custo": 800.0 },
    { "id": 5, "nome": "Kit Boinas", "categoria": "Acessório", "qtd": 1.0, "custo": 59.0 },
    { "id": 6, "nome": "Pano Secagem", "categoria": "Acessório", "qtd": 1.0, "custo": 42.0 },
    { "id": 7, "nome": "Escovas / Pincéis", "categoria": "Acessório", "qtd": 1.0, "custo": 200.0 },
    { "id": 8, "nome": "Pulverizadores (3 un)", "categoria": "Acessório", "qtd": 3.0, "custo": 11.0 },
    { "id": 9, "nome": "Lavadora Karcher", "categoria": "Equipamento", "qtd": 1.0, "custo": 300.0 },
    { "id": 10, "nome": "V-Floc 1.5L", "categoria": "Químico", "qtd": 1.0, "custo": 48.0 },
    { "id": 11, "nome": "V-Mol 1.5L", "categoria": "Químico", "qtd": 1.0, "custo": 34.0 },
    { "id": 12, "nome": "Alumax 1.5L", "categoria": "Químico", "qtd": 1.0, "custo": 32.0 },
    { "id": 13, "nome": "Shiny 1.5L", "categoria": "Químico", "qtd": 1.0, "custo": 120.0 },
    { "id": 14, "nome": "Prizm 500ml", "categoria": "Químico", "qtd": 1.0, "custo": 35.0 },
    { "id": 15, "nome": "Hidracouro 500ml", "categoria": "Químico", "qtd": 1.0, "custo": 36.0 },
    { "id": 16, "nome": "Focus 240ml", "categoria": "Químico", "qtd": 1.0, "custo": 55.0 },
    { "id": 17, "nome": "Marker 500ml", "categoria": "Químico", "qtd": 1.0, "custo": 59.0 },
    { "id": 18, "nome": "Cheirinho Caseiro", "categoria": "Químico", "qtd": 1.0, "custo": 7.5 },
    { "id": 19, "nome": "Restaurax 500ml", "categoria": "Químico", "qtd": 1.0, "custo": 40.0 },
    { "id": 20, "nome": "Zucs Plásticos", "categoria": "Químico", "qtd": 1.0, "custo": 34.0 },
    { "id": 21, "nome": "Cera Blend Líquida", "categoria": "Químico", "qtd": 1.0, "custo": 36.0 },
    { "id": 22, "nome": "Cera Blend Pasta", "categoria": "Químico", "qtd": 1.0, "custo": 64.0 },
    { "id": 23, "nome": "Sintra 1.5L", "categoria": "Químico", "qtd": 1.0, "custo": 39.0 },
    { "id": 24, "nome": "Ecoblack 1.5L", "categoria": "Químico", "qtd": 1.0, "custo": 20.59 },
    { "id": 25, "nome": "Glaco 120ml", "categoria": "Químico", "qtd": 1.0, "custo": 72.0 },
    { "id": 26, "nome": "Luvas Descartáveis (Cx)", "categoria": "Consumível", "qtd": 1.0, "custo": 30.0 },
    { "id": 27, "nome": "Meta Luster", "categoria": "Geral", "qtd": 1.0, "custo": 90.0 },
    { "id": 28, "nome": "Lixas (Jogo)", "categoria": "Consumível", "qtd": 1.0, "custo": 15.0 }
  ],
  "servicos": [
    { "id": 1, "nome": "Lavagem Convencional", "tempo": 1.5, "mat": 10.0, "preco": 70.0 },
    { "id": 2, "nome": "Lavagem Técnica Detalhada", "tempo": 5.0, "mat": 22.5, "preco": 230.0 },
    { "id": 3, "nome": "Higienização Bancos Tecido", "tempo": 8.0, "mat": 32.5, "preco": 250.0 },
    { "id": 4, "nome": "Higienização Bancos Couro", "tempo": 4.0, "mat": 22.5, "preco": 190.0 },
    { "id": 5, "nome": "Higienização Interna Comp. Tecido", "tempo": 12.0, "mat": 42.5, "preco": 400.0 },
    { "id": 6, "nome": "Higienização Interna Comp. Couro", "tempo": 8.0, "mat": 32.5, "preco": 320.0 },
    { "id": 7, "nome": "Vitrificação de Faróis", "tempo": 1.5, "mat": 22.5, "preco": 160.0 },
    { "id": 8, "nome": "Tratamento de Vidros (Somente para-brisa)", "tempo": 1.5, "mat": 17.5, "preco": 120.0 },
    { "id": 9, "nome": "Tratamento de Vidros (Todos os vidros:)", "tempo": 2.0, "mat": 19.5, "preco": 160.0 },
    { "id": 10, "nome": "Limpeza de Forro de Teto", "tempo": 4.0, "mat": 5.0, "preco": 100.0 },
    { "id": 11, "nome": "Combo Gold - Tecido", "tempo": 17.0, "mat": 65.0, "preco": 520.0 },
    { "id": 12, "nome": "Combo Gold - Couro", "tempo": 13.0, "mat": 55.0, "preco": 480.0 },
    { "id": 13, "nome": "Combo Pro - Tecido", "tempo": 13.0, "mat": 55.0, "preco": 420.0 },
    { "id": 14, "nome": "Combo Pro - Couro", "tempo": 9.0, "mat": 45.0, "preco": 400.0 },
    { "id": 15, "nome": "Combo Standard - Tecido", "tempo": 9.5, "mat": 41.5, "preco": 300.0 },
    { "id": 16, "nome": "Combo Standard - Couro", "tempo": 5.5, "mat": 31.5, "preco": 270.0 }
  ],
  "caixa": [
    { "id": 1, "data": "2024-11-01", "desc": "Lavagem Convencional", "tipo": "Entrada", "valor": 60.0, "forma": "Dinheiro" },
    { "id": 2, "data": "2024-11-15", "desc": "Lavagem Convencional", "tipo": "Entrada", "valor": 60.0, "forma": "Dinheiro" },
    { "id": 3, "data": "2024-12-05", "desc": "Lavagem Convencional", "tipo": "Entrada", "valor": 75.0, "forma": "Dinheiro" },
    { "id": 4, "data": "2024-12-18", "desc": "Lavagem Convencional", "tipo": "Entrada", "valor": 110.0, "forma": "Dinheiro" },
    { "id": 5, "data": "2024-12-19", "desc": "Lavagem Convencional", "tipo": "Entrada", "valor": 70.0, "forma": "Dinheiro" }
  ]
};

const App = () => {
  // --- ESTADOS E PERSISTÊNCIA ---
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // MUDANÇA AQUI: Adicionei "_final" nas chaves para forçar o navegador a carregar os dados novos
  const usePersistedState = (key, initialValue) => {
    const [state, setState] = useState(() => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    });
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  };

  // Chaves atualizadas para "config_final", etc.
  const [config, setConfig] = usePersistedState('config_final', INITIAL_DATA.config);
  const [fixos, setFixos] = usePersistedState('fixos_final', INITIAL_DATA.fixos);
  const [estoque, setEstoque] = usePersistedState('estoque_final', INITIAL_DATA.estoque);
  const [servicos, setServicos] = usePersistedState('servicos_final', INITIAL_DATA.servicos);
  const [caixa, setCaixa] = usePersistedState('caixa_final', INITIAL_DATA.caixa);

  // --- CÁLCULOS AUXILIARES ---
  const totalFixos = fixos.reduce((acc, item) => acc + Number(item.valor), 0);
  const custoFixoHora = totalFixos / 160; // Base 160h mensais

  // --- COMPONENTES DE TELA ---
  
  const Dashboard = () => {
    // Pegar o mês atual para filtrar (opcional, aqui mostra tudo para dar volume aos dados)
    const entradas = caixa.filter(c => c.tipo === 'Entrada').reduce((acc, c) => acc + Number(c.valor), 0);
    const saidas = caixa.filter(c => c.tipo === 'Saída').reduce((acc, c) => acc + Number(c.valor), 0);
    const saldo = entradas - saidas;
    const lucroLiquido = saldo - totalFixos;

    const dadosGrafico = [
      { name: 'Entradas', valor: entradas },
      { name: 'Saídas', valor: saidas },
      { name: 'C. Fixos', valor: totalFixos },
    ];

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Visão Geral</h2>
        
        {/* CARDS KPI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Faturamento Total</p>
            <p className="text-2xl font-bold text-green-600">R$ {entradas.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Custos Fixos (Mês)</p>
            <p className="text-2xl font-bold text-red-500">R$ {totalFixos.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Saldo de Caixa</p>
            <p className="text-2xl font-bold text-blue-600">
              R$ {saldo.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Meta Pró-Labore</p>
            <div className="flex justify-between items-end">
              <p className="text-xl font-bold text-gray-700">R$ {config.proLabore}</p>
            </div>
            <p className="text-xs text-gray-400 mt-1">Meta: R$ 2.000,00</p>
          </div>
        </div>

        {/* GRÁFICOS */}
        <div className="bg-white p-6 rounded-lg shadow-sm h-80">
          <h3 className="text-lg font-semibold mb-4">Fluxo Financeiro</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dadosGrafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
              <Bar dataKey="valor" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const FluxoCaixa = () => {
    const [novoLancamento, setNovoLancamento] = useState({ data: '', desc: '', tipo: 'Entrada', valor: '', forma: 'PIX' });
    const [filtro, setFiltro] = useState('');

    const handleAdd = () => {
      if (!novoLancamento.desc || !novoLancamento.valor) return;
      setCaixa([...caixa, { ...novoLancamento, id: Date.now(), valor: Number(novoLancamento.valor) }]);
      setNovoLancamento({ data: '', desc: '', tipo: 'Entrada', valor: '', forma: 'PIX' });
    };

    const caixaFiltrado = caixa.filter(item => 
      item.desc.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Fluxo de Caixa</h2>
        
        {/* FORMULÁRIO */}
        <div className="bg-white p-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-6 gap-4 items-end border border-gray-100">
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-gray-600 mb-1">Data</label>
            <input type="date" className="w-full border rounded p-2 text-sm" value={novoLancamento.data} onChange={e => setNovoLancamento({...novoLancamento, data: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-600 mb-1">Descrição</label>
            <input list="servicos-sugestao" type="text" className="w-full border rounded p-2 text-sm" placeholder="Ex: Lavagem Gol" value={novoLancamento.desc} onChange={e => setNovoLancamento({...novoLancamento, desc: e.target.value})} />
            <datalist id="servicos-sugestao">
              {servicos.map(s => <option key={s.id} value={s.nome} />)}
            </datalist>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Tipo</label>
            <select className="w-full border rounded p-2 text-sm" value={novoLancamento.tipo} onChange={e => setNovoLancamento({...novoLancamento, tipo: e.target.value})}>
              <option>Entrada</option>
              <option>Saída</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Valor (R$)</label>
            <input type="number" className="w-full border rounded p-2 text-sm" value={novoLancamento.valor} onChange={e => setNovoLancamento({...novoLancamento, valor: e.target.value})} />
          </div>
          <button onClick={handleAdd} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex justify-center items-center gap-2 text-sm font-bold">
            <PlusCircle size={18} /> Lançar
          </button>
        </div>

        {/* TABELA */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Histórico</h3>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
              <Search size={16} className="text-gray-400"/>
              <input 
                className="bg-transparent text-sm outline-none" 
                placeholder="Buscar..." 
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
              />
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4">Data</th>
                <th className="p-4">Descrição</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {caixaFiltrado.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4">{item.data}</td>
                  <td className="p-4">{item.desc}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.tipo === 'Entrada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.tipo}
                    </span>
                  </td>
                  <td className="p-4 font-medium">R$ {Number(item.valor).toFixed(2)}</td>
                  <td className="p-4 text-red-400 cursor-pointer hover:text-red-600">
                    <Trash2 size={16} onClick={() => setCaixa(caixa.filter(c => c.id !== item.id))} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const CalculadoraServicos = () => {
    const [novo, setNovo] = useState({ nome: '', tempo: 1, mat: 0 });
    
    // Cálculos em tempo real
    const custoMO = novo.tempo * config.valorHora;
    const rateio = novo.tempo * custoFixoHora;
    const custoTotal = custoMO + Number(novo.mat) + rateio;
    const precoSugerido = custoTotal * (1 + (config.metaLucro / 100));

    const salvarServico = () => {
      setServicos([...servicos, { ...novo, id: Date.now(), preco: precoSugerido }]);
      setNovo({ nome: '', tempo: 1, mat: 0 });
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Serviços e Preços</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CALCULADORA */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100 lg:col-span-1 h-fit">
            <h3 className="font-bold mb-4 text-blue-800 flex items-center gap-2">
              <PlusCircle size={18}/> Novo Serviço
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-600">Nome do Serviço</label>
                <input className="w-full border rounded p-2 text-sm" value={novo.nome} onChange={e => setNovo({...novo, nome: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-gray-600">Tempo (Horas)</label>
                  <input type="number" className="w-full border rounded p-2 text-sm" value={novo.tempo} onChange={e => setNovo({...novo, tempo: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600">Custo Material</label>
                  <input type="number" className="w-full border rounded p-2 text-sm" value={novo.mat} onChange={e => setNovo({...novo, mat: Number(e.target.value)})} />
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded text-xs space-y-1 text-gray-600">
                <div className="flex justify-between"><span>Mão de Obra ({config.valorHora}/h):</span> <span>R$ {custoMO.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Rateio Fixo:</span> <span>R$ {rateio.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold pt-2 border-t text-gray-800"><span>Custo Total:</span> <span>R$ {custoTotal.toFixed(2)}</span></div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded text-center border border-blue-100">
                <p className="text-xs text-blue-600 font-bold uppercase">Preço Sugerido (+{config.metaLucro}%)</p>
                <p className="text-2xl font-bold text-blue-800">R$ {precoSugerido.toFixed(2)}</p>
              </div>

              <button onClick={salvarServico} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 text-sm font-bold">Salvar na Tabela</button>
            </div>
          </div>

          {/* LISTA DE SERVIÇOS */}
          <div className="bg-white rounded-lg shadow-sm lg:col-span-2 overflow-hidden border border-gray-100">
             <div className="p-4 bg-gray-50 border-b">
                <h3 className="font-bold text-gray-700">Tabela de Serviços Atual</h3>
             </div>
             <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-gray-500 border-b">
                  <tr>
                    <th className="p-3">Serviço</th>
                    <th className="p-3">Tempo</th>
                    <th className="p-3">Material</th>
                    <th className="p-3">Preço Venda</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {servicos.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-800">{s.nome}</td>
                      <td className="p-3 text-gray-500">{s.tempo}h</td>
                      <td className="p-3 text-gray-500">R$ {Number(s.mat).toFixed(2)}</td>
                      <td className="p-3 font-bold text-green-600">R$ {Number(s.preco).toFixed(2)}</td>
                      <td className="p-3 text-red-400 cursor-pointer hover:text-red-600"><Trash2 size={16} onClick={() => setServicos(servicos.filter(i => i.id !== s.id))} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Estoque = () => {
    const [item, setItem] = useState({ nome: '', qtd: 1, custo: 0, categoria: 'Geral' });
    
    // Cálculo do total investido
    const totalInvestido = estoque.reduce((acc, it) => acc + (it.qtd * it.custo), 0);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Estoque</h2>
          <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-200">
            <span className="text-xs text-gray-500 uppercase font-bold">Total Investido</span>
            <div className="text-xl font-bold text-gray-800">R$ {totalInvestido.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-end flex-wrap border border-gray-100">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-bold text-gray-600">Nome do Item</label>
            <input className="w-full border rounded p-2 text-sm" value={item.nome} onChange={e => setItem({...item, nome: e.target.value})} />
          </div>
          <div className="w-32">
             <label className="text-xs font-bold text-gray-600">Categoria</label>
             <select className="w-full border rounded p-2 text-sm" value={item.categoria} onChange={e => setItem({...item, categoria: e.target.value})}>
                <option>Geral</option>
                <option>Químico</option>
                <option>Equipamento</option>
                <option>Acessório</option>
                <option>Consumível</option>
             </select>
          </div>
          <div className="w-20">
            <label className="text-xs font-bold text-gray-600">Qtd</label>
            <input type="number" className="w-full border rounded p-2 text-sm" value={item.qtd} onChange={e => setItem({...item, qtd: Number(e.target.value)})} />
          </div>
          <div className="w-28">
            <label className="text-xs font-bold text-gray-600">Custo Unit.</label>
            <input type="number" className="w-full border rounded p-2 text-sm" value={item.custo} onChange={e => setItem({...item, custo: Number(e.target.value)})} />
          </div>
          <button 
            onClick={() => {
              if(!item.nome) return;
              setEstoque([...estoque, { ...item, id: Date.now() }]);
              setItem({ nome: '', qtd: 1, custo: 0, categoria: 'Geral' });
            }}
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 font-bold text-sm"
          >
            Adicionar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {estoque.map(prod => (
            <div key={prod.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 relative group">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 border border-gray-100 px-1 rounded">{prod.categoria || 'Geral'}</span>
                 <Trash2 size={14} className="text-gray-300 hover:text-red-500 cursor-pointer" onClick={() => setEstoque(estoque.filter(i => i.id !== prod.id))}/>
              </div>
              <h3 className="font-bold text-gray-800 text-sm h-10 line-clamp-2">{prod.nome}</h3>
              <div className="mt-3 flex justify-between items-end border-t pt-2 border-gray-50">
                <div>
                   <p className="text-xs text-gray-400">Unitário</p>
                   <p className="text-sm font-medium text-gray-600">R$ {Number(prod.custo).toFixed(2)}</p>
                </div>
                <div className="text-right">
                   <p className="text-xs text-gray-400">Qtd</p>
                   <span className={`text-lg font-bold ${prod.qtd < 2 ? 'text-red-500 flex items-center gap-1' : 'text-gray-800'}`}>
                     {prod.qtd < 2 && <AlertTriangle size={12}/>} {prod.qtd}
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Configuracoes = () => {
    const [localConfig, setLocalConfig] = useState(config);
    const [localFixo, setLocalFixo] = useState({ nome: '', valor: '' });

    // Função de Resetar Dados
    const resetData = () => {
      if(confirm("Tem certeza? Isso apagará todos os dados atuais e recarregará a planilha original.")) {
         localStorage.clear();
         window.location.reload();
      }
    };

    const handleSaveConfig = () => {
      setConfig(localConfig);
      alert('Configurações Salvas!');
    };

    const addFixo = () => {
      if(!localFixo.nome || !localFixo.valor) return;
      setFixos([...fixos, { ...localFixo, id: Date.now(), valor: Number(localFixo.valor) }]);
      setLocalFixo({ nome: '', valor: '' });
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Configurações & Custos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PARAMETROS GERAIS */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-700"><Settings size={18}/> Parâmetros do Negócio</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600">Valor da sua Hora (R$)</label>
                <input type="number" className="w-full border rounded p-2 text-sm" value={localConfig.valorHora} onChange={e => setLocalConfig({...localConfig, valorHora: Number(e.target.value)})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600">Meta de Lucro (%)</label>
                <input type="number" className="w-full border rounded p-2 text-sm" value={localConfig.metaLucro} onChange={e => setLocalConfig({...localConfig, metaLucro: Number(e.target.value)})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600">Pró-Labore Desejado (R$)</label>
                <input type="number" className="w-full border rounded p-2 text-sm" value={localConfig.proLabore} onChange={e => setLocalConfig({...localConfig, proLabore: Number(e.target.value)})} />
              </div>
              <button onClick={handleSaveConfig} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-4 text-sm font-bold flex items-center justify-center gap-2">
                 <Save size={16}/> Salvar Alterações
              </button>
              
              <div className="pt-4 border-t mt-4">
                  <button onClick={resetData} className="w-full text-red-500 p-2 rounded hover:bg-red-50 text-xs font-bold flex items-center justify-center gap-2">
                    <RefreshCcw size={14}/> Resetar Dados (Limpar Cache)
                  </button>
              </div>
            </div>
          </div>

          {/* CUSTOS FIXOS */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-700"><Wallet size={18}/> Custos Fixos Mensais</h3>
            
            <div className="flex gap-2 mb-4 bg-gray-50 p-2 rounded">
              <input placeholder="Ex: Aluguel" className="border rounded p-2 flex-1 text-sm bg-white" value={localFixo.nome} onChange={e => setLocalFixo({...localFixo, nome: e.target.value})} />
              <input placeholder="R$" type="number" className="border rounded p-2 w-20 text-sm bg-white" value={localFixo.valor} onChange={e => setLocalFixo({...localFixo, valor: e.target.value})} />
              <button onClick={addFixo} className="bg-green-600 text-white p-2 rounded hover:bg-green-700"><PlusCircle size={20}/></button>
            </div>

            <ul className="divide-y divide-gray-100">
              {fixos.map(f => (
                <li key={f.id} className="py-3 flex justify-between items-center group">
                  <span className="text-sm text-gray-700">{f.nome}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-800">R$ {Number(f.valor).toFixed(2)}</span>
                    <Trash2 size={16} className="text-gray-300 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setFixos(fixos.filter(fix => fix.id !== f.id))} />
                  </div>
                </li>
              ))}
              <li className="py-3 mt-2 border-t font-bold flex justify-between text-blue-800 bg-blue-50 px-2 rounded">
                <span>TOTAL MENSAL:</span>
                <span>R$ {totalFixos.toFixed(2)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // --- RENDERIZAÇÃO PRINCIPAL ---
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white">Gestão <span className="text-blue-500">Pro</span></h1>
          <p className="text-xs text-slate-500 mt-1">v1.3 - Final</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('caixa')} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'caixa' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Wallet size={20} /> Fluxo de Caixa
          </button>
          <button onClick={() => setActiveTab('servicos')} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'servicos' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Wrench size={20} /> Serviços e Preços
          </button>
          <button onClick={() => setActiveTab('estoque')} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'estoque' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Package size={20} /> Estoque
          </button>
          <button onClick={() => setActiveTab('config')} className={`w-full flex items-center gap-3 p-3 rounded transition ${activeTab === 'config' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Settings size={20} /> Configurações
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800 text-xs text-center text-slate-600">
           &copy; 2024 Small Business
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <header className="mb-8 flex justify-between items-center md:hidden">
          <h1 className="text-2xl font-bold text-gray-800">Gestão Pro</h1>
        </header>

        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'caixa' && <FluxoCaixa />}
        {activeTab === 'servicos' && <CalculadoraServicos />}
        {activeTab === 'estoque' && <Estoque />}
        {activeTab === 'config' && <Configuracoes />}
      </main>
    </div>
  );
}

export default App;