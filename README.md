# ZEYNE

Progressive web app pour planifier et suivre ses micro-tâches quotidiennes.

## Fonctionnalités principales
- Planification des "Daily 3" avec micro-tâches matin / après-midi / soir
- Suivi de la motivation, rappels de notifications et bibliothèque audio pour les rituels
- Système de durée de focus adaptative avec nudges contextuels

## Focus adaptatif
Les sessions de focus s'ajustent automatiquement par créneau (Matin, Après-midi, Soir) selon les résultats récents :

- ✅ +5 minutes après 3 succès consécutifs sur un créneau
- ❌ -5 minutes après 2 échecs consécutifs sur ce créneau
- Les suggestions respectent les bornes de 5 à 45 minutes par pas de 5 minutes.

Chaque nudge apparaît sous la tâche correspondante dans la carte « Daily 3 d'aujourd'hui » et propose « Oui », « Plus tard », ou « Jamais » :

- **Oui** ajuste immédiatement la durée par défaut du créneau pour la journée et les suivantes.
- **Plus tard** snooze la suggestion pendant 7 jours.
- **Jamais** masque la suggestion pendant 30 jours.

La préférence `Difficulté adaptative` peut être activée/désactivée dans les paramètres de notifications.

## Développement
```bash
npm install
npm run dev
npm run build
```

Le build Vite produit la version statique dans `dist/`.
