import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Wrench, 
  Package, 
  Settings, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Users,
  Calendar,
  BarChart3,
  MessageCircle,
  AlertTriangle,
  Printer,
  CheckCircle,
  Menu // Novo ícone para mobile
} from 'lucide-react';

// --- DADOS INICIAIS ---
const INITIAL_DATA = {
  config: [
    { id: 1, param: "Valor da Hora (Mão de Obra)", value: 25 },
    { id: 2, param: "Meta de Lucro (%)", value: 0.5 },
    { id: 3, param: "Pró-Labore Desejado", value: 2000 },
    { id: 4, param: "Forma de Pagamento", value: "PIX" }
  ],
  fixedCosts: [
    { id: 1, desc: "Água", value: 200 },
    { id: 2, desc: "Luz", value: 200 },
    { id: 3, desc: "Internet", value: 100 },
    { id: 4, desc: "Crédito Celular", value: 30 },
    { id: 5, desc: "Pró-Labore (Futuro)", value: 0 }
  ],
  inventory: [
    { id: 1, product: "Snow Foam", category: "Equipamento", qty: 1, unitCost: 200.00 },
    { id: 2, product: "Mangueira", category: "Equipamento", qty: 1, unitCost: 200.00 },
    { id: 3, product: "Aspirador", category: "Equipamento", qty: 1, unitCost: 280.00 },
    { id: 4, product: "Politriz", category: "Equipamento", qty: 1, unitCost: 800.00 },
    { id: 5, product: "Kit Boinas", category: "Acessório", qty: 1, unitCost: 59.00 },
    { id: 6, product: "Pano Secagem", category: "Acessório", qty: 1, unitCost: 42.00 },
    { id: 7, product: "Escovas / Pincéis", category: "Acessório", qty: 1, unitCost: 200.00 },
    { id: 8, product: "Pulverizadores (3 un)", category: "Acessório", qty: 3, unitCost: 11.00 },
    { id: 9, product: "Lavadora Karcher", category: "Equipamento", qty: 1, unitCost: 300.00 },
    { id: 10, product: "V-Floc 1.5L", category: "Químico", qty: 1, unitCost: 48.00 },
    { id: 11, product: "V-Mol 1.5L", category: "Químico", qty: 1, unitCost: 34.00 },
    { id: 12, product: "Alumax 1.5L", category: "Químico", qty: 1, unitCost: 32.00 },
    { id: 13, product: "Shiny 1.5L", category: "Químico", qty: 1, unitCost: 120.00 },
    { id: 14, product: "Prizm 500ml", category: "Químico", qty: 1, unitCost: 35.00 },
    { id: 15, product: "Hidracouro 500ml", category: "Químico", qty: 1, unitCost: 36.00 },
    { id: 16, product: "Focus 240ml", category: "Químico", qty: 1, unitCost: 55.00 },
    { id: 17, product: "Marker 500ml", category: "Químico", qty: 1, unitCost: 59.00 },
    { id: 18, product: "Cheirinho Caseiro", category: "Químico", qty: 1, unitCost: 7.50 },
    { id: 19, product: "Restaurax 500ml", category: "Químico", qty: 1, unitCost: 40.00 },
    { id: 20, product: "Zucs Plásticos", category: "Químico", qty: 1, unitCost: 34.00 },
    { id: 21, product: "Cera Blend Líquida", category: "Químico", qty: 1, unitCost: 36.00 },
    { id: 22, product: "Cera Blend Pasta", category: "Químico", qty: 1, unitCost: 64.00 },
    { id: 23, product: "Sintra 1.5L", category: "Químico", qty: 1, unitCost: 39.00 },
    { id: 24, product: "Ecoblack 1.5L", category: "Químico", qty: 1, unitCost: 20.59 },
    { id: 25, product: "Glaco 120ml", category: "Químico", qty: 1, unitCost: 72.00 },
    { id: 26, product: "Luvas Descartáveis (Cx)", category: "Consumível", qty: 1, unitCost: 30.00 },
    { id: 27, product: "Meta Luster", category: "Químico", qty: 1, unitCost: 90.00 },
    { id: 28, product: "Lixas (Jogo)", category: "Consumível", qty: 1, unitCost: 15.00 },
    { id: 29, product: "Magil clean", category: "Químico", qty: 1, unitCost: 102.00 },
    { id: 30, product: "Limpador de vidros", category: "Quimico", qty: 1, unitCost: 34.00 },
    { id: 31, product: "Sanitizante", category: "Quimico", qty: 1, unitCost: 26.90 },
    { id: 32, product: "V-Floc", category: "Quimico", qty: 1, unitCost: 61.00 }
  ],
  services: [
    { id: 1, service: "Lavagem Convencional", time: 1.5, materialCost: 5.00, price: 70.00, recipe: [] },
    { id: 2, service: "Lavagem Técnica Detalhada", time: 5.0, materialCost: 20.00, price: 230.00, recipe: [] },
    { id: 3, service: "Higienização Bancos Tecido", time: 8.0, materialCost: 12.00, price: 320.00, recipe: [] },
    { id: 4, service: "Higienização Bancos Couro", time: 4.0, materialCost: 10.00, price: 230.00, recipe: [] },
    { id: 5, service: "Higienização Interna Comp. Tecido", time: 12.0, materialCost: 25.00, price: 450.00, recipe: [] },
    { id: 6, service: "Higienização Interna Comp. Couro", time: 8.0, materialCost: 20.00, price: 370.00, recipe: [] },
    { id: 7, service: "Vitrificação de Faróis", time: 1.5, materialCost: 80.00, price: 200.00, recipe: [] },
    { id: 8, service: "Tratamento de Vidros (Somente para-brisa)", time: 1.5, materialCost: 12.00, price: 120.00, recipe: [] },
    { id: 9, service: "Tratamento de Vidros (Todos os vidros)", time: 2.0, materialCost: 18.00, price: 160.00, recipe: [] },
    { id: 10, service: "Limpeza de Forro de Teto", time: 4.0, materialCost: 5.00, price: 150.00, recipe: [] },
    { id: 11, service: "Combo Gold - Tecido", time: 17.0, materialCost: 45.00, price: 610.00, recipe: [] },
    { id: 12, service: "Combo Gold - Couro", time: 13.0, materialCost: 40.00, price: 530.00, recipe: [] },
    { id: 13, service: "Combo Pro - Tecido", time: 13.0, materialCost: 38.00, price: 500.00, recipe: [] },
    { id: 14, service: "Combo Pro - Couro", time: 9.0, materialCost: 32.00, price: 450.00, recipe: [] },
    { id: 15, service: "Combo Standard - Plus Tecido", time: 13.5, materialCost: 30.00, price: 420.00, recipe: [] },
    { id: 16, service: "Combo Standard - Plus Couro", time: 9.5, materialCost: 25.00, price: 390.00, recipe: [] },
    { id: 17, service: "Combo Standard - Tecido", time: 9.5, materialCost: 22.00, price: 320.00, recipe: [] },
    { id: 18, service: "Combo Standard - Couro", time: 5.5, materialCost: 18.00, price: 280.00, recipe: [] }
  ],
  cashFlow: [
    { id: 1, date: "2025-11-01", service: "Lavagem Convencional", value: 60, splitCaixa: 24, splitReserva: 18, splitFixos: 12, splitProlabore: 6 },
    { id: 2, date: "2025-11-15", service: "Lavagem Convencional", value: 60, splitCaixa: 24, splitReserva: 18, splitFixos: 12, splitProlabore: 6 },
    { id: 3, date: "2025-12-05", service: "Lavagem Convencional", value: 75, splitCaixa: 30, splitReserva: 22.5, splitFixos: 15, splitProlabore: 7.5 },
    { id: 4, date: "2025-12-18", service: "Lavagem Convencional", value: 110, splitCaixa: 44, splitReserva: 33, splitFixos: 22, splitProlabore: 11 },
    { id: 5, date: "2025-12-19", service: "Lavagem Convencional", value: 70, splitCaixa: 28, splitReserva: 21, splitFixos: 14, splitProlabore: 7 },
    { id: 6, date: "2025-12-24", service: "Lavagem Convencional", value: 80, splitCaixa: 32, splitReserva: 24, splitFixos: 16, splitProlabore: 8 },
    { id: 7, date: "2025-12-24", service: "Lavagem Convencional", value: 110, splitCaixa: 44, splitReserva: 33, splitFixos: 22, splitProlabore: 11 },
    { id: 8, date: "2025-12-24", service: "Lavagem Convencional", value: 120, splitCaixa: 48, splitReserva: 36, splitFixos: 24, splitProlabore: 12 },
    { id: 9, date: "2025-12-27", service: "Lavagem Convencional", value: 100, splitCaixa: 40, splitReserva: 30, splitFixos: 20, splitProlabore: 10 }
  ],
  clients: [],
  appointments: []
};

