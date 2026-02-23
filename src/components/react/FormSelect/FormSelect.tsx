/**
 * FormSelect Component - Selector de opciones con estilo Bogoninja
 * 
 * @description
 * Select minimalista que se ve como un label cuando está cerrado y muestra opciones
 * estilizadas al desplegarse. Usa las nuevas capacidades de CSS para estilizar selectores.
 * Se ajusta al ancho del contenedor padre.
 * 
 * @example
 * ```tsx
 * <FormSelect 
 *   id="location" 
 *   name="location"
 *   options={[
 *     { value: "", label: "Selecciona un lugar" },
 *     { value: "modelia", label: "Modelia" },
 *     { value: "parque", label: "Parque Nacional" },
 *     { value: "mosquera", label: "Mosquera" }
 *   ]}
 * />
 * ```
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import './FormSelect.css';

interface SelectOption {
    value: string;
    label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    className?: string;
}

export default function FormSelect({ options, className = "", ...props }: FormSelectProps) {
    return (
        <select
            className={`form-select w-full bg-ninja-dark-blue/20 border border-ninja-light-pink/40 rounded text-ninja-light-pink font-lato sm:text-sm md:text-base font-light px-3 py-2 outline-none focus:border-ninja-light-pink transition-colors duration-300 cursor-pointer ${className}`}
            {...props}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
