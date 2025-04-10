import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  AlertOctagon,
  Search,
  Filter,
  BarChart3,
  Clock,
  Package
} from 'lucide-react';

type Severity = 'critical' | 'high' | 'medium' | 'low';

interface Vulnerability {
  id: string;
  name: string;
  severity: Severity;
  description: string;
  affected_component: string;
  fix_available: boolean;
}

interface ContainerImage {
  id: string;
  name: string;
  tag: string;
  vulnerabilities: Vulnerability[];
  last_scan: string;
}

// Mock data
const mockImages: ContainerImage[] = [
  {
    id: '1',
    name: 'nginx',
    tag: 'latest',
    last_scan: '2024-03-15T10:30:00Z',
    vulnerabilities: [
      {
        id: 'CVE-2024-1234',
        name: 'Buffer Overflow in OpenSSL',
        severity: 'critical',
        description: 'A critical vulnerability in OpenSSL that could lead to remote code execution',
        affected_component: 'openssl-1.1.1',
        fix_available: true
      },
      {
        id: 'CVE-2024-5678',
        name: 'SQL Injection',
        severity: 'high',
        description: 'SQL injection vulnerability in database connector',
        affected_component: 'mysql-connector-8.0',
        fix_available: true
      }
    ]
  },
  {
    id: '2',
    name: 'postgres',
    tag: '13',
    last_scan: '2024-03-14T15:45:00Z',
    vulnerabilities: [
      {
        id: 'CVE-2024-9012',
        name: 'Memory Leak',
        severity: 'medium',
        description: 'Memory leak in connection handling',
        affected_component: 'postgresql-13.2',
        fix_available: false
      }
    ]
  }
];

function getSeverityColor(severity: Severity): string {
  switch (severity) {
    case 'critical':
      return 'text-red-600 bg-red-100';
    case 'high':
      return 'text-orange-600 bg-orange-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'low':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

function getSeverityIcon(severity: Severity) {
  switch (severity) {
    case 'critical':
      return <AlertOctagon className="w-4 h-4" />;
    case 'high':
      return <AlertTriangle className="w-4 h-4" />;
    case 'medium':
      return <Shield className="w-4 h-4" />;
    case 'low':
      return <Shield className="w-4 h-4" />;
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | 'all'>('all');

  const filteredImages = mockImages.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tag.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = selectedSeverity === 'all' || 
                           image.vulnerabilities.some(v => v.severity === selectedSeverity);
    
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-8 h-8 text-blue-600" />
              Container Security Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                Last updated: {new Date().toLocaleString()}
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Scan Now
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Images</p>
                <p className="text-2xl font-semibold">{mockImages.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Vulnerabilities</p>
                <p className="text-2xl font-semibold text-red-600">
                  {mockImages.reduce((acc, img) => 
                    acc + img.vulnerabilities.filter(v => v.severity === 'critical').length, 0)}
                </p>
              </div>
              <AlertOctagon className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Vulnerabilities</p>
                <p className="text-2xl font-semibold text-orange-600">
                  {mockImages.reduce((acc, img) => 
                    acc + img.vulnerabilities.filter(v => v.severity === 'high').length, 0)}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Images Needing Fixes</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {mockImages.filter(img => 
                    img.vulnerabilities.some(v => v.severity === 'critical' || v.severity === 'high')).length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search images..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value as Severity | 'all')}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Image List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vulnerabilities
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Scan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredImages.map((image) => (
                  <tr key={image.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Package className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{image.name}</div>
                          <div className="text-sm text-gray-500">{image.tag}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {(['critical', 'high', 'medium', 'low'] as Severity[]).map(severity => {
                          const count = image.vulnerabilities.filter(v => v.severity === severity).length;
                          if (count === 0) return null;
                          return (
                            <span
                              key={severity}
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(severity)}`}
                            >
                              {getSeverityIcon(severity)}
                              <span className="ml-1">{count}</span>
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(image.last_scan).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-900 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;