// --- UTILITÁRIOS ---
const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};
const getToday = () => new Date().toISOString().split('T')[0];

const openWhatsApp = (phone, name, car, value) => {
  if (!phone) return alert("Cliente sem telefone cadastrado.");
  const cleanPhone = phone.replace(/\D/g, '');
  const text = `Olá ${name || ''}, seu ${car || 'veículo'} está pronto na GM Brothers! O valor ficou ${formatCurrency(value)}. Chave Pix: 31992388329`;
  window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
};

const generatePDF = (item) => {
  const printWindow = window.open('', '', 'width=600,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Orçamento GM Brothers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Helvetica', sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 100%; margin: 0 auto; box-sizing: border-box; }
          h1 { text-align: center; color: #cc0000; margin-bottom: 5px; font-size: 24px; }
          .subtitle { text-align: center; color: #666; font-size: 12px; margin-bottom: 30px; }
          .info { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
          .info p { margin: 5px 0; font-size: 14px; }
          .value-box { background: #f9f9f9; padding: 20px; text-align: center; border-radius: 8px; margin-top: 20px; }
          .label { font-size: 12px; text-transform: uppercase; color: #888; }
          .value { font-size: 32px; font-weight: bold; color: #333; margin: 5px 0; }
          .footer { text-align: center; margin-top: 50px; font-size: 10px; color: #999; }
        </style>
      </head>
      <body>
        <h1>GM BROTHERS</h1>
        <div class="subtitle">Estética Automotiva de Alto Padrão</div>
        <div class="info">
          <p><strong>Cliente:</strong> ${item.clientName || 'Consumidor Final'}</p>
          <p><strong>Veículo:</strong> ${item.carModel || '-'}</p>
          <p><strong>Serviço:</strong> ${item.serviceName || item.service}</p>
          <p><strong>Data:</strong> ${formatDate(item.date)}</p>
        </div>
        <div class="value-box">
          <div class="label">Valor Total</div>
          <div class="value">${formatCurrency(item.value)}</div>
        </div>
        <div class="footer">
          Obrigado pela preferência!<br/>
          Pagamento via PIX: 31992388329
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};

// --- COMPONENTES UI ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
          <h2 className="text-xl md:text-2xl font-bold text-white font-montserrat">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition bg-slate-800 p-2 rounded-full hover:bg-red-600/20 hover:text-red-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, type = "text", value, onChange, readOnly = false, className = "", step, options = null }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label className="text-xs uppercase tracking-wider font-bold text-slate-400">{label}</label>
    {options ? (
      <select 
        value={value} 
        onChange={onChange}
        disabled={readOnly}
        className={`bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition w-full`}
      >
        <option value="">Selecione...</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    ) : (
      <input 
        type={type} 
        value={value} 
        onChange={onChange}
        readOnly={readOnly}
        step={step}
        className={`bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition w-full ${readOnly ? 'opacity-50 cursor-not-allowed font-mono text-slate-300' : ''}`}
      />
    )}
  </div>
);

// --- APP PRINCIPAL ---
const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para menu mobile
  
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_brothers_v3_final');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          config: parsed.config || INITIAL_DATA.config,
          fixedCosts: parsed.fixedCosts || INITIAL_DATA.fixedCosts,
          inventory: parsed.inventory || INITIAL_DATA.inventory,
          services: parsed.services || INITIAL_DATA.services,
          cashFlow: parsed.cashFlow || INITIAL_DATA.cashFlow,
          clients: parsed.clients || INITIAL_DATA.clients,
          appointments: parsed.appointments || INITIAL_DATA.appointments
        };
      }
      return INITIAL_DATA;
    } catch (error) {
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem('gm_brothers_v3_final', JSON.stringify(data));
  }, [data]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); 
  const [formData, setFormData] = useState({});

  const stats = useMemo(() => {
    const safeCashFlow = data.cashFlow || [];
    const safeFixedCosts = data.fixedCosts || [];
    const safeInventory = data.inventory || [];

    const totalEntradas = safeCashFlow.reduce((acc, curr) => acc + Number(curr.value || 0), 0);
    const totalCustosFixos = safeFixedCosts.reduce((acc, curr) => acc + Number(curr.value || 0), 0);
    const totalInvestidoEstoque = safeInventory.reduce((acc, curr) => acc + (Number(curr.qty || 0) * Number(curr.unitCost || 0)), 0);
    const saldoCaixa = safeCashFlow.reduce((acc, curr) => acc + Number(curr.splitCaixa || 0), 0);
    const saldoProlabore = safeCashFlow.reduce((acc, curr) => acc + Number(curr.splitProlabore || 0), 0);
    const saldoFixos = safeCashFlow.reduce((acc, curr) => acc + Number(curr.splitFixos || 0), 0);
    
    const lowStockItems = safeInventory.filter(item => item.qty < 0.2 || (item.category === 'Químico' && item.qty < 0.1));

    return { totalEntradas, saldoCaixa, saldoProlabore, totalCustosFixos, totalInvestidoEstoque, saldoFixos, lowStockItems };
  }, [data]);

  const handleInventoryDeduction = (serviceName) => {
    const service = data.services.find(s => s.service === serviceName);
    if (service && service.recipe && service.recipe.length > 0) {
      const updatedInventory = data.inventory.map(item => {
        const recipeItem = service.recipe.find(r => r.inventoryId === item.id);
        if (recipeItem) {
          return { ...item, qty: Math.max(0, item.qty - Number(recipeItem.qty)) };
        }
        return item;
      });
      return updatedInventory;
    }
    return data.inventory;
  };

  const addToCashFlow = (appointment, finalValue) => {
    const newVal = Number(finalValue);
    const newEntry = {
      id: Date.now(),
      date: getToday(),
      service: appointment.serviceName,
      value: newVal,
      clientId: appointment.clientId, 
      clientName: appointment.clientName,
      splitCaixa: newVal * 0.40,
      splitReserva: newVal * 0.30,
      splitFixos: newVal * 0.20,
      splitProlabore: newVal * 0.10
    };
    
    const newInventory = handleInventoryDeduction(appointment.serviceName);

    setData(prev => ({
      ...prev,
      cashFlow: [...prev.cashFlow, newEntry],
      inventory: newInventory
    }));
  };

  const handleDelete = (collection, id) => {
    if (window.confirm("Excluir permanentemente?")) {
      setData(prev => ({ ...prev, [collection]: prev[collection].filter(item => item.id !== id) }));
    }
  };

  const handleReset = () => {
    if (window.confirm("ATENÇÃO: Isso apagará tudo e restaurará os dados originais. Continuar?")) {
      setData(INITIAL_DATA);
      localStorage.setItem('gm_brothers_v3_final', JSON.stringify(INITIAL_DATA));
      alert("Sistema restaurado.");
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      const defaults = {};
      if (activeTab === 'cashFlow') { defaults.date = getToday(); defaults.value = 0; }
      if (activeTab === 'inventory') { defaults.qty = 1; defaults.unitCost = 0; }
      if (activeTab === 'clients') { defaults.name = ''; defaults.phone = ''; }
      if (activeTab === 'agenda') { defaults.date = getToday(); defaults.status = 'Agendado'; }
      if (activeTab === 'services') { defaults.recipe = []; }
      setFormData(defaults);
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const collection = activeTab === 'settings' ? 'config' : (activeTab === 'agenda' ? 'appointments' : activeTab); 
    let finalData = { ...formData };

    if (activeTab === 'cashFlow') {
      const val = Number(finalData.value);
      finalData.splitCaixa = val * 0.40;
      finalData.splitReserva = val * 0.30;
      finalData.splitFixos = val * 0.20;
      finalData.splitProlabore = val * 0.10;
      
      if (finalData.clientId) {
        const client = data.clients.find(c => c.id === Number(finalData.clientId));
        if (client) finalData.clientName = client.name;
      }
      const newInventory = handleInventoryDeduction(finalData.service);
      setData(prev => ({ ...prev, inventory: newInventory }));
    }

    if (activeTab === 'agenda') {
      if (finalData.status === 'Concluído/Pago' && (!editingItem || editingItem.status !== 'Concluído/Pago')) {
         addToCashFlow(finalData, finalData.value || 0);
         alert("✅ Serviço Pago! Lançado no Fluxo e Estoque atualizado.");
      }
    }

    if (editingItem) {
      setData(prev => ({ ...prev, [collection]: prev[collection].map(item => item.id === editingItem.id ? finalData : item) }));
    } else {
      finalData.id = Date.now();
      setData(prev => ({ ...prev, [collection]: [...prev[collection], finalData] }));
    }
    setIsModalOpen(false);
  };

  // --- RENDERIZADORES RESPONSIVOS ---

  const renderClients = () => (
    renderTable(['Nome', 'WhatsApp', 'Veículo', 'Placa'], data.clients, (row) => (
      <>
        <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{row.name}</td>
        <td className="px-6 py-4 flex items-center gap-2 whitespace-nowrap">
           <span className="text-slate-300">{row.phone}</span>
           <button onClick={() => openWhatsApp(row.phone, row.name)} className="text-green-500 hover:text-green-400 p-1 bg-slate-800 rounded-full"><MessageCircle size={16}/></button>
        </td>
        <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{row.carModel}</td>
        <td className="px-6 py-4 font-mono text-slate-500 uppercase whitespace-nowrap">{row.plate}</td>
      </>
    ))
  );

  const renderAgenda = () => (
    renderTable(['Data/Hora', 'Cliente', 'Serviço', 'Status', 'Valor'], 
      [...data.appointments].sort((a,b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time)), 
      (row) => (
      <>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="font-bold text-white">{formatDate(row.date)}</div>
          <div className="text-xs text-slate-500">{row.time}</div>
        </td>
        <td className="px-6 py-4 font-medium text-slate-200 whitespace-nowrap">{row.clientName}</td>
        <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{row.serviceName}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
            row.status === 'Concluído/Pago' ? 'bg-green-500/10 text-green-500' :
            row.status === 'Agendado' ? 'bg-blue-500/10 text-blue-500' : 
            'bg-yellow-500/10 text-yellow-500'
          }`}>
            {row.status}
          </span>
        </td>
        <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{formatCurrency(row.value)}</td>
      </>
    ))
  );

  const renderReports = () => {
    const cashFlow = data.cashFlow || [];
    const revenueByMonth = cashFlow.reduce((acc, curr) => {
      const month = curr.date.substring(0, 7); 
      acc[month] = (acc[month] || 0) + Number(curr.value);
      return acc;
    }, {});
    const servicesCount = cashFlow.reduce((acc, curr) => {
      acc[curr.service] = (acc[curr.service] || 0) + 1;
      return acc;
    }, {});
    const sortedServices = Object.entries(servicesCount).sort((a,b) => b[1] - a[1]).slice(0, 5);
    const totalRevenue = Object.values(revenueByMonth).reduce((a,b) => a+b, 0);
    const ticketAverage = cashFlow.length ? totalRevenue / cashFlow.length : 0;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><BarChart3 size={20}/> Faturamento Mensal</h3>
              <div className="space-y-3">
                 {Object.entries(revenueByMonth).map(([month, val]) => (
                   <div key={month}>
                     <div className="flex justify-between text-xs text-slate-400 mb-1"><span>{month}</span><span>{formatCurrency(val)}</span></div>
                     <div className="w-full bg-slate-800 rounded-full h-2.5">
                       <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${Math.min(100, (val/5000)*100)}%` }}></div>
                     </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><TrendingUp size={20}/> Top Serviços</h3>
              <ul className="space-y-3">
                {sortedServices.map(([svc, count], idx) => (
                  <li key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">{idx+1}. {svc}</span>
                    <span className="font-bold text-white bg-slate-800 px-2 py-1 rounded">{count}x</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-slate-800">
                <p className="text-sm text-slate-400">Ticket Médio por Cliente</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(ticketAverage)}</p>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {stats.lowStockItems.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3 animate-pulse">
           <AlertTriangle className="text-red-500 flex-shrink-0" />
           <div>
             <h4 className="font-bold text-red-500 text-sm md:text-base">Alerta de Estoque Baixo</h4>
             <ul className="text-xs md:text-sm text-red-300 mt-1 list-disc list-inside">
               {stats.lowStockItems.map(i => <li key={i.id}>{i.product} (Resta: {i.qty})</li>)}
             </ul>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Entradas Totais", value: stats.totalEntradas, color: "text-white", icon: <TrendingUp className="text-green-500" /> },
          { label: "Caixa (40%)", value: stats.saldoCaixa, color: "text-blue-400", icon: <Wallet className="text-blue-500" /> },
          { label: "Estoque Investido", value: stats.totalInvestidoEstoque, color: "text-slate-200", icon: <Package className="text-slate-500" /> },
          { label: "Pró-Labore (10%)", value: stats.saldoProlabore, color: "text-red-500", icon: <DollarSign className="text-red-600" /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg relative group overflow-hidden">
            <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
              {stat.icon}
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{formatCurrency(stat.value)}</h3>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
             <DollarSign size={20} className="text-red-500"/> Cobertura de Custos Fixos
          </h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg border-l-4 border-blue-500">
              <span className="text-slate-300 text-sm">Acumulado para Pagar Contas</span>
              <span className="font-bold text-white text-base md:text-lg">{formatCurrency(stats.saldoFixos)}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-800 rounded-lg border-l-4 border-red-500">
              <span className="text-slate-300 text-sm">Total de Contas do Mês</span>
              <span className="font-bold text-red-400 text-base md:text-lg">{formatCurrency(stats.totalCustosFixos)}</span>
            </div>
            <div className={`flex justify-between items-center p-4 rounded-lg border ${stats.saldoFixos >= stats.totalCustosFixos ? 'bg-green-900/20 border-green-900' : 'bg-red-900/20 border-red-900'}`}>
              <span className="text-slate-300 font-bold uppercase text-xs">Status</span>
              <span className={`font-bold text-sm md:text-base ${stats.saldoFixos >= stats.totalCustosFixos ? 'text-green-400' : 'text-red-400'}`}>
                {stats.saldoFixos >= stats.totalCustosFixos ? 'CONTAS PAGAS ✅' : `FALTAM ${formatCurrency(stats.totalCustosFixos - stats.saldoFixos)} ⚠️`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTable = (headers, rows, renderRow, footerContent = null) => (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl flex flex-col h-[calc(100vh-140px)]">
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center sticky top-0 z-20">
        <h3 className="font-bold text-white text-lg capitalize font-montserrat flex items-center gap-2">
           {activeTab === 'cashFlow' ? 'Lançamentos' : activeTab === 'inventory' ? 'Estoque' : 
            activeTab === 'services' ? 'Serviços' : activeTab === 'fixedCosts' ? 'Custos Fixos' : 
            activeTab === 'clients' ? 'Clientes' : activeTab === 'agenda' ? 'Agenda / OS' :
            activeTab === 'reports' ? 'Relatórios' : 'Configurações'}
        </h3>
        {activeTab === 'settings' ? (
           <button onClick={handleReset} className="bg-slate-800 hover:bg-red-900/50 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition border border-slate-700">
             <RefreshCw size={16} /> <span className="hidden md:inline">Restaurar</span>
           </button>
        ) : activeTab !== 'reports' && (
           <button onClick={() => openModal()} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-lg shadow-red-600/20">
             <Plus size={16} /> <span className="hidden md:inline">Adicionar</span>
           </button>
        )}
      </div>
      <div className="overflow-auto flex-1 custom-scrollbar">
        {rows && (
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950 text-xs uppercase font-bold text-slate-300 sticky top-0 z-10 shadow-sm">
              <tr>
                {headers.map((h, i) => <th key={i} className="px-6 py-4 whitespace-nowrap">{h}</th>)}
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/50 transition group">
                  {renderRow(row)}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      {activeTab === 'agenda' && (
                        <>
                          <button onClick={() => {
                             const client = data.clients.find(c => c.id === Number(row.clientId));
                             if(client) openWhatsApp(client.phone, client.name, client.carModel, row.value);
                             else alert("Cliente não vinculado ou sem telefone.");
                          }} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg" title="Enviar WhatsApp">
                             <MessageCircle size={16} />
                          </button>
                          <button onClick={() => generatePDF(row)} className="p-2 text-slate-300 hover:bg-slate-700 rounded-lg" title="Imprimir Orçamento">
                             <Printer size={16} />
                          </button>
                        </>
                      )}
                      <button onClick={() => openModal(row)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(activeTab === 'settings' ? 'config' : (activeTab === 'agenda' ? 'appointments' : activeTab), row.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={headers.length + 1} className="p-8 text-center text-slate-600 italic">Nada por aqui ainda...</td></tr>}
            </tbody>
            {footerContent && (
               <tfoot className="bg-slate-950 sticky bottom-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] z-10 border-t border-slate-800">
                 {footerContent}
               </tfoot>
            )}
          </table>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans overflow-hidden select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>

      {/* MOBILE HEADER */}
      <div className="md:hidden bg-slate-900 p-4 flex justify-between items-center border-b border-slate-800 z-50">
         <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-bold text-white">GM</div>
           <span className="font-bold font-montserrat">BROTHERS</span>
         </div>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
           {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
         </button>
      </div>

      {/* OVERLAY MOBILE */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* SIDEBAR RESPONSIVA */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3 hidden md:flex">
           <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-red-900/50">GM</div>
           <div>
             <span className="text-lg font-bold tracking-wider text-white font-montserrat block leading-none">BROTHERS</span>
             <span className="text-[10px] text-slate-500 uppercase tracking-widest">Manager v3.0</span>
           </div>
        </div>
        <div className="md:hidden p-4 text-center border-b border-slate-800 text-slate-500 text-xs uppercase tracking-widest">Menu Principal</div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {[
            { id: 'dashboard', label: 'Visão Geral', icon: <LayoutDashboard size={20} /> },
            { id: 'agenda', label: 'Agenda / OS', icon: <Calendar size={20} /> },
            { id: 'cashFlow', label: 'Fluxo de Caixa', icon: <Wallet size={20} /> },
            { id: 'clients', label: 'Clientes (CRM)', icon: <Users size={20} /> },
            { id: 'services', label: 'Serviços & Ficha', icon: <Wrench size={20} /> },
            { id: 'inventory', label: 'Estoque', icon: <Package size={20} /> },
            { id: 'reports', label: 'Relatórios', icon: <BarChart3 size={20} /> },
            { id: 'fixedCosts', label: 'Custos Fixos', icon: <DollarSign size={20} /> },
            { id: 'settings', label: 'Configurações', icon: <Settings size={20} /> },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === item.id ? 'bg-red-600 text-white shadow-lg shadow-red-600/20 translate-x-1' : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'}`}
            >
              {item.icon} {item.label}
              {activeTab === item.id && <ArrowRight size={14} className="ml-auto opacity-50"/>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
             <span>Hoje:</span>
             <span className="text-slate-300 font-bold">{formatDate(getToday())}</span>
           </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-4 md:p-6 overflow-hidden relative w-full">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'agenda' && renderAgenda()}
        {activeTab === 'reports' && renderReports()}

        {activeTab === 'cashFlow' && renderTable(
          ['Data', 'Cliente', 'Serviço', 'Entrada', 'Caixa (40%)', 'Reserva (30%)', 'Fixos (20%)', 'Pró-Labore (10%)'],
          [...(data.cashFlow || [])].sort((a,b) => new Date(b.date) - new Date(a.date)),
          (row) => (
            <>
              <td className="px-6 py-4 font-mono text-slate-400 whitespace-nowrap">{formatDate(row.date)}</td>
              <td className="px-6 py-4 font-medium text-slate-300 whitespace-nowrap">{row.clientName || '-'}</td>
              <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{row.service}</td>
              <td className="px-6 py-4 text-green-400 font-bold bg-green-400/5 rounded-lg whitespace-nowrap">{formatCurrency(row.value)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(row.splitCaixa)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(row.splitReserva)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(row.splitFixos)}</td>
              <td className="px-6 py-4 text-red-300 whitespace-nowrap">{formatCurrency(row.splitProlabore)}</td>
            </>
          )
        )}

        {activeTab === 'services' && renderTable(
          ['Serviço', 'Tempo', 'Custo Mat.', 'Preço', 'Lucro'],
          data.services || [],
          (row) => {
             const valorHora = (data.config || []).find(c => c.param.includes("Hora"))?.value || 25;
             const custoTotal = (row.time * valorHora) + Number(row.materialCost);
             const lucro = row.price - custoTotal;
             return (
              <>
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {row.service}
                  {row.recipe && row.recipe.length > 0 && <span className="ml-2 text-[10px] bg-slate-700 px-1 rounded text-slate-300 border border-slate-600">COM FICHA</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{row.time} h</td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatCurrency(row.materialCost)}</td>
                <td className="px-6 py-4 font-bold text-white bg-slate-800 rounded-lg whitespace-nowrap">{formatCurrency(row.price)}</td>
                <td className={`px-6 py-4 font-bold whitespace-nowrap ${lucro > 0 ? 'text-green-500' : 'text-red-500'}`}>{formatCurrency(lucro)}</td>
              </>
            )
          }
        )}

        {activeTab === 'inventory' && renderTable(
          ['Produto', 'Categoria', 'Qtd', 'Unitário', 'Total'],
          data.inventory || [],
          (row) => (
            <>
              <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{row.product}</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 bg-slate-800 rounded text-[10px] uppercase font-bold text-slate-400 tracking-wider border border-slate-700">{row.category}</span></td>
              <td className={`px-6 py-4 font-bold whitespace-nowrap ${row.qty < 0.2 ? 'text-red-500' : 'text-slate-200'}`}>{row.qty}</td>
              <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{formatCurrency(row.unitCost)}</td>
              <td className="px-6 py-4 font-bold text-slate-200 whitespace-nowrap">{formatCurrency(row.qty * row.unitCost)}</td>
            </>
          ),
          <tr>
             <td colSpan="4" className="px-6 py-4 text-right font-bold text-slate-400 uppercase tracking-wider text-xs">Total Investido</td>
             <td className="px-6 py-4 font-bold text-emerald-400 text-lg whitespace-nowrap">{formatCurrency(stats.totalInvestidoEstoque)}</td>
             <td className="px-6 py-4"></td>
          </tr>
        )}

        {activeTab === 'fixedCosts' && renderTable(
          ['Descrição', 'Valor Mensal'],
          data.fixedCosts || [],
          (row) => (
            <>
              <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{row.desc}</td>
              <td className="px-6 py-4 text-red-400 font-bold whitespace-nowrap">{formatCurrency(row.value)}</td>
            </>
          )
        )}

        {activeTab === 'settings' && renderTable(
          ['Parâmetro', 'Valor Atual'],
          data.config || [],
          (row) => (
            <>
              <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{row.param}</td>
              <td className="px-6 py-4 font-bold text-blue-400 whitespace-nowrap">{row.value}</td>
            </>
          )
        )}
      </main>

      {/* Modal Genérico */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "Editar Registro" : "Novo Registro"}>
        <div className="space-y-6">
          {activeTab === 'clients' && (
            <div className="grid gap-4">
              <InputGroup label="Nome do Cliente" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <InputGroup label="WhatsApp (com DDD)" value={formData.phone || ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <InputGroup label="Modelo Carro" value={formData.carModel || ''} onChange={(e) => setFormData({...formData, carModel: e.target.value})} />
                 <InputGroup label="Placa" value={formData.plate || ''} onChange={(e) => setFormData({...formData, plate: e.target.value})} />
              </div>
            </div>
          )}

          {activeTab === 'agenda' && (
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <InputGroup label="Data" type="date" value={formData.date || getToday()} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                 <InputGroup label="Hora" type="time" value={formData.time || ''} onChange={(e) => setFormData({...formData, time: e.target.value})} />
              </div>
              <InputGroup label="Cliente" options={data.clients.map(c => ({ value: c.id, label: c.name }))} value={formData.clientId || ''} onChange={(e) => {
                const c = data.clients.find(cli => cli.id === Number(e.target.value));
                setFormData({...formData, clientId: e.target.value, clientName: c?.name});
              }} />
              <InputGroup label="Serviço" options={data.services.map(s => ({ value: s.service, label: s.service }))} value={formData.serviceName || ''} onChange={(e) => {
                 const s = data.services.find(svc => svc.service === e.target.value);
                 setFormData({...formData, serviceName: e.target.value, value: s?.price});
              }} />
              <InputGroup label="Status" options={[{value:'Agendado',label:'Agendado'},{value:'Em Andamento',label:'Em Andamento'},{value:'Pronto',label:'Pronto'},{value:'Concluído/Pago',label:'Concluído/Pago'}]} value={formData.status || ''} onChange={(e) => setFormData({...formData, status: e.target.value})} />
              <InputGroup label="Valor (R$)" type="number" step="0.01" value={formData.value || ''} onChange={(e) => setFormData({...formData, value: e.target.value})} />
            </div>
          )}

          {activeTab === 'cashFlow' && (
            <div className="grid gap-4">
              <InputGroup label="Data" type="date" value={formData.date || getToday()} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              <InputGroup label="Cliente (Opcional)" options={data.clients.map(c => ({ value: c.id, label: c.name }))} value={formData.clientId || ''} onChange={(e) => setFormData({...formData, clientId: e.target.value})} />
              <InputGroup label="Serviço / Descrição" value={formData.service || ''} onChange={(e) => setFormData({...formData, service: e.target.value})} />
              <InputGroup label="Valor Entrada (R$)" type="number" step="0.01" value={formData.value || ''} onChange={(e) => setFormData({...formData, value: e.target.value})} />
            </div>
          )}

          {activeTab === 'services' && (
            <div className="grid gap-4">
              <InputGroup label="Nome do Serviço" value={formData.service || ''} onChange={(e) => setFormData({...formData, service: e.target.value})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Tempo (h)" type="number" step="0.5" value={formData.time || ''} onChange={(e) => setFormData({...formData, time: e.target.value})} />
                <InputGroup label="Preço Cobrado (R$)" type="number" step="0.01" value={formData.price || ''} onChange={(e) => setFormData({...formData, price: e.target.value})} />
              </div>
              
              {/* FICHA TÉCNICA RESPONSIVA */}
              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2"><Package size={14}/> Ficha Técnica</h4>
                <div className="flex gap-2 mb-2">
                   <select id="invSelect" className="bg-slate-900 text-white p-2 rounded w-full border border-slate-700 text-xs">
                     {data.inventory.map(i => <option key={i.id} value={i.id}>{i.product}</option>)}
                   </select>
                   <input id="invQty" type="number" step="0.1" placeholder="Qtd" className="bg-slate-900 text-white p-2 rounded w-20 border border-slate-700 text-xs"/>
                   <button onClick={() => {
                      const invId = Number(document.getElementById('invSelect').value);
                      const qty = Number(document.getElementById('invQty').value);
                      const currentRecipe = formData.recipe || [];
                      const existing = currentRecipe.find(r => r.inventoryId === invId);
                      let newRecipe;
                      if(existing) {
                        newRecipe = currentRecipe.map(r => r.inventoryId === invId ? {...r, qty: r.qty + qty} : r);
                      } else {
                        newRecipe = [...currentRecipe, { inventoryId: invId, qty }];
                      }
                      setFormData({...formData, recipe: newRecipe});
                   }} className="bg-green-600 text-white p-2 rounded"><Plus size={16}/></button>
                </div>
                <ul className="text-xs text-slate-400 space-y-1">
                  {(formData.recipe || []).map((r, i) => {
                     const item = data.inventory.find(inv => inv.id === r.inventoryId);
                     return <li key={i} className="flex justify-between border-b border-slate-700 pb-1"><span>{item?.product}</span> <span>{r.qty} un</span></li>
                  })}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="grid gap-4">
              <InputGroup label="Produto" value={formData.product || ''} onChange={(e) => setFormData({...formData, product: e.target.value})} />
              <InputGroup label="Categoria" value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Quantidade" type="number" value={formData.qty || ''} onChange={(e) => setFormData({...formData, qty: e.target.value})} />
                <InputGroup label="Custo Unitário (R$)" type="number" step="0.01" value={formData.unitCost || ''} onChange={(e) => setFormData({...formData, unitCost: e.target.value})} />
              </div>
            </div>
          )}

          {activeTab === 'fixedCosts' && (
            <div className="grid gap-4">
              <InputGroup label="Descrição" value={formData.desc || ''} onChange={(e) => setFormData({...formData, desc: e.target.value})} />
              <InputGroup label="Valor Mensal (R$)" type="number" step="0.01" value={formData.value || ''} onChange={(e) => setFormData({...formData, value: e.target.value})} />
            </div>
          )}

          {activeTab === 'settings' && (
             <div className="grid gap-4">
               <InputGroup label="Parâmetro" value={formData.param || ''} readOnly />
               <InputGroup label="Valor" value={formData.value || ''} onChange={(e) => setFormData({...formData, value: e.target.value})} />
             </div>
          )}

          <button onClick={handleSave} className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-red-600/20">
            <Save size={18} /> Salvar Alterações
          </button>
        </div>
      </Modal>

    </div>
  );
};

export default App;