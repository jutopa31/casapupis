# Guía de Deploy a Vercel

## Paso 1: Preparar Supabase

1. Ir a [supabase.com](https://supabase.com) y crear un proyecto
2. En **SQL Editor**, ejecutar el archivo `supabase-schema.sql`
3. En **Project Settings > API**, copiar:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **Anon/Public Key**

## Paso 2: Deploy a Vercel

### Opción A: Deploy desde el Dashboard de Vercel (Recomendado)

1. Ir a [vercel.com](https://vercel.com) e iniciar sesión
2. Click en **Add New... > Project**
3. Importar el repositorio: `jutopa31/casapupis`
4. Configurar el proyecto:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Agregar **Environment Variables** (muy importante):
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
   VITE_APP_URL=https://tu-app.vercel.app
   ```

   **Nota**: El `VITE_APP_URL` será la URL que Vercel te asigne (ejemplo: `casapupis.vercel.app`)

6. Click en **Deploy**

### Opción B: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Seguir las instrucciones y agregar las variables de entorno cuando se solicite
```

## Paso 3: Configurar Variables de Entorno en Vercel

Después del primer deploy:

1. Ir a **Project Settings > Environment Variables**
2. Agregar las siguientes variables:
   - `VITE_SUPABASE_URL`: URL de tu proyecto Supabase
   - `VITE_SUPABASE_ANON_KEY`: Anon key de Supabase
   - `VITE_APP_URL`: URL de tu app en Vercel (ej: `https://casapupis.vercel.app`)

3. Hacer **Redeploy** para que tomen efecto las variables

## Paso 4: Configurar Dominio Personalizado (Opcional)

1. En Vercel, ir a **Settings > Domains**
2. Agregar tu dominio personalizado
3. Seguir las instrucciones para configurar los DNS
4. Actualizar `VITE_APP_URL` con tu nuevo dominio

## Paso 5: Crear Usuario Administrador en Supabase

1. Ir a **Authentication > Users** en Supabase
2. Click en **Add user > Create new user**
3. Agregar email y password para la pareja
4. Este usuario podrá acceder a la app

## Verificación del Deploy

✅ La app debe estar accesible en `https://tu-app.vercel.app`
✅ Puedes hacer login con el usuario creado en Supabase
✅ El sistema de RSVP público funciona en `/rsvp/:token`

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Verificar que las variables de entorno estén configuradas en Vercel
- Hacer redeploy después de agregar las variables

### Error de CORS en Supabase
- Ir a **Project Settings > API** en Supabase
- En **URL Configuration**, agregar la URL de Vercel a las URLs permitidas

### Build falla
- Verificar que `package.json` tenga todas las dependencias
- Revisar los logs de build en Vercel

## Comandos Útiles

```bash
# Redeploy desde CLI
vercel --prod

# Ver logs
vercel logs

# Ver variables de entorno
vercel env ls
```

## Actualizaciones Futuras

Cada vez que hagas `git push` a la rama `main`, Vercel automáticamente:
1. Detecta los cambios
2. Ejecuta el build
3. Deploya la nueva versión
4. Tu app se actualiza sin downtime

## URLs Importantes

- **GitHub**: https://github.com/jutopa31/casapupis
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com
