
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import EEGVisualization from '../components/EEGVisualization';
import EmotionAnalysis from '../components/EmotionAnalysis';
import { mockPatients } from '../utils/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Patient } from '../types';
import { useToast } from '@/components/ui/use-toast';

const TestPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [patient, setPatient] = useState<Patient | undefined>();
  
  useEffect(() => {
    // Find patient by ID
    const foundPatient = mockPatients.find(p => p.id === patientId);
    
    if (foundPatient) {
      setPatient(foundPatient);
      
      // Simulate test starting
      toast({
        title: 'Test Started',
        description: `EEG recording initiated for ${foundPatient.name}`,
      });
    } else {
      // Redirect if patient not found
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Patient not found',
      });
      navigate('/');
    }
  }, [patientId, navigate, toast]);

  if (!patient) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Loading patient data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">EEG Test</h1>
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patients
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>{patient.name}</CardTitle>
            </div>
            <CardDescription>
              {patient.age} years old, {patient.gender} | Diagnosis: {patient.diagnosis}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{patient.medicalHistory}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="eeg">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="eeg">EEG Signals</TabsTrigger>
            <TabsTrigger value="emotion">Emotion Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="eeg" className="mt-4">
            <EEGVisualization patientId={patient.id} />
          </TabsContent>
          <TabsContent value="emotion" className="mt-4">
            <EmotionAnalysis patientId={patient.id} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TestPage;
