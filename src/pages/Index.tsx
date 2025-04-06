
import React, { useState } from 'react';
import Layout from '../components/Layout';
import PatientCard from '../components/PatientCard';
import { mockPatients } from '../utils/mockData';
import { Input } from '@/components/ui/input';
import { Brain } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter patients based on search term
  const filteredPatients = mockPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Patient Database</h1>
          <p className="text-muted-foreground">
            View and manage patients in the EEG emotion recognition system
          </p>
        </div>

        <div className="relative">
          <Input
            type="search"
            placeholder="Search patients by name or diagnosis..."
            className="max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map(patient => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Brain className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">No patients found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try a different search term' : 'Add a patient to get started'}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
