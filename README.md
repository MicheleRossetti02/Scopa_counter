# LeoCardAssistant - Conta Carte Scopa

Un'applicazione web moderna e intuitiva per tracciare le carte giocate durante una partita di Scopa, con statistiche avanzate e storico partite.

## 🎴 Caratteristiche

- **Tracciamento carte**: Tieni traccia delle carte giocate (1-10) con un click
- **Due modalità di input**: Modalità click (con mouse/touch) o tastiera (per input rapido)
- **Statistiche in tempo reale**: Visualizza le percentuali delle carte rimanenti
- **Indicatore ultima carta**: Vedi qual è stata l'ultima carta giocata
- **Barra di progresso**: Monitora l'avanzamento della partita (40 carte totali)
- **Storico partite**: Registra vittorie, sconfitte e statistiche complessive
- **Win rate e streak**: Monitora il tuo tasso di vittoria e le serie vincenti
- **Design moderno**: Interfaccia elegante con effetti glassmorphism e animazioni fluide
- **Responsive**: Funziona perfettamente su desktop, tablet e smartphone

## 🚀 Come Utilizzare

### Apertura dell'applicazione

1. **Scarica il progetto**:
   - Clicca sul pulsante verde "Code" in alto
   - Seleziona "Download ZIP"
   - Estrai il file ZIP in una cartella sul tuo computer

2. **Apri l'applicazione**:
   - Trova il file `index.html` nella cartella estratta
   - Fai doppio click su `index.html` per aprirlo nel browser
   - L'applicazione si aprirà automaticamente

> **Nota**: Non è necessario installare nulla! L'applicazione funziona direttamente nel browser.

### Durante la partita

#### Modalità Click (Predefinita)
1. Ogni volta che viene giocata una carta, clicca sul numero corrispondente
2. Il contatore diminuirà e le percentuali si aggiorneranno automaticamente
3. L'ultima carta giocata verrà evidenziata in alto

#### Modalità Tastiera
1. Clicca sul pulsante "⌨️ Tastiera" in alto a destra
2. Digita il numero della carta giocata (1-9, oppure 0 per il 10)
3. La carta verrà marcata automaticamente

#### Fine Partita
1. Clicca sul pulsante "Fine Partita" nell'header
2. Seleziona "🏆 Ho Vinto" o "❌ Ho Perso"
3. Le statistiche verranno salvate e la partita resetterà

### Statistiche

L'applicazione salva automaticamente:
- **Partite giocate**: Numero totale di partite completate
- **Vittorie e Sconfitte**: Tracciamento dei risultati
- **Win Rate**: Percentuale di vittorie
- **Streak Corrente**: Serie vincente/perdente attuale
- **Migliore Streak**: Record di vittorie consecutive

Per resettare lo storico, clicca sull'icona 🗑️ nella sezione "Storico Partite".

## 💻 Requisiti

- Un browser web moderno (Chrome, Firefox, Safari, Edge)
- Nessuna installazione richiesta
- Nessuna connessione internet necessaria (dopo il primo caricamento dei font)

## 📱 Compatibilità

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Smartphone (iOS, Android)

## 🎨 Tecnologie Utilizzate

- HTML5
- CSS3 (con effetti glassmorphism e animazioni)
- JavaScript Vanilla (ES6+)
- Google Fonts (Inter)
- LocalStorage per il salvataggio dati

## 📝 Struttura del Progetto

```
Scopa_counter/
├── index.html      # File principale dell'applicazione
├── script.js       # Logica dell'applicazione
├── styles.css      # Stili e design
└── README.md       # Questo file
```

## 🐛 Problemi Comuni

**Le statistiche non si salvano?**
- Assicurati che il browser non sia in modalità "Navigazione in incognito"
- Controlla che il browser abbia i permessi per il LocalStorage

**L'applicazione non si carica?**
- Verifica di aver estratto tutti i file dalla cartella ZIP
- Assicurati che `index.html`, `script.js` e `styles.css` siano nella stessa cartella

## 🤝 Contributi

Se hai suggerimenti o vuoi segnalare un problema, apri una issue su GitHub!

## 📄 Licenza

Questo progetto è distribuito liberamente. Sentiti libero di usarlo, modificarlo e condividerlo!

---

**Buon divertimento con le tue partite a Scopa! 🎴**
