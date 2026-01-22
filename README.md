# 💍 Plantilla de Invitación de Boda

Plantilla web responsive y elegante para invitaciones de boda, inspirada en diseños modernos y minimalistas.

## 📁 Estructura del Proyecto

```
wedding-invitation/
├── index.html          # Página principal
├── styles.css          # Estilos completos (mobile-first)
├── script.js           # JavaScript (countdown, animaciones, etc.)
├── README.md           # Este archivo
└── assets/
    ├── img/
    │   └── galeria/    # Carpeta para fotos de la pareja (1.jpg - 8.jpg)
    └── music/          # (Opcional) Música de fondo
```

## 🚀 Inicio Rápido

### 1. Configuración Básica

Edita el archivo **`script.js`** y modifica la sección `CONFIG`:

```javascript
const CONFIG = {
    // ⏰ Fecha del evento (YYYY-MM-DDTHH:MM:SS)
    eventDate: '2025-10-04T17:00:00',
    
    // 📝 URL del Google Form para RSVP
    googleFormUrl: 'TU_URL_GOOGLE_FORM_AQUÍ',
    
    // 📅 URL de Google Calendar
    googleCalendarUrl: 'TU_URL_GOOGLE_CALENDAR_AQUÍ',
    
    // 📍 Google Maps URLs
    mapsCeremonyUrl: 'https://maps.google.com/?q=TU_DIRECCION',
    mapsPartyUrl: 'https://maps.google.com/?q=TU_DIRECCION',
    
    // 💬 WhatsApp (solo números)
    whatsappNumber: '5491123456789',
    
    // 💑 Nombres
    nombres: {
        nombre1: 'NOMBRE_1',
        nombre2: 'NOMBRE_2'
    },
    
    // 🎵 Música de fondo
    backgroundMusic: false  // cambiar a true si agregas música
};
```

### 2. Editar Contenido en HTML

Abre **`index.html`** y busca los placeholders marcados con corchetes `[...]`:

#### Hero Section (Líneas ~70-100)
```html
<!-- Reemplazar -->
[N1] → Inicial del nombre 1 (ej: "F")
[N2] → Inicial del nombre 2 (ej: "J")
[NOMBRE_1] → Nombre completo 1
[NOMBRE_2] → Nombre completo 2
```

#### Detalles del Evento (Líneas ~135-185)
```html
<!-- Ceremonia -->
[DÍA] → Ej: "4"
[MES] → Ej: "Octubre"
[AÑO] → Ej: "2025"
[HORA_CEREMONIA] → Ej: "17:00"
[LUGAR_CEREMONIA] → Nombre del lugar
[DIRECCIÓN_CEREMONIA] → Dirección completa

<!-- Fiesta -->
[HORA_FIESTA] → Ej: "19:00"
[LUGAR_FIESTA] → Nombre del lugar
[DIRECCIÓN_FIESTA] → Dirección completa

<!-- Info Adicional -->
[DRESS_CODE] → Ej: "Elegante sport"
```

#### Galería / Historia (Línea ~210)
```html
[HISTORIA_PAREJA] → Texto de cómo se conocieron, historia de la pareja
```

#### Regalos (Líneas ~285-305)
```html
[NOMBRE_TITULAR] → Nombre del titular de la cuenta
[DNI_TITULAR] → DNI del titular
[NOMBRE_BANCO] → Banco Galicia, Santander, etc.
[CBU_PESOS] → CBU en pesos
[ALIAS_PESOS] → Alias (si existe)
[CBU_DOLARES] → CBU en dólares (opcional)
```

#### Info Útil (Líneas ~320-340)
```html
[RECOMENDACIONES_ALOJAMIENTO] → Hoteles, contactos
[INFO_TRANSPORTE] → Cómo llegar, estacionamiento
[ITINERARIO] → Horarios del día
```

#### RSVP (Línea ~365)
```html
[FECHA_LÍMITE_RSVP] → Ej: "20 de Septiembre"
```

#### Footer (Línea ~382)
```html
[NÚMERO_WHATSAPP] → Número de WhatsApp (formato internacional)
```

### 3. Agregar Imágenes

1. Crea la carpeta: `assets/img/galeria/`
2. Agrega 8 fotos de la pareja con nombres: `1.jpg`, `2.jpg`, ... `8.jpg`
3. Tamaño recomendado: 800x800px (cuadradas)
4. Formato: JPG o PNG
5. Optimiza las imágenes antes de subir (usa TinyPNG o similar)

Para la imagen del hero (fondo principal):
- Edita `styles.css` línea ~560
- Reemplaza el SVG placeholder con tu imagen:
```css
.hero {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                      url('assets/img/hero-background.jpg');
}
```

### 4. Música de Fondo (Opcional)

