# Música de Fondo (Opcional)

Si deseas agregar música de fondo a la invitación:

1. Coloca tu archivo de audio aquí con el nombre: `cancion.mp3`
2. Formato recomendado: MP3
3. Peso máximo: 3-5MB
4. Calidad: 128kbps es suficiente

## Configuración:

### En index.html (línea ~32):
Descomenta esta línea:
```html
<source src="assets/music/cancion.mp3" type="audio/mpeg">
```

### En script.js (CONFIG):
Cambia a:
```javascript
backgroundMusic: true
```

## Notas importantes:
- La música se reproducirá automáticamente después del primer click del usuario
- Los usuarios pueden pausar/play con el botón en la esquina superior derecha
- Algunos navegadores bloquean el auto-play de audio
- Considera usar una canción instrumental o romántica que no sea muy alta