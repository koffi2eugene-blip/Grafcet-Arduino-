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

- **Ajouter une tâche** : nom, date prévue, durée prévue (heures/minutes).
- **Démarrer / Terminer** : un clic enregistre automatiquement la date et
  l'heure réelles de début ou de fin ; la durée réelle s'affiche en direct
  pendant qu'une tâche est en cours.
- **Modifier** : corrigez manuellement le nom, la durée prévue, les
  dates/heures de début et fin, ou le statut (utile si vous avez oublié de
  cliquer sur Démarrer/Terminer).
- **Écart** : la durée réelle est comparée à la durée prévue (en vert si
  respectée, en rouge si dépassée), avec un total du jour dans le bandeau
  du haut.
- **Filtres** : Aujourd'hui / En cours-à faire / Toutes.
- **Export** : bouton « Exporter en CSV » (télécharge un fichier) et
  « Copier en CSV » (copie dans le presse-papiers) pour reprendre les
  données dans un tableur.

## Notes techniques

Fichier unique HTML/CSS/JS, sans build ni dépendance externe (hormis les
polices Google Fonts chargées via CDN). Compatible avec tout navigateur
récent. Le code détecte l'environnement d'exécution : dans un artefact
Claude, l'export utilise l'API de téléchargement de la plateforme ; en
usage autonome (fichier ouvert directement), il utilise le téléchargement
classique du navigateur.
