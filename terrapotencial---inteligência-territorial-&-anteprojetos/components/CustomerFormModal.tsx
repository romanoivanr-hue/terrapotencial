import React, { useState } from 'react';
import { X, User, Mail, Phone, Building, Target, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { CustomerData, PropertyData } from '../types';

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyData;
  onSubmit: (data: CustomerData) => void;
}

export const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
  isOpen,
  onClose,
  property,
  onSubmit
}) => {
  const [name, setName] = useState('Roberto V. Mendonça');
  const [email, setEmail] = useState('roberto@mendoncapar.com.br');
  const [phone, setPhone] = useState('(48) 99182-3344');
  const [role, setRole] = useState<CustomerData['role']>('Proprietário');
  const [projectObjective, setProjectObjective] = useState<CustomerData['projectObjective']>('Condomínio Fechado');
  const [notes, setNotes] = useState('Gleba com fácil acesso à rodovia. Interesse em lotes residenciais médios de 400m² a 600m².');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      phone,
      role,
      projectObjective,
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0c1322] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Personalização do Seu Estudo</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white">
              Quem receberá esta análise?
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Identificação do cliente e objetivos para a gleba em {property.city} - {property.state}.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Carlos Alberto Silva"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Profissional *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carlos@exemplo.com.br"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Telefone *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Seu Perfil Principal *</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as CustomerData['role'])}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400"
              >
                <option value="Proprietário">Proprietário de Terra</option>
                <option value="Investidor">Investidor Imobiliário</option>
                <option value="Loteador">Loteador / Incorporador</option>
                <option value="Engenheiro/Arquiteto">Engenheiro ou Arquiteto</option>
                <option value="Imobiliária">Corretor ou Imobiliária</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Objetivo com a Área *</label>
              <select
                value={projectObjective}
                onChange={(e) => setProjectObjective(e.target.value as CustomerData['projectObjective'])}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-400"
              >
                <option value="Loteamento Aberto">Loteamento Aberto Residencial</option>
                <option value="Condomínio Fechado">Condomínio Fechado de Lotes</option>
                <option value="Chácaras de Lazer">Chácaras / Glebas de Lazer</option>
                <option value="Misto">Desenvolvimento Misto (Residencial/Comercial)</option>
                <option value="Avaliação de Potencial">Estudo de Potencial para Venda</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Conte brevemente o que você pretende fazer com essa propriedade (opcional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Pretendo parcelar o solo em parceria com uma loteadora ou entender se vale a pena vender a gleba inteira."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all mt-4"
          >
            <span>Prosseguir Para Contratação</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-4 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-slate-400">
          Seus dados estão protegidos de acordo com a LGPD e serão utilizados apenas na confecção do seu estudo.
        </div>

      </div>
    </div>
  );
};
