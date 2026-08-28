# Chronologe — suivi de tâches (prévu vs réel)

Application web autonome (un seul fichier `index.html`, sans dépendance ni
serveur) pour suivre vos tâches quotidiennes : durée prévue, durée réellement
effectuée, date/heure de début et date/heure de fin.

## Utilisation

Ouvrez simplement `index.html` dans un navigateur (double-clic, ou
`file:///.../task-tracker/index.html`). Vous pouvez aussi héberger ce
fichier statique où vous voulez (GitHub Pages, serveur local, etc.).

Aucune installation, aucun compte : les données sont stockées dans le
`localStorage` du navigateur utilisé. Elles restent donc locales à cet
appareil et à ce navigateur — pensez à exporter en CSV régulièrement si
vous voulez en garder une trace ailleurs.

## Fonctionnalités

L'application a trois vues, accessibles par les onglets en haut de page.

### Tâches
- **Ajouter une tâche** : nom, date prévue, durée prévue (heures/minutes).
- **Démarrer / Terminer** : un clic enregistre automatiquement la date et
  l'heure réelles de début ou de fin ; la durée réelle s'affiche en direct
  pendant qu'une tâche est en cours.
- **Modifier** : corrigez manuellement le nom, la durée prévue, les
  dates/heures de début et fin, ou le statut (utile si vous avez oublié de
  cliquer sur Démarrer/Terminer).
- **Filtres** : Aujourd'hui / En cours-à faire / Toutes.

### Tableau de bord
- **Indicateurs de productivité** sur une période (7 jours, 30 jours ou
  tout l'historique) : taux de tâches terminées à l'heure, nombre de tâches
  non exécutées, dépassement de temps cumulé, durée réelle vs prévue.
- **Graphique prévu / réel par jour**, avec le dépassement mis en évidence
  en rouge.
- **Répartition** des tâches par statut de performance (à l'heure,
  dépassement, non exécutées, en retard, en cours, à faire).
- **À traiter** : liste des tâches non exécutées ou en cours en dépassement
  de temps, pour agir directement dessus.

### Historique
- Recherche et filtre de toutes les tâches par période (du/au), par statut
  et par nom.
- Export CSV de la sélection filtrée.

### Chaque tâche affiche un statut de performance
- **Terminée à l'heure** / **Terminée en dépassement** (au-delà de 10 % du
  temps prévu).
- **Non exécutée** : tâche « à faire » dont la date prévue est passée sans
  avoir été démarrée.
- **En cours — en retard** : tâche en cours qui a déjà dépassé sa durée
  prévue.

### Export
Boutons « Exporter en CSV » (télécharge un fichier) et « Copier en CSV »
(copie dans le presse-papiers) disponibles dans les vues Tâches et
Historique, pour reprendre les données dans un tableur.

## Notes techniques

Fichier unique HTML/CSS/JS, sans build ni dépendance externe (hormis les
polices Google Fonts chargées via CDN). Compatible avec tout navigateur
récent. Le code détecte l'environnement d'exécution : dans un artefact
Claude, l'export utilise l'API de téléchargement de la plateforme ; en
usage autonome (fichier ouvert directement), il utilise le téléchargement
classique du navigateur.
