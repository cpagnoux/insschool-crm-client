import React from 'react';
import { Typography } from '@material-ui/core';

const PreRegistrationInfo: React.FC = () => (
  <Typography variant="body2">
    <p>Pièces à fournir :</p>
    <ul>
      <li>
        {"2 photos d'identité"}
      </li>
      <li>
        {"1 attestation d'assurance"}
      </li>
      <li>1 certificat médical</li>
      <li>1 enveloppe timbrée à votre adresse</li>
    </ul>
  </Typography>
);

export default PreRegistrationInfo;
