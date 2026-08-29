# Chronologe — suivi de tâches (prévu vs réel)

Application web autonome (un seul fichier `index.html`, sans dépendance ni
serveur) pour suivre vos tâches quotidiennes : durée prévue, durée réellement
effectuée, date/heure de début et date/heure de fin.

## Utilisation

**Pour la synchronisation entre appareils (recommandé) :** ouvrez le lien de
l'artefact Claude (celui que Claude vous a partagé) sur chaque appareil —
téléphone, ordinateur, etc. La page se sauvegarde alors elle-même à chaque
modification, et tout appareil qui ouvre ce **même lien** voit les mêmes
tâches. Un badge en haut de page indique l'état : « Synchronisé sur tous vos
appareils » (vert) ou « Enregistré uniquement sur cet appareil » (gris).

**En local, sans synchronisation :** vous pouvez aussi ouvrir `index.html`
directement dans un navigateur (double-clic, ou
`file:///.../task-tracker/index.html`), ou héberger ce fichier statique où
vous voulez (GitHub Pages, serveur local, etc.). Dans ce cas il n'y a pas de
lien commun entre appareils : les données restent dans le `localStorage` du
navigateur utilisé, propre à cet appareil. Pensez à exporter en CSV
régulièrement si vous voulez en garder une trace ailleurs.

> Si vous ouvrez l'app sur un appareil qui avait déjà des tâches enregistrées
> localement avant d'activer la synchronisation, elles sont automatiquement
> fusionnées avec les tâches déjà synchronisées au premier chargement — rien
> n'est perdu.

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

Fichier HTML/CSS/JS unique, sans dépendance externe au runtime (hormis les
polices Google Fonts chargées via CDN). Compatible avec tout navigateur
récent. Le code détecte l'environnement d'exécution :
- Dans un artefact Claude (avec les capacités `artifact` et `downloads`
  déclarées) : chaque modification republie une nouvelle version complète de
  la page avec les données à jour, et toute autre vue ouverte sur le même
  lien se recharge automatiquement — c'est ce qui assure la synchronisation.
  L'export CSV utilise l'API de téléchargement de la plateforme.
- En usage autonome (fichier ouvert directement, ou hébergé ailleurs) :
  repli sur `localStorage` (un seul appareil) et téléchargement classique du
  navigateur pour l'export.

`index.html` contient sa propre logique de republication : la fonction
`boot()` se sérialise elle-même (`boot.toString()`) pour former le script de
la nouvelle version, et deux constantes (`HEAD_EXTRA_TEMPLATE`,
`BODY_SKELETON_TEMPLATE`) portent une copie du `<head>`/CSS et du squelette
HTML statique. **Si vous modifiez le CSS ou le HTML statique (hors des
conteneurs remplis dynamiquement par JS), relancez `node build.js`** pour
régénérer ces deux constantes à partir du fichier — sinon la version
republiée par l'app resterait sur l'ancienne mise en page.
