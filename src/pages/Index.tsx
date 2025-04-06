
import React, { useState } from 'react';
import Layout from '../components/Layout';
import PatientCard from '../components/PatientCard';
import { mockPatients } from '../utils/mockData';
import { Input } from '@/components/ui/input';
import { Brain, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState(mockPatients);
  const { toast } = useToast();

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = (newPatient: Patient) => {
    const newPatientWithId = {
      ...newPatient,
      id: `${patients.length + 1}`,
      lastTestDate: null
    };
    
    setPatients([...patients, newPatientWithId]);
    
    toast({
      title: "Patient Added",
      description: `${newPatient.name} has been added to the database.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Patient Database</h1>
            <p className="text-muted-foreground">
              View and manage patients in the EEG emotion recognition system
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" /> Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <AddPatientForm onAddPatient={handleAddPatient} />
            </DialogContent>
          </Dialog>
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

// Separate component for adding a patient
const AddPatientForm = ({ onAddPatient }: { onAddPatient: (patient: Omit<Patient, 'id' | 'lastTestDate'>) => void }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Patient['gender']>('Male');
  const [diagnosis, setDiagnosis] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !age || !diagnosis) {
      alert('Please fill in all required fields');
      return;
    }

    onAddPatient({
      name,
      age: parseInt(age),
      gender,
      diagnosis,
      medicalHistory
    });

    // Reset form
    setName('');
    setAge('');
    setGender('Male');
    setDiagnosis('');
    setMedicalHistory('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value as Patient['gender'])}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">Diagnosis</label>
        <input
          type="text"
          id="diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">Medical History</label>
        <textarea
          id="medicalHistory"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit" variant="default">
          Add Patient
        </Button>
      </div>
    </form>
  );
};

export default Index;