1. Agrega tu archivo MP3 en: `assets/music/cancion.mp3`
2. En `index.html` línea ~32, descomenta:
```html
<source src="assets/music/cancion.mp3" type="audio/mpeg">
```
3. En `script.js` CONFIG, cambia:
```javascript
backgroundMusic: true
```

## 🔗 Cómo Obtener los Links

### Google Form (RSVP)
1. Ve a [Google Forms](https://forms.google.com)
2. Crea un formulario con campos:
   - Nombre completo
   - Email/Teléfono
   - Cantidad de invitados
   - Restricciones alimentarias (opcional)
   - Mensaje (opcional)
3. Click en "Enviar" → Copia el enlace
4. Pega en `CONFIG.googleFormUrl`

### Google Calendar
1. Ve a [Google Calendar](https://calendar.google.com)
2. Crea un evento
3. Click en "Más opciones"
4. Llena los datos del evento
5. Click en "Publicar evento" → "Copiar enlace"
6. **O** usa este formato:
```
https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+NOMBRE1+%26+NOMBRE2&dates=20251004T170000/20251005T030000&details=Celebración+de+boda&location=LUGAR
```

### Google Maps
1. Ve a [Google Maps](https://maps.google.com)
2. Busca la dirección del lugar
3. Click en "Compartir"
4. Copia el enlace corto
5. Pega en `CONFIG.mapsCeremonyUrl` o `CONFIG.mapsPartyUrl`

### WhatsApp
Formato del número: `5491123456789`
- 54: Código de país (Argentina)
- 9: Prefijo para móvil
- 11: Código de área (sin 0)
- 23456789: Número de teléfono

## 🎨 Personalización de Colores

Edita las variables CSS en **`styles.css`** (líneas 10-20):

```css
:root {
    --color-primary: #8B7355;        /* Color principal */
    --color-primary-dark: #6B5540;   /* Color principal oscuro */
    --color-secondary: #D4B996;      /* Color secundario */
    --color-accent: #C19A6B;         /* Color de acento */
    --color-text: #2C2C2C;           /* Color del texto */
    --color-background: #FDFBF7;     /* Color de fondo */
}
```

Generadores de paletas recomendados:
- [Coolors.co](https://coolors.co)
- [Adobe Color](https://color.adobe.com)

## 🎭 Personalización de Fuentes

Las fuentes actuales son:
- **Títulos**: Playfair Display (serif elegante)
- **Texto**: Montserrat (sans-serif moderna)

Para cambiar, edita en **`index.html`** (línea ~15):
```html
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE_AQUÍ&display=swap" rel="stylesheet">
```

Y en **`styles.css`** (líneas 14-15):
```css
--font-heading: 'TU_FUENTE', serif;
--font-body: 'TU_FUENTE', sans-serif;
```

Fuentes recomendadas:
- Serif: Cormorant Garamond, Libre Baskerville, Lora
- Sans-serif: Raleway, Poppins, Open Sans

## 📱 Testing Responsive

### Dispositivos a probar:
- 📱 iPhone SE (375px)
- 📱 iPhone 12/13/14 (390px)
- 📱 Samsung Galaxy S21 (360px)
- 📱 iPad (768px)
- 💻 Desktop (1200px+)

### Chrome DevTools:
1. F12 para abrir DevTools
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Prueba diferentes tamaños

## 🚀 Deployment

### Opción 1: Netlify (Recomendado)
1. Ve a [Netlify](https://netlify.com)
2. Arrastra la carpeta del proyecto
3. ¡Listo! Obtendrás una URL tipo: `nombre-boda.netlify.app`
4. Puedes configurar un dominio custom

### Opción 2: GitHub Pages
1. Crea un repositorio en GitHub
2. Sube los archivos
3. Ve a Settings → Pages
4. Selecciona la rama main
5. URL: `tu-usuario.github.io/nombre-repo`

### Opción 3: Vercel
1. Ve a [Vercel](https://vercel.com)
2. Importa desde GitHub o sube archivos
3. Deploy automático

### Dominio Personalizado
Puedes comprar un dominio en:
- Namecheap
- Google Domains
- GoDaddy

Y conectarlo a Netlify/Vercel siguiendo sus guías.

## ✅ CHECKLIST DE QA (Quality Assurance)

### Pre-Deploy
- [ ] Todos los placeholders `[...]` fueron reemplazados
- [ ] CONFIG en `script.js` está completo
- [ ] Links de Google Form, Calendar, Maps funcionan
- [ ] Número de WhatsApp está correcto
- [ ] 8 fotos están en `/assets/img/galeria/`
- [ ] Imagen de fondo del hero está configurada
- [ ] Colores y fuentes están personalizados (opcional)

### Funcionalidad
- [ ] El countdown funciona correctamente
- [ ] Botón "Confirmar Asistencia" abre Google Form
- [ ] Botón "Agregar al Calendario" abre Google Calendar
- [ ] Botones "Cómo Llegar" abren Google Maps
- [ ] Botón "Ver Datos Bancarios" muestra el modal
- [ ] Modal de datos bancarios se cierra con X y fuera del modal
- [ ] Scroll suave a secciones funciona
- [ ] Animaciones de scroll funcionan
- [ ] Música de fondo funciona (si está activada)

### Responsive (Mobile)
- [ ] Hero section se ve bien en 375px - 430px
- [ ] Countdown es legible en móvil
- [ ] Botones son fáciles de presionar (mínimo 44px)
- [ ] Texto es legible (mínimo 16px)
- [ ] Imágenes de galería se adaptan bien
- [ ] Modal de datos bancarios se ve bien en móvil
- [ ] No hay scroll horizontal no deseado

### Responsive (Desktop)
- [ ] Layout se ve bien en 1200px+
- [ ] Countdown se ve equilibrado
- [ ] Galería muestra 4 columnas
- [ ] Secciones están centradas correctamente
- [ ] Espaciado es consistente

### Performance
- [ ] Imágenes están optimizadas (< 200KB cada una)
- [ ] Página carga en < 3 segundos
- [ ] No hay errores en la consola del navegador
- [ ] Lazy loading funciona en galería
- [ ] Transiciones son suaves (no lag)

### Accesibilidad
- [ ] Contraste de colores es suficiente (texto legible)
- [ ] Botones tienen estados hover/active visibles
- [ ] Links tienen estados focus visibles
- [ ] Texto alternativo en imágenes (alt tags)
- [ ] Tamaños de fuente son accesibles

### Cross-Browser
- [ ] Funciona en Chrome
- [ ] Funciona en Safari (iOS)
- [ ] Funciona en Firefox
- [ ] Funciona en Edge

### SEO Básico
- [ ] Title tag está personalizado
- [ ] Meta description está personalizada
- [ ] Favicon está configurado

### Contenido
- [ ] Ortografía y gramática revisadas
- [ ] Fechas y horarios son correctos
- [ ] Direcciones son correctas
- [ ] Datos bancarios son correctos
- [ ] Número de WhatsApp es correcto

## 🐛 Troubleshooting

### El countdown no funciona
- Verifica que la fecha en CONFIG esté en formato correcto: `YYYY-MM-DDTHH:MM:SS`
- Verifica que sea una fecha futura

### Las imágenes no cargan
- Verifica que las rutas sean correctas
- Verifica que los nombres sean: `1.jpg`, `2.jpg`, etc.
- Verifica que estén en `/assets/img/galeria/`

### Los links no funcionan
- Verifica que los URLs en CONFIG estén completos (con `https://`)
- Verifica que no haya espacios en los URLs

### La música no suena
- Verifica que `backgroundMusic: true` en CONFIG
- Verifica que el archivo exista en la ruta correcta
- Nota: algunos navegadores bloquean auto-play de audio

## 📊 Lighthouse Tips (Performance)

Para mejorar el score de Lighthouse:

### Performance
- Optimiza imágenes con [TinyPNG](https://tinypng.com)
- Usa formatos modernos: WebP en lugar de JPG/PNG
- Reduce el tamaño de las imágenes del hero (máx 1920px width)

### Accessibility
- Asegúrate de que todos los botones tengan labels descriptivos
- Usa alt text descriptivo en imágenes
- Mantén contraste de color > 4.5:1

### Best Practices
- Usa HTTPS (automático en Netlify/Vercel)
- No uses recursos bloqueados por CORS

### SEO
- Agrega meta tags Open Graph para redes sociales
- Agrega structured data (Schema.org) para eventos

## 📝 Notas Adicionales

### Secciones Opcionales
Si no necesitas alguna sección, simplemente coméntala o elimínala del HTML:

```html
<!-- 
<section class="useful-info">
    ...
</section>
-->
```

### Agregar más fotos a la galería
1. Agrega más elementos `<a class="gallery-item">` en el HTML
2. Actualiza `CONFIG.galleryCount` en script.js
3. Mantén el grid responsive (en mobile será 2 columnas, en desktop 4)

### Cambiar el idioma
La plantilla está en español. Para cambiar a otro idioma:
1. Busca y reemplaza todos los textos
2. Actualiza `<html lang="es">` en la primera línea del HTML

## 📞 Soporte

Para dudas o problemas:
1. Revisa esta documentación
2. Revisa la consola del navegador (F12) en busca de errores
3. Verifica que todos los archivos estén en las carpetas correctas

## 📄 Licencia

Esta plantilla es de uso libre para invitaciones de boda personales.

---

**¡Disfruta de tu boda! 💑🎉**