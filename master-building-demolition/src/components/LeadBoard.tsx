import React, { useState, useEffect } from 'react';
import { Lead } from '../types';
import { 
  Users, CheckCircle, Clock, Calendar, Search, Trash2, 
  Download, RefreshCw, Eye, Sparkles, X, Filter, CheckCircle2 
} from 'lucide-react';

interface LeadBoardProps {
  onTotalUpdated?: (count: number) => void;
}

export default function LeadBoard({ onTotalUpdated }: LeadBoardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Load leads from localStorage on mount
  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    const stored = localStorage.getItem('demolition_leads');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Lead[];
        // Sort newest first
        const sorted = parsed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setLeads(sorted);
        if (onTotalUpdated) onTotalUpdated(sorted.length);
      } catch (e) {
        console.error('Failed to parse leads', e);
      }
    } else {
      // Empty sample leads to populate first experience
      const samples: Lead[] = [
        {
          id: 'lead-1',
          name: 'Nagaraj Swamy',
          phone: '+91 90193 24061',
          email: 'nagaraj.swamy@gmail.com',
          location: 'Jayanagar',
          demolitionType: 'Old House Demolition',
          details: 'Ancestral G+1 building. Wall touching neighbor building. Require safe dismantling, salvage valuation, and full rubble clearance.',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hrs ago
          status: 'pending',
          notes: 'Customer looking for wood salvage valuation on teak wood doors.',
          source: 'System Demo'
        },
        {
          id: 'lead-2',
          name: 'Rohan Mehta',
          phone: '+91 99001 88776',
          email: 'rohan.mehta@adityabuilders.com',
          location: 'Whitefield',
          demolitionType: 'Commercial Building Demolition',
          details: 'Concrete frame structure G+3 commercial building. Ready for site inspection immediately. Demolition permit available.',
          timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), // 6 hrs ago
          status: 'scheduled',
          notes: 'Site visit scheduled for tomorrow morning 10:00 AM.',
          source: 'System Demo'
        },
        {
          id: 'lead-3',
          name: 'Kshitij Desai',
          phone: '+91 91122 33445',
          email: 'kshitij@desaiindustries.in',
          location: 'Electronic City',
          demolitionType: 'Concrete Breaking & Excavation',
          details: '15,000 sq ft factory floor concrete breaking and column foundations removal. High breaker machinery required.',
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
          status: 'inprogress',
          notes: 'Mobilized Hitachi breaker on site.',
          source: 'System Demo'
        }
      ];
      localStorage.setItem('demolition_leads', JSON.stringify(samples));
      setLeads(samples);
      if (onTotalUpdated) onTotalUpdated(samples.length);
    }
  };

  const handleUpdateStatus = (leadId: string, newStatus: Lead['status']) => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    localStorage.setItem('demolition_leads', JSON.stringify(updated));
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm('Are you sure you want to delete this lead from history?')) {
      const filtered = leads.filter(l => l.id !== leadId);
      localStorage.setItem('demolition_leads', JSON.stringify(filtered));
      setLeads(filtered);
      if (onTotalUpdated) onTotalUpdated(filtered.length);
      setSelectedLead(null);
    }
  };

  const handleAddSampleInquiry = () => {
    const testLocations = ['Indiranagar', 'Koramangala', 'HSR Layout', 'Hebbal', 'Yelahanka', 'Banashankari'];
    const testServices = ['Residential Building Demolition', 'Commercial Building Demolition', 'Old House Demolition', 'Debris Removal'];
    const testNames = ['Anand Bhat', 'Deepika Rao', 'Siddharth Reddy', 'Manjunath G', 'Prem Kumar', 'Priyanka Sen'];
    
    const randomLocation = testLocations[Math.floor(Math.random() * testLocations.length)];
    const randomService = testServices[Math.floor(Math.random() * testServices.length)];
    const randomName = testNames[Math.floor(Math.random() * testNames.length)];
    const randomPhone = `+91 9${Math.floor(10000000 + Math.random() * 90000000)}`;
    
    const newLead: Lead = {
      id: 'sim-' + Date.now(),
      name: randomName,
      phone: randomPhone,
      email: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
      location: randomLocation,
      demolitionType: randomService,
      details: `Automated test proposal request for ${randomService} located at ${randomLocation}, Bangalore. Looking for an urgent cost estimate and timeline assessment.`,
      timestamp: new Date().toISOString(),
      status: 'pending',
      source: 'Interactive Simulation'
    };
    
    const updated = [newLead, ...leads];
    localStorage.setItem('demolition_leads', JSON.stringify(updated));
    setLeads(updated);
    if (onTotalUpdated) onTotalUpdated(updated.length);
  };

  const exportToCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Date,Name,Phone,Email,Location,Service,Status,Details,Source\n';
    
    leads.forEach(l => {
      const dateStr = new Date(l.timestamp).toLocaleDateString();
      const sanitizedDetails = l.details.replace(/"/g, '""');
      csvContent += `"${l.id}","${dateStr}","${l.name}","${l.phone}","${l.email}","${l.location}","${l.demolitionType}","${l.status}","${sanitizedDetails}","${l.source || 'Website'}"\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Master_Building_Demolition_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered lists
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.demolitionType.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Analytics counts
  const totalLeads = leads.length;
  const pendingLeads = leads.filter(l => l.status === 'pending').length;
  const scheduledLeads = leads.filter(l => l.status === 'scheduled').length;
  const completedLeads = leads.filter(l => l.status === 'completed').length;

  return (
    <div className="bg-white rounded border border-zinc-200 shadow-xl overflow-hidden" id="lead-tracker-board">
      {/* Header */}
      <div className="bg-zinc-950 px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-brand-red">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-brand-red rounded-full animate-ping animate-pulse" />
            <h3 className="text-xl font-display font-black text-white tracking-widest uppercase">
              Master Building Lead Inquiries Console <span className="text-[10px] bg-brand-red text-white py-0.5 px-2 rounded font-mono font-bold tracking-wider ml-1 uppercase">Live Sync</span>
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-1 font-sans">
            Secure client lead workspace to track customer call requests, inspections, and project estimates.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button 
            onClick={handleAddSampleInquiry}
            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-amber-500 font-mono text-xs rounded font-bold uppercase tracking-wider transition cursor-pointer"
            title="Create a mock user query to see the live update"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate Form Lead</span>
          </button>
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-brand-red hover:bg-brand-red-dark text-white font-mono text-xs rounded font-bold uppercase tracking-wider transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={loadLeads}
            className="p-2 text-gray-400 hover:text-white hover:bg-zinc-900 rounded border border-zinc-850 transition cursor-pointer"
            title="Refresh Inquiries"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Analytics Mini-Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-200 bg-[#F5F5F5]">
        <div className="p-4 border-r border-b md:border-b-0 border-zinc-200 flex items-center gap-3 text-left">
          <div className="p-2.5 bg-blue-100 text-blue-700 rounded">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 font-sans uppercase font-bold tracking-wider">Total Leads</div>
            <div className="text-xl font-black font-mono text-brand-dark">{totalLeads}</div>
          </div>
        </div>
        <div className="p-4 border-r border-b md:border-b-0 border-zinc-200 flex items-center gap-3 text-left">
          <div className="p-2.5 bg-amber-100 text-amber-700 rounded">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 font-sans uppercase font-bold tracking-wider">Pending Action</div>
            <div className="text-xl font-black font-mono text-brand-dark">{pendingLeads}</div>
          </div>
        </div>
        <div className="p-4 border-r border-zinc-200 flex items-center gap-3 text-left">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 font-sans uppercase font-bold tracking-wider">Visits Scheduled</div>
            <div className="text-xl font-black font-mono text-brand-dark">{scheduledLeads}</div>
          </div>
        </div>
        <div className="p-4 flex items-center gap-3 text-left">
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 font-sans uppercase font-bold tracking-wider">Demolitions Done</div>
            <div className="text-xl font-black font-mono text-brand-dark">{completedLeads}</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 border-b border-gray-100 bg-white flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search leads by name, phone, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-red focus:bg-white"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative flex items-center">
            <Filter className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-8 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-red appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Review</option>
              <option value="scheduled">Scheduled Visit</option>
              <option value="inprogress">Work In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table & Empty State */}
      <div className="overflow-x-auto">
        {filteredLeads.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <Users className="w-10 h-10 mx-auto text-gray-300 stroke-1 mb-2" />
            <p className="text-sm font-medium">No inquiries matched your criteria</p>
            <p className="text-xs text-gray-400 mt-1">Try simulating a lead or clearing search filters.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 font-mono">Date</th>
                <th className="py-3 px-4">Contact Detail</th>
                <th className="py-3 px-4">Required Service</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Inquiry Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredLeads.map(lead => {
                const dateObj = new Date(lead.timestamp);
                const dateFormed = !isNaN(dateObj.getTime()) 
                  ? dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                  : 'Recent';

                return (
                  <tr key={lead.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3.5 px-4 font-mono text-xs text-gray-500">
                      {dateFormed}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">{lead.name}</div>
                      <div className="text-xs text-gray-500 font-mono">{lead.phone}</div>
                      <div className="text-xs text-gray-400">{lead.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-700">
                      {lead.demolitionType}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <span className="px-2 py-0.5 bg-zinc-100 text-zinc-800 rounded font-bold font-sans">
                        {lead.location}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        lead.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        lead.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'inprogress' ? 'bg-purple-100 text-purple-800' :
                        lead.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          lead.status === 'pending' ? 'bg-amber-500' :
                          lead.status === 'scheduled' ? 'bg-blue-500' :
                          lead.status === 'inprogress' ? 'bg-purple-500' :
                          lead.status === 'completed' ? 'bg-green-500' :
                          'bg-gray-500'
                        }`} />
                        {lead.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="p-1 px-2 text-xs font-mono font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded inline-flex items-center gap-1 transition"
                          title="View all notes & details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Details Modal / Sidebar */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800">
              <div>
                <h4 className="font-semibold font-display text-lg tracking-tight">Inquiry Details</h4>
                <p className="text-xs text-gray-400">ID: {selectedLead.id}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-1.5 hover:bg-zinc-800 rounded-full text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-100">
                <div>
                  <label className="text-xs text-gray-400 block font-mono font-bold">CLIENT NAME</label>
                  <span className="font-semibold text-gray-900 text-sm">{selectedLead.name}</span>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block font-mono font-bold">INQUIRY DATE</label>
                  <span className="font-semibold text-gray-900 text-sm">{new Date(selectedLead.timestamp).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-100">
                <div>
                  <label className="text-xs text-gray-400 block font-mono font-bold">PHONE NUMBER</label>
                  <a href={`tel:${selectedLead.phone}`} className="font-semibold text-brand-red text-sm hover:underline font-mono">
                    {selectedLead.phone}
                  </a>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block font-mono font-bold">EMAIL ADDRESS</label>
                  <a href={`mailto:${selectedLead.email}`} className="font-semibold text-zinc-700 text-sm hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-100">
                <div>
                  <label className="text-xs text-gray-400 block font-mono font-bold">LOCATION</label>
                  <span className="font-semibold text-gray-900 text-sm">{selectedLead.location}</span>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block font-mono font-bold">PROJECT TYPE</label>
                  <span className="font-semibold text-gray-900 text-xs font-mono bg-zinc-100 px-2 py-0.5 rounded font-bold">
                    {selectedLead.demolitionType}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block font-mono font-bold mb-1">PROJECT DETAILS PROVIDED</label>
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-lg text-sm text-gray-700 whitespace-pre-wrap leading-relaxed shadow-inner">
                  {selectedLead.details}
                </div>
              </div>

              {/* Status Update Options */}
              <div>
                <label className="text-xs text-amber-600 block font-mono font-bold mb-1.5 flex items-center gap-1 uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Update Project Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedLead.id, 'pending')}
                    className={`text-xs py-1.5 px-2 rounded font-bold transition border ${
                      selectedLead.status === 'pending'
                        ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedLead.id, 'scheduled')}
                    className={`text-xs py-1.5 px-2 rounded font-bold transition border ${
                      selectedLead.status === 'scheduled'
                        ? 'bg-blue-100 border-blue-300 text-blue-800 shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Site Visit
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedLead.id, 'completed')}
                    className={`text-xs py-1.5 px-2 rounded font-bold transition border ${
                      selectedLead.status === 'completed'
                        ? 'bg-green-100 border-green-300 text-green-800 shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Demolished
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between border-t border-gray-100">
              <button
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="text-xs text-gray-400 hover:text-brand-red flex items-center gap-1 font-mono hover:bg-red-50 py-1.5 px-2.5 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-xs bg-zinc-900 hover:bg-black text-white px-4 py-1.5 rounded transition font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
