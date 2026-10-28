# Chile Preparado – App de Emergencias

App web completa (PWA) para preparación ante emergencias en Chile.

## Características

- **Kit de emergencia interactivo** con checklist y barra de progreso (se guarda automáticamente)
- **Guías detalladas** para:
  - Sismos / Terremotos
  - Volcanes
  - Aluviones / Remoción en masa
  - Inundaciones
  - Vientos fuertes / Tornados
  - Clima extremo / Cambios de temperatura
- **Plan familiar** (puntos de encuentro, contactos, notas)
- **Números de emergencia** con llamada directa
- **Lista de documentos importantes**
- **Notas rápidas**
- **Recordatorio de revisión**
- **Exportar / Importar datos**
- **Modo oscuro / claro**
- **Funciona offline** (una vez cargada)
- Se puede instalar en el celular como app

## Cómo usar

### Opción 1: Abrir directamente
1. Abre el archivo `index.html` en cualquier navegador moderno (Chrome, Firefox, Safari, Edge).
2. En el celular: ábrelo desde el navegador y usa “Añadir a pantalla de inicio”.

### Opción 2: Servidor local (recomendado para PWA completa)
```bash
# Con Python
python -m http.server 8000

# O con Node
npx serve .
```
Luego abre http://localhost:8000

### Opción 3: Subir a internet
Sube toda la carpeta a cualquier hosting estático (GitHub Pages, Netlify, Vercel, etc.) y comparte el enlace.

## Archivos incluidos

- `index.html` – Estructura de la app
- `styles.css` – Estilos (modo oscuro/claro)
- `app.js` – Lógica y datos
- `manifest.json` – Configuración PWA
- `sw.js` – Service Worker (offline)
- `README.md` – Este archivo

## Notas

- Todos los datos se guardan **solo en tu dispositivo** (localStorage). No se envían a ningún servidor.
- La información está basada en recomendaciones de SENAPRED y organismos oficiales chilenos.
- Esta app **no reemplaza** las alertas oficiales ni los canales de SENAPRED, DMC, CSN o Sernageomin.

¡Mantente preparado!
