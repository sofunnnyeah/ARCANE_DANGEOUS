const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// ВОТ ЭТОТ МАРШРУТ ДОЛЖЕН БЫТЬ
app.get('/api/music', (req, res) => {
  const musicDir = path.join(__dirname, 'public', 'music');
  
  if (!fs.existsSync(musicDir)) {
    console.log('⚠️ Папка music не найдена:', musicDir);
    return res.json([]);
  }

  fs.readdir(musicDir, (err, files) => {
    if (err) {
      console.error('Ошибка:', err);
      return res.status(500).json({ error: 'Ошибка чтения' });
    }
    const mp3s = files.filter(f => f.toLowerCase().endsWith('.mp3'));
    console.log(`✅ Найдено ${mp3s.length} треков в music/:`, mp3s);
    res.json(mp3s);
  });
});

const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  🗝️  ARCANE DUNGEONS');
  console.log('  ─────────────────────────────');
  console.log(`  ✅ Сервер запущен на http://localhost:${PORT}`);
  console.log('  ─────────────────────────────');
  console.log('');
});