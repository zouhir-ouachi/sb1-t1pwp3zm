import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/Button';

interface HeaderProps {
  onOpenModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Système de Gestion des Clients</h1>
          <Button onClick={onOpenModal}>
            <Plus className="h-5 w-5 mr-2" />
            Nouvelle Demande
          </Button>
        </div>
      </div>
    </header>
  );
};