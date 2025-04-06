
import React from 'react';
import { Link } from 'react-router-dom';
import { Patient } from '../types';
import { ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <Card className="w-full transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            {patient.name}
          </CardTitle>
          <Badge>{patient.gender}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Age:</span>
            <span className="font-medium">{patient.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Diagnosis:</span>
            <span className="font-medium">{patient.diagnosis}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Test:</span>
            <span className="font-medium">
              {patient.lastTestDate || 'No tests yet'}
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-sm text-muted-foreground mb-1">Medical History:</h4>
            <p className="text-sm">{patient.medicalHistory}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/test/${patient.id}`} className="w-full">
          <Button className="w-full" variant="default">
            Run Test <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
