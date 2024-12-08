import React, { useState } from 'react';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { ClientForm } from './components/ClientForm';
import { ExternalClientForm } from './components/ExternalClientForm';
import { Button } from './components/ui/Button';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'client' | 'external'>('client');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formRef, setFormRef] = useState<any>(null);

  const handleConfirm = async () => {
    if (formRef && formRef.submitForm) {
      await formRef.submitForm();
      if (Object.keys(formRef.errors).length === 0 && formRef.dirty) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setIsModalOpen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedType('client');
        }}
        title="Nouvelle Demande Client"
        onConfirm={handleConfirm}
        isLoading={isSubmitting}
      >
        <div className="space-y-6">
          <div className="flex space-x-4">
            <Button
              variant={selectedType === 'client' ? 'primary' : 'outline'}
              onClick={() => setSelectedType('client')}
              className="flex-1"
            >
              Client Régulier
            </Button>
            <Button
              variant={selectedType === 'external' ? 'primary' : 'outline'}
              onClick={() => setSelectedType('external')}
              className="flex-1"
            >
              Client Externe
            </Button>
          </div>

          {selectedType === 'client' && <ClientForm setFormRef={setFormRef} />}
          {selectedType === 'external' && <ExternalClientForm setFormRef={setFormRef} />}
        </div>
      </Modal>
    </div>
  );
}

export default App;