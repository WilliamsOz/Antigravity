# Règles d'orchestration T3 Code

Ces règles s'appliquent à tous les agents : l'orchestrateur global (projet T3Code), chaque orchestrateur de projet et chacun de leurs sous-agents. Lis-les au début de chaque projet et de chaque tâche. L'utilisateur s'appelle Williams.

## 1. Dossier de travail (règle absolue)

- Chaque projet a un dossier de travail sur le disque E:. Il est indiqué dans le `T3_RULES.md` du projet (section « Ce projet »).
- Interdiction de créer des fichiers ou des dossiers en dehors de ce dossier de travail. Ça vaut pour les sous-agents, les scripts, les exports et les fichiers temporaires.
- La lecture en dehors du dossier est autorisée (sources du projet, historique Antigravity, `~/.gemini/antigravity/brain/...`).
- Si une tâche exige de créer quelque chose hors du dossier, arrête-toi et demande l'accord explicite de Williams.
- Transmets cette règle, avec le chemin exact du dossier, dans le prompt de chaque sous-agent.

## 2. Tri de chaque demande

À chaque demande de Williams, évalue d'abord si tu peux y répondre rapidement : réponse directe, lecture ou modification ponctuelle, quelques appels d'outils.

- Si oui, fais-le toi-même.
- Si non, délègue systématiquement la tâche à un sous-agent (`delegate_task`, `mode: "async"`). Dis à Williams ce que tu as délégué, puis fais-lui un rapport quand le sous-agent a fini.

## 3. Choix du modèle des sous-agents (économie de tokens)

Utilise toujours `delegate_task` avec une cible explicite. N'hérite jamais du modèle du parent.

| Type de tâche | Cible `delegate_task` |
|---|---|
| Tâche qui demande de la réflexion : conception, code, analyse, synthèse, debug, revue | `{"providerInstanceId":"claudeAgent","model":"claude-opus-5-5","options":[{"id":"effort","value":"medium"}]}`. Mets `"high"` pour les tâches vraiment complexes. |
| Tâche simple et mécanique : renommer des fichiers ou des dossiers, déplacer, trier, exporter, reformater, lister | `{"providerInstanceId":"antigravity","model":"gemini-3.8-flash-high"}` |

- Pour Opus, l'effort est `medium` ou `high`, jamais autre chose : ni `low`, ni `xhigh`, ni `max`, ni `ultrathink`, ni `ultracode`.
- Pour Gemini, c'est toujours Gemini 3.8 Flash **High**, jamais Medium ni Low.
- N'utilise pas d'autres modèles (Sonnet, Haiku, Fable…) sans l'accord de Williams.
- Un sous-agent qui délègue à son tour suit les mêmes règles.

## 4. Fin de vie des threads de sous-agents

- Quand un sous-agent a fini, récupère sa conclusion (`task_status` ou la notification de fin) et intègre-la à ton rapport.
- Ensuite, retire immédiatement son thread pour ne pas encombrer le projet : `t3_thread_organize` avec `action: "archive"` sur son `childThreadId`. T3 Code n'expose pas de suppression aux agents, l'archivage est l'équivalent disponible.
- Ne réutilise pas un thread de sous-agent : chaque nouvelle tâche passe par un nouveau `delegate_task`.

## 5. Mémoire du projet

- Tiens à jour les connaissances du projet dans `_t3/` à l'intérieur du dossier de travail :
  - `_t3/CONTEXTE_PROJET.md` : objectifs, état actuel, architecture, outils et MCP, décisions, conventions, problèmes connus, prochaines étapes.
- L'historique des conversations Antigravity importées se trouve dans `_t3/historique-antigravity/`. Commence par `INDEX.md`.
- Les directives propres au projet se trouvent dans `GEMINI.md`, quand il existe. Elles restent valables, sauf si elles contredisent les présentes règles.

## 6. Style de communication

- Sois synthétique : va à l'essentiel, sans préambule, sans répétition, sans formules de politesse superflues.
- Pas d'emoji ni de symboles décoratifs, que ce soit dans les messages, les titres de threads ou les fichiers.
- Les rapports donnent le résultat, les points d'attention et les questions, en quelques lignes ou en un tableau court.
- Applique ce style aux sous-agents et exige-le dans leurs prompts.

## Ce projet

- Projet T3 : **Local_Agentic**
- Dossier de travail (seul endroit où créer des fichiers ou des dossiers) : `E:\Antigravity\Local_Agentic`
