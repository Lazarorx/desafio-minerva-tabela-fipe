import React from 'react';
import SearchForm from '../components/molecules/SearchForm';
import Card from '../components/atoms/Card';

interface SearchPageProps {
  onSearch: (brandCode: string, modelCode: string, yearCode: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onSearch }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Consultar Veículo
          </h2>
          <p className="text-lg text-gray-600">
            Preencha os campos abaixo para consultar o preço
          </p>
        </div>

        {/* Search Form Card */}
        <Card className="shadow-xl">
          <SearchForm onSearch={onSearch} />
        </Card>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Dica</h3>
              <p className="text-sm text-gray-600">
                Os preços são atualizados mensalmente pela Fipe e refletem a média 
                de mercado para veículos em bom estado de conservação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
