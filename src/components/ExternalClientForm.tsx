import React, { useState, useEffect } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { mockClients } from '../data/mockData';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

const ExternalClientSchema = Yup.object().shape({
  matricule: Yup.string().required('Matricule client obligatoire'),
  ice: Yup.string().required('Numéro ICE obligatoire'),
  companyName: Yup.string().required('Nom de la société obligatoire'),
  requestId: Yup.string().required('ID de demande obligatoire'),
  bankAccount: Yup.string().required('Compte bancaire obligatoire'),
});

interface ExternalClientFormProps {
  setFormRef: (ref: FormikProps<any>) => void;
}

export const ExternalClientForm: React.FC<ExternalClientFormProps> = ({ setFormRef }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const generateUniqueId = () => {
    return `DEM-${Math.random().toString(36).substr(2, 9)}`;
  };

  return (
    <Formik
      initialValues={{
        matricule: '',
        ice: '',
        companyName: '',
        requestId: generateUniqueId(),
        bankAccount: '',
      }}
      validationSchema={ExternalClientSchema}
      onSubmit={(values) => {
        console.log('Form submitted:', values);
      }}
    >
      {(formikProps) => {
        const { values, setFieldValue, errors, touched } = formikProps;
        
        useEffect(() => {
          const currentRef = formikProps;
          setFormRef(currentRef);
          return () => setFormRef(null);
        }, []); // Only run once on mount and cleanup

        const client = mockClients.find(c => c.matricule === values.matricule);
        const bankAccountOptions = client?.bankAccounts.map(account => ({
          value: account.accountNumber,
          label: account.label,
          sublabel: account.accountNumber
        })) || [];

        return (
          <Form className="space-y-4">
            <Input
              label="Matricule Client"
              name="matricule"
              placeholder="Entrez le matricule client"
              error={errors.matricule || searchError}
              touched={touched.matricule || !!searchError}
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setFieldValue('matricule', value);
                setSearchError('');
                setIsSearching(true);
                
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const client = mockClients.find(c => c.matricule === value);
                if (client) {
                  setFieldValue('companyName', client.companyName);
                  setFieldValue('ice', `ICE${value.substring(3)}`);
                  setSearchError('');
                } else {
                  setFieldValue('companyName', '');
                  setFieldValue('ice', '');
                  setSearchError('Client non trouvé');
                }
                setIsSearching(false);
              }}
            />

            <Input
              label="Numéro ICE"
              name="ice"
              disabled
              placeholder="Le numéro ICE apparaîtra après la recherche"
              error={errors.ice}
              touched={touched.ice}
            />

            <Input
              label="Nom de la Société"
              name="companyName"
              disabled
              placeholder={isSearching ? 'Recherche en cours...' : 'Le nom de la société apparaîtra ici'}
              error={errors.companyName}
              touched={touched.companyName}
            />

            <Input
              label="ID de Demande"
              name="requestId"
              disabled
              error={errors.requestId}
              touched={touched.requestId}
            />

            <Select
              label="Compte Bancaire"
              name="bankAccount"
              options={bankAccountOptions}
              error={errors.bankAccount}
              touched={touched.bankAccount}
              disabled={!client}
            />
          </Form>
        );
      }}
    </Formik>
  );
};