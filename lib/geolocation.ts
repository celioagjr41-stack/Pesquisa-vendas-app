/**
 * Serviço de geolocalização via IP
 * Usa a API ipapi.co (gratuita e sem autenticação)
 */

export type LocationData = {
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
};

/**
 * Obtém a localização aproximada do usuário baseada no IP
 * Usa a API ipapi.co que é gratuita e não requer autenticação
 */
export async function getLocationFromIP(): Promise<LocationData> {
  try {
    // Usar a API ipapi.co que é gratuita e funciona bem
    const response = await fetch("https://ipapi.co/json/", {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      console.warn("Erro ao obter localização:", response.status);
      return {};
    }

    const data = await response.json();

    return {
      city: data.city || undefined,
      state: data.region || undefined,
      country: data.country_name || undefined,
      latitude: data.latitude || undefined,
      longitude: data.longitude || undefined,
      timezone: data.timezone || undefined,
    };
  } catch (error) {
    console.warn("Erro ao buscar localização via IP:", error);
    // Retornar objeto vazio em caso de erro
    return {};
  }
}

/**
 * Formata a localização para exibição
 */
export function formatLocation(location: LocationData): string {
  if (!location.city && !location.state) {
    return "Localização desconhecida";
  }

  const parts = [];
  if (location.city) parts.push(location.city);
  if (location.state) parts.push(location.state);

  return parts.join(", ");
}

/**
 * Agrupa respostas por localidade
 */
export function groupByLocation(
  items: Array<{ location?: LocationData }>
): Map<string, number> {
  const grouped = new Map<string, number>();

  items.forEach((item) => {
    const location = formatLocation(item.location || {});
    const count = grouped.get(location) || 0;
    grouped.set(location, count + 1);
  });

  return grouped;
}
