# Performance Review - API externes et Historique

Date de review: 2026-08-07

## Objectif

Identifier les goulots d'etranglement qui expliquent les temps de chargement importants, surtout autour de l'onglet `Historique` et des requetes vers les APIs externes.

## Resume court

Le probleme principal n'est pas le rendu du chart lui-meme. `Chart.tsx` affiche aujourd'hui des donnees statiques. Le chargement vient surtout de requetes externes inutiles ou mal coordonnees:

- une requete API lancee directement pendant le render du `Header`;
- des requetes `live markets` dont les donnees ne sont pas utilisees par l'UI;
- un waterfall entre le taux courant et l'historique;
- une collision de cache React Query entre `rate` et `history`;
- une requete historique qui bloque l'UI alors que ses donnees ne sont presque pas affichees.

## Findings prioritaires

### 1. Requete API declenchee pendant le render

Fichier: `components/layout/Header.tsx`

Zone concernee:

- `getR` est declaree autour de la ligne 17.
- `console.log('getR', getR())` est appele autour de la ligne 21.

Pourquoi c'est un goulot:

Appeler une fonction async qui fait un `fetch` directement dans le corps du composant signifie que la requete part a chaque render. Un render peut arriver pour beaucoup de raisons: chargement termine, changement de state, modification d'une devise, saisie utilisateur, remount, etc.

Impact:

- requetes externes repetees sans controle;
- pas de cache React Query;
- pas de `staleTime`;
- pas de `enabled`;
- risque de ralentissement global de la page, meme si l'utilisateur ne regarde pas l'historique.

Priorite: tres haute.

Action recommandee:

Supprimer cet appel direct. Si cette donnee est necessaire, la passer par React Query ou par une route/server action controlee. Si elle etait juste pour tester, l'enlever completement.

### 2. `useLiveMarkets` fait des requetes dont le resultat n'est pas utilise

Fichiers:

- `components/layout/Header.tsx`
- `components/features/live-markers/LiveMarkers.tsx`
- `components/features/convert-wrapper/currency-selector/services/forexService.ts`

Constat:

`Header.tsx` appelle `useLiveMarkets({ principalBase: ['usd', 'eur'] })`, mais `LiveMarkers.tsx` affiche une liste statique definie localement.

Pourquoi c'est un goulot:

Tu paies le cout reseau de `useLiveMarkets`, mais l'UI n'utilise pas `liveMarket`. Dans `getLiveMarkets`, chaque base declenche une requete vers `/rates`. Avec `['usd', 'eur']`, cela fait deja 2 requetes externes au chargement.

Impact:

- chargement initial alourdi;
- appels API inutiles;
- skeleton/loading dependant de donnees qui ne servent pas a l'affichage reel.

Priorite: haute.

Action recommandee:

Choisir entre deux options:

- retirer `useLiveMarkets` tant que les markers restent statiques;
- ou brancher `LiveMarkers` sur `liveMarket`, en limitant les quotes necessaires au lieu de recuperer trop de donnees.

Trade-off:

Garder des donnees statiques est simple et rapide pour terminer l'UI. Brancher les vraies donnees est plus portfolio-worthy, mais il faut modeler les paires proprement et eviter les requetes larges.

### 3. Waterfall entre le taux courant et l'historique

Fichiers:

- `app/(client)/page.tsx`
- `components/features/history/HistoryDetails.tsx`

Constat:

Dans `page.tsx`, `useRate` charge le taux courant. Ensuite `HistoryDetails` recoit `rate`, puis lance `useCompareYesterdayRate` avec `rate.base` et `rate.quote`.

Pourquoi c'est un goulot:

L'historique attend le resultat du taux courant alors que la paire active est deja connue par l'etat de selection:

- base selectionnee ou default `USD`;
- quote selectionnee ou default `EUR`.

Cela cree un waterfall:

1. charger le taux courant;
2. attendre `rate.base` et `rate.quote`;
3. lancer ensuite la requete historique.

Impact:

L'onglet `Historique` parait lent, car il ne peut pas charger en parallele avec le taux courant.

Priorite: haute.

Action recommandee:

Faire dependre l'historique directement de la paire active connue, pas du resultat `rate`. Le taux courant et l'historique peuvent alors partir en parallele.

### 4. Collision de cache React Query entre taux courant et historique

Fichier: `components/features/convert-wrapper/currency-selector/hooks/useForex.ts`

Constat:

`useRate` utilise:

- `queryKey: ['rate', b, q]`

`useCompareYesterdayRate` utilise aussi:

- `queryKey: ['rate', b, q]`

Pourquoi c'est un goulot ou un bug:

Ces deux hooks ne retournent pas le meme type de donnee:

- `useRate` retourne un taux simple;
- `useCompareYesterdayRate` retourne une serie ou une liste de taux.

React Query considere pourtant que c'est la meme ressource. Cela peut provoquer:

- donnees incoherentes;
- cache pollue;
- requete qui ne se relance pas quand tu l'attends;
- rendu qui depend d'une ancienne reponse au mauvais format.

Priorite: tres haute.

Action recommandee:

Utiliser des cles distinctes:

- `['rate', base, quote]` pour le taux courant;
- `['history', base, quote, range]` pour l'historique;
- inclure la range (`1D`, `1W`, `1M`, etc.) dans la cle quand elle existe.

### 5. L'historique charge une API mais l'UI affiche surtout du statique

Fichiers:

- `components/features/history/HistoryDetails.tsx`
- `components/features/history/Chart.tsx`

Constat:

Dans `HistoryDetails.tsx`, les valeurs `change` et `% change` sont hardcodees. Les lignes qui semblent vouloir utiliser `cardData` sont commentees.

Dans `Chart.tsx`, les donnees du graphe sont statiques:

- labels fixes de janvier a decembre;
- values fixes;
- pas de mapping depuis la reponse API.

Pourquoi c'est un goulot:

L'utilisateur attend une requete qui ne nourrit pas vraiment l'affichage principal. C'est couteux pour peu de valeur UI.

Impact:

- skeleton inutilement long;
- impression que l'historique est lent;
- complexite accrue sans benefice visible.

Priorite: haute.

Action recommandee:

Deux options valides:

- court terme: ne pas bloquer le chart sur la requete tant que les donnees sont statiques;
- moyen terme: connecter vraiment la reponse historique au chart et aux cards `open`, `last`, `change`, `% change`.

Trade-off:

La premiere option ameliore vite le ressenti. La deuxieme est meilleure pour une version portfolio/prod, mais demande un vrai modele de donnees historique.

### 6. L'endpoint historique actuel ne correspond pas a l'UI des ranges

Fichier: `components/features/convert-wrapper/currency-selector/services/forexService.ts`

Constat:

`getCompareYesterdayRate` ne recupere qu'hier -> aujourd'hui:

- `from = yesterday`;
- `to = today`;

Mais l'UI propose:

- `1D`;
- `1W`;
- `1M`;
- `3M`;
- `1Y`;
- `5Y`.

Pourquoi c'est un goulot:

Si tu etends cette logique telle quelle aux longues periodes, tu risques de charger trop de points, surtout pour `1Y` et `5Y`.

Action recommandee:

Modeler explicitement les ranges:

- `1D`: points journaliers ou comparaison date precedente;
- `1W`: serie courte;
- `1M` / `3M`: serie journaliere acceptable;
- `1Y` / `5Y`: envisager `group=week` ou `group=month`.

Source utile:

- Documentation Frankfurter: https://frankfurter.dev/

La doc indique que les time series utilisent `from` et `to`, et que le parametre `group` supporte `week` et `month` pour reduire la quantite de donnees sur les longues periodes.

### 7. Les appels `"use server"` depuis React Query ajoutent un aller-retour

Fichier: `components/features/convert-wrapper/currency-selector/services/forexService.ts`

Constat:

Le fichier est marque `"use server"`, mais les fonctions sont appelees par des hooks React Query dans des composants client.

Pourquoi c'est important:

Chaque query cote client devient au minimum:

1. navigateur -> serveur Next;
2. serveur Next -> API Frankfurter;
3. API Frankfurter -> serveur Next;
4. serveur Next -> navigateur.

Ce n'est pas forcement une mauvaise architecture. Elle peut etre utile pour cacher des secrets ou centraliser la logique. Mais ici Frankfurter ne demande pas de cle API, donc le benefice est moins evident.

Trade-off:

- Cote serveur: meilleur controle, possibilite de cache serveur, API cachee.
- Cote client direct: moins d'aller-retours, plus simple, mais logique exposee au navigateur.

Pour ce projet, le plus important est surtout d'eviter les requetes inutiles et d'avoir des query keys propres.

### 8. Cache React Query pas assez configure globalement

Fichier: `providers/provider.tsx`

Constat:

Le `QueryClient` est cree sans defaults globaux.

Pourquoi c'est un goulot potentiel:

Certaines donnees, comme `/currencies`, changent rarement. Sans `staleTime` adapte, elles peuvent etre refetch plus souvent que necessaire selon les comportements de React Query: remount, focus, invalidation, etc.

Action recommandee:

Definir une strategie:

- currencies: cache long;
- latest rate: cache court ou moyen selon la fraicheur souhaitee;
- historical rates: cache tres long, car l'historique passe ne change presque pas;
- live markets: cache court si l'objectif est vraiment du live.

## Autres observations de qualite

### Logs et imports inutiles

Fichiers concernes:

- `components/features/history/HistoryDetails.tsx`
- `components/layout/Header.tsx`
- `components/features/convert-wrapper/ConvertWrapper.tsx`
- `components/features/details/main.tsx`

Constat:

