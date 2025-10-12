const STORAGE_KEY = 'ZEYNE_STATE_V1';

const ENCOURAGEMENT_MESSAGES = [
  'Bravo — 3/3 accomplies. Tu as tenu ton focus aujourd\'hui.',
  'Yes ! Journée validée ✨ Reviens demain avec le même élan.',
  'Objectif du jour atteint ✅ Tu avances, continue.',
  'Bien joué — tes 3 micro-tâches sont faites.',
  'Constance +1. Demain, on recommence.'
];

const BADGE_DEFINITIONS = [
  { id: 'bronze', label: 'Bronze', threshold: 3, icon: '🥉' },
  { id: 'silver', label: 'Argent', threshold: 7, icon: '🥈' },
  { id: 'gold', label: 'Or', threshold: 14, icon: '🥇' },
  { id: 'platinum', label: 'Platine', threshold: 30, icon: '🏆' }
];

const MOOD_DETAILS = {
  sad: { emoji: '😞', label: 'Bas' },
  tired: { emoji: '😴', label: 'Fatigué' },
  sick: { emoji: '🤒', label: 'Fragile' },
  happy: { emoji: '🙂', label: 'Positif' }
};

const AUDIO_DB_NAME = 'ZEYNE_AUDIO_DB';
const AUDIO_DB_VERSION = 1;
const AUDIO_STORE_NAME = 'audios';

const AUDIO_CATEGORIES = [
  { id: 'respiration', label: 'Respiration' },
  { id: 'etirements', label: 'Étirements' },
  { id: 'focus', label: 'Focus' },
  { id: 'autre', label: 'Autre' }
];

const DEFAULT_AUDIO_SLOTS = [
  { key: 'morning', label: 'Matin' },
  { key: 'afternoon', label: 'Après-midi' },
  { key: 'evening', label: 'Soir' }
];

const PROGRAMME_SLOT_KEYS = ['morning', 'afternoon', 'evening'];
const PROGRAMME_SLOT_LABELS = {
  morning: 'Matin',
  afternoon: 'Après-midi',
  evening: 'Soir'
};

const PROGRAMME_DEFAULT_AUDIO = {
  morning: 'builtin-respiration',
  afternoon: 'Aucun',
  evening: 'builtin-etirements'
};

const QUICK_ADD_SLOT_MOMENTS = ['Matin', 'Après-midi', 'Soir'];
const QUICK_ADD_MOMENT_DEFAULT_AUDIO = {
  'Matin': 'builtin-respiration',
  'Après-midi': 'Aucun',
  'Soir': 'builtin-etirements'
};
const QUICK_ADD_MOMENT_DEFAULT_TIME = {
  'Matin': '11:45',
  'Après-midi': '17:45',
  'Soir': '21:45'
};

const ENABLE_CHALLENGE = true;
const ENABLE_SOCIAL_LIVE = false;

const CHALLENGE_DAY_COUNT = 7;
const CHALLENGE_MIN_TASKS_SUCCESS = 2;
const CHALLENGE_MIN_SESSION_SECONDS = 20 * 60;
const CHALLENGE_MIN_TIMER_SECONDS_VALIDATION = 10 * 60;
const CHALLENGE_MIN_LATENCY_SECONDS = 60;
const CHALLENGE_MAX_HISTORY = 5;
const CHALLENGE_CATCHUP_WINDOW_HOURS = 24;
const CHALLENGE_BADGES = [
  { id: 'none', label: '—', threshold: 0, icon: '⬡' },
  { id: 'bronze', label: 'Bronze', threshold: 5, icon: '🥉' },
  { id: 'silver', label: 'Argent', threshold: 6, icon: '🥈' },
  { id: 'gold', label: 'Or', threshold: 7, icon: '👑' }
];

const FIREBASE_CONFIG = {
  // TODO: à remplir quand on activera Firestore
};

const SOCIAL_LOCAL_STORAGE_KEY = 'ZEYNE_SOCIAL_V1';
const SOCIAL_DEFAULT_CHALLENGE_TYPE = 'streak3';
const SOCIAL_MIN_STREAK_FOR_CHALLENGE = 3;

const FOCUS_MOMENT_KEYS = ['morning', 'afternoon', 'evening'];
const FOCUS_DURATION_LIMITS = { min: 5, max: 45, step: 5 };
const FOCUS_DEFAULT_DURATION = { morning: 25, afternoon: 25, evening: 25 };
const FOCUS_SNOOZE_DAYS = 7;
const FOCUS_MUTE_DAYS = 30;

const MOMENT_SUGGESTION_LOOKBACK_DAYS = 14;
const MOMENT_SUGGESTION_MAX_EVENTS = 120;
const MOMENT_SUGGESTION_SNOOZE_DAYS = 7;
const MOMENT_SUGGESTION_MUTE_DAYS = 30;
const MOMENT_SUGGESTION_MIN_EXECUTIONS = 5;
const MOMENT_SUGGESTION_PREFILL_DAYS = 7;

const PROGRAMME_CATEGORIES = [
  {
    id: 'etudes-examens',
    label: 'Études / Examens',
    goal: 'But : couvrir le programme + s’entraîner',
    week: [
      {
        morning: { title: 'Diagnostiquer chapitres faibles → {3} priorités', moment: 'Matin' },
        afternoon: { title: 'Plan semaine + slots', moment: 'Après-midi' },
        evening: { title: 'Quiz global 20’', moment: 'Soir' }
      },
      {
        morning: { title: 'Lecture/fiche Chapitre {X}', moment: 'Matin' },
        afternoon: { title: 'Exos/annales {X} (20–30’)', moment: 'Après-midi' },
        evening: { title: 'Quiz rapide + flashcards', moment: 'Soir' }
      },
      {
        morning: { title: 'Lecture/fiche Chapitre {X}', moment: 'Matin' },
        afternoon: { title: 'Exos/annales {X} (20–30’)', moment: 'Après-midi' },
        evening: { title: 'Quiz rapide + flashcards', moment: 'Soir' }
      },
      {
        morning: { title: 'Lecture/fiche Chapitre {X}', moment: 'Matin' },
        afternoon: { title: 'Exos/annales {X} (20–30’)', moment: 'Après-midi' },
        evening: { title: 'Quiz rapide + flashcards', moment: 'Soir' }
      },
      {
        morning: { title: 'Lecture/fiche Chapitre {X}', moment: 'Matin' },
        afternoon: { title: 'Exos/annales {X} (20–30’)', moment: 'Après-midi' },
        evening: { title: 'Quiz rapide + flashcards', moment: 'Soir' }
      },
      {
        morning: { title: 'Lecture/fiche Chapitre {X}', moment: 'Matin' },
        afternoon: { title: 'Exos/annales {X} (20–30’)', moment: 'Après-midi' },
        evening: { title: 'Quiz rapide + flashcards', moment: 'Soir' }
      },
      {
        morning: { title: 'Synthèse fiches', moment: 'Matin' },
        afternoon: { title: 'Annale complète (1 sujet)', moment: 'Après-midi' },
        evening: { title: 'Révision des erreurs', moment: 'Soir' }
      }
    ]
  },
  {
    id: 'deep-work-pro',
    label: 'Deep work pro / Projet métier',
    goal: 'But : livrer un output clair',
    week: [
      {
        morning: { title: 'Cadrage (livrable, “fini quand…”, critères)', moment: 'Matin' },
        afternoon: { title: 'Plan détaillé', moment: 'Après-midi' },
        evening: { title: 'Pré-requis/ressources', moment: 'Soir' }
      },
      {
        morning: { title: 'Bloc prod A (25–45’)', moment: 'Matin' },
        afternoon: { title: 'Bloc prod B', moment: 'Après-midi' },
        evening: { title: 'Revue + “bloqueurs”', moment: 'Soir' }
      },
      {
        morning: { title: 'Bloc prod A (25–45’)', moment: 'Matin' },
        afternoon: { title: 'Bloc prod B', moment: 'Après-midi' },
        evening: { title: 'Revue + “bloqueurs”', moment: 'Soir' }
      },
      {
        morning: { title: 'Bloc prod A (25–45’)', moment: 'Matin' },
        afternoon: { title: 'Bloc prod B', moment: 'Après-midi' },
        evening: { title: 'Revue + “bloqueurs”', moment: 'Soir' }
      },
      {
        morning: { title: 'Bloc prod A (25–45’)', moment: 'Matin' },
        afternoon: { title: 'Bloc prod B', moment: 'Après-midi' },
        evening: { title: 'Revue + “bloqueurs”', moment: 'Soir' }
      },
      {
        morning: { title: 'Intégration A+B', moment: 'Matin' },
        afternoon: { title: 'Qualité (checklist)', moment: 'Après-midi' },
        evening: { title: 'Pré-livrable', moment: 'Soir' }
      },
      {
        morning: { title: 'Finalisation', moment: 'Matin' },
        afternoon: { title: 'Envoi/démo', moment: 'Après-midi' },
        evening: { title: 'Rétro + next steps', moment: 'Soir' }
      }
    ]
  },
  {
    id: 'creation-contenu',
    label: 'Création de contenu',
    goal: 'But : publier 1 pièce',
    week: [
      {
        morning: { title: 'Idées + angle {thème}', moment: 'Matin' },
        afternoon: { title: 'Plan ou script', moment: 'Après-midi' },
        evening: { title: 'Hooks & titres', moment: 'Soir' }
      },
      {
        morning: { title: 'Tournage/écriture draft', moment: 'Matin' },
        afternoon: { title: 'B-roll/visuels', moment: 'Après-midi' },
        evening: { title: 'Sélection', moment: 'Soir' }
      },
      {
        morning: { title: 'Montage/édition', moment: 'Matin' },
        afternoon: { title: 'Sous-titres/visuels', moment: 'Après-midi' },
        evening: { title: 'Cut final', moment: 'Soir' }
      },
      {
        morning: { title: 'Texte d’accompagnement', moment: 'Matin' },
        afternoon: { title: 'Thumbnail', moment: 'Après-midi' },
        evening: { title: 'Programmation', moment: 'Soir' }
      },
      {
        morning: { title: 'Publication', moment: 'Matin' },
        afternoon: { title: 'Premier feedback', moment: 'Après-midi' },
        evening: { title: 'Ajustements', moment: 'Soir' }
      },
      {
        morning: { title: 'Extraits/recyclage', moment: 'Matin' },
        afternoon: { title: 'Cross-post', moment: 'Après-midi' },
        evening: { title: 'Stats rapides', moment: 'Soir' }
      },
      {
        morning: { title: 'Rétro', moment: 'Matin' },
        afternoon: { title: 'Banque d’idées', moment: 'Après-midi' },
        evening: { title: 'Template prochain', moment: 'Soir' }
      }
    ]
  },
  {
    id: 'business-dev',
    label: 'Business dev / Prospection / Fournisseurs',
    goal: 'But : short-list + 1 avancée',
    week: [
      {
        morning: { title: 'Critères + budget', moment: 'Matin' },
        afternoon: { title: 'Lister {10} pistes', moment: 'Après-midi' },
        evening: { title: 'Prioriser {5}', moment: 'Soir' }
      },
      {
        morning: { title: 'Contacter {3}/jour', moment: 'Matin' },
        afternoon: { title: 'Relances {3}', moment: 'Après-midi' },
        evening: { title: 'Notes/CRM', moment: 'Soir' }
      },
      {
        morning: { title: 'Contacter {3}/jour', moment: 'Matin' },
        afternoon: { title: 'Relances {3}', moment: 'Après-midi' },
        evening: { title: 'Notes/CRM', moment: 'Soir' }
      },
      {
        morning: { title: 'Contacter {3}/jour', moment: 'Matin' },
        afternoon: { title: 'Relances {3}', moment: 'Après-midi' },
        evening: { title: 'Notes/CRM', moment: 'Soir' }
      },
      {
        morning: { title: 'Comparer devis', moment: 'Matin' },
        afternoon: { title: 'Négocier {2}', moment: 'Après-midi' },
        evening: { title: 'Décision provisoire', moment: 'Soir' }
      },
      {
        morning: { title: 'Test échantillon', moment: 'Matin' },
        afternoon: { title: 'Évaluation', moment: 'Après-midi' },
        evening: { title: 'Risques & plan B', moment: 'Soir' }
      },
      {
        morning: { title: 'Choix', moment: 'Matin' },
        afternoon: { title: 'Next steps (contrat/délais)', moment: 'Après-midi' },
        evening: { title: 'Récap', moment: 'Soir' }
      }
    ]
  },
  {
    id: 'recherche-emploi',
    label: 'Recherche d’emploi / Portfolio',
    goal: 'But : candidatures de qualité + entretiens prêts',
    week: [
      {
        morning: { title: 'Ciblage {rôles/secteurs}', moment: 'Matin' },
        afternoon: { title: 'CV & LinkedIn', moment: 'Après-midi' },
        evening: { title: 'Pitch 30”', moment: 'Soir' }
      },
      {
        morning: { title: 'Candidatures ciblées {3}/jour', moment: 'Matin' },
        afternoon: { title: 'Personnalisation mail', moment: 'Après-midi' },
        evening: { title: 'Suivi tableau', moment: 'Soir' }
      },
      {
        morning: { title: 'Candidatures ciblées {3}/jour', moment: 'Matin' },
        afternoon: { title: 'Personnalisation mail', moment: 'Après-midi' },
        evening: { title: 'Suivi tableau', moment: 'Soir' }
      },
      {
        morning: { title: 'Candidatures ciblées {3}/jour', moment: 'Matin' },
        afternoon: { title: 'Personnalisation mail', moment: 'Après-midi' },
        evening: { title: 'Suivi tableau', moment: 'Soir' }
      },
      {
        morning: { title: 'Préparer questions', moment: 'Matin' },
        afternoon: { title: 'Étude de cas', moment: 'Après-midi' },
        evening: { title: 'Simulation', moment: 'Soir' }
      },
      {
        morning: { title: 'Portfolio/échantillons', moment: 'Matin' },
        afternoon: { title: 'Références', moment: 'Après-midi' },
        evening: { title: 'Relances', moment: 'Soir' }
      },
      {
        morning: { title: 'Bilan', moment: 'Matin' },
        afternoon: { title: 'Plan S+1', moment: 'Après-midi' },
        evening: { title: 'Repos actif', moment: 'Soir' }
      }
    ]
  },
  {
    id: 'apprentissage',
    label: 'Apprentissage (Langue / Tech / Code)',
    goal: 'But : progression mesurable + mini-projet',
    week: [
      {
        morning: { title: 'Diagnostic (test)', moment: 'Matin' },
        afternoon: { title: 'Plan micro-objectifs', moment: 'Après-midi' },
        evening: { title: 'Vocab/Concepts clés', moment: 'Soir' }
      },
      {
        morning: { title: 'Leçon {n}', moment: 'Matin' },
        afternoon: { title: 'Pratique/exos {20–30’}', moment: 'Après-midi' },
        evening: { title: 'Quiz/flashcards', moment: 'Soir' }
      },
      {
        morning: { title: 'Leçon {n}', moment: 'Matin' },
        afternoon: { title: 'Pratique/exos {20–30’}', moment: 'Après-midi' },
        evening: { title: 'Quiz/flashcards', moment: 'Soir' }
      },
      {
        morning: { title: 'Leçon {n}', moment: 'Matin' },
        afternoon: { title: 'Pratique/exos {20–30’}', moment: 'Après-midi' },
        evening: { title: 'Quiz/flashcards', moment: 'Soir' }
      },
      {
        morning: { title: 'Leçon {n}', moment: 'Matin' },
        afternoon: { title: 'Pratique/exos {20–30’}', moment: 'Après-midi' },
        evening: { title: 'Quiz/flashcards', moment: 'Soir' }
      },
      {
        morning: { title: 'Mini-projet {X}', moment: 'Matin' },
        afternoon: { title: 'Débogage/retours', moment: 'Après-midi' },
        evening: { title: 'README/récap', moment: 'Soir' }
      },
      {
        morning: { title: 'Révision espacée', moment: 'Matin' },
        afternoon: { title: 'Démo perso', moment: 'Après-midi' },
        evening: { title: 'Plan semaine suivante', moment: 'Soir' }
      }
    ]
  },
  {
    id: 'sante-fitness-leger',
    label: 'Santé / Fitness léger',
    goal: 'But : routine douce, régulière',
    week: [
      ...Array.from({ length: 7 }).map(() => ({
        morning: { title: 'Échauffement 8–10’', moment: 'Matin' },
        afternoon: { title: 'Session {10–20’} (marche/HIIT doux/yoga)', moment: 'Après-midi' },
        evening: { title: 'Étirements + hydratation + note RPE', moment: 'Soir' }
      }))
    ]
  },
  {
    id: 'organisation-maison',
    label: 'Organisation maison / Désencombrement',
    goal: 'But : zones visibles + sorties réelles',
    week: [
      {
        morning: { title: 'Zone 1', moment: 'Matin' },
        afternoon: { title: 'Tri (garder/jeter/donner)', moment: 'Après-midi' },
        evening: { title: 'Sortie sacs', moment: 'Soir' }
      },
      {
        morning: { title: 'Zone 2', moment: 'Matin' },
        afternoon: { title: 'Tri', moment: 'Après-midi' },
        evening: { title: 'Sortie', moment: 'Soir' }
      },
      {
        morning: { title: 'Zone 3', moment: 'Matin' },
        afternoon: { title: 'Tri', moment: 'Après-midi' },
        evening: { title: 'Sortie', moment: 'Soir' }
      },
      {
        morning: { title: 'Zone 4', moment: 'Matin' },
        afternoon: { title: 'Tri', moment: 'Après-midi' },
        evening: { title: 'Sortie', moment: 'Soir' }
      },
      {
        morning: { title: 'Zone 5', moment: 'Matin' },
        afternoon: { title: 'Tri', moment: 'Après-midi' },
        evening: { title: 'Sortie', moment: 'Soir' }
      },
      {
        morning: { title: 'Zone 6', moment: 'Matin' },
        afternoon: { title: 'Tri', moment: 'Après-midi' },
        evening: { title: 'Sortie', moment: 'Soir' }
      },
      {
        morning: { title: 'Surfaces/finition', moment: 'Matin' },
        afternoon: { title: 'Don/vente', moment: 'Après-midi' },
        evening: { title: 'Système d’entretien 10’/jour', moment: 'Soir' }
      }
    ]
  },
  {
    id: 'admin-finances',
    label: 'Admin & Finances perso',
    goal: 'But : vision claire + automatisation simple',
    week: [
      {
        morning: { title: 'Collecter docs', moment: 'Matin' },
        afternoon: { title: 'Catégoriser', moment: 'Après-midi' },
        evening: { title: 'Liste manques', moment: 'Soir' }
      },
      {
        morning: { title: 'Budget mensuel', moment: 'Matin' },
        afternoon: { title: 'Objectifs {épargne/dette}', moment: 'Après-midi' },
        evening: { title: 'Règles simples', moment: 'Soir' }
      },
      {
        morning: { title: 'Automatisations', moment: 'Matin' },
        afternoon: { title: 'Négocier {1} facture', moment: 'Après-midi' },
        evening: { title: 'Vérifs', moment: 'Soir' }
      },
      {
        morning: { title: 'Dossiers en retard', moment: 'Matin' },
        afternoon: { title: 'Soumissions', moment: 'Après-midi' },
        evening: { title: 'Suivi', moment: 'Soir' }
      },
      {
        morning: { title: 'Assurance/review', moment: 'Matin' },
        afternoon: { title: 'Check impôts', moment: 'Après-midi' },
        evening: { title: 'Notes', moment: 'Soir' }
      },
      {
        morning: { title: 'Consolider fichiers', moment: 'Matin' },
        afternoon: { title: 'Tableur propre', moment: 'Après-midi' },
        evening: { title: 'Backup', moment: 'Soir' }
      },
      {
        morning: { title: 'Bilan', moment: 'Matin' },
        afternoon: { title: 'Plan S+1', moment: 'Après-midi' },
        evening: { title: 'Repos', moment: 'Soir' }
      }
    ]
  },
  {
    id: 'ecriture-creatif',
    label: 'Écriture / Créatif',
    goal: 'But : 1 texte “diffusable”',
    week: [
      {
        morning: { title: 'Idée + promesse', moment: 'Matin' },
        afternoon: { title: 'Plan', moment: 'Après-midi' },
        evening: { title: 'Recherche', moment: 'Soir' }
      },
      {
        morning: { title: 'Draft brut', moment: 'Matin' },
        afternoon: { title: 'Développement', moment: 'Après-midi' },
        evening: { title: 'Exemples', moment: 'Soir' }
      },
      {
        morning: { title: 'Draft brut', moment: 'Matin' },
        afternoon: { title: 'Développement', moment: 'Après-midi' },
        evening: { title: 'Exemples', moment: 'Soir' }
      },
      {
        morning: { title: 'Réécriture (clarté)', moment: 'Matin' },
        afternoon: { title: 'Couper 20%', moment: 'Après-midi' },
        evening: { title: 'Titres/accroches', moment: 'Soir' }
      },
      {
        morning: { title: 'Édition fine', moment: 'Matin' },
        afternoon: { title: 'Beta-lecture', moment: 'Après-midi' },
        evening: { title: 'Intégrer retours', moment: 'Soir' }
      },
      {
        morning: { title: 'Mise en forme', moment: 'Matin' },
        afternoon: { title: 'Publication/submit', moment: 'Après-midi' },
        evening: { title: 'Partage', moment: 'Soir' }
      },
      {
        morning: { title: 'Rétro + swipe file', moment: 'Matin' },
        afternoon: { title: 'Idées suivantes', moment: 'Après-midi' },
        evening: { title: 'Repos', moment: 'Soir' }
      }
    ]
  },
  {
    id: 'bien-etre-mindfulness',
    label: 'Bien-être / Mindfulness',
    goal: 'But : ancrer une routine mentale courte',
    week: [
      ...Array.from({ length: 7 }).map(() => ({
        morning: { title: 'Respiration {3–5’}', moment: 'Matin' },
        afternoon: { title: 'Focus 10’ (timer nuage)', moment: 'Après-midi' },
        evening: { title: 'Journal 3 lignes (humeur, gratitude, micro-pas)', moment: 'Soir' }
      }))
    ]
  },
  {
    id: 'lancement-side-project',
    label: 'Lancement side-project',
    goal: 'But : 1 MVP testable en 7 jours',
    week: [
      {
        morning: { title: 'Problème & persona', moment: 'Matin' },
        afternoon: { title: 'Hypothèse', moment: 'Après-midi' },
        evening: { title: 'Scope MVP', moment: 'Soir' }
      },
      {
        morning: { title: 'Maquette ultra simple', moment: 'Matin' },
        afternoon: { title: 'NRF mini', moment: 'Après-midi' },
        evening: { title: 'Plan dev', moment: 'Soir' }
      },
      {
        morning: { title: 'Dev core', moment: 'Matin' },
        afternoon: { title: 'Intégrations min', moment: 'Après-midi' },
        evening: { title: 'Tests manuels', moment: 'Soir' }
      },
      {
        morning: { title: 'Dev core', moment: 'Matin' },
        afternoon: { title: 'Intégrations min', moment: 'Après-midi' },
        evening: { title: 'Tests manuels', moment: 'Soir' }
      },
      {
        morning: { title: 'Landing page', moment: 'Matin' },
        afternoon: { title: 'FAQ/prix', moment: 'Après-midi' },
        evening: { title: 'Setup feedback', moment: 'Soir' }
      },
      {
        morning: { title: 'Lancement discret {10 personnes}', moment: 'Matin' },
        afternoon: { title: 'Suivi', moment: 'Après-midi' },
        evening: { title: 'Fixes rapides', moment: 'Soir' }
      },
      {
        morning: { title: 'Bilan métriques', moment: 'Matin' },
        afternoon: { title: 'Priorités S+1', moment: 'Après-midi' },
        evening: { title: 'Message annonce', moment: 'Soir' }
      }
    ]
  },
  {
    id: 'autres',
    label: 'Autres',
    goal: 'Template universel — personnalisez votre objectif',
    week: [
      {
        morning: { title: 'Clarifier (verbe d’action + “fini quand…”)', moment: 'Matin' },
        afternoon: { title: '', moment: 'Après-midi' },
        evening: { title: '', moment: 'Soir' }
      },
      {
        morning: { title: 'Préparer 5’', moment: 'Matin' },
        afternoon: { title: 'Action 10–20’', moment: 'Après-midi' },
        evening: { title: 'Prochain micro-pas', moment: 'Soir' }
      },
      {
        morning: { title: 'Préparer 5’', moment: 'Matin' },
        afternoon: { title: 'Action 10–20’', moment: 'Après-midi' },
        evening: { title: 'Prochain micro-pas', moment: 'Soir' }
      },
      {
        morning: { title: 'Préparer 5’', moment: 'Matin' },
        afternoon: { title: 'Action 10–20’', moment: 'Après-midi' },
        evening: { title: 'Prochain micro-pas', moment: 'Soir' }
      },
      {
        morning: { title: 'Préparer 5’', moment: 'Matin' },
        afternoon: { title: 'Action 10–20’', moment: 'Après-midi' },
        evening: { title: 'Prochain micro-pas', moment: 'Soir' }
      },
      {
        morning: { title: 'Préparer 5’', moment: 'Matin' },
        afternoon: { title: 'Action 10–20’', moment: 'Après-midi' },
        evening: { title: 'Prochain micro-pas', moment: 'Soir' }
      },
      {
        morning: { title: 'Bilan', moment: 'Matin' },
        afternoon: { title: 'Plan S+1', moment: 'Après-midi' },
        evening: { title: 'Repos', moment: 'Soir' }
      }
    ]
  }
];

function getProgrammeCategoryById(categoryId) {
  if (!PROGRAMME_CATEGORIES.length) {
    return null;
  }
  return PROGRAMME_CATEGORIES.find(category => category.id === categoryId) || PROGRAMME_CATEGORIES[0];
}

function getDefaultProgrammeCategoryId() {
  return PROGRAMME_CATEGORIES[0] ? PROGRAMME_CATEGORIES[0].id : 'autres';
}

function isAudioAvailable(audioId) {
  if (!audioId || audioId === 'Aucun') {
    return true;
  }
  return Boolean(getAudioEntryById(audioId));
}

function resolveDefaultRitualAudio(slotKey) {
  const preferred = PROGRAMME_DEFAULT_AUDIO[slotKey];
  if (!preferred || preferred === 'Aucun') {
    return 'Aucun';
  }
  return isAudioAvailable(preferred) ? preferred : 'Aucun';
}

function normalizeProgrammeMode(mode) {
  return mode === 'structure' ? 'structure' : 'content';
}

function formatProgrammeModeLabel(mode) {
  return normalizeProgrammeMode(mode) === 'structure'
    ? 'Organisation seule'
    : 'Organisation + Contenu';
}

function buildProgrammeDayTasks(dayData, mode) {
  const normalizedMode = normalizeProgrammeMode(mode);
  return PROGRAMME_SLOT_KEYS.map(slotKey => {
    const slot = dayData && dayData[slotKey] ? dayData[slotKey] : {};
    const momentLabel = slot.moment || PROGRAMME_SLOT_LABELS[slotKey];
    const audioValue = slot.audio || resolveDefaultRitualAudio(slotKey);
    return {
      title: normalizedMode === 'structure' ? '' : (slot.title || ''),
      moment: momentLabel,
      audio: audioValue,
      duration: null,
      usesDefaultDuration: true
    };
  });
}

function buildProgrammeTemplate(categoryId, mode) {
  const category = getProgrammeCategoryById(categoryId) || { id: 'autres', label: 'Autres', goal: '', week: [] };
  const normalizedMode = normalizeProgrammeMode(mode);
  const week = Array.isArray(category.week)
    ? category.week.map(day => ({
        morning: { ...(day?.morning || {}) },
        afternoon: { ...(day?.afternoon || {}) },
        evening: { ...(day?.evening || {}) }
      }))
    : [];

  const firstDayTasks = week.length ? buildProgrammeDayTasks(week[0], normalizedMode) : [];

  return {
    template: {
      id: `programme-${category.id}`,
      name: category.label,
      description: category.goal,
      week,
      tasks: firstDayTasks
    },
    category,
    mode: normalizedMode
  };
}

const BUILTIN_AUDIOS = [
  {
    id: 'builtin-respiration',
    title: 'Respiration guidée 4-7-8',
    category: 'respiration',
    duration: 90,
    sourceType: 'builtin',
    source: 'assets/audio/respiration.wav',
    isBuiltin: true
  },
  {
    id: 'builtin-etirements',
    title: 'Étirements express',
    category: 'etirements',
    duration: 95,
    sourceType: 'builtin',
    source: 'assets/audio/etirements.wav',
    isBuiltin: true
  }
];

const REPORT_REASON_DETAILS = {
  trop_gros: {
    label: 'Trop gros',
    recommendation: 'Scinde ton objectif : prépare, fais 10 min, puis note la suite.'
  },
  pas_clair: {
    label: 'Pas clair',
    recommendation: 'Clarifie le “fini quand…” avec 3 critères concrets.'
  },
  pas_le_temps: {
    label: 'Pas le temps',
    recommendation: 'Passe en version 10 min et décale doucement au prochain créneau.'
  },
  faible_energie: {
    label: 'Faible énergie',
    recommendation: 'Choisis une variante low-energy pour garder la dynamique.'
  }
};

const MICROPAS_STOPWORDS = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'dans', 'pour', 'avec', 'sur', 'en', 'et', 'ou', 'au', 'aux', 'ce', 'ces',
  'cet', 'cette', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'nos', 'notre', 'vos', 'votre', 'leurs', 'leur',
  'plus', 'moins', 'que', 'qui', 'quoi', 'quand', 'comment', 'est', 'suis', 'sont', 'etre', 'être', 'par', 'une', 'deux', 'trois'
]);

const MICROPAS_SUGGESTIONS = {
  trop_gros: {
    id: 'scinder-mini-blocs',
    label: 'Scinder en mini-blocs',
    micropasText: "Préparer 5’ (rassembler ce qu’il faut)\nFaire 10’ la partie 1/3\nClore 5’ (note prochaine étape)",
    durationSingleSlot: 10,
    defaultDuration: 25
  },
  pas_clair: {
    id: 'clarifier-fini-quand',
    label: 'Clarifier le fini-quand',
    micropasText: 'Clarifier “fini quand…” → lister 3 critères précis',
    duration: 15
  },
  pas_le_temps: {
    id: 'version-10-min',
    label: 'Version 10 minutes + décalage doux',
    micropasText: 'Passer en sprint de 10 minutes et replanifier sur le prochain créneau libre',
    duration: 10
  },
  faible_energie: {
    id: 'low-energy-alternatif',
    label: 'Low-energy alternatif',
    micropasText: 'Variante douce : lecture légère, tri ou préparation pendant 10 minutes',
    duration: 10
  }
};

const DAY_LABELS_SHORT = ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'];

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const NOTIFICATION_SLOT_DETAILS = {
  morning: { label: 'Matin', defaultTime: '09:00' },
  afternoon: { label: 'Après-midi', defaultTime: '14:00' },
  evening: { label: 'Soir', defaultTime: '19:00' }
};

const NOTIFICATION_SNOOZE_MINUTES = 10;
const MAX_TIMEOUT_DELAY = 2147483647;

function getLocalTimezone() {
  try {
    const options = Intl.DateTimeFormat().resolvedOptions();
    if (options && typeof options.timeZone === 'string' && options.timeZone) {
      return options.timeZone;
    }
  } catch (error) {
    console.warn('Impossible de déterminer le fuseau horaire', error);
  }
  return 'UTC';
}

function createDefaultNotificationsState() {
  return {
    enabled: true,
    timezone: getLocalTimezone(),
    slots: {
      morning: { enabled: true, time: NOTIFICATION_SLOT_DETAILS.morning.defaultTime },
      afternoon: { enabled: true, time: NOTIFICATION_SLOT_DETAILS.afternoon.defaultTime },
      evening: { enabled: true, time: NOTIFICATION_SLOT_DETAILS.evening.defaultTime }
    },
    dnd: { enabled: false, start: '22:00', end: '07:00' },
    sound: { beep: true }
  };
}

function createDefaultFocusAdaptiveState() {
  return {
    enabled: true,
    defaultDurationByMoment: { ...FOCUS_DEFAULT_DURATION },
    snoozeUntil: { morning: null, afternoon: null, evening: null },
    muteUntil: { morning: null, afternoon: null, evening: null },
    momentStreaks: {
      morning: { success: 0, failure: 0 },
      afternoon: { success: 0, failure: 0 },
      evening: { success: 0, failure: 0 }
    },
    momentResetAt: { morning: null, afternoon: null, evening: null },
    taskOutcomes: []
  };
}

function createDefaultMomentSuggestionState() {
  return {
    events: [],
    snoozeUntil: { morning: null, afternoon: null, evening: null },
    muteUntil: { morning: null, afternoon: null, evening: null },
    lastSuccessfulMoment: null,
    lastComputedDate: null,
    cachedSuggestion: null,
    prefill: null
  };
}

function createDefaultStreakState() {
  return {
    current: 0,
    best: 0,
    lastCountedDay: null,
    daysDone: []
  };
}

function createDefaultBadgesState() {
  return {
    unlocked: []
  };
}

function createDefaultChallengeState() {
  return {
    current: null,
    history: [],
    notifications: {
      lastMorning: null,
      lastEvening: null,
      successDays: [],
      completionShownFor: null
    }
  };
}

function getChallengeBadgeDefinitionById(id) {
  return CHALLENGE_BADGES.find(badge => badge.id === id) || CHALLENGE_BADGES[0];
}

function determineChallengeBadgeId(score) {
  let resolved = 'none';
  CHALLENGE_BADGES.forEach(badge => {
    if (score >= badge.threshold) {
      resolved = badge.id;
    }
  });
  return resolved;
}

function generateChallengeId() {
  return `challenge-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function createChallengeParticipant({ uid, displayName, type = 'friend' } = {}) {
  const normalizedUid = typeof uid === 'string' && uid.trim() ? uid.trim() : `participant-${Math.random().toString(36).slice(2, 9)}`;
  const label = typeof displayName === 'string' && displayName.trim() ? displayName.trim() : 'Participant';
  return {
    uid: normalizedUid,
    displayName: label,
    type: type === 'self' ? 'self' : 'friend',
    score: 0,
    streak: 0,
    timeline: Array(CHALLENGE_DAY_COUNT).fill('pending'),
    cheers: 0,
    lastActivityAt: new Date().toISOString()
  };
}

function normalizeChallengeParticipant(participant) {
  if (!participant || typeof participant !== 'object') {
    return null;
  }
  const base = createChallengeParticipant({ uid: participant.uid, displayName: participant.displayName, type: participant.type });
  if (Array.isArray(participant.timeline)) {
    base.timeline = participant.timeline.slice(0, CHALLENGE_DAY_COUNT).map(status => {
      return ['pending', 'success', 'fail', 'catchup'].includes(status) ? status : 'pending';
    });
    while (base.timeline.length < CHALLENGE_DAY_COUNT) {
      base.timeline.push('pending');
    }
  }
  const score = Number(participant.score);
  if (Number.isFinite(score) && score >= 0) {
    base.score = Math.min(CHALLENGE_DAY_COUNT, Math.round(score));
  }
  const streak = Number(participant.streak);
  if (Number.isFinite(streak) && streak >= 0) {
    base.streak = Math.round(streak);
  }
  const cheers = Number(participant.cheers);
  if (Number.isFinite(cheers) && cheers >= 0) {
    base.cheers = Math.round(cheers);
  }
  base.lastActivityAt = typeof participant.lastActivityAt === 'string' ? participant.lastActivityAt : base.lastActivityAt;
  return base;
}

function normalizeChallengeDay(day, index = 0, startDate = null) {
  const allowedStatuses = ['pending', 'success', 'fail', 'catchup'];
  let dateStr = typeof day?.date === 'string' ? day.date : null;
  if ((!dateStr || !isValidISODate(dateStr)) && startDate && isValidISODate(startDate)) {
    const baseDate = parseISODate(startDate);
    if (baseDate) {
      baseDate.setDate(baseDate.getDate() + index);
      dateStr = baseDate.toISOString().split('T')[0];
    }
  }
  const status = allowedStatuses.includes(day?.status) ? day.status : 'pending';
  return {
    date: dateStr,
    status,
    usedJoker: day?.usedJoker === true,
    completedAt: typeof day?.completedAt === 'string' ? day.completedAt : null,
    failRecordedAt: typeof day?.failRecordedAt === 'string' ? day.failRecordedAt : null,
    catchupExpiresAt: typeof day?.catchupExpiresAt === 'string' ? day.catchupExpiresAt : null,
    catchupCompletedAt: typeof day?.catchupCompletedAt === 'string' ? day.catchupCompletedAt : null
  };
}

function normalizeChallenge(challenge) {
  if (!challenge || typeof challenge !== 'object') {
    return null;
  }

  const startDate = isValidISODate(challenge.startDate) ? challenge.startDate : getToday();
  const createdAt = typeof challenge.createdAt === 'string' ? challenge.createdAt : new Date().toISOString();
  const updatedAt = typeof challenge.updatedAt === 'string' ? challenge.updatedAt : createdAt;
  const mode = challenge.mode === 'social' ? 'social' : 'solo';
  const ownerUid = typeof challenge.ownerUid === 'string' && challenge.ownerUid.trim()
    ? challenge.ownerUid.trim()
    : 'local-user';

  const days = Array.from({ length: CHALLENGE_DAY_COUNT }, (_, idx) => normalizeChallengeDay(challenge.days?.[idx], idx, startDate));

  const participantUids = Array.isArray(challenge.participantUids)
    ? challenge.participantUids.filter(uid => typeof uid === 'string' && uid.trim()).map(uid => uid.trim())
    : [];

  let participants = Array.isArray(challenge.participants)
    ? challenge.participants.map(normalizeChallengeParticipant).filter(Boolean)
    : [];

  if (!participants.length) {
    participants = [createChallengeParticipant({ uid: ownerUid, displayName: 'Moi', type: 'self' })];
  }

  const score = Number(challenge.score);
  const normalizedScore = Number.isFinite(score) && score >= 0 ? Math.min(CHALLENGE_DAY_COUNT, Math.round(score)) : 0;
  const badge = getChallengeBadgeDefinitionById(challenge.badge)?.id || 'none';
  const allowedStates = ['scheduled', 'active', 'completed'];
  const state = allowedStates.includes(challenge.state) ? challenge.state : 'active';
  const jokerUsed = Boolean(challenge.jokerUsed) || days.some(day => day?.usedJoker);
  const catchupDayEntry = days.find(day => day && day.status === 'catchup');
  const catchupUsed = Boolean(challenge.catchupUsed) || Boolean(catchupDayEntry);

  return {
    id: typeof challenge.id === 'string' && challenge.id.trim() ? challenge.id.trim() : generateChallengeId(),
    ownerUid,
    participantUids,
    participants,
    startDate,
    mode,
    days,
    score: normalizedScore,
    badge,
    state,
    createdAt,
    updatedAt,
    jokerUsed,
    catchupUsed,
    catchupDay: typeof challenge.catchupDay === 'string' ? challenge.catchupDay : (catchupDayEntry?.date || null),
    scheduledStart: typeof challenge.scheduledStart === 'string' ? challenge.scheduledStart : null
  };
}

function ensureChallengeState() {
  if (!ENABLE_CHALLENGE) {
    return false;
  }

  let changed = false;
  if (!state.challenge || typeof state.challenge !== 'object') {
    state.challenge = createDefaultChallengeState();
    return true;
  }

  const challengeState = state.challenge;

  if (!Array.isArray(challengeState.history)) {
    challengeState.history = [];
    changed = true;
  }

  challengeState.history = challengeState.history
    .map(entry => normalizeChallenge(entry))
    .filter(Boolean)
    .slice(0, CHALLENGE_MAX_HISTORY);

  if (!challengeState.notifications || typeof challengeState.notifications !== 'object') {
    challengeState.notifications = {
      lastMorning: null,
      lastEvening: null,
      successDays: [],
      completionShownFor: null
    };
    changed = true;
  } else {
    if (typeof challengeState.notifications.lastMorning !== 'string') {
      challengeState.notifications.lastMorning = null;
      changed = true;
    }
    if (typeof challengeState.notifications.lastEvening !== 'string') {
      challengeState.notifications.lastEvening = null;
      changed = true;
    }
    if (!Array.isArray(challengeState.notifications.successDays)) {
      challengeState.notifications.successDays = [];
      changed = true;
    } else if (challengeState.notifications.successDays.length > 14) {
      challengeState.notifications.successDays = challengeState.notifications.successDays.slice(-14);
      changed = true;
    }
    if (typeof challengeState.notifications.completionShownFor !== 'string') {
      challengeState.notifications.completionShownFor = null;
      changed = true;
    }
  }

  if (challengeState.current) {
    const normalized = normalizeChallenge(challengeState.current);
    if (normalized) {
      const previous = JSON.stringify(challengeState.current);
      const next = JSON.stringify(normalized);
      if (previous !== next) {
        challengeState.current = normalized;
        changed = true;
      }
    } else {
      challengeState.current = null;
      changed = true;
    }
  }

  return changed;
}

function isValidISODate(value) {
  if (typeof value !== 'string') return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const iso = date.toISOString().split('T')[0];
  return iso === value;
}

function sanitizeDaysDoneList(days) {
  if (!Array.isArray(days)) return [];
  const filtered = days.filter(isValidISODate);
  const unique = Array.from(new Set(filtered));
  unique.sort();
  return unique;
}

function differenceInDays(startISO, endISO) {
  if (!isValidISODate(startISO) || !isValidISODate(endISO)) return null;
  const start = new Date(startISO);
  const end = new Date(endISO);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function computeBestStreak(days) {
  const unique = sanitizeDaysDoneList(days);
  if (!unique.length) return 0;

  let best = 0;
  let current = 0;
  let previous = null;

  unique.forEach(dayStr => {
    if (previous === null) {
      current = 1;
    } else {
      const diff = differenceInDays(previous, dayStr);
      if (diff === 1) {
        current += 1;
      } else if (diff !== null && diff > 1) {
        current = 1;
      }
    }
    previous = dayStr;
    if (current > best) {
      best = current;
    }
  });

  return best;
}

function computeCurrentStreakInfo(days, referenceDayStr) {
  const unique = sanitizeDaysDoneList(days);
  if (!unique.length) {
    return { streak: 0, lastDay: null };
  }

  const doneSet = new Set(unique);
  const reference = isValidISODate(referenceDayStr) ? new Date(referenceDayStr) : getTodayDateObj();
  if (Number.isNaN(reference.getTime())) {
    return { streak: 0, lastDay: null };
  }
  reference.setHours(0, 0, 0, 0);
  const referenceISO = reference.toISOString().split('T')[0];

  const earliest = new Date(unique[0]);
  earliest.setHours(0, 0, 0, 0);

  const cursor = new Date(reference);

  while (cursor.getTime() >= earliest.getTime()) {
    const cursorISO = cursor.toISOString().split('T')[0];
    if (doneSet.has(cursorISO)) {
      const lastDay = cursorISO;
      let streak = 0;
      const runCursor = new Date(cursor);
      while (true) {
        const runISO = runCursor.toISOString().split('T')[0];
        if (!doneSet.has(runISO)) break;
        streak += 1;
        runCursor.setDate(runCursor.getDate() - 1);
      }

      const gap = differenceInDays(lastDay, referenceISO);
      if (gap !== null && gap > 1) {
        return { streak: 0, lastDay: null };
      }

      return { streak, lastDay };
    }
    cursor.setDate(cursor.getDate() - 1);
  }

  return { streak: 0, lastDay: null };
}

function formatDayCount(value) {
  const normalized = Number(value) || 0;
  return `${normalized} jour${normalized > 1 ? 's' : ''}`;
}

function ensureStreakStructure() {
  if (!state.streak || typeof state.streak !== 'object') {
    state.streak = createDefaultStreakState();
  }

  const fallback = createDefaultStreakState();
  state.streak.current = Number.isFinite(Number(state.streak.current)) ? Number(state.streak.current) : fallback.current;
  state.streak.best = Number.isFinite(Number(state.streak.best)) ? Number(state.streak.best) : fallback.best;
  state.streak.lastCountedDay = isValidISODate(state.streak.lastCountedDay) ? state.streak.lastCountedDay : fallback.lastCountedDay;
  state.streak.daysDone = sanitizeDaysDoneList(state.streak.daysDone);
}

function ensureBadgesStructure() {
  if (!state.badges || typeof state.badges !== 'object') {
    state.badges = createDefaultBadgesState();
  }

  const unlocked = Array.isArray(state.badges.unlocked) ? state.badges.unlocked : [];
  const normalized = unlocked
    .map(entry => {
      if (typeof entry === 'string') {
        return { id: entry, unlockedAt: null };
      }
      if (!entry || typeof entry !== 'object') {
        return null;
      }
      const id = entry.id;
      const unlockedAt = typeof entry.unlockedAt === 'string' && !Number.isNaN(new Date(entry.unlockedAt).getTime())
        ? entry.unlockedAt
        : null;
      return { id, unlockedAt };
    })
    .filter(Boolean)
    .filter(entry => BADGE_DEFINITIONS.some(def => def.id === entry.id));

  const dedupMap = new Map();
  normalized.forEach(entry => {
    const existing = dedupMap.get(entry.id);
    if (!existing) {
      dedupMap.set(entry.id, entry);
    } else {
      const existingTime = existing.unlockedAt ? new Date(existing.unlockedAt).getTime() : -Infinity;
      const entryTime = entry.unlockedAt ? new Date(entry.unlockedAt).getTime() : -Infinity;
      if (entryTime > existingTime) {
        dedupMap.set(entry.id, entry);
      }
    }
  });

  const deduped = Array.from(dedupMap.values());
  deduped.sort((a, b) => {
    const aDate = a.unlockedAt ? new Date(a.unlockedAt).getTime() : 0;
    const bDate = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0;
    return aDate - bDate;
  });

  state.badges.unlocked = deduped;
}

function sanitizeStreakData(referenceDayStr = getToday()) {
  ensureStreakStructure();
  ensureBadgesStructure();

  const previousBest = Number(state.streak.best) || 0;
  const { streak, lastDay } = computeCurrentStreakInfo(state.streak.daysDone, referenceDayStr);
  state.streak.current = streak;
  state.streak.lastCountedDay = lastDay;

  const computedBest = computeBestStreak(state.streak.daysDone);
  if (computedBest > previousBest) {
    state.streak.best = computedBest;
  } else {
    state.streak.best = previousBest;
  }
}

function updateDayCompletionRecord(dayStr, isComplete, referenceDayStr = getToday()) {
  ensureStreakStructure();

  if (!isValidISODate(dayStr)) {
    sanitizeStreakData(referenceDayStr);
    return {
      current: state.streak.current,
      best: state.streak.best,
      bestChanged: false
    };
  }

  const days = sanitizeDaysDoneList(state.streak.daysDone);
  const index = days.indexOf(dayStr);
  if (isComplete && index === -1) {
    days.push(dayStr);
  } else if (!isComplete && index !== -1) {
    days.splice(index, 1);
  }

  state.streak.daysDone = sanitizeDaysDoneList(days);

  const previousCurrent = Number(state.streak.current) || 0;
  const previousBest = Number(state.streak.best) || 0;
  const { streak, lastDay } = computeCurrentStreakInfo(state.streak.daysDone, referenceDayStr);
  state.streak.current = streak;
  state.streak.lastCountedDay = lastDay;

  const computedBest = computeBestStreak(state.streak.daysDone);
  const newBest = Math.max(previousBest, computedBest);
  state.streak.best = newBest;

  return {
    current: state.streak.current,
    best: state.streak.best,
    bestChanged: newBest > previousBest,
    currentChanged: state.streak.current !== previousCurrent
  };
}

function getBadgeDefinitionById(id) {
  return BADGE_DEFINITIONS.find(def => def.id === id) || null;
}

function getBadgeForStreak(streakValue) {
  const normalized = Number(streakValue) || 0;
  let badge = null;
  BADGE_DEFINITIONS.forEach(def => {
    if (normalized >= def.threshold) {
      badge = def;
    }
  });
  return badge;
}

function getLastUnlockedBadge() {
  ensureBadgesStructure();
  if (!state.badges.unlocked.length) return null;
  const last = state.badges.unlocked[state.badges.unlocked.length - 1];
  const definition = getBadgeDefinitionById(last.id);
  if (!definition) return null;
  return { ...definition, unlockedAt: last.unlockedAt };
}

function unlockBadgesForCurrentStreak(currentStreak) {
  ensureBadgesStructure();
  const unlockedIds = new Set(state.badges.unlocked.map(entry => entry.id));
  const eligible = BADGE_DEFINITIONS.filter(def => currentStreak >= def.threshold && !unlockedIds.has(def.id));
  if (!eligible.length) {
    return null;
  }

  const timestamp = new Date().toISOString();
  eligible.forEach(def => {
    state.badges.unlocked.push({ id: def.id, unlockedAt: timestamp });
  });
  state.badges.unlocked.sort((a, b) => {
    const aTime = a.unlockedAt ? new Date(a.unlockedAt).getTime() : 0;
    const bTime = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0;
    return aTime - bTime;
  });

  return eligible[eligible.length - 1];
}

const TEMPLATE_LIBRARY = [
  {
    id: 'revision-examen',
    name: 'Révision examen',
    description: 'Routine de révision quotidienne pour consolider le cours.',
    duration: '2h/j',
    ritual: 'Respiration',
    tasks: [
      { title: 'Relire chapitre X', moment: 'Matin', audio: 'respiration' },
      { title: 'Fiches / questions clés', moment: 'Après-midi', audio: 'respiration' },
      { title: 'Quiz 20’', moment: 'Soir', audio: 'respiration' }
    ]
  },
  {
    id: 'creation-contenu',
    name: 'Création contenu IG',
    description: 'Préparez, tournez et publiez en 3 micro-tâches.',
    duration: '60–90 min/j',
    ritual: 'Étirements',
    tasks: [
      { title: 'Idées + accroches', moment: 'Après-midi', audio: 'étirements' },
      { title: 'Tourner 1 séquence', moment: 'Fin de journée', audio: 'étirements' },
      { title: 'Montage / légende 20’', moment: 'Soir', audio: 'étirements' }
    ]
  },
  {
    id: 'sport-doux',
    name: 'Sport doux',
    description: 'Un rituel mouvement léger et progressif.',
    duration: '30–40 min/j',
    ritual: 'Étirements',
    tasks: [
      { title: 'Échauffement 10’', moment: 'Matin', audio: 'étirements' },
      { title: 'Session 15–20’', moment: 'Matin', audio: 'étirements' },
      { title: 'Retour au calme 5–10’', moment: 'Soir', audio: 'étirements' }
    ]
  },
  {
    id: 'desencombrement',
    name: 'Désencombrement',
    description: 'Libérez de l’espace avec trois micro-actions ciblées.',
    duration: '30 min/j',
    ritual: 'Respiration',
    tasks: [
      { title: 'Zone 10’', moment: 'Matin', audio: 'respiration' },
      { title: 'Trier / décider 10’', moment: 'Après-midi', audio: 'respiration' },
      { title: 'Sortie (jeter/donner) 10’', moment: 'Soir', audio: 'respiration' }
    ]
  },
  {
    id: 'projet-pitch',
    name: 'Projet pro — Pitch',
    description: 'Structurez et peaufinez votre pitch en 7 jours.',
    duration: '45–60 min/j',
    ritual: 'Respiration',
    tasks: [
      { title: 'Brainstorm 10’', moment: 'Matin', audio: 'respiration' },
      { title: 'Plan / squelette 15’', moment: 'Après-midi', audio: 'respiration' },
      { title: 'Rédaction 15–30’', moment: 'Soir', audio: 'respiration' }
    ]
  }
];

let state = {
  settings: {
    email: '',
    goalTitle: '',
    deadlineISO: '',
    startISO: '',
    programmeCategoryId: getDefaultProgrammeCategoryId(),
    programmeMode: 'content'
  },
  tasks: {},
  vignettes: ['', '', ''],
  kpiImage: '',
  mood: { motivation: 50, emoji: null },
  moodHistory: {},
  reports: {},
  reportHistory: [],
  microReviews: {},
  audioLibrary: [],
  defaultAudioAssignments: { morning: null, afternoon: null, evening: null },
  streak: createDefaultStreakState(),
  badges: createDefaultBadgesState(),
  notifications: createDefaultNotificationsState(),
  micropasSuggestionState: {},
  focusAdaptive: createDefaultFocusAdaptiveState(),
  momentSuggestion: createDefaultMomentSuggestionState(),
  challenge: createDefaultChallengeState()
};

let audioDBPromise = null;
let pendingAudioDraft = null;
let previewAudioState = { audio: null, entryId: null, revoke: null, button: null };
let modalAudioState = { audio: null, revoke: null };
const notificationRuntime = {
  timers: new Map(),
  nextOccurrences: new Map(),
  snoozes: new Map()
};
let upcomingReminderIntervalId = null;
let notificationsInitialized = false;
let notificationBeepContext = null;

const focusSessionRuntime = {
  activeTimer: false
};

let socialProvider = null;
let socialOverviewCache = null;
const socialChallengeStatusCache = new Map();
let activeNotificationsTab = 'alerts';
let openSocialMenuUid = null;

const pwaInstallRuntime = {
  deferredPrompt: null,
  initialized: false,
  displayModeQuery: null
};

let lastTemplateApplication = null;
let releaseFocusTrapCallback = null;
let lastFocusBeforeModal = null;
let taskIdCounter = 0;
let currentReportModalContext = null;

function getAudioDB() {
  if (audioDBPromise) {
    return audioDBPromise;
  }

  if (!('indexedDB' in window)) {
    return Promise.reject(new Error('IndexedDB non supporté'));
  }

  audioDBPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(AUDIO_DB_NAME, AUDIO_DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(AUDIO_STORE_NAME)) {
        db.createObjectStore(AUDIO_STORE_NAME);
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {
        db.close();
        audioDBPromise = null;
      };
      resolve(db);
    };

    request.onerror = () => {
      audioDBPromise = null;
      reject(request.error || new Error('Ouverture IndexedDB échouée'));
    };
  });

  return audioDBPromise;
}

function storeAudioBlob(id, blob) {
  return getAudioDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE_NAME, 'readwrite');
    const store = tx.objectStore(AUDIO_STORE_NAME);
    store.put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('Échec enregistrement audio'));
  }));
}

function getAudioBlob(id) {
  return getAudioDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE_NAME, 'readonly');
    const store = tx.objectStore(AUDIO_STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error || new Error('Lecture audio impossible'));
  }));
}

function ensureAudioLibraryState() {
  if (!Array.isArray(state.audioLibrary)) {
    state.audioLibrary = [];
  }

  const nowISO = new Date().toISOString();
  const dedupMap = new Map();

  state.audioLibrary.forEach(entry => {
    if (!entry || !entry.id) return;
    if (!dedupMap.has(entry.id)) {
      dedupMap.set(entry.id, { ...entry });
    }
  });

  BUILTIN_AUDIOS.forEach(builtin => {
    const existing = dedupMap.get(builtin.id);
    if (existing) {
      dedupMap.set(builtin.id, {
        ...existing,
        title: existing.title || builtin.title,
        category: builtin.category,
        duration: builtin.duration,
        source: builtin.source,
        sourceType: 'builtin',
        isBuiltin: true
      });
    } else {
      dedupMap.set(builtin.id, {
        ...builtin,
        favorite: true,
        createdAt: nowISO
      });
    }
  });

  state.audioLibrary = Array.from(dedupMap.values()).map(entry => {
    const duration = Number(entry.duration);
    return {
      id: entry.id,
      title: entry.title || 'Audio',
      category: entry.category && AUDIO_CATEGORIES.some(cat => cat.id === entry.category)
        ? entry.category
        : 'autre',
      duration: Number.isFinite(duration) && duration > 0 ? duration : null,
      favorite: Boolean(entry.favorite),
      createdAt: entry.createdAt || nowISO,
      sourceType: entry.sourceType || (entry.isBuiltin ? 'builtin' : 'indexeddb'),
      source: entry.source || null,
      isBuiltin: Boolean(entry.isBuiltin)
    };
  });

  if (!state.defaultAudioAssignments || typeof state.defaultAudioAssignments !== 'object') {
    state.defaultAudioAssignments = { morning: null, afternoon: null, evening: null };
  }

  const validIds = new Set(state.audioLibrary.map(entry => entry.id));
  DEFAULT_AUDIO_SLOTS.forEach(slot => {
    const value = state.defaultAudioAssignments[slot.key];
    if (!validIds.has(value)) {
      state.defaultAudioAssignments[slot.key] = null;
    }
  });

  Object.keys(state.tasks || {}).forEach(dateStr => {
    const tasks = Array.isArray(state.tasks[dateStr]) ? state.tasks[dateStr] : [];
    tasks.forEach(task => {
      if (!task) return;
      task.audio = normalizeAudioValue(task.audio);
    });
  });
}

function normalizeTimeString(value, fallback) {
  const defaultValue = typeof fallback === 'string' ? fallback : '09:00';
  if (typeof value !== 'string') {
    return normalizeTimeString(defaultValue, '09:00');
  }
  const match = value.trim().match(/^([0-9]{1,2}):([0-9]{1,2})$/);
  if (!match) {
    return normalizeTimeString(defaultValue, '09:00');
  }
  let hours = Number.parseInt(match[1], 10);
  let minutes = Number.parseInt(match[2], 10);
  if (!Number.isFinite(hours) || hours < 0 || hours > 23) {
    hours = Number.parseInt(defaultValue.slice(0, 2), 10) || 0;
  }
  if (!Number.isFinite(minutes) || minutes < 0 || minutes > 59) {
    minutes = Number.parseInt(defaultValue.slice(3, 5), 10) || 0;
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function minutesFromTimeString(value, fallbackMinutes = 0) {
  const normalized = normalizeTimeString(value, '00:00');
  if (!normalized) return fallbackMinutes;
  const [hoursStr, minutesStr] = normalized.split(':');
  const hours = Number.parseInt(hoursStr, 10);
  const minutes = Number.parseInt(minutesStr, 10);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return fallbackMinutes;
  return hours * 60 + minutes;
}

function isMinutesWithinRange(minutes, start, end) {
  if (start === end) return true;
  if (start < end) {
    return minutes >= start && minutes < end;
  }
  return minutes >= start || minutes < end;
}

function isDateInDnd(date) {
  if (!state.notifications?.dnd?.enabled) {
    return false;
  }
  const startMinutes = minutesFromTimeString(state.notifications.dnd.start, 22 * 60);
  const endMinutes = minutesFromTimeString(state.notifications.dnd.end, 7 * 60);
  const currentMinutes = date.getHours() * 60 + date.getMinutes();
  return isMinutesWithinRange(currentMinutes, startMinutes, endMinutes);
}

function adjustDateForDnd(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return null;
  }
  if (!state.notifications?.dnd?.enabled) {
    return new Date(date.getTime());
  }

  const startMinutes = minutesFromTimeString(state.notifications.dnd.start, 22 * 60);
  const endMinutes = minutesFromTimeString(state.notifications.dnd.end, 7 * 60);

  if (startMinutes === endMinutes) {
    return null;
  }

  let candidate = new Date(date.getTime());
  let safety = 0;

  while (safety < 4 && isDateInDnd(candidate)) {
    if (startMinutes < endMinutes) {
      candidate.setHours(Math.floor(endMinutes / 60), endMinutes % 60, 0, 0);
      if (candidate.getTime() <= date.getTime()) {
        candidate.setDate(candidate.getDate() + 1);
      }
    } else {
      const currentMinutes = candidate.getHours() * 60 + candidate.getMinutes();
      if (currentMinutes >= startMinutes) {
        candidate.setDate(candidate.getDate() + 1);
        candidate.setHours(Math.floor(endMinutes / 60), endMinutes % 60, 0, 0);
      } else {
        candidate.setHours(Math.floor(endMinutes / 60), endMinutes % 60, 0, 0);
      }
    }
    safety += 1;
  }

  if (safety >= 4 && isDateInDnd(candidate)) {
    return null;
  }

  return candidate;
}

function ensureNotificationState() {
  let changed = false;

  if (!state.notifications || typeof state.notifications !== 'object') {
    state.notifications = createDefaultNotificationsState();
    return true;
  }

  const notifications = state.notifications;
  const enabled = notifications.enabled !== false;
  if (notifications.enabled !== enabled) {
    notifications.enabled = enabled;
    changed = true;
  }

  if (!notifications.slots || typeof notifications.slots !== 'object') {
    notifications.slots = {};
    changed = true;
  }

  Object.keys(NOTIFICATION_SLOT_DETAILS).forEach(slotKey => {
    if (!notifications.slots[slotKey] || typeof notifications.slots[slotKey] !== 'object') {
      notifications.slots[slotKey] = { enabled: true, time: NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime };
      changed = true;
    }
    const slot = notifications.slots[slotKey];
    const normalizedEnabled = slot.enabled !== false;
    const normalizedTime = normalizeTimeString(slot.time, NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime);
    if (slot.enabled !== normalizedEnabled) {
      slot.enabled = normalizedEnabled;
      changed = true;
    }
    if (slot.time !== normalizedTime) {
      slot.time = normalizedTime;
      changed = true;
    }
  });

  if (!notifications.dnd || typeof notifications.dnd !== 'object') {
    notifications.dnd = { enabled: false, start: '22:00', end: '07:00' };
    changed = true;
  } else {
    const dndEnabled = notifications.dnd.enabled === true;
    const dndStart = normalizeTimeString(notifications.dnd.start, '22:00');
    const dndEnd = normalizeTimeString(notifications.dnd.end, '07:00');
    if (notifications.dnd.enabled !== dndEnabled) {
      notifications.dnd.enabled = dndEnabled;
      changed = true;
    }
    if (notifications.dnd.start !== dndStart) {
      notifications.dnd.start = dndStart;
      changed = true;
    }
    if (notifications.dnd.end !== dndEnd) {
      notifications.dnd.end = dndEnd;
      changed = true;
    }
  }

  if (!notifications.sound || typeof notifications.sound !== 'object') {
    notifications.sound = { beep: true };
    changed = true;
  } else {
    const beepEnabled = notifications.sound.beep !== false;
    if (notifications.sound.beep !== beepEnabled) {
      notifications.sound.beep = beepEnabled;
      changed = true;
    }
  }

  const timezone = getLocalTimezone();
  if (!notifications.timezone || typeof notifications.timezone !== 'string' || notifications.timezone !== timezone) {
    notifications.timezone = timezone;
    changed = true;
  }

  return changed;
}

function ensureFocusAdaptiveState() {
  if (!state.focusAdaptive || typeof state.focusAdaptive !== 'object') {
    state.focusAdaptive = createDefaultFocusAdaptiveState();
    return true;
  }

  let changed = false;
  const adaptive = state.focusAdaptive;

  if (adaptive.enabled === undefined) {
    adaptive.enabled = true;
    changed = true;
  }

  if (!adaptive.defaultDurationByMoment || typeof adaptive.defaultDurationByMoment !== 'object') {
    adaptive.defaultDurationByMoment = { ...FOCUS_DEFAULT_DURATION };
    changed = true;
  }

  FOCUS_MOMENT_KEYS.forEach(key => {
    const current = Number(adaptive.defaultDurationByMoment[key]);
    if (!Number.isFinite(current) || current < FOCUS_DURATION_LIMITS.min || current > FOCUS_DURATION_LIMITS.max) {
      adaptive.defaultDurationByMoment[key] = FOCUS_DEFAULT_DURATION[key];
      changed = true;
    }
  });

  if (!adaptive.snoozeUntil || typeof adaptive.snoozeUntil !== 'object') {
    adaptive.snoozeUntil = { morning: null, afternoon: null, evening: null };
    changed = true;
  }

  if (!adaptive.muteUntil || typeof adaptive.muteUntil !== 'object') {
    adaptive.muteUntil = { morning: null, afternoon: null, evening: null };
    changed = true;
  }

  if (!adaptive.momentStreaks || typeof adaptive.momentStreaks !== 'object') {
    adaptive.momentStreaks = {
      morning: { success: 0, failure: 0 },
      afternoon: { success: 0, failure: 0 },
      evening: { success: 0, failure: 0 }
    };
    changed = true;
  }

  FOCUS_MOMENT_KEYS.forEach(key => {
    const streak = adaptive.momentStreaks[key];
    if (!streak || typeof streak !== 'object') {
      adaptive.momentStreaks[key] = { success: 0, failure: 0 };
      changed = true;
      return;
    }
    if (!Number.isFinite(streak.success)) {
      streak.success = 0;
      changed = true;
    }
    if (!Number.isFinite(streak.failure)) {
      streak.failure = 0;
      changed = true;
    }
  });

  if (!adaptive.momentResetAt || typeof adaptive.momentResetAt !== 'object') {
    adaptive.momentResetAt = { morning: null, afternoon: null, evening: null };
    changed = true;
  }

  FOCUS_MOMENT_KEYS.forEach(key => {
    const resetValue = adaptive.momentResetAt[key];
    if (resetValue !== null && typeof resetValue !== 'string') {
      adaptive.momentResetAt[key] = null;
      changed = true;
    }
  });

  if (!Array.isArray(adaptive.taskOutcomes)) {
    adaptive.taskOutcomes = [];
    changed = true;
  }

  return changed;
}

function getMomentKeyFromLabel(momentLabel) {
  if (!momentLabel) {
    return null;
  }
  const slot = categorizeMomentSlot(momentLabel) || momentLabel;
  const normalized = slot.toString().trim().toLowerCase();
  if (normalized.startsWith('matin')) {
    return 'morning';
  }
  if (normalized.startsWith('après') || normalized.startsWith('apres')) {
    return 'afternoon';
  }
  if (normalized.startsWith('soir')) {
    return 'evening';
  }
  return null;
}

function getMomentLabelFromKey(momentKey) {
  if (!momentKey) {
    return '';
  }
  const key = momentKey.toString().toLowerCase();
  if (key === 'morning') {
    return 'Matin';
  }
  if (key === 'afternoon') {
    return 'Après-midi';
  }
  if (key === 'evening') {
    return 'Soir';
  }
  return '';
}

function getFocusDefaultDuration(momentKey) {
  ensureFocusAdaptiveState();
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return null;
  }
  const value = Number(state.focusAdaptive.defaultDurationByMoment?.[momentKey]);
  if (Number.isFinite(value)) {
    return Math.min(FOCUS_DURATION_LIMITS.max, Math.max(FOCUS_DURATION_LIMITS.min, Math.round(value / FOCUS_DURATION_LIMITS.step) * FOCUS_DURATION_LIMITS.step));
  }
  return FOCUS_DEFAULT_DURATION[momentKey];
}

function getFocusDefaultDurationForMomentLabel(momentLabel) {
  const momentKey = getMomentKeyFromLabel(momentLabel);
  return getFocusDefaultDuration(momentKey) || FOCUS_DURATION_LIMITS.min;
}

function taskUsesDefaultDuration(task) {
  if (!task || typeof task !== 'object') {
    return false;
  }
  return task.usesDefaultDuration !== false;
}

function getEffectiveTaskDuration(task) {
  if (!task) {
    return null;
  }
  if (task.usesDefaultDuration === false) {
    const raw = Number(task.duration);
    return Number.isFinite(raw) && raw > 0 ? raw : null;
  }
  const momentKey = getMomentKeyFromLabel(task.moment);
  if (!momentKey) {
    return null;
  }
  return getFocusDefaultDuration(momentKey);
}

function findFocusOutcomeEntry(dateStr, taskId) {
  ensureFocusAdaptiveState();
  if (!Array.isArray(state.focusAdaptive.taskOutcomes)) {
    return null;
  }
  return state.focusAdaptive.taskOutcomes.find(entry => entry && entry.date === dateStr && entry.taskId === taskId) || null;
}

function cleanupFocusOutcomeHistory(maxAgeDays = 120) {
  ensureFocusAdaptiveState();
  if (!Array.isArray(state.focusAdaptive.taskOutcomes)) {
    state.focusAdaptive.taskOutcomes = [];
    return true;
  }

  const entries = state.focusAdaptive.taskOutcomes;
  const today = getTodayDateObj();
  const cutoff = new Date(today);
  const windowDays = Number.isFinite(maxAgeDays) && maxAgeDays > 0 ? maxAgeDays : 120;
  cutoff.setDate(today.getDate() - windowDays);
  cutoff.setHours(0, 0, 0, 0);
  const cutoffTime = cutoff.getTime();

  let changed = false;
  const dedupMap = new Map();

  entries.forEach(entry => {
    if (!entry || typeof entry !== 'object') {
      changed = true;
      return;
    }
    const momentKey = entry.moment;
    if (!FOCUS_MOMENT_KEYS.includes(momentKey)) {
      changed = true;
      return;
    }
    if (!entry.taskId || !entry.date) {
      changed = true;
      return;
    }
    const entryDate = parseISODate(entry.date);
    if (!entryDate) {
      changed = true;
      return;
    }
    if (entryDate.getTime() < cutoffTime) {
      changed = true;
      return;
    }
    const recordedAt = entry.recordedAt ? new Date(entry.recordedAt) : null;
    const key = `${entry.date}:${entry.taskId}`;
    const normalizedEntry = {
      taskId: entry.taskId,
      date: entry.date,
      moment: momentKey,
      outcome: entry.outcome === 'done' ? 'done' : (entry.outcome === 'reported' ? 'reported' : 'missed'),
      recordedAt: recordedAt instanceof Date && !Number.isNaN(recordedAt.getTime()) ? recordedAt.toISOString() : new Date(entryDate.getTime()).toISOString()
    };
    const existing = dedupMap.get(key);
    if (!existing) {
      dedupMap.set(key, normalizedEntry);
    } else {
      const existingTime = new Date(existing.recordedAt);
      const newTime = new Date(normalizedEntry.recordedAt);
      if (newTime.getTime() >= existingTime.getTime()) {
        dedupMap.set(key, normalizedEntry);
      }
      changed = true;
    }
  });

  const filtered = Array.from(dedupMap.values());
  if (filtered.length !== entries.length) {
    changed = true;
  }

  if (changed) {
    state.focusAdaptive.taskOutcomes = filtered;
  }

  return changed;
}

function recomputeFocusMomentStreaks() {
  ensureFocusAdaptiveState();
  const streaks = {
    morning: { success: 0, failure: 0 },
    afternoon: { success: 0, failure: 0 },
    evening: { success: 0, failure: 0 }
  };

  const entries = Array.isArray(state.focusAdaptive.taskOutcomes)
    ? [...state.focusAdaptive.taskOutcomes]
    : [];

  entries.sort((a, b) => {
    const timeA = new Date(a?.recordedAt || `${a?.date || ''}T00:00:00Z`).getTime();
    const timeB = new Date(b?.recordedAt || `${b?.date || ''}T00:00:00Z`).getTime();
    return timeA - timeB;
  });

  entries.forEach(entry => {
    if (!entry || !FOCUS_MOMENT_KEYS.includes(entry.moment)) {
      return;
    }
    const resetValue = state.focusAdaptive.momentResetAt?.[entry.moment] || null;
    const resetDate = resetValue ? new Date(resetValue) : null;
    const recordedDate = new Date(entry.recordedAt || `${entry.date}T00:00:00Z`);
    if (resetDate instanceof Date && !Number.isNaN(resetDate.getTime()) && recordedDate < resetDate) {
      return;
    }
    const streak = streaks[entry.moment];
    if (!streak) {
      return;
    }
    if (entry.outcome === 'done') {
      streak.success = (streak.success || 0) + 1;
      streak.failure = 0;
    } else if (entry.outcome === 'reported' || entry.outcome === 'missed') {
      streak.failure = (streak.failure || 0) + 1;
      streak.success = 0;
    }
  });

  state.focusAdaptive.momentStreaks = streaks;
}

function recordFocusOutcomeForTask(dateStr, task, outcome) {
  ensureFocusAdaptiveState();
  if (!dateStr || !task || !outcome) {
    return false;
  }
  const normalizedOutcome = outcome === 'done' ? 'done' : (outcome === 'reported' ? 'reported' : 'missed');
  const momentKey = getMomentKeyFromLabel(task.moment);
  if (!momentKey) {
    return false;
  }
  if (!task.id) {
    task.id = generateTaskId();
  }

  const existingIdx = state.focusAdaptive.taskOutcomes.findIndex(entry => entry && entry.date === dateStr && entry.taskId === task.id);
  if (existingIdx !== -1) {
    const existing = state.focusAdaptive.taskOutcomes[existingIdx];
    if (existing.outcome === normalizedOutcome && existing.moment === momentKey) {
      return false;
    }
    state.focusAdaptive.taskOutcomes.splice(existingIdx, 1);
  }

  state.focusAdaptive.taskOutcomes.push({
    taskId: task.id,
    date: dateStr,
    moment: momentKey,
    outcome: normalizedOutcome,
    recordedAt: new Date().toISOString()
  });

  cleanupFocusOutcomeHistory();
  recomputeFocusMomentStreaks();
  return true;
}

function clearFocusOutcomeForTask(dateStr, task) {
  ensureFocusAdaptiveState();
  if (!dateStr || !task || !task.id) {
    return false;
  }
  const idx = state.focusAdaptive.taskOutcomes.findIndex(entry => entry && entry.date === dateStr && entry.taskId === task.id);
  if (idx === -1) {
    return false;
  }
  state.focusAdaptive.taskOutcomes.splice(idx, 1);
  recomputeFocusMomentStreaks();
  return true;
}

function resetFocusMomentStreak(momentKey) {
  ensureFocusAdaptiveState();
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return;
  }
  state.focusAdaptive.momentResetAt[momentKey] = new Date().toISOString();
  recomputeFocusMomentStreaks();
}

function isFocusSuggestionSuppressed(momentKey) {
  ensureFocusAdaptiveState();
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return true;
  }
  const today = getToday();
  const muteUntil = state.focusAdaptive.muteUntil?.[momentKey];
  if (muteUntil && today <= muteUntil) {
    return true;
  }
  const snoozeUntil = state.focusAdaptive.snoozeUntil?.[momentKey];
  if (snoozeUntil && today <= snoozeUntil) {
    return true;
  }
  return false;
}

function getFocusSuggestionForMoment(momentKey) {
  ensureFocusAdaptiveState();
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return null;
  }
  if (state.focusAdaptive.enabled === false) {
    return null;
  }
  if (isFocusSuggestionSuppressed(momentKey)) {
    return null;
  }

  const current = getFocusDefaultDuration(momentKey);
  const streak = state.focusAdaptive.momentStreaks?.[momentKey] || { success: 0, failure: 0 };

  if ((streak.failure || 0) >= 2) {
    const candidate = Math.max(FOCUS_DURATION_LIMITS.min, current - FOCUS_DURATION_LIMITS.step);
    if (candidate < current) {
      return { type: 'decrease', targetDuration: candidate };
    }
  }

  if ((streak.success || 0) >= 3) {
    const candidate = Math.min(FOCUS_DURATION_LIMITS.max, current + FOCUS_DURATION_LIMITS.step);
    if (candidate > current) {
      return { type: 'increase', targetDuration: candidate };
    }
  }

  return null;
}

function applyFocusDefaultDuration(momentKey, newDuration) {
  ensureFocusAdaptiveState();
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return;
  }
  const bounded = Math.min(FOCUS_DURATION_LIMITS.max, Math.max(FOCUS_DURATION_LIMITS.min, newDuration));
  const normalized = Math.round(bounded / FOCUS_DURATION_LIMITS.step) * FOCUS_DURATION_LIMITS.step;
  state.focusAdaptive.defaultDurationByMoment[momentKey] = Math.min(FOCUS_DURATION_LIMITS.max, Math.max(FOCUS_DURATION_LIMITS.min, normalized));
  state.focusAdaptive.snoozeUntil[momentKey] = null;
  state.focusAdaptive.muteUntil[momentKey] = null;
  resetFocusMomentStreak(momentKey);

  const today = getToday();
  ensureTasksForDate(today);
  const todayTasks = state.tasks[today];
  todayTasks.forEach(task => {
    if (!task || isTaskEmpty(task)) {
      return;
    }
    if (getMomentKeyFromLabel(task.moment) !== momentKey) {
      return;
    }
    if (task.usesDefaultDuration === false) {
      return;
    }
    task.duration = null;
    task.usesDefaultDuration = true;
  });
}

function snoozeFocusSuggestion(momentKey) {
  ensureFocusAdaptiveState();
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return;
  }
  state.focusAdaptive.snoozeUntil[momentKey] = getDateString(FOCUS_SNOOZE_DAYS);
  resetFocusMomentStreak(momentKey);
}

function muteFocusSuggestion(momentKey) {
  ensureFocusAdaptiveState();
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return;
  }
  state.focusAdaptive.muteUntil[momentKey] = getDateString(FOCUS_MUTE_DAYS);
  resetFocusMomentStreak(momentKey);
}

function ensureMomentSuggestionState() {
  if (!state.momentSuggestion || typeof state.momentSuggestion !== 'object') {
    state.momentSuggestion = createDefaultMomentSuggestionState();
    return true;
  }

  let changed = false;
  const suggestionState = state.momentSuggestion;

  if (!Array.isArray(suggestionState.events)) {
    suggestionState.events = [];
    changed = true;
  } else {
    suggestionState.events = suggestionState.events.filter(event => event && typeof event === 'object');
  }

  if (!suggestionState.snoozeUntil || typeof suggestionState.snoozeUntil !== 'object') {
    suggestionState.snoozeUntil = { morning: null, afternoon: null, evening: null };
    changed = true;
  }
  if (!suggestionState.muteUntil || typeof suggestionState.muteUntil !== 'object') {
    suggestionState.muteUntil = { morning: null, afternoon: null, evening: null };
    changed = true;
  }

  FOCUS_MOMENT_KEYS.forEach(key => {
    if (suggestionState.snoozeUntil[key] && !isValidISODate(suggestionState.snoozeUntil[key])) {
      suggestionState.snoozeUntil[key] = null;
      changed = true;
    }
    if (suggestionState.muteUntil[key] && !isValidISODate(suggestionState.muteUntil[key])) {
      suggestionState.muteUntil[key] = null;
      changed = true;
    }
  });

  if (!FOCUS_MOMENT_KEYS.includes(suggestionState.lastSuccessfulMoment)) {
    suggestionState.lastSuccessfulMoment = null;
    changed = true;
  }

  if (!suggestionState.prefill || typeof suggestionState.prefill !== 'object') {
    suggestionState.prefill = null;
  } else {
    const { momentKey, expires } = suggestionState.prefill;
    if (!FOCUS_MOMENT_KEYS.includes(momentKey) || !isValidISODate(expires)) {
      suggestionState.prefill = null;
      changed = true;
    }
  }

  return changed;
}

function cleanupMomentSuggestionHistory() {
  ensureMomentSuggestionState();
  const suggestionState = state.momentSuggestion;
  const events = Array.isArray(suggestionState.events) ? suggestionState.events : [];
  const cutoff = getTodayDateObj();
  cutoff.setDate(cutoff.getDate() - (MOMENT_SUGGESTION_LOOKBACK_DAYS - 1));
  cutoff.setHours(0, 0, 0, 0);

  const filtered = events.filter(event => {
    if (!event || typeof event !== 'object') return false;
    if (!event.date || !event.type) return false;
    if (!FOCUS_MOMENT_KEYS.includes(event.moment)) return false;
    const eventDate = parseISODate(event.date);
    if (!eventDate) return false;
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= cutoff;
  });

  filtered.sort((a, b) => {
    const timeA = new Date(a.recordedAt || `${a.date || ''}T00:00:00Z`).getTime();
    const timeB = new Date(b.recordedAt || `${b.date || ''}T00:00:00Z`).getTime();
    return timeA - timeB;
  });

  let changed = filtered.length !== events.length;

  if (filtered.length > MOMENT_SUGGESTION_MAX_EVENTS) {
    filtered.splice(0, filtered.length - MOMENT_SUGGESTION_MAX_EVENTS);
    changed = true;
  }

  suggestionState.events = filtered;
  return changed;
}

function cleanupMomentSuggestionState() {
  let changed = ensureMomentSuggestionState();
  if (cleanupMomentSuggestionHistory()) {
    changed = true;
  }

  const suggestionState = state.momentSuggestion;
  const today = getToday();

  FOCUS_MOMENT_KEYS.forEach(key => {
    const muteUntil = suggestionState.muteUntil[key];
    if (muteUntil && (!isValidISODate(muteUntil) || today > muteUntil)) {
      suggestionState.muteUntil[key] = null;
      changed = true;
    }
    const snoozeUntil = suggestionState.snoozeUntil[key];
    if (snoozeUntil && (!isValidISODate(snoozeUntil) || today > snoozeUntil)) {
      suggestionState.snoozeUntil[key] = null;
      changed = true;
    }
  });

  if (suggestionState.prefill) {
    const { momentKey, expires } = suggestionState.prefill;
    if (!FOCUS_MOMENT_KEYS.includes(momentKey) || !isValidISODate(expires) || today > expires) {
      suggestionState.prefill = null;
      changed = true;
    }
  }

  return changed;
}

function isMomentSuggestionSuppressed(momentKey) {
  ensureMomentSuggestionState();
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return true;
  }
  const today = getToday();
  const suggestionState = state.momentSuggestion;
  const muteUntil = suggestionState.muteUntil[momentKey];
  if (muteUntil && today <= muteUntil) {
    return true;
  }
  const snoozeUntil = suggestionState.snoozeUntil[momentKey];
  if (snoozeUntil && today <= snoozeUntil) {
    return true;
  }
  return false;
}

function ensureMomentStartEvent(dateStr, task, momentKey, recordedAt) {
  const suggestionState = state.momentSuggestion;
  const events = suggestionState.events;
  const idx = events.findIndex(event => event && event.date === dateStr && event.taskId === task.id && event.type === 'start');
  if (idx === -1) {
    events.push({
      date: dateStr,
      taskId: task.id,
      moment: momentKey,
      type: 'start',
      recordedAt: recordedAt || new Date().toISOString()
    });
    suggestionState.lastComputedDate = null;
    return true;
  }

  const existing = events[idx];
  if (existing.moment !== momentKey) {
    existing.moment = momentKey;
    existing.recordedAt = recordedAt || new Date().toISOString();
    suggestionState.lastComputedDate = null;
    return true;
  }

  return false;
}

function recordMomentExecutionEvent(dateStr, task, type, options = {}) {
  ensureMomentSuggestionState();
  if (!dateStr || !task || !type) {
    return false;
  }

  if (!['start', 'success', 'defer'].includes(type)) {
    return false;
  }

  const momentKey = getMomentKeyFromLabel(task.moment);
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return false;
  }

  if (!task.id) {
    task.id = generateTaskId();
  }

  const suggestionState = state.momentSuggestion;
  const events = suggestionState.events;
  const idx = events.findIndex(event => event && event.date === dateStr && event.taskId === task.id && event.type === type);
  const nowISO = new Date().toISOString();
  let changed = false;

  if (idx !== -1) {
    const existing = events[idx];
    if (existing.moment !== momentKey) {
      existing.moment = momentKey;
      existing.recordedAt = nowISO;
      changed = true;
    }
  } else {
    events.push({
      date: dateStr,
      taskId: task.id,
      moment: momentKey,
      type,
      recordedAt: nowISO
    });
    changed = true;
  }

  if (type === 'success') {
    suggestionState.lastSuccessfulMoment = momentKey;
    if (!options.skipStartCheck) {
      if (ensureMomentStartEvent(dateStr, task, momentKey, nowISO)) {
        changed = true;
      }
    }
  }

  if (changed) {
    suggestionState.lastComputedDate = null;
    cleanupMomentSuggestionHistory();
  }

  return changed;
}

function removeMomentExecutionEvent(dateStr, task, type) {
  ensureMomentSuggestionState();
  if (!dateStr || !task || !task.id || !['start', 'success', 'defer'].includes(type)) {
    return false;
  }

  const events = state.momentSuggestion.events;
  const idx = events.findIndex(event => event && event.date === dateStr && event.taskId === task.id && event.type === type);
  if (idx === -1) {
    return false;
  }

  events.splice(idx, 1);
  state.momentSuggestion.lastComputedDate = null;
  cleanupMomentSuggestionHistory();
  return true;
}

function computeMomentSuggestion() {
  ensureMomentSuggestionState();
  const suggestionState = state.momentSuggestion;
  const events = Array.isArray(suggestionState.events) ? suggestionState.events.slice() : [];
  if (!events.length) {
    return null;
  }

  const cutoff = getTodayDateObj();
  cutoff.setDate(cutoff.getDate() - (MOMENT_SUGGESTION_LOOKBACK_DAYS - 1));
  cutoff.setHours(0, 0, 0, 0);

  const filtered = events.filter(event => {
    if (!event || !FOCUS_MOMENT_KEYS.includes(event.moment)) return false;
    if (!['start', 'success', 'defer'].includes(event.type)) return false;
    const eventDate = parseISODate(event.date);
    if (!eventDate) return false;
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= cutoff;
  });

  if (!filtered.length) {
    return null;
  }

  filtered.sort((a, b) => {
    const timeA = new Date(a.recordedAt || `${a.date || ''}T00:00:00Z`).getTime();
    const timeB = new Date(b.recordedAt || `${b.date || ''}T00:00:00Z`).getTime();
    return timeA - timeB;
  });

  const stats = {
    morning: { start: 0, success: 0, defer: 0 },
    afternoon: { start: 0, success: 0, defer: 0 },
    evening: { start: 0, success: 0, defer: 0 }
  };
  const streaks = { morning: 0, afternoon: 0, evening: 0 };

  filtered.forEach(event => {
    const bucket = stats[event.moment];
    if (!bucket) {
      return;
    }
    if (event.type === 'start') {
      bucket.start += 1;
    } else if (event.type === 'success') {
      bucket.success += 1;
      streaks[event.moment] = (streaks[event.moment] || 0) + 1;
    } else if (event.type === 'defer') {
      bucket.defer += 1;
      streaks[event.moment] = 0;
    }
  });

  const candidates = [];
  let totalExecutions = 0;

  FOCUS_MOMENT_KEYS.forEach(momentKey => {
    const bucket = stats[momentKey];
    const attempts = Math.max(bucket.start, bucket.success + bucket.defer);
    if (attempts === 0) {
      return;
    }
    totalExecutions += attempts;
    const denominator = Math.max(attempts, 1);
    const abandonCount = Math.max(0, attempts - bucket.success - bucket.defer);
    const successRate = bucket.success / denominator;
    const reportRate = bucket.defer / denominator;
    const abandonRate = abandonCount / denominator;
    let score = successRate - 0.5 * reportRate - 0.2 * abandonRate;
    if (streaks[momentKey] >= 3) {
      score += 0.1;
    }
    candidates.push({
      momentKey,
      score,
      start: bucket.start,
      success: bucket.success,
      defer: bucket.defer,
      streak: streaks[momentKey],
      attempts
    });
  });

  if (!candidates.length) {
    return null;
  }

  if (totalExecutions < MOMENT_SUGGESTION_MIN_EXECUTIONS) {
    return null;
  }

  candidates.sort((a, b) => {
    if (Math.abs(b.score - a.score) > 1e-6) {
      return b.score - a.score;
    }
    return 0;
  });

  const bestScore = candidates[0].score;
  const topCandidates = candidates.filter(candidate => Math.abs(candidate.score - bestScore) < 1e-6);

  let chosen = topCandidates.find(candidate => candidate.momentKey === suggestionState.lastSuccessfulMoment)
    || topCandidates.find(candidate => candidate.momentKey === 'afternoon')
    || topCandidates[0];

  const unsuppressed = candidates.filter(candidate => !isMomentSuggestionSuppressed(candidate.momentKey));
  if (!unsuppressed.length) {
    return null;
  }

  if (!chosen || isMomentSuggestionSuppressed(chosen.momentKey)) {
    const bestUnsuppressedScore = unsuppressed[0].score;
    const bestUnsuppressed = unsuppressed.filter(candidate => Math.abs(candidate.score - bestUnsuppressedScore) < 1e-6);
    chosen = bestUnsuppressed.find(candidate => candidate.momentKey === suggestionState.lastSuccessfulMoment)
      || bestUnsuppressed.find(candidate => candidate.momentKey === 'afternoon')
      || unsuppressed[0];
  }

  if (!chosen || isMomentSuggestionSuppressed(chosen.momentKey)) {
    return null;
  }

  return {
    momentKey: chosen.momentKey,
    momentLabel: getMomentLabelFromKey(chosen.momentKey) || 'Après-midi',
    score: chosen.score,
    stats: {
      start: stats[chosen.momentKey].start,
      success: stats[chosen.momentKey].success,
      defer: stats[chosen.momentKey].defer,
      streak: streaks[chosen.momentKey],
      attempts: chosen.attempts
    },
    totalExecutions
  };
}

function refreshMomentSuggestionIfNeeded(force = false) {
  const changed = cleanupMomentSuggestionState();
  const today = getToday();
  if (!force && state.momentSuggestion.lastComputedDate === today && state.momentSuggestion.cachedSuggestion && !changed) {
    return state.momentSuggestion.cachedSuggestion;
  }

  const suggestion = computeMomentSuggestion();
  state.momentSuggestion.cachedSuggestion = suggestion;
  state.momentSuggestion.lastComputedDate = today;
  return suggestion;
}

function getMomentSuggestion() {
  return refreshMomentSuggestionIfNeeded();
}

function setMomentSuggestionPrefill(momentKey) {
  ensureMomentSuggestionState();
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return;
  }
  state.momentSuggestion.prefill = {
    momentKey,
    expires: getDateString(MOMENT_SUGGESTION_PREFILL_DAYS)
  };
}

function maybeApplyMomentPrefillToTask(task, dateStr) {
  ensureMomentSuggestionState();
  if (!task || typeof task !== 'object' || (task.moment || '').trim()) {
    return;
  }
  if (!isValidISODate(dateStr)) {
    return;
  }
  const prefill = state.momentSuggestion.prefill;
  if (!prefill || !FOCUS_MOMENT_KEYS.includes(prefill.momentKey)) {
    return;
  }
  if (!isValidISODate(prefill.expires) || dateStr > prefill.expires) {
    return;
  }
  const label = getMomentLabelFromKey(prefill.momentKey);
  if (!label) {
    return;
  }
  task.moment = label;
}

function reconcileFocusAdaptiveOutcomes() {
  ensureFocusAdaptiveState();
  let changed = false;
  const today = getToday();
  const tasksByDate = state.tasks || {};

  Object.entries(tasksByDate).forEach(([dateStr, tasks]) => {
    if (!isValidISODate(dateStr)) {
      return;
    }
    if (dateStr >= today) {
      return;
    }
    if (!Array.isArray(tasks)) {
      return;
    }

    tasks.forEach(task => {
      if (!task || isTaskEmpty(task)) {
        return;
      }
      if (!task.id) {
        task.id = generateTaskId();
        changed = true;
      }
      const existing = findFocusOutcomeEntry(dateStr, task.id);
      if (task.status === 'done') {
        if (!existing || existing.outcome !== 'done') {
          if (recordFocusOutcomeForTask(dateStr, task, 'done')) {
            changed = true;
          }
        }
      } else if (!existing || (existing.outcome !== 'reported' && existing.outcome !== 'missed')) {
        if (recordFocusOutcomeForTask(dateStr, task, 'missed')) {
          changed = true;
        }
      }
    });
  });

  if (changed) {
    cleanupFocusOutcomeHistory();
    recomputeFocusMomentStreaks();
  }

  return changed;
}

function getAudioEntryById(id) {
  if (!id || id === 'Aucun') return null;
  return (state.audioLibrary || []).find(entry => entry.id === id) || null;
}

function getAudioCategoryLabel(categoryId) {
  const category = AUDIO_CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.label : 'Autre';
}

function formatAudioDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '—';
  }
  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  if (minutes === 0) {
    return `${secs} s`;
  }
  if (secs === 0) {
    return `${minutes} min`;
  }
  return `${minutes} min ${secs.toString().padStart(2, '0')} s`;
}

function getAudioOptionsList(includeNone = true) {
  const options = [];
  if (includeNone) {
    options.push({ value: 'Aucun', label: 'Aucun' });
  }
  (state.audioLibrary || []).forEach(entry => {
    options.push({ value: entry.id, label: entry.title || 'Audio' });
  });
  return options;
}

function populateAudioSelectOptions(selectEl, selectedValue, includeNone = true) {
  if (!selectEl) return;
  const options = getAudioOptionsList(includeNone);
  selectEl.innerHTML = options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
  const hasSelected = options.some(opt => opt.value === selectedValue);
  selectEl.value = hasSelected ? selectedValue : (includeNone ? 'Aucun' : options[0]?.value || '');
}

function populateAudioCategorySelect(selectEl, value) {
  if (!selectEl) return;
  selectEl.innerHTML = AUDIO_CATEGORIES.map(cat => `<option value="${cat.id}">${cat.label}</option>`).join('');
  const hasValue = AUDIO_CATEGORIES.some(cat => cat.id === value);
  selectEl.value = hasValue ? value : 'autre';
}

function getDefaultAssignmentsForEntry(entryId) {
  if (!entryId || !state.defaultAudioAssignments) return [];
  return DEFAULT_AUDIO_SLOTS.filter(slot => state.defaultAudioAssignments[slot.key] === entryId).map(slot => slot.label);
}

function updateDefaultAssignment(slotKey, audioId) {
  if (!state.defaultAudioAssignments) {
    state.defaultAudioAssignments = { morning: null, afternoon: null, evening: null };
  }
  state.defaultAudioAssignments[slotKey] = audioId || null;
  saveState();
}

function stopPreviewAudio() {
  if (previewAudioState.audio) {
    try {
      previewAudioState.audio.pause();
    } catch (e) {
      console.warn(e);
    }
  }
  if (previewAudioState.revoke) {
    previewAudioState.revoke();
  }
  if (previewAudioState.button) {
    previewAudioState.button.dataset.state = '';
    previewAudioState.button.textContent = 'Lecture';
  }
  previewAudioState = { audio: null, entryId: null, revoke: null, button: null };
}

function stopModalAudio() {
  if (modalAudioState.audio) {
    try {
      modalAudioState.audio.pause();
    } catch (e) {
      console.warn(e);
    }
  }
  if (modalAudioState.revoke) {
    modalAudioState.revoke();
  }
  modalAudioState = { audio: null, revoke: null };
}

function resolveAudioSource(entry) {
  if (!entry) {
    return Promise.reject(new Error('Audio introuvable'));
  }

  if (entry.sourceType === 'builtin' && entry.source) {
    return Promise.resolve({ url: entry.source, revoke: null });
  }

  return getAudioBlob(entry.id).then(blob => {
    if (!blob) {
      throw new Error('Audio introuvable');
    }
    const objectUrl = URL.createObjectURL(blob);
    return {
      url: objectUrl,
      revoke: () => URL.revokeObjectURL(objectUrl)
    };
  });
}

function getResolvedAudioForTask(task) {
  if (!task) return null;
  const directId = normalizeAudioValue(task.audio);
  if (directId && directId !== 'Aucun') {
    const entry = getAudioEntryById(directId);
    if (entry) {
      return { id: directId, entry, isDefault: false };
    }
  }

  const slot = categorizeMomentSlot(task.moment);
  if (!slot) return null;
  const slotKey = slot === 'Matin' ? 'morning' : slot === 'Après-midi' ? 'afternoon' : slot === 'Soir' ? 'evening' : null;
  if (!slotKey) return null;
  const fallbackId = state.defaultAudioAssignments?.[slotKey];
  if (!fallbackId) return null;
  const entry = getAudioEntryById(fallbackId);
  if (!entry) return null;
  return { id: fallbackId, entry, isDefault: true, slot };
}

function resolveAudioIdForTask(task) {
  const resolved = getResolvedAudioForTask(task);
  return resolved ? resolved.id : null;
}

function prepareAudioDraftFromFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Fichier manquant'));
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const audio = document.createElement('audio');
    audio.preload = 'metadata';

    audio.onloadedmetadata = () => {
      const duration = audio.duration;
      URL.revokeObjectURL(objectUrl);
      if (!Number.isFinite(duration) || duration <= 0 || duration === Infinity) {
        reject(new Error('Durée invalide'));
        return;
      }
      const baseName = (file.name || 'Audio importé').replace(/\.[^/.]+$/, '');
      resolve({
        id: `audio-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        title: baseName.slice(0, 80) || 'Audio importé',
        category: 'autre',
        duration,
        file,
        isNew: true
      });
    };

    audio.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Lecture impossible'));
    };

    audio.src = objectUrl;
  });
}

function startAudioEdit(entryId) {
  const entry = getAudioEntryById(entryId);
  if (!entry) return;
  pendingAudioDraft = {
    id: entry.id,
    title: entry.title || '',
    category: entry.category || 'autre',
    duration: entry.duration || null,
    isNew: false
  };
  renderAudioLibrary();
}

function handleAudioEditorCancel() {
  pendingAudioDraft = null;
  renderAudioLibrary();
}

function handleAudioEditorSave() {
  if (!pendingAudioDraft) return;

  const titleInput = document.getElementById('audio-title-input');
  const categorySelect = document.getElementById('audio-category-input');
  if (!titleInput || !categorySelect) return;

  const title = titleInput.value.trim();
  const category = categorySelect.value || 'autre';

  if (!title) {
    showToast('Merci d’indiquer un titre.');
    titleInput.focus();
    return;
  }

  if (pendingAudioDraft.isNew) {
    const draft = pendingAudioDraft;
    if (!draft.file) {
      showToast('Fichier audio manquant.');
      return;
    }

    storeAudioBlob(draft.id, draft.file)
      .then(() => {
        state.audioLibrary.push({
          id: draft.id,
          title,
          category,
          duration: draft.duration || null,
          favorite: false,
          createdAt: new Date().toISOString(),
          sourceType: 'indexeddb',
          source: null,
          isBuiltin: false
        });
        pendingAudioDraft = null;
        ensureAudioLibraryState();
        saveState();
        renderAudioLibrary();
        showToast('Audio importé avec succès ✨');
      })
      .catch(() => {
        showToast('Impossible d’enregistrer cet audio.');
      });
  } else {
    const entry = getAudioEntryById(pendingAudioDraft.id);
    if (!entry) {
      pendingAudioDraft = null;
      renderAudioLibrary();
      return;
    }

    entry.title = title;
    entry.category = category;
    if (Number.isFinite(pendingAudioDraft.duration)) {
      entry.duration = pendingAudioDraft.duration;
    }

    pendingAudioDraft = null;
    saveState();
    renderAudioLibrary();
    showToast('Audio mis à jour.');
  }
}

async function toggleAudioPreview(entryId, button) {
  if (!entryId || !button) return;

  if (previewAudioState.entryId === entryId) {
    stopPreviewAudio();
    return;
  }

  stopPreviewAudio();

  const entry = getAudioEntryById(entryId);
  if (!entry) {
    showToast('Audio introuvable.');
    return;
  }

  try {
    const { url, revoke } = await resolveAudioSource(entry);
    const audio = new Audio(url);
    audio.onended = () => {
      stopPreviewAudio();
    };
    audio.onpause = () => {
      if (previewAudioState.audio === audio && !audio.ended) {
        stopPreviewAudio();
      }
    };

    await audio.play();

    button.dataset.state = 'active';
    button.textContent = 'Pause';
    previewAudioState = { audio, entryId, revoke, button };
  } catch (error) {
    showToast('Lecture impossible : format non supporté.');
    if (button) {
      button.dataset.state = '';
      button.textContent = 'Lecture';
    }
  }
}

function renderAudioLibrary() {
  ensureAudioLibraryState();

  const listEl = document.getElementById('audio-list');
  const emptyEl = document.getElementById('audio-empty');
  const editorEl = document.getElementById('library-editor');
  const editorTitle = document.getElementById('library-editor-title');
  const titleInput = document.getElementById('audio-title-input');
  const categorySelect = document.getElementById('audio-category-input');
  const durationDisplay = document.getElementById('audio-duration-display');
  const saveBtn = document.getElementById('audio-save-btn');
  const cancelBtn = document.getElementById('audio-cancel-btn');
  const importBtn = document.getElementById('import-audio-btn');
  const fileInput = document.getElementById('audio-file-input');

  if (!listEl || !emptyEl) return;

  if (importBtn && fileInput) {
    importBtn.onclick = () => {
      if (!('indexedDB' in window)) {
        showToast('Import audio indisponible sur cet appareil.');
        return;
      }
      fileInput.value = '';
      fileInput.click();
    };

    fileInput.onchange = async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      stopPreviewAudio();
      try {
        pendingAudioDraft = await prepareAudioDraftFromFile(file);
        renderAudioLibrary();
      } catch (err) {
        pendingAudioDraft = null;
        showToast('Format audio non supporté ou fichier corrompu.');
      }
      fileInput.value = '';
    };
  }

  if (saveBtn) {
    saveBtn.onclick = handleAudioEditorSave;
  }

  if (cancelBtn) {
    cancelBtn.onclick = handleAudioEditorCancel;
  }

  if (pendingAudioDraft) {
    if (editorEl) editorEl.hidden = false;
    if (editorTitle) editorTitle.textContent = pendingAudioDraft.isNew ? 'Nouvel audio' : 'Modifier l\'audio';
    if (titleInput) titleInput.value = pendingAudioDraft.title || '';
    if (categorySelect) populateAudioCategorySelect(categorySelect, pendingAudioDraft.category || 'autre');
    if (durationDisplay) durationDisplay.textContent = formatAudioDuration(pendingAudioDraft.duration);
  } else {
    if (editorEl) editorEl.hidden = true;
    if (titleInput) titleInput.value = '';
    if (categorySelect) populateAudioCategorySelect(categorySelect, 'autre');
    if (durationDisplay) durationDisplay.textContent = '—';
  }

  document.querySelectorAll('.default-audio-select').forEach(select => {
    const slotKey = select.getAttribute('data-slot');
    const selectedValue = state.defaultAudioAssignments?.[slotKey] || 'Aucun';
    populateAudioSelectOptions(select, selectedValue);
    select.value = selectedValue;
    select.onchange = () => {
      const value = select.value;
      updateDefaultAssignment(slotKey, value === 'Aucun' ? null : value);
      renderAudioLibrary();
    };
  });

  const audios = [...(state.audioLibrary || [])];
  audios.sort((a, b) => {
    if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
    if (a.isBuiltin !== b.isBuiltin) return a.isBuiltin ? -1 : 1;
    return (a.title || '').localeCompare(b.title || '', 'fr', { sensitivity: 'base' });
  });

  listEl.innerHTML = '';

  if (!audios.length) {
    emptyEl.hidden = false;
    return;
  }

  emptyEl.hidden = true;

  audios.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'audio-item';

    const main = document.createElement('div');
    main.className = 'audio-main';

    const titleEl = document.createElement('div');
    titleEl.className = 'audio-title';
    titleEl.textContent = entry.title || 'Audio';
    main.appendChild(titleEl);

    const metaEl = document.createElement('div');
    metaEl.className = 'audio-meta';
    const metaParts = [getAudioCategoryLabel(entry.category)];
    if (entry.duration) {
      metaParts.push(formatAudioDuration(entry.duration));
    }
    metaEl.textContent = metaParts.filter(Boolean).join(' • ');
    main.appendChild(metaEl);

    const tags = getDefaultAssignmentsForEntry(entry.id);
    if (entry.isBuiltin || tags.length) {
      const tagsWrap = document.createElement('div');
      tagsWrap.className = 'audio-tags';
      if (entry.isBuiltin) {
        const badge = document.createElement('span');
        badge.className = 'audio-badge';
        badge.textContent = 'Intégré';
        tagsWrap.appendChild(badge);
      }
      tags.forEach(label => {
        const tag = document.createElement('span');
        tag.className = 'audio-tag';
        tag.textContent = `Défaut ${label.toLowerCase()}`;
        tagsWrap.appendChild(tag);
      });
      if (tagsWrap.childElementCount > 0) {
        main.appendChild(tagsWrap);
      }
    }

    item.appendChild(main);

    const actions = document.createElement('div');
    actions.className = 'audio-actions';

    const previewBtn = document.createElement('button');
    previewBtn.type = 'button';
    previewBtn.className = 'audio-action-btn';
    previewBtn.dataset.action = 'preview';
    previewBtn.dataset.id = entry.id;
    if (previewAudioState.entryId === entry.id) {
      previewBtn.dataset.state = 'active';
      previewBtn.textContent = 'Pause';
    } else {
      previewBtn.textContent = 'Lecture';
    }
    actions.appendChild(previewBtn);

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'audio-action-btn';
    editBtn.dataset.action = 'edit';
    editBtn.dataset.id = entry.id;
    editBtn.textContent = 'Éditer';
    actions.appendChild(editBtn);

    const favBtn = document.createElement('button');
    favBtn.type = 'button';
    favBtn.className = 'audio-favorite-btn';
    favBtn.dataset.action = 'favorite';
    favBtn.dataset.id = entry.id;
    favBtn.dataset.active = entry.favorite ? 'true' : 'false';
    favBtn.textContent = entry.favorite ? '★' : '☆';
    actions.appendChild(favBtn);

    item.appendChild(actions);
    listEl.appendChild(item);
  });

  listEl.querySelectorAll('button[data-action="preview"]').forEach(button => {
    button.onclick = () => toggleAudioPreview(button.dataset.id, button);
  });

  listEl.querySelectorAll('button[data-action="edit"]').forEach(button => {
    button.onclick = () => startAudioEdit(button.dataset.id);
  });

  listEl.querySelectorAll('button[data-action="favorite"]').forEach(button => {
    button.onclick = () => {
      const entry = getAudioEntryById(button.dataset.id);
      if (!entry) return;
      entry.favorite = !entry.favorite;
      saveState();
      renderAudioLibrary();
    };
  });
}
function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = JSON.parse(saved);
      if (!state.vignettes) state.vignettes = ['', '', ''];
      if (!state.mood) state.mood = { motivation: 50, emoji: null };
      if (!state.moodHistory) state.moodHistory = {};
      if (!state.tasks) state.tasks = {};
      if (!state.settings || typeof state.settings !== 'object') state.settings = {};
      if (!state.settings.startISO) state.settings.startISO = '';
      if (!state.reports) state.reports = {};
      normalizeLegacyReportReasons();
      if (!Array.isArray(state.reportHistory)) state.reportHistory = [];
      if (!state.microReviews) state.microReviews = {};
      if (!state.settings.programmeCategoryId) state.settings.programmeCategoryId = getDefaultProgrammeCategoryId();
      if (!state.settings.programmeMode) state.settings.programmeMode = 'content';
      if (!state.micropasSuggestionState || typeof state.micropasSuggestionState !== 'object') {
        state.micropasSuggestionState = {};
      }
    } catch (e) {
      console.error('Error loading state:', e);
    }
  }

  ensureAudioLibraryState();
  const challengeNormalized = ensureChallengeState();
  const notificationsNormalized = ensureNotificationState();
  const focusNormalized = ensureFocusAdaptiveState();
  const momentCleaned = cleanupMomentSuggestionState();
  const outcomesCleaned = cleanupFocusOutcomeHistory();
  recomputeFocusMomentStreaks();
  refreshMomentSuggestionIfNeeded(true);
  sanitizeStreakData();
  cleanupReportHistory();
  cleanupMicropasSuggestionState();

  if (challengeNormalized || notificationsNormalized || focusNormalized || outcomesCleaned || momentCleaned) {
    saveState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getTodayDateObj() {
  const now = new Date();
  if (now.getHours() < 2) {
    now.setDate(now.getDate() - 1);
  }
  now.setHours(0, 0, 0, 0);
  return now;
}

function getToday() {
  return getTodayDateObj().toISOString().split('T')[0];
}

function getDateString(offset = 0) {
  const date = getTodayDateObj();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
}

function parseISODate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const [year, month, day] = parts.map(part => Number.parseInt(part, 10));
  if ([year, month, day].some(num => !Number.isFinite(num))) {
    return null;
  }
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getNextMondayDate() {
  const date = getTodayDateObj();
  const day = date.getDay();
  const daysUntilNextMonday = ((8 - day) % 7) || 7;
  date.setDate(date.getDate() + daysUntilNextMonday);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getStartDateForPeriod(period) {
  const today = getTodayDateObj();
  if (period === 'next-week') {
    return getNextMondayDate();
  }
  return today;
}

function generateTaskId() {
  taskIdCounter += 1;
  const now = Date.now();
  return `tsk-${now}-${taskIdCounter}`;
}

function createEmptyTask() {
  return {
    id: null,
    title: '',
    moment: '',
    time: '',
    audio: 'Aucun',
    duration: null,
    status: 'planned',
    micropas: '',
    usesDefaultDuration: true,
    completedAt: null,
    lastStartedAt: null,
    focusSessions: [],
    lastFocusDurationSec: null,
    lastFocusCompletedAt: null,
    lastCompletionLatencySec: null,
    statusChangedAt: null
  };
}

function normalizeAudioValue(audioValue) {
  if (!audioValue) return 'Aucun';
  if (audioValue === 'Aucun') return 'Aucun';
  const value = audioValue.toString();
  const lower = value.toLowerCase();
  if (lower === 'aucun') return 'Aucun';
  if (value === 'builtin-respiration' || value === 'builtin-etirements') {
    return value;
  }
  if (lower === 'respiration') return 'builtin-respiration';
  if (lower === 'étirements' || lower === 'etirements') return 'builtin-etirements';
  if ((state.audioLibrary || []).some(entry => entry.id === value)) {
    return value;
  }
  return 'Aucun';
}

function ensureTasksForDate(dateStr) {
  if (!state.tasks[dateStr]) {
    state.tasks[dateStr] = [createEmptyTask(), createEmptyTask(), createEmptyTask()];
    state.tasks[dateStr].forEach(task => maybeApplyMomentPrefillToTask(task, dateStr));
    return;
  }

  for (let i = 0; i < 3; i++) {
    if (!state.tasks[dateStr][i]) {
      state.tasks[dateStr][i] = createEmptyTask();
      maybeApplyMomentPrefillToTask(state.tasks[dateStr][i], dateStr);
    } else {
      const task = state.tasks[dateStr][i];
      if (task.id === undefined) {
        task.id = null;
      }
      if (task.title === undefined) task.title = '';
      if (task.moment === undefined) task.moment = '';
      if (task.time === undefined) task.time = '';
      task.audio = normalizeAudioValue(task.audio);
      if (task.duration !== undefined) {
        const durationValue = Number(task.duration);
        task.duration = Number.isFinite(durationValue) && durationValue > 0 ? durationValue : null;
      } else {
        task.duration = null;
      }
      const hasCustomDuration = Number.isFinite(task.duration) && task.duration > 0;
      if (!hasCustomDuration) {
        task.duration = null;
      }
      task.usesDefaultDuration = hasCustomDuration ? false : true;
      if (!task.status) task.status = 'planned';
      if (task.micropas === undefined) task.micropas = '';
      if (!Array.isArray(task.focusSessions)) {
        task.focusSessions = [];
      } else {
        task.focusSessions = task.focusSessions
          .map(entry => {
            if (!entry || typeof entry !== 'object') {
              return null;
            }
            const duration = Number(entry.durationSec ?? entry.duration);
            const completedAt = typeof entry.completedAt === 'string' ? entry.completedAt : null;
            if (!Number.isFinite(duration) || duration < 0) {
              return null;
            }
            return {
              durationSec: Math.round(duration),
              completedAt
            };
          })
          .filter(Boolean)
          .slice(-12);
      }
      if (typeof task.completedAt !== 'string') {
        task.completedAt = null;
      }
      if (typeof task.lastStartedAt !== 'string') {
        task.lastStartedAt = null;
      }
      const focusDuration = Number(task.lastFocusDurationSec);
      task.lastFocusDurationSec = Number.isFinite(focusDuration) && focusDuration >= 0 ? Math.round(focusDuration) : null;
      if (typeof task.lastFocusCompletedAt !== 'string') {
        task.lastFocusCompletedAt = null;
      }
      const latency = Number(task.lastCompletionLatencySec);
      task.lastCompletionLatencySec = Number.isFinite(latency) && latency >= 0 ? Math.round(latency) : null;
      if (typeof task.statusChangedAt !== 'string') {
        task.statusChangedAt = null;
      }
      if (!task.id) {
        const hasContent = Boolean((task.title || '').trim()) || Boolean((task.moment || '').trim());
        const audioValue = normalizeAudioValue(task.audio);
        if (hasContent || (audioValue && audioValue !== 'Aucun')) {
          task.id = generateTaskId();
        }
      }
    }
  }
}

function cloneTask(task) {
  if (!task) {
    return createEmptyTask();
  }
  const copy = { ...task };
  copy.focusSessions = Array.isArray(task.focusSessions)
    ? task.focusSessions.map(session => (session ? { ...session } : null)).filter(Boolean)
    : [];
  return copy;
}

function getTaskFocusSessions(task) {
  if (!task || !Array.isArray(task.focusSessions)) {
    return [];
  }
  return task.focusSessions
    .map(entry => {
      if (!entry || typeof entry !== 'object') {
        return null;
      }
      const duration = Number(entry.durationSec ?? entry.duration);
      if (!Number.isFinite(duration) || duration <= 0) {
        return null;
      }
      return {
        durationSec: Math.round(duration),
        completedAt: typeof entry.completedAt === 'string' ? entry.completedAt : null
      };
    })
    .filter(Boolean);
}

function registerFocusSessionForTask(task, durationSec) {
  if (!task) {
    return false;
  }
  const normalizedDuration = Number.isFinite(durationSec) ? Math.max(0, Math.round(durationSec)) : 0;
  if (normalizedDuration <= 0) {
    return false;
  }
  if (!Array.isArray(task.focusSessions)) {
    task.focusSessions = [];
  }
  const entry = {
    durationSec: normalizedDuration,
    completedAt: new Date().toISOString()
  };
  task.focusSessions.push(entry);
  task.focusSessions = task.focusSessions.slice(-12);
  task.lastFocusDurationSec = normalizedDuration;
  task.lastFocusCompletedAt = entry.completedAt;
  return true;
}

function getTaskCompletionLatency(task) {
  if (!task) {
    return null;
  }
  const latency = Number(task.lastCompletionLatencySec);
  if (!Number.isFinite(latency) || latency < 0) {
    return null;
  }
  return Math.round(latency);
}

function hasTaskAntiCheatValidation(task) {
  if (!task || task.status !== 'done') {
    return false;
  }
  const latency = getTaskCompletionLatency(task);
  const hasLatency = Number.isFinite(latency) && latency >= CHALLENGE_MIN_LATENCY_SECONDS;
  const sessions = getTaskFocusSessions(task);
  const hasLongSession = sessions.some(session => session.durationSec >= CHALLENGE_MIN_TIMER_SECONDS_VALIDATION);
  return hasLatency || hasLongSession;
}

function isTaskEligibleForChallenge(task) {
  if (!task || task.status !== 'done') {
    return false;
  }
  if (isTaskEmpty(task)) {
    return false;
  }
  return hasTaskAntiCheatValidation(task);
}

function taskHasFocusSession(task, minSeconds) {
  if (!task) {
    return false;
  }
  const sessions = getTaskFocusSessions(task);
  return sessions.some(session => session.durationSec >= minSeconds);
}

function computeChallengeDayMetrics(dateStr) {
  const tasks = Array.isArray(state.tasks?.[dateStr]) ? state.tasks[dateStr] : [];
  const eligibleTasks = tasks.filter(isTaskEligibleForChallenge);
  const totalDone = tasks.filter(task => task && task.status === 'done').length;
  const focus20 = tasks.some(task => taskHasFocusSession(task, CHALLENGE_MIN_SESSION_SECONDS));
  const focus10 = tasks.some(task => taskHasFocusSession(task, CHALLENGE_MIN_TIMER_SECONDS_VALIDATION));
  return {
    eligibleCount: eligibleTasks.length,
    totalDone,
    hasFocus20: focus20,
    hasFocus10: focus10
  };
}

function updateChallengeProgress(options = {}) {
  if (!ENABLE_CHALLENGE) {
    return false;
  }

  ensureChallengeState();
  const challenge = state.challenge.current;
  if (!challenge) {
    return false;
  }

  const referenceDateStr = typeof options.referenceDate === 'string' && isValidISODate(options.referenceDate)
    ? options.referenceDate
    : getToday();
  const referenceDate = parseISODate(referenceDateStr) || getTodayDateObj();
  referenceDate.setHours(0, 0, 0, 0);
  const now = new Date();
  const nowTime = now.getTime();

  let changed = false;
  let newlySuccessfulIndex = null;

  const startDateObj = parseISODate(challenge.startDate);
  if (startDateObj) {
    startDateObj.setHours(0, 0, 0, 0);
    if (startDateObj.getTime() > referenceDate.getTime()) {
      if (challenge.state !== 'scheduled') {
        challenge.state = 'scheduled';
        changed = true;
      }
    } else if (challenge.state === 'scheduled') {
      challenge.state = 'active';
      changed = true;
    }
  }

  let score = 0;
  let allResolved = true;

  challenge.days.forEach((day, index) => {
    if (!day || !day.date || !isValidISODate(day.date)) {
      allResolved = false;
      return;
    }
    const dayDate = parseISODate(day.date);
    if (!dayDate) {
      allResolved = false;
      return;
    }
    dayDate.setHours(0, 0, 0, 0);
    const dayStart = dayDate.getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;

    const metrics = computeChallengeDayMetrics(day.date);
    const successByTasks = metrics.eligibleCount >= CHALLENGE_MIN_TASKS_SUCCESS;
    const successByFocus = metrics.eligibleCount >= 1 && metrics.hasFocus20;
    const isSuccess = successByTasks || successByFocus;
    const previousStatus = day.status || 'pending';
    let newStatus = previousStatus;

    const catchupExpiry = typeof day.catchupExpiresAt === 'string' ? Date.parse(day.catchupExpiresAt) : null;
    const canUseCatchup = !challenge.catchupUsed && typeof day.failRecordedAt === 'string' && Number.isFinite(catchupExpiry)
      ? nowTime <= catchupExpiry
      : false;

    if (isSuccess) {
      if (previousStatus === 'fail' && canUseCatchup) {
        newStatus = 'catchup';
        day.catchupCompletedAt = new Date().toISOString();
        challenge.catchupUsed = true;
        challenge.catchupDay = day.date;
      } else if (previousStatus !== 'success' && previousStatus !== 'catchup') {
        newStatus = 'success';
      }
      if (!day.completedAt) {
        day.completedAt = new Date().toISOString();
      }
      if (previousStatus !== newStatus) {
        newlySuccessfulIndex = index;
        changed = true;
      }
      day.failRecordedAt = null;
      if (newStatus !== 'catchup') {
        day.catchupExpiresAt = null;
        day.catchupCompletedAt = null;
      }
    } else {
      if (nowTime < dayStart) {
        if (previousStatus !== 'pending') {
          newStatus = 'pending';
          changed = true;
        }
        allResolved = false;
        day.completedAt = null;
      } else if (nowTime >= dayEnd) {
        if (previousStatus === 'success' || previousStatus === 'catchup') {
          newStatus = previousStatus;
        } else {
          newStatus = 'fail';
          if (!day.failRecordedAt) {
            day.failRecordedAt = new Date().toISOString();
          }
          if (!day.catchupExpiresAt) {
            const expiryBase = day.failRecordedAt ? Date.parse(day.failRecordedAt) : nowTime;
            const expiryDate = new Date(expiryBase);
            expiryDate.setHours(expiryDate.getHours() + CHALLENGE_CATCHUP_WINDOW_HOURS);
            day.catchupExpiresAt = expiryDate.toISOString();
          }
          if (!challenge.jokerUsed) {
            day.usedJoker = true;
            challenge.jokerUsed = true;
          }
          day.completedAt = null;
          if (previousStatus !== 'fail') {
            changed = true;
          }
        }
      } else {
        if (previousStatus !== 'pending') {
          newStatus = 'pending';
          changed = true;
        }
        allResolved = false;
        day.completedAt = null;
      }

      if (newStatus === 'fail' && canUseCatchup && isSuccess) {
        newStatus = 'catchup';
        day.catchupCompletedAt = new Date().toISOString();
        challenge.catchupUsed = true;
        challenge.catchupDay = day.date;
        changed = true;
        newlySuccessfulIndex = index;
      }
    }

    if (day.status !== newStatus) {
      day.status = newStatus;
    }

    if (day.status === 'success' || day.status === 'catchup') {
      score += 1;
    } else if (day.status === 'pending' && nowTime < dayEnd) {
      allResolved = false;
    }
  });

  if (challenge.score !== score) {
    challenge.score = score;
    changed = true;
  }

  const badgeId = determineChallengeBadgeId(score);
  if (challenge.badge !== badgeId) {
    challenge.badge = badgeId;
    changed = true;
  }

  challenge.updatedAt = new Date().toISOString();

  if (Array.isArray(challenge.participants)) {
    challenge.participants.forEach(participant => {
      if (participant && participant.type === 'self') {
        participant.timeline = challenge.days.map(day => day?.status || 'pending');
        participant.score = challenge.score;
        participant.streak = computeChallengeSoftStreak(challenge);
        participant.lastActivityAt = new Date().toISOString();
      }
    });
  }

  const lastDay = challenge.days[challenge.days.length - 1];
  let challengeFinished = false;
  if (lastDay && lastDay.date && isValidISODate(lastDay.date)) {
    const lastDate = parseISODate(lastDay.date);
    if (lastDate) {
      lastDate.setHours(0, 0, 0, 0);
      const lastEnd = lastDate.getTime() + 24 * 60 * 60 * 1000;
      if (nowTime >= lastEnd && allResolved) {
        challengeFinished = true;
      }
    }
  }

  if (challengeFinished && challenge.state !== 'completed') {
    challenge.state = 'completed';
    challenge.completedAt = new Date().toISOString();
    changed = true;
  }

  if (!options.skipNotifications) {
    handleChallengeNotifications(challenge, {
      newlySuccessfulIndex,
      referenceDate: referenceDateStr,
      completed: challengeFinished
    });
  }

  if (challengeFinished) {
    handleChallengeCompletion(challenge);
  }

  return changed;
}

function handleChallengeNotifications(challenge, { newlySuccessfulIndex = null, referenceDate = getToday(), completed = false } = {}) {
  if (!ENABLE_CHALLENGE || !challenge) {
    return;
  }

  if (!state.challenge.notifications || typeof state.challenge.notifications !== 'object') {
    state.challenge.notifications = createDefaultChallengeState().notifications;
  }

  const store = state.challenge.notifications;
  const now = new Date();
  const hours = now.getHours();

  if (challenge.state === 'active') {
    const dayOffset = differenceInDays(challenge.startDate, referenceDate);
    if (Number.isFinite(dayOffset) && dayOffset >= 0 && dayOffset < CHALLENGE_DAY_COUNT) {
      const currentDay = challenge.days[dayOffset];
      if (hours < 12 && store.lastMorning !== referenceDate) {
        showToast(`Défi J${dayOffset + 1}/7 — go ✨`);
        store.lastMorning = referenceDate;
      }
      if (currentDay && currentDay.status !== 'success' && currentDay.status !== 'catchup') {
        if (hours >= 18 && store.lastEvening !== referenceDate) {
          showToast(`Encore 1 micro-tâche pour valider J${dayOffset + 1}/7.`);
          store.lastEvening = referenceDate;
        }
      }
    }
  }

  if (newlySuccessfulIndex !== null) {
    const day = challenge.days[newlySuccessfulIndex];
    if (day && !store.successDays.includes(day.date)) {
      showToast(`J${newlySuccessfulIndex + 1}/7 validé 🎉`);
      store.successDays.push(day.date);
      if (store.successDays.length > 14) {
        store.successDays = store.successDays.slice(-14);
      }
    }
  }

  const completionAlreadyShown = store.completionShownFor === challenge.id;
  if (completed && challenge.badge && challenge.badge !== 'none' && !completionAlreadyShown) {
    const badgeDef = getChallengeBadgeDefinitionById(challenge.badge);
    showToast(`Défi terminé — Badge ${badgeDef.label}`);
  }
}

function cloneChallengeForHistory(challenge) {
  const serialized = JSON.parse(JSON.stringify(challenge));
  return normalizeChallenge(serialized);
}

function persistChallengeToHistory(challenge) {
  const entry = cloneChallengeForHistory(challenge);
  if (!entry) {
    return;
  }
  const existingIdx = state.challenge.history.findIndex(item => item && item.id === entry.id);
  if (existingIdx !== -1) {
    state.challenge.history.splice(existingIdx, 1);
  }
  state.challenge.history.unshift(entry);
  state.challenge.history = state.challenge.history.slice(0, CHALLENGE_MAX_HISTORY);
}

function handleChallengeCompletion(challenge) {
  if (!ENABLE_CHALLENGE || !challenge || challenge.state !== 'completed') {
    return;
  }

  if (!state.challenge.notifications || typeof state.challenge.notifications !== 'object') {
    state.challenge.notifications = createDefaultChallengeState().notifications;
  }

  const store = state.challenge.notifications;
  const badgeDef = getChallengeBadgeDefinitionById(challenge.badge);

  if (store.completionShownFor !== challenge.id) {
    store.completionShownFor = challenge.id;
    showChallengeCompletionModal(challenge, badgeDef);
    launchConfetti();
  }

  persistChallengeToHistory(challenge);
}

function showChallengeCompletionModal(challenge, badge = null) {
  if (!challenge) {
    return;
  }

  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) {
    return;
  }

  const badgeDef = badge || getChallengeBadgeDefinitionById(challenge.badge);
  const streak = computeChallengeSoftStreak(challenge, challenge.days?.[challenge.days.length - 1]?.date || getToday());
  const summaryParts = [`Tu as validé ${challenge.score}/7 jours.`];
  if (challenge.jokerUsed) {
    summaryParts.push('Joker utilisé.');
  }
  if (challenge.catchupUsed) {
    summaryParts.push('Rattrapage réussi.');
  }

  content.classList.remove(
    'template-wide',
    'badge-modal-container',
    'quick-add-modal',
    'social-modal',
    'challenge-details-modal',
    'challenge-setup-modal'
  );
  content.classList.add('challenge-completion-modal');

  content.innerHTML = `
    <div class="challenge-completion" role="document" aria-labelledby="challenge-completion-title">
      <div class="challenge-completion-icon" aria-hidden="true">${badgeDef.icon}</div>
      <h3 class="challenge-completion-title" id="challenge-completion-title">Badge ${badgeDef.label}</h3>
      <p class="challenge-completion-summary">${summaryParts.join(' ')}</p>
      <div class="challenge-completion-timeline" id="challenge-completion-timeline"></div>
      <div class="challenge-completion-meta" id="challenge-completion-meta"></div>
      <div class="challenge-completion-actions">
        <button type="button" class="btn btn-primary" id="challenge-completion-share">Partager</button>
        <button type="button" class="btn btn-secondary" id="challenge-completion-restart">Relancer</button>
        <button type="button" class="btn btn-outline" id="challenge-completion-close">Fermer</button>
      </div>
    </div>
  `;

  const timelineContainer = document.getElementById('challenge-completion-timeline');
  if (timelineContainer) {
    const timeline = document.createElement('div');
    timeline.className = 'challenge-timeline challenge-timeline-large';
    timelineContainer.appendChild(timeline);
    renderChallengeTimeline(timeline, challenge);
  }

  const metaContainer = document.getElementById('challenge-completion-meta');
  if (metaContainer) {
    const metaEntries = [challenge.mode === 'social' ? 'Mode social' : 'Mode solo', `Streak ${streak}`];
    if (challenge.jokerUsed) {
      metaEntries.push('Joker');
    }
    if (challenge.catchupUsed) {
      metaEntries.push('Catch-up');
    }
    metaEntries.forEach(label => {
      const chip = document.createElement('span');
      chip.className = 'challenge-completion-chip';
      chip.textContent = label;
      metaContainer.appendChild(chip);
    });
  }

  const shareBtn = document.getElementById('challenge-completion-share');
  const restartBtn = document.getElementById('challenge-completion-restart');
  const closeBtn = document.getElementById('challenge-completion-close');

  if (shareBtn) {
    shareBtn.addEventListener('click', () => generateChallengeShareImage(challenge));
  }
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      closeModal();
      openChallengeSetupModal({ defaultMode: challenge.mode });
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal());
  }

  modal.dataset.activeModal = 'challenge-completion';
  modal.classList.add('show');
  setupFocusTrap(content, {
    modalKey: 'challenge-completion',
    initialFocus: shareBtn || restartBtn || closeBtn || null
  });
}

function getChallengeDayIndexForDate(challenge, dateStr) {
  if (!challenge || !challenge.startDate || !isValidISODate(dateStr)) {
    return null;
  }
  const diff = differenceInDays(challenge.startDate, dateStr);
  if (!Number.isFinite(diff)) {
    return null;
  }
  if (diff < 0 || diff >= CHALLENGE_DAY_COUNT) {
    return null;
  }
  return diff;
}

function computeChallengeSoftStreak(challenge, referenceDateStr = getToday()) {
  if (!challenge) {
    return 0;
  }
  let streak = 0;
  challenge.days.forEach(day => {
    if (!day || !day.date || day.date > referenceDateStr) {
      return;
    }
    if (day.status === 'success' || day.status === 'catchup') {
      streak += 1;
    } else if (day.status === 'fail') {
      if (!day.usedJoker) {
        streak = 0;
      }
    }
  });
  return streak;
}

function renderChallengeTimeline(container, challenge) {
  if (!container) {
    return;
  }
  container.innerHTML = '';
  const todayStr = getToday();
  challenge.days.forEach((day, index) => {
    const item = document.createElement('div');
    const status = day?.status || 'pending';
    item.className = `challenge-day challenge-day-${status}`;
    if (day?.usedJoker) {
      item.classList.add('challenge-day-joker');
    }
    if (day?.date === todayStr) {
      item.classList.add('challenge-day-today');
    }
    if (day?.date && day.date > todayStr) {
      item.classList.add('challenge-day-future');
    }
    const label = document.createElement('span');
    label.className = 'challenge-day-label';
    label.textContent = `J${index + 1}`;
    const dot = document.createElement('span');
    dot.className = 'challenge-day-dot';
    item.appendChild(label);
    item.appendChild(dot);
    container.appendChild(item);
  });
}

function createChallengeActionButton(label, variant, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  const baseClass = variant === 'primary' ? 'btn btn-primary' : variant === 'outline' ? 'btn btn-outline' : 'btn btn-secondary';
  button.className = `${baseClass} challenge-action-btn`;
  button.textContent = label;
  if (typeof onClick === 'function') {
    button.addEventListener('click', onClick);
  }
  return button;
}

function renderChallengeParticipantsPreview(challenge) {
  if (!challenge || !Array.isArray(challenge.participants)) {
    return null;
  }
  const wrapper = document.createElement('div');
  wrapper.className = 'challenge-participants-preview';
  challenge.participants.slice(0, 6).forEach(participant => {
    const chip = document.createElement('div');
    chip.className = 'challenge-participant-chip';
    const initials = participant.displayName
      ? participant.displayName.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()
      : '—';
    const avatar = document.createElement('div');
    avatar.className = 'challenge-participant-avatar';
    avatar.textContent = initials;
    const info = document.createElement('div');
    info.className = 'challenge-participant-info';
    const name = document.createElement('span');
    name.className = 'challenge-participant-name';
    name.textContent = participant.displayName || 'Participant';
    const meta = document.createElement('span');
    meta.className = 'challenge-participant-meta';
    const score = Number.isFinite(participant.score) ? participant.score : 0;
    meta.textContent = `${score}/7 · ${participant.streak || 0} streak`; 
    info.appendChild(name);
    info.appendChild(meta);
    chip.appendChild(avatar);
    chip.appendChild(info);
    wrapper.appendChild(chip);
  });
  return wrapper;
}

function renderChallengeCard() {
  const card = document.getElementById('challenge-card');
  if (!card) {
    return;
  }

  if (!ENABLE_CHALLENGE) {
    card.hidden = true;
    return;
  }

  ensureChallengeState();

  const subtitleEl = document.getElementById('challenge-subtitle');
  const badgePill = document.getElementById('challenge-badge-pill');
  const badgeIconEl = document.getElementById('challenge-badge-icon');
  const badgeLabelEl = document.getElementById('challenge-badge-label');
  const body = document.getElementById('challenge-body');
  const actions = document.getElementById('challenge-actions');

  if (!subtitleEl || !badgePill || !badgeIconEl || !badgeLabelEl || !body || !actions) {
    return;
  }

  const challenge = state.challenge.current;
  card.hidden = false;
  body.innerHTML = '';
  actions.innerHTML = '';

  if (!challenge) {
    subtitleEl.textContent = 'Active ton mini-challenge Daily-3.';
    badgePill.hidden = true;
    const intro = document.createElement('p');
    intro.className = 'challenge-empty-text';
    intro.textContent = 'Valide tes Daily-3 pendant 7 jours et débloque un badge.';
    body.appendChild(intro);

    const ctaRow = document.createElement('div');
    ctaRow.className = 'challenge-empty-actions';
    ctaRow.appendChild(createChallengeActionButton('Lancer aujourd’hui', 'primary', () => {
      startQuickChallenge({ startOption: 'today', mode: 'solo' });
    }));
    ctaRow.appendChild(createChallengeActionButton('Programmer lundi', 'outline', () => {
      startQuickChallenge({ startOption: 'next-monday', mode: 'solo' });
    }));
    ctaRow.appendChild(createChallengeActionButton('Inviter des amis', 'secondary', () => {
      openChallengeSetupModal({ defaultMode: 'social' });
    }));
    actions.appendChild(ctaRow);
    return;
  }

  const todayStr = getToday();
  const dayOffset = getChallengeDayIndexForDate(challenge, todayStr);

  if (challenge.state === 'scheduled') {
    subtitleEl.textContent = `Début le ${formatDate(challenge.startDate)}`;
  } else if (challenge.state === 'completed') {
    subtitleEl.textContent = `Terminé • ${challenge.score}/7`;
  } else if (Number.isInteger(dayOffset)) {
    subtitleEl.textContent = `Actif • J${dayOffset + 1}/7`;
  } else {
    subtitleEl.textContent = 'Actif';
  }

  if (challenge.badge && challenge.badge !== 'none') {
    const badgeDef = getChallengeBadgeDefinitionById(challenge.badge);
    badgeIconEl.textContent = badgeDef.icon;
    badgeLabelEl.textContent = badgeDef.label;
    badgePill.hidden = false;
  } else {
    badgePill.hidden = true;
  }

  const timelineWrapper = document.createElement('div');
  timelineWrapper.className = 'challenge-timeline-wrapper';
  const timeline = document.createElement('div');
  timeline.className = 'challenge-timeline';
  renderChallengeTimeline(timeline, challenge);
  timelineWrapper.appendChild(timeline);
  body.appendChild(timelineWrapper);

  const stats = document.createElement('div');
  stats.className = 'challenge-stats';

  const scoreStat = document.createElement('div');
  scoreStat.className = 'challenge-stat';
  const scoreValue = document.createElement('span');
  scoreValue.className = 'challenge-stat-value';
  scoreValue.textContent = `${challenge.score}/7`;
  const scoreLabel = document.createElement('span');
  scoreLabel.className = 'challenge-stat-label';
  scoreLabel.textContent = 'jours validés';
  scoreStat.appendChild(scoreValue);
  scoreStat.appendChild(scoreLabel);

  const streakStat = document.createElement('div');
  streakStat.className = 'challenge-stat';
  const streakValue = document.createElement('span');
  streakValue.className = 'challenge-stat-value';
  const streak = computeChallengeSoftStreak(challenge, todayStr);
  streakValue.textContent = streak;
  const streakLabel = document.createElement('span');
  streakLabel.className = 'challenge-stat-label';
  streakLabel.textContent = 'streak du défi';
  streakStat.appendChild(streakValue);
  streakStat.appendChild(streakLabel);

  stats.appendChild(scoreStat);
  stats.appendChild(streakStat);

  if (challenge.jokerUsed) {
    const jokerStat = document.createElement('div');
    jokerStat.className = 'challenge-stat';
    const jokerValue = document.createElement('span');
    jokerValue.className = 'challenge-stat-value challenge-stat-joker';
    jokerValue.textContent = 'Joker';
    const jokerLabel = document.createElement('span');
    jokerLabel.className = 'challenge-stat-label';
    jokerLabel.textContent = 'reset doux utilisé';
    jokerStat.appendChild(jokerValue);
    jokerStat.appendChild(jokerLabel);
    stats.appendChild(jokerStat);
  }

  body.appendChild(stats);

  const meta = document.createElement('div');
  meta.className = 'challenge-meta';
  const modeSpan = document.createElement('span');
  modeSpan.textContent = challenge.mode === 'social' ? 'Mode social' : 'Mode solo';
  meta.appendChild(modeSpan);
  const dateSpan = document.createElement('span');
  dateSpan.textContent = `Début : ${formatDate(challenge.startDate)}`;
  meta.appendChild(dateSpan);
  body.appendChild(meta);

  if (challenge.mode === 'social') {
    const participantsPreview = renderChallengeParticipantsPreview(challenge);
    if (participantsPreview) {
      body.appendChild(participantsPreview);
    }
  }

  const actionsRow = document.createElement('div');
  actionsRow.className = 'challenge-actions-row';

  if (challenge.state === 'completed') {
    actionsRow.appendChild(createChallengeActionButton('Partager', 'primary', () => {
      generateChallengeShareImage(challenge);
    }));
    actionsRow.appendChild(createChallengeActionButton('Relancer', 'secondary', () => {
      openChallengeSetupModal({ defaultMode: challenge.mode });
    }));
  } else {
    actionsRow.appendChild(createChallengeActionButton('Voir détails', 'secondary', () => {
      openChallengeDetailsModal();
    }));
    if (challenge.mode === 'social') {
      actionsRow.appendChild(createChallengeActionButton('Inviter', 'outline', () => {
        openChallengeSetupModal({ defaultMode: 'social' });
      }));
    }
    actionsRow.appendChild(createChallengeActionButton('Abandonner', 'outline', () => {
      abandonChallenge();
    }));
  }

  actions.appendChild(actionsRow);

  renderChallengeSocialList();
}

function startQuickChallenge({ startOption = 'today', mode = 'solo' } = {}) {
  startNewChallenge({ startOption, mode, friends: [] });
}

function getIsoFromDate(date) {
  return date.toISOString().split('T')[0];
}

function buildChallengeParticipants(mode, friends = []) {
  const participants = [createChallengeParticipant({ uid: 'local-user', displayName: 'Moi', type: 'self' })];
  if (mode === 'social') {
    const seen = new Set(['local-user']);
    friends.forEach(friend => {
      if (!friend) return;
      const label = typeof friend.displayName === 'string' && friend.displayName.trim()
        ? friend.displayName.trim()
        : (typeof friend === 'string' ? friend.trim() : 'Ami');
      if (!label) return;
      const uid = typeof friend.uid === 'string' && friend.uid.trim()
        ? friend.uid.trim()
        : `friend-${label.toLowerCase().replace(/[^a-z0-9]/gi, '')}-${Math.random().toString(36).slice(2, 6)}`;
      if (seen.has(uid) || participants.length >= 6) {
        return;
      }
      seen.add(uid);
      const participant = createChallengeParticipant({ uid, displayName: label, type: 'friend' });
      participant.timeline = Array(CHALLENGE_DAY_COUNT).fill('pending');
      participant.score = 0;
      participant.streak = 0;
      participants.push(participant);
    });
  }
  return participants;
}

function startNewChallenge({ startOption = 'today', startDate = null, mode = 'solo', friends = [] } = {}) {
  const today = getTodayDateObj();
  let startISO = startDate;
  if (!startISO) {
    if (startOption === 'next-monday') {
      const monday = getNextMondayDate();
      startISO = getIsoFromDate(monday);
    } else {
      startISO = getIsoFromDate(today);
    }
  }

  const startObj = parseISODate(startISO) || today;
  startObj.setHours(0, 0, 0, 0);

  const days = Array.from({ length: CHALLENGE_DAY_COUNT }, (_, index) => {
    const date = new Date(startObj);
    date.setDate(date.getDate() + index);
    const iso = getIsoFromDate(date);
    return normalizeChallengeDay({ date: iso, status: 'pending' }, index, startISO);
  });

  const participants = buildChallengeParticipants(mode, friends);
  const participantUids = participants
    .filter(participant => participant.type === 'friend')
    .map(participant => participant.uid);

  const challenge = normalizeChallenge({
    id: generateChallengeId(),
    ownerUid: 'local-user',
    participantUids,
    participants,
    startDate: startISO,
    mode,
    days,
    score: 0,
    badge: 'none',
    state: startObj.getTime() > today.getTime() ? 'scheduled' : 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    jokerUsed: false,
    catchupUsed: false
  });

  state.challenge.current = challenge;
  state.challenge.notifications = createDefaultChallengeState().notifications;
  updateChallengeProgress({ referenceDate: getIsoFromDate(today), skipNotifications: true });
  saveState();
  renderChallengeCard();
  showToast('Défi lancé !');
}

async function abandonChallenge() {
  if (!state.challenge.current) {
    return;
  }
  const confirmed = await showConfirmationToast('Abandonner le défi en cours ?', {
    confirmLabel: 'Abandonner',
    cancelLabel: 'Continuer'
  });
  if (!confirmed) {
    return;
  }
  const current = state.challenge.current;
  current.state = 'abandoned';
  current.updatedAt = new Date().toISOString();
  persistChallengeToHistory(current);
  state.challenge.current = null;
  state.challenge.notifications = createDefaultChallengeState().notifications;
  saveState();
  renderChallengeCard();
  renderChallengeSocialList();
  showToast('Défi abandonné.');
}

function getAvailableChallengeFriends() {
  const friends = [];
  if (socialOverviewCache && Array.isArray(socialOverviewCache.friends)) {
    socialOverviewCache.friends.forEach(friend => {
      if (!friend || !friend.uid) return;
      friends.push({ uid: friend.uid, displayName: friend.displayName || 'Ami' });
    });
  }
  return friends;
}

function generateChallengeShareImage(challenge) {
  if (!challenge) {
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#F7E6D6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#A68076';
  ctx.font = 'bold 42px "Open Sans"';
  ctx.fillText('Défi 7 jours', 60, 80);

  const badgeDef = getChallengeBadgeDefinitionById(challenge.badge);
  ctx.font = '28px "Open Sans"';
  ctx.fillText(`${badgeDef.icon} ${badgeDef.label}`, 60, 130);

  ctx.font = '24px "Open Sans"';
  ctx.fillText(`${challenge.score}/7 jours validés`, 60, 180);
  const streak = computeChallengeSoftStreak(challenge);
  ctx.fillText(`Streak : ${streak} jour${streak > 1 ? 's' : ''}`, 60, 220);

  ctx.font = '20px "Open Sans"';
  ctx.fillText(`Début : ${formatDate(challenge.startDate)}`, 60, 260);

  const circleRadius = 32;
  const startX = 80;
  const startY = 360;
  const gap = 110;
  challenge.days.forEach((day, index) => {
    const x = startX + index * gap;
    ctx.beginPath();
    let fill = '#EFC3C2';
    if (day.status === 'success') {
      fill = '#CFE8C2';
    } else if (day.status === 'catchup') {
      fill = '#D8C8F2';
    } else if (day.status === 'fail') {
      fill = '#F9D8D6';
    } else if (day.status === 'pending') {
      fill = '#EAC4AF';
    }
    ctx.fillStyle = fill;
    ctx.arc(x, startY, circleRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#A68076';
    ctx.font = 'bold 18px "Open Sans"';
    ctx.fillText(`J${index + 1}`, x - 15, startY + 6);
  });

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `defi-7-jours-${challenge.badge || 'share'}.png`;
  link.click();
}

function openChallengeDetailsModal(challenge = state.challenge.current) {
  if (!challenge) {
    return;
  }

  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) {
    return;
  }

  content.classList.remove(
    'template-wide',
    'badge-modal-container',
    'quick-add-modal',
    'social-modal',
    'challenge-setup-modal',
    'challenge-completion-modal'
  );
  content.classList.add('challenge-details-modal');

  const badgeDef = getChallengeBadgeDefinitionById(challenge.badge);

  content.innerHTML = `
    <div class="challenge-details">
      <div class="challenge-details-head">
        <h3>Défi 7 jours</h3>
        <button type="button" class="challenge-details-close" id="challenge-details-close" aria-label="Fermer">✕</button>
      </div>
      <p class="challenge-details-subtitle">${formatDate(challenge.startDate)} → ${formatDate(challenge.days[challenge.days.length - 1].date)}</p>
      <div class="challenge-details-summary">
        <div class="challenge-details-badge">${badgeDef.icon} ${badgeDef.label}</div>
        <div class="challenge-details-score">${challenge.score}/7 jours validés</div>
        <div class="challenge-details-streak">Streak : ${computeChallengeSoftStreak(challenge)}</div>
      </div>
      <div class="challenge-details-timeline" id="challenge-details-timeline"></div>
      <section class="challenge-details-participants" aria-label="Participants">
        <h4>Participants</h4>
        <div class="challenge-details-participants-list" id="challenge-details-participants"></div>
      </section>
      <div class="challenge-details-actions">
        <button type="button" class="btn btn-secondary" id="challenge-details-share">Partager</button>
        <button type="button" class="btn btn-outline" id="challenge-details-close-btn">Fermer</button>
      </div>
    </div>
  `;

  const timelineContainer = document.getElementById('challenge-details-timeline');
  if (timelineContainer) {
    const timeline = document.createElement('div');
    timeline.className = 'challenge-timeline challenge-timeline-large';
    timelineContainer.appendChild(timeline);
    renderChallengeTimeline(timeline, challenge);
  }

  const participantsContainer = document.getElementById('challenge-details-participants');
  if (participantsContainer) {
    participantsContainer.innerHTML = '';
    (challenge.participants || []).forEach(participant => {
      const card = document.createElement('article');
      card.className = 'challenge-details-participant';
      const header = document.createElement('div');
      header.className = 'challenge-details-participant-header';
      header.textContent = participant.displayName || 'Participant';
      const meta = document.createElement('div');
      meta.className = 'challenge-details-participant-meta';
      const score = Number.isFinite(participant.score) ? participant.score : 0;
      meta.textContent = `${score}/7 · ${participant.streak || 0} streak`;
      card.appendChild(header);
      card.appendChild(meta);

      const miniTimeline = document.createElement('div');
      miniTimeline.className = 'challenge-details-mini-timeline';
      const timelineData = Array.isArray(participant.timeline) ? participant.timeline : challenge.days.map(day => day.status);
      timelineData.slice(0, CHALLENGE_DAY_COUNT).forEach(status => {
        const dot = document.createElement('span');
        dot.className = `challenge-mini-dot challenge-mini-${status}`;
        miniTimeline.appendChild(dot);
      });
      card.appendChild(miniTimeline);

      if (participant.type === 'friend') {
        const cheerBtn = document.createElement('button');
        cheerBtn.type = 'button';
        cheerBtn.className = 'challenge-cheer-btn';
        cheerBtn.innerHTML = '👏<span class="sr-only">Envoyer un clap</span>';
        cheerBtn.addEventListener('click', () => {
          sendChallengeCheer(participant.uid);
        });
        card.appendChild(cheerBtn);
      }

      participantsContainer.appendChild(card);
    });
  }

  const closeBtn = document.getElementById('challenge-details-close');
  const closeBtnSecondary = document.getElementById('challenge-details-close-btn');
  const shareBtn = document.getElementById('challenge-details-share');

  const closeHandler = () => closeModal();
  if (closeBtn) {
    closeBtn.addEventListener('click', closeHandler);
  }
  if (closeBtnSecondary) {
    closeBtnSecondary.addEventListener('click', closeHandler);
  }
  if (shareBtn) {
    shareBtn.addEventListener('click', () => generateChallengeShareImage(challenge));
  }

  modal.dataset.activeModal = 'challenge-details';
  modal.classList.add('show');
  setupFocusTrap(content, { modalKey: 'challenge-details', initialFocus: shareBtn || closeBtnSecondary || closeBtn });
}

function sendChallengeCheer(participantUid) {
  const challenge = state.challenge.current;
  if (!challenge || !Array.isArray(challenge.participants)) {
    return;
  }
  const participant = challenge.participants.find(entry => entry && entry.uid === participantUid);
  if (!participant) {
    return;
  }
  participant.cheers = (participant.cheers || 0) + 1;
  participant.lastActivityAt = new Date().toISOString();
  showToast('👏 envoyé !');
  saveState();
  renderChallengeCard();
}

function removeChallengeHistoryEntry(challengeId) {
  if (!state.challenge.history) {
    return;
  }
  const idx = state.challenge.history.findIndex(entry => entry && entry.id === challengeId);
  if (idx !== -1) {
    state.challenge.history.splice(idx, 1);
    saveState();
    renderChallengeSocialList();
  }
}

function buildChallengeSocialCard(challenge, { isCurrent = false } = {}) {
  const card = document.createElement('article');
  card.className = 'challenge-social-card';
  const header = document.createElement('div');
  header.className = 'challenge-social-card-head';
  const title = document.createElement('h5');
  title.textContent = isCurrent ? 'Défi en cours' : 'Défi terminé';
  header.appendChild(title);
  const status = document.createElement('span');
  status.className = 'challenge-social-status';
  status.textContent = challenge.state === 'completed' ? 'Terminé' : (challenge.state === 'scheduled' ? 'Programmé' : 'Actif');
  header.appendChild(status);
  card.appendChild(header);

  const summary = document.createElement('div');
  summary.className = 'challenge-social-summary';
  summary.innerHTML = `<span>${challenge.score}/7</span><span>Streak ${computeChallengeSoftStreak(challenge)}</span>`;
  card.appendChild(summary);

  if (Array.isArray(challenge.participants) && challenge.participants.length) {
    const participantList = document.createElement('div');
    participantList.className = 'challenge-social-participants';
    challenge.participants.slice(0, 4).forEach(participant => {
      const item = document.createElement('div');
      item.className = 'challenge-social-participant';
      item.textContent = `${participant.displayName || 'Ami'} · ${participant.score || 0}/7`;
      participantList.appendChild(item);
    });
    card.appendChild(participantList);
  }

  const actions = document.createElement('div');
  actions.className = 'challenge-social-actions';
  const detailsBtn = document.createElement('button');
  detailsBtn.type = 'button';
  detailsBtn.className = 'btn btn-secondary';
  detailsBtn.textContent = 'Voir';
  detailsBtn.addEventListener('click', () => openChallengeDetailsModal(challenge));
  actions.appendChild(detailsBtn);

  if (isCurrent) {
    const shareBtn = document.createElement('button');
    shareBtn.type = 'button';
    shareBtn.className = 'btn btn-outline';
    shareBtn.textContent = 'Partager';
    shareBtn.addEventListener('click', () => generateChallengeShareImage(challenge));
    actions.appendChild(shareBtn);
  } else {
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn btn-outline';
    closeBtn.textContent = 'Fermer';
    closeBtn.addEventListener('click', () => removeChallengeHistoryEntry(challenge.id));
    actions.appendChild(closeBtn);
  }

  card.appendChild(actions);
  return card;
}

function renderChallengeSocialList() {
  const container = document.getElementById('challenge-social-list');
  const empty = document.getElementById('challenge-social-empty');
  if (!container) {
    return;
  }
  ensureChallengeState();
  container.innerHTML = '';
  const current = state.challenge.current;
  if (current) {
    container.appendChild(buildChallengeSocialCard(current, { isCurrent: true }));
  }
  (state.challenge.history || []).forEach(entry => {
    container.appendChild(buildChallengeSocialCard(entry, { isCurrent: false }));
  });
  if (empty) {
    empty.hidden = Boolean(current || (state.challenge.history || []).length);
  }
}

function openChallengeSetupModal({ defaultMode = 'solo', inviteOnly = false } = {}) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) {
    return;
  }

  ensureChallengeState();
  let activeChallenge = state.challenge.current;
  if (inviteOnly && !activeChallenge) {
    inviteOnly = false;
  }

  content.classList.remove(
    'template-wide',
    'badge-modal-container',
    'quick-add-modal',
    'social-modal',
    'challenge-details-modal',
    'challenge-completion-modal'
  );
  content.classList.add('challenge-setup-modal');

  const availableFriends = getAvailableChallengeFriends();
  if (!inviteOnly && socialProvider && typeof socialProvider.getFriends === 'function') {
    refreshSocialOverview({ silent: true }).catch(() => {});
  }

  const modalTitle = inviteOnly ? 'Inviter des amis' : 'Nouveau défi 7 jours';
  const primaryLabel = inviteOnly ? 'Inviter' : 'Lancer le défi';

  const buildFriendOption = (friend) => {
    const wrapper = document.createElement('label');
    wrapper.className = 'challenge-friend-option';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'challenge-friend';
    input.value = friend.uid;
    input.dataset.name = friend.displayName || 'Ami';
    wrapper.appendChild(input);
    const span = document.createElement('span');
    span.textContent = friend.displayName || 'Ami';
    wrapper.appendChild(span);
    return wrapper;
  };

  const buildFriendListHTML = () => {
    const container = document.createElement('div');
    container.className = 'challenge-friends-list';
    const limit = inviteOnly && activeChallenge
      ? Math.max(0, 6 - (activeChallenge.participants ? activeChallenge.participants.length : 1))
      : 5;
    const existingUids = new Set(inviteOnly && activeChallenge && Array.isArray(activeChallenge.participants)
      ? activeChallenge.participants.map(participant => participant.uid)
      : []);
    availableFriends.forEach(friend => {
      if (!friend || existingUids.has(friend.uid)) {
        return;
      }
      if (container.childElementCount >= limit) {
        return;
      }
      container.appendChild(buildFriendOption(friend));
    });
    return container;
  };

  const baseMarkup = document.createElement('div');
  baseMarkup.className = 'challenge-setup';
  baseMarkup.innerHTML = `
    <div class="challenge-setup-head">
      <h3>${modalTitle}</h3>
      <button type="button" class="challenge-setup-close" id="challenge-setup-close" aria-label="Fermer">✕</button>
    </div>
  `;

  const form = document.createElement('form');
  form.className = 'challenge-setup-form';

  if (!inviteOnly) {
    form.innerHTML = `
      <fieldset class="challenge-fieldset">
        <legend>Début</legend>
        <label class="challenge-radio">
          <input type="radio" name="challenge-start" value="today" checked>
          <span>Aujourd’hui</span>
        </label>
        <label class="challenge-radio">
          <input type="radio" name="challenge-start" value="next-monday">
          <span>Lundi prochain</span>
        </label>
      </fieldset>
      <fieldset class="challenge-fieldset">
        <legend>Mode</legend>
        <label class="challenge-radio">
          <input type="radio" name="challenge-mode" value="solo" ${defaultMode === 'social' ? '' : 'checked'}>
          <span>Solo</span>
        </label>
        <label class="challenge-radio">
          <input type="radio" name="challenge-mode" value="social" ${defaultMode === 'social' ? 'checked' : ''}>
          <span>Avec amis</span>
        </label>
      </fieldset>
    `;
  } else {
    form.innerHTML = '';
  }

  const friendsBlock = document.createElement('div');
  friendsBlock.className = 'challenge-friends-block';
  friendsBlock.innerHTML = inviteOnly
    ? '<h4>Ajouter des amis (max 5)</h4>'
    : '<h4>Sélectionne jusqu’à 5 amis</h4>';
  const friendsList = buildFriendListHTML();
  if (friendsList.childElementCount > 0) {
    friendsBlock.appendChild(friendsList);
  } else {
    const empty = document.createElement('p');
    empty.className = 'challenge-friends-empty';
    empty.textContent = 'Aucun ami disponible pour le moment.';
    friendsBlock.appendChild(empty);
  }

  const manualAdd = document.createElement('div');
  manualAdd.className = 'challenge-add-friend';
  manualAdd.innerHTML = `
    <input type="text" id="challenge-manual-friend" placeholder="Nom d’un ami">
    <button type="button" class="btn btn-secondary" id="challenge-add-friend-btn">Ajouter</button>
  `;
  friendsBlock.appendChild(manualAdd);

  const actionsRow = document.createElement('div');
  actionsRow.className = 'challenge-setup-actions';
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn btn-primary';
  submitBtn.textContent = primaryLabel;
  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'btn btn-outline';
  cancelBtn.id = 'challenge-setup-cancel';
  cancelBtn.textContent = 'Annuler';
  actionsRow.appendChild(submitBtn);
  actionsRow.appendChild(cancelBtn);

  if (!inviteOnly) {
    form.appendChild(friendsBlock);
    form.appendChild(actionsRow);
  } else {
    form.appendChild(friendsBlock);
    form.appendChild(actionsRow);
  }

  baseMarkup.appendChild(form);
  content.innerHTML = '';
  content.appendChild(baseMarkup);

  const closeBtn = document.getElementById('challenge-setup-close');
  const cancelButton = document.getElementById('challenge-setup-cancel');

  const closeModalHandler = () => closeModal();
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModalHandler);
  }
  if (cancelButton) {
    cancelButton.addEventListener('click', closeModalHandler);
  }

  const friendsContainer = friendsBlock.querySelector('.challenge-friends-list');
  const manualInput = document.getElementById('challenge-manual-friend');
  const addFriendBtn = document.getElementById('challenge-add-friend-btn');

  const appendManualFriend = () => {
    if (!manualInput) return;
    const name = manualInput.value.trim();
    if (!name) return;
    const limit = inviteOnly && activeChallenge
      ? Math.max(0, 6 - (activeChallenge.participants ? activeChallenge.participants.length : 1))
      : 5;
    if (friendsContainer && friendsContainer.childElementCount >= limit) {
      showToast('Limite de participants atteinte.');
      return;
    }
    const uid = `manual-${name.toLowerCase().replace(/[^a-z0-9]/gi, '')}-${Math.random().toString(36).slice(2, 6)}`;
    const option = buildFriendOption({ uid, displayName: name });
    if (friendsContainer) {
      friendsContainer.appendChild(option);
    }
    manualInput.value = '';
  };

  if (addFriendBtn) {
    addFriendBtn.addEventListener('click', appendManualFriend);
  }
  if (manualInput) {
    manualInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        appendManualFriend();
      }
    });
  }

  const updateFriendsVisibility = () => {
    if (inviteOnly) {
      friendsBlock.hidden = false;
      return;
    }
    const modeInput = content.querySelector('input[name="challenge-mode"]:checked');
    const mode = modeInput ? modeInput.value : 'solo';
    friendsBlock.hidden = mode !== 'social';
  };

  if (!inviteOnly) {
    updateFriendsVisibility();
    const modeInputs = Array.from(content.querySelectorAll('input[name="challenge-mode"]'));
    modeInputs.forEach(input => {
      input.addEventListener('change', updateFriendsVisibility);
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const friendInputs = Array.from(content.querySelectorAll('input[name="challenge-friend"]:checked'));
    const selectedFriends = friendInputs.map(input => ({ uid: input.value, displayName: input.dataset.name || input.value }));
    if (inviteOnly && activeChallenge) {
      const availableSlots = Math.max(0, 6 - (activeChallenge.participants ? activeChallenge.participants.length : 1));
      if (selectedFriends.length > availableSlots) {
        showToast('Maximum 5 amis par défi.');
        return;
      }
      selectedFriends.forEach(friend => {
        if (!friend) return;
        const exists = activeChallenge.participants.some(participant => participant.uid === friend.uid);
        if (exists) return;
        const participant = createChallengeParticipant({ uid: friend.uid, displayName: friend.displayName, type: 'friend' });
        participant.timeline = Array(CHALLENGE_DAY_COUNT).fill('pending');
        activeChallenge.participants.push(participant);
        if (!activeChallenge.participantUids.includes(friend.uid)) {
          activeChallenge.participantUids.push(friend.uid);
        }
      });
      activeChallenge.mode = 'social';
      activeChallenge.updatedAt = new Date().toISOString();
      saveState();
      renderChallengeCard();
      renderChallengeSocialList();
      showToast('Invitations enregistrées.');
      closeModal();
      return;
    }

    const modeInput = content.querySelector('input[name="challenge-mode"]:checked');
    const mode = modeInput ? modeInput.value : defaultMode;
    const startInput = content.querySelector('input[name="challenge-start"]:checked');
    const startOption = startInput ? startInput.value : 'today';

    startNewChallenge({ startOption: startOption === 'next-monday' ? 'next-monday' : 'today', mode, friends: selectedFriends });
    closeModal();
  });

  modal.dataset.activeModal = 'challenge-setup';
  modal.classList.add('show');
  setupFocusTrap(content, { modalKey: 'challenge-setup', initialFocus: submitBtn });
}

function isTaskEmpty(task) {
  if (!task) return true;
  const title = (task.title || '').trim();
  const moment = (task.moment || '').trim();
  const audio = normalizeAudioValue(task.audio);
  return !title && !moment && (audio === 'Aucun' || !audio);
}

function formatAudioLabel(audioValue) {
  if (!audioValue || audioValue === 'Aucun') return '';
  const entry = getAudioEntryById(audioValue);
  return entry ? entry.title : '';
}

function formatTaskAudioLabel(task) {
  if (!task) return '';
  const directLabel = formatAudioLabel(task.audio);
  if (directLabel) {
    return directLabel;
  }
  const resolved = getResolvedAudioForTask(task);
  if (resolved && resolved.entry) {
    return `${resolved.entry.title} (auto)`;
  }
  return '';
}

function formatTaskDuration(task) {
  if (!task) return '';
  const effective = getEffectiveTaskDuration(task);
  if (!Number.isFinite(effective) || effective <= 0) {
    return '';
  }
  return `${effective} min`;
}

function formatCount(value, singular, plural) {
  const normalized = Number(value) || 0;
  return `${normalized} ${normalized > 1 ? plural : singular}`;
}

function getEarliestTaskDate() {
  if (!state.tasks) return null;
  const taskDates = Object.keys(state.tasks).filter(Boolean);
  if (!taskDates.length) return null;
  taskDates.sort();
  return taskDates[0];
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  return `${days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
}

function formatTaskMeta(task) {
  const parts = [];
  if (task.moment) {
    parts.push(task.moment);
  }
  const audioLabel = formatTaskAudioLabel(task);
  if (audioLabel) {
    parts.push(audioLabel);
  }
  const durationLabel = formatTaskDuration(task);
  if (durationLabel) {
    parts.push(durationLabel);
  }
  return parts.join(' • ') || '';
}

function getDefaultMomentForSlot(slotIdx) {
  return QUICK_ADD_SLOT_MOMENTS[slotIdx] || 'Matin';
}

function getMomentSlotIndex(momentLabel) {
  if (!momentLabel) return -1;
  return QUICK_ADD_SLOT_MOMENTS.findIndex(label => label.toLowerCase() === momentLabel.toLowerCase());
}

function getDefaultRitualForMoment(momentLabel) {
  if (!momentLabel) return 'Aucun';
  return QUICK_ADD_MOMENT_DEFAULT_AUDIO[momentLabel] || 'Aucun';
}

function getDefaultTimeForMoment(momentLabel) {
  if (!momentLabel) return '';
  return QUICK_ADD_MOMENT_DEFAULT_TIME[momentLabel] || '';
}

function getNextMomentLabel() {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 12) return 'Matin';
  if (hour < 18) return 'Après-midi';
  return 'Soir';
}

function parseTimeFromString(timeString) {
  if (!timeString || typeof timeString !== 'string') return null;
  const trimmed = timeString.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/^(\d{1,2})(?:[:hH](\d{2}))?$/);
  if (!match) return null;
  const hours = Number.parseInt(match[1], 10);
  const minutes = match[2] !== undefined ? Number.parseInt(match[2], 10) : 0;
  if (!Number.isFinite(hours) || hours < 0 || hours > 23) return null;
  if (!Number.isFinite(minutes) || minutes < 0 || minutes > 59) return null;
  return { hours, minutes };
}

function resolveTaskScheduledTime(task) {
  if (!task) return null;
  const explicit = parseTimeFromString(task.time || '');
  if (explicit) {
    return explicit;
  }
  const momentTime = parseTimeFromString(task.moment || '');
  if (momentTime) {
    return momentTime;
  }
  const slot = categorizeMomentSlot(task.moment);
  const fallback = getDefaultTimeForMoment(slot);
  if (!fallback) return null;
  return parseTimeFromString(fallback);
}

function isTaskScheduleLate(task) {
  if (!task || task.status === 'done') return false;
  const schedule = resolveTaskScheduledTime(task);
  if (!schedule) return false;
  const now = new Date();
  const candidate = new Date(now);
  candidate.setHours(schedule.hours, schedule.minutes, 0, 0);
  return candidate.getTime() < now.getTime();
}

function setupFocusTrap(container, { modalKey = null, initialFocus = null } = {}) {
  releaseFocusTrap();
  if (!container) return;

  const modal = document.getElementById('modal-overlay');
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const getFocusable = () =>
    Array.from(container.querySelectorAll(selector)).filter(el => el.offsetParent !== null || el === document.activeElement);

  const handleKeydown = (event) => {
    if (modalKey && modal && modal.dataset.activeModal !== modalKey) {
      return;
    }

    if (event.key === 'Escape' && modalKey === 'quick-add') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusable = getFocusable();
    if (!focusable.length) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first || !container.contains(document.activeElement)) {
        event.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  document.addEventListener('keydown', handleKeydown);

  releaseFocusTrapCallback = () => {
    document.removeEventListener('keydown', handleKeydown);
    releaseFocusTrapCallback = null;
  };

  const focusable = getFocusable();
  const targetFocus = initialFocus || focusable[0];
  if (targetFocus && typeof targetFocus.focus === 'function') {
    targetFocus.focus();
  }
}

function releaseFocusTrap() {
  if (typeof releaseFocusTrapCallback === 'function') {
    releaseFocusTrapCallback();
  }
}

function categorizeMomentSlot(momentValue) {
  if (!momentValue) return null;
  const raw = momentValue.toString().trim();
  if (!raw) return null;
  const value = raw.toLowerCase();

  if (value.includes('matin') || value.includes('a.m') || value.includes('am')) {
    return 'Matin';
  }

  if (
    value.includes('après') ||
    value.includes('apres') ||
    value.includes('apr') ||
    value.includes('apm') ||
    value.includes('pm') ||
    value.includes('midi')
  ) {
    return 'Après-midi';
  }

  if (
    value.includes('soir') ||
    value.includes('soirée') ||
    value.includes('nuit') ||
    value.includes('evening') ||
    value.includes('fin de journée')
  ) {
    return 'Soir';
  }

  const match = value.match(/(\d{1,2})(?::\d{2})?/);
  if (match) {
    const hour = parseInt(match[1], 10);
    if (!Number.isNaN(hour)) {
      if (hour < 12) return 'Matin';
      if (hour < 18) return 'Après-midi';
      if (hour <= 23) return 'Soir';
    }
  }

  return null;
}

function buildSparklinePath(values, width, height) {
  if (!Array.isArray(values) || values.length === 0) return '';

  const step = values.length > 1 ? width / (values.length - 1) : width;
  let path = '';
  let drawing = false;

  values.forEach((value, index) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      const clamped = Math.max(0, Math.min(100, value));
      const x = index * step;
      const y = height - (clamped / 100) * height;
      const command = drawing ? 'L' : 'M';
      path += `${command}${x.toFixed(2)},${y.toFixed(2)} `;
      drawing = true;
    } else {
      drawing = false;
    }
  });

  return path.trim();
}

function getLastSevenDates() {
  const dates = [];
  const today = getTodayDateObj();
  for (let offset = 6; offset >= 0; offset--) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

function ensureReportEntry(dateStr) {
  if (!state.reports[dateStr]) {
    state.reports[dateStr] = {
      total: 0,
      reasons: {
        trop_gros: 0,
        pas_clair: 0,
        pas_le_temps: 0,
        faible_energie: 0
      }
    };
  } else if (!state.reports[dateStr].reasons) {
    state.reports[dateStr].reasons = {
      trop_gros: 0,
      pas_clair: 0,
      pas_le_temps: 0,
      faible_energie: 0
    };
  }
  if (typeof state.reports[dateStr].total !== 'number') {
    state.reports[dateStr].total = state.reports[dateStr].total ? Number(state.reports[dateStr].total) : 0;
  }
}

function recordReportForDate(dateStr, reasonKey, task, sourceDate) {
  if (!reasonKey) return;
  ensureReportEntry(dateStr);
  state.reports[dateStr].total = (state.reports[dateStr].total || 0) + 1;
  if (state.reports[dateStr].reasons[reasonKey] === undefined) {
    state.reports[dateStr].reasons[reasonKey] = 0;
  }
  state.reports[dateStr].reasons[reasonKey] += 1;
  logTaskReportEntry(task, sourceDate || dateStr, reasonKey);
}

function normalizeLegacyReportReasons() {
  if (!state.reports || typeof state.reports !== 'object') {
    return;
  }
  Object.values(state.reports).forEach(entry => {
    if (!entry || typeof entry !== 'object') return;
    if (!entry.reasons || typeof entry.reasons !== 'object') return;
    const reasons = entry.reasons;
    if (reasons['trop-gros']) {
      reasons.trop_gros = (reasons.trop_gros || 0) + reasons['trop-gros'];
      delete reasons['trop-gros'];
    }
    if (reasons['pas-clair']) {
      reasons.pas_clair = (reasons.pas_clair || 0) + reasons['pas-clair'];
      delete reasons['pas-clair'];
    }
    if (reasons['pas-temps']) {
      reasons.pas_le_temps = (reasons.pas_le_temps || 0) + reasons['pas-temps'];
      delete reasons['pas-temps'];
    }
    if (reasons.distraction) {
      delete reasons.distraction;
    }
    if (reasons.peur) {
      delete reasons.peur;
    }
  });
}

function logTaskReportEntry(task, sourceDate, reasonKey) {
  if (!state.reportHistory) {
    state.reportHistory = [];
  }
  const entry = {
    taskId: task?.id || null,
    title: task?.title || '',
    normalizedTitle: normalizeTaskTitleForGrouping(task?.title || ''),
    sourceDate: sourceDate || null,
    reason: reasonKey,
    reportedAt: new Date().toISOString()
  };
  state.reportHistory.push(entry);
  cleanupReportHistory();
}

function cleanupReportHistory() {
  if (!Array.isArray(state.reportHistory)) {
    state.reportHistory = [];
    return;
  }
  const today = getTodayDateObj();
  const cutoff = new Date(today);
  cutoff.setDate(today.getDate() - 13);
  state.reportHistory = state.reportHistory.filter(entry => {
    if (!entry || !entry.reason) {
      return false;
    }
    const reportedAt = entry.reportedAt ? new Date(entry.reportedAt) : null;
    if (!reportedAt || Number.isNaN(reportedAt.getTime())) {
      return false;
    }
    return reportedAt >= cutoff;
  });
}

function stripAccents(text) {
  if (!text) return '';
  try {
    return text.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  } catch (error) {
    return text;
  }
}

function normalizeTaskTitleForGrouping(title) {
  if (!title) return '';
  const withoutAccents = stripAccents(title.toLowerCase());
  const sanitized = withoutAccents.replace(/[^a-z0-9\s]/g, ' ');
  const words = sanitized
    .split(/\s+/)
    .map(word => word.trim())
    .filter(word => word && !MICROPAS_STOPWORDS.has(word));
  return words.join('-');
}

function getTaskSuggestionGroupKey(task, dateStr) {
  if (!task) return null;
  if (task.id) {
    return `id:${task.id}`;
  }
  const normalizedTitle = normalizeTaskTitleForGrouping(task.title || '');
  if (!normalizedTitle) {
    return null;
  }
  const dateComponent = dateStr || '';
  return `title:${dateComponent}:${normalizedTitle}`;
}

function getReportEntriesForTask(task, dateStr, windowDays = 14) {
  if (!task) return [];
  if (!Array.isArray(state.reportHistory)) return [];
  const normalizedTitle = normalizeTaskTitleForGrouping(task.title || '');
  const today = getTodayDateObj();
  const cutoff = new Date(today);
  cutoff.setDate(today.getDate() - (windowDays - 1));
  return state.reportHistory.filter(entry => {
    if (!entry || !entry.reason) return false;
    const reportedAt = entry.reportedAt ? new Date(entry.reportedAt) : null;
    if (!reportedAt || Number.isNaN(reportedAt.getTime()) || reportedAt < cutoff) {
      return false;
    }
    if (task.id && entry.taskId === task.id) {
      return true;
    }
    if (!normalizedTitle) {
      return false;
    }
    return entry.sourceDate === dateStr && entry.normalizedTitle === normalizedTitle;
  });
}

function getDominantReasonForTask(task, dateStr, { windowDays = 14, minOccurrences = 2 } = {}) {
  const entries = getReportEntriesForTask(task, dateStr, windowDays);
  if (!entries.length) {
    return null;
  }
  const counts = {};
  let bestReason = null;
  let bestCount = 0;
  entries.forEach(entry => {
    if (!MICROPAS_SUGGESTIONS[entry.reason]) {
      return;
    }
    counts[entry.reason] = (counts[entry.reason] || 0) + 1;
    if (counts[entry.reason] > bestCount) {
      bestCount = counts[entry.reason];
      bestReason = entry.reason;
    }
  });
  if (!bestReason || bestCount < minOccurrences) {
    return null;
  }
  return { reason: bestReason, count: bestCount };
}

function getMicropasSuggestionDetails(reason, task) {
  if (!reason || !MICROPAS_SUGGESTIONS[reason]) {
    return null;
  }
  const base = MICROPAS_SUGGESTIONS[reason];
  const cleanTitle = (task?.title || '').trim();
  const details = {
    ...base,
    description: '',
    micropasText: base.micropasText,
    showSoftReschedule: reason === 'pas_le_temps'
  };
  switch (reason) {
    case 'trop_gros':
      details.description = 'Prépare 5’, exécute 10’, puis note la suite.';
      break;
    case 'pas_clair': {
      const target = cleanTitle || 'objectif';
      details.description = 'Clarifie 3 critères “fini quand…”.';
      details.micropasText = `Clarifier “fini quand…” → ${target} (3 critères)`;
      break;
    }
    case 'pas_le_temps':
      details.description = 'Version 10 min + replanification douce.';
      break;
    case 'faible_energie': {
      const resource = cleanTitle || 'ressource';
      details.description = 'Variante faible charge pour rester dans le flow.';
      details.micropasText = `Lire/Parcourir 10’ : ${resource}`;
      break;
    }
    default:
      break;
  }
  return details;
}

function getDashboardSuggestionForTask(task, dateStr) {
  if (!task) return null;
  const groupKey = getTaskSuggestionGroupKey(task, dateStr);
  if (!groupKey || isSuggestionSuppressed(groupKey)) {
    return null;
  }
  const entry = state.micropasSuggestionState?.[groupKey];
  if (entry && Array.isArray(entry.pendingSuccesses) && task.id) {
    const hasPending = entry.pendingSuccesses.some(item => item && item.taskId === task.id);
    if (hasPending) {
      return null;
    }
  }
  const dominant = getDominantReasonForTask(task, dateStr, { windowDays: 5, minOccurrences: 2 });
  if (!dominant) {
    return null;
  }
  const details = getMicropasSuggestionDetails(dominant.reason, task);
  if (!details) {
    return null;
  }
  return {
    reason: dominant.reason,
    count: dominant.count,
    details,
    groupKey
  };
}

function applyMicropasSuggestion({ reason, task, dateStr, taskIdx, micropasText, softReschedule = false }) {
  if (!task || !reason) {
    return { applied: false };
  }
  ensureTasksForDate(dateStr);
  const details = getMicropasSuggestionDetails(reason, task);
  if (!details) {
    return { applied: false };
  }
  const tasksForDate = state.tasks[dateStr];
  if (!Array.isArray(tasksForDate)) {
    return { applied: false };
  }
  if (reason === 'trop_gros') {
    const filledSlots = tasksForDate.filter(t => t && !isTaskEmpty(t)).length;
    if (filledSlots <= 1) {
      task.duration = details.durationSingleSlot || 10;
    } else {
      const baseTitle = (task.title || '').trim();
      task.title = baseTitle ? `Partie 1/3 : ${baseTitle}` : 'Partie 1/3';
      task.duration = task.duration || details.defaultDuration || 25;
    }
  } else if (reason === 'pas_clair') {
    const baseTitle = (task.title || '').trim();
    task.title = baseTitle ? `Clarifier “fini quand…” → ${baseTitle}` : 'Clarifier “fini quand…” (3 critères)';
    task.duration = MICROPAS_SUGGESTIONS[reason].duration;
  } else if (reason === 'pas_le_temps') {
    task.duration = MICROPAS_SUGGESTIONS[reason].duration;
  } else if (reason === 'faible_energie') {
    const baseTitle = (task.title || '').trim();
    task.title = baseTitle ? `Lire/Parcourir 10’ : ${baseTitle}` : 'Lire/Parcourir 10’';
    task.duration = MICROPAS_SUGGESTIONS[reason].duration;
  }

  task.usesDefaultDuration = false;

  const resolvedMicropas = micropasText && micropasText.trim() ? micropasText.trim() : (details.micropasText || '');
  task.micropas = resolvedMicropas;

  let rescheduleTarget = null;
  if (reason === 'pas_le_temps' && softReschedule) {
    rescheduleTarget = findSoftRescheduleTarget(dateStr, taskIdx);
  }

  return { applied: true, rescheduleTarget, details };
}

function createInlineMicropasCard({ dateStr, taskIdx, suggestion }) {
  const card = document.createElement('div');
  card.className = 'micropas-inline-card';
  card.setAttribute('hidden', '');

  const header = document.createElement('div');
  header.className = 'micropas-inline-header';
  header.textContent = suggestion.details.label;

  const description = document.createElement('p');
  description.className = 'micropas-inline-desc';
  description.textContent = suggestion.details.description || '';

  const textarea = document.createElement('textarea');
  textarea.rows = 3;
  textarea.className = 'micropas-inline-text';
  textarea.value = suggestion.details.micropasText || '';
  textarea.setAttribute('aria-label', 'Micropas suggéré');

  const actions = document.createElement('div');
  actions.className = 'micropas-inline-actions';

  const applyBtn = document.createElement('button');
  applyBtn.type = 'button';
  applyBtn.className = 'btn btn-primary';
  applyBtn.textContent = 'Appliquer cette version';

  applyBtn.addEventListener('click', () => {
    ensureTasksForDate(dateStr);
    const task = state.tasks[dateStr]?.[taskIdx];
    if (!task || isTaskEmpty(task)) {
      showToast('Tâche introuvable.');
      return;
    }
    const result = applyMicropasSuggestion({
      reason: suggestion.reason,
      task,
      dateStr,
      taskIdx,
      micropasText: textarea.value,
      softReschedule: suggestion.reason === 'pas_le_temps'
    });
    if (!result.applied) {
      showToast('Impossible d’appliquer la suggestion.');
      return;
    }
    registerSuggestionApplied(suggestion.groupKey, task, suggestion.reason);
    saveState();
    renderDailyTasks();
    renderOtherDays();
    updateMomentum();
    refreshWeeklyReviewIfVisible();
    showToast('Suggestion appliquée.');
  });

  actions.appendChild(applyBtn);

  card.appendChild(header);
  if (description.textContent) {
    card.appendChild(description);
  }
  card.appendChild(textarea);
  card.appendChild(actions);

  return card;
}

function ensureMicropasSuggestionEntry(groupKey) {
  if (!groupKey) return null;
  if (!state.micropasSuggestionState || typeof state.micropasSuggestionState !== 'object') {
    state.micropasSuggestionState = {};
  }
  const existing = state.micropasSuggestionState[groupKey];
  if (!existing || typeof existing !== 'object') {
    state.micropasSuggestionState[groupKey] = { ignoredCount: 0, successCount: 0, pendingSuccesses: [] };
  }
  const entry = state.micropasSuggestionState[groupKey];
  if (typeof entry.ignoredCount !== 'number' || entry.ignoredCount < 0) {
    entry.ignoredCount = 0;
  }
  if (typeof entry.successCount !== 'number' || entry.successCount < 0) {
    entry.successCount = 0;
  }
  if (!Array.isArray(entry.pendingSuccesses)) {
    entry.pendingSuccesses = [];
  }
  return entry;
}

function cleanupMicropasSuggestionState() {
  if (!state.micropasSuggestionState || typeof state.micropasSuggestionState !== 'object') {
    state.micropasSuggestionState = {};
    return;
  }
  const now = new Date();
  Object.keys(state.micropasSuggestionState).forEach(key => {
    const entry = state.micropasSuggestionState[key];
    if (!entry || typeof entry !== 'object') {
      delete state.micropasSuggestionState[key];
      return;
    }
    if (!Array.isArray(entry.pendingSuccesses)) {
      entry.pendingSuccesses = [];
    }
    entry.pendingSuccesses = entry.pendingSuccesses.filter(item => {
      if (!item || !item.dueAt) return false;
      const due = new Date(item.dueAt);
      return due && !Number.isNaN(due.getTime()) && due >= now;
    });
    if (entry.suppressedUntil) {
      const until = new Date(entry.suppressedUntil);
      if (!until || Number.isNaN(until.getTime()) || until < now) {
        delete entry.suppressedUntil;
      }
    }
    if (typeof entry.ignoredCount !== 'number' || entry.ignoredCount < 0) {
      entry.ignoredCount = 0;
    }
    if (typeof entry.successCount !== 'number' || entry.successCount < 0) {
      entry.successCount = 0;
    }
    if (!entry.pendingSuccesses.length && !entry.ignoredCount && !entry.successCount && !entry.suppressedUntil) {
      // Keep entry for history? leave as is to preserve counters.
    }
  });
}

function isSuggestionSuppressed(groupKey) {
  if (!groupKey) return false;
  const entry = state.micropasSuggestionState?.[groupKey];
  if (!entry || !entry.suppressedUntil) return false;
  const until = new Date(entry.suppressedUntil);
  if (!until || Number.isNaN(until.getTime())) {
    return false;
  }
  const now = new Date();
  return until >= now;
}

function registerSuggestionIgnored(groupKey) {
  if (!groupKey) return false;
  const entry = ensureMicropasSuggestionEntry(groupKey);
  if (!entry) return false;
  entry.ignoredCount += 1;
  if (entry.ignoredCount >= 2) {
    const until = new Date();
    until.setDate(until.getDate() + 7);
    entry.suppressedUntil = until.toISOString();
    entry.ignoredCount = 0;
  }
  return true;
}

function registerSuggestionApplied(groupKey, task, reason) {
  if (!groupKey) return false;
  const entry = ensureMicropasSuggestionEntry(groupKey);
  if (!entry) return false;
  entry.ignoredCount = 0;
  const now = new Date();
  const due = new Date(now);
  due.setHours(due.getHours() + 48);
  const taskId = task?.id || null;
  entry.pendingSuccesses = entry.pendingSuccesses.filter(item => item?.taskId && item.taskId !== taskId);
  entry.pendingSuccesses.push({
    taskId,
    reason,
    appliedAt: now.toISOString(),
    dueAt: due.toISOString()
  });
  return true;
}

function registerMicropasCompletion(task) {
  if (!task || !task.id) return false;
  if (!state.micropasSuggestionState || typeof state.micropasSuggestionState !== 'object') {
    return false;
  }
  const now = new Date();
  let updated = false;
  Object.values(state.micropasSuggestionState).forEach(entry => {
    if (!entry || !Array.isArray(entry.pendingSuccesses)) return;
    const remaining = [];
    entry.pendingSuccesses.forEach(item => {
      if (!item || item.taskId !== task.id) {
        remaining.push(item);
        return;
      }
      const due = item.dueAt ? new Date(item.dueAt) : null;
      if (due && !Number.isNaN(due.getTime()) && due >= now) {
        entry.successCount = (entry.successCount || 0) + 1;
      }
      updated = true;
    });
    entry.pendingSuccesses = remaining;
  });
  return updated;
}

function finalizeReportModalContext({ taskForLogging } = {}) {
  if (!currentReportModalContext) {
    return false;
  }
  const context = currentReportModalContext;
  currentReportModalContext = null;
  if (!context.groupKey || !context.recommendedReason) {
    return false;
  }
  if (isSuggestionSuppressed(context.groupKey)) {
    return false;
  }
  if (context.appliedReasons && context.appliedReasons.has(context.recommendedReason)) {
    const targetTask = taskForLogging || context.taskRef || null;
    if (!targetTask) {
      return false;
    }
    return registerSuggestionApplied(context.groupKey, targetTask, context.recommendedReason);
  }
  return registerSuggestionIgnored(context.groupKey);
}

function findSoftRescheduleTarget(dateStr, taskIdx) {
  const sourceDate = parseISODate(dateStr);
  if (!sourceDate) {
    return null;
  }
  ensureTasksForDate(dateStr);
  const currentDayTasks = state.tasks[dateStr];
  for (let idx = taskIdx + 1; idx < currentDayTasks.length; idx++) {
    if (isTaskEmpty(currentDayTasks[idx])) {
      return { dateStr, slotIdx: idx };
    }
  }
  for (let idx = 0; idx < currentDayTasks.length; idx++) {
    if (idx === taskIdx) continue;
    if (isTaskEmpty(currentDayTasks[idx])) {
      return { dateStr, slotIdx: idx };
    }
  }
  for (let offset = 1; offset <= 7; offset++) {
    const nextDate = new Date(sourceDate);
    nextDate.setDate(nextDate.getDate() + offset);
    nextDate.setHours(0, 0, 0, 0);
    const nextStr = nextDate.toISOString().split('T')[0];
    ensureTasksForDate(nextStr);
    const emptyIdx = state.tasks[nextStr].findIndex(task => isTaskEmpty(task));
    if (emptyIdx !== -1) {
      return { dateStr: nextStr, slotIdx: emptyIdx };
    }
  }
  return null;
}

function getTasksDoneCount(dateStr) {
  const tasks = Array.isArray(state.tasks[dateStr]) ? state.tasks[dateStr] : [];
  return tasks.filter(task => task && task.status === 'done').length;
}

function refreshWeeklyReviewIfVisible() {
  const weeklyView = document.getElementById('view-hebdo');
  if (weeklyView && weeklyView.classList.contains('active')) {
    renderWeeklyReview();
  }
}

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewName = link.getAttribute('data-view');
      if (viewName) {
        showView(viewName);
      }
    });
  });
}

function showView(viewName) {
  const views = document.querySelectorAll('.view');
  views.forEach(view => view.classList.remove('active'));
  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) {
    targetView.classList.add('active');
    const navLinks = document.querySelectorAll('.nav-menu a[data-view]');
    navLinks.forEach(link => {
      const isActive = link.getAttribute('data-view') === viewName;
      link.classList.toggle('active', isActive);
    });
    if (viewName === 'aujourdhui') {
      renderDashboard();
    } else if (viewName === 'planifier') {
      renderPlanifier();
    } else if (viewName === 'programme') {
      renderProgramme();
    } else if (viewName === 'bibliotheque') {
      renderAudioLibrary();
    } else if (viewName === 'vignettes') {
      renderVignettes();
    } else if (viewName === 'hebdo') {
      renderWeeklyReview();
    } else if (viewName === 'notifications') {
      updateNotificationsForm();
      refreshNotificationPermissionState();
      if (activeNotificationsTab === 'social') {
        refreshSocialOverview({ silent: true });
      }
    }

    if (viewName !== 'bibliotheque') {
      stopPreviewAudio();
    }
  }
}

function initNotificationsTabs() {
  const tabs = document.querySelectorAll('.notifications-tab');
  const panels = document.querySelectorAll('.notifications-panel');

  const activate = (target) => {
    if (!target) return;
    activeNotificationsTab = target;
    tabs.forEach(tab => {
      const isActive = tab.dataset.tab === target;
      tab.classList.toggle('notifications-tab-active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panels.forEach(panel => {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle('notifications-panel-active', isActive);
      panel.toggleAttribute('hidden', !isActive);
    });

    if (target === 'social') {
      refreshSocialOverview();
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      activate(target);
    });
  });

  const initialTab = Array.from(tabs).find(tab => tab.classList.contains('notifications-tab-active'))?.dataset.tab
    || activeNotificationsTab
    || tabs[0]?.dataset.tab;
  if (initialTab) {
    activate(initialTab);
  }
}

function initWeeklyTabs() {
  const tabButtons = document.querySelectorAll('.weekly-tab');
  const panels = document.querySelectorAll('.weekly-panel');

  const activateTab = (target) => {
    tabButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-tab') === target;
      btn.classList.toggle('weekly-tab-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(panel => {
      const isActive = panel.getAttribute('data-panel') === target;
      panel.classList.toggle('active', isActive);
      panel.toggleAttribute('hidden', !isActive);
    });
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');
      activateTab(target);
      renderWeeklyReview();
    });
  });

  const initialButton = Array.from(tabButtons).find(btn => btn.classList.contains('weekly-tab-active')) || tabButtons[0];
  if (initialButton) {
    activateTab(initialButton.getAttribute('data-tab'));
  }
}

function renderVignettes() {
  for (let i = 0; i < 3; i++) {
    const vignette = document.getElementById(`vignette-${i + 1}`);
    if (state.vignettes[i]) {
      vignette.style.backgroundImage = `url(${state.vignettes[i]})`;
    }
  }

  ['1', '2', '3'].forEach((num, idx) => {
    const input = document.getElementById(`upload-vignette-${num}`);
    if (input) {
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            state.vignettes[idx] = event.target.result;
            saveState();
            const vignette = document.getElementById(`vignette-${num}`);
            vignette.style.backgroundImage = `url(${event.target.result})`;
          };
          reader.readAsDataURL(file);
        }
      };
    }
  });

  const kpiInput = document.getElementById('upload-kpi');
  if (kpiInput) {
    kpiInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          state.kpiImage = event.target.result;
          saveState();
          renderKPIImage();
        };
        reader.readAsDataURL(file);
      }
    };
  }
}

function renderKPIImage() {
  const kpiDisplay = document.getElementById('kpi-image-display');
  if (kpiDisplay && state.kpiImage) {
    kpiDisplay.src = state.kpiImage;
    kpiDisplay.style.display = 'block';
  }
}

function renderProgramme() {
  const emailInput = document.getElementById('email-input');
  const goalInput = document.getElementById('goal-input');
  const deadlineInput = document.getElementById('deadline-input');
  const categorySelect = document.getElementById('programme-category-select');
  const modeButtons = document.querySelectorAll('.programme-mode-btn');
  const previewBtn = document.getElementById('programme-preview-btn');
  const applyBtn = document.getElementById('programme-apply-btn');
  const periodSelect = document.getElementById('programme-period-select');
  const conflictSelect = document.getElementById('programme-conflict-select');
  const previewWrapper = document.getElementById('programme-preview-wrapper');
  const previewTitle = document.getElementById('programme-preview-title');
  const previewDescription = document.getElementById('programme-preview-description');
  const previewMode = document.getElementById('programme-preview-mode');
  const previewTable = document.getElementById('programme-preview-table');

  if (emailInput) emailInput.value = state.settings.email || '';
  if (goalInput) goalInput.value = state.settings.goalTitle || '';
  if (deadlineInput) deadlineInput.value = state.settings.deadlineISO || '';

  if (periodSelect && !periodSelect.value) {
    periodSelect.value = 'this-week';
  }
  if (conflictSelect && !conflictSelect.value) {
    conflictSelect.value = 'replace';
  }

  const renderPreview = ({ reveal = false } = {}) => {
    if (!previewWrapper || !previewTitle || !previewDescription || !previewMode || !previewTable) {
      return;
    }

    const shouldRender = reveal || !previewWrapper.hasAttribute('hidden');
    if (!shouldRender) {
      return;
    }

    const activeCategoryId = categorySelect
      ? categorySelect.value || state.settings.programmeCategoryId || getDefaultProgrammeCategoryId()
      : state.settings.programmeCategoryId || getDefaultProgrammeCategoryId();
    const activeCategory = getProgrammeCategoryById(activeCategoryId);
    const normalizedMode = normalizeProgrammeMode(state.settings.programmeMode);

    previewTitle.textContent = activeCategory ? activeCategory.label : 'Programme';
    previewDescription.textContent = activeCategory ? activeCategory.goal : '';
    previewMode.textContent = `Mode : ${formatProgrammeModeLabel(normalizedMode)}`;

    previewTable.innerHTML = '';
    const headerRow = document.createElement('div');
    headerRow.className = 'programme-preview-header-row';

    const dayHeader = document.createElement('div');
    dayHeader.className = 'programme-preview-cell programme-preview-cell-head';
    dayHeader.textContent = 'Jour';
    headerRow.appendChild(dayHeader);

    PROGRAMME_SLOT_KEYS.forEach(slotKey => {
      const cell = document.createElement('div');
      cell.className = 'programme-preview-cell programme-preview-cell-head';
      cell.textContent = PROGRAMME_SLOT_LABELS[slotKey];
      headerRow.appendChild(cell);
    });

    previewTable.appendChild(headerRow);

    const week = activeCategory && Array.isArray(activeCategory.week) ? activeCategory.week : [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const row = document.createElement('div');
      row.className = 'programme-preview-row';

      const dayCell = document.createElement('div');
      dayCell.className = 'programme-preview-cell';
      const dayWrapper = document.createElement('div');
      dayWrapper.className = 'programme-preview-day';

      const dayIndexEl = document.createElement('span');
      dayIndexEl.className = 'programme-preview-day-index';
      dayIndexEl.textContent = `Jour ${dayIndex + 1}`;
      dayWrapper.appendChild(dayIndexEl);

      const dayLabelEl = document.createElement('span');
      dayLabelEl.className = 'programme-preview-day-label';
      dayLabelEl.textContent = DAYS[dayIndex % DAYS.length] || `J+${dayIndex}`;
      dayWrapper.appendChild(dayLabelEl);

      dayCell.appendChild(dayWrapper);
      row.appendChild(dayCell);

      const tasksForDay = buildProgrammeDayTasks(week[dayIndex], normalizedMode);
      tasksForDay.forEach(task => {
        const taskCell = document.createElement('div');
        taskCell.className = 'programme-preview-cell';

        const titleEl = document.createElement('span');
        titleEl.className = 'programme-preview-task-title' + (task.title ? '' : ' muted');
        titleEl.textContent = task.title || 'À compléter';
        taskCell.appendChild(titleEl);

        const metaEl = document.createElement('span');
        metaEl.className = 'programme-preview-meta';
        const audioLabel = formatAudioLabel(task.audio);
        const metaParts = [];
        if (task.moment) metaParts.push(task.moment);
        metaParts.push(audioLabel ? `Rituel : ${audioLabel}` : 'Rituel : Aucun');
        metaEl.textContent = metaParts.join(' · ');
        taskCell.appendChild(metaEl);

        row.appendChild(taskCell);
      });

      previewTable.appendChild(row);
    }

    previewWrapper.removeAttribute('hidden');
  };

  const ensureCategoryInitialized = () => {
    if (!categorySelect) return;
    if (!categorySelect.dataset.initialized) {
      categorySelect.innerHTML = PROGRAMME_CATEGORIES
        .map(category => `<option value="${category.id}">${category.label}</option>`)
        .join('');
      categorySelect.dataset.initialized = 'true';
    }
    const activeValue = state.settings.programmeCategoryId || getDefaultProgrammeCategoryId();
    categorySelect.value = activeValue;
  };

  ensureCategoryInitialized();

  if (categorySelect) {
    categorySelect.onchange = () => {
      const value = categorySelect.value || getDefaultProgrammeCategoryId();
      state.settings.programmeCategoryId = value;
      saveState();
      renderPreview({ reveal: false });
    };
  }

  const updateModeButtons = () => {
    const normalized = normalizeProgrammeMode(state.settings.programmeMode);
    modeButtons.forEach(button => {
      const buttonMode = normalizeProgrammeMode(button.dataset.programmeMode || 'content');
      const isActive = buttonMode === normalized;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    return normalized;
  };

  modeButtons.forEach(button => {
    button.onclick = () => {
      const selectedMode = normalizeProgrammeMode(button.dataset.programmeMode || 'content');
      if (state.settings.programmeMode !== selectedMode) {
        state.settings.programmeMode = selectedMode;
        saveState();
      }
      updateModeButtons();
      renderPreview({ reveal: false });
    };
  });

  updateModeButtons();

  if (previewBtn) {
    previewBtn.onclick = () => {
      renderPreview({ reveal: true });
    };
  }

  if (applyBtn) {
    applyBtn.onclick = () => {
      const categoryId = categorySelect
        ? categorySelect.value || getDefaultProgrammeCategoryId()
        : state.settings.programmeCategoryId || getDefaultProgrammeCategoryId();
      const mode = normalizeProgrammeMode(state.settings.programmeMode);
      const period = periodSelect ? periodSelect.value : 'this-week';
      const conflict = conflictSelect ? conflictSelect.value : 'replace';
      const { template } = buildProgrammeTemplate(categoryId, mode);
      const plan = resolveTemplateApplication(template, period, conflict, {
        getTasksForDay: (offset) => buildProgrammeDayTasks(template.week[offset], mode)
      });

      if (!plan || plan.stats.daysUpdated === 0) {
        showToast('Aucune micro-tâche modifiée : tout était déjà planifié.');
        return;
      }

      const previewVisible = previewWrapper && !previewWrapper.hasAttribute('hidden');

      applyTemplatePlan(template, plan, {
        showModal: false,
        successMessage: `Programme « ${template.name} » appliqué.`
      });

      renderPreview({ reveal: previewVisible });
    };
  }

  const saveBtn = document.getElementById('save-programme-btn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      const emailValue = emailInput ? emailInput.value : '';
      const goalValue = goalInput ? goalInput.value : '';
      const deadlineValue = deadlineInput ? deadlineInput.value : '';
      const categoryValue = categorySelect
        ? categorySelect.value || getDefaultProgrammeCategoryId()
        : state.settings.programmeCategoryId || getDefaultProgrammeCategoryId();
      const modeValue = normalizeProgrammeMode(state.settings.programmeMode);
      const previousGoal = state.settings.goalTitle;
      const previousDeadline = state.settings.deadlineISO;

      state.settings.email = emailValue;
      state.settings.goalTitle = goalValue;
      state.settings.deadlineISO = deadlineValue;
      state.settings.programmeCategoryId = categoryValue;
      state.settings.programmeMode = modeValue;

      if (!state.settings.startISO || previousGoal !== goalValue || previousDeadline !== deadlineValue) {
        state.settings.startISO = getToday();
      }

      saveState();
      alert('Programme enregistré !');
      showView('aujourdhui');
    };
  }

  renderPreview({ reveal: false });
}

function renderPlanifier() {
  const container = document.getElementById('planifier-days');
  if (!container) return;

  setPlanifierTabsMode('editor');

  const momentSuggestion = getMomentSuggestion();
  let momentSuggestionInjected = false;

  const templateTabBtn = document.getElementById('planifier-template-tab');
  if (templateTabBtn) {
    templateTabBtn.onclick = () => {
      openTemplateLibrary();
    };
  }

  container.innerHTML = '';

  DAYS.forEach((day, idx) => {
    const accordion = document.createElement('div');
    accordion.className = 'day-accordion';

    const dateStr = getDateString(idx);
    ensureTasksForDate(dateStr);
    const formattedDate = formatDate(dateStr);

    const header = document.createElement('div');
    header.className = 'day-accordion-header';
    header.innerHTML = `<span>${day} · ${formattedDate}</span><span>▼</span>`;

    const content = document.createElement('div');
    content.className = 'day-accordion-content';

    const tasksForDay = state.tasks[dateStr] || [];

    for (let i = 1; i <= 3; i++) {
      const taskData = tasksForDay[i - 1] ? { ...tasksForDay[i - 1] } : createEmptyTask();
      const taskForm = document.createElement('div');
      taskForm.className = 'task-form';
      taskForm.innerHTML = `
        <strong>Tâche ${i}</strong>
        <div class="task-form-row">
          <input type="text" placeholder="Titre de la tâche" data-day="${idx}" data-task="${i - 1}" data-field="title">
          <input type="text" placeholder="Moment (Matin, 14:00…)" data-day="${idx}" data-task="${i - 1}" data-field="moment">
          <select data-day="${idx}" data-task="${i - 1}" data-field="audio"></select>
        </div>
      `;

      const titleInput = taskForm.querySelector('input[data-field="title"]');
      const momentInput = taskForm.querySelector('input[data-field="moment"]');
      const audioSelect = taskForm.querySelector('select[data-field="audio"]');

      titleInput.value = taskData.title || '';
      if ((taskData.moment || '').trim()) {
        momentInput.value = taskData.moment;
      } else if (momentSuggestion) {
        momentInput.value = momentSuggestion.momentLabel;
      } else {
        momentInput.value = '';
      }
      populateAudioSelectOptions(audioSelect, normalizeAudioValue(taskData.audio || 'Aucun'));

      if (!momentSuggestionInjected && momentSuggestion && (!isTaskEmpty(taskData) || i === 1)) {
        const suggestionEl = createMomentSuggestionElement({
          suggestion: momentSuggestion,
          onApply: () => {
            momentInput.value = momentSuggestion.momentLabel;
            const applied = applyMomentSuggestionToTask(dateStr, i - 1, momentSuggestion, { setPrefill: true });
            if (applied) {
              showToast('Moment appliqué.');
            }
          },
          onLater: () => {
            if (snoozeMomentSuggestion(momentSuggestion.momentKey)) {
              saveState();
              showToast('Suggestion snoozée 7 jours.');
            }
          },
          onNever: () => {
            if (muteMomentSuggestion(momentSuggestion.momentKey)) {
              saveState();
              showToast('Suggestion masquée 30 jours.');
            }
          }
        });
        if (suggestionEl) {
          suggestionEl.classList.add('moment-suggestion-inline');
          taskForm.appendChild(suggestionEl);
          momentSuggestionInjected = true;
        }
      }

      content.appendChild(taskForm);
    }

    header.onclick = () => {
      content.classList.toggle('open');
    };

    accordion.appendChild(header);
    accordion.appendChild(content);
    container.appendChild(accordion);
  });

  const saveBtn = document.getElementById('save-planifier-btn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      const inputs = document.querySelectorAll('#planifier-days input[data-day], #planifier-days select[data-day]');

      for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
        const dateStr = getDateString(dayOffset);
        ensureTasksForDate(dateStr);
      }

      inputs.forEach(input => {
        const dayIdx = parseInt(input.getAttribute('data-day'), 10);
        const taskIdx = parseInt(input.getAttribute('data-task'), 10);
        const field = input.getAttribute('data-field');

        if (Number.isNaN(dayIdx) || Number.isNaN(taskIdx) || !field) return;

        const dateStr = getDateString(dayIdx);
        if (!state.tasks[dateStr] || !state.tasks[dateStr][taskIdx]) return;

        if (field === 'audio') {
          state.tasks[dateStr][taskIdx][field] = normalizeAudioValue(input.value);
        } else {
          state.tasks[dateStr][taskIdx][field] = input.value.trim();
        }
      });

      saveState();
      alert('Planification enregistrée !');
      showView('aujourdhui');
    };
  }
}

function setPlanifierTabsMode(mode) {
  const editorTab = document.getElementById('planifier-editor-tab');
  const templateTab = document.getElementById('planifier-template-tab');
  if (!editorTab || !templateTab) return;

  if (mode === 'templates') {
    editorTab.classList.remove('planifier-tab-active');
    editorTab.setAttribute('aria-selected', 'false');
    templateTab.classList.add('planifier-tab-active');
    templateTab.setAttribute('aria-selected', 'true');
  } else {
    editorTab.classList.add('planifier-tab-active');
    editorTab.setAttribute('aria-selected', 'true');
    templateTab.classList.remove('planifier-tab-active');
    templateTab.setAttribute('aria-selected', 'false');
  }
}

function getTemplateById(templateId) {
  return TEMPLATE_LIBRARY.find(t => t.id === templateId);
}

function resolveTemplateApplication(template, period, conflict, options = {}) {
  const startDate = getStartDateForPeriod(period);
  const dates = [];
  const assignments = [];
  let daysUpdated = 0;
  let replaced = 0;
  let preserved = 0;

  const getTasksForDay = typeof options.getTasksForDay === 'function' ? options.getTasksForDay : null;
  const fallbackTasks = Array.isArray(template.tasks) ? template.tasks : [];

  for (let offset = 0; offset < 7; offset++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + offset);
    const dateStr = currentDate.toISOString().split('T')[0];
    dates.push(dateStr);

    const existingTasks = state.tasks[dateStr]
      ? state.tasks[dateStr].map(cloneTask)
      : [createEmptyTask(), createEmptyTask(), createEmptyTask()];

    const slots = [];
    let dayWillChange = false;

    const dayTasks = getTasksForDay ? getTasksForDay(offset, dateStr) : null;
    const sourceTasks = Array.isArray(dayTasks) && dayTasks.length ? dayTasks : fallbackTasks;

    for (let taskIdx = 0; taskIdx < 3; taskIdx++) {
      const baseTemplateTask = sourceTasks[taskIdx] || createEmptyTask();
      const templateTask = {
        title: baseTemplateTask.title || '',
        moment: baseTemplateTask.moment || '',
        audio: baseTemplateTask.audio || 'Aucun'
      };
      const existing = existingTasks[taskIdx] || createEmptyTask();

      if (isTaskEmpty(templateTask)) {
        if (!isTaskEmpty(existing)) {
          preserved += 1;
        }
        slots.push({ apply: false, templateTask, taskIdx });
        continue;
      }

      let applyTask = false;

      if (existing.status === 'done') {
        preserved += 1;
      } else if (conflict === 'fill-empty') {
        if (isTaskEmpty(existing)) {
          applyTask = true;
        } else {
          preserved += 1;
        }
      } else {
        applyTask = true;
        if (!isTaskEmpty(existing)) {
          replaced += 1;
        }
      }

      if (applyTask) {
        dayWillChange = true;
      }

      slots.push({
        apply: applyTask,
        templateTask,
        taskIdx
      });
    }

    if (dayWillChange) {
      daysUpdated += 1;
    }

    assignments.push({ date: dateStr, slots });
  }

  return {
    dates,
    assignments,
    stats: {
      daysUpdated,
      replaced,
      preserved
    }
  };
}

function openTemplateLibrary() {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  setPlanifierTabsMode('templates');
  content.classList.remove('template-wide');
  content.classList.remove('challenge-details-modal');
  content.classList.remove('challenge-setup-modal');
  content.classList.remove('challenge-completion-modal');

  content.innerHTML = `
    <div class="template-library">
      <div class="template-library-header">
        <h3>Templates</h3>
        <p>Accélérez votre démarrage avec des routines prêtes en 3 micro-tâches par jour.</p>
      </div>
      <div class="template-library-grid">
        ${TEMPLATE_LIBRARY.map(template => `
          <div class="template-card" data-template-id="${template.id}">
            <h4>${template.name}</h4>
            <p>${template.description}</p>
            <div class="template-meta">
              <span class="template-badge">🕒 ${template.duration}</span>
              <span class="template-badge">✨ ${template.ritual}</span>
            </div>
            <div class="template-actions">
              <button class="btn btn-secondary" data-action="preview" data-template="${template.id}">Prévisualiser</button>
              <button class="btn btn-primary" data-action="apply" data-template="${template.id}">Appliquer</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.add('show');

  content.querySelectorAll('[data-action="preview"]').forEach(btn => {
    btn.onclick = () => {
      const template = getTemplateById(btn.getAttribute('data-template'));
      if (template) {
        showTemplatePreview(template);
      }
    };
  });

  content.querySelectorAll('[data-action="apply"]').forEach(btn => {
    btn.onclick = () => {
      const template = getTemplateById(btn.getAttribute('data-template'));
      if (template) {
        showTemplateApply(template);
      }
    };
  });
}

function showTemplatePreview(template) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  setPlanifierTabsMode('templates');
  content.classList.add('template-wide');

  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);
  const previewDays = Array.from({ length: 7 }).map((_, idx) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + idx);
    const dateStr = date.toISOString().split('T')[0];
    return {
      label: idx === 0 ? 'J' : `J+${idx}`,
      formatted: formatDate(dateStr)
    };
  });

  content.innerHTML = `
    <div class="template-preview">
      <div class="template-preview-header">
        <h3>${template.name}</h3>
        <p>${template.description}</p>
        <div class="template-meta">
          <span class="template-badge">🕒 ${template.duration}</span>
          <span class="template-badge">✨ Rituel : ${template.ritual}</span>
        </div>
      </div>
      <div class="template-preview-grid">
        ${previewDays.map(day => `
          <div class="preview-day">
            <div class="preview-day-header">
              <strong>${day.label} · ${day.formatted}</strong>
              <span class="preview-day-ritual">Rituel : ${template.ritual}</span>
            </div>
            ${template.tasks.slice(0, 3).map(task => `
              <div class="preview-task">
                <strong>${task.moment}</strong>
                <span>${task.title}</span>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
      <div class="template-preview-footer">
        <button class="btn btn-secondary" id="template-preview-back">Retour</button>
        <button class="btn btn-primary" id="template-preview-apply">Appliquer</button>
      </div>
    </div>
  `;

  modal.classList.add('show');

  const backBtn = content.querySelector('#template-preview-back');
  const applyBtn = content.querySelector('#template-preview-apply');

  if (backBtn) {
    backBtn.onclick = () => openTemplateLibrary();
  }

  if (applyBtn) {
    applyBtn.onclick = () => showTemplateApply(template);
  }
}

function showTemplateApply(template) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  setPlanifierTabsMode('templates');
  content.classList.remove('template-wide');

  content.innerHTML = `
    <div class="template-apply">
      <h3>Appliquer « ${template.name} »</h3>
      <div class="template-apply-options">
        <div>
          <h4>Période</h4>
          <div class="template-radio-group">
            <label class="template-radio-option">
              <input type="radio" name="template-period" value="this-week" checked>
              <span>Cette semaine (dès aujourd'hui)</span>
            </label>
            <label class="template-radio-option">
              <input type="radio" name="template-period" value="next-week">
              <span>Semaine prochaine (à partir de lundi)</span>
            </label>
          </div>
        </div>
        <div>
          <h4>Conflits</h4>
          <div class="template-radio-group">
            <label class="template-radio-option">
              <input type="radio" name="template-conflict" value="replace" checked>
              <span>Remplacer les micro-tâches planifiées (hors tâches validées)</span>
            </label>
            <label class="template-radio-option">
              <input type="radio" name="template-conflict" value="fill-empty">
              <span>Compléter uniquement les cases vides</span>
            </label>
          </div>
        </div>
      </div>
      <div class="template-summary" id="template-summary"></div>
      <div class="modal-buttons">
        <button class="btn btn-secondary" id="template-back-btn">Retour</button>
        <button class="btn btn-primary" id="template-confirm-btn">Confirmer</button>
      </div>
    </div>
  `;

  modal.classList.add('show');

  const summaryEl = content.querySelector('#template-summary');
  const confirmBtn = content.querySelector('#template-confirm-btn');
  const backBtn = content.querySelector('#template-back-btn');

  let currentPlan = resolveTemplateApplication(template, 'this-week', 'replace');

  function updateSummary() {
    const periodInput = content.querySelector('input[name="template-period"]:checked');
    const conflictInput = content.querySelector('input[name="template-conflict"]:checked');
    const period = periodInput ? periodInput.value : 'this-week';
    const conflict = conflictInput ? conflictInput.value : 'replace';

    currentPlan = resolveTemplateApplication(template, period, conflict);
    const { daysUpdated, replaced, preserved } = currentPlan.stats;

    summaryEl.innerHTML = `
      <strong>Récapitulatif</strong>
      <span>${formatCount(daysUpdated, 'jour mis à jour', 'jours mis à jour')}</span>
      <span>${formatCount(replaced, 'tâche remplacée', 'tâches remplacées')}</span>
      <span>${formatCount(preserved, 'tâche conservée', 'tâches conservées')}</span>
    `;

    if (confirmBtn) {
      confirmBtn.disabled = daysUpdated === 0;
    }
  }

  content.querySelectorAll('input[name="template-period"]').forEach(input => {
    input.onchange = updateSummary;
  });

  content.querySelectorAll('input[name="template-conflict"]').forEach(input => {
    input.onchange = updateSummary;
  });

  if (backBtn) {
    backBtn.onclick = () => openTemplateLibrary();
  }

  if (confirmBtn) {
    confirmBtn.onclick = () => {
      if (!currentPlan || currentPlan.stats.daysUpdated === 0) return;
      applyTemplatePlan(template, currentPlan);
    };
  }

  updateSummary();
}

function applyTemplatePlan(template, plan, options = {}) {
  const previousState = {};

  plan.dates.forEach(dateStr => {
    previousState[dateStr] = state.tasks[dateStr]
      ? state.tasks[dateStr].map(cloneTask)
      : null;
  });

  plan.assignments.forEach(({ date, slots }) => {
    ensureTasksForDate(date);

    slots.forEach(({ apply, templateTask, taskIdx }) => {
      if (apply) {
        state.tasks[date][taskIdx] = {
          title: templateTask.title,
          moment: templateTask.moment,
          audio: normalizeAudioValue(templateTask.audio || 'Aucun'),
          status: 'planned'
        };
      }
    });
  });

  lastTemplateApplication = {
    dates: plan.dates,
    previousState
  };

  saveState();
  renderPlanifier();
  renderDashboard();
  refreshWeeklyReviewIfVisible();
  const showModal = options.showModal !== false;
  if (showModal) {
    showTemplateAppliedMessage(template, plan.stats);
  } else if (options.successMessage) {
    showToast(options.successMessage);
  }
}

function showTemplateAppliedMessage(template, stats) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  setPlanifierTabsMode('templates');
  content.classList.remove('template-wide');

  content.innerHTML = `
    <div class="template-applied">
      <h3>${template.name} appliqué</h3>
      <p>Vos micro-tâches sont planifiées pour la période choisie.</p>
      <div class="stats">
        <span>${formatCount(stats.daysUpdated, 'jour mis à jour', 'jours mis à jour')}</span>
        <span>${formatCount(stats.replaced, 'tâche remplacée', 'tâches remplacées')}</span>
        <span>${formatCount(stats.preserved, 'tâche conservée', 'tâches conservées')}</span>
      </div>
      <div class="modal-buttons">
        <button class="btn btn-secondary" id="template-close-btn">Fermer</button>
        <button class="btn btn-primary" id="template-undo-btn">Annuler l’application</button>
      </div>
    </div>
  `;

  modal.classList.add('show');

  const closeBtn = content.querySelector('#template-close-btn');
  const undoBtn = content.querySelector('#template-undo-btn');

  if (closeBtn) {
    closeBtn.onclick = () => closeModal();
  }

  if (undoBtn) {
    undoBtn.onclick = () => undoLastTemplateApplication();
  }
}

function undoLastTemplateApplication() {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!lastTemplateApplication || !modal || !content) {
    closeModal();
    return;
  }

  lastTemplateApplication.dates.forEach(dateStr => {
    const previous = lastTemplateApplication.previousState[dateStr];
    if (previous === null) {
      delete state.tasks[dateStr];
    } else {
      state.tasks[dateStr] = previous.map(cloneTask);
    }
  });

  lastTemplateApplication = null;

  saveState();
  renderPlanifier();
  renderDashboard();
  refreshWeeklyReviewIfVisible();

  setPlanifierTabsMode('templates');
  content.classList.remove('template-wide');
  content.innerHTML = `
    <div class="template-applied">
      <h3>Application annulée</h3>
      <p>La période a été restaurée comme avant le template.</p>
      <div class="modal-buttons">
        <button class="btn btn-primary" id="template-undo-close-btn">Fermer</button>
      </div>
    </div>
  `;

  modal.classList.add('show');

  const closeBtn = content.querySelector('#template-undo-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => closeModal();
  }
}

function renderDashboard() {
  const adaptiveUpdated = reconcileFocusAdaptiveOutcomes();
  if (adaptiveUpdated) {
    saveState();
  }
  renderDaysRemaining();
  renderDailyTasks();
  renderOtherDays();
  renderMood();
  renderKPIImage();
  updateMomentum();
  renderStreakSummary();
  renderChallengeCard();
  updateUpcomingReminderBanner();
}

function renderWeeklyReview() {
  sanitizeStreakData();

  const weeklyFullDaysEl = document.getElementById('weekly-full-days');
  const weeklySuccessRateEl = document.getElementById('weekly-success-rate');
  const weeklyReportsEl = document.getElementById('weekly-reports');
  const weeklyRegularityCurrentEl = document.getElementById('weekly-regularity-current');
  const weeklyRegularityBestEl = document.getElementById('weekly-regularity-best');
  const weeklyRegularityBadgeTextEl = document.getElementById('weekly-regularity-badge-text');
  const weeklyRegularityBadgeIconEl = document.getElementById('weekly-regularity-badge-icon');
  const weeklyGraphEl = document.getElementById('weekly-graph');
  const weeklyRecommendationEl = document.getElementById('weekly-recommendation');
  const insightBestSlotEl = document.getElementById('insight-best-slot');
  const insightTopReportEl = document.getElementById('insight-top-report');
  const insightAvgMotivationEl = document.getElementById('insight-avg-motivation');
  const insightDominantMoodEl = document.getElementById('insight-dominant-mood');
  const insightCompletionBarsEl = document.getElementById('insight-completion-bars');
  const insightSparklineEl = document.getElementById('insight-motivation-sparkline');
  const insightTextEl = document.getElementById('insight-textual');
  const insightsContentEl = document.getElementById('weekly-insights-content');
  const insightsEmptyEl = document.getElementById('weekly-insights-empty');

  if (!weeklyFullDaysEl || !weeklySuccessRateEl || !weeklyReportsEl || !weeklyRegularityCurrentEl || !weeklyRegularityBestEl || !weeklyRegularityBadgeTextEl || !weeklyRegularityBadgeIconEl || !weeklyGraphEl || !weeklyRecommendationEl) {
    return;
  }

  const lastSevenDates = getLastSevenDates();
  const weeklyData = lastSevenDates.map(dateStr => ({
    dateStr,
    doneCount: getTasksDoneCount(dateStr),
    tasks: Array.isArray(state.tasks?.[dateStr]) ? state.tasks[dateStr] : []
  }));

  const fullDays = weeklyData.filter(day => day.doneCount >= 3).length;
  const successRate = Math.round((fullDays / 7) * 100) || 0;

  weeklyFullDaysEl.textContent = `${fullDays} / 7`;
  weeklySuccessRateEl.textContent = `${successRate}%`;

  let totalReports = 0;
  const reasonTotals = {};
  const reasonOrder = {};
  let orderIndex = 0;

  lastSevenDates.forEach(dateStr => {
    const reportInfo = state.reports?.[dateStr];
    if (!reportInfo) return;

    totalReports += reportInfo.total || 0;

    if (!reportInfo.reasons) return;

    Object.entries(reportInfo.reasons).forEach(([reasonKey, count]) => {
      if (!count) return;
      if (reasonTotals[reasonKey] === undefined) {
        reasonTotals[reasonKey] = 0;
        reasonOrder[reasonKey] = orderIndex++;
      }
      reasonTotals[reasonKey] += count;
    });
  });

  let dominantReason = null;
  let dominantCount = 0;

  Object.entries(reasonTotals).forEach(([reasonKey, count]) => {
    if (count > dominantCount || dominantReason === null) {
      dominantCount = count;
      dominantReason = reasonKey;
    } else if (count === dominantCount && dominantReason !== null) {
      if (reasonOrder[reasonKey] < reasonOrder[dominantReason]) {
        dominantReason = reasonKey;
      }
    }
  });

  const dominantReasonLabel = dominantReason ? (REPORT_REASON_DETAILS[dominantReason]?.label || dominantReason) : null;

  if (totalReports > 0) {
    if (dominantReasonLabel) {
      weeklyReportsEl.textContent = `${totalReports} report${totalReports > 1 ? 's' : ''} · Motif dominant : ${dominantReasonLabel}`;
    } else {
      weeklyReportsEl.textContent = `${totalReports} report${totalReports > 1 ? 's' : ''} · Motif dominant : —`;
    }
  } else {
    weeklyReportsEl.textContent = '0 report · Motif dominant : —';
  }

  const currentStreak = state.streak?.current || 0;
  const bestStreak = state.streak?.best || 0;
  weeklyRegularityCurrentEl.textContent = `Streak actuel : ${formatDayCount(currentStreak)}`;
  weeklyRegularityBestEl.textContent = `Meilleur streak : ${formatDayCount(bestStreak)}`;

  const lastBadge = getLastUnlockedBadge();
  if (lastBadge) {
    weeklyRegularityBadgeTextEl.textContent = `Dernier badge : ${lastBadge.label}`;
    weeklyRegularityBadgeIconEl.textContent = lastBadge.icon;
  } else {
    weeklyRegularityBadgeTextEl.textContent = 'Dernier badge : —';
    weeklyRegularityBadgeIconEl.textContent = '🏅';
  }

  weeklyGraphEl.innerHTML = '';
  weeklyData.forEach(({ dateStr, doneCount }) => {
    const column = document.createElement('div');
    column.className = 'weekly-graph-column';

    const countLabel = document.createElement('span');
    countLabel.className = 'weekly-graph-count';
    countLabel.textContent = doneCount;

    const bar = document.createElement('div');
    bar.className = 'weekly-graph-bar';
    const percent = Math.min(100, Math.max(0, Math.round((doneCount / 3) * 100)));
    bar.style.height = `${percent}%`;
    bar.title = `${doneCount}/3 tâches accomplies`;

    const dayLabel = document.createElement('span');
    dayLabel.className = 'weekly-graph-day';
    const date = new Date(dateStr);
    dayLabel.textContent = DAY_LABELS_SHORT[date.getDay()] || '';

    column.appendChild(countLabel);
    column.appendChild(bar);
    column.appendChild(dayLabel);
    weeklyGraphEl.appendChild(column);
  });

  let recommendationText = 'Rien à signaler — continue comme ça.';
  if (totalReports > 0 && dominantReason && REPORT_REASON_DETAILS[dominantReason]) {
    recommendationText = REPORT_REASON_DETAILS[dominantReason].recommendation;
  }

  weeklyRecommendationEl.textContent = recommendationText;

  const momentStats = {
    'Matin': { total: 0, done: 0 },
    'Après-midi': { total: 0, done: 0 },
    'Soir': { total: 0, done: 0 }
  };

  weeklyData.forEach(({ tasks }) => {
    tasks.forEach(task => {
      if (!task) return;
      const slot = categorizeMomentSlot(task.moment);
      if (!slot) return;
      if (isTaskEmpty(task)) return;
      momentStats[slot].total += 1;
      if (task.status === 'done') {
        momentStats[slot].done += 1;
      }
    });
  });

  let bestSlotLabel = null;
  let bestSlotRate = 0;
  let bestSlotDone = 0;

  Object.entries(momentStats).forEach(([slot, stats]) => {
    if (!stats.total) return;
    const rate = stats.done / stats.total;
    if (bestSlotLabel === null || rate > bestSlotRate || (rate === bestSlotRate && stats.done > bestSlotDone)) {
      bestSlotLabel = slot;
      bestSlotRate = rate;
      bestSlotDone = stats.done;
    }
  });

  const moodHistory = state.moodHistory || {};
  const sanitizedMotivationValues = lastSevenDates.map(dateStr => {
    const entry = moodHistory[dateStr];
    if (entry && typeof entry.motivation === 'number' && !Number.isNaN(entry.motivation)) {
      return Math.max(0, Math.min(100, entry.motivation));
    }
    return null;
  });

  const recordedMotivations = sanitizedMotivationValues.filter(value => typeof value === 'number');
  const avgMotivation = recordedMotivations.length
    ? Math.round(recordedMotivations.reduce((acc, value) => acc + value, 0) / recordedMotivations.length)
    : null;

  const moodCounts = {};
  const moodOrder = {};
  let moodOrderIndex = 0;

  lastSevenDates.forEach(dateStr => {
    const entry = moodHistory[dateStr];
    if (!entry || !entry.emoji) return;
    const key = entry.emoji;
    if (moodCounts[key] === undefined) {
      moodCounts[key] = 0;
      moodOrder[key] = moodOrderIndex++;
    }
    moodCounts[key] += 1;
  });

  let dominantMoodKey = null;
  let dominantMoodCount = 0;

  Object.entries(moodCounts).forEach(([key, count]) => {
    if (dominantMoodKey === null || count > dominantMoodCount || (count === dominantMoodCount && moodOrder[key] < moodOrder[dominantMoodKey])) {
      dominantMoodKey = key;
      dominantMoodCount = count;
    }
  });

  const hasCompletionData = weeklyData.some(({ tasks }) => tasks.some(task => task && !isTaskEmpty(task)));
  const hasMotivationData = recordedMotivations.length > 0;
  const hasReportData = totalReports > 0;
  const hasBestSlot = Boolean(bestSlotLabel);
  const hasMoodData = Boolean(dominantMoodKey);
  const shouldShowInsights = hasCompletionData || hasMotivationData || hasReportData || hasBestSlot || hasMoodData;

  if (insightsContentEl && insightsEmptyEl) {
    if (shouldShowInsights) {
      insightsContentEl.removeAttribute('hidden');
      insightsEmptyEl.setAttribute('hidden', '');
    } else {
      insightsContentEl.setAttribute('hidden', '');
      insightsEmptyEl.removeAttribute('hidden');
    }
  }

  if (insightBestSlotEl) {
    if (bestSlotLabel) {
      const percent = Math.round(bestSlotRate * 100);
      const suffix = Number.isFinite(percent) ? ` · ${percent}%` : '';
      insightBestSlotEl.textContent = `${bestSlotLabel}${suffix}`;
    } else {
      insightBestSlotEl.textContent = '—';
    }
  }

  if (insightTopReportEl) {
    if (totalReports > 0 && dominantReasonLabel) {
      insightTopReportEl.textContent = dominantReasonLabel;
    } else {
      insightTopReportEl.textContent = '—';
    }
  }

  if (insightAvgMotivationEl) {
    insightAvgMotivationEl.textContent = avgMotivation !== null ? `${avgMotivation}%` : '—';
  }

  if (insightDominantMoodEl) {
    if (dominantMoodKey && MOOD_DETAILS[dominantMoodKey]) {
      const detail = MOOD_DETAILS[dominantMoodKey];
      insightDominantMoodEl.textContent = `${detail.emoji} ${detail.label}`;
    } else {
      insightDominantMoodEl.textContent = '—';
    }
  }

  if (insightCompletionBarsEl) {
    insightCompletionBarsEl.innerHTML = '';
    weeklyData.forEach(({ dateStr, doneCount }) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'insight-bar';

      const fill = document.createElement('div');
      fill.className = 'insight-bar-fill';
      const percent = Math.min(100, Math.max(0, Math.round((doneCount / 3) * 100)));
      fill.style.height = `${percent}%`;
      fill.title = `${doneCount}/3 tâches complétées`;

      const dayLabel = document.createElement('span');
      dayLabel.className = 'insight-bar-day';
      const date = new Date(dateStr);
      dayLabel.textContent = DAY_LABELS_SHORT[date.getDay()] || '';

      wrapper.appendChild(fill);
      wrapper.appendChild(dayLabel);
      insightCompletionBarsEl.appendChild(wrapper);
    });
  }

  if (insightSparklineEl) {
    insightSparklineEl.innerHTML = '';
    const pathData = buildSparklinePath(sanitizedMotivationValues, 120, 48);
    if (pathData) {
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 120 48');
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.classList.add('insight-sparkline');

      const background = document.createElementNS(svgNS, 'rect');
      background.setAttribute('x', '0');
      background.setAttribute('y', '0');
      background.setAttribute('width', '120');
      background.setAttribute('height', '48');
      background.setAttribute('fill', 'rgba(166, 128, 118, 0.12)');

      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', pathData);

      svg.appendChild(background);
      svg.appendChild(path);
      insightSparklineEl.appendChild(svg);
    } else {
      const placeholder = document.createElement('span');
      placeholder.className = 'insight-placeholder';
      placeholder.textContent = '—';
      insightSparklineEl.appendChild(placeholder);
    }
  }

  if (insightTextEl) {
    let insightSentence = 'Pas encore assez de recul pour un insight personnalisé.';

    if (bestSlotLabel && dominantReason && REPORT_REASON_DETAILS[dominantReason]) {
      insightSentence = `Ton meilleur taux est ${bestSlotLabel.toLowerCase()}. ${REPORT_REASON_DETAILS[dominantReason].recommendation}`;
    } else if (bestSlotLabel) {
      insightSentence = `Ton meilleur taux est ${bestSlotLabel.toLowerCase()}. Continue sur cette lancée !`;
    } else if (dominantReason && REPORT_REASON_DETAILS[dominantReason]) {
      const detail = REPORT_REASON_DETAILS[dominantReason];
      insightSentence = `${detail.label} ressort. ${detail.recommendation}`;
    } else if (avgMotivation !== null) {
      insightSentence = `Motivation moyenne ${avgMotivation}%. Ajuste ton énergie en conséquence.`;
    } else if (dominantMoodKey && MOOD_DETAILS[dominantMoodKey]) {
      const detail = MOOD_DETAILS[dominantMoodKey];
      insightSentence = `Humeur dominante : ${detail.emoji}. Calibre tes micro-pas en fonction.`;
    }

    insightTextEl.textContent = insightSentence;
  }
}

function renderDaysRemaining() {
  const daysCount = document.getElementById('days-count');
  if (state.settings.deadlineISO) {
    const today = new Date();
    const deadline = new Date(state.settings.deadlineISO);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysCount.textContent = diffDays >= 0 ? diffDays : 0;
  } else {
    daysCount.textContent = '—';
  }
}

function openQuickAddModal(options = {}) {
  const { slotIndex = null, mode = 'add' } = options;
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  const today = getToday();
  ensureTasksForDate(today);
  const tasksForToday = state.tasks[today];

  const emptySlots = tasksForToday
    .map((task, idx) => ({ task, idx }))
    .filter(entry => isTaskEmpty(entry.task));

  let targetSlot = typeof slotIndex === 'number' && slotIndex >= 0 && slotIndex < 3 ? slotIndex : null;
  let initialMode = mode;

  if (targetSlot === null) {
    if (!emptySlots.length) {
      showToast('Limite 3 tâches/jour');
      return;
    }
    const upcomingMoment = getNextMomentLabel();
    const upcomingSlotIdx = getMomentSlotIndex(upcomingMoment);
    const preferredSlot = emptySlots.find(entry => entry.idx === upcomingSlotIdx);
    targetSlot = (preferredSlot || emptySlots[0]).idx;
  }

  const currentTask = tasksForToday[targetSlot] ? { ...tasksForToday[targetSlot] } : createEmptyTask();
  const slotMomentDefault = getDefaultMomentForSlot(targetSlot);
  const slotIsEmpty = isTaskEmpty(currentTask);
  const isReplace = initialMode === 'replace' || (!slotIsEmpty && slotIndex !== null);
  const initialTitle = isReplace ? (currentTask.title || '') : '';

  let initialMoment = isReplace ? (currentTask.moment || slotMomentDefault) : slotMomentDefault;
  if (!isReplace && slotIndex === null) {
    const autoMoment = getNextMomentLabel();
    initialMoment = autoMoment || slotMomentDefault;
  }
  if (!initialMoment) {
    initialMoment = slotMomentDefault;
  }

  const existingAudio = normalizeAudioValue(currentTask.audio || 'Aucun');
  const defaultAudio = getDefaultRitualForMoment(initialMoment);
  const initialAudio = isReplace ? existingAudio : defaultAudio;

  const existingDuration = Number(currentTask.duration);
  const hasExistingDuration = Number.isFinite(existingDuration) && existingDuration > 0;
  const initialDurationValue = isReplace && currentTask.usesDefaultDuration === false && hasExistingDuration ? existingDuration : '';
  const initialPlaceholderDuration = getFocusDefaultDurationForMomentLabel(initialMoment);

  const initialSlotMoment = getMomentSlotIndex(initialMoment);

  const escapedTitle = initialTitle
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  const durationValueAttr = initialDurationValue === '' ? '' : String(initialDurationValue);
  const durationPlaceholderAttr = Number.isFinite(initialPlaceholderDuration) ? String(initialPlaceholderDuration) : '';

  lastFocusBeforeModal = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  modal.dataset.activeModal = 'quick-add';
  content.classList.remove('template-wide');
  content.classList.remove('badge-modal-container');
  content.classList.add('quick-add-modal');

  const slotSelection = isReplace
    ? `<input type="hidden" name="quick-slot" value="${targetSlot}">`
    : `
      <fieldset class="quick-add-fieldset">
        <legend>Slot</legend>
        <div class="quick-add-radio-group">
          ${QUICK_ADD_SLOT_MOMENTS.map((label, idx) => `
            <label class="quick-add-chip">
              <input type="radio" name="quick-slot" value="${idx}" ${idx === targetSlot ? 'checked' : ''}>
              <span>[${idx + 1}] ${label}</span>
            </label>
          `).join('')}
        </div>
      </fieldset>
    `;

  const slotDisplay = isReplace
    ? `<div class="quick-add-slot-display" aria-live="polite">Slot sélectionné : [${targetSlot + 1}] ${getDefaultMomentForSlot(targetSlot)}</div>`
    : '';

  content.innerHTML = `
    <form id="quick-add-form" class="quick-add-form" novalidate>
      <h3>${isReplace ? 'Remplacer la micro-tâche' : 'Nouvelle micro-tâche'}</h3>
      ${slotSelection}
      ${slotDisplay}
      <div class="quick-add-field">
        <label for="quick-add-title">Titre</label>
        <input id="quick-add-title" name="quick-add-title" type="text" maxlength="80" required placeholder="Titre (max 80 caractères)" value="${escapedTitle}">
      </div>
      <fieldset class="quick-add-fieldset">
        <legend>Moment</legend>
        <div class="quick-add-radio-group">
          ${QUICK_ADD_SLOT_MOMENTS.map(momentLabel => `
            <label class="quick-add-chip">
              <input type="radio" name="quick-moment" value="${momentLabel}" ${momentLabel === initialMoment ? 'checked' : ''}>
              <span>${momentLabel}</span>
            </label>
          `).join('')}
        </div>
      </fieldset>
      <fieldset class="quick-add-fieldset">
        <legend>Rituel</legend>
        <div class="quick-add-radio-group">
          <label class="quick-add-chip">
            <input type="radio" name="quick-ritual" value="Aucun" ${initialAudio === 'Aucun' ? 'checked' : ''}>
            <span>Aucun</span>
          </label>
          <label class="quick-add-chip">
            <input type="radio" name="quick-ritual" value="builtin-respiration" ${initialAudio === 'builtin-respiration' ? 'checked' : ''}>
            <span>Respiration</span>
          </label>
          <label class="quick-add-chip">
            <input type="radio" name="quick-ritual" value="builtin-etirements" ${initialAudio === 'builtin-etirements' ? 'checked' : ''}>
            <span>Étirements</span>
          </label>
        </div>
      </fieldset>
      <div class="quick-add-field">
        <label for="quick-add-duration">Durée (min)</label>
        <input id="quick-add-duration" name="quick-add-duration" type="number" min="5" max="60" step="5" placeholder="${durationPlaceholderAttr}" value="${durationValueAttr}">
      </div>
      <div class="quick-add-actions">
        <button type="submit" class="btn btn-primary">Enregistrer</button>
        <button type="button" class="btn btn-secondary" id="quick-add-cancel">Annuler</button>
      </div>
    </form>
  `;

  modal.classList.add('show');

  const form = content.querySelector('#quick-add-form');
  if (!form) return;

  const titleInput = form.querySelector('#quick-add-title');
  const durationInput = form.querySelector('#quick-add-duration');
  const slotRadios = Array.from(form.querySelectorAll('input[name="quick-slot"]'));
  const momentRadios = Array.from(form.querySelectorAll('input[name="quick-moment"]'));
  const ritualRadios = Array.from(form.querySelectorAll('input[name="quick-ritual"]'));
  const cancelBtn = form.querySelector('#quick-add-cancel');

  let hasCustomRitualSelection = isReplace && initialAudio !== defaultAudio;
  let hasCustomMomentSelection = isReplace && initialSlotMoment !== getMomentSlotIndex(slotMomentDefault);
  let ignoreMomentChange = false;

  const updateDurationPlaceholder = () => {
    if (!durationInput) {
      return;
    }
    const selectedMomentRadio = form.querySelector('input[name="quick-moment"]:checked');
    const selectedMomentLabel = selectedMomentRadio ? selectedMomentRadio.value : initialMoment;
    const defaultDuration = getFocusDefaultDurationForMomentLabel(selectedMomentLabel);
    if (Number.isFinite(defaultDuration)) {
      durationInput.setAttribute('placeholder', String(defaultDuration));
    }
  };

  const setRitualValue = (value) => {
    ritualRadios.forEach(radio => {
      radio.checked = radio.value === value;
    });
  };

  ritualRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      hasCustomRitualSelection = true;
    });
  });

  momentRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (ignoreMomentChange) {
        return;
      }
      hasCustomMomentSelection = true;
      if (!hasCustomRitualSelection) {
        const defaultValue = getDefaultRitualForMoment(radio.value);
        setRitualValue(defaultValue);
      }
      updateDurationPlaceholder();
    });
  });

  slotRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (!radio.checked) return;
      if (!hasCustomMomentSelection) {
        const newMoment = getDefaultMomentForSlot(Number.parseInt(radio.value, 10));
        const targetMoment = momentRadios.find(m => m.value === newMoment);
        if (targetMoment) {
          ignoreMomentChange = true;
          targetMoment.checked = true;
          ignoreMomentChange = false;
        }
        if (!hasCustomRitualSelection) {
          setRitualValue(getDefaultRitualForMoment(newMoment));
        }
      }
      updateDurationPlaceholder();
    });
  });

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  if (durationInput) {
    durationInput.addEventListener('input', () => {
      durationInput.setCustomValidity('');
    });
  }

  updateDurationPlaceholder();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const titleValue = titleInput ? titleInput.value.trim() : '';
    if (!titleValue) {
      titleInput?.focus();
      return;
    }

    const slotValue = isReplace ? targetSlot : Number.parseInt((form.querySelector('input[name="quick-slot"]:checked')?.value || ''), 10);
    if (Number.isNaN(slotValue) || slotValue < 0 || slotValue > 2) {
      showToast('Slot invalide.');
      return;
    }

    const selectedMoment = form.querySelector('input[name="quick-moment"]:checked')?.value || getDefaultMomentForSlot(slotValue);
    const selectedRitual = form.querySelector('input[name="quick-ritual"]:checked')?.value || 'Aucun';

    let durationValue = null;
    const durationRaw = durationInput ? durationInput.value.trim() : '';
    if (durationRaw) {
      const parsed = Number.parseInt(durationRaw, 10);
      if (!Number.isFinite(parsed) || parsed < 5 || parsed > 60 || parsed % 5 !== 0) {
        durationInput?.setCustomValidity('Choisis une durée entre 5 et 60 min, par pas de 5.');
        durationInput?.reportValidity();
        return;
      }
      durationValue = parsed;
    }

    ensureTasksForDate(today);
    const tasks = state.tasks[today];
    const existing = tasks[slotValue] ? { ...tasks[slotValue] } : createEmptyTask();

    const existingTime = typeof existing.time === 'string' ? existing.time : '';
    const resolvedTime = existing.moment && existing.moment === selectedMoment && existingTime
      ? existingTime
      : getDefaultTimeForMoment(selectedMoment) || '';

    const usesDefaultDuration = durationValue === null;

    const updatedTask = {
      ...existing,
      title: titleValue,
      moment: selectedMoment,
      audio: normalizeAudioValue(selectedRitual),
      duration: usesDefaultDuration ? null : durationValue,
      time: resolvedTime,
      status: 'planned',
      usesDefaultDuration
    };

    tasks[slotValue] = updatedTask;
    saveState();
    closeModal();
    renderDailyTasks();
    renderOtherDays();
    updateMomentum();
    refreshWeeklyReviewIfVisible();
    showToast(isReplace ? 'Tâche remplacée.' : 'Tâche ajoutée.');
  });

  setupFocusTrap(content, { modalKey: 'quick-add', initialFocus: titleInput });
}

const focusShortcutIconMarkup = '<svg class="task-shortcut-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 5 14h6l-1 8 8-12h-6l1-8Z" fill="currentColor"/></svg>';
const postponeShortcutIconMarkup = '<svg class="task-shortcut-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h1V1h2v2h4V1h2v2h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm12 5V6a1 1 0 0 0-1-1h-1v1h-2V5h-4v1H9V5H8a1 1 0 0 0-1 1v2ZM9 12h2.25v2.25H13.5V16.5h-2.25v2.25H9V16.5H6.75V14.25H9Zm8 0h1.5v6.75H17Z" fill="currentColor"/></svg>';

function createTaskShortcutButton({ iconMarkup, label, onClick, disabled = false }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'task-shortcut-btn';
  button.innerHTML = iconMarkup;
  button.setAttribute('aria-label', label);
  button.title = label;
  if (disabled) {
    button.disabled = true;
  }
  if (typeof onClick === 'function' && !disabled) {
    button.addEventListener('click', onClick);
  }
  return button;
}

function createFocusNudgeElement({ momentKey, suggestion }) {
  if (!momentKey || !suggestion) {
    return null;
  }

  const container = document.createElement('div');
  container.className = 'focus-nudge';

  const textEl = document.createElement('span');
  textEl.className = 'focus-nudge-text';
  textEl.textContent = `Passer à ${suggestion.targetDuration} min ?`;
  container.appendChild(textEl);

  const actions = document.createElement('div');
  actions.className = 'focus-nudge-actions';

  const yesBtn = document.createElement('button');
  yesBtn.type = 'button';
  yesBtn.className = 'focus-nudge-btn focus-nudge-btn-primary';
  yesBtn.textContent = 'Oui';
  yesBtn.addEventListener('click', () => {
    applyFocusDefaultDuration(momentKey, suggestion.targetDuration);
    saveState();
    renderDailyTasks();
    renderOtherDays();
    const label = getMomentLabelFromKey(momentKey) || 'créneau';
    showToast(`Durée ${label} → ${suggestion.targetDuration} min.`);
  });

  const laterBtn = document.createElement('button');
  laterBtn.type = 'button';
  laterBtn.className = 'focus-nudge-btn';
  laterBtn.textContent = 'Plus tard';
  laterBtn.addEventListener('click', () => {
    snoozeFocusSuggestion(momentKey);
    saveState();
    renderDailyTasks();
    showToast('Suggestion snoozée 7 jours.');
  });

  const neverBtn = document.createElement('button');
  neverBtn.type = 'button';
  neverBtn.className = 'focus-nudge-btn';
  neverBtn.textContent = 'Jamais';
  neverBtn.addEventListener('click', () => {
    muteFocusSuggestion(momentKey);
    saveState();
    renderDailyTasks();
    showToast('Suggestion masquée 30 jours.');
  });

  actions.appendChild(yesBtn);
  actions.appendChild(laterBtn);
  actions.appendChild(neverBtn);
  container.appendChild(actions);

  return container;
}

function shouldDisplayMomentSuggestionForTask(task) {
  if (!task || isTaskEmpty(task)) {
    return false;
  }
  if (task.status === 'done') {
    return false;
  }
  return true;
}

function createMomentSuggestionElement({ suggestion, onApply, onLater, onNever }) {
  if (!suggestion) {
    return null;
  }

  const container = document.createElement('div');
  container.className = 'moment-suggestion';

  const labelEl = document.createElement('span');
  labelEl.className = 'moment-suggestion-label';
  labelEl.innerHTML = `Meilleur moment : <strong>${suggestion.momentLabel}</strong>`;
  container.appendChild(labelEl);

  const actionsEl = document.createElement('div');
  actionsEl.className = 'moment-suggestion-actions';

  const applyBtn = document.createElement('button');
  applyBtn.type = 'button';
  applyBtn.className = 'btn btn-primary btn-compact';
  applyBtn.textContent = 'Appliquer';
  applyBtn.addEventListener('click', () => {
    const result = typeof onApply === 'function' ? onApply() : true;
    if (result !== false) {
      container.remove();
    }
  });
  actionsEl.appendChild(applyBtn);

  if (typeof onLater === 'function') {
    const laterBtn = document.createElement('button');
    laterBtn.type = 'button';
    laterBtn.className = 'btn btn-secondary btn-compact';
    laterBtn.textContent = 'Plus tard';
    laterBtn.addEventListener('click', () => {
      const result = onLater();
      if (result !== false) {
        container.remove();
      }
    });
    actionsEl.appendChild(laterBtn);
  }

  if (typeof onNever === 'function') {
    const neverBtn = document.createElement('button');
    neverBtn.type = 'button';
    neverBtn.className = 'btn btn-ghost btn-compact';
    neverBtn.textContent = 'Jamais';
    neverBtn.addEventListener('click', () => {
      const result = onNever();
      if (result !== false) {
        container.remove();
      }
    });
    actionsEl.appendChild(neverBtn);
  }

  container.appendChild(actionsEl);
  return container;
}

function applyMomentSuggestionToTask(dateStr, taskIdx, suggestion, options = {}) {
  if (!dateStr || typeof taskIdx !== 'number' || !suggestion) {
    return false;
  }
  ensureTasksForDate(dateStr);
  const tasks = state.tasks[dateStr];
  if (!Array.isArray(tasks) || !tasks[taskIdx]) {
    return false;
  }
  const task = tasks[taskIdx];
  if (!task || isTaskEmpty(task) || task.status === 'done') {
    return false;
  }

  const label = (suggestion.momentLabel || '').trim();
  if (!label) {
    return false;
  }

  task.moment = label;
  if (options.setPrefill) {
    setMomentSuggestionPrefill(suggestion.momentKey);
  }

  state.momentSuggestion.lastComputedDate = null;
  refreshMomentSuggestionIfNeeded(true);
  saveState();
  return true;
}

function snoozeMomentSuggestion(momentKey) {
  ensureMomentSuggestionState();
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return false;
  }
  state.momentSuggestion.snoozeUntil[momentKey] = getDateString(MOMENT_SUGGESTION_SNOOZE_DAYS);
  state.momentSuggestion.lastComputedDate = null;
  refreshMomentSuggestionIfNeeded(true);
  return true;
}

function muteMomentSuggestion(momentKey) {
  ensureMomentSuggestionState();
  if (!momentKey || !FOCUS_MOMENT_KEYS.includes(momentKey)) {
    return false;
  }
  state.momentSuggestion.muteUntil[momentKey] = getDateString(MOMENT_SUGGESTION_MUTE_DAYS);
  state.momentSuggestion.lastComputedDate = null;
  refreshMomentSuggestionIfNeeded(true);
  return true;
}

function renderDailyTasks() {
  const today = getToday();
  ensureTasksForDate(today);
  ensureFocusAdaptiveState();

  const tasksList = document.getElementById('daily-tasks-list');
  tasksList.innerHTML = '';
  const plusIconMarkup = '<svg class="task-quick-action-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H5a1 1 0 0 1 0-2h6V5a1 1 0 0 1 1-1Z" fill="currentColor"/></svg>';
  const editIconMarkup = '<svg class="task-quick-action-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.71 7.04a1 1 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0L4.59 15.66a1 1 0 0 0-.25.45l-1.32 4.62a1 1 0 0 0 1.23 1.23l4.62-1.32a1 1 0 0 0 .45-.25Z" fill="currentColor"/></svg>';
  const momentSuggestion = getMomentSuggestion();
  let momentSuggestionInjected = false;

  const focusSuggestions = {};
  const displayedNudges = new Set();
  FOCUS_MOMENT_KEYS.forEach(key => {
    focusSuggestions[key] = getFocusSuggestionForMoment(key);
  });

  state.tasks[today].forEach((task, idx) => {
    const isDone = task.status === 'done';
    const isEmptySlot = isTaskEmpty(task);
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    if (isDone) {
      taskItem.classList.add('done');
    }
    if (isEmptySlot) {
      taskItem.classList.add('task-empty');
    }

    const header = document.createElement('div');
    header.className = 'task-header';

    const numberEl = document.createElement('div');
    numberEl.className = 'task-number';
    numberEl.textContent = idx + 1;

    const infoEl = document.createElement('div');
    infoEl.className = 'task-info';

    const titleEl = document.createElement('div');
    titleEl.className = 'task-title';
    titleEl.textContent = isEmptySlot ? `Slot ${idx + 1} libre` : (task.title || `Tâche ${idx + 1}`);
    infoEl.appendChild(titleEl);

    const metaText = isEmptySlot ? 'Ajoute une micro-tâche pour rester dans ton flow.' : formatTaskMeta(task);
    if (metaText) {
      const metaEl = document.createElement('div');
      metaEl.className = 'task-meta';
      metaEl.textContent = metaText;
      infoEl.appendChild(metaEl);
    }

    const badgesEl = document.createElement('div');
    badgesEl.className = 'task-badges';
    if (!isEmptySlot && !isDone && isTaskScheduleLate(task)) {
      const lateBadge = document.createElement('span');
      lateBadge.className = 'task-badge task-badge-late';
      lateBadge.textContent = 'En retard';
      badgesEl.appendChild(lateBadge);
    }
    if (badgesEl.childElementCount > 0) {
      infoEl.appendChild(badgesEl);
    }

    if (!isEmptySlot && !isDone && !focusSessionRuntime.activeTimer) {
      const momentKey = getMomentKeyFromLabel(task.moment);
      const suggestion = momentKey ? focusSuggestions[momentKey] : null;
      if (momentKey && suggestion && !displayedNudges.has(momentKey) && taskUsesDefaultDuration(task)) {
        const nudgeEl = createFocusNudgeElement({ momentKey, suggestion });
        if (nudgeEl) {
          infoEl.appendChild(nudgeEl);
          displayedNudges.add(momentKey);
        }
      }
    }

    const quickAction = document.createElement('button');
    quickAction.type = 'button';
    quickAction.className = `task-quick-action ${isEmptySlot ? 'task-quick-action-add' : 'task-quick-action-edit'}`;
    quickAction.setAttribute('aria-label', isEmptySlot
      ? `Ajouter une micro-tâche pour le slot ${idx + 1}`
      : `Remplacer la micro-tâche du slot ${idx + 1}`
    );
    quickAction.innerHTML = isEmptySlot ? plusIconMarkup : editIconMarkup;
    quickAction.addEventListener('click', () => {
      openQuickAddModal({ slotIndex: idx, mode: isEmptySlot ? 'add' : 'replace' });
    });

    header.appendChild(numberEl);
    header.appendChild(infoEl);
    header.appendChild(quickAction);
    taskItem.appendChild(header);

    let inlineMicropasCard = null;

    if (!isEmptySlot) {
      if (!momentSuggestionInjected && momentSuggestion && shouldDisplayMomentSuggestionForTask(task)) {
        const suggestionEl = createMomentSuggestionElement({
          suggestion: momentSuggestion,
          onApply: () => {
            const applied = applyMomentSuggestionToTask(today, idx, momentSuggestion);
            if (applied) {
              showToast('Moment appliqué.');
              renderDailyTasks();
              renderOtherDays();
              updateMomentum();
            }
          },
          onLater: () => {
            if (snoozeMomentSuggestion(momentSuggestion.momentKey)) {
              saveState();
              renderDailyTasks();
              showToast('Suggestion snoozée 7 jours.');
            }
          },
          onNever: () => {
            if (muteMomentSuggestion(momentSuggestion.momentKey)) {
              saveState();
              renderDailyTasks();
              showToast('Suggestion masquée 30 jours.');
            }
          }
        });
        if (suggestionEl) {
          infoEl.appendChild(suggestionEl);
          momentSuggestionInjected = true;
        }
      }
      const suggestion = getDashboardSuggestionForTask(task, today);
      if (suggestion) {
        const banner = document.createElement('div');
        banner.className = 'micropas-banner';

        const bannerLabel = document.createElement('span');
        bannerLabel.textContent = 'Suggestion Micropas disponible';
        banner.appendChild(bannerLabel);

        const bannerBtn = document.createElement('button');
        bannerBtn.type = 'button';
        bannerBtn.className = 'micropas-banner-btn';
        bannerBtn.textContent = 'Voir / Appliquer';
        banner.appendChild(bannerBtn);

        infoEl.appendChild(banner);

        inlineMicropasCard = createInlineMicropasCard({ dateStr: today, taskIdx: idx, suggestion });
        taskItem.appendChild(inlineMicropasCard);

        bannerBtn.addEventListener('click', () => {
          if (!inlineMicropasCard) return;
          const isHidden = inlineMicropasCard.hasAttribute('hidden');
          if (isHidden) {
            inlineMicropasCard.removeAttribute('hidden');
            bannerBtn.textContent = 'Masquer';
          } else {
            inlineMicropasCard.setAttribute('hidden', '');
            bannerBtn.textContent = 'Voir / Appliquer';
          }
        });
      }
    }

    if (!isEmptySlot) {
      const actions = document.createElement('div');
      actions.className = 'task-actions';

      if (!isDone) {
        const startBtn = document.createElement('button');
        startBtn.className = 'btn btn-primary';
        startBtn.type = 'button';
        startBtn.textContent = 'Commencer';
        startBtn.addEventListener('click', () => startTask(idx));
        actions.appendChild(startBtn);
      }

      const validateBtn = document.createElement('button');
      validateBtn.className = `btn btn-validate${isDone ? ' checked' : ''}`;
      validateBtn.type = 'button';
      validateBtn.setAttribute('aria-pressed', isDone);
      validateBtn.textContent = 'Valider';
      validateBtn.addEventListener('click', () => toggleTaskCompletion(idx));
      actions.appendChild(validateBtn);

      if (!isDone) {
        const reportBtn = document.createElement('button');
        reportBtn.className = 'btn btn-ghost';
        reportBtn.type = 'button';
        reportBtn.textContent = 'Reporter';
        reportBtn.addEventListener('click', () => reportTask(today, idx));
        actions.appendChild(reportBtn);
      }

      const shortcuts = document.createElement('div');
      shortcuts.className = 'task-shortcuts';

      if (!isDone) {
        const quickFocusBtn = createTaskShortcutButton({
          iconMarkup: focusShortcutIconMarkup,
          label: 'Commencer 10 min',
          onClick: () => startQuickFocus(idx)
        });
        shortcuts.appendChild(quickFocusBtn);
      }

      const postponeBtn = createTaskShortcutButton({
        iconMarkup: postponeShortcutIconMarkup,
        label: 'Reporter +1 jour',
        onClick: () => postponeTaskByOneDay(today, idx),
        disabled: isDone
      });
      shortcuts.appendChild(postponeBtn);

      if (shortcuts.childElementCount > 0) {
        actions.appendChild(shortcuts);
      }

      taskItem.appendChild(actions);
    } else {
      const emptyHint = document.createElement('div');
      emptyHint.className = 'task-empty-hint';
      emptyHint.textContent = 'Planifie ton prochain micro-pas en un clin d’œil.';
      taskItem.appendChild(emptyHint);
    }

    tasksList.appendChild(taskItem);
  });

  checkAllTasksDone();
}

function initDailyQuickAdd() {
  const quickAddBtn = document.getElementById('daily-quick-add-btn');
  if (quickAddBtn && !quickAddBtn.dataset.boundQuickAdd) {
    quickAddBtn.addEventListener('click', () => {
      openQuickAddModal();
    });
    quickAddBtn.dataset.boundQuickAdd = 'true';
  }
}

function renderOtherDays() {
  const container = document.getElementById('other-days-list');
  container.innerHTML = '';

  for (let i = 1; i <= 4; i++) {
    const dateStr = getDateString(i);
    ensureTasksForDate(dateStr);

    const dayToggle = document.createElement('div');
    dayToggle.className = 'day-toggle';

    const dayHeader = document.createElement('div');
    dayHeader.className = 'day-header';
    dayHeader.innerHTML = `<span>J+${i} - ${formatDate(dateStr)}</span><span>▼</span>`;

    const dayContent = document.createElement('div');
    dayContent.className = 'day-content';

    state.tasks[dateStr].forEach((task, idx) => {
      const isDone = task.status === 'done';
      const isEmpty = isTaskEmpty(task);

      const taskDiv = document.createElement('div');
      taskDiv.className = 'task-item';
      if (isDone) {
        taskDiv.classList.add('done');
      }
      if (isEmpty) {
        taskDiv.classList.add('task-empty');
      }

      const header = document.createElement('div');
      header.className = 'task-header';

      const numberEl = document.createElement('div');
      numberEl.className = 'task-number';
      numberEl.textContent = idx + 1;

      const infoEl = document.createElement('div');
      infoEl.className = 'task-info';

      const titleEl = document.createElement('div');
      titleEl.className = 'task-title';
      titleEl.textContent = isEmpty ? `Slot ${idx + 1} libre` : (task.title || `Tâche ${idx + 1}`);
      infoEl.appendChild(titleEl);

      if (!isEmpty) {
        const metaText = formatTaskMeta(task);
        if (metaText) {
          const metaEl = document.createElement('div');
          metaEl.className = 'task-meta';
          metaEl.textContent = metaText;
          infoEl.appendChild(metaEl);
        }
      } else {
        const metaEl = document.createElement('div');
        metaEl.className = 'task-meta';
        metaEl.textContent = 'Anticipe ton micro-pas pour ce créneau.';
        infoEl.appendChild(metaEl);
      }

      header.appendChild(numberEl);
      header.appendChild(infoEl);
      taskDiv.appendChild(header);

      if (!isEmpty) {
        const actions = document.createElement('div');
        actions.className = 'task-actions';

        if (!isDone) {
          const reportBtn = document.createElement('button');
          reportBtn.className = 'btn btn-ghost';
          reportBtn.type = 'button';
          reportBtn.textContent = 'Reporter';
          reportBtn.addEventListener('click', () => reportTask(dateStr, idx));
          actions.appendChild(reportBtn);
        }

        const shortcuts = document.createElement('div');
        shortcuts.className = 'task-shortcuts';
        const postponeBtn = createTaskShortcutButton({
          iconMarkup: postponeShortcutIconMarkup,
          label: 'Reporter +1 jour',
          onClick: () => postponeTaskByOneDay(dateStr, idx),
          disabled: isDone
        });
        shortcuts.appendChild(postponeBtn);
        actions.appendChild(shortcuts);

        taskDiv.appendChild(actions);
      } else {
        const emptyHint = document.createElement('div');
        emptyHint.className = 'task-empty-hint';
        emptyHint.textContent = 'Ajoute un micro-pas pour garder le rythme.';
        taskDiv.appendChild(emptyHint);
      }

      dayContent.appendChild(taskDiv);
    });

    dayHeader.onclick = () => {
      dayContent.classList.toggle('open');
    };

    dayToggle.appendChild(dayHeader);
    dayToggle.appendChild(dayContent);
    container.appendChild(dayToggle);
  }
}

function updateDailyMoodHistory(partial = {}) {
  if (!state.moodHistory) state.moodHistory = {};
  const today = getToday();
  const existing = state.moodHistory[today] ? { ...state.moodHistory[today] } : {};
  const entry = { ...existing };

  if (partial.motivation !== undefined) {
    entry.motivation = partial.motivation;
  } else if (entry.motivation === undefined && typeof state.mood?.motivation === 'number') {
    entry.motivation = state.mood.motivation;
  }

  if (partial.emoji !== undefined) {
    entry.emoji = partial.emoji;
  } else if (entry.emoji === undefined && state.mood?.emoji) {
    entry.emoji = state.mood.emoji;
  }

  if (entry.motivation === undefined && entry.emoji === undefined) {
    return;
  }

  entry.updatedAt = new Date().toISOString();
  state.moodHistory[today] = entry;
}

function renderMood() {
  const slider = document.getElementById('motivation-slider');
  slider.value = state.mood.motivation || 50;

  slider.oninput = () => {
    const value = parseInt(slider.value);
    state.mood.motivation = value;
    updateDailyMoodHistory({ motivation: value });
    saveState();
    refreshWeeklyReviewIfVisible();
  };

  const emojiBtns = document.querySelectorAll('.emoji-btn');
  emojiBtns.forEach(btn => {
    const emoji = btn.getAttribute('data-emoji');
    if (state.mood.emoji === emoji) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.onclick = () => {
      state.mood.emoji = emoji;
      saveState();
      emojiBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateDailyMoodHistory({ emoji });
      refreshWeeklyReviewIfVisible();
    };
  });
}

function renderStreakSummary() {
  sanitizeStreakData();

  const summary = document.getElementById('streak-summary');
  const textEl = document.getElementById('streak-text');
  const badgeEl = document.getElementById('streak-badge');
  const tooltipEl = document.getElementById('streak-tooltip');

  if (!summary || !textEl || !badgeEl || !tooltipEl) {
    return;
  }

  const current = state.streak?.current || 0;
  const best = state.streak?.best || 0;
  textEl.textContent = `Streak : ${formatDayCount(current)}`;
  tooltipEl.textContent = `Meilleur streak : ${formatDayCount(best)}`;
  summary.setAttribute('title', `Meilleur streak : ${formatDayCount(best)}`);
  summary.setAttribute('aria-label', `Streak actuel : ${formatDayCount(current)}. Meilleur streak : ${formatDayCount(best)}`);

  const badge = getBadgeForStreak(current);
  if (badge) {
    badgeEl.textContent = badge.icon;
    badgeEl.setAttribute('aria-label', `Badge ${badge.label}`);
    summary.classList.add('has-badge');
  } else {
    badgeEl.textContent = '—';
    badgeEl.removeAttribute('aria-label');
    summary.classList.remove('has-badge');
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2600);
}

function showConfirmationToast(message, options = {}) {
  const container = document.getElementById('toast-container');
  if (!container) return Promise.resolve(false);

  const { confirmLabel = 'Oui', cancelLabel = 'Annuler', timeout = 7000 } = options;

  return new Promise(resolve => {
    const toast = document.createElement('div');
    toast.className = 'toast toast-confirmation';

    const textEl = document.createElement('span');
    textEl.className = 'toast-message';
    textEl.textContent = message;
    toast.appendChild(textEl);

    const actions = document.createElement('div');
    actions.className = 'toast-actions';

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = 'toast-btn toast-btn-confirm';
    confirmBtn.textContent = confirmLabel;

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'toast-btn toast-btn-cancel';
    cancelBtn.textContent = cancelLabel;

    actions.appendChild(confirmBtn);
    actions.appendChild(cancelBtn);
    toast.appendChild(actions);

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    let resolved = false;
    const cleanup = (result) => {
      if (resolved) return;
      resolved = true;
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
        resolve(result);
      }, 300);
    };

    confirmBtn.addEventListener('click', () => cleanup(true));
    cancelBtn.addEventListener('click', () => cleanup(false));

    if (timeout) {
      setTimeout(() => cleanup(false), timeout);
    }
  });
}

function handleDailyCompletionFeedback(currentStreak, badge) {
  const normalized = Number(currentStreak) || 0;
  showToast(`Journée validée ✅ — Streak : ${formatDayCount(normalized)}`);

  if (badge) {
    showBadgeModal(badge);
  }
}

function updateMomentum() {
  updateDailyMomentumRing();
  updateGlobalProgressBar();
}

function updateDailyMomentumRing() {
  const today = getToday();
  if (!state.tasks[today]) return;

  const doneTasks = state.tasks[today].filter(t => t.status === 'done').length;
  const dailyProgress = doneTasks >= 3 ? 100 : doneTasks * 30;

  const ring = document.getElementById('momentum-ring');
  const percentage = document.getElementById('momentum-percentage');

  if (ring) {
    const angle = (dailyProgress / 100) * 360;
    ring.style.setProperty('--progress-angle', `${angle}deg`);
  }

  if (percentage) {
    percentage.textContent = `${dailyProgress}%`;
  }
}

function updateGlobalProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const progressContainer = document.getElementById('global-progress');
  if (!progressBar || !progressContainer) return;

  const globalProgress = calculateGlobalProgressPercentage();
  const widthValue = Math.max(0, Math.min(100, globalProgress));
  progressBar.style.width = `${widthValue.toFixed(2)}%`;

  const progressValue = Math.round(widthValue);
  progressContainer.setAttribute('aria-valuenow', progressValue);
  progressContainer.setAttribute('aria-valuetext', `${progressValue}% des mini-tâches complétées`);
}

function calculateGlobalProgressPercentage() {
  const deadlineISO = state.settings.deadlineISO;
  const storedStartISO = state.settings.startISO;
  const fallbackStartISO = getEarliestTaskDate() || getToday();
  const startISO = storedStartISO || fallbackStartISO;

  if (!state.settings.startISO && startISO) {
    state.settings.startISO = startISO;
    saveState();
  }

  const startDate = new Date(startISO);
  let deadlineDate = deadlineISO ? new Date(deadlineISO) : null;

  if (deadlineDate && deadlineDate < startDate) {
    deadlineDate = null;
  }

  let expectedTasks = 0;
  if (deadlineDate) {
    const diffTime = deadlineDate - startDate;
    if (diffTime >= 0) {
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
      expectedTasks = Math.max(diffDays, 1) * 3;
    }
  }

  let completedTasks = 0;

  Object.entries(state.tasks).forEach(([dateStr, tasks]) => {
    if (!tasks) return;
    const taskDate = new Date(dateStr);
    if (isNaN(taskDate)) return;

    if (deadlineDate) {
      if (taskDate < startDate || taskDate > deadlineDate) return;
    }

    completedTasks += tasks.filter(task => task.status === 'done').length;

    if (!deadlineDate) {
      expectedTasks += tasks.length;
    }
  });

  if (expectedTasks === 0) {
    return completedTasks > 0 ? 100 : 0;
  }

  const progress = (completedTasks / expectedTasks) * 100;
  return Math.max(0, Math.min(100, progress));
}

function getNotificationSlotLabel(slotKey) {
  return NOTIFICATION_SLOT_DETAILS[slotKey]?.label || slotKey;
}

function computeNextReminderDate(slotKey, referenceDate = new Date()) {
  ensureNotificationState();

  if (!state.notifications.enabled) {
    return null;
  }

  const slotSettings = state.notifications.slots?.[slotKey];
  if (!slotSettings || !slotSettings.enabled) {
    return null;
  }

  const normalizedTime = normalizeTimeString(
    slotSettings.time,
    NOTIFICATION_SLOT_DETAILS[slotKey]?.defaultTime || '09:00'
  );

  const [hoursStr, minutesStr] = normalizedTime.split(':');
  const hours = Number.parseInt(hoursStr, 10) || 0;
  const minutes = Number.parseInt(minutesStr, 10) || 0;

  const reference = referenceDate instanceof Date && !Number.isNaN(referenceDate.getTime())
    ? new Date(referenceDate.getTime())
    : new Date();

  reference.setSeconds(0, 0);

  const candidate = new Date(reference.getTime());
  candidate.setHours(hours, minutes, 0, 0);

  if (candidate.getTime() <= reference.getTime()) {
    candidate.setDate(candidate.getDate() + 1);
  }

  const adjusted = adjustDateForDnd(candidate);
  return adjusted instanceof Date ? adjusted : null;
}

function cancelScheduledReminder(slotKey) {
  const timerId = notificationRuntime.timers.get(slotKey);
  if (timerId !== undefined) {
    clearTimeout(timerId);
    notificationRuntime.timers.delete(slotKey);
  }
  notificationRuntime.nextOccurrences.delete(slotKey);
}

function scheduleNotificationForSlot(slotKey, options = {}) {
  cancelScheduledReminder(slotKey);

  ensureNotificationState();

  if (!state.notifications.enabled) {
    notificationRuntime.snoozes.delete(slotKey);
    refreshNotificationIndicators();
    return;
  }

  const slotSettings = state.notifications.slots?.[slotKey];
  if (!slotSettings || !slotSettings.enabled) {
    notificationRuntime.snoozes.delete(slotKey);
    refreshNotificationIndicators();
    return;
  }

  const now = new Date();
  let targetDate = null;
  let wasSnoozed = false;

  if (options.forcedDate) {
    const forced = options.forcedDate instanceof Date
      ? options.forcedDate
      : new Date(options.forcedDate);
    if (forced instanceof Date && !Number.isNaN(forced.getTime()) && forced.getTime() > now.getTime()) {
      targetDate = forced;
    }
  }

  if (!targetDate && options.ignoreSnooze !== true) {
    const storedSnooze = notificationRuntime.snoozes.get(slotKey);
    if (storedSnooze instanceof Date && storedSnooze.getTime() > now.getTime()) {
      const adjustedSnooze = adjustDateForDnd(storedSnooze);
      if (adjustedSnooze) {
        targetDate = adjustedSnooze;
        notificationRuntime.snoozes.set(slotKey, adjustedSnooze);
        wasSnoozed = true;
      } else {
        notificationRuntime.snoozes.delete(slotKey);
      }
    } else if (storedSnooze) {
      notificationRuntime.snoozes.delete(slotKey);
    }
  }

  if (!targetDate) {
    const reference = options.fromDate instanceof Date && !Number.isNaN(options.fromDate.getTime())
      ? options.fromDate
      : now;
    targetDate = computeNextReminderDate(slotKey, reference);
  }

  if (!(targetDate instanceof Date) || Number.isNaN(targetDate.getTime())) {
    notificationRuntime.nextOccurrences.delete(slotKey);
    refreshNotificationIndicators();
    return;
  }

  if (targetDate.getTime() <= Date.now()) {
    window.setTimeout(() => {
      notificationRuntime.nextOccurrences.delete(slotKey);
      handleReminderTrigger(slotKey, targetDate, wasSnoozed);
    }, 0);
    return;
  }

  const delay = targetDate.getTime() - Date.now();

  if (delay > MAX_TIMEOUT_DELAY) {
    const timerId = window.setTimeout(() => {
      notificationRuntime.timers.delete(slotKey);
      scheduleNotificationForSlot(slotKey, { ...options, forcedDate: targetDate });
    }, MAX_TIMEOUT_DELAY);
    notificationRuntime.timers.set(slotKey, timerId);
    notificationRuntime.nextOccurrences.set(slotKey, targetDate);
    refreshNotificationIndicators();
    return;
  }

  const timerId = window.setTimeout(() => {
    notificationRuntime.timers.delete(slotKey);
    notificationRuntime.nextOccurrences.delete(slotKey);
    handleReminderTrigger(slotKey, targetDate, wasSnoozed);
  }, delay);

  notificationRuntime.timers.set(slotKey, timerId);
  notificationRuntime.nextOccurrences.set(slotKey, targetDate);
  refreshNotificationIndicators();
}

function scheduleAllNotifications(options = {}) {
  Object.keys(NOTIFICATION_SLOT_DETAILS).forEach(slotKey => {
    scheduleNotificationForSlot(slotKey, options);
  });
}

function getNextScheduledReminder() {
  let next = null;
  notificationRuntime.nextOccurrences.forEach((date, slotKey) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      return;
    }
    if (date.getTime() < Date.now()) {
      return;
    }
    if (!next || date.getTime() < next.date.getTime()) {
      next = { slot: slotKey, date };
    }
  });
  return next;
}

function formatTimeForDisplay(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.warn('Formatage heure impossible', error);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}

function refreshNotificationIndicators() {
  updateNotificationsStatus();
  updateUpcomingReminderBanner();
}

function updateUpcomingReminderBanner() {
  const banner = document.getElementById('next-reminder-banner');
  const textEl = document.getElementById('next-reminder-text');

  if (!banner || !textEl) {
    return;
  }

  if (!state.notifications?.enabled) {
    banner.hidden = true;
    return;
  }

  const upcoming = getNextScheduledReminder();
  if (!upcoming) {
    banner.hidden = true;
    return;
  }

  const diffMs = upcoming.date.getTime() - Date.now();
  if (diffMs < 0 || diffMs > 15 * 60 * 1000) {
    banner.hidden = true;
    return;
  }

  const minutes = Math.max(0, Math.round(diffMs / 60000));
  const slotLabel = getNotificationSlotLabel(upcoming.slot);
  let message;
  if (minutes <= 0) {
    message = `Rappel ${slotLabel} imminent`;
  } else if (minutes === 1) {
    message = `Rappel ${slotLabel} dans 1 minute`;
  } else {
    message = `Rappel ${slotLabel} dans ${minutes} minutes`;
  }

  textEl.textContent = message;
  banner.hidden = false;
}

function isSameDay(dateA, dateB = new Date()) {
  if (!(dateA instanceof Date) || Number.isNaN(dateA.getTime())) return false;
  if (!(dateB instanceof Date) || Number.isNaN(dateB.getTime())) return false;
  return dateA.getFullYear() === dateB.getFullYear()
    && dateA.getMonth() === dateB.getMonth()
    && dateA.getDate() === dateB.getDate();
}

function getNotificationPermissionLabel() {
  if (!('Notification' in window)) {
    return 'Notifications système : Non supportées';
  }
  if (!isPWAInstalled()) {
    return 'Notifications système : PWA non installée';
  }
  const permission = Notification.permission;
  if (permission === 'granted') {
    return 'Notifications système : Autorisées';
  }
  if (permission === 'denied') {
    return 'Notifications système : Refusées';
  }
  return 'Notifications système : Autorisation nécessaire';
}

function updateNotificationsStatus() {
  const statusEl = document.getElementById('notification-status-text');
  if (statusEl) {
    statusEl.classList.remove('notification-status-text-positive', 'notification-status-text-negative');

    if (!state.notifications?.enabled) {
      statusEl.textContent = 'Rappels désactivés.';
      statusEl.classList.add('notification-status-text-negative');
    } else {
      const activeSlots = Object.keys(NOTIFICATION_SLOT_DETAILS).filter(slotKey => state.notifications.slots?.[slotKey]?.enabled);
      if (!activeSlots.length) {
        statusEl.textContent = 'Aucun créneau actif.';
        statusEl.classList.add('notification-status-text-negative');
      } else {
        const upcoming = getNextScheduledReminder();
        if (upcoming) {
          const slotLabel = getNotificationSlotLabel(upcoming.slot);
          const formattedTime = formatTimeForDisplay(upcoming.date);
          const dayLabel = isSameDay(upcoming.date) ? 'aujourd’hui' : 'demain';
          statusEl.textContent = `Prochain rappel ${slotLabel} : ${formattedTime} (${dayLabel})`;
        } else {
          statusEl.textContent = 'Rappels activés. Programmation en cours…';
        }
        statusEl.classList.add('notification-status-text-positive');
      }
    }
  }

  const permissionEl = document.getElementById('notification-permission-state');
  if (permissionEl) {
    permissionEl.textContent = getNotificationPermissionLabel();
  }
}

function playNotificationBeep() {
  if (!state.notifications?.sound?.beep) {
    return;
  }

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }
    if (!notificationBeepContext) {
      notificationBeepContext = new AudioContextClass();
    }
    const ctx = notificationBeepContext;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.5);
  } catch (error) {
    console.warn('Lecture du beep impossible', error);
  }
}

function showSystemNotification(slotKey, { body, isTest = false, scheduledFor = null } = {}) {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  if (!isPWAInstalled()) return;
  if (!navigator.serviceWorker || !navigator.serviceWorker.ready) return;

  const slotLabel = getNotificationSlotLabel(slotKey);
  const notificationBody = body || (isTest
    ? `Notification de test — ${slotLabel}`
    : `C'est l'heure de ton rituel ${slotLabel}.`);

  navigator.serviceWorker.ready
    .then(registration => {
      registration.showNotification(`ZEYNE — ${slotLabel}`, {
        body: notificationBody,
        tag: `zeyne-reminder-${slotKey}`,
        renotify: true,
        data: {
          slot: slotKey,
          scheduledFor: scheduledFor instanceof Date && !Number.isNaN(scheduledFor.getTime())
            ? scheduledFor.toISOString()
            : null
        },
        actions: [
          { action: 'snooze-10', title: 'Snooze 10 min' }
        ]
      });
    })
    .catch(error => {
      console.warn('Notification système impossible', error);
    });
}

function deliverReminderFeedback(slotKey, { isTest = false, scheduledFor = null, wasSnoozed = false } = {}) {
  const slotLabel = getNotificationSlotLabel(slotKey);
  let toastMessage = isTest
    ? `Test rappel ${slotLabel} déclenché.`
    : `Rappel ${slotLabel} — c'est le moment de ton rituel !`;

  if (wasSnoozed && !isTest) {
    toastMessage = `Rappel ${slotLabel} (snooze) — c'est le moment de ton rituel !`;
  }

  showToast(toastMessage);
  playNotificationBeep();
  showSystemNotification(slotKey, { isTest, scheduledFor });
}

function handleReminderTrigger(slotKey, scheduledFor, wasSnoozed = false) {
  ensureNotificationState();

  if (!state.notifications.enabled) {
    refreshNotificationIndicators();
    return;
  }

  const slotSettings = state.notifications.slots?.[slotKey];
  if (!slotSettings || !slotSettings.enabled) {
    refreshNotificationIndicators();
    return;
  }

  const now = new Date();
  if (isDateInDnd(now)) {
    const nextAllowed = adjustDateForDnd(new Date(now.getTime() + 1000));
    if (nextAllowed) {
      scheduleNotificationForSlot(slotKey, { forcedDate: nextAllowed, ignoreSnooze: true });
    }
    refreshNotificationIndicators();
    return;
  }

  notificationRuntime.snoozes.delete(slotKey);

  const scheduledDate = scheduledFor instanceof Date && !Number.isNaN(scheduledFor.getTime())
    ? scheduledFor
    : now;

  deliverReminderFeedback(slotKey, { scheduledFor: scheduledDate, wasSnoozed });

  const nextReference = new Date(scheduledDate.getTime() + 1000);
  scheduleNotificationForSlot(slotKey, { fromDate: nextReference, ignoreSnooze: true });
}

function applyNotificationSnooze(slotKey, baseDate) {
  ensureNotificationState();

  if (!state.notifications.enabled) {
    showToast('Activez les rappels pour utiliser le snooze.');
    return false;
  }

  const slotSettings = state.notifications.slots?.[slotKey];
  if (!slotSettings || !slotSettings.enabled) {
    showToast(`Le créneau ${getNotificationSlotLabel(slotKey)} est désactivé.`);
    return false;
  }

  const reference = baseDate instanceof Date && !Number.isNaN(baseDate.getTime())
    ? baseDate
    : notificationRuntime.nextOccurrences.get(slotKey) || new Date();

  const baseTime = Math.max(Date.now(), reference.getTime());
  const snoozeDate = new Date(baseTime + NOTIFICATION_SNOOZE_MINUTES * 60000);
  const adjusted = adjustDateForDnd(snoozeDate);

  if (!adjusted) {
    showToast('Mode ne pas déranger actif : snooze indisponible.');
    return false;
  }

  notificationRuntime.snoozes.set(slotKey, adjusted);
  scheduleNotificationForSlot(slotKey, { forcedDate: adjusted });

  const formatted = formatTimeForDisplay(adjusted);
  showToast(`Rappel ${getNotificationSlotLabel(slotKey)} reporté à ${formatted}.`);
  return true;
}

function snoozeNextReminder() {
  const upcoming = getNextScheduledReminder();
  if (!upcoming) {
    return false;
  }
  return applyNotificationSnooze(upcoming.slot, upcoming.date);
}

function formatICSDateTimeUTC(date) {
  const utc = new Date(date.getTime());
  return `${utc.getUTCFullYear()}${String(utc.getUTCMonth() + 1).padStart(2, '0')}${String(utc.getUTCDate()).padStart(2, '0')}T${String(utc.getUTCHours()).padStart(2, '0')}${String(utc.getUTCMinutes()).padStart(2, '0')}${String(utc.getUTCSeconds()).padStart(2, '0')}Z`;
}

function formatICSDateTimeLocal(date) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}00`;
}

function generateNotificationsICS() {
  ensureNotificationState();

  if (!state.notifications.enabled) {
    return null;
  }

  const activeSlots = Object.keys(NOTIFICATION_SLOT_DETAILS).filter(slotKey => state.notifications.slots?.[slotKey]?.enabled);
  if (!activeSlots.length) {
    return null;
  }

  const timezone = state.notifications.timezone || getLocalTimezone();
  const now = new Date();
  const dtstamp = formatICSDateTimeUTC(now);

  const events = activeSlots.map(slotKey => {
    const timeStr = normalizeTimeString(state.notifications.slots[slotKey].time, NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime);
    const [hoursStr, minutesStr] = timeStr.split(':');
    const start = new Date(now.getTime());
    start.setSeconds(0, 0);
    start.setHours(Number.parseInt(hoursStr, 10) || 0, Number.parseInt(minutesStr, 10) || 0, 0, 0);
    if (start.getTime() <= now.getTime()) {
      start.setDate(start.getDate() + 1);
    }
    const end = new Date(start.getTime() + 10 * 60000);
    const uid = `zeyne-${slotKey}-${start.getTime()}@zeyne`;
    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `SUMMARY:ZEYNE - Rappel ${getNotificationSlotLabel(slotKey)}`,
      `DTSTART;TZID=${timezone}:${formatICSDateTimeLocal(start)}`,
      `DTEND;TZID=${timezone}:${formatICSDateTimeLocal(end)}`,
      'RRULE:FREQ=DAILY',
      'END:VEVENT'
    ].join('\n');
  });

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ZEYNE//Notifications//FR
${events.join('\n')}
END:VCALENDAR`;
}

function downloadNotificationsICS() {
  const icsContent = generateNotificationsICS();
  if (!icsContent) {
    showToast('Aucun créneau actif à exporter.');
    return;
  }

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'zeyne-rappels.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('Fichier calendrier généré ✅');
}

function isPWAInstalled() {
  const standaloneQuery = window.matchMedia ? window.matchMedia('(display-mode: standalone)') : null;
  const isStandaloneMatch = !!(standaloneQuery && standaloneQuery.matches);
  return isStandaloneMatch || window.navigator.standalone === true;
}

function isIOSDevice() {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

function updatePWAInstallUI() {
  const installBtn = document.getElementById('pwa-install-btn');
  if (!installBtn) return;

  const iosHelpLink = document.getElementById('pwa-ios-help-link');
  const iosHelp = document.getElementById('pwa-ios-help');
  const isInstalled = isPWAInstalled();
  const isIOS = isIOSDevice();
  const canPromptInstall = !!pwaInstallRuntime.deferredPrompt;

  const setButtonState = (label, disabled) => {
    installBtn.textContent = label;
    installBtn.disabled = disabled;
    installBtn.setAttribute('aria-disabled', String(disabled));
  };

  if (iosHelpLink) {
    if (!isIOS || isInstalled) {
      iosHelpLink.hidden = true;
      iosHelpLink.setAttribute('aria-expanded', 'false');
      if (iosHelp) {
        iosHelp.hidden = true;
      }
    } else {
      iosHelpLink.hidden = false;
      iosHelpLink.setAttribute('aria-expanded', String(!iosHelp?.hidden));
    }
  }

  if (isInstalled) {
    setButtonState('Déjà installée', true);
    return;
  }

  if (isIOS) {
    setButtonState('Non pris en charge', true);
    return;
  }

  if (canPromptInstall) {
    setButtonState('Installer ZEYNE', false);
    return;
  }

  setButtonState('Installer ZEYNE', true);
}

function initPWAInstallPrompt() {
  const installBtn = document.getElementById('pwa-install-btn');
  if (!installBtn) return;

  const iosHelpLink = document.getElementById('pwa-ios-help-link');
  const iosHelp = document.getElementById('pwa-ios-help');
  const iosHelpClose = document.getElementById('pwa-ios-help-close');

  const toggleIOSHelp = (show) => {
    if (!iosHelp || !iosHelpLink) return;
    iosHelp.hidden = !show;
    iosHelpLink.setAttribute('aria-expanded', String(show));
    if (show) {
      iosHelp.setAttribute('role', 'region');
      iosHelp.setAttribute('aria-label', "Aide d'installation iOS");
      iosHelp.focus?.();
    }
  };

  if (!pwaInstallRuntime.initialized) {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      pwaInstallRuntime.deferredPrompt = event;
      updatePWAInstallUI();
    });

    window.addEventListener('appinstalled', () => {
      pwaInstallRuntime.deferredPrompt = null;
      updatePWAInstallUI();
    });

    if (window.matchMedia) {
      pwaInstallRuntime.displayModeQuery = window.matchMedia('(display-mode: standalone)');
      const listener = () => updatePWAInstallUI();
      if (pwaInstallRuntime.displayModeQuery.addEventListener) {
        pwaInstallRuntime.displayModeQuery.addEventListener('change', listener);
      } else if (pwaInstallRuntime.displayModeQuery.addListener) {
        pwaInstallRuntime.displayModeQuery.addListener(listener);
      }
    }

    window.addEventListener('focus', () => updatePWAInstallUI());
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        updatePWAInstallUI();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && iosHelp && !iosHelp.hidden) {
        toggleIOSHelp(false);
      }
    });

    pwaInstallRuntime.initialized = true;
  }

  if (!installBtn.dataset.installBound) {
    installBtn.addEventListener('click', async () => {
      if (installBtn.disabled || !pwaInstallRuntime.deferredPrompt) {
        return;
      }
      const promptEvent = pwaInstallRuntime.deferredPrompt;
      promptEvent.prompt();
      const choice = await promptEvent.userChoice.catch(() => null);
      if (choice && choice.outcome === 'accepted') {
        pwaInstallRuntime.deferredPrompt = null;
      }
      updatePWAInstallUI();
    });
    installBtn.dataset.installBound = 'true';
  }

  if (iosHelpLink && !iosHelpLink.dataset.installBound) {
    iosHelpLink.addEventListener('click', () => {
      toggleIOSHelp(!(iosHelp && !iosHelp.hidden));
    });
    iosHelpLink.dataset.installBound = 'true';
  }

  if (iosHelpClose && !iosHelpClose.dataset.installBound) {
    iosHelpClose.addEventListener('click', () => {
      toggleIOSHelp(false);
      iosHelpLink?.focus();
    });
    iosHelpClose.dataset.installBound = 'true';
  }

  updatePWAInstallUI();
}

function startUpcomingReminderTicker() {
  if (upcomingReminderIntervalId) {
    clearInterval(upcomingReminderIntervalId);
  }
  upcomingReminderIntervalId = window.setInterval(() => {
    updateUpcomingReminderBanner();
  }, 30000);
}

function updateNotificationsForm() {
  ensureNotificationState();
  ensureFocusAdaptiveState();

  const timezoneEl = document.getElementById('notifications-timezone');
  if (timezoneEl) {
    timezoneEl.textContent = state.notifications.timezone || getLocalTimezone();
  }

  const adaptiveToggle = document.getElementById('adaptive-difficulty-toggle');
  if (adaptiveToggle) {
    adaptiveToggle.checked = state.focusAdaptive.enabled !== false;
  }

  const masterToggle = document.getElementById('notifications-enabled-toggle');
  if (masterToggle) {
    masterToggle.checked = !!state.notifications.enabled;
  }

  Object.keys(NOTIFICATION_SLOT_DETAILS).forEach(slotKey => {
    const slotSettings = state.notifications.slots?.[slotKey] || { enabled: true, time: NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime };
    const toggle = document.getElementById(`notifications-slot-${slotKey}-enabled`);
    const timeInput = document.getElementById(`notifications-slot-${slotKey}-time`);
    if (toggle) {
      toggle.checked = !!(slotSettings.enabled && state.notifications.enabled);
      toggle.disabled = !state.notifications.enabled;
    }
    if (timeInput) {
      timeInput.value = slotSettings.time || NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime;
      timeInput.disabled = !state.notifications.enabled || !slotSettings.enabled;
    }
  });

  const dndToggle = document.getElementById('notifications-dnd-enabled');
  if (dndToggle) {
    dndToggle.checked = !!state.notifications.dnd?.enabled;
    dndToggle.disabled = !state.notifications.enabled;
  }

  const dndStartInput = document.getElementById('notifications-dnd-start');
  const dndEndInput = document.getElementById('notifications-dnd-end');
  if (dndStartInput) {
    dndStartInput.value = state.notifications.dnd?.start || '22:00';
    dndStartInput.disabled = !state.notifications.enabled || !state.notifications.dnd?.enabled;
  }
  if (dndEndInput) {
    dndEndInput.value = state.notifications.dnd?.end || '07:00';
    dndEndInput.disabled = !state.notifications.enabled || !state.notifications.dnd?.enabled;
  }

  const soundToggle = document.getElementById('notifications-sound-beep');
  if (soundToggle) {
    soundToggle.checked = state.notifications.sound?.beep !== false;
    soundToggle.disabled = !state.notifications.enabled;
  }

  const snoozeBtn = document.getElementById('notifications-snooze-btn');
  if (snoozeBtn) {
    snoozeBtn.disabled = !state.notifications.enabled;
  }

  const testBtn = document.getElementById('notifications-test-btn');
  if (testBtn) {
    testBtn.disabled = !state.notifications.enabled;
  }

  const bannerSnoozeBtn = document.getElementById('next-reminder-snooze-btn');
  if (bannerSnoozeBtn) {
    bannerSnoozeBtn.disabled = !state.notifications.enabled;
  }

  refreshNotificationIndicators();
}

function refreshNotificationPermissionState() {
  updateNotificationsStatus();
}

function handleNotificationPermissionRequest() {
  if (!('Notification' in window)) {
    showToast('Notifications non supportées sur ce navigateur.');
    return;
  }
  Notification.requestPermission()
    .finally(() => {
      refreshNotificationPermissionState();
    });
}

function handleNotificationTest() {
  ensureNotificationState();
  if (!state.notifications.enabled) {
    showToast('Activez les rappels pour tester les notifications.');
    return;
  }
  const upcoming = getNextScheduledReminder();
  const slotKey = upcoming?.slot || 'morning';
  deliverReminderFeedback(slotKey, { isTest: true });
}

function initNotificationsModule() {
  ensureNotificationState();

  initPWAInstallPrompt();

  if (notificationsInitialized) {
    updateNotificationsForm();
    scheduleAllNotifications();
    refreshNotificationPermissionState();
    return;
  }

  notificationsInitialized = true;

  const adaptiveToggle = document.getElementById('adaptive-difficulty-toggle');
  if (adaptiveToggle) {
    adaptiveToggle.addEventListener('change', () => {
      ensureFocusAdaptiveState();
      state.focusAdaptive.enabled = adaptiveToggle.checked;
      saveState();
      renderDailyTasks();
    });
  }

  const masterToggle = document.getElementById('notifications-enabled-toggle');
  if (masterToggle) {
    masterToggle.addEventListener('change', () => {
      ensureNotificationState();
      state.notifications.enabled = masterToggle.checked;
      saveState();
      updateNotificationsForm();
      scheduleAllNotifications({ ignoreSnooze: true });
    });
  }

  Object.keys(NOTIFICATION_SLOT_DETAILS).forEach(slotKey => {
    const toggle = document.getElementById(`notifications-slot-${slotKey}-enabled`);
    const timeInput = document.getElementById(`notifications-slot-${slotKey}-time`);

    if (toggle) {
      toggle.addEventListener('change', () => {
        ensureNotificationState();
        if (!state.notifications.slots[slotKey]) {
          state.notifications.slots[slotKey] = { enabled: true, time: NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime };
        }
        state.notifications.slots[slotKey].enabled = toggle.checked;
        if (!toggle.checked) {
          notificationRuntime.snoozes.delete(slotKey);
        }
        saveState();
        updateNotificationsForm();
        scheduleNotificationForSlot(slotKey, { ignoreSnooze: !toggle.checked });
      });
    }

    if (timeInput) {
      timeInput.addEventListener('change', () => {
        ensureNotificationState();
        if (!state.notifications.slots[slotKey]) {
          state.notifications.slots[slotKey] = { enabled: true, time: NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime };
        }
        const normalized = normalizeTimeString(timeInput.value, state.notifications.slots[slotKey].time);
        state.notifications.slots[slotKey].time = normalized;
        timeInput.value = normalized;
        notificationRuntime.snoozes.delete(slotKey);
        saveState();
        scheduleNotificationForSlot(slotKey, { ignoreSnooze: true, fromDate: new Date() });
        updateNotificationsForm();
      });
    }
  });

  const dndToggle = document.getElementById('notifications-dnd-enabled');
  if (dndToggle) {
    dndToggle.addEventListener('change', () => {
      ensureNotificationState();
      state.notifications.dnd.enabled = dndToggle.checked;
      saveState();
      updateNotificationsForm();
      scheduleAllNotifications({ ignoreSnooze: true });
    });
  }

  const dndStartInput = document.getElementById('notifications-dnd-start');
  if (dndStartInput) {
    dndStartInput.addEventListener('change', () => {
      ensureNotificationState();
      state.notifications.dnd.start = normalizeTimeString(dndStartInput.value, state.notifications.dnd.start);
      dndStartInput.value = state.notifications.dnd.start;
      saveState();
      scheduleAllNotifications({ ignoreSnooze: true });
      updateNotificationsForm();
    });
  }

  const dndEndInput = document.getElementById('notifications-dnd-end');
  if (dndEndInput) {
    dndEndInput.addEventListener('change', () => {
      ensureNotificationState();
      state.notifications.dnd.end = normalizeTimeString(dndEndInput.value, state.notifications.dnd.end);
      dndEndInput.value = state.notifications.dnd.end;
      saveState();
      scheduleAllNotifications({ ignoreSnooze: true });
      updateNotificationsForm();
    });
  }

  const soundToggle = document.getElementById('notifications-sound-beep');
  if (soundToggle) {
    soundToggle.addEventListener('change', () => {
      ensureNotificationState();
      state.notifications.sound.beep = soundToggle.checked;
      saveState();
      updateNotificationsForm();
    });
  }

  const snoozeBtn = document.getElementById('notifications-snooze-btn');
  if (snoozeBtn) {
    snoozeBtn.addEventListener('click', () => {
      if (!snoozeNextReminder()) {
        showToast('Aucun rappel à décaler pour le moment.');
      }
    });
  }

  const testBtn = document.getElementById('notifications-test-btn');
  if (testBtn) {
    testBtn.addEventListener('click', () => handleNotificationTest());
  }

  const permissionBtn = document.getElementById('enable-notifications-btn');
  if (permissionBtn) {
    permissionBtn.addEventListener('click', () => handleNotificationPermissionRequest());
  }

  const icsBtn = document.getElementById('notifications-ics-btn');
  if (icsBtn) {
    icsBtn.addEventListener('click', () => downloadNotificationsICS());
  }

  const bannerSnoozeBtn = document.getElementById('next-reminder-snooze-btn');
  if (bannerSnoozeBtn) {
    bannerSnoozeBtn.addEventListener('click', () => {
      if (!snoozeNextReminder()) {
        showToast('Aucun rappel imminent à snoozer.');
      }
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      const { data } = event;
      if (data && data.type === 'NOTIFICATION_SNOOZE') {
        const slotKey = data.slot || getNextScheduledReminder()?.slot;
        if (slotKey) {
          const targetDate = notificationRuntime.nextOccurrences.get(slotKey) || new Date();
          applyNotificationSnooze(slotKey, targetDate);
        }
      }
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      scheduleAllNotifications();
      refreshNotificationPermissionState();
    }
    refreshNotificationIndicators();
  });

  window.addEventListener('focus', () => {
    refreshNotificationPermissionState();
    refreshNotificationIndicators();
  });

  updateNotificationsForm();
  scheduleAllNotifications();
  startUpcomingReminderTicker();
  refreshNotificationPermissionState();
}

function checkAllTasksDone() {
  const today = getToday();
  if (!state.tasks[today]) return;

  const allDone = state.tasks[today].every(t => t.status === 'done');
  const messageEl = document.getElementById('encouragement-message');

  if (allDone) {
    const date = new Date();
    const messageIdx = date.getDate() % ENCOURAGEMENT_MESSAGES.length;
    messageEl.textContent = ENCOURAGEMENT_MESSAGES[messageIdx];
    messageEl.classList.add('show');
    launchConfetti();
  } else {
    messageEl.classList.remove('show');
  }
}

function startQuickFocus(taskIdx) {
  const today = getToday();
  ensureTasksForDate(today);
  const task = state.tasks[today][taskIdx];
  if (!task || isTaskEmpty(task) || task.status === 'done') {
    return;
  }

  showTimerModal(taskIdx, { initialDurationSeconds: 10 * 60, autoStart: true });
}

window.startQuickFocus = startQuickFocus;

window.startTask = async function(taskIdx) {
  const today = getToday();
  ensureTasksForDate(today);
  const task = state.tasks[today][taskIdx];
  if (!task) return;

  const audioId = resolveAudioIdForTask(task);
  if (audioId) {
    await openAudioRitualModal(audioId, task).catch(() => true);
  }
  showTimerModal(taskIdx);
};

window.toggleTaskCompletion = function(taskIdx) {
  const today = getToday();
  ensureTasksForDate(today);
  const tasksForToday = state.tasks[today];
  const task = tasksForToday[taskIdx];
  if (!task) return;

  const wasComplete = tasksForToday.every(t => t.status === 'done');

  task.status = task.status === 'done' ? 'planned' : 'done';
  const toggledToDone = task.status === 'done';
  const nowISO = new Date().toISOString();
  const nowMs = Date.now();
  const previousStatusChangedAt = typeof task.statusChangedAt === 'string' ? Date.parse(task.statusChangedAt) : null;

  if (toggledToDone) {
    recordFocusOutcomeForTask(today, task, 'done');
    recordMomentExecutionEvent(today, task, 'success');
    const startedAt = typeof task.lastStartedAt === 'string' ? Date.parse(task.lastStartedAt) : null;
    let latencySec = null;
    if (Number.isFinite(startedAt)) {
      latencySec = Math.max(0, Math.round((nowMs - startedAt) / 1000));
    } else if (Number.isFinite(previousStatusChangedAt)) {
      latencySec = Math.max(0, Math.round((nowMs - previousStatusChangedAt) / 1000));
    }
    task.lastCompletionLatencySec = latencySec;
    task.completedAt = nowISO;
    task.statusChangedAt = nowISO;
  } else {
    clearFocusOutcomeForTask(today, task);
    removeMomentExecutionEvent(today, task, 'success');
    task.completedAt = null;
    task.lastCompletionLatencySec = null;
    task.statusChangedAt = nowISO;
  }

  const isNowComplete = tasksForToday.every(t => t.status === 'done');
  const streakResult = updateDayCompletionRecord(today, isNowComplete);
  let newlyUnlockedBadge = null;
  if (isNowComplete) {
    newlyUnlockedBadge = unlockBadgesForCurrentStreak(state.streak.current);
  }

  if (toggledToDone) {
    registerMicropasCompletion(task);
  }

  updateChallengeProgress({ reason: 'task', referenceDate: today });

  saveState();
  renderDailyTasks();
  updateMomentum();
  renderStreakSummary();
  renderChallengeCard();
  refreshWeeklyReviewIfVisible();

  if (!wasComplete && isNowComplete) {
    handleDailyCompletionFeedback(streakResult?.current || state.streak.current || 0, newlyUnlockedBadge);
  }
};

async function postponeTaskByOneDay(dateStr, taskIdx) {
  if (!dateStr) {
    return;
  }

  ensureTasksForDate(dateStr);
  const tasksForDate = state.tasks[dateStr];
  if (!Array.isArray(tasksForDate)) {
    return;
  }

  const task = tasksForDate[taskIdx];
  if (!task || isTaskEmpty(task) || task.status === 'done') {
    return;
  }

  const sourceDate = parseISODate(dateStr);
  if (!sourceDate) {
    showToast('Date invalide.');
    return;
  }

  const targetDate = new Date(sourceDate);
  targetDate.setDate(targetDate.getDate() + 1);
  targetDate.setHours(0, 0, 0, 0);
  const targetDateStr = targetDate.toISOString().split('T')[0];

  const deadlineISO = state.settings.deadlineISO;
  if (deadlineISO) {
    const deadlineDate = parseISODate(deadlineISO);
    if (deadlineDate && targetDate > deadlineDate) {
      const confirmed = await showConfirmationToast('Au-delà de la date butoir — continuer ?', {
        confirmLabel: 'Oui',
        cancelLabel: 'Annuler'
      });
      if (!confirmed) {
        return;
      }
    }
  }

  ensureTasksForDate(targetDateStr);
  const targetTasks = state.tasks[targetDateStr];
  if (targetTasks[taskIdx] && !isTaskEmpty(targetTasks[taskIdx])) {
    showToast('Créneau déjà occupé demain.');
    return;
  }

  const movedTask = cloneTask(task);
  movedTask.status = 'planned';
  targetTasks[taskIdx] = movedTask;
  tasksForDate[taskIdx] = createEmptyTask();

  recordFocusOutcomeForTask(dateStr, task, 'reported');
  recordMomentExecutionEvent(dateStr, task, 'defer');
  saveState();
  renderDailyTasks();
  renderOtherDays();
  updateMomentum();
  refreshWeeklyReviewIfVisible();
  showToast('Tâche reportée à demain.');
}

window.reportTask = function(dateStr, taskIdx) {
  showReportModal(dateStr, taskIdx);
};

function openAudioRitualModal(audioId, task) {
  stopPreviewAudio();
  stopModalAudio();

  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return Promise.resolve(true);

  const entry = getAudioEntryById(audioId);
  const resolvedInfo = task ? getResolvedAudioForTask(task) : null;

  return new Promise(resolve => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      stopModalAudio();
      closeModal();
      resolve(true);
    };

    const skipWithMessage = () => {
      if (finished) return;
      showToast('Aucun audio');
      finish();
    };

    if (!entry) {
      skipWithMessage();
      return;
    }

    resolveAudioSource(entry)
      .then(source => {
        if (finished) {
          if (source.revoke) source.revoke();
          return;
        }

        const metaParts = [getAudioCategoryLabel(entry.category)];
        if (entry.duration) {
          metaParts.push(formatAudioDuration(entry.duration));
        }
        const assignmentLine = resolvedInfo?.isDefault
          ? `<p class="audio-meta">Assignation ${resolvedInfo.slot.toLowerCase()}</p>`
          : '';

        content.innerHTML = `
          <div class="ritual-content audio-ritual-modal">
            <h3>${entry.title}</h3>
            <p class="audio-meta">${metaParts.filter(Boolean).join(' • ')}</p>
            ${assignmentLine}
            <div class="audio-ritual-controls">
              <button class="btn btn-secondary" id="modal-audio-toggle">Lecture</button>
              <button class="btn btn-primary" id="modal-audio-continue">Commencer</button>
            </div>
          </div>
        `;

        modal.classList.add('show');

        const toggleBtn = document.getElementById('modal-audio-toggle');
        const continueBtn = document.getElementById('modal-audio-continue');

        const audio = new Audio(source.url);
        modalAudioState = { audio, revoke: source.revoke };

        audio.onerror = () => {
          skipWithMessage();
        };

        if (toggleBtn) {
          toggleBtn.onclick = async () => {
            try {
              if (audio.paused) {
                await audio.play();
                toggleBtn.textContent = 'Pause';
              } else {
                audio.pause();
                audio.currentTime = 0;
                toggleBtn.textContent = 'Lecture';
              }
            } catch (err) {
              showToast('Lecture impossible : interaction requise ou format non supporté.');
            }
          };
        }

        audio.onended = () => {
          if (toggleBtn) toggleBtn.textContent = 'Lecture';
          audio.currentTime = 0;
        };

        audio.onpause = () => {
          if (toggleBtn) toggleBtn.textContent = 'Lecture';
        };

        if (continueBtn) {
          continueBtn.onclick = finish;
        }
      })
      .catch(() => {
        skipWithMessage();
      });
  });
}

function showTimerModal(taskIdx, options = {}) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  const today = getToday();
  ensureTasksForDate(today);
  const task = state.tasks[today]?.[taskIdx] || null;

  const initialDuration = Number(options.initialDurationSeconds);
  const autoStart = Boolean(options.autoStart);

  let timerSeconds = 0;
  let timerInterval = null;
  let timerRunning = false;
  let startEventRecorded = false;
  let sessionStarted = false;
  let sessionMetadataRecorded = false;
  let totalDuration = Number.isFinite(initialDuration) ? initialDuration : 25 * 60;
  if (totalDuration < 60) {
    totalDuration = 60;
  }

  function formatTimer(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.max(0, seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  const initialDisplay = formatTimer(totalDuration);

  content.innerHTML = `
    <h3>Minuteur</h3>
    <div class="cloud-timer" id="cloud-timer">
      <div class="timer-progress" id="timer-progress"></div>
      <div class="timer-content">
        <div class="timer-controls">
          <button class="btn btn-secondary" onclick="adjustTimer(-5)">− 5 min</button>
          <button class="btn btn-secondary" onclick="adjustTimer(5)">+ 5 min</button>
        </div>
        <div class="timer-display" id="timer-display">${initialDisplay}</div>
        <div class="timer-buttons">
          <button class="btn btn-primary" id="timer-start-btn">Démarrer</button>
          <button class="btn btn-secondary" id="timer-finish-btn">Finir</button>
        </div>
        <div class="micro-review">
          <textarea placeholder="Micro-review (optionnel)" id="micro-review-input"></textarea>
        </div>
      </div>
    </div>
  `;

  modal.dataset.activeModal = 'timer';
  focusSessionRuntime.activeTimer = false;
  modal.classList.add('show');

  const startBtn = document.getElementById('timer-start-btn');
  const finishBtn = document.getElementById('timer-finish-btn');
  const display = document.getElementById('timer-display');
  const cloud = document.getElementById('cloud-timer');
  const progress = document.getElementById('timer-progress');

  function updateTimerDisplay() {
    const remaining = Math.max(0, totalDuration - timerSeconds);
    display.textContent = formatTimer(remaining);
  }

  window.adjustTimer = (minutes) => {
    if (!timerRunning) {
      totalDuration += minutes * 60;
      if (totalDuration < 60) totalDuration = 60;
      updateTimerDisplay();
    }
  };

  function pauseTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    timerRunning = false;
    startBtn.textContent = 'Démarrer';
    cloud.classList.remove('pulsing');
    focusSessionRuntime.activeTimer = false;
    updateTimerDisplay();
  }

  function finalizeSession(autoComplete = false) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    timerRunning = false;
    focusSessionRuntime.activeTimer = false;
    startBtn.textContent = 'Démarrer';
    cloud.classList.remove('pulsing');

    let recorded = false;
    const elapsed = Math.max(0, Math.min(timerSeconds, totalDuration));
    if (sessionStarted && task && elapsed >= 60) {
      recorded = registerFocusSessionForTask(task, elapsed);
    }
    timerSeconds = elapsed;
    updateTimerDisplay();
    progress.style.borderColor = 'rgba(255, 255, 255, 1)';

    sessionStarted = false;
    sessionMetadataRecorded = false;

    return { recordedSession: recorded, elapsedSeconds: elapsed, autoComplete };
  }

  function startTimer() {
    if (timerRunning) return;
    if (timerInterval) clearInterval(timerInterval);
    if (!sessionStarted) {
      sessionStarted = true;
      timerSeconds = 0;
    }
    let shouldSave = false;
    if (!sessionMetadataRecorded && task) {
      const startedISO = new Date().toISOString();
      task.lastStartedAt = startedISO;
      task.statusChangedAt = startedISO;
      sessionMetadataRecorded = true;
      shouldSave = true;
    }
    if (!startEventRecorded && task) {
      if (recordMomentExecutionEvent(today, task, 'start')) {
        shouldSave = true;
      }
      startEventRecorded = true;
    }
    if (shouldSave) {
      saveState();
    }
    timerRunning = true;
    focusSessionRuntime.activeTimer = true;
    startBtn.textContent = 'Pause';
    cloud.classList.add('pulsing');
    updateTimerDisplay();
    progress.style.borderColor = 'rgba(255, 255, 255, 0)';

    timerInterval = setInterval(() => {
      timerSeconds++;
      const remaining = Math.max(0, totalDuration - timerSeconds);
      if (remaining <= 0) {
        const result = finalizeSession(true);
        if (result.recordedSession) {
          saveState();
          updateChallengeProgress({ reason: 'focus', referenceDate: today });
          renderChallengeCard();
        }
        alert('Temps écoulé !');
        return;
      }

      display.textContent = formatTimer(remaining);
      const progressPercent = Math.min((timerSeconds / totalDuration) * 100, 100);
      progress.style.borderColor = `rgba(255, 255, 255, ${progressPercent / 100})`;
    }, 1000);
  }

  startBtn.onclick = () => {
    if (timerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  finishBtn.onclick = () => {
    const result = finalizeSession(false);
    let shouldSave = result.recordedSession;
    const reviewValue = document.getElementById('micro-review-input')?.value?.trim();
    if (reviewValue) {
      const today = getToday();
      if (!Array.isArray(state.microReviews[today])) {
        state.microReviews[today] = [];
      }
      state.microReviews[today].push({
        text: reviewValue,
        recordedAt: new Date().toISOString()
      });
      shouldSave = true;
      refreshWeeklyReviewIfVisible();
    }
    if (result.recordedSession) {
      updateChallengeProgress({ reason: 'focus', referenceDate: today });
      renderChallengeCard();
    }
    if (shouldSave) {
      saveState();
    }
    closeModal();
  };

  updateTimerDisplay();

  if (autoStart) {
    requestAnimationFrame(() => {
      startTimer();
    });
  }
}

function showReportModal(dateStr, taskIdx, options = {}) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  ensureTasksForDate(dateStr);
  const tasksForDate = state.tasks[dateStr];
  if (!Array.isArray(tasksForDate)) return;

  const task = tasksForDate[taskIdx];
  if (!task || isTaskEmpty(task) || task.status === 'done') {
    return;
  }

  const reasons = [
    { value: 'trop_gros', label: 'Trop gros' },
    { value: 'pas_clair', label: 'Pas clair' },
    { value: 'pas_le_temps', label: 'Pas le temps' },
    { value: 'faible_energie', label: 'Faible énergie' }
  ];

  const groupKey = getTaskSuggestionGroupKey(task, dateStr);
  const dominant = groupKey && !isSuggestionSuppressed(groupKey)
    ? getDominantReasonForTask(task, dateStr, { windowDays: 14, minOccurrences: 2 })
    : null;
  const recommendedReason = dominant?.reason || null;

  const providedReason = options?.reason;
  const defaultReason = (providedReason && MICROPAS_SUGGESTIONS[providedReason])
    ? providedReason
    : (recommendedReason || reasons[0].value);

  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0);
  const nextDayStr = nextDay.toISOString().split('T')[0];

  modal.dataset.activeModal = 'report';
  content.innerHTML = `
    <div class="reporter-form">
      <h3>Reporter la tâche</h3>
      <div class="form-group">
        <label>Pourquoi reporter ?</label>
        <div class="radio-group" id="reason-group">
          ${reasons.map(r => `
            <div class="radio-option">
              <input type="radio" name="reason" value="${r.value}" id="reason-${r.value}">
              <label for="reason-${r.value}">${r.label}</label>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="micropas-card" id="micropas-card">
        <div class="micropas-card-header">
          <div class="micropas-card-infos">
            <span class="micropas-chip">Suggestion Micropas</span>
            <span class="micropas-card-title" id="micropas-card-title"></span>
          </div>
          <button type="button" class="btn btn-primary" id="micropas-apply-btn">Appliquer cette version</button>
        </div>
        <p class="micropas-card-desc" id="micropas-card-desc"></p>
        <label class="visually-hidden" for="micropas-note">Micropas suggéré</label>
        <textarea id="micropas-note" rows="3"></textarea>
        <div class="micropas-option" id="micropas-option-container">
          <label><input type="checkbox" id="micropas-soft-reschedule" checked> Décaler au prochain créneau disponible aujourd’hui</label>
        </div>
      </div>
      <div class="form-group">
        <label for="report-date-input">Reporter à</label>
        <input type="date" id="report-date-input" value="${nextDayStr}">
        <input type="hidden" id="report-target-slot" value="">
      </div>
      <div class="modal-buttons">
        <button class="btn btn-secondary" id="cancel-report-btn" type="button">Annuler</button>
        <button class="btn btn-primary" id="save-report-btn" type="button">Enregistrer</button>
      </div>
    </div>
  `;

  modal.classList.add('show');

  const reasonInputs = Array.from(content.querySelectorAll('input[name="reason"]'));
  const micropasCard = content.querySelector('#micropas-card');
  const micropasTitleEl = content.querySelector('#micropas-card-title');
  const micropasDescEl = content.querySelector('#micropas-card-desc');
  const micropasNoteEl = content.querySelector('#micropas-note');
  const micropasApplyBtn = content.querySelector('#micropas-apply-btn');
  const softRescheduleContainer = content.querySelector('#micropas-option-container');
  const softRescheduleInput = content.querySelector('#micropas-soft-reschedule');
  const reportDateInput = content.querySelector('#report-date-input');
  const reportTargetSlotInput = content.querySelector('#report-target-slot');
  const cancelBtn = content.querySelector('#cancel-report-btn');
  const saveBtn = content.querySelector('#save-report-btn');

  const context = {
    dateStr,
    taskIdx,
    groupKey,
    recommendedReason,
    appliedReasons: new Set(),
    taskRef: task,
    selectedReason: defaultReason
  };
  currentReportModalContext = context;

  function updateMicropasCard(reason) {
    const details = getMicropasSuggestionDetails(reason, task);
    if (!details) {
      micropasCard.setAttribute('hidden', '');
      return;
    }
    micropasCard.removeAttribute('hidden');
    micropasCard.dataset.recommended = reason === recommendedReason ? 'true' : 'false';
    if (micropasTitleEl) {
      micropasTitleEl.textContent = details.label;
    }
    if (micropasDescEl) {
      micropasDescEl.textContent = details.description || '';
    }
    if (micropasNoteEl) {
      micropasNoteEl.value = details.micropasText || '';
    }
    if (softRescheduleContainer) {
      if (details.showSoftReschedule) {
        softRescheduleContainer.removeAttribute('hidden');
        if (softRescheduleInput) {
          softRescheduleInput.checked = true;
        }
      } else {
        softRescheduleContainer.setAttribute('hidden', '');
        reportTargetSlotInput.value = '';
      }
    }
    context.selectedReason = reason;
  }

  function applyMicropas(reason) {
    const micropasValue = micropasNoteEl?.value || '';
    const result = applyMicropasSuggestion({
      reason,
      task,
      dateStr,
      taskIdx,
      micropasText: micropasValue,
      softReschedule: Boolean(softRescheduleInput?.checked)
    });
    if (!result.applied) {
      return;
    }

    if (reason === 'pas_le_temps') {
      if (softRescheduleInput && softRescheduleInput.checked && result.rescheduleTarget) {
        reportDateInput.value = result.rescheduleTarget.dateStr;
        reportTargetSlotInput.value = `${result.rescheduleTarget.slotIdx}`;
      } else {
        reportTargetSlotInput.value = '';
      }
    } else {
      reportTargetSlotInput.value = '';
    }

    context.appliedReasons.add(reason);
    saveState();
    renderDailyTasks();
    renderOtherDays();
    updateMomentum();
    refreshWeeklyReviewIfVisible();
    showToast('Suggestion appliquée.');
  }

  reasonInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) {
        updateMicropasCard(input.value);
      }
    });
    input.checked = input.value === defaultReason;
  });

  updateMicropasCard(defaultReason);

  if (micropasApplyBtn) {
    micropasApplyBtn.addEventListener('click', () => {
      const selected = context.selectedReason || defaultReason;
      applyMicropas(selected);
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const selectedReasonInput = content.querySelector('input[name="reason"]:checked');
      const reasonValue = selectedReasonInput ? selectedReasonInput.value : defaultReason;
      const newDate = reportDateInput?.value || nextDayStr;

      ensureTasksForDate(newDate);
      const targetTasks = state.tasks[newDate];

      let targetSlot = Number.parseInt(reportTargetSlotInput.value, 10);
      if (!Number.isInteger(targetSlot) || targetSlot < 0 || targetSlot > 2) {
        targetSlot = targetTasks.findIndex(t => isTaskEmpty(t));
      } else if (targetTasks[targetSlot] && !isTaskEmpty(targetTasks[targetSlot]) && !(newDate === dateStr && targetSlot === taskIdx)) {
        targetSlot = targetTasks.findIndex(t => isTaskEmpty(t));
      }

      if (targetSlot === -1) {
        showToast('Aucun créneau libre pour cette date.');
        return;
      }

      const movedTask = cloneTask(task);
      movedTask.status = 'planned';
      targetTasks[targetSlot] = movedTask;
      if (!(newDate === dateStr && targetSlot === taskIdx)) {
        state.tasks[dateStr][taskIdx] = createEmptyTask();
      }

      recordFocusOutcomeForTask(dateStr, task, 'reported');
      recordMomentExecutionEvent(dateStr, task, 'defer');
      finalizeReportModalContext({ taskForLogging: movedTask });
      recordReportForDate(newDate, reasonValue, movedTask, dateStr);
      saveState();
      closeModal();
      renderDashboard();
      refreshWeeklyReviewIfVisible();
      alert('Tâche reportée !');
    });
  }
}

function createSocialProvider() {
  if (ENABLE_SOCIAL_LIVE) {
    return createLiveSocialProvider();
  }
  return createLocalSocialProvider();
}

function createLiveSocialProvider() {
  console.warn('Mode Firestore désactivé. Configurez FIREBASE_CONFIG pour activer le live.');
  return {
    async getFriends() {
      throw new Error('Backend social non configuré.');
    },
    async invite() {
      throw new Error('Backend social non configuré.');
    },
    async accept() {
      throw new Error('Backend social non configuré.');
    },
    async acceptInvitation() {
      throw new Error('Backend social non configuré.');
    },
    async declineInvitation() {
      throw new Error('Backend social non configuré.');
    },
    async cheer() {
      throw new Error('Backend social non configuré.');
    },
    async createChallenge() {
      throw new Error('Backend social non configuré.');
    },
    async hideFriend() {
      throw new Error('Backend social non configuré.');
    },
    async removeFriend() {
      throw new Error('Backend social non configuré.');
    },
    async updatePublicStats() {
      throw new Error('Backend social non configuré.');
    }
  };
}

function createLocalSocialProvider() {
  const storageAvailable = typeof window !== 'undefined' && window.localStorage;
  let memoryState = null;

  const ensureState = () => {
    const state = loadState();
    return normalizeSocialState(state);
  };

  const loadState = () => {
    try {
      if (!storageAvailable) {
        if (!memoryState) {
          memoryState = createDefaultSocialState();
        }
        return JSON.parse(JSON.stringify(memoryState));
      }
      const raw = window.localStorage.getItem(SOCIAL_LOCAL_STORAGE_KEY);
      if (!raw) {
        return createDefaultSocialState();
      }
      const parsed = JSON.parse(raw);
      return normalizeSocialState(parsed);
    } catch (error) {
      console.warn('État social local corrompu, réinitialisation.', error);
      return createDefaultSocialState();
    }
  };

  const saveState = (state) => {
    const clone = JSON.stringify(state);
    if (!storageAvailable) {
      memoryState = JSON.parse(clone);
      return;
    }
    window.localStorage.setItem(SOCIAL_LOCAL_STORAGE_KEY, clone);
  };

  const randomNamePool = ['Jamie', 'Lina', 'Noah', 'Maya', 'Robin', 'Inès', 'Leo', 'Sami', 'Mila', 'Nora'];

  const ensureInviteList = (state) => {
    if (!Array.isArray(state.outgoingInvites)) {
      state.outgoingInvites = [];
    }
    if (!Array.isArray(state.incomingInvites)) {
      state.incomingInvites = [];
    }
  };

  const buildOverview = (state) => {
    ensureInviteList(state);
    const friends = (state.friends || [])
      .filter(friend => friend && friend.status === 'accepted' && !friend.hidden)
      .map(friend => {
        const normalizedStats = friend.sharing === false ? null : sanitizeStats(friend.publicStats);
        const challenge = evaluateChallenge(friend, normalizedStats);
        const displayName = friend.displayName || 'Ami';
        const lastActivity = normalizedStats?.lastActivityAt || friend.lastActivityAt || null;
        if (challenge && challenge.__shouldPersist) {
          friend.challenge = challenge.store;
        }
        return {
          uid: friend.uid,
          displayName,
          initials: computeInitials(displayName),
          sharing: friend.sharing !== false,
          publicStats: normalizedStats,
          lastActivityAt: lastActivity,
          lastActivityLabel: formatRelativeTimeFromNow(lastActivity),
          challenge: challenge ? challenge.view : null
        };
      });

    return {
      profile: {
        uid: state.profile.uid,
        displayName: state.profile.displayName || 'Vous',
        sharing: state.profile.sharing !== false,
        publicStats: sanitizeStats(state.profile.publicStats)
      },
      friends,
      incomingInvitations: state.incomingInvites.map(invite => ({
        id: invite.id,
        displayName: invite.displayName || 'Invité·e',
        createdAt: invite.createdAt || new Date().toISOString()
      })),
      outgoingInvites: state.outgoingInvites.slice(0, 5)
    };
  };

  const evaluateChallenge = (friend, stats) => {
    if (!friend.challenge) {
      return null;
    }
    const normalized = normalizeChallenge(friend.challenge);
    const result = { store: normalized, view: null, __shouldPersist: false };
    let progress = typeof normalized.progress === 'number' ? normalized.progress : 0;
    if (stats && typeof stats.streakDays === 'number') {
      progress = Math.min(stats.streakDays / SOCIAL_MIN_STREAK_FOR_CHALLENGE, 1);
    }
    let status = normalized.status;
    if (progress >= 1 && status !== 'success') {
      status = 'success';
      result.__shouldPersist = true;
    } else if (progress > 0 && status === 'pending') {
      status = 'in_progress';
      result.__shouldPersist = true;
    }
    result.store = { ...normalized, status, progress };
    result.view = {
      id: normalized.id,
      type: normalized.type,
      status,
      progress
    };
    return result;
  };

  const sanitizeStats = (stats) => {
    if (!stats || typeof stats !== 'object') {
      return null;
    }
    const score = Number.isFinite(stats.scoreWeek) ? Math.round(stats.scoreWeek) : 0;
    const streak = Number.isFinite(stats.streakDays) ? Math.max(0, Math.round(stats.streakDays)) : 0;
    const lastActivityAt = typeof stats.lastActivityAt === 'string' ? stats.lastActivityAt : new Date().toISOString();
    return {
      scoreWeek: Math.min(100, Math.max(0, score)),
      streakDays: streak,
      lastActivityAt
    };
  };

  const normalizeChallenge = (challenge) => {
    const allowed = ['pending', 'in_progress', 'success', 'expired'];
    const status = allowed.includes(challenge?.status) ? challenge.status : 'pending';
    const progress = typeof challenge?.progress === 'number' ? Math.min(1, Math.max(0, challenge.progress)) : 0;
    return {
      id: challenge?.id || `local-challenge-${Math.random().toString(36).slice(2, 9)}`,
      type: challenge?.type || SOCIAL_DEFAULT_CHALLENGE_TYPE,
      status,
      progress,
      createdAt: challenge?.createdAt || new Date().toISOString()
    };
  };

  const generateInviteDetails = (state) => {
    const code = `ZEYNE-AMI-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const invite = {
      code,
      createdAt: new Date().toISOString()
    };
    state.outgoingInvites.unshift(invite);
    state.outgoingInvites = state.outgoingInvites.slice(0, 5);
    const origin = typeof window !== 'undefined' && window.location ? window.location.origin : 'https://zeyne.app';
    const url = `${origin}/?code=${encodeURIComponent(code)}`;
    return { invite, details: { code, url } };
  };

  const createDemoFriend = (code) => {
    const name = randomNamePool[Math.floor(Math.random() * randomNamePool.length)];
    const suffix = code ? ` ${code.slice(-3)}` : '';
    const now = Date.now();
    const lastActivity = new Date(now - Math.floor(Math.random() * 12) * 3600000).toISOString();
    return {
      uid: `local-friend-${now}-${Math.random().toString(36).slice(2, 6)}`,
      displayName: `${name}${suffix}`,
      sharing: Math.random() > 0.3,
      publicStats: {
        scoreWeek: Math.min(100, Math.max(35, Math.round(45 + Math.random() * 45))),
        streakDays: Math.max(0, Math.round(Math.random() * 4)),
        lastActivityAt: lastActivity
      },
      status: 'accepted',
      hidden: false,
      challenge: null
    };
  };

  return {
    async getFriends() {
      const state = ensureState();
      const overview = buildOverview(state);
      saveState(state);
      return overview;
    },
    async invite() {
      const state = ensureState();
      ensureInviteList(state);
      const { invite, details } = generateInviteDetails(state);
      saveState(state);
      return { ...details, createdAt: invite.createdAt };
    },
    async accept(code) {
      const trimmed = (code || '').toString().trim().toUpperCase();
      if (!trimmed) {
        throw new Error('Code invalide.');
      }
      const state = ensureState();
      const friend = createDemoFriend(trimmed);
      state.friends.push(friend);
      saveState(state);
      return friend;
    },
    async acceptInvitation(inviteId) {
      const state = ensureState();
      ensureInviteList(state);
      const index = state.incomingInvites.findIndex(invite => invite.id === inviteId);
      if (index === -1) {
        throw new Error('Invitation introuvable.');
      }
      const invite = state.incomingInvites.splice(index, 1)[0];
      const friend = {
        uid: `local-friend-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        displayName: invite.displayName || 'Nouvel ami',
        sharing: true,
        publicStats: {
          scoreWeek: 68,
          streakDays: 1,
          lastActivityAt: new Date().toISOString()
        },
        status: 'accepted',
        hidden: false,
        challenge: null
      };
      state.friends.push(friend);
      saveState(state);
      return friend;
    },
    async declineInvitation(inviteId) {
      const state = ensureState();
      ensureInviteList(state);
      state.incomingInvites = state.incomingInvites.filter(invite => invite.id !== inviteId);
      saveState(state);
    },
    async cheer(uid) {
      const state = ensureState();
      ensureInviteList(state);
      if (!Array.isArray(state.cheers)) {
        state.cheers = [];
      }
      state.cheers.push({ toUid: uid, createdAt: new Date().toISOString() });
      saveState(state);
    },
    async createChallenge(uid) {
      const state = ensureState();
      const friend = state.friends.find(entry => entry.uid === uid);
      if (!friend) {
        throw new Error('Profil introuvable.');
      }
      friend.challenge = {
        id: `challenge-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        type: SOCIAL_DEFAULT_CHALLENGE_TYPE,
        status: 'pending',
        progress: 0,
        createdAt: new Date().toISOString()
      };
      saveState(state);
      return friend.challenge;
    },
    async hideFriend(uid) {
      const state = ensureState();
      const friend = state.friends.find(entry => entry.uid === uid);
      if (friend) {
        friend.hidden = true;
        saveState(state);
      }
    },
    async removeFriend(uid) {
      const state = ensureState();
      state.friends = state.friends.filter(entry => entry.uid !== uid);
      saveState(state);
    },
    async updatePublicStats({ sharing }) {
      const state = ensureState();
      state.profile.sharing = sharing !== false;
      if (!state.profile.publicStats) {
        state.profile.publicStats = {
          scoreWeek: 72,
          streakDays: 5,
          lastActivityAt: new Date().toISOString()
        };
      } else {
        state.profile.publicStats.lastActivityAt = new Date().toISOString();
      }
      saveState(state);
    }
  };
}

function normalizeSocialState(state) {
  const defaults = createDefaultSocialState();
  const profileStats = state?.profile?.publicStats
    ? { ...state.profile.publicStats }
    : { ...defaults.profile.publicStats };

  const friends = Array.isArray(state?.friends)
    ? state.friends.map(friend => ({
      uid: friend?.uid || `friend-${Math.random().toString(36).slice(2, 8)}`,
      displayName: friend?.displayName || 'Ami',
      sharing: friend?.sharing !== false,
      publicStats: friend?.publicStats ? { ...friend.publicStats } : { ...defaults.profile.publicStats },
      status: friend?.status === 'pending' ? 'pending' : 'accepted',
      hidden: friend?.hidden === true,
      challenge: friend?.challenge ? { ...friend.challenge } : null
    }))
    : defaults.friends.map(friend => ({
      ...friend,
      publicStats: friend.publicStats ? { ...friend.publicStats } : null,
      challenge: friend.challenge ? { ...friend.challenge } : null
    }));

  return {
    profile: { ...defaults.profile, ...(state?.profile || {}), publicStats: profileStats },
    friends,
    incomingInvites: Array.isArray(state?.incomingInvites)
      ? state.incomingInvites.map(invite => ({ ...invite }))
      : defaults.incomingInvites.map(invite => ({ ...invite })),
    outgoingInvites: Array.isArray(state?.outgoingInvites)
      ? state.outgoingInvites.map(invite => ({ ...invite }))
      : defaults.outgoingInvites.map(invite => ({ ...invite })),
    cheers: Array.isArray(state?.cheers) ? state.cheers.map(entry => ({ ...entry })) : []
  };
}

function createDefaultSocialState() {
  const now = new Date();
  const friendActivity = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();
  return {
    profile: {
      uid: 'local-user',
      displayName: 'Vous',
      sharing: true,
      publicStats: {
        scoreWeek: 74,
        streakDays: 5,
        lastActivityAt: now.toISOString()
      }
    },
    friends: [
      {
        uid: 'friend-alex',
        displayName: 'Alex M.',
        sharing: true,
        publicStats: {
          scoreWeek: 88,
          streakDays: 2,
          lastActivityAt: friendActivity
        },
        status: 'accepted',
        hidden: false,
        challenge: null
      },
      {
        uid: 'friend-chris',
        displayName: 'Chris L.',
        sharing: false,
        publicStats: {
          scoreWeek: 66,
          streakDays: 1,
          lastActivityAt: new Date(now.getTime() - 26 * 60 * 60 * 1000).toISOString()
        },
        status: 'accepted',
        hidden: false,
        challenge: {
          id: 'challenge-demo',
          type: SOCIAL_DEFAULT_CHALLENGE_TYPE,
          status: 'in_progress',
          progress: 0.33,
          createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
        }
      }
    ],
    incomingInvites: [
      {
        id: 'invite-sami',
        displayName: 'Sami veut se connecter',
        createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString()
      }
    ],
    outgoingInvites: [],
    cheers: []
  };
}

function computeInitials(displayName) {
  if (!displayName) return '??';
  const parts = displayName.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) || '';
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
  return `${first}${last}`.toUpperCase() || displayName.charAt(0).toUpperCase();
}

function formatRelativeTimeFromNow(isoString) {
  if (!isoString) {
    return '—';
  }
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }
  const now = new Date();
  let diff = now.getTime() - date.getTime();
  if (diff < 0) {
    return "à l'instant";
  }
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return `il y a ${seconds} s`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `il y a ${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `il y a ${hours} h`;
  }
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `il y a ${days} j`;
  }
  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `il y a ${weeks} sem.`;
  }
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `il y a ${months} mois`;
  }
  const years = Math.floor(days / 365);
  return `il y a ${years} an${years > 1 ? 's' : ''}`;
}

async function refreshSocialOverview(options = {}) {
  if (!socialProvider) {
    return;
  }
  const { silent } = options;
  const wasFirstLoad = !socialOverviewCache;
  closeSocialMenu();
  const offlineCard = document.getElementById('social-offline-card');
  if (offlineCard) {
    offlineCard.hidden = true;
  }
  try {
    const overview = await socialProvider.getFriends();
    socialOverviewCache = overview;
    const toggle = document.getElementById('social-sharing-toggle');
    if (toggle && overview?.profile) {
      toggle.checked = overview.profile.sharing !== false;
    }
    renderSocialFriends(overview);
    renderSocialInvitations(overview);
    updateSocialEmptyState(overview);
    const shouldBeSilent = typeof silent === 'boolean' ? silent : wasFirstLoad;
    updateChallengeStatusFeedback(overview, { silent: shouldBeSilent });
  } catch (error) {
    console.warn('Impossible de charger la zone sociale.', error);
    if (offlineCard) {
      offlineCard.hidden = false;
    }
  }
}

function updateChallengeStatusFeedback(overview, { silent = false } = {}) {
  const visible = new Set();
  (overview?.friends || []).forEach(friend => {
    visible.add(friend.uid);
    if (!friend.challenge) {
      socialChallengeStatusCache.delete(friend.uid);
      return;
    }
    const previous = socialChallengeStatusCache.get(friend.uid);
    socialChallengeStatusCache.set(friend.uid, friend.challenge.status);
    if (!silent && friend.challenge.status === 'success' && previous !== 'success') {
      showToast(`Défi réussi avec ${friend.displayName} 🎉`);
    }
  });

  Array.from(socialChallengeStatusCache.keys()).forEach(uid => {
    if (!visible.has(uid)) {
      socialChallengeStatusCache.delete(uid);
    }
  });
}

function renderSocialFriends(overview) {
  const grid = document.getElementById('social-friends-grid');
  if (!grid) {
    return;
  }
  grid.innerHTML = '';
  (overview?.friends || []).forEach(friend => {
    const card = document.createElement('article');
    card.className = 'social-friend-card';
    card.dataset.uid = friend.uid;

    const header = document.createElement('div');
    header.className = 'social-friend-header';

    const avatar = document.createElement('div');
    avatar.className = 'social-friend-avatar';
    avatar.textContent = friend.initials;

    const info = document.createElement('div');
    info.className = 'social-friend-info';
    const nameEl = document.createElement('span');
    nameEl.className = 'social-friend-name';
    nameEl.textContent = friend.displayName;
    const meta = document.createElement('span');
    meta.className = 'social-friend-meta';
    meta.textContent = friend.sharing === false ? 'Stats masquées' : 'Stats partagées';
    info.appendChild(nameEl);
    info.appendChild(meta);

    const menuWrapper = document.createElement('div');
    menuWrapper.className = 'social-friend-menu';

    const menuTrigger = document.createElement('button');
    menuTrigger.type = 'button';
    menuTrigger.className = 'social-menu-trigger';
    menuTrigger.setAttribute('aria-haspopup', 'true');
    menuTrigger.setAttribute('aria-expanded', 'false');
    menuTrigger.dataset.action = 'menu-toggle';
    menuTrigger.dataset.uid = friend.uid;
    menuTrigger.textContent = '⋯';
    menuTrigger.setAttribute('aria-label', `Actions pour ${friend.displayName}`);

    const menu = document.createElement('div');
    menu.className = 'social-menu';
    menu.innerHTML = `
      <button type="button" data-action="challenge" data-uid="${friend.uid}">Proposer un défi</button>
      <button type="button" data-action="hide" data-uid="${friend.uid}">Masquer</button>
      <button type="button" data-action="remove" data-uid="${friend.uid}">Supprimer</button>
    `;

    menuWrapper.appendChild(menuTrigger);
    menuWrapper.appendChild(menu);

    header.appendChild(avatar);
    header.appendChild(info);
    header.appendChild(menuWrapper);

    card.appendChild(header);

    if (friend.publicStats) {
      const stats = document.createElement('div');
      stats.className = 'social-friend-stats';

      const score = document.createElement('div');
      score.className = 'social-friend-stat';
      score.innerHTML = `<span>Score semaine</span><strong>${friend.publicStats.scoreWeek}%</strong>`;

      const streak = document.createElement('div');
      streak.className = 'social-friend-stat';
      streak.innerHTML = `<span>Streak</span><strong>${formatDayCount(friend.publicStats.streakDays)}</strong>`;

      const lastActivity = document.createElement('div');
      lastActivity.className = 'social-friend-stat';
      lastActivity.innerHTML = `<span>Dernière activité</span><strong>${friend.lastActivityLabel || '—'}</strong>`;

      stats.appendChild(score);
      stats.appendChild(streak);
      stats.appendChild(lastActivity);
      card.appendChild(stats);
    } else {
      const warning = document.createElement('p');
      warning.className = 'social-friend-meta';
      warning.textContent = `${friend.displayName} garde ses stats privées.`;
      card.appendChild(warning);
    }

    if (friend.challenge) {
      const challengeCard = document.createElement('div');
      challengeCard.className = 'social-challenge-card';
      const headerChallenge = document.createElement('div');
      headerChallenge.className = 'social-challenge-header';
      const label = document.createElement('span');
      label.textContent = 'Défi : 3 jours d’affilée validés';
      const status = document.createElement('span');
      status.className = 'social-challenge-status';
      const statusMap = {
        pending: 'En attente',
        in_progress: 'En cours',
        success: 'Réussi',
        expired: 'Expiré'
      };
      status.textContent = statusMap[friend.challenge.status] || 'En cours';
      headerChallenge.appendChild(label);
      headerChallenge.appendChild(status);

      const progress = document.createElement('div');
      progress.className = 'social-challenge-progress';
      const bar = document.createElement('div');
      bar.className = 'social-challenge-progress-bar';
      bar.style.width = `${Math.round((friend.challenge.progress || 0) * 100)}%`;
      progress.appendChild(bar);

      challengeCard.appendChild(headerChallenge);
      challengeCard.appendChild(progress);
      card.appendChild(challengeCard);
    }

    const actions = document.createElement('div');
    actions.className = 'social-friend-actions';

    const cheerBtn = document.createElement('button');
    cheerBtn.type = 'button';
    cheerBtn.className = 'social-cheer-btn';
    cheerBtn.dataset.action = 'cheer';
    cheerBtn.dataset.uid = friend.uid;
    cheerBtn.innerHTML = '👏<span>Encourager</span>';
    cheerBtn.setAttribute('aria-label', `Envoyer un encouragement à ${friend.displayName}`);

    actions.appendChild(cheerBtn);
    card.appendChild(actions);

    grid.appendChild(card);
  });
}

function renderSocialInvitations(overview) {
  const section = document.getElementById('social-invitations-section');
  const list = document.getElementById('social-invitations-list');
  if (!section || !list) {
    return;
  }
  list.innerHTML = '';
  const invitations = overview?.incomingInvitations || [];
  if (!invitations.length) {
    section.hidden = true;
    return;
  }
  invitations.forEach(invite => {
    const card = document.createElement('article');
    card.className = 'social-invitation-card';
    const title = document.createElement('p');
    title.textContent = invite.displayName || 'Nouvelle invitation';
    const time = document.createElement('span');
    time.className = 'social-friend-meta';
    time.textContent = formatRelativeTimeFromNow(invite.createdAt);
    const actions = document.createElement('div');
    actions.className = 'social-invitation-actions';

    const acceptBtn = document.createElement('button');
    acceptBtn.type = 'button';
    acceptBtn.className = 'btn btn-primary';
    acceptBtn.textContent = 'Accepter';
    acceptBtn.dataset.action = 'accept-invite';
    acceptBtn.dataset.inviteId = invite.id;

    const declineBtn = document.createElement('button');
    declineBtn.type = 'button';
    declineBtn.className = 'btn btn-outline';
    declineBtn.textContent = 'Refuser';
    declineBtn.dataset.action = 'decline-invite';
    declineBtn.dataset.inviteId = invite.id;

    actions.appendChild(acceptBtn);
    actions.appendChild(declineBtn);

    card.appendChild(title);
    card.appendChild(time);
    card.appendChild(actions);
    list.appendChild(card);
  });
  section.hidden = false;
}

function updateSocialEmptyState(overview) {
  const empty = document.getElementById('social-empty-state');
  const grid = document.getElementById('social-friends-grid');
  if (!empty || !grid) {
    return;
  }
  const hasFriends = (overview?.friends || []).length > 0;
  empty.hidden = hasFriends;
  grid.hidden = !hasFriends;
  grid.style.display = hasFriends ? 'grid' : 'none';
}

async function handleSocialGridClick(event) {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }
  const action = button.dataset.action;
  if (!action) {
    return;
  }
  const uid = button.dataset.uid;

  if (action === 'menu-toggle') {
    event.preventDefault();
    event.stopPropagation();
    if (openSocialMenuUid === uid) {
      closeSocialMenu();
    } else {
      toggleSocialMenu(uid);
    }
    return;
  }

  if (!socialProvider || !uid) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const friend = getFriendFromCache(uid);

  try {
    if (action === 'cheer') {
      await socialProvider.cheer(uid);
      showToast('Encouragement envoyé !');
    } else if (action === 'challenge') {
      await socialProvider.createChallenge(uid);
      showToast(friend ? `Défi lancé avec ${friend.displayName} !` : 'Défi lancé !');
    } else if (action === 'hide') {
      await socialProvider.hideFriend(uid);
      showToast(friend ? `${friend.displayName} masqué·e.` : 'Profil masqué.');
    } else if (action === 'remove') {
      const confirmed = await showConfirmationToast(`Supprimer ${friend ? friend.displayName : 'cet ami'} ?`, {
        confirmLabel: 'Supprimer',
        cancelLabel: 'Annuler'
      });
      if (!confirmed) {
        closeSocialMenu();
        return;
      }
      await socialProvider.removeFriend(uid);
      showToast(friend ? `${friend.displayName} supprimé·e.` : 'Profil supprimé.');
    }
    closeSocialMenu();
    refreshSocialOverview({ silent: true });
  } catch (error) {
    console.warn('Action sociale impossible', error);
    showToast('Action impossible pour le moment.');
  }
}

async function handleSocialInvitationsClick(event) {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }
  const action = button.dataset.action;
  const inviteId = button.dataset.inviteId;
  if (!action || !inviteId || !socialProvider) {
    return;
  }
  event.preventDefault();
  try {
    if (action === 'accept-invite') {
      await socialProvider.acceptInvitation(inviteId);
      showToast('Connexion acceptée !');
    } else if (action === 'decline-invite') {
      await socialProvider.declineInvitation(inviteId);
      showToast('Invitation refusée.');
    }
    refreshSocialOverview({ silent: true });
  } catch (error) {
    console.warn('Invitation impossible à traiter', error);
    showToast('Opération impossible pour le moment.');
  }
}

function handleGlobalSocialClick(event) {
  if (!openSocialMenuUid) {
    return;
  }
  const card = document.querySelector(`.social-friend-card[data-uid="${openSocialMenuUid}"]`);
  if (!card) {
    closeSocialMenu();
    return;
  }
  if (card.contains(event.target)) {
    return;
  }
  closeSocialMenu();
}

function toggleSocialMenu(uid) {
  closeSocialMenu();
  const card = document.querySelector(`.social-friend-card[data-uid="${uid}"]`);
  if (!card) {
    return;
  }
  const menu = card.querySelector('.social-menu');
  const trigger = card.querySelector('.social-menu-trigger');
  if (menu && trigger) {
    menu.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    openSocialMenuUid = uid;
  }
}

function closeSocialMenu() {
  if (!openSocialMenuUid) {
    return;
  }
  const card = document.querySelector(`.social-friend-card[data-uid="${openSocialMenuUid}"]`);
  if (card) {
    const menu = card.querySelector('.social-menu');
    const trigger = card.querySelector('.social-menu-trigger');
    if (menu) {
      menu.classList.remove('open');
    }
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
    }
  }
  openSocialMenuUid = null;
}

function getFriendFromCache(uid) {
  if (!socialOverviewCache?.friends) {
    return null;
  }
  return socialOverviewCache.friends.find(friend => friend.uid === uid) || null;
}

function handleSocialShareSnapshot() {
  showToast('Bientôt : export de votre progression ✨');
}

async function openAddPersonModal() {
  if (!socialProvider) {
    return;
  }
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) {
    return;
  }

  content.classList.remove('template-wide');
  content.classList.remove('badge-modal-container');
  content.classList.remove('quick-add-modal');
  content.classList.add('social-modal');

  content.innerHTML = `
    <div class="social-add-modal">
      <div class="social-add-header">
        <h3>Ajouter une personne</h3>
        <button type="button" class="social-add-close" id="social-add-modal-close" aria-label="Fermer">✕</button>
      </div>
      <div class="social-add-tabs" role="tablist">
        <button type="button" class="social-add-tab social-add-tab-active" data-tab="invite" role="tab" aria-selected="true">Inviter</button>
        <button type="button" class="social-add-tab" data-tab="connect" role="tab" aria-selected="false">Saisir un code</button>
      </div>
      <div class="social-add-panel social-add-panel-active" data-panel="invite">
        <p>Partagez ce lien ou ce code. L’autre personne devra accepter pour que vous soyez connectés.</p>
        <div class="social-invite-field">
          <span class="social-invite-label">Lien d’invitation</span>
          <div class="social-invite-value" id="social-invite-link">Génération…</div>
          <button type="button" class="btn btn-secondary" id="social-copy-link-btn">Copier le lien</button>
        </div>
        <div class="social-invite-field">
          <span class="social-invite-label">Code</span>
          <div class="social-invite-code" id="social-invite-code">—</div>
          <button type="button" class="btn btn-outline" id="social-copy-code-btn">Copier le code</button>
        </div>
      </div>
      <div class="social-add-panel" data-panel="connect" hidden>
        <form class="social-connect-form" id="social-connect-form">
          <label for="social-connect-code-input">Code d’invitation</label>
          <input type="text" id="social-connect-code-input" name="code" placeholder="ZEYNE-AMI-ABCDE" required>
          <button type="submit" class="btn btn-primary">Se connecter</button>
        </form>
        <p class="social-connect-hint">Votre ami·e devra également accepter pour que la connexion soit active.</p>
      </div>
    </div>
  `;

  modal.dataset.activeModal = 'social-add';
  modal.classList.add('show');

  const closeBtn = document.getElementById('social-add-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal());
  }

  const tabButtons = Array.from(content.querySelectorAll('.social-add-tab'));
  const panels = Array.from(content.querySelectorAll('.social-add-panel'));

  const activateTab = (target) => {
    tabButtons.forEach(btn => {
      const isActive = btn.dataset.tab === target;
      btn.classList.toggle('social-add-tab-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    panels.forEach(panel => {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle('social-add-panel-active', isActive);
      panel.toggleAttribute('hidden', !isActive);
    });
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => activateTab(button.dataset.tab));
  });

  activateTab('invite');

  let inviteDetails = null;
  let inviteFailed = false;

  const ensureInviteDetails = async () => {
    if (inviteDetails || inviteFailed) {
      return inviteDetails;
    }
    try {
      inviteDetails = await socialProvider.invite();
      updateInviteUI();
      return inviteDetails;
    } catch (error) {
      inviteFailed = true;
      console.warn('Impossible de générer une invitation', error);
      const linkEl = document.getElementById('social-invite-link');
      const codeEl = document.getElementById('social-invite-code');
      if (linkEl) {
        linkEl.textContent = 'Indisponible pour le moment';
      }
      if (codeEl) {
        codeEl.textContent = '—';
      }
      showToast('Invitation indisponible pour le moment.');
      return null;
    }
  };

  const updateInviteUI = () => {
    const linkEl = document.getElementById('social-invite-link');
    const codeEl = document.getElementById('social-invite-code');
    if (inviteDetails) {
      if (linkEl) {
        linkEl.textContent = inviteDetails.url;
        linkEl.setAttribute('title', inviteDetails.url);
      }
      if (codeEl) {
        codeEl.textContent = inviteDetails.code;
      }
    }
  };

  await ensureInviteDetails();

  const copyLinkBtn = document.getElementById('social-copy-link-btn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
      const details = await ensureInviteDetails();
      if (!details) {
        return;
      }
      await copyTextToClipboard(details.url);
      showToast('Invitation envoyée');
    });
  }

  const copyCodeBtn = document.getElementById('social-copy-code-btn');
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', async () => {
      const details = await ensureInviteDetails();
      if (!details) {
        return;
      }
      await copyTextToClipboard(details.code);
      showToast('Invitation envoyée');
    });
  }

  const connectForm = document.getElementById('social-connect-form');
  if (connectForm) {
    connectForm.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      const input = document.getElementById('social-connect-code-input');
      const value = input?.value?.trim();
      if (!value) {
        showToast('Saisissez un code valide.');
        return;
      }
      try {
        await socialProvider.accept(value);
        showToast('Connexion demandée !');
        closeModal();
        refreshSocialOverview({ silent: true });
      } catch (error) {
        console.warn('Connexion impossible', error);
        showToast('Code invalide ou expiré.');
      }
    });
  }

  const connectInput = document.getElementById('social-connect-code-input');
  if (connectInput) {
    connectInput.addEventListener('input', () => {
      connectInput.value = connectInput.value.toUpperCase();
    });
  }

  setupFocusTrap(content, { modalKey: 'social-add', initialFocus: tabButtons[0] || closeBtn });
}

async function copyTextToClipboard(text) {
  if (!text) {
    return false;
  }
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.warn('Clipboard API indisponible', error);
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    return true;
  } catch (error) {
    console.warn('Copie impossible', error);
    return false;
  } finally {
    textarea.remove();
  }
}

function initSocialModule() {
  socialProvider = createSocialProvider();
  const banner = document.getElementById('social-mode-banner');
  if (banner) {
    banner.hidden = ENABLE_SOCIAL_LIVE;
  }
  const addBtn = document.getElementById('social-add-person-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => openAddPersonModal());
  }
  const shareBtn = document.getElementById('social-share-progress-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => handleSocialShareSnapshot());
  }
  const sharingToggle = document.getElementById('social-sharing-toggle');
  if (sharingToggle) {
    sharingToggle.addEventListener('change', async () => {
      if (!socialProvider) {
        return;
      }
      const desired = sharingToggle.checked;
      sharingToggle.disabled = true;
      try {
        await socialProvider.updatePublicStats({ sharing: desired });
        showToast(desired ? 'Stats partagées.' : 'Stats masquées.');
      } catch (error) {
        console.warn('Impossible de mettre à jour la confidentialité', error);
        sharingToggle.checked = !desired;
        showToast('Mise à jour impossible pour le moment.');
      } finally {
        sharingToggle.disabled = false;
      }
      refreshSocialOverview({ silent: true });
    });
  }
  const friendsGrid = document.getElementById('social-friends-grid');
  if (friendsGrid) {
    friendsGrid.addEventListener('click', handleSocialGridClick);
  }
  const invitationsList = document.getElementById('social-invitations-list');
  if (invitationsList) {
    invitationsList.addEventListener('click', handleSocialInvitationsClick);
  }
  document.addEventListener('click', handleGlobalSocialClick);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeSocialMenu();
    }
  });
}

function closeModal() {
  stopModalAudio();
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  const activeModalType = modal?.dataset.activeModal || null;
  const wasQuickAdd = activeModalType === 'quick-add';
  const wasReportModal = activeModalType === 'report';
  const wasTimerModal = activeModalType === 'timer';
  releaseFocusTrap();
  if (modal) {
    if (wasReportModal && currentReportModalContext) {
      const changed = finalizeReportModalContext();
      if (changed) {
        saveState();
      }
    }
    modal.classList.remove('show');
    delete modal.dataset.activeModal;
  }
  if (wasTimerModal) {
    focusSessionRuntime.activeTimer = false;
  }
  if (content) {
    content.classList.remove('template-wide');
    content.classList.remove('badge-modal-container');
    content.classList.remove('quick-add-modal');
    content.classList.remove('social-modal');
    content.classList.remove('challenge-details-modal');
    content.classList.remove('challenge-setup-modal');
    content.classList.remove('challenge-completion-modal');
    content.innerHTML = '';
  }
  setPlanifierTabsMode('editor');
  if (wasQuickAdd && lastFocusBeforeModal && typeof lastFocusBeforeModal.focus === 'function') {
    lastFocusBeforeModal.focus();
  }
  lastFocusBeforeModal = null;
}

function showBadgeModal(badge) {
  if (!badge) return;

  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  content.classList.remove('template-wide');
  content.classList.add('badge-modal-container');
  content.innerHTML = `
    <div class="badge-modal">
      <div class="badge-modal-icon" aria-hidden="true">${badge.icon}</div>
      <h3>Nouveau badge : ${badge.label}</h3>
      <p>${badge.threshold} jours consécutifs — continue !</p>
      <button class="btn btn-primary" id="badge-modal-close-btn">OK</button>
    </div>
  `;

  modal.classList.add('show');

  const closeBtn = document.getElementById('badge-modal-close-btn');
  if (closeBtn) {
    closeBtn.focus();
    closeBtn.onclick = () => closeModal();
  }
}

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#EAC4AF', '#EFC3C2', '#A68076', '#F7E6D6'];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, idx) => {
      p.y += p.speedY;
      p.x += p.speedX;

      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);

      if (p.y > canvas.height) {
        particles.splice(idx, 1);
      }
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

loadState();
loadState();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(error => {
    console.warn('Enregistrement du service worker impossible', error);
  });
}

initNotificationsModule();
initNotificationsTabs();
initNavigation();
initWeeklyTabs();
initDailyQuickAdd();
initSocialModule();
const hasProgramme = Boolean((state.settings.goalTitle || '').trim());
const initialView = hasProgramme ? 'aujourdhui' : 'programme';
showView(initialView);
