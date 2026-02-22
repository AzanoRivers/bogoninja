/**
 * FormLabel Component - Etiqueta para formularios con estilo Bogoninja
 * 
 * @description
 * Label minimalista con texto en morado claro, encerrado en una caja similar al autor de las imágenes
 * sin efectos de sombra. Se ajusta al contenedor padre.
 * 
 * @example
 * ```tsx
 * <FormLabel htmlFor="name">Nombre/Apodo</FormLabel>
 * <FormLabel htmlFor="email" className="mt-4">Correo electrónico</FormLabel>
 * ```
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

interface FormLabelProps {
    htmlFor?: string;
    children: React.ReactNode;
    className?: string;
}

export default function FormLabel({ htmlFor, children, className = "" }: FormLabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={`inline-block w-fit px-3 py-1.5 bg-ninja-dark-pink/15 border border-ninja-dark-pink/40 rounded text-ninja-light-pink font-lato text-sm md:text-base font-light cursor-pointer ${className}`}
        >
            {children}
        </label>
    );
}
