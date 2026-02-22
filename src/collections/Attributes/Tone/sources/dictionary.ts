// FILE: src/collections/Attributes/Tones/sources/dictionary.ts
export const dictionary = {
  host: { en: 'Tone', es: 'Tono', pt: 'Tom' },
  hostPlural: { en: 'Tones', es: 'Tonos', pt: 'Tons' },
  essential: {
    name: {
      label: { en: 'Name', es: 'Nombre', pt: 'Nome' },
      placeholder: 'e.g. Formal',
      description: { en: 'Tone name.', es: 'Nombre del tono.', pt: 'Nome do tom.' }
    },
    alias: {
      label: { en: 'Alias', es: 'Alias', pt: 'Alias' },
      placeholder: 'e.g. Official',
      description: { en: 'Tone alias.', es: 'Alias del tono.', pt: 'Alias do tom.' }
    },
    type: {
      label: { en: 'Type', es: 'Tipo', pt: 'Tipo' },
      placeholder: 'Select type',
      description: { en: 'Tone type.', es: 'Tipo de tono.', pt: 'Tipo de tom.' }
    }
  },
  tabs: {
    basics: {
      name: 'basics',
      label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
      entity: { en: 'Tone', es: 'Tono', pt: 'Tom' },
      description: { en: 'Basic info.', es: 'Info básica.', pt: 'Info básica.' },
      fields: {
        description: {
          label: { en: 'Description', es: 'Descripción', pt: 'Descrição' },
          placeholder: 'Enter description',
          description: { en: 'Tone description.', es: 'Descripción del tono.', pt: 'Descrição do tom.' }
        }
      }
    },
    traits: {
      name: 'traits',
      label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
      entity: { en: 'Tone', es: 'Tono', pt: 'Tom' },
      description: { en: 'Tone traits.', es: 'Rasgos del tono.', pt: 'Traços do tom.' },
      scope: {
        name: 'scope',
        label: { en: 'Scope', es: 'Alcance', pt: 'Escopo' },
        entity: { en: 'Scope', es: 'Alcance', pt: 'Escopo' },
        description: { en: 'Scope details.', es: 'Detalles del alcance.', pt: 'Detalhes do escopo.' },
        fields: {
          significance: { label: { en: 'Significance', es: 'Significancia', pt: 'Significância' }, description: { en: 'Scope significance.', es: 'Significancia del alcance.', pt: 'Significância do escopo.' } },
          scale: { label: { en: 'Scale', es: 'Escala', pt: 'Escala' }, description: { en: 'Scope scale.', es: 'Escala del alcance.', pt: 'Escala do escopo.' } },
          depth: { label: { en: 'Depth', es: 'Profundidad', pt: 'Profundidade' }, description: { en: 'Scope depth.', es: 'Profundidad del alcance.', pt: 'Profundidade do escopo.' } }
        }
      },
      qualities: {
        label: { en: 'Qualities', es: 'Cualidades', pt: 'Qualidades' },
        description: { en: 'Tonal qualities.', es: 'Cualidades tonales.', pt: 'Qualidades tonais.' },
        fields: {
          quality: { label: { en: 'Quality', es: 'Cualidad', pt: 'Qualidade' }, description: { en: 'Quality type.', es: 'Tipo de cualidad.', pt: 'Tipo de qualidade.' } },
          intensity: { label: { en: 'Intensity', es: 'Intensidad', pt: 'Intensidade' }, description: { en: 'Intensity level.', es: 'Nivel de intensidad.', pt: 'Nível de intensidade.' } },
          mood: { label: { en: 'Mood', es: 'Estado de Ánimo', pt: 'Humor' }, description: { en: 'Associated mood.', es: 'Estado de ánimo asociado.', pt: 'Humor associado.' } },
          scale: { label: { en: 'Scale', es: 'Escala', pt: 'Escala' }, description: { en: 'Quality scale.', es: 'Escala de cualidad.', pt: 'Escala de qualidade.' } }
        }
      }
    }
  }
} as const
