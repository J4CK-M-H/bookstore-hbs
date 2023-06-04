const formatearFecha = (fecha) => {
  const date = new Date(fecha.toISOString().split('T')[0].split('-'));
  
  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleDateString('es-ES', opciones);
};

export default formatearFecha