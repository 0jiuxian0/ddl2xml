import React, { useState } from 'react';
import { Copy, Code2, FileCode2, RefreshCw } from 'lucide-react';
import { convertSqlToXml } from './api/converter';

function App() {
  const [sql, setSql] = useState(`CREATE TABLE sys_user (
    user_id        BIGINT NOT NULL COMMENT '用户ID' PRIMARY KEY,
    user_name      VARCHAR(64) NULL COMMENT '用户名',
    password       VARCHAR(255) NULL COMMENT '密码'
) COMMENT '用户表';`);
  const [xmlOutput, setXmlOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processBatchCode = `private <T> void processBatch(List<T> list, Consumer<List<T>> operation) {
    if (CollUtil.isEmpty(list)) {
        return;
    }
    int batchSize = 1000;
    for (int i = 0; i < list.size(); i += batchSize) {
        int endIndex = Math.min(i + batchSize, list.size());
        List<T> subList = list.subList(i, endIndex);
        operation.accept(subList);
    }
}`;

  const convertToXML = async (type: 'insert' | 'update') => {
    setLoading(true);
    setError(null);
    try {
      const data = await convertSqlToXml(sql, type);
      setXmlOutput(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <FileCode2 className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">SQL to XML Converter</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white shadow rounded-lg p-6">
            <label htmlFor="sql" className="block text-sm font-medium text-gray-700 mb-2">
              Enter SQL DDL Statement
            </label>
            <textarea
              id="sql"
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              className="w-full h-48 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your SQL DDL statement here..."
            />
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => convertToXML('insert')}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? (
                  <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                ) : (
                  <Code2 className="-ml-1 mr-2 h-4 w-4" />
                )}
                Generate Insert XML
              </button>
              <button
                onClick={() => convertToXML('update')}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? (
                  <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                ) : (
                  <Code2 className="-ml-1 mr-2 h-4 w-4" />
                )}
                Generate Update XML
              </button>
            </div>
          </div>

          {xmlOutput && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Generated XML</h2>
                <button
                  onClick={() => copyToClipboard(xmlOutput)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Copy className="-ml-0.5 mr-2 h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy XML'}
                </button>
              </div>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                <code className="text-sm text-gray-800">{xmlOutput}</code>
              </pre>
            </div>
          )}

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Process Batch Code</h2>
              <button
                onClick={() => copyToClipboard(processBatchCode)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Copy className="-ml-0.5 mr-2 h-4 w-4" />
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
              <code className="text-sm text-gray-800">{processBatchCode}</code>
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;