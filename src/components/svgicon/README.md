# SvgIcon Component

Componente simplificado y optimizado para renderizar iconos SVG en React Native.

## 📦 Instalación

Ya instalado: `react-native-svg@15.15.4`

## 🎯 Características

- ✅ Type-safe con TypeScript
- ✅ Soporta iconos con fill y stroke
- ✅ Tamaño y color personalizables
- ✅ 10 iconos predefinidos para apps de películas
- ✅ Optimizado y simplificado del componente original

## 📖 Uso Básico

```tsx
import { SvgIcon } from '@/components/svgicon';

// Icono básico
<SvgIcon name="home" />

// Con tamaño y color
<SvgIcon name="search" size={32} color="#FF8700" />

// Con dimensiones personalizadas
<SvgIcon
  name="star"
  width={40}
  height={40}
  color="#FFD700"
/>
```

## 🎨 Iconos Disponibles

| Nombre | Tipo | Uso |
|--------|------|-----|
| `home` | Fill | Navegación - Home |
| `search` | Stroke | Búsqueda |
| `bookmark` | Fill | Watch list / Favoritos |
| `back` | Stroke | Navegación atrás |
| `info` | Stroke | Información |
| `star` | Fill | Rating / Favoritos |
| `clock` | Stroke | Duración |
| `calendar` | Stroke | Fecha de estreno |
| `play` | Fill | Reproducir |
| `close` | Stroke | Cerrar |

## 📝 Props

```typescript
interface SvgIconProps {
  name: IconName;           // Nombre del icono (requerido)
  size?: number;            // Tamaño (default: 24)
  color?: string;           // Color (default: '#000')
  fillRule?: 'evenodd' | 'nonzero';
  style?: ViewStyle;        // Estilos del contenedor
  width?: number;           // Ancho personalizado
  height?: number;          // Alto personalizado
  viewBox?: string;         // ViewBox del SVG
}
```

## 💡 Ejemplos de Uso en el Proyecto

### En Navigation Tabs
```tsx
<Tab.Screen
  name="Home"
  component={Home}
  options={{
    tabBarIcon: ({ color }) => (
      <SvgIcon name="home" size={24} color={color} />
    ),
  }}
/>
```

### En MovieSearchCard
```tsx
<View style={styles.ratingContainer}>
  <SvgIcon name="star" size={16} color="#FF8700" />
  <Text style={styles.rating}>{rating}</Text>
</View>

<View style={styles.detailRow}>
  <SvgIcon name="clock" size={16} color="#92929D" />
  <Text style={styles.detailText}>{runtime} minutes</Text>
</View>
```

### En Headers
```tsx
<TouchableOpacity onPress={goBack}>
  <SvgIcon name="back" size={28} color="#fff" />
</TouchableOpacity>

<TouchableOpacity onPress={showInfo}>
  <SvgIcon name="info" size={24} color="#fff" />
</TouchableOpacity>
```

## 🆕 Agregar Nuevos Iconos

1. Abre `src/components/svgicon/constants/iconPaths.ts`
2. Agrega el path SVG del icono
3. Actualiza el tipo `IconName` en `types/svgicon.interface.ts`

```typescript
// iconPaths.ts
export const iconPaths = {
  // ... existing icons
  newIcon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
};

// svgicon.interface.ts
export type IconName =
  | 'home'
  | 'search'
  // ... existing icons
  | 'newIcon';
```

## 🔧 Diferencias con el Componente Original

**Simplificaciones:**
- ❌ Removido: Sistema de múltiples colores por path
- ❌ Removido: Configuración compleja de stroke para casos específicos
- ✅ Simplificado: Detección de iconos stroke/fill
- ✅ Mejorado: Type safety con IconName específicos
- ✅ Optimizado: Solo iconos necesarios para la app

**Mantenido:**
- ✅ Soporte para múltiples paths
- ✅ Personalización de tamaño y color
- ✅ Estilos personalizados
- ✅ Fill y stroke modes

## 🎯 Ventajas

- **Performance**: Solo carga los iconos que usas
- **Type-safe**: Autocompletado en el IDE
- **Consistente**: Mismos iconos en toda la app
- **Escalable**: Fácil agregar nuevos iconos
- **Mantenible**: Código limpio y documentado
