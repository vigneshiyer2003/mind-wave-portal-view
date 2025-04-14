
import React, { useState } from 'react';
import Layout from '../components/Layout';
import PatientCard from '../components/PatientCard';
import { mockPatients } from '../utils/mockData';
import { Input } from '@/components/ui/input';
import { Brain, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Patient } from '../types';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState(mockPatients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = (newPatient: Omit<Patient, 'id' | 'lastTestDate'>) => {
    const newPatientWithId = {
      ...newPatient,
      id: `${patients.length + 1}`,
      lastTestDate: null
    };
    
    setPatients([...patients, newPatientWithId]);
    setIsDialogOpen(false);
    
    toast({
      title: "Patient Added",
      description: `${newPatient.name} has been added to the database.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Patient Database</h1>
            <p className="text-muted-foreground">
              View and manage patients in the EEG emotion recognition system
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                className="transition-all duration-300 hover:shadow-md hover:scale-105 w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-primary">Add New Patient</DialogTitle>
              </DialogHeader>
              <AddPatientForm onAddPatient={handleAddPatient} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <div className="flex max-w-md border rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-primary">
            <div className="bg-muted px-3 py-2 flex items-center">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search patients by name or diagnosis..."
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map(patient => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-lg border-2 border-dashed border-muted">
            <Brain className="h-16 w-16 text-muted-foreground mb-4 animate-pulse" />
            <h3 className="text-xl font-medium">No patients found</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              {searchTerm ? 'Try a different search term or clear the search field' : 'Add a patient to get started with your database'}
            </p>
            {searchTerm && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

// Separate component for adding a patient
const AddPatientForm = ({ onAddPatient }: { onAddPatient: (patient: Omit<Patient, 'id' | 'lastTestDate'>) => void }) => {
  const form = useForm({
    defaultValues: {
      name: '',
      age: '',
      gender: 'Male',
      diagnosis: '',
      medicalHistory: ''
    }
  });

  const handleSubmit = (data: any) => {
    onAddPatient({
      name: data.name,
      age: parseInt(data.age),
      gender: data.gender as Patient['gender'],
      diagnosis: data.diagnosis,
      medicalHistory: data.medicalHistory
    });
    
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <Input
          id="name"
          {...form.register('name', { required: true })}
          className="w-full focus:border-primary"
          placeholder="Patient name"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">Name is required</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="age" className="block text-sm font-medium">Age</label>
          <Input
            id="age"
            type="number"
            {...form.register('age', { required: true, min: 0 })}
            className="w-full focus:border-primary"
            placeholder="Age"
          />
          {form.formState.errors.age && (
            <p className="text-sm text-destructive">Valid age is required</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
          <select
            id="gender"
            {...form.register('gender')}
            className="w-full rounded-md border border-input bg-background px-3 py-2 focus:border-primary focus:outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="diagnosis" className="block text-sm font-medium">Diagnosis</label>
        <Input
          id="diagnosis"
          {...form.register('diagnosis', { required: true })}
          className="w-full focus:border-primary"
          placeholder="Primary diagnosis"
        />
        {form.formState.errors.diagnosis && (
          <p className="text-sm text-destructive">Diagnosis is required</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="medicalHistory" className="block text-sm font-medium">Medical History</label>
        <Textarea
          id="medicalHistory"
          {...form.register('medicalHistory')}
          className="w-full min-h-[100px] focus:border-primary resize-y"
          placeholder="Relevant medical history and notes"
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button 
          type="submit" 
          variant="default"
          disabled={!form.formState.isDirty}
          className="transition-all hover:shadow-md"
        >
          Add Patient
        </Button>
      </div>
    </form>
  );
};

export default Index;
