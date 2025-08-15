import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { usePortfolioSync } from '@/hooks/usePortfolioSync';

// 主应用组件
export default function PortfolioManager() {
    // 云端同步
    const { isLoading, isSaving, lastSync, loadData, saveData } = usePortfolioSync();
    
    // 模拟数据状态
    const [currentDate, setCurrentDate] = useState(new Date());
    const [exchangeRates, setExchangeRates] = useState(() => {
        const saved = localStorage.getItem('exchangeRates');
        return saved ? JSON.parse(saved) : { HKDCNY: 0.9413, USDCNY: 7.2545 };
    });
    
    useEffect(() => {
        localStorage.setItem('exchangeRates', JSON.stringify(exchangeRates));
    }, [exchangeRates]);

    // 现金和汇率编辑状态
    const [showEditCash, setShowEditCash] = useState(false);
    const [showEditRates, setShowEditRates] = useState(false);
    const [editCash, setEditCash] = useState({
        cny: '3268.08',
        hkd: '18454.14',
        usd: '367.49'
    });
    const [editRates, setEditRates] = useState({
        HKDCNY: '0.9413',
        USDCNY: '7.2545'
    });

    // A股资金流数据
    const [aShareFlows, setAShareFlows] = useState(() => {
        const saved = localStorage.getItem('aShareFlows');
        return saved ? JSON.parse(saved) : [
            { date: '2024-10-08', type: '转入', amount: 8000, note: '开户' },
            { date: '2024-10-09', type: '转出', amount: 8000, note: '' },
            { date: '2024-10-09', type: '转出', amount: 67.24, note: '' },
            { date: '2024-10-11', type: '转入', amount: 7000, note: '' },
            { date: '2024-10-15', type: '转入', amount: 3000, note: '' },
            { date: '2024-10-18', type: '转入', amount: 3000, note: '' },
            { date: '2024-10-24', type: '转入', amount: 6000, note: '' },
            { date: '2025-01-09', type: '转出', amount: 5000, note: '' }
        ];
    });
    
    useEffect(() => {
        localStorage.setItem('aShareFlows', JSON.stringify(aShareFlows));
    }, [aShareFlows]);

    // 海外资金流数据
    const [overseaFlows, setOverseaFlows] = useState(() => {
        const saved = localStorage.getItem('overseaFlows');
        return saved ? JSON.parse(saved) : [
            { date: '2024-08-20', type: '转入', amountHKD: 5438.92, amountCNY: 5000, rate: 0.9193 },
            { date: '2024-08-21', type: '转入', amountHKD: 4561.08, amountCNY: 4184.79, rate: 0.9175 },
            { date: '2024-09-23', type: '转入', amountHKD: 11029.76, amountCNY: 10008.4, rate: 0.9074 },
            { date: '2025-01-14', type: '转入', amountHKD: 3100, amountCNY: 2926.09, rate: 0.9439 }
        ];
    });
    
    useEffect(() => {
        localStorage.setItem('overseaFlows', JSON.stringify(overseaFlows));
    }, [overseaFlows]);

    // 新增记录状态
    const [showAddAShare, setShowAddAShare] = useState(false);
    const [showAddOversea, setShowAddOversea] = useState(false);
    const [newAShareRecord, setNewAShareRecord] = useState({
        date: new Date().toISOString().split('T')[0],
        type: '转入',
        amount: '',
        note: ''
    });
    const [newOverseaRecord, setNewOverseaRecord] = useState({
        date: new Date().toISOString().split('T')[0],
        type: '转入',
        amountHKD: '',
        amountCNY: '',
        rate: 0.9413
    });

    // 持仓数据
    const [holdings, setHoldings] = useState(() => {
        const saved = localStorage.getItem('holdings');
        return saved ? JSON.parse(saved) : {
            aShare: [
                { id: 1, name: '创业板50ETF', code: '159949.SZ', currentPrice: 0.906, costPrice: 0.957, quantity: 11500, fees: 1.56 },
                { id: 2, name: '恒生科技ETF', code: '159740.SZ', currentPrice: 0.709, costPrice: 0.418, quantity: 600, fees: 0 },
                { id: 3, name: '工商银行', code: '601398.SH', currentPrice: 6.63, costPrice: 5.871, quantity: 0, fees: 0 },
                { id: 4, name: '赣锋锂业', code: '002460.SZ', currentPrice: 31.19, costPrice: 35.099, quantity: 0, fees: 0 }
            ],
            hShare: [
                { id: 5, name: '小鹏汽车-W', code: '9868.HK', currentPrice: 68, costPrice: 63.1, quantity: 0, fees: 0 },
                { id: 6, name: '小米集团-W', code: '1810.HK', currentPrice: 47.55, costPrice: 44.2, quantity: 0, fees: 0 },
                { id: 7, name: '哔哩哔哩-W', code: '9626.HK', currentPrice: 170, costPrice: 162, quantity: 0, fees: 24.27 },
                { id: 8, name: '京东集团-SW', code: '9618.HK', currentPrice: 135.4, costPrice: 157.9, quantity: 0, fees: 0 },
                { id: 9, name: '美团-W', code: '3690.HK', currentPrice: 140, costPrice: 167.1991, quantity: 0, fees: 0 }
            ],
            usShare: [
                { id: 10, name: '达达集团', code: 'DADA', currentPrice: 2.035, costPrice: 1.85, quantity: 20, fees: 2.05 },
                { id: 11, name: '英伟达', code: 'NVDA', currentPrice: 133.635, costPrice: 115.92, quantity: 0, fees: 0 },
                { id: 12, name: '阿里巴巴', code: 'BABA', currentPrice: 131, costPrice: 125, quantity: 0, fees: 0 },
                { id: 13, name: 'FUBOTV', code: 'FUBO', currentPrice: 2.885, costPrice: 4.89, quantity: 0, fees: 0 },
                { id: 14, name: '蓝帽子', code: 'BHAT', currentPrice: 0.07, costPrice: 0.173, quantity: 0, fees: 0 }
            ]
        };
    });
    
    useEffect(() => {
        localStorage.setItem('holdings', JSON.stringify(holdings));
    }, [holdings]);

    const [cash, setCash] = useState(() => {
        const saved = localStorage.getItem('cash');
        return saved ? JSON.parse(saved) : {
            cny: 3268.08,
            hkd: 18454.14,
            usd: 367.49
        };
    });
    
    useEffect(() => {
        localStorage.setItem('cash', JSON.stringify(cash));
    }, [cash]);

    const [activeTab, setActiveTab] = useState('overview');

    // 持仓管理状态
    const [showAddHolding, setShowAddHolding] = useState(false);
    const [editingHolding, setEditingHolding] = useState(null);
    const [newHolding, setNewHolding] = useState({
        market: 'aShare',
        name: '',
        code: '',
        currentPrice: '',
        costPrice: '',
        quantity: '',
        fees: ''
    });

    // 现金和汇率编辑函数
    const handleCancelCashEdit = () => {
        setEditCash({
            cny: cash.cny.toString(),
            hkd: cash.hkd.toString(),
            usd: cash.usd.toString()
        });
        setShowEditCash(false);
    };

    const handleCancelRatesEdit = () => {
        setEditRates({
            HKDCNY: exchangeRates.HKDCNY.toString(),
            USDCNY: exchangeRates.USDCNY.toString()
        });
        setShowEditRates(false);
    };

    // 计算函数
    const calculateNetFlow = (flows) => {
        return flows.reduce((acc, flow) => {
            const amount = flow.amountCNY || flow.amount;
            return acc + (flow.type === '转入' ? amount : -amount);
        }, 0);
    };

    const calculatePnL = (holding) => {
        return (holding.currentPrice - holding.costPrice) * holding.quantity - holding.fees;
    };

    const calculateMarketValue = (holdings, cash, rate = 1) => {
        const holdingsValue = holdings.reduce((acc, holding) => {
            return acc + holding.currentPrice * holding.quantity;
        }, 0);
        return (cash + holdingsValue) * rate;
    };

    // 汇总计算
    const aShareNetFlow = calculateNetFlow(aShareFlows);
    const overseaNetFlow = calculateNetFlow(overseaFlows);
    
    const aSharePnL = holdings.aShare.reduce((acc, holding) => acc + calculatePnL(holding), 0);
    const hSharePnL = holdings.hShare.reduce((acc, holding) => acc + calculatePnL(holding), 0) * exchangeRates.HKDCNY;
    const usSharePnL = holdings.usShare.reduce((acc, holding) => acc + calculatePnL(holding), 0) * exchangeRates.USDCNY;
    
    const aShareMarketValue = calculateMarketValue(holdings.aShare, cash.cny);
    const hShareMarketValue = calculateMarketValue(holdings.hShare, cash.hkd, exchangeRates.HKDCNY);
    const usShareMarketValue = calculateMarketValue(holdings.usShare, cash.usd, exchangeRates.USDCNY);
    
    const totalPnL = aSharePnL + hSharePnL + usSharePnL;
    const totalMarketValue = aShareMarketValue + hShareMarketValue + usShareMarketValue;
    const totalNetFlow = aShareNetFlow + overseaNetFlow;
    const simpleReturn = totalPnL / totalNetFlow;

    // 新增记录处理函数
    const handleAddAShareRecord = async () => {
        if (newAShareRecord.amount && newAShareRecord.date) {
            const record = {
                ...newAShareRecord,
                amount: parseFloat(newAShareRecord.amount)
            };
            setAShareFlows([...aShareFlows, record]);
            setNewAShareRecord({
                date: new Date().toISOString().split('T')[0],
                type: '转入',
                amount: '',
                note: ''
            });
            setShowAddAShare(false);
            toast.success('A股资金记录添加成功');
            // 自动同步到云端
            await saveData();
        } else {
            toast.error('请填写必要字段');
        }
    };

    const handleAddOverseaRecord = async () => {
        if (newOverseaRecord.amountHKD && newOverseaRecord.amountCNY && newOverseaRecord.date) {
            const record = {
                ...newOverseaRecord,
                amountHKD: parseFloat(newOverseaRecord.amountHKD),
                amountCNY: parseFloat(newOverseaRecord.amountCNY),
                rate: parseFloat(newOverseaRecord.rate)
            };
            setOverseaFlows([...overseaFlows, record]);
            setNewOverseaRecord({
                date: new Date().toISOString().split('T')[0],
                type: '转入',
                amountHKD: '',
                amountCNY: '',
                rate: 0.9413
            });
            setShowAddOversea(false);
            toast.success('海外资金记录添加成功');
            // 自动同步到云端
            await saveData();
        } else {
            toast.error('请填写必要字段');
        }
    };

    const handleDeleteRecord = async (index, type) => {
        if (type === 'aShare') {
            const newFlows = aShareFlows.filter((_, i) => i !== index);
            setAShareFlows(newFlows);
        } else if (type === 'oversea') {
            const newFlows = overseaFlows.filter((_, i) => i !== index);
            setOverseaFlows(newFlows);
        }
        toast.success('记录已删除');
        // 自动同步到云端
        await saveData();
    };

    // 持仓管理函数
    const handleAddHolding = async () => {
        if (newHolding.name && newHolding.code && newHolding.currentPrice && newHolding.costPrice && newHolding.quantity) {
            const holding = {
                id: Date.now(),
                ...newHolding,
                currentPrice: parseFloat(newHolding.currentPrice),
                costPrice: parseFloat(newHolding.costPrice),
                quantity: parseInt(newHolding.quantity),
                fees: parseFloat(newHolding.fees) || 0
            };
            
            setHoldings({
                ...holdings,
                [newHolding.market]: [...holdings[newHolding.market], holding]
            });
            
            setNewHolding({
                market: 'aShare',
                name: '',
                code: '',
                currentPrice: '',
                costPrice: '',
                quantity: '',
                fees: ''
            });
            setShowAddHolding(false);
            toast.success('持仓添加成功');
            // 自动同步到云端
            await saveData();
        } else {
            toast.error('请填写必要字段');
        }
    };

    const handleEditHolding = (market, index) => {
        const holding = holdings[market][index];
        setEditingHolding({ market, index, ...holding });
        setNewHolding({
            market,
            name: holding.name,
            code: holding.code,
            currentPrice: holding.currentPrice.toString(),
            costPrice: holding.costPrice.toString(),
            quantity: holding.quantity.toString(),
            fees: holding.fees.toString()
        });
        setShowAddHolding(true);
    };

    const handleUpdateHolding = async () => {
        if (editingHolding && newHolding.name && newHolding.code && newHolding.currentPrice && newHolding.costPrice && newHolding.quantity) {
            const updatedHolding = {
                ...editingHolding,
                name: newHolding.name,
                code: newHolding.code,
                currentPrice: parseFloat(newHolding.currentPrice),
                costPrice: parseFloat(newHolding.costPrice),
                quantity: parseInt(newHolding.quantity),
                fees: parseFloat(newHolding.fees) || 0
            };
            
            const newHoldings = { ...holdings };
            newHoldings[editingHolding.market][editingHolding.index] = updatedHolding;
            setHoldings(newHoldings);
            
            setNewHolding({
                market: 'aShare',
                name: '',
                code: '',
                currentPrice: '',
                costPrice: '',
                quantity: '',
                fees: ''
            });
            setEditingHolding(null);
            setShowAddHolding(false);
            toast.success('持仓更新成功');
            // 自动同步到云端
            await saveData();
        } else {
            toast.error('请填写必要字段');
        }
    };

    const handleDeleteHolding = async (market, index) => {
        const newHoldings = { ...holdings };
        newHoldings[market] = newHoldings[market].filter((_, i) => i !== index);
        setHoldings(newHoldings);
        toast.success('持仓已删除');
        // 自动同步到云端
        await saveData();
    };

    const handleCancelEdit = () => {
        setNewHolding({
            market: 'aShare',
            name: '',
            code: '',
            currentPrice: '',
            costPrice: '',
            quantity: '',
            fees: ''
        });
        setEditingHolding(null);
        setShowAddHolding(false);
    };

    // 现金和汇率编辑函数
    const handleSaveCash = async () => {
        setCash({
            cny: parseFloat(editCash.cny) || 0,
            hkd: parseFloat(editCash.hkd) || 0,
            usd: parseFloat(editCash.usd) || 0
        });
        setShowEditCash(false);
        toast.success('现金余额更新成功');
        // 自动同步到云端
        await saveData();
    };

    const handleSaveRates = async () => {
        setExchangeRates({
            HKDCNY: parseFloat(editRates.HKDCNY) || 0.9413,
            USDCNY: parseFloat(editRates.USDCNY) || 7.2545
        });
        setShowEditRates(false);
        toast.success('汇率更新成功');
        // 自动同步到云端
        await saveData();
    };

    // 移动端菜单交互
    useEffect(() => {
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuButton && mobileMenu) {
            const handleMenuToggle = () => {
                mobileMenu.classList.toggle('active');
                
                // 切换图标
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    if (mobileMenu.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            };
            
            mobileMenuButton.addEventListener('click', handleMenuToggle);
            
            // 清理函数
            return () => {
                mobileMenuButton.removeEventListener('click', handleMenuToggle);
            };
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* 导航栏 */}
            <nav className="bg-white shadow-sm py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <i className="fas fa-chart-line text-blue-500 text-xl mr-2"></i>
                        <h1 className="text-xl font-semibold text-slate-800">投资组合管理</h1>
                    </div>
                    
                    {/* 同步状态 */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                            <span className="text-sm text-slate-600">
                                {isLoading ? '同步中...' : '已连接'}
                            </span>
                        </div>
                        {lastSync && (
                            <span className="text-xs text-slate-500">
                                最后同步: {lastSync.toLocaleTimeString()}
                            </span>
                        )}
                        <button
                            onClick={saveData}
                            disabled={isSaving}
                            className="btn-primary px-3 py-1 text-sm flex items-center space-x-1"
                        >
                            <i className={`fas ${isSaving ? 'fa-spinner fa-spin' : 'fa-cloud-upload-alt'}`}></i>
                            <span>{isSaving ? '保存中...' : '保存到云端'}</span>
                        </button>
                    </div>
                    
                    <div className="hidden md:flex space-x-6">
                        {[
                            { id: 'overview', name: '概览' },
                            { id: 'aShare', name: 'A股资金' },
                            { id: 'oversea', name: '海外资金' },
                            { id: 'holdings', name: '持仓管理' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`nav-link px-1 py-4 text-sm font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                    
                    <button id="mobileMenuButton" className="md:hidden text-slate-500 focus:outline-none">
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>
                
                {/* 移动端菜单 */}
                <div id="mobileMenu" className="mobile-menu md:hidden mt-2 bg-white rounded-lg shadow-md overflow-hidden">
                    {[
                        { id: 'overview', name: '概览' },
                        { id: 'aShare', name: 'A股资金' },
                        { id: 'oversea', name: '海外资金' },
                        { id: 'holdings', name: '持仓管理' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`block py-3 px-4 text-sm font-medium transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </nav>
            
            {/* 主要内容 */}
            <main className="flex-1 py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* 概览页面 */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* 概览卡片 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className="card p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-slate-500">总市值</p>
                                            <p className="text-2xl font-semibold text-slate-800 mt-1">¥{totalMarketValue.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</p>
                                        </div>
                                        <div className="bg-blue-100 p-3 rounded-full">
                                            <i className="fas fa-wallet text-blue-500"></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-slate-500">累计净转入</p>
                                            <p className="text-2xl font-semibold text-slate-800 mt-1">¥{totalNetFlow.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</p>
                                        </div>
                                        <div className="bg-green-100 p-3 rounded-full">
                                            <i className="fas fa-exchange-alt text-green-500"></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-slate-500">总盈亏</p>
                                            <p className={`text-2xl font-semibold mt-1 ${totalPnL >= 0 ? 'profit' : 'loss'}`}>
                                                {totalPnL >= 0 ? '+' : ''}¥{totalPnL.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</p>
                                        </div>
                                        <div className="bg-purple-100 p-3 rounded-full">
                                            <i className="fas fa-chart-bar text-purple-500"></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-slate-500">简单收益率</p>
                                            <p className={`text-2xl font-semibold mt-1 ${simpleReturn >= 0 ? 'profit' : 'loss'}`}>
                                                {simpleReturn >= 0 ? '+' : ''}{(simpleReturn * 100).toFixed(2)}%</p>
                                        </div>
                                        <div className="bg-amber-100 p-3 rounded-full">
                                            <i className="fas fa-percentage text-amber-500"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 现金和汇率 */}
                            <div className="card p-6 mb-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold text-slate-800">现金和汇率</h2>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => setShowEditCash(!showEditCash)}
                                            className="btn-outline px-4 py-2 text-sm"
                                        >
                                            {showEditCash ? '取消编辑' : '编辑现金'}
                                        </button>
                                        <button
                                            onClick={() => setShowEditRates(!showEditRates)}
                                            className="btn-outline px-4 py-2 text-sm"
                                        >
                                            {showEditRates ? '取消编辑' : '编辑汇率'}
                                        </button>
                                    </div>
                                </div>
                                
                                {/* 现金编辑表单 */}
                                {showEditCash && (
                                    <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                                        <h4 className="text-md font-semibold text-slate-800 mb-3">编辑现金余额</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">人民币现金 (¥)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={editCash.cny}
                                                    onChange={(e) => setEditCash({...editCash, cny: e.target.value})}
                                                    className="input-field w-full px-3 py-2 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">港币现金 (HK$)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={editCash.hkd}
                                                    onChange={(e) => setEditCash({...editCash, hkd: e.target.value})}
                                                    className="input-field w-full px-3 py-2 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">美元现金 ($)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={editCash.usd}
                                                    onChange={(e) => setEditCash({...editCash, usd: e.target.value})}
                                                    className="input-field w-full px-3 py-2 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 mt-3">
                                            <button
                                                onClick={handleSaveCash}
                                                className="btn-primary px-4 py-2 text-sm"
                                            >
                                                保存现金
                                            </button>
                                            <button
                                                onClick={handleCancelCashEdit}
                                                className="btn-outline px-4 py-2 text-sm"
                                            >
                                                取消
                                            </button>
                                        </div>
                                    </div>
                                )}
                                
                                {/* 汇率编辑表单 */}
                                {showEditRates && (
                                    <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                                        <h4 className="text-md font-semibold text-slate-800 mb-3">编辑汇率</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">港币兑人民币汇率 (HKD/CNY)</label>
                                                <input
                                                    type="number"
                                                    step="0.0001"
                                                    value={editRates.HKDCNY}
                                                    onChange={(e) => setEditRates({...editRates, HKDCNY: e.target.value})}
                                                    className="input-field w-full px-3 py-2 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">美元兑人民币汇率 (USD/CNY)</label>
                                                <input
                                                    type="number"
                                                    step="0.0001"
                                                    value={editRates.USDCNY}
                                                    onChange={(e) => setEditRates({...editRates, USDCNY: e.target.value})}
                                                    className="input-field w-full px-3 py-2 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 mt-3">
                                            <button
                                                onClick={handleSaveRates}
                                                className="btn-primary px-4 py-2 text-sm"
                                            >
                                                保存汇率
                                            </button>
                                            <button
                                                onClick={handleCancelRatesEdit}
                                                className="btn-outline px-4 py-2 text-sm"
                                            >
                                                取消
                                            </button>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <p className="text-sm text-slate-500">人民币现金</p>
                                        <p className="text-lg font-medium text-slate-800 mt-1">¥{cash.cny.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</p>
                                    </div>
                                    
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <p className="text-sm text-slate-500">港币现金</p>
                                        <p className="text-lg font-medium text-slate-800 mt-1">HK${cash.hkd.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</p>
                                    </div>
                                    
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <p className="text-sm text-slate-500">美元现金</p>
                                        <p className="text-lg font-medium text-slate-800 mt-1">${cash.usd.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</p>
                                    </div>
                                    
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <p className="text-sm text-slate-500">HKD/CNY汇率</p>
                                        <p className="text-lg font-medium text-slate-800 mt-1">{exchangeRates.HKDCNY}</p>
                                    </div>
                                    
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <p className="text-sm text-slate-500">USD/CNY汇率</p>
                                        <p className="text-lg font-medium text-slate-800 mt-1">{exchangeRates.USDCNY}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 市场概览 */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                <div className="card p-6">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">A股市场</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">累计净转入</span>
                                            <span className="text-sm font-medium text-slate-800">¥{aShareNetFlow.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">持仓盈亏</span>
                                            <span className={`text-sm font-medium ${aSharePnL >= 0 ? 'profit' : 'loss'}`}>
                                                {aSharePnL >= 0 ? '+' : ''}¥{aSharePnL.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">当前市值</span>
                                            <span className="text-sm font-medium text-slate-800">¥{aShareMarketValue.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">现金</span>
                                            <span className="text-sm font-medium text-slate-800">¥{cash.cny.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card p-6">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">港股市场</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">累计净转入</span>
                                            <span className="text-sm font-medium text-slate-800">¥{overseaNetFlow.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">持仓盈亏</span>
                                            <span className={`text-sm font-medium ${hSharePnL >= 0 ? 'profit' : 'loss'}`}>
                                                {hSharePnL >= 0 ? '+' : ''}¥{hSharePnL.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">当前市值</span>
                                            <span className="text-sm font-medium text-slate-800">¥{hShareMarketValue.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">现金</span>
                                            <span className="text-sm font-medium text-slate-800">HK${cash.hkd.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card p-6">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">美股市场</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">持仓盈亏</span>
                                            <span className={`text-sm font-medium ${usSharePnL >= 0 ? 'profit' : 'loss'}`}>
                                                {usSharePnL >= 0 ? '+' : ''}¥{usSharePnL.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">当前市值</span>
                                            <span className="text-sm font-medium text-slate-800">¥{usShareMarketValue.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-slate-500">现金</span>
                                            <span className="text-sm font-medium text-slate-800">${cash.usd.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 持仓详情 */}
                            <div className="card p-6 mb-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold text-slate-800">持仓详情</h2>
                                    <button 
                                        onClick={() => {
                                            setActiveTab('holdings');
                                            setShowAddHolding(true);
                                        }}
                                        className="btn-primary px-4 py-2 text-sm"
                                    >
                                        <i className="fas fa-plus mr-1"></i> 新增持仓
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* A股持仓 */}
                                    <div>
                                        <h3 className="font-medium text-slate-800 mb-4">A股持仓</h3>
                                        <div className="space-y-3">
                                            {holdings.aShare.filter(h => h.quantity > 0).map((holding, index) => (
                                                <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                                    <div>
                                                        <div className="font-medium text-sm">{holding.name}</div>
                                                        <div className="text-xs text-slate-500">{holding.code}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm">¥{holding.currentPrice}</div>
                                                        <div className={`text-xs ${calculatePnL(holding) >= 0 ? 'profit' : 'loss'}`}>
                                                            {calculatePnL(holding) >= 0 ? '+' : ''}¥{calculatePnL(holding).toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* 港股持仓 */}
                                    <div>
                                        <h3 className="font-medium text-slate-800 mb-4">港股持仓</h3>
                                        <div className="space-y-3">
                                            {holdings.hShare.filter(h => h.quantity > 0 || h.fees > 0).map((holding, index) => (
                                                <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                                    <div>
                                                        <div className="font-medium text-sm">{holding.name}</div>
                                                        <div className="text-xs text-slate-500">{holding.code}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm">HK${holding.currentPrice}</div>
                                                        <div className={`text-xs ${calculatePnL(holding) >= 0 ? 'profit' : 'loss'}`}>
                                                            {calculatePnL(holding) >= 0 ? '+' : ''}HK${calculatePnL(holding).toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* 美股持仓 */}
                                    <div>
                                        <h3 className="font-medium text-slate-800 mb-4">美股持仓</h3>
                                        <div className="space-y-3">
                                            {holdings.usShare.filter(h => h.quantity > 0).map((holding, index) => (
                                                <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                                    <div>
                                                        <div className="font-medium text-sm">{holding.name}</div>
                                                        <div className="text-xs text-slate-500">{holding.code}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm">${holding.currentPrice}</div>
                                                        <div className={`text-xs ${calculatePnL(holding) >= 0 ? 'profit' : 'loss'}`}>
                                                            {calculatePnL(holding) >= 0 ? '+' : ''}${calculatePnL(holding).toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* A股资金流页面 */}
                    {activeTab === 'aShare' && (
                        <div className="card">
                            <div className="p-6 border-b flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-slate-800">A股资金流水</h3>
                                <button
                                    onClick={() => setShowAddAShare(!showAddAShare)}
                                    className="btn-primary px-4 py-2 text-sm"
                                >
                                    {showAddAShare ? '取消添加' : '新增记录'}
                                </button>
                            </div>
                            
                            {/* 新增记录表单 */}
                            {showAddAShare && (
                                <div className="p-6 border-b bg-slate-50">
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">日期</label>
                                            <input
                                                type="date"
                                                value={newAShareRecord.date}
                                                onChange={(e) => setNewAShareRecord({...newAShareRecord, date: e.target.value})}
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">类型</label>
                                            <select
                                                value={newAShareRecord.type}
                                                onChange={(e) => setNewAShareRecord({...newAShareRecord, type: e.target.value})}
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            >
                                                <option value="转入">转入</option>
                                                <option value="转出">转出</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">数额 (¥)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={newAShareRecord.amount}
                                                onChange={(e) => setNewAShareRecord({...newAShareRecord, amount: e.target.value})}
                                                placeholder="请输入数额"
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">备注</label>
                                            <input
                                                type="text"
                                                value={newAShareRecord.note}
                                                onChange={(e) => setNewAShareRecord({...newAShareRecord, note: e.target.value})}
                                                placeholder="可选"
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div className="flex items-end">
                                            <button
                                                onClick={handleAddAShareRecord}
                                                className="w-full btn-primary px-4 py-2 text-sm"
                                            >
                                                添加记录
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left text-sm text-slate-500 border-b">
                                                <th className="pb-3">日期</th>
                                                <th className="pb-3">类型</th>
                                                <th className="pb-3">数额</th>
                                                <th className="pb-3">变动</th>
                                                <th className="pb-3">备注</th>
                                                <th className="pb-3">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {aShareFlows.map((flow, index) => (
                                                <tr key={index} className="text-sm border-b border-slate-100">
                                                    <td className="py-3">{flow.date}</td>
                                                    <td className="py-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            flow.type === '转入' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {flow.type}
                                                        </span>
                                                    </td>
                                                    <td className="py-3">¥{flow.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</td>
                                                    <td className={`py-3 ${flow.type === '转入' ? 'profit' : 'loss'}`}>
                                                        {flow.type === '转入' ? '+' : '-'}{flow.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-3 text-slate-500">{flow.note || '-'}</td>
                                                    <td className="py-3">
                                                        <button 
                                                            onClick={() => handleDeleteRecord(index, 'aShare')}
                                                            className="text-red-500 hover:text-red-700 text-sm"
                                                        >
                                                            删除
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* 持仓管理页面 */}
                    {activeTab === 'holdings' && (
                        <div className="space-y-6">
                            {/* 新增持仓按钮 */}
                            <div className="card p-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-slate-800">持仓管理</h3>
                                    <button
                                        onClick={() => setShowAddHolding(!showAddHolding)}
                                        className="btn-primary px-4 py-2 text-sm"
                                    >
                                        {showAddHolding ? '取消添加' : '新增持仓'}
                                    </button>
                                </div>
                            </div>
                            
                            {/* 新增持仓表单 */}
                            {showAddHolding && (
                                <div className="card p-6">
                                    <h4 className="text-md font-semibold text-slate-800 mb-4">
                                        {editingHolding ? '编辑持仓' : '新增持仓'}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">市场</label>
                                            <select
                                                value={newHolding.market}
                                                onChange={(e) => setNewHolding({...newHolding, market: e.target.value})}
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            >
                                                <option value="aShare">A股</option>
                                                <option value="hShare">港股</option>
                                                <option value="usShare">美股</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">股票名称</label>
                                            <input
                                                type="text"
                                                value={newHolding.name}
                                                onChange={(e) => setNewHolding({...newHolding, name: e.target.value})}
                                                placeholder="如：腾讯控股"
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">股票代码</label>
                                            <input
                                                type="text"
                                                value={newHolding.code}
                                                onChange={(e) => setNewHolding({...newHolding, code: e.target.value})}
                                                placeholder="如：0700.HK"
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">当前价格</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={newHolding.currentPrice}
                                                onChange={(e) => setNewHolding({...newHolding, currentPrice: e.target.value})}
                                                placeholder="0.00"
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">成本价</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={newHolding.costPrice}
                                                onChange={(e) => setNewHolding({...newHolding, costPrice: e.target.value})}
                                                placeholder="0.00"
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">持股数量</label>
                                            <input
                                                type="number"
                                                value={newHolding.quantity}
                                                onChange={(e) => setNewHolding({...newHolding, quantity: e.target.value})}
                                                placeholder="0"
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">手续费</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={newHolding.fees}
                                                onChange={(e) => setNewHolding({...newHolding, fees: e.target.value})}
                                                placeholder="0.00"
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div className="flex items-end space-x-2">
                                            <button
                                                onClick={editingHolding ? handleUpdateHolding : handleAddHolding}
                                                className="flex-1 btn-primary px-4 py-2 text-sm"
                                            >
                                                {editingHolding ? '更新持仓' : '添加持仓'}
                                            </button>
                                            {editingHolding && (
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="px-4 py-2 btn-outline text-sm"
                                                >
                                                    取消
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* 持仓列表 */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* A股持仓 */}
                                <div className="card">
                                    <div className="p-4 border-b flex justify-between items-center">
                                        <h4 className="font-semibold text-slate-800">A股持仓</h4>
                                        <span className="text-sm text-slate-500">{holdings.aShare.length}只</span>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        {holdings.aShare.map((holding, index) => (
                                            <div key={holding.id} className="border rounded-lg p-3 hover:bg-slate-50">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="font-medium text-sm">{holding.name}</div>
                                                        <div className="text-xs text-slate-500">{holding.code}</div>
                                                    </div>
                                                    <div className="flex space-x-1">
                                                        <button
                                                            onClick={() => handleEditHolding('aShare', index)}
                                                            className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                                                        >
                                                            编辑
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteHolding('aShare', index)}
                                                            className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                                                        >
                                                            删除
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div>
                                                        <span className="text-slate-500">当前价:</span>
                                                        <span className="ml-1">¥{holding.currentPrice}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">成本价:</span>
                                                        <span className="ml-1">¥{holding.costPrice}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">持股数:</span>
                                                        <span className="ml-1">{holding.quantity}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">手续费:</span>
                                                        <span className="ml-1">¥{holding.fees}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-xs">
                                                    <span className="text-slate-500">盈亏:</span>
                                                    <span className={`ml-1 ${calculatePnL(holding) >= 0 ? 'profit' : 'loss'}`}>
                                                        {calculatePnL(holding) >= 0 ? '+' : ''}¥{calculatePnL(holding).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* 港股持仓 */}
                                <div className="card">
                                    <div className="p-4 border-b flex justify-between items-center">
                                        <h4 className="font-semibold text-slate-800">港股持仓</h4>
                                        <span className="text-sm text-slate-500">{holdings.hShare.length}只</span>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        {holdings.hShare.map((holding, index) => (
                                            <div key={holding.id} className="border rounded-lg p-3 hover:bg-slate-50">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="font-medium text-sm">{holding.name}</div>
                                                        <div className="text-xs text-slate-500">{holding.code}</div>
                                                    </div>
                                                    <div className="flex space-x-1">
                                                        <button
                                                            onClick={() => handleEditHolding('hShare', index)}
                                                            className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                                                        >
                                                            编辑
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteHolding('hShare', index)}
                                                            className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                                                        >
                                                            删除
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div>
                                                        <span className="text-slate-500">当前价:</span>
                                                        <span className="ml-1">HK${holding.currentPrice}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">成本价:</span>
                                                        <span className="ml-1">HK${holding.costPrice}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">持股数:</span>
                                                        <span className="ml-1">{holding.quantity}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">手续费:</span>
                                                        <span className="ml-1">HK${holding.fees}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-xs">
                                                    <span className="text-slate-500">盈亏:</span>
                                                    <span className={`ml-1 ${calculatePnL(holding) >= 0 ? 'profit' : 'loss'}`}>
                                                        {calculatePnL(holding) >= 0 ? '+' : ''}HK${calculatePnL(holding).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* 美股持仓 */}
                                <div className="card">
                                    <div className="p-4 border-b flex justify-between items-center">
                                        <h4 className="font-semibold text-slate-800">美股持仓</h4>
                                        <span className="text-sm text-slate-500">{holdings.usShare.length}只</span>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        {holdings.usShare.map((holding, index) => (
                                            <div key={holding.id} className="border rounded-lg p-3 hover:bg-slate-50">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="font-medium text-sm">{holding.name}</div>
                                                        <div className="text-xs text-slate-500">{holding.code}</div>
                                                    </div>
                                                    <div className="flex space-x-1">
                                                        <button
                                                            onClick={() => handleEditHolding('usShare', index)}
                                                            className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                                                        >
                                                            编辑
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteHolding('usShare', index)}
                                                            className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                                                        >
                                                            删除
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div>
                                                        <span className="text-slate-500">当前价:</span>
                                                        <span className="ml-1">${holding.currentPrice}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">成本价:</span>
                                                        <span className="ml-1">${holding.costPrice}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">持股数:</span>
                                                        <span className="ml-1">{holding.quantity}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">手续费:</span>
                                                        <span className="ml-1">${holding.fees}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-xs">
                                                    <span className="text-slate-500">盈亏:</span>
                                                    <span className={`ml-1 ${calculatePnL(holding) >= 0 ? 'profit' : 'loss'}`}>
                                                        {calculatePnL(holding) >= 0 ? '+' : ''}${calculatePnL(holding).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                    {/* 海外资金流页面 */}
                    {activeTab === 'oversea' && (
                        <div className="card">
                            <div className="p-6 border-b flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-slate-800">海外资金流水</h3>
                                <button
                                    onClick={() => setShowAddOversea(!showAddOversea)}
                                    className="btn-primary px-4 py-2 text-sm"
                                >
                                    {showAddOversea ? '取消添加' : '新增记录'}
                                </button>
                            </div>
                            
                            {/* 新增记录表单 */}
                            {showAddOversea && (
                                <div className="p-6 border-b bg-slate-50">
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">日期</label>
                                            <input
                                                type="date"
                                                value={newOverseaRecord.date}
                                                onChange={(e) => setNewOverseaRecord({...newOverseaRecord, date: e.target.value})}
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">类型</label>
                                            <select
                                                value={newOverseaRecord.type}
                                                onChange={(e) => setNewOverseaRecord({...newOverseaRecord, type: e.target.value})}
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            >
                                                <option value="转入">转入</option>
                                                <option value="转出">转出</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">港币金额 (HK$)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={newOverseaRecord.amountHKD}
                                                onChange={(e) => setNewOverseaRecord({...newOverseaRecord, amountHKD: e.target.value})}
                                                placeholder="请输入港币金额"
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">人民币金额 (¥)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={newOverseaRecord.amountCNY}
                                                onChange={(e) => setNewOverseaRecord({...newOverseaRecord, amountCNY: e.target.value})}
                                                placeholder="请输入人民币金额"
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">汇率</label>
                                            <input
                                                type="number"
                                                step="0.0001"
                                                value={newOverseaRecord.rate}
                                                onChange={(e) => setNewOverseaRecord({...newOverseaRecord, rate: parseFloat(e.target.value)})}
                                                className="input-field w-full px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            onClick={handleAddOverseaRecord}
                                            className="btn-primary px-4 py-2 text-sm"
                                        >
                                            添加记录
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left text-sm text-slate-500 border-b">
                                                <th className="pb-3">日期</th>
                                                <th className="pb-3">类型</th>
                                                <th className="pb-3">港币金额</th>
                                                <th className="pb-3">人民币金额</th>
                                                <th className="pb-3">汇率</th>
                                                <th className="pb-3">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {overseaFlows.map((flow, index) => (
                                                <tr key={index} className="text-sm border-b border-slate-100">
                                                    <td className="py-3">{flow.date}</td>
                                                    <td className="py-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            flow.type === '转入' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {flow.type}
                                                        </span>
                                                    </td>
                                                    <td className="py-3">HK${flow.amountHKD.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</td>
                                                    <td className="py-3">¥{flow.amountCNY.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</td>
                                                    <td className="py-3">{flow.rate.toFixed(4)}</td>
                                                    <td className="py-3">
                                                        <button 
                                                            onClick={() => handleDeleteRecord(index, 'oversea')}
                                                            className="text-red-500 hover:text-red-700 text-sm"
                                                        >
                                                            删除
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

            </main>
            
            {/* 页脚 */}
            <footer className="bg-white py-6 px-6 border-t border-slate-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-slate-500 mb-2 md:mb-0">页面内容均由 AI 生成，仅供参考</p>
                    <p className="text-sm text-slate-500">
                        created by <a href="https://space.coze.cn" className="text-blue-500 hover:text-blue-600">coze space</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}