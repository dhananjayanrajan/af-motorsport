export const dictionary = {
  host: { en: 'Organization', es: 'Organización', pt: 'Organização' },
  hostPlural: { en: 'Organizations', es: 'Organizaciones', pt: 'Organizações' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Oracle Red Bull Racing',
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. Red Bull',
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
    },
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      fields: {
        identifier: {
          name: 'identifier',
          label: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
          description: { en: 'Identification data', es: 'Datos de identificación', pt: 'Dados de identificação' },
          fields: {
            code: { label: { en: 'Code', es: 'Código', pt: 'Código' } },
            abbreviation: { label: { en: 'Abbreviation', es: 'Abreviatura', pt: 'Abreviatura' } },
            registration: { label: { en: 'Registration', es: 'Registro', pt: 'Registro' } },
          },
        },
        description: { label: { en: 'Description', es: 'Descripción', pt: 'Descrição' } },
        tagline: { label: { en: 'Tagline', es: 'Eslogan', pt: 'Slogan' } },
      },
    },
    details: {
      name: 'details',
      label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
      fields: {
        narrative: { label: { en: 'Narrative', es: 'Narrativa', pt: 'Narrativa' } },
        background: { label: { en: 'Background', es: 'Antecedentes', pt: 'Antecedentes' } },
        parent: { label: { en: 'Parent', es: 'Padre', pt: 'Pai' } },
        evolution: {
          name: 'evolution',
          label: { en: 'Evolution', es: 'Evolución', pt: 'Evolução' },
          entity: { en: 'Evolution', es: 'Evolución', pt: 'Evolução' },
          description: { en: 'Institutional evolution', es: 'Evolución institucional', pt: 'Evolução institucional' },
          fields: {
            founded: { label: { en: 'Founded', es: 'Fundado', pt: 'Fundado' } },
            merged: { label: { en: 'Merged', es: 'Fusionado', pt: 'Mesclado' } },
            rebranded: { label: { en: 'Rebranded', es: 'Rebrandeado', pt: 'Rebrandeado' } },
            defunct: { label: { en: 'Defunct', es: 'Defuncto', pt: 'Extinto' } },
          },
        },
      },
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      fields: {
        channels: { label: { en: 'Channels', es: 'Canales', pt: 'Canais' } },
        reputation: {
          name: 'reputation',
          label: { en: 'Reputation', es: 'Reputación', pt: 'Reputação' },
          entity: { en: 'Reputation', es: 'Reputación', pt: 'Reputação' },
          description: { en: 'Market reputation', es: 'Reputación de mercado', pt: 'Reputação de mercado' },
          fields: {
            prestige: { label: { en: 'Prestige', es: 'Prestigio', pt: 'Prestígio' } },
            reliability: { label: { en: 'Reliability', es: 'Fiabilidad', pt: 'Confiabilidade' } },
            innovation: { label: { en: 'Innovation', es: 'Innovación', pt: 'Inovação' } },
          },
        },
        benefits: {
          label: { en: 'Benefits', es: 'Beneficios', pt: 'Benefícios' },
          description: { en: 'Partner benefits.', es: 'Beneficios de socio.', pt: 'Benefícios de parceiro.' },
          fields: {
            benefit: { label: { en: 'Benefit', es: 'Beneficio', pt: 'Benefício' } },
            type: { label: { en: 'Type', es: 'Tipo', pt: 'Tipo' } },
            impact: { label: { en: 'Impact', es: 'Impacto', pt: 'Impacto' } },
          },
        },
      },
    },
    assets: {
      name: 'assets',
      label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
      fields: {
        logo: { label: { en: 'Logo', es: 'Logo', pt: 'Logo' } },
        gallery: { label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' } },
      },
    },
    contexts: {
      name: 'contexts',
      label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
      fields: {
        headquarters: { label: { en: 'Headquarters', es: 'Sede', pt: 'Sede' } },
        history: { label: { en: 'History', es: 'Historia', pt: 'História' } },
        notes: { label: { en: 'Notes', es: 'Notas', pt: 'Notas' } },
      },
    },
  },
} as const