Il reste plusieurs `console.log`, imports inutilises, variables inutilisees et handlers non branches.

Impact:

Ce n'est pas le plus gros goulot reseau, mais cela rend le debug plus bruyant et peut cacher les vrais problemes.

### `ConvertWrapper` mute les objets `currency`

Fichier: `components/features/convert-wrapper/ConvertWrapper.tsx`

Constat:

Dans le `useMemo`, tu modifies directement `currency.flag`.

Pourquoi c'est fragile:

Muter les objets venant du cache React Query peut creer des effets de bord. En production, on prefere mapper vers de nouveaux objets ou normaliser les donnees a l'entree.

### Filtrages repetes dans `SelectOptions`

Fichier: `components/features/convert-wrapper/currency-selector/SelectOptions.tsx`

Constat:

Les listes `popular` et `other` sont filtrees plusieurs fois dans le render.

Impact:

Ce n'est pas ton probleme principal compare au reseau, mais c'est une optimisation simple quand la liste grossit.

Action recommandee:

Precalculer `popularCurrencies` et `otherCurrencies`, idealement via `useMemo` au niveau parent ou dans le composant.

## Verification effectuee

### Lint

Commande:

- `npm.cmd run lint`

Resultat:

- echec;
- 4 erreurs;
- 14 warnings.

Points notables:

- imports inutilises;
- variables inutilisees;
- interfaces vides dans des composants base;
- `refetch` inutilise dans `app/(client)/page.tsx`;
- `DotLottieReact` inutilise dans `HistoryDetails.tsx`.

### TypeScript

Commande:

- `npx.cmd tsc --noEmit`

Resultat:

- echec.

Points notables:

- `Currency | undefined` passe a des setters qui attendent `Currency`;
- type de `ref` incorrect dans le select;
- import manquant `currency.type`;
- props manquantes dans `components/ui/select.tsx`.

### Build

Commande:

- `npm.cmd run build`

Resultat:

- echec avant evaluation complete de l'app.

Cause:

`next/font/google` ne peut pas telecharger JetBrains Mono depuis Google Fonts dans cet environnement.

Impact:

Ce n'est pas directement le probleme de Frankfurter ou de l'historique, mais c'est un point de fragilite pour un build offline ou derriere proxy.

Action recommandee:

Self-hoster la font avec `next/font/local`, ou s'assurer que l'environnement de build peut joindre Google Fonts.

## Plan de correction recommande

### Phase 1 - Enlever les requetes inutiles

1. Supprimer l'appel `getR()` dans le render de `Header.tsx`.
2. Supprimer `useLiveMarkets` si `LiveMarkers` reste statique.
3. Nettoyer les `console.log` lies aux requetes.

Gain attendu:

- moins de requetes externes;
- chargement initial plus stable;
- debug plus lisible.

### Phase 2 - Corriger React Query

1. Donner une query key differente a l'historique.
2. Ajouter la range dans la query key historique.
3. Ajouter `staleTime` adapte a `useCurrencies`.
4. Reflechir a des defaults globaux dans `QueryClient`.

Gain attendu:

- cache plus fiable;
- moins de refetch inutiles;
- comportement plus previsible.

### Phase 3 - Corriger le waterfall de l'historique

1. Deriver `base` et `quote` depuis les devises selectionnees ou les defaults.
2. Passer cette paire directement a `HistoryDetails`.
3. Lancer `rate` et `history` en parallele.

Gain attendu:

- historique plus rapide;
- skeleton moins long;
- architecture plus claire.

### Phase 4 - Rendre l'historique vraiment dynamique

1. Ajouter une state pour la range active.
2. Construire `from`, `to`, et eventuellement `group`.
3. Mapper la reponse Frankfurter vers les labels et datasets Chart.js.
4. Calculer `open`, `last`, `change`, `% change` depuis les points retournes.

Gain attendu:

- l'API justifie son cout;
- UX plus credible;
- fonctionnalite conforme au challenge.

## Decision d'architecture a prendre

Tu as deux approches valides pour les APIs:

### Option A - Requetes via serveur Next

Avantages:

- meilleur controle du cache serveur;
- logique centralisee;
- possibilite d'ajouter une API key plus tard sans l'exposer.

Inconvenients:

- un aller-retour supplementaire;
- plus de complexite;
- il faut etre rigoureux sur les caches.

### Option B - Requetes directes depuis le client

Avantages:

- plus simple;
- moins d'aller-retours;
- suffisant pour Frankfurter car pas de cle API.

Inconvenients:

- logique visible cote navigateur;
- moins de controle serveur;
- plus difficile de centraliser certaines strategies de cache.

Pour un projet portfolio, l'option A peut etre interessante si elle est proprement structuree. Mais elle ne doit pas servir de compensation a des requetes inutiles. Le vrai standard pro ici: requetes minimales, cache clair, query keys correctes, et donnees utilisees par l'UI.

