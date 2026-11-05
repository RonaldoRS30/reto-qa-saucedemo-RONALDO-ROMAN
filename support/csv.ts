import fs from 'fs';
import path from 'path';

export function leerCsv(nombre: string): Record<string, string>[] {
    const ruta = path.join(process.cwd(), 'data', nombre);
    const [cabecera, ...filas] = fs.readFileSync(ruta, 'utf-8').trim().split(/\r?\n/);
    const columnas = cabecera.split(',');

    return filas.map((fila) => {
        const valores = fila.split(',');
        return Object.fromEntries(columnas.map((columna, indice) => [columna, valores[indice] ?? '']));
    });
}